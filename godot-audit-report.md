# Shardborne TRPG — Godot Implementation Audit

## core.js (Reference) vs Godot Game Files — Missing & Incorrect Implementation Report

---

## CRITICAL — Game-Breaking Omissions

### 1. Turn Structure: Phase System Not Enforced
**core.js**: 4 distinct phases per turn — Command → Movement → Combat → End. Cards are tied to specific phase timings. Actions are restricted by phase.
**Godot**: `game_state_machine.gd` defines the phase enum (`COMMAND`, `MOVEMENT`, `COMBAT`, `END`) but `Combat.gd` uses a **per-unit activation** system where each unit takes all its actions (move + attack + skill) in sequence. Phases are never enforced or cycled through.
**Impact**: Card timing ("Movement Phase", "Combat Phase", "Any Phase") is meaningless. The entire card system, reaction system, and phase-restricted abilities cannot function correctly.

### 2. Reaction System (RP) Completely Missing
**core.js**: Full Reaction Point system — players earn RP (1 per unit destroyed, 1 per card played, 1 per commander ability). Six reaction types: Overwatch, Defensive Stance (+2 DEF), Counter-Charge (charge back at attacker), Brace for Impact (+1 DEF + push resist), Play Reaction Card (cards with "Any Phase" timing), Emergency Retreat (flee when attacked, -1 RP).
**Godot**: Only Overwatch exists as a basic skill. No RP tracking, no RP generation, no reaction triggers, no reaction selection UI. Defensive Stance, Counter-Charge, Brace for Impact, Emergency Retreat are all absent.
**Impact**: Removes an entire layer of strategic depth. Enemy turn is completely non-interactive.

### 3. Card Library: ~15 Hardcoded Cards vs 200+ in core.js
**core.js**: 200+ unique cards across 4 types (Command, Tech, Fragment, Tactical) with faction-specific cards per commander (6 unique cards per commander × 13 commanders × 5 factions). Cards have CP costs, phase timing restrictions, and complex effects.
**Godot**: `Combat.gd` `_build_deck()` creates ~15 hardcoded cards — 7 universal ("Strategic Advance", "Coordinated Assault", etc.) + 3 faction-specific + padding with "Tactical Reserve". Card effects are limited to basic stat buffs (`atk_bonus`, `def_bonus`, `mov_bonus`, `heal`, `draw`, `aoe_damage`, `corruption_aoe`, `stealth`, etc.).
**Impact**: The card system is the core strategic layer of the game and is ~93% missing. Faction-specific commander cards don't exist.

### 4. Campaign System Completely Missing
**core.js**: Full campaign with: XP table (25/50/100/150/200/300/400/500/650 XP for levels 2-10), skill tree with 3 paths (Knowledge, Chaos, Tactical × 9 skills each = 27 total skills), Evolution at level 10, between-game management (injury rolls, recovery, mercenary recruitment), commander death campaign rules, campaign victory conditions.
**Godot**: No campaign files exist. No XP tracking, no skill tree, no leveling, no between-game management, no injury system. `campaign_manager.gd` exists but only contains stub/empty logic.
**Impact**: The entire meta-game progression loop is absent.

### 5. Commander Death Effects Missing
**core.js**: When a commander dies: their army loses ALL remaining cards (discarded), ALL friendly units must immediately take a Morale check at -2, army loses 1 CP per turn for rest of game. In campaign: injury table (d6: 1=permanent death, 2-3=miss next game, 4-5=stat reduction, 6=miraculous recovery).
**Godot**: Commander death is handled only as a "game over" condition with faction-themed victory text. No card loss, no army-wide morale cascade, no CP penalty.
**Impact**: Commanders dying has no mechanical consequence beyond losing the game.

---

## HIGH — Significant Gameplay Gaps

