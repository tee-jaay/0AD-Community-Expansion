# 0 A.D. Community Expansion — TODO

## Layer 1 — Native campaign integration
Existing 0 A.D. campaign loading, maps and session handling.

- [x] Native campaign loading integrated.
- [x] Campaign mission launches and runs as an RTS scenario.
- [ ] Verify campaign completion and save progression.
- [ ] Verify campaign loading and progression across game restarts.

## Layer 2 — Our campaign framework

- [x] Story-driven / Historical category metadata.
- [x] Per-mission Easy / Normal / Hard difficulty selection.
- [x] Difficulty passed through campaign launch data.
- [ ] Apply difficulty modifiers reliably to scenario gameplay.
- [ ] Persistent campaign choices.
- [ ] Branching mission progression.
- [ ] Campaign progression and unlock testing.

## Layer 3 — Campaign content

### Test content
- [x] The Border Village — temporary test campaign.
- [x] The First Encounter — test mission.
- [ ] Complete difficulty and progression testing.

### Planned campaigns
- [ ] The Last Kingdom
- [ ] Rise of Rome
- [ ] Alexander the Great
- [ ] Hannibal's War

## Current blocker
- Atlas-generated scenario maps are not exposing their `TriggerScripts`
  entries through `Engine.LoadMapSettings()`.
- Investigate the scenario metadata loading path before changing the
  difficulty trigger implementation.
