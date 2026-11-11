/**
 * Rise of Rome — Scenario 1: Romulus: Founding on the Tiber
 * Story-driven trigger script with instructive mission dialogue, objectives, timed raids, and camera moments.
 */

Trigger.prototype.StoryMessage = function(text)
{
	var cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	if (cmpGUIInterface)
		cmpGUIInterface.PushNotification({
			"type": "message",
			"players": [1],
			"message": text
		});
};

Trigger.prototype.ObjectiveMessage = function(text)
{
	var cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	if (cmpGUIInterface)
		cmpGUIInterface.PushNotification({
			"type": "message",
			"players": [1],
			"message": "Objective: " + text
		});
};

Trigger.prototype.TryCameraMove = function(x, y, z)
{
	// Attempt a cinematic camera move if a cinema/camera interface is available.
	var cmpCinema = Engine.QueryInterface(SYSTEM_ENTITY, IID_CinemaManager);
	if (cmpCinema && cmpCinema.AddCinemaPath)
	{
		cmpCinema.AddCinemaPath({
			"nodes": [{
				"position": { "x": x, "y": y, "z": z },
				"lookAt": { "x": x, "y": 0, "z": z + 40 },
				"time": 6
			}]
		});
		if (cmpCinema.PlayQueue)
			cmpCinema.PlayQueue();
	}
};

Trigger.prototype.ApplyRomulusDifficulty = function()
{
	// Augment the shared campaign difficulty hook with scenario-specific tuning.
	var difficulty = "normal";
	if (typeof GetCampaignDifficulty == "function")
		difficulty = GetCampaignDifficulty();

	this.romulusDifficulty = difficulty;

	var raidDelay = { "easy": 420000, "normal": 300000, "hard": 210000 };
	var raidSize  = { "easy": 3,      "normal": 5,      "hard": 7 };

	this.romulusRaidDelay = raidDelay[difficulty] || raidDelay.normal;
	this.romulusRaidSize = raidSize[difficulty] || raidSize.normal;
};

Trigger.prototype.SpawnRaiderWave = function(data)
{
	var count = data.count || this.romulusRaidSize || 5;
	var templates = [
		"units/iber/infantry_swordsman_b",
		"units/iber/infantry_javelineer_b",
		"units/iber/infantry_spearman_b"
	];
	var spawnX = 256;
	var spawnZ = 360;
	var entities = [];

	for (var i = 0; i < count; ++i)
	{
		var t = templates[i % templates.length];
		var ent = TriggerHelper.SpawnUnitsFromTemplate(2, t, 1, {
			"x": spawnX + (i - count / 2) * 4,
			"z": spawnZ + (i % 2) * 4
		});
		if (ent && ent.length)
			entities = entities.concat(ent);
	}

	if (entities.length)
	{
		// Order the wave toward the Roman settlement.
		if (TriggerHelper && TriggerHelper.AttackMove)
			TriggerHelper.AttackMove(entities, 256, 190);
	}

	return entities;
};

Trigger.prototype.RomulusIntro = function()
{
	this.StoryMessage(
		"Romulus: \"Brothers and sisters, these hills above the Tiber are all we claim. " +
		"Legend says the she-wolf spared us; now steel and resolve must spare our people. " +
		"Build our strength here, and no rival will drive us from this river.\""
	);
	this.TryCameraMove(256, 110, 120);
};

Trigger.prototype.RomulusObjective = function()
{
	this.ObjectiveMessage(
		"Protect your Civic Centre and villagers. Gather nearby food, wood, and stone, " +
		"keep your soldiers close to home, and destroy the enemy camp to the north to secure the crossing."
	);
};

Trigger.prototype.RomulusEconomyHint = function()
{
	this.StoryMessage(
		"Advisor: \"Use your female citizens to gather berries and herd the sheep near camp, " +
		"and send them to cut wood or mine stone when you can. A steady economy lets you train more defenders " +
		"if the raids grow fierce.\""
	);
};

Trigger.prototype.RomulusArmyHint = function()
{
	this.StoryMessage(
		"Romulus: \"Spearmen hold the line, swordsmen strike in close, and javelineers harry the foe from afar. " +
		"Keep your fighters together—do not chase raiders alone into the scrub.\""
	);
};

Trigger.prototype.RomulusFirstRaid = function()
{
	this.StoryMessage(
		"Scout: \"Dust on the northern trail! A raiding band is coming to test our walls. " +
		"Pull your villagers back if needed and meet them with your soldiers in front of the Civic Centre.\""
	);
	this.ObjectiveMessage("Repel the first raid. Keep your Civic Centre standing.");
	this.SpawnRaiderWave({ "count": Math.max(3, (this.romulusRaidSize || 5) - 1) });
};

Trigger.prototype.RomulusSecondRaid = function()
{
	this.StoryMessage(
		"Romulus: \"They return in greater number, driven by a rival chieftain who would see Rome stillborn. " +
		"Stand firm—form your men, strike as one, and break their charge before it reaches our homes.\""
	);
	this.ObjectiveMessage("Defeat the larger enemy warband approaching from the north.");
	this.SpawnRaiderWave({ "count": (this.romulusRaidSize || 5) + 1 });
	this.TryCameraMove(256, 95, 300);
};

Trigger.prototype.RomulusFinalPush = function()
{
	this.StoryMessage(
		"Romulus: \"The Tiber is ours by courage, not by plea. Advance when you are ready, " +
		"tear down their camp, and let every clan know this hill shall be Rome.\""
	);
	this.ObjectiveMessage("Go on the offensive: destroy the enemy Civic Centre and all remaining forces.");
};

Trigger.prototype.OnRomulusEnemyDefeated = function(data)
{
	// Called on player defeat/conquest events if registered by the engine pattern.
	if (data && data.playerId == 2)
	{
		this.StoryMessage(
			"Romulus: \"It is done. The raiders flee and their camp burns. " +
			"Here we found not just a refuge, but a city. Remember this day—Rome endures its first trial.\""
		);
	}
};

Trigger.prototype.InitRomulusCampaign = function()
{
	if (this.romulusInitDone)
		return;
	this.romulusInitDone = true;

	this.ApplyRomulusDifficulty();

	// Intro and objective beats.
	this.DoAfterDelay(1000, "RomulusIntro", {});
	this.DoAfterDelay(9000, "RomulusObjective", {});
	this.DoAfterDelay(20000, "RomulusEconomyHint", {});
	this.DoAfterDelay(35000, "RomulusArmyHint", {});

	// Timed story beats and raids.
	this.DoAfterDelay(60000, "RomulusFirstRaid", {});
	this.DoAfterDelay(this.romulusRaidDelay || 300000, "RomulusSecondRaid", {});
	this.DoAfterDelay((this.romulusRaidDelay || 300000) + 120000, "RomulusFinalPush", {});

	// Victory narration on conquest of player 2 (if supported).
	this.RegisterTrigger("OnPlayerDefeated", "OnRomulusEnemyDefeated", { "enabled": true });
};

{
	var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.RegisterTrigger("OnInitGame", "InitRomulusCampaign", { "enabled": true });
}