### 6. Scenarios Don't Match core.js
**core.js**: 6 scenarios — Breakthrough (push through enemy territory), Relic Hunt (collect 3 relics), Assassination (kill enemy commander), Scorched Earth (control + destroy objectives), Tides of War (rotating objectives), Last Stand (one army defends).
**Godot** (`game_rules.gd`): 6 scenarios — `king_of_the_hill`, `shardstorm`, `the_last_stand`, `total_war`, `supply_lines`, `broken_ground`. Names, objective placement, and scoring don't match the reference material. Only `the_last_stand` has an approximate equivalent.
**Impact**: Players are playing different scenarios than what the rules define.

### 7. Status Effects Incomplete
**core.js**: 12 status effects — Shaken, Routed, Engaged, Burning (-1 DEF + d6 extinguish roll each turn), Corrupted (can't act on d6 1-2), Grounded, **Staggered** (-2 MOV, -1 ATK for 1 turn), Immovable, Stealthed, Vengeful (+1 ATK when below half HP), **Severed** (no faction abilities for 1 turn), Fearless.
**Godot** (`game_rules.gd`): 8 status effects — `shaken`, `engaged`, `stealthed`, `activated`, `fearless`, `vengeful`, `grounded`, `burning`.
**Missing entirely**: `Staggered`, `Severed`, `Routed` (as distinct from Shaken). `Immovable` is listed in keywords but not in status effects.
**Burning incorrect**: Implemented as flat damage only. Missing -1 DEF penalty and d6 extinguish roll (extinguish on 4+).
**Impact**: Many card effects and abilities reference Staggered/Severed which can't be applied.

### 8. War Machine Rules Largely Missing
**core.js**: War machines have: Malfunction table (roll d6 on doubles: 1=destroyed, 2-3=disabled 1 turn, 4-5=reduced, 6=overcharged), Destruction creates wreckage terrain (impassable, heavy cover), Transport rules (carry infantry, disembark restrictions), Special engagement restrictions (WMs can't be engaged by infantry unless infantry has Siege/Anti-Armor).
**Godot**: War machines are treated as regular large units. No malfunction table, no wreckage terrain on destruction, no transport, no engagement restrictions.
**Impact**: War machines lose their unique risk/reward mechanics.

### 9. Challenges/Duels System Missing
**core.js**: Formal challenge system — commander or specialist can issue a Challenge to enemy commander/specialist within 6". If accepted: 1v1 combat with +1 ATK die each, no outside interference, loser's side checks morale at -1. If refused: refuser gets -2 MOR for rest of turn, challenger gets +1 ATK die.
**Godot**: No challenge mechanic exists. Some cards reference duels (e.g., "Blood Challenge", "Precision Duel") but the underlying system isn't implemented.
**Impact**: Commander-vs-commander interactions lose their thematic framework.

### 10. Keywords: ~25+ Defined But Not Mechanically Enforced
**core.js**: ~60+ keywords with specific mechanical effects (e.g., Blast: hits all units within 2", Indirect Fire: ignore LoS, Sniper: target any visible unit, Siege: double damage to terrain, Terror: enemy must check morale on engagement, Regeneration: heal 1 HP per turn, etc.).
**Godot** (`game_rules.gd`): ~35 keywords defined with text descriptions. However, `Combat.gd` only mechanically implements a handful: `Fly`/`Spirit Glide` (movement class), `Terror`/`Terrifying` (morale modifier), `Inspiring` (morale bonus), `Fire Resistant`/`Fire Immune` (damage reduction placeholders). The vast majority (Blast, Indirect Fire, Sniper, Siege, Regeneration, Pack Tactics, Shield Wall, Charge, Armour Piercing, Phase, Swarm, etc.) have text but no combat logic.
**Impact**: Units have keyword labels but those keywords don't actually do anything in combat.

### 11. Movement Rules Incomplete
**core.js**: Disengage (unit must sacrifice full movement to leave engagement), Consolidate (after destroying a unit in melee, may move 3" toward nearest enemy), Fall Back (Shaken units must move full MOV directly away from nearest enemy), Climbing (half MOV), Jumping (must clear gap in one move).
**Godot** (`CController.gd`): Movement uses A* pathfinding with terrain costs. Charging is implemented (5+ tile straight line). **Missing**: Disengage action (units can freely leave engagement), Consolidate after kills, Fall Back for Shaken units, Climbing/Jumping height rules.
**Impact**: Engagement is non-sticky — units can walk away from melee freely, eliminating the tactical significance of engagement zones.

### 12. Facing & Flanking System Missing
**core.js**: Units have a facing direction. Flanking (+1 ATK from side), Rear attacks (+2 ATK). Units must spend movement to change facing.
**Godot**: No facing system. Flanking is approximated by checking if an ally is on the opposite side of the target (binary flanking bonus from `game_rules.gd` COMBAT_MODIFIERS). No concept of unit facing direction, side attacks vs rear attacks, or facing changes costing movement.
**Impact**: Tactical positioning loses a dimension. Rear attacks don't exist.

### 13. Line of Sight Not Implemented
**core.js**: LoS rules — draw line from attacker to target, blocked by terrain taller than both. Light cover: partial obstruction (-1 ATK). Heavy cover: significant obstruction (-2 ATK). True LoS check required for ranged attacks.
**Godot**: `Combat.gd` has `_get_terrain_cover()` that checks the target's tile for cover type, but does NOT check LoS along the path between attacker and target. No LoS blocking by intervening terrain. Cover is terrain-at-target only.
**Impact**: Ranged units can shoot through mountains and buildings. Positioning behind terrain has no effect.

### 14. Thornweft Web-Anchor Proximity Incorrect
**core.js**: Thornweft Web tier is based on **per-unit proximity** — count Web-Anchor units within 8" of each Thornweft unit. Gossamer Veil applies bonuses based on nearby anchor density.
**Godot** (`faction_state_manager.gd`): Web tier is calculated from **total anchors in the army** regardless of position. `_count_web_anchors()` just counts all units with "Web-Anchor" or "Mobile Web-Anchor" specials across the entire combatant array, not checking proximity.
**Impact**: Web Tier bonuses apply globally instead of rewarding tight formation play around anchors.

### 15. Turn 1 Restrictions Not Implemented
**core.js**: Turn 1 restrictions — no Charges allowed, no War Machine special abilities, no cards with CP cost 3+. Designed to prevent alpha-strike victories.
**Godot**: No turn 1 checks exist in `Combat.gd`. All actions are available from turn 1.
**Impact**: First player advantage is unchecked. Alpha-strike strategies are unmitigated.

### 16. Morale: Routed State Missing
**core.js**: Two-tier morale:
- Fail by 1-2: Shaken (can't attack, -2 to future checks)
- Fail by 3+: **Routed** (unit must flee directly toward own board edge at full MOV each turn, if it reaches the edge it's removed from play)
**Godot**: Only Shaken is implemented. No Routed state, no flee movement, no removal at board edge. Morale failures are binary pass/fail to Shaken.
**Impact**: Catastrophic morale failures have no escalating consequence.

### 17. Pre-Game Sequence Not Implemented
**core.js**: 9-step pre-game sequence: 1) Agree on battle size, 2) Select armies, 3) Choose scenario, 4) Set up terrain, 5) Determine deployment zones, 6) Place objectives, 7) Roll for initiative, 8) Deploy armies alternating, 9) Mulligan (redraw hand, once).
**Godot**: Army builder handles steps 1-3 loosely. Steps 4-9 are absent. No terrain setup, no deployment zones, no initiative roll, no alternating deployment, no mulligan.
**Impact**: Game starts without proper setup ceremonies. No mulligan means bad initial draws are permanent.

