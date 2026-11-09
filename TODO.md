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
  - [ ] A. Regal Rome — kings/rivals (4)
    - [ ] 1. Romulus — founding/defense of early Rome (legendary frame)
    - [ ] 2. Titus Tatius / Sabine conflict — Sabine integration/war (early kingship era)
    - [ ] 3. Tullus Hostilius / Alba Longa — Horatii–Curiatii era frame; subdue Alba
    - [ ] 4. Lucius Tarquinius Superbus / Lars Porsena — fall of monarchy; defense at the Tiber (Porsena)
  - [ ] B. Early Republic — commanders/crises (6)
    - [ ] 5. Aulus Postumius Albus / Lake Regillus (vs. Latin League, Tarquin cause)
    - [ ] 6. Lucius Quinctius Cincinnatus — Aequi relief (rapid mobilization/relief objective)
    - [ ] 7. Marcus Furius Camillus / Veii — siege and capture
    - [ ] 8. Brennus / Battle of the Allia — Gallic sack crisis (survive/withdraw)
    - [ ] 9. Marcus Furius Camillus / Recovery of Rome — rally and expel/defeat Gauls (traditional frame)
    - [ ] 10. Titus Manlius Torquatus / Latin War context — discipline and Latin revolt battles (Vesuvius/Trifanum frame)
  - [ ] C. Samnite/Italian conquest (5)
    - [ ] 11. Publius Decius Mus (elder) / Samnite Wars — devotio tradition; hold line at a critical battle
    - [ ] 12. Lucius Papirius Cursor — Samnite campaign (maneuver/discipline)
    - [ ] 13. Quintus Fabius Maximus Rullianus / Sentinum coalition — vs. Samnite-Gallic-Etruscan-Umbrian alliance
    - [ ] 14. Publius Decius Mus (younger) / Sentinum — sacrifice/decisive moment in coalition battle
    - [ ] 15. Manius Curius Dentatus — final Italian resistance (Samnites/Sabines/Lucanians frame)
  - [ ] D. Pyrrhic War (3)
    - [ ] 16. Pyrrhus of Epirus / Heraclea — face Hellenistic army and elephants
    - [ ] 17. Pyrrhus of Epirus / Asculum — “Pyrrhic victory” attrition scenario
    - [ ] 18. Manius Curius Dentatus / Beneventum — repel Pyrrhus; secure Italy
  - [ ] E. First Punic War (3)
    - [ ] 19. Appius Claudius Caudex / Messana — Roman entry into Sicily
    - [ ] 20. Marcus Atilius Regulus — African expedition and reversal (vs. Carthage/Xanthippus context)
    - [ ] 21. Gaius Lutatius Catulus / Aegates — decisive endgame (objective-based “naval” victory proxy)
  - [ ] F. Second Punic War (7)
    - [ ] 22. Hannibal Barca / Crossing the Alps — survival/march to Italy
    - [ ] 23. Hannibal Barca / Trebia — ambush and defeat Roman consular army
    - [ ] 24. Hannibal Barca / Lake Trasimene — trap and annihilation
    - [ ] 25. Gaius Flaminius (and aftermath) / Trasimene context — Roman disaster/recovery framing (or play as Hannibal)
    - [ ] 26. Quintus Fabius Maximus Verrucosus — Fabian strategy; avoid decisive battle, harass Hannibal
    - [ ] 27. Lucius Aemilius Paullus & Gaius Terentius Varro / Cannae — catastrophic battle (survival/limited objectives) or Hannibal victory
    - [ ] 28. Publius Cornelius Scipio Africanus / Zama — defeat Hannibal; end war
  - [ ] G. Eastern wars & final consolidation (4)
    - [ ] 29. Titus Quinctius Flamininus / Cynoscephalae (vs. Philip V of Macedon)
    - [ ] 30. Scipio Asiaticus & Scipio Africanus / Magnesia (vs. Antiochus III)
    - [ ] 31. Lucius Aemilius Paullus Macedonicus / Pydna (vs. Perseus of Macedon)
    - [ ] 32. Scipio Aemilianus / Siege of Carthage (146 BCE) — campaign finale
- [ ] Persian Empire
- [ ] Alexander the Great
- [ ] Hannibal's War

## Current blocker
- Verify in-game that campaign launches load the shared difficulty hook and
  apply the selected native trigger-difficulty setting to starting resources.
