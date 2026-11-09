warn("CampaignDifficulty.js LOADED");
function GetCampaignDifficulty()
{
    const cmpGuiInterface = Engine.QueryInterface(
        SYSTEM_ENTITY,
        IID_GuiInterface
        );

    const initAttributes = cmpGuiInterface.GetInitAttributes();

    if (!initAttributes.campaignData)
        return "normal";

    return initAttributes.campaignData.difficulty || "normal";
}

Trigger.prototype.ApplyCampaignDifficulty = function()
{
    if (this.campaignDifficultyApplied)
        return;

    this.campaignDifficultyApplied = true;

    const difficulty = GetCampaignDifficulty();

    const multipliers = {
        "easy": {
            "player": 1.5,
            "enemy": 0.6
        },
        "normal": {
            "player": 1.0,
            "enemy": 1.0
        },
        "hard": {
            "player": 0.75,
            "enemy": 1.4
        }
    };

    const settings = multipliers[difficulty] || multipliers.normal;

    if (difficulty === "normal")
    {
        warn("Campaign Collection: Normal difficulty. Default resources retained.");
        return;
    }

    const cmpPlayerManager = Engine.QueryInterface(
        SYSTEM_ENTITY,
        IID_PlayerManager
        );

    const players = [
    { "id": 1, "multiplier": settings.player },
    { "id": 2, "multiplier": settings.enemy }
    ];

    for (const entry of players)
    {
        const playerEntity = cmpPlayerManager.GetPlayerByID(entry.id);

        if (playerEntity === INVALID_ENTITY)
            continue;

        const cmpPlayer = Engine.QueryInterface(playerEntity, IID_Player);

        if (!cmpPlayer)
            continue;

        const currentResources = cmpPlayer.GetResourceCounts();
        const adjustedResources = {};

        for (const resource in currentResources)
            adjustedResources[resource] = Math.round(
                currentResources[resource] * entry.multiplier
                );

        cmpPlayer.SetResourceCounts(adjustedResources);

        for (const resource in adjustedResources)
        {
            warn(
                "Campaign Collection: Player " + entry.id +
                " " + resource + " = " + adjustedResources[resource]
                );
        }
    }

    warn(
        "Campaign Collection: Applied " + difficulty +
        " difficulty. Player multiplier: " + settings.player +
        ", enemy multiplier: " + settings.enemy
        );
};

{
    const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);

    cmpTrigger.RegisterTrigger(
        "OnInitGame",
        "ApplyCampaignDifficulty",
        { "enabled": true }
        );
}