---

## MEDIUM — Notable Missing Features

### 18. Multiplayer Rules Not Implemented
**core.js**: Team battles (2v2, 3v3 with shared VP), Free-for-all (3-4 players with modified scoring), Alternating activation variant.
**Godot**: Strictly 1v1 with player vs AI only. No team battles, no multiplayer support, no free-for-all.

### 19. Underdog Mechanics Missing
**core.js**: When one army has 20%+ fewer points, they get: +1 CP per turn, free mulligan, choose deployment zone.
**Godot**: No underdog detection or compensation.

### 20. Anti-Stalling Rules Missing
**core.js**: If a player takes no offensive action for 2 consecutive turns, opponent gains +1 VP per stalled turn.
**Godot**: No stalling detection or penalty.

### 21. Army Builder Validation Incomplete
**core.js**: Army composition requires: infantry-per-50-points minimum, fragment limits by battle size, war machine limits by battle size (Skirmish: 0-1, Standard: 0-2, Grand: 0-3), minimum 3 units, specific deck building (10 cards for Skirmish, 15 for Standard, 20 for Grand).
**Godot** (`army_builder.gd`): Validates max unit copies, legendary limit, specialist budget, support budget. **Missing**: infantry-per-50-points check, fragment limits, WM limits by battle size, minimum unit count, deck building requirements.

