# 0 A.D. Campaign Collection

A campaign expansion for 0 A.D. 0.28.0.

## Campaign categories

- Story-driven
- Historical

## Planned features

- Selectable difficulty for every mission
- Persistent campaign choices
- Branching mission progression
- Historically grounded scenarios with gameplay adjustments

## Campaign difficulty

The campaign menu passes Easy, Normal, and Hard through 0 A.D.'s native
trigger-difficulty setting (Easy, Medium, and Hard) and loads the shared
`maps/scripts/CampaignDifficulty.js` hook for every mission. Future campaigns
launched through this menu do not need to add the hook to each map's
`TriggerScripts`.

The shared hook adjusts starting resources for the player and mutual allies,
and for opposing players, using the configured Easy/Normal/Hard multipliers.

## Development status

Framework setup.
