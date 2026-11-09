function GetCampaignDifficulty()
{
    const cmpGuiInterface = Engine.QueryInterface(
        SYSTEM_ENTITY,
        IID_GuiInterface
    );

    if (cmpGuiInterface)
    {
        const initAttributes = cmpGuiInterface.GetInitAttributes();
        if (initAttributes && initAttributes.settings && initAttributes.settings.TriggerDifficulty)
        {
            const difficultyNames = {
                1: "very-easy",
                2: "easy",
                3: "normal",
                4: "hard",
                5: "very-hard"
            };
            const difficulty = difficultyNames[initAttributes.settings.TriggerDifficulty];
            if (difficulty)
                return difficulty;
        }
        if (initAttributes && initAttributes.campaignData && initAttributes.campaignData.difficulty)
            return initAttributes.campaignData.difficulty;
    }

    const cmpTrigger = Engine.QueryInterface(
        SYSTEM_ENTITY,
        IID_Trigger
    );

    if (!cmpTrigger || !cmpTrigger.GetDifficulty)
        return "normal";

    const difficulty = cmpTrigger.GetDifficulty();
    if (typeof difficulty === "string")
        return difficulty;

    const difficultyNames = {
        2: "easy",
        3: "normal",
        4: "hard"
    };

    return difficultyNames[difficulty] || "normal";
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
        warn("Campaign Collection: Normal difficulty selected; starting resources unchanged.");
        return;
    }

    const cmpPlayerManager = Engine.QueryInterface(
        SYSTEM_ENTITY,
        IID_PlayerManager
    );
    if (!cmpPlayerManager)
    {
        warn("Campaign Collection: Could not apply difficulty because PlayerManager is unavailable.");
        return;
    }

    for (let playerID = 1; playerID < cmpPlayerManager.GetNumPlayers(); ++playerID)
    {
        const playerEntity = cmpPlayerManager.GetPlayerByID(playerID);

        if (playerEntity === INVALID_ENTITY)
            continue;

        const cmpPlayer = Engine.QueryInterface(playerEntity, IID_Player);

        if (!cmpPlayer)
            continue;

        const cmpDiplomacy = Engine.QueryInterface(playerEntity, IID_Diplomacy);
        const isPlayerSide = playerID === 1 ||
            cmpDiplomacy && cmpDiplomacy.IsMutualAlly(1);
        const multiplier = isPlayerSide ? settings.player : settings.enemy;
        const currentResources = cmpPlayer.GetResourceCounts();
        const adjustedResources = {};

        for (const resource in currentResources)
            adjustedResources[resource] = Math.round(
                currentResources[resource] * multiplier
            );

        cmpPlayer.SetResourceCounts(adjustedResources);
    }

    warn("Campaign Collection: Applied " + difficulty + " difficulty to starting resources.");
};

{
    const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);

    cmpTrigger.RegisterTrigger(
        "OnInitGame",
        "ApplyCampaignDifficulty",
        { "enabled": true }
        );
}