### 22. Fragment System Not Implemented in Combat
**core.js**: Fragments are objective items with activation costs (Fragment Charges), instability risks (d6 roll, 1=backfire), zone effects, and per-faction interactions (Emberclaw: fire amplification, Iron Dominion: Grid boost, Nightfang: corruption zones, Thornweft: web anchoring, Veilbound: flow generation).
**Godot**: Fragment cards exist in the card system but the physical Fragment objects (placement, activation, instability, charges) are not implemented as battlefield entities.

### 23. Terrain Effects Largely Non-Functional
**core.js**: 10+ terrain types with specific effects — Open (no effect), Light Cover (-1 enemy ATK), Heavy Cover (-2 enemy ATK), Difficult (-2" MOV), Impassable (blocks all), Elevated (+1 ATK ranged, +1 DEF), Water (half MOV, no charging), Forest (light cover + difficult), Burning (1 damage per turn to occupants), Walls (blocks LoS and movement).
**Godot** (`game_rules.gd`): 10 terrain types defined with movement cost multipliers. `Combat.gd` checks target tile for cover. But only movement cost is properly used in pathfinding. Burning terrain damage, water charge restriction, elevation bonuses, wall LoS blocking are not implemented.

### 24. Emberclaw Heat Generation Incomplete
**core.js**: Heat sources: Commander generates Heat = half CMD stat per turn, Drake Bond pairs generate Heat when both activate, fire units generate Heat when attacking, burning terrain contributes to Heat.
**Godot** (`faction_state_manager.gd`): Only fire units' combat Heat is tracked (units with "Fire" specials generate heat on attack). Commander Heat generation from CMD stat is missing. Drake Bond pair Heat is missing.

### 25. Nightfang Hunger Pool Not Battle-Size Aware
**core.js**: Hunger thresholds scale with battle size — Skirmish: smaller thresholds, Grand: larger thresholds. Starting Hunger depends on battle size.
**Godot** (`faction_state_manager.gd`): Hunger tier thresholds are hardcoded to a single set (`standard` in `game_rules.gd`), not adjusted per battle size.

### 26. Veilbound Stance System Not Mechanically Implemented
**core.js**: Veilbound units have 3 stances — Honor (+1 ATK), Revelation (+1 DEF), and a balanced default. Stance changes cost movement. Stances affect stat calculations and interact with Flow generation.
**Godot**: "Stance" appears as a keyword on many Veilbound units. `faction_state_manager.gd` tracks `current_stance` but no combat logic changes ATK/DEF based on stance, no stance-switching action exists for players, and stance changes don't cost movement.

### 27. Deck Building Not Implemented
**core.js**: Players build decks during army construction: 10 cards (Skirmish), 15 (Standard), 20 (Grand). Cards are chosen from the full card library based on faction. Mulligan is available at game start.
**Godot**: `_build_deck()` auto-generates a fixed deck of ~15 cards. No deck building UI, no card selection, no mulligan.

### 28. Nocturnal Predators Passive Missing (Nightfang)
**core.js**: Nightfang faction passive — all Nightfang units get +1 DEF when in cover terrain (Nocturnal Predators).
**Godot**: Not implemented. No faction-wide DEF bonus in cover for Nightfang.

---

## LOW — Polish & Edge Cases

### 29. Commander Aura Range Not Fully Enforced
**core.js**: Commander aura provides +1 MOR to all friendly units within 8". CP generation is CMD stat per turn. Commander must be alive.
**Godot**: `game_rules.gd` defines `COMMANDER_AURA_RANGE = 8` and morale calculations include commander proximity. However, CP generation is simplified — doesn't track commander alive state for CP reduction on death.

### 30. Critical Hit Threshold Variants Missing
**core.js**: Some abilities modify crit threshold (normally 6). E.g., "crits on 5+" or "crits on 4+" for specific attacks.
**Godot**: `game_rules.gd` has `CRITICAL_VALUE = 6` as a constant. No per-attack crit threshold modification exists.

### 31. Blast/AoE Template System Missing
**core.js**: Blast keyword hits all units within specified radius. Artillery has scatter mechanics (roll for deviation on miss).
**Godot**: `SkillDefinition` has `is_aoe`, `aoe_radius`, `cone_length` fields but `combat_resolver.gd` doesn't implement multi-target resolution. AoE skills hit single targets.

### 32. Overwatch Accuracy Inconsistency
**core.js**: Overwatch shoots at half ATK dice (round down).
**Godot**: Overwatch skill has `atk_modifier = -99` as a sentinel value, and `Combat.gd` implements it as `half_dice = max(1, unit.atk / 2)`. This works but the sentinel approach is fragile.

### 33. Morale Death Cascade Range
**core.js**: When a unit is destroyed, all friendly units within 6" must check morale. Commander aura and Inspiring keyword modify this.
**Godot** (`Combat.gd`): Death cascade uses 4-tile radius (hardcoded), which may not match the 6" specification depending on tile-to-inch mapping.

### 34. Transport Rules Missing  
**core.js**: War machines with Transport can carry infantry units (specific capacity). Embarking/disembarking costs movement.
**Godot**: No transport mechanic exists.

### 35. Terrain Creation/Modification Missing
**core.js**: Some abilities create terrain (burning terrain, web terrain, difficult terrain). Cards can reshape terrain.
**Godot**: `SkillDefinition` has `creates_burning_terrain` and `creates_web_terrain` flags but no actual terrain modification logic exists in `Combat.gd` or `CController.gd`. Tiles don't change type during combat.

### 36. Card Draw/Discard Mechanics Incomplete
**core.js**: Draw hand of 5 cards at start. Draw 2 per turn. Hand limit of 7. Discard at end of turn. Some effects draw extra cards.
**Godot** (`Combat.gd`): `draw_card()` and `draw_initial_hand()` exist with hand sizes, but discard mechanics, hand limits, and end-of-turn discard are not enforced.

### 37. Emberclaw Drake Bond Not Implemented
**core.js**: Specific Emberclaw commanders can bond with specific Drake war machines. Bonded pairs share heat generation and gain +1 ATK when within 6" of each other.
**Godot**: Drake Bond appears as a keyword on some units but has no mechanical implementation.

### 38. Iron Dominion Grid Anchor Double-Count Correct
**Note**: `faction_state_manager.gd` correctly counts Grid Anchor units as 2 for cohesion calculation, matching core.js. This is working correctly.

---

## Summary Table

| Priority | Count | Category |
|----------|-------|----------|
| CRITICAL | 5 | Phase system, Reactions, Card library, Campaign, Commander death |
| HIGH | 12 | Scenarios, Status effects, War machines, Duels, Keywords, Movement, Facing, LoS, Web-Anchor, Turn 1, Routed, Pre-game |
| MEDIUM | 11 | Multiplayer, Underdog, Anti-stalling, Army validation, Fragments, Terrain, Heat, Hunger, Stances, Deck building, Nocturnal |
| LOW | 9 | Commander aura, Crit thresholds, Blast, Overwatch, Death cascade, Transport, Terrain creation, Card draw, Drake Bond |
| **Total** | **37** | |

---

*Generated by comparing core.js (4189 lines) against all Godot game files in shardborne-trpg/.*
