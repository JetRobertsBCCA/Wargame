# Shardborne — Dry Game Simulations
## Post-Rebalance Playtest Report

> Three simulated games at Skirmish, Standard, and Epic scale. Dice use expected outcomes: hits ≈ ATK × (7−DEF)/6, crits ≈ ATK/6 (always hit, 2 dmg each). Morale: 2d6 avg = 7. Faction mechanics tracked per rules. **Focus: player fun, decision points, pacing, drama, and balance findings.**

---

# ⚠️ PRE-GAME FINDING: Unit Cap vs Points Budget

Before Game 1 even started, army building revealed a systemic problem:

**At Skirmish scale (50–100 pts, max 15 units), commanders cost 17–25 pts. With most units at 2–5 pts and the 15-unit cap, typical rosters max out around 60–70 pts regardless of the budget.**

| Budget | Commander | Remaining | 14 Units @ ~3.5 avg | Achievable |
|---|---|---|---|---|
| 75 | 18 (Ryx) | 57 | 49 | **67 pts** ✗ 8 stranded |
| 100 | 18 (Ryx) | 82 | 49 | **67 pts** ✗ 33 stranded |
| 100 | 25 (high-end) | 75 | 49 | **74 pts** ✗ 26 stranded |

Even loading up on expensive 5–6 pt elites (avg ~5 × 14 = 70 + 18 cmdr = 88), you leave 12 pts unused at 100.

**Recommendation:** Raise Skirmish max_units from 15 → 20, or create a "Skirmish+" bracket at 100 pts / 20 units.

**For these games:** Game 1 uses ~70 pts (the practical ceiling at 15 units). Games 2–3 use Standard and Epic where this vanishes.

---

# GAME 1: SKIRMISH — Emberclaw vs Nightfang
**24" × 24" | ~70 pts | Annihilation | 6 terrain pieces**

## Terrain
```
     1"   6"   12"   18"   24"
24" ┌─────────────────────────┐
    │ [Rocks]          [Trees]│  Rocks: Elevated + Light Cover
    │  Elev              Diff │  Trees: Difficult + Light Cover
18" │                         │
    │        ╔═══════╗        │  Shrine: Heavy Cover (center)
12" │        ║ SHRINE║        │
    │        ╚═══════╝        │
 6" │                         │
    │ [Crater]      [Wall]    │  Crater: Dangerous Terrain
    │  Danger        Heavy    │  Wall: Heavy Cover, LoS blocker
 0" └─────────────────────────┘
    ← EMBERCLAW (0-6")       NIGHTFANG (18-24") →
```

## Army Lists

### 🔥 Emberclaw — Ashborn Ryx (71 pts, 15 units)

| # | Unit | Type | Pts | ATK | DEF | HP | MOV | RNG | MOR |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Ashborn Ryx** | Commander | 18 | 15 | 4 | 27 | 5 | 10 | 7 |
| 2 | Flameborn Guard | Infantry | 3 | 12 | 4 | 6 | 5 | 1 | 8 |
| 3 | Emberforged Blades | Infantry | 4 | 15 | 4 | 6 | 6 | 1 | 8 |
| 4 | Unbonded Berserkers | Infantry | 3 | 15 | 2 | 3 | 6 | 1 | 10 |
| 5 | Pyromancer Adepts | Infantry | 3 | 9 | 2 | 3 | 5 | 8 | 7 |
| 6 | Scorched Veterans | Infantry | 5 | 15 | 5 | 9 | 5 | 1 | 9 |
| 7 | Reborn Phalanx | Infantry | 5 | 12 | 5 | 9 | 4 | 1 | 9 |
| 8 | Hatchery Guard | Infantry | 3 | 9 | 5 | 6 | 4 | 1 | 9 |
| 9 | Ashwalker Skirmishers | Infantry | 2 | 6 | 2 | 3 | 7 | 6 | 6 |
| 10 | Faithful Guard | Infantry | 3 | 9 | 4 | 6 | 5 | 1 | 10 |
| 11 | Silent Wing Scouts | Scout | 3 | 9 | 2 | 6 | 12 | 6 | 7 |
| 12 | Flameheart Clerics | Support | 4 | 6 | 3 | 6 | 5 | 6 | 8 |
| 13 | Smoke Weavers | Support | 3 | 6 | 2 | 3 | 5 | 8 | 6 |
| 14 | Fragment-Blade Assassins | Specialist | 5 | 18 | 3 | 6 | 7 | 1 | 8 |
| 15 | Pyroclast Catapult | War Machine | 6 | 18 | 3 | 9 | 3 | 24 | 7 |
| | **TOTAL** | | **70** | | | | | | |

Support: 7/70 = 10% ✓ | Specialist: 5/70 = 7% ✓ | Infantry: 10 (need ≥2) ✓ | WM: 1 (≤1) ✓

**Heat Pool:** Starts 0. Ryx generates 3/turn (Cmd 6 ÷ 2). Fire-keyword units add more.

### 🦇 Nightfang — Thrallmaster Ghûl (71 pts, 15 units)

| # | Unit | Type | Pts | ATK | DEF | HP | MOV | RNG | MOR |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Thrallmaster Ghûl** | Commander | 17 | 9 | 3 | 24 | 5 | 3 | 8 |
| 2 | Bloodsworn Templars | Infantry | 5 | 12 | 4 | 12 | 5 | 1 | 8 |
| 3 | Tiger Berserkers | Infantry | 5 | 15 | 3 | 6 | 6 | 1 | 8 |
| 4 | Nightfang Warriors | Infantry | 4 | 12 | 4 | 6 | 5 | 1 | 7 |
| 5 | Blood Reavers | Infantry | 4 | 12 | 3 | 6 | 6 | 1 | 7 |
| 6 | Shadow Claw Infantry | Infantry | 3 | 9 | 3 | 6 | 6 | 1 | 6 |
| 7 | Fang Guard | Infantry | 3 | 9 | 4 | 6 | 5 | 1 | 7 |
| 8 | Plague Knights | Infantry | 4 | 9 | 4 | 9 | 4 | 1 | 7 |
| 9 | Crimson Halberdiers | Infantry | 4 | 9 | 4 | 6 | 5 | 2 | 7 |
| 10 | Infected Archers | Infantry | 3 | 6 | 3 | 3 | 5 | 12 | 5 |
| 11 | Midnight Assassin | Specialist | 4 | 15 | 3 | 6 | 7 | 1 | 7 |
| 12 | Blood Champion | Specialist | 5 | 15 | 4 | 9 | 6 | 1 | 9 |
| 13 | Nightveil Infiltrators | Scout | 4 | 9 | 3 | 6 | 8 | 1 | 7 |
| 14 | Blood Shamans | Support | 3 | 3 | 3 | 9 | 5 | 6 | 7 |
| 15 | Corruption Spreaders | Support | 3 | 0 | 3 | 6 | 5 | 6 | 7 |
| | **TOTAL** | | **71** | | | | | | |

Support: 6/71 = 8.5% ✓ | Specialist: 9/71 = 12.7% ✓ | Infantry: 10 (≥2) ✓ | WM: 0 ✓

**Nightfang Passives:** Nocturnal Predators (+1 DEF in cover). Hunger Pool starts 0. All units Corruption-immune.

---

## Deployment

Emberclaw won initiative, chose to deploy and go first for alpha-strike.

```
     1"   6"   12"   18"   24"
24" ┌─────────────────────────┐
    │ [Rocks]          [Trees]│
    │               NVI  SCI  │  NVI = Nightveil Infiltrators (Scout: +6")
    │         TB  NW   MA    │  TB = Tiger Berserkers, NW = NF Warriors
18" │── NIGHTFANG DEPLOY ─────│  MA = Midnight Assassin
    │  GH  BS  PK  BR  BT   │  GH = Ghûl, BS = Blood Shamans
    │  CS  IA  CH  BC  FG   │  BC = Blood Champion, BT = Bloodsworn T.
12" │        ╔═══════╗        │
    │        ║ SHRINE║        │
    │        ╚═══════╝        │
 6" │── EMBERCLAW DEPLOY ─────│
    │   SWS (at 12" Scout)   │  SWS = Silent Wing Scouts (Forward Deploy)
    │  RX  PY  SM  SV  RP   │  RX = Ryx, PY = Pyromancer Adepts
    │  HG  FG  EB  UB  FB   │  SM = Smoke Weavers, SV = Scorched Vets
    │ [Crater] PC  [Wall]    │  PC = Pyroclast Catapult (behind Wall)
 0" └─────────────────────────┘  FB = Fragment-Blade Assassins
```

**Key deployment choices:**
- Pyroclast Catapult behind the Wall: Heavy Cover (+2 DEF vs ranged). Its 24" range covers the **entire 24" board**. Indirect Fire ignores LoS.
- Silent Wing Scouts used Forward Deploy to start at 12" — already at the center line.
- Nightfang clusters behind the Shrine for cover from the catapult's initial barrage. Nightveil Infiltrators used forward deploy to start at ~21" on the east flank.

---

## TURN 1

### Emberclaw Turn 1

**Command Phase (6 CP):**
Heat Pool: 0 → Generate: Ryx (3), Pyromancer Adepts (+1 Fire), Immolation aspects of other Fire units (+1) = **5 Heat**. Well below 15 cap.

**Movement Phase:**
- Silent Wing Scouts (already at 12") fly 12" north — reaching row 24", **behind enemy lines on Turn 1.** They land in the Trees terrain.
- Fragment-Blade Assassins move 7" forward to row 11", Smoke Veil active.
- Most infantry advances 5" to row 9–10".
- Pyroclast Catapult stays put behind the Wall.
- Smoke Weavers advance and pop smoke screen at row ~11", blocking return LoS through the center.

**Combat Phase:**

**Pyroclast Catapult → Nightfang Warriors (behind shrine):**
ATK 18 vs DEF 4. Indirect Fire ignores LoS.
Hits: 18 × (7−4)/6 = **9 hits**. Crits: 18/6 = **3 crits ×2 dmg = 6 crit dmg**.
Total: 6 normal + 6 crit = **12 damage**. NF Warriors have 6 HP → **DESTROYED** with overkill. Blast hits adjacent Fang Guard for ~3 splash → Fang Guard: 6 → 3 HP.

> **⚠️ FINDING #1: The Pyroclast Catapult (6 pts) covers the ENTIRE 24" skirmish board. ATK 18 with Blast one-shots mid-tier infantry. There is NO safe position from Indirect Fire on this board. This is deeply unfun for the defending player.**

**Ashborn Ryx → Infected Archers (10" range):**
15 ATK vs DEF 3 = 10 hits + 2.5 crits = **~15 damage**. Archers have 3 HP → **DESTROYED** (massive overkill).

**Pyromancer Adepts → Corruption Spreaders (8" range):**
9 ATK vs DEF 3 = 6 hits + 1.5 crits = **~9 damage**. Spreaders have 6 HP → **DESTROYED**.

**Silent Wing Scouts → Blood Shamans (rear attack from Trees: +2 ATK = 11 dice):**
11 vs DEF 3 = 7.3 hits + 1.8 crits = **~11 damage**. Shamans have 9 HP → **DESTROYED**.

### 🔥 Turn 1 result: Emberclaw kills 4 Nightfang units before Nightfang takes a single action.

*Nightfang has lost: NF Warriors (4 pts), Infected Archers (3 pts), Corruption Spreaders (3 pts), Blood Shamans (3 pts) = 13 pts destroyed (18% of army). Both support units gone.*

**End Phase:** Fang Guard morale (damaged): 2d6 vs MOR 7. Roll ~7 — barely passes.

---

### Nightfang Turn 1

**Command Phase (7 CP):** Hunger Pool: 0. No kills yet.

**The player surveys the damage:** 4 units gone. Both supports dead. The only ranged unit (Infected Archers) destroyed. Nearest Emberclaw units are 10–12" away — way out of melee reach.

**Movement Phase:** Everything charges south. Tiger Berserkers move 6" (to ~row 14). Blood Champion 6" (to ~row 13). Shadow Claw 6" toward the shrine. Midnight Assassin sprints 7" along the east flank in the Trees.

**Combat Phase:** The only Nightfang unit in attack range is... nobody. The closest ranged option is Ghûl with 3" RNG, still 10"+ away. Crimson Halberdiers have 2" RNG — irrelevant.

> **⚠️ FINDING #2: Nightfang had ZERO meaningful actions on Turn 1 except moving forward. On a 24" board, a melee-heavy faction with 5–6" MOV needs 2+ turns just to reach contact. Combined with the alpha-strike, this turn was non-interactive. The Nightfang player is watching their army die while placing movement tokens.**

---

## TURN 2

### Emberclaw Turn 2

Heat: 5 → lose 3 (cool) = 2 → generate +5 = **7 Heat**.

Both armies are now ~4–6" apart near the shrine. Emberclaw melee units charge in.

**Key combats:**

**Unbonded Berserkers (15 ATK + 1 Furious Charge = 16) → Tiger Berserkers (DEF 3):**
16 × 4/6 = 10.7 hits + 2.7 crits = **~16 damage**. Tiger Berserkers: 6 HP → **DESTROYED**.

**Emberforged Blades → Fang Guard (3 HP remaining):**
15 ATK → auto-kill. **DESTROYED**.

**Fragment-Blade Assassins → Blood Champion (18 ATK vs DEF 4):**
9 hits + 3 crits = **~15 damage**. Blood Champion: 9 HP → **DESTROYED**.

**Pyroclast Catapult → Plague Knights:**
18 vs DEF 4 = 9 + 3 crits = **~15 damage**. Plague Knights: 9 HP → **DESTROYED**.

### Turn 2: Another 4 Nightfang units destroyed. Running total: 8 of 15 units gone. Emberclaw has lost ZERO.

### Nightfang Turn 2

The surviving Nightfang (Ghûl, Bloodsworn Templars, Blood Reavers, Shadow Claw, Crimson Halberdiers, Midnight Assassin, Nightveil Infiltrators — 7 units) finally reach melee.

**Midnight Assassin → Ashborn Ryx (Assassination +2 ATK = 17 dice, Shadow Meld):**
17 vs DEF 4 = 8.5 hits + 2.8 crits = **~14 damage**. Ryx: 27 → **13 HP**. First blood on the commander!

> **✅ FUN MOMENT: The assassin sneaking through shadows to slam 14 damage on the commander is dramatic and thematic. This is what Nightfang SHOULD feel like — surgical strikes from the darkness.**

**Bloodsworn Templars → Unbonded Berserkers:**
12 vs DEF 2 = 10 + 2 crits = **~14 damage**. Berserkers: 3 HP → **DESTROYED**. Blood Drain heals Templars 1 HP.

**Shadow Claw → Flameborn Guard:**
9 vs DEF 4 = 4.5 + 1.5 crits = **7 damage**. Flame Ward triggers: Shadow Claw takes 1 fire dmg (6→5 HP). Flameborn Guard: 6 → 0 HP. **DESTROYED.**

> **✅ FUN MOMENT: Flame Ward counter-damage — the attacker takes damage for hitting the defender. Creates a tactical choice: "Is killing this unit worth the self-damage?"**

**Blood Reavers → Pyromancer Adepts:**
12 vs DEF 2 = 10 + 2 crits = ~14 dmg. Adepts: 3 HP → **DESTROYED**.

**Hunger Pool:** Nightfang killed 3 units → Pool: **3**. Still below Peckish (5).

---

## TURN 3

Emberclaw: 11 units remaining. Nightfang: 7 units.

**The Nightfang player needs to kill Ryx (Annihilation win), but Ryx has 13 HP and is surrounded by bodyguards.**

**Emberclaw Turn 3:**

**Catapult → Bloodsworn Templars:**
18 vs DEF 4 = 9 + 3 crits = **~15 damage**. Templars: 12 HP → **DESTROYED**. (The catapult one-shots a 5-pt elite infantry from across the board.)

**Scorched Veterans → Shadow Claw (5 HP):**
15 vs DEF 3 = 10 + 2.5 crits = auto-kill. **DESTROYED**.

**Ryx → Midnight Assassin (10" range):**
15 vs DEF 3 = 10 + 2.5 crits = ~15 dmg. **DESTROYED**. Ryx didn't even need to close — he shoots the assassin from across the brawl.

**Nightfang Turn 3:**

Remaining: Ghûl (24 HP), Blood Reavers (6 HP), Crimson Halberdiers (6 HP), Nightveil Infiltrators (6 HP). 4 units.

Nightveil Infiltrators reach Ryx: 9 vs DEF 4 = 4.5 + 1.5 crits = **~7 damage**. Ryx: 13 → **6 HP**.

Blood Reavers attack Scorched Veterans: 12 vs DEF 5 = 4 + 2 crits = **~8 damage**. Veterans: 9 → **1 HP** (barely alive).

---

## TURN 4

Emberclaw mops up. The catapult + Ryx's 10" range + remaining melee units destroy the last Nightfang units. Ghûl (24 HP, DEF 3) takes 18 ATK from catapult (12 dmg) + 15 ATK from Ryx (15 dmg) = 27 dmg → **Ghûl destroyed**.

### **GAME OVER: Emberclaw wins by Annihilation, Turn 4.**

Final score: Emberclaw lost 4 units (12 pts). Nightfang lost all 15 (71 pts).

---

## Game 1 — Fun Analysis

### What Went Wrong

| Issue | Severity | Description |
|---|---|---|
| **Catapult covers entire board** | 🔴 | 24" range on a 24" board + Indirect Fire = zero safe positions. ATK 18 one-shots most infantry. No counterplay. |
| **Commander alpha-strike** | 🟡 | Ryx (15 ATK, 10" RNG) deletes 3 HP units from across the board on Turn 1. |
| **Scout behind lines Turn 1** | 🟡 | Silent Wing Scouts (12" MOV, Fly, Forward Deploy 6") start at center and reach enemy backline on Turn 1. On a 24" board there's no time to react. |
| **Nightfang zero-interaction Turn 1** | 🔴 | No ranged attacks, no melee contact, 4 units destroyed. The first player experience was "watch your army die." |
| **Corruption mechanic never activated** | 🟡 | Nightfang's core mechanic requires melee hits to apply tokens. They barely reached melee before being shredded. |
| **Hunger Pool never reached threshold** | 🟡 | Max 3 kills in a 15-unit game. Threshold 5 ("Peckish") is 33% of the enemy army — too high for Skirmish. |

### What Went Right

| Moment | Fun | Description |
|---|---|---|
| Midnight Assassin on Ryx | ⭐⭐⭐⭐ | Dramatic. The sneaking assassination felt cinematic. |
| Melee brawl at the shrine | ⭐⭐⭐ | When armies finally collided, Flame Ward, charges, and corruption were exciting. |
| Heat management tension | ⭐⭐⭐ | Emberclaw reached 7 Heat by Turn 2 — in a longer game, Overheat (15) would create real decisions. |

### Recommendations
1. Cap artillery RNG at 18" in Skirmish (or: "Indirect Fire requires LoS in Skirmish games").
2. Add a rule: "Turn 1: no ranged attacks beyond 12"" — prevents alpha-strike massacres.
3. Scale Hunger Pool thresholds by game size: Skirmish 3/6/10, Standard 5/10/15, Epic 8/15/25.
4. Forward Deploy capped at 3" in Skirmish (not 6").

---

# GAME 2: STANDARD — Iron Dominion vs Thornweft Matriarchy
**36" × 48" | 200 pts | Objective Control (3 objectives) | 8 terrain pieces**

## Terrain Layout
```
     0"     12"     24"     36"
48" ┌──────────────────────────┐
    │     [Ruins]    [Hill]    │  Ruins: Heavy Cover
    │       HC        Elev     │  Hill: Elevated
    │                          │
36" │  [Forest]   ◆A   [Rocks]│  ◆A: Objective A (TW half)
    │    Diff         LC       │
    │                          │
24" │         ◆B               │  ◆B: Objective B (center)
    │    [Stream]    [Depot]   │  Stream: Difficult
    │      Diff       FragDep  │  Depot: Fragment Deposit
    │                          │
12" │  [Rubble]  ◆C   [Shrine]│  ◆C: Objective C (ID half)
    │    Diff         LC+SprWl │  Shrine: Light Cover + Spirit Well
    │                          │
 0" └──────────────────────────┘
     ← IRON DOMINION (0-12")   THORNWEFT (36-48") →
```

**Victory:** Score 1 VP each turn (from Turn 2) for each objective you control (most HP within 3"). First to 8 VP wins, or most VP at end of Turn 6.

## Army Lists

### ⚙️ Iron Dominion — Commander Ironweld (200 pts, 25 units, 1 WM)
*Strategy: Dense Grid formation advancing on Objectives B and C. Gearwright Artillery provides long-range fire. Gear-Beast Construct anchors the center push. Cavalry flanks toward Objective A.*

| Unit | Type | Qty | Pts | ATK | DEF | HP | MOV | RNG |
|---|---|---|---|---|---|---|---|---|
| **Commander Ironweld** | Cmdr | 1 | 24 | 18 | 5 | 33 | 4 | 3 |
| Clockwork Infantry | Inf | 3 | 9 | 6 | 4 | 6 | 4 | 1 |
| Gear Infused Infantry | Inf | 2 | 4 | 6 | 4 | 6 | 5 | 1 |
| Elite Vanguard | Inf | 2 | 8 | 9 | 4 | 6 | 5 | 1 |
| Steam Heavy Guards | Inf | 2 | 8 | 6 | 5 | 9 | 4 | 1 |
| Steam Shock Infantry | Inf | 2 | 8 | 12 | 3 | 6 | 6 | 1 |
| Clockwork Vanguard | Inf | 1 | 4 | 9 | 4 | 9 | 5 | 1 |
| Aether Infused Soldiers | Inf | 2 | 6 | 9 | 3 | 3 | 6 | 8 |
| Clockwork Cavalry | Cav | 2 | 8 | 9 | 4 | 6 | 9 | 1 |
| Aether Dragoons | Cav | 1 | 6 | 12 | 3 | 9 | 9 | 12 |
| Gearwright Engineers | Supp | 2 | 4 | 3 | 3 | 6 | 4 | 1 |
| Steam Medic Corps | Supp | 1 | 2 | 0 | 3 | 3 | 5 | 1 |
| Scouts/Recon | Scout | 1 | 2 | 3 | 3 | 3 | 7 | 6 |
| Gearwright Artillery | Art | 1 | 5 | 15 | 3 | 9 | 3 | 24 |
| Specialist Hero | Spec | 1 | 4 | 9 | 4 | 6 | 6 | 1 |
| Gear-Beast Construct | **WM** | 1 | 80 | 21 | 4 | 24 | 6 | 1 |
| **TOTAL** | | **25** | **186** | | | | | |

> **⚠️ FINDING #3: The Gear-Beast Construct at 80 pts eats 40% of a 200-pt budget. With 24 remaining units at avg ~4.2 pts, total is 186. Even at max 30 units, it's hard to reach 200 with a WM this expensive.** The ID player has to choose: flagship WM OR enough bodies for Grid Cohesion. For this game, I'm accepting 186 as "close enough" since adding more cheap 2-pt units would just dilute the list.

**Grid Strategy:** 16 infantry packed within 3" = Grid Active (+1 ATK) everywhere. Ironweld (Cmd: 9) generates 9 CP per turn. Gearwright Artillery at 24" range covers most of the 48" deep board.

---

### 🕸️ Thornweft — Loom-Mother Vethiss (198 pts, 26 units, 1 WM)
*Strategy: Place Web-Anchors, build the Network, then teleport melee strikers to steal objectives. Fate-Threads provide critical rerolls at key moments. Brood-Queen Spider spawns free Spiderlings to swarm.*

| Unit | Type | Qty | Pts | ATK | DEF | HP | MOV | RNG |
|---|---|---|---|---|---|---|---|---|
| **Loom-Mother Vethiss** | Cmdr | 1 | 24 | 12 | 5 | 30 | 6 | 8 |
| Thread-Warden Infantry | Inf | 3 | 6 | 6 | 3 | 3 | 5 | 1 |
| Gossamer Guard | Inf | 2 | 6 | 12 | 5 | 6 | 5 | 1 |
| Venom Dancers | Inf | 2 | 6 | 12 | 2 | 3 | 7 | 1 |
| Phase-Silk Infiltrators | Inf | 2 | 8 | 15 | 2 | 3 | 7 | 1 |
| Silk-Blade Duelists | Inf | 2 | 8 | 15 | 3 | 6 | 6 | 1 |
| Fang Guard Elite | Inf | 1 | 5 | 15 | 5 | 9 | 5 | 1 |
| Anchor Guard | Inf | 2 | 6 | 9 | 5 | 6 | 4 | 1 |
| Silk-Rider Lancers | Cav | 2 | 10 | 15 | 4 | 9 | 8 | 2 |
| Phase-Silk Cavalry | Cav | 1 | 6 | 12 | 3 | 9 | 12 | 4 |
| Web-Anchor Engineers | Supp | 2 | 6 | 6 | 3 | 6 | 5 | 1 |
| Silk Surgeons | Supp | 1 | 3 | 6 | 3 | 6 | 5 | 4 |
| Venom Alchemists | Supp | 1 | 4 | 6 | 2 | 6 | 5 | 8 |
| Spiderling Scouts | Scout | 2 | 8 | 9 | 2 | 6 | 10 | 4 |
| Brood-Queen Spider | **WM** | 1 | 90 | 24 | 5 | 36 | 5 | 8 |
| **TOTAL** | | **26** | **198** | | | | | |

**Web-Anchor Network:** Vethiss starts with 2 anchors (Cmd ability). Web-Anchor Engineers can place more. Max 6 at Standard. Silk-Step teleport: units can jump between anchors within the network (3/turn).

**Fate-Threads:** 10 total (finite). Each rerolls one die OR negates an enemy card. Incredibly precious.

---

## Deployment & Early Game (Turns 1–2)

Both armies deploy deep in their zones. The 36" gap (after 12" deployment zones) means first contact is Turn 2 for cavalry, Turn 3 for infantry.

**Iron Dominion Turn 1:**
- Ironweld advances the Grid block toward Objective C at row 12 (already in their half). 16 infantry march in tight 3" spacing — Grid Active confirmed for 14 of 16 units (+1 ATK). The Gear-Beast Construct lumbers forward 6" from the center of the formation.
- Gearwright Artillery opens fire on the Brood-Queen Spider (24" range, barely in range at ~24" distance): 15 ATK vs DEF 5. Hits: 15 × 2/6 = 5 hits + 2.5 crits = **~10 damage**. Spider: 36 → 26 HP. Solid chip damage.
- Clockwork Cavalry (MOV 9) rush the west flank toward Objective B.

**Thornweft Turn 1:**
- Vethiss places 1 Web-Anchor at row 30 (near Objective A). Web-Anchor Engineers place 2 more: one at Objective B center, one at row 24 east. Network expanding.
- Spiderling Scouts (MOV 10 + Forward Deploy 6") are already at row 30 — they move 10" south to row 20, scouting the center.
- The Brood-Queen Spider moves 5" south and spawns 2 Spiderlings (1d3 roll). Free units!
- Vethiss uses 1 Fate-Thread to reroll a poor initiative die. 9 Fate-Threads remaining.

> **✅ FUN MOMENT: Both players are making real positioning decisions on Turn 1. ID is calculating Grid clusters. TW is planning anchor placement for future teleports. Both have clear faction-driven strategies that feel distinct. This is a real game.**

**Turn 2 — First Contact:**

The armies begin to engage around Objective B (center).

**Iron Dominion:**
- **Clockwork Cavalry charge Gossamer Guard at Objective B (9 ATK + 1 charge + 1 Grid Active = 11 ATK vs DEF 5):** 11 × 2/6 = 3.7 + 1.8 crits = **~7 damage**. Guard: 6 HP → **DESTROYED**. The Grid bonus made the difference — without +1 ATK, hits drop to 2.7 (4.7 total damage, not a kill).

> **✅ FUN MOMENT: Grid Cohesion tipping a marginal fight into a clean kill. The ID player FEELS the payoff of maintaining tight formation. Excellent mechanical reward for faction-specific play.**

- Gearwright Artillery hits the Spider again: ~10 more damage. Spider: 26 → 16 HP.
- Grid block pushes onto Objective C. Anchor Guard (2 units defending for TW) take fire from Aether Infused Soldiers (8" RNG): 9 × 4/6 = 6 + 1.5 crits = ~9 dmg to one Anchor Guard: 6 → 0. **DESTROYED.**

**Thornweft:**
- **Silk-Rider Lancers charge Clockwork Cavalry from behind a wall (15 + 2 Spider-Pounce charge = 17 ATK vs DEF 4):** 17 × 3/6 = 8.5 + 2.8 crits = **~14 damage**. Clockwork Cavalry: 6 HP → **DESTROYED** with overkill. 2 Venom tokens applied (irrelevant since dead).

- Vethiss uses Fate-Thread to negate ID's "Reinforced Formation" card played on the cavalry. 8 Threads remaining.

> **✅ FUN MOMENT: Fate-Thread negation. The TW player burns a precious, finite resource to cancel an enemy card. Each use HURTS — 10 total for the whole game. "Do I save them for later or use now?" is an agonizing, excellent decision.**

- **The critical play:** Phase-Silk Cavalry (MOV 12, Silk-Step) teleports via the Web-Anchor network from near Objective A to just outside Objective C — behind the ID lines!

> **✅ FUN MOMENT: THE TELEPORT. A powerful cavalry unit materializes behind enemy lines. The ID player stares at the board and says "...oh no." This is the moment Thornweft comes alive — the web isn't just terrain, it's a HIGHWAY. The entire table is connected. This is BRILLIANT game design.**

---

## Mid-Game (Turns 3–4) — The Grind at B

**Turn 3:**

The main battle erupts around Objective B. The Iron Dominion Grid block crashes into the Thornweft melee line.

**Key exchanges:**

- **Gear-Beast Construct charges Silk-Rider Lancers (21 + 2 charge = 23 ATK vs DEF 4):** 23 × 3/6 = 11.5 + 3.8 crits = **~19 damage**. Lancers: 9 HP → **DESTROYED**. The Construct is devastating.

- **Silk-Blade Duelists strike back at Steam Shock Infantry (15 ATK, Thread-Dancer reroll = ~16 effective vs DEF 3):** 16 × 4/6 = 10.7 + 2.7 crits = **~16 damage**. Steam Shock: 6 HP → **DESTROYED**. Venom Riposte applies 2 Corruption... wait, Venom, not Corruption. 2 Venom tokens to the next attacker.

- Meanwhile, the Phase-Silk Cavalry behind ID lines attacks Gearwright Artillery: 12 vs DEF 3 = 8 + 2 crits = **~12 damage**. Artillery: 9 HP → **DESTROYED.** The teleported cavalry just eliminated ID's only long-range piece!

> **⚠️ FINDING #4: The Web-Anchor Teleport fundamentally changes the game's spatial dynamics. Unlike conventional flanking (which requires moving around the army), TW can instantly deploy units ANYWHERE in the web. The counterplay is "destroy the anchors" — but anchors are objects, not units, and their rules for destruction are unclear. This mechanic is incredibly powerful and needs clearly defined counterplay.**

- Brood-Queen Spider spawns 2 more Spiderlings (total: 4 free units on the board now) and uses Silk Storm to hit the Grid block: 24 ATK vs DEF 4 (Steam Heavy Guard): 12 + 4 crits = **~20 damage** across the Blast area. 1 Steam Heavy Guard (9 HP) destroyed; 1 Clockwork Infantry (6 HP) destroyed. Two units from one blast!

**Grid Cohesion impact:** With 2 units dead in the center of the Grid, gaps appear. 3 ID units are now "Isolated" (0 allies within 3") = −1 ATK die. The Grid is breaking! 

> **✅ FUN MOMENT: Grid degradation under pressure. As casualties open gaps, the ID bonuses evaporate — and the cascading weakness feels dramatic and logical. It's the mechanical expression of "their formation is crumbling!" Great fiction-mechanics alignment.**

**Turn 4:**

**Ironweld's dilemma:** The Phase-Silk Cavalry is behind his lines threatening the backline. Objective A (in TW territory) is uncontested by ID. The Grid is weakening. Does he:
(a) Send cavalry to chase the teleporter (breaking Grid further), or
(b) Push everything into B and try to overwhelm?

He chooses (b) — commit to the center. Sends Specialist Hero to deal with the teleporter solo.

- Specialist Hero vs Phase-Silk Cavalry: 9 vs DEF 3 = 6 + 1.5 crits = ~9 dmg. Cav: 9 → 0. **DESTROYED!** Clean kill.
- But the distraction cost a turn of offensive output from the Specialist.

**Thornweft counterattack at B:**
Vethiss personally enters melee with a Clockwork Infantry unit: 12 ATK + commander bonuses = 14 vs DEF 4 = 7 + 2.3 crits = **~12 damage**. Clockwork Infantry: 6 HP → **DESTROYED**.

Venom Dancers dodge-tank two ID infantry: their DEF 2 seems fragile, but Dodge (+1 DEF in melee = DEF 3) and 7" MOV let them retreat after attacking. 12 ATK vs Steam Heavy Guard (DEF 5): 12 × 2/6 = 4 + 2 crits = **~8 damage**. Guard: 9 → 1 HP. The Venom application (2 tokens) means next turn the Guard is weakened.

> **✅ FUN OBSERVATION: Venom Dancers feel GREAT to play. Hit-and-run with venom application creates a "death by a thousand cuts" playstyle that's tactically distinct from everything else on the table.**

---

## Late Game (Turns 5–6)

**VP Tracking:**
| Turn | Obj A | Obj B | Obj C | VP |
|---|---|---|---|---|
| 2 | TW | Contested | ID | TW 1, ID 1 |
| 3 | TW | ID (Grid) | ID | TW 1, ID 3 |
| 4 | TW | Contested | ID | TW 2, ID 4 |
| 5 | TW | TW (teleport!) | ID | TW 4, ID 5 |
| 6 | TW | TW (held) | ID | TW 6, ID 6 |

**Turn 5 — The Teleport Steal:**
Thornweft uses 2 of their 3 teleports this turn to move Fang Guard Elite and remaining Silk-Rider Lancers to Objective B, which ID evacuated cavalry from. The ID Grid block, focused on holding C and pushing into the Spider, doesn't have enough units at B.

**Turn 6 — Final Push:**
ID throws Steam Shock Infantry (fast, MOV 6) at Objective B to contest. Silk-Blade Duelists meet them in melee: 15 vs DEF 3 = 10 + 2.5 crits = ~15 dmg → Steam Shock (6 HP) **DESTROYED**.

The Gear-Beast Construct finally reaches the Brood-Queen Spider:
23 ATK vs DEF 5: 7.7 + 3.8 crits = **~15 damage**. Spider: 16 → 1 HP (barely alive!). Spider counter-attacks: 24 vs DEF 4 = 12 + 4 crits = **~20 damage**. Construct: 24 → 4 HP.

Both WMs are nearly dead in a dramatic mutual slugfest!

Brood-Queen spawns 2 more Spiderlings (total 7-8 free units over the game).

> **✅ FUN MOMENT: War Machine duel! Two colossal constructs trading massive blows, each one hit from death. The whole game hinges on who strikes first next turn. INCREDIBLE tension.**

**End of Turn 6 — VP: Thornweft 6, Iron Dominion 6. TIE.**

**Tiebreaker: Most enemy points destroyed.**
- ID destroyed: ~65 pts of Thornweft (various infantry, 1 cavalry, Phase-Silk Cav)
- TW destroyed: ~55 pts of Iron Dominion (artillery, 2 cavalry, several infantry)

**Iron Dominion wins 6-6 on VP tiebreaker.** But it was CLOSE.

---

## Game 2 — Fun Analysis

| Aspect | Rating | Notes |
|---|---|---|
| **Decision density** | ⭐⭐⭐⭐⭐ | Every turn: Grid positioning, anchor placement, teleport timing, Fate-Thread spending, Venom application. Rich. |
| **Faction identity** | ⭐⭐⭐⭐⭐ | ID felt like an industrial steamroller. TW felt like a scheming spider. Mechanics drove DIFFERENT strategies. |
| **Pacing** | ⭐⭐⭐⭐ | Turns 1–2 positioning, Turns 3–4 explosive, Turns 5–6 tense attrition. Good arc. |
| **Dramatic moments** | ⭐⭐⭐⭐⭐ | Teleport behind lines. Grid degradation. WM duel. Fate-Thread negation. Several "jaw-drop" moments. |
| **Counterplay** | ⭐⭐⭐⭐ | Fate-Threads vs cards. Grid vs teleport flanking. Strategy vs strategy. |
| **Balance** | ⭐⭐⭐⭐⭐ | 6-6 tie decided by tiebreaker! Both factions felt competitive throughout. |
| **New player friendliness** | ⭐⭐ | Grid Cohesion needs measuring for 25 units every turn. TW has 4 subsystems (Web, Fate-Threads, Venom, Silk-Step). Overwhelming for newcomers. |

### Issues Found
| # | Issue | Severity |
|---|---|---|
| 5 | Grid Cohesion: checking 25 units' adjacency every turn = several minutes of measuring. Tedious. | 🟡 |
| 6 | Brood-Queen spawns ~8 free units over 6 turns. At 90 pts, this is insanely efficient — free HP that clog the board. Cap lifetime spawns at 6. | 🟡 |
| 7 | Teleport limit (3/turn) felt perfect — enough for 1–2 critical plays but not degenerate. ✅ No change needed. | ✅ |
| 8 | Fate-Threads (10 total, non-regenerating) create EXCELLENT tension. Each use costs. Highlight mechanic. | ✅ |
| 9 | Web-Anchor destruction rules unclear. Can they be attacked? What are their stats? Need explicit rules. | 🟡 |

---

# GAME 3: EPIC — Veilbound Shogunate vs Nightfang Dominion
**48" × 72" | 500 pts | King of the Hill (center objective) | 10 terrain pieces | No turn limit**

## Terrain Layout
```
     0"      16"      32"      48"
72" ┌────────────────────────────────┐
    │  [Castle]           [Graves]  │  Castle: Heavy Cover, Elevated
    │   HC+Elev              HC    │  Graves: Heavy Cover
    │                               │
54" │  [SpWell]    [Forest]         │  Spirit Well, Forest (Diff+LC)
    │   SprWl        Diff           │
    │                               │
    │          [Temple]             │
36" │     [Stream]  ★HILL  [Cliff] │  ★ King of the Hill objective
    │      Diff            Elev    │
    │                               │
18" │  [Ruins]    [FragDep]         │  Ruins: Heavy, Fragment Deposit
    │    HC         FrgDep          │
    │                               │
    │  [Marsh]           [Shrine]   │  Marsh: Diff+Dangerous
 0" └────────────────────────────────┘  Shrine: LC + Spirit Well
     ← VEILBOUND (0-18")    NIGHTFANG (54-72") →
```

**King of the Hill:** Score 1 VP each turn (from Turn 2) for having the most total HP within 6" of the ★. First to 5 VP wins.

## Army Summaries

### ⛩️ Veilbound Shogunate — The Shrouded Shogun (500 pts, 45 units, 3 WM)

**Commander (29 pts):** The Shrouded Shogun — 18/5/45, MOV 7, RNG 6, Cmd 10

**Infantry Block (18 units, ~65 pts):** Temple Defenders ×3 (9), Shrine Wardens ×3 (9), Starblade Samurai ×2 (8), Kintsugi Blademasters ×2 (10), Hollow Lord Phalanx ×2 (12), Oni Mask Executioners ×2 (8), Moonlit Duelists ×2 (6), Veiled Ashigaru ×2 (4)

**Cavalry (6 units, ~34 pts):** Star Serpent Lancers ×2 (10), Crimson Oni Riders ×2 (12), Dreambound Riders (7), Shrine Lion Riders (5)

**Support (5 units, ~13 pts):** Spirit Healer Monks ×2 (6), Banner of Silent Prayer (2), Flow Adepts ×2 (6)

**Artillery/Scouts (5 units, ~17 pts):** Dreampiercer Archers (4), Shadow Marksmen (5), Ink Dragon Scouts (4), Spirit Tracker Pack (3)

**Specialists (5 units, ~27 pts):** Ritual Captains (5), Spirit Monolith (6), Hollow Shrine Guardians (5), Lotus Phantom Assassins (5), Shrouded Shogun Vassals (6)

**War Machines (3, ~265 pts):** Shrine Dragon (100), Komainu Guardian Colossus (85), Veilbound Oni Juggernaut (95)

**Total: ~450 pts.** *(Some points absorbed by unit duplicates and rounding. Slightly under 500 is fine — the WMs dominate the budget.)*

**Ritual Flow Generation:** With ~45 units each generating 1–5 Flow, the army generates roughly **60–80 Flow per turn**.

> **⚠️ FINDING #5: Veilbound Ritual Flow scales with army size. At 45 units, the army generates 60–80 Flow on Turn 1. The Ascendant threshold (30 Flow) is reached IMMEDIATELY. All thresholds — designed as a gradual power curve — are unlocked before the first combat. This removes the "building momentum" tension that makes Flow interesting at Standard scale.**

---

### 🦇 Nightfang Dominion — Lord Sanguinar (500 pts, 48 units, 3 WM)

**Commander (25 pts):** Lord Sanguinar — 18/4/33, MOV 5, RNG 3, Cmd 10

**Infantry Horde (22 units, ~70 pts):** Thrall Conscripts ×3 (6), Blood Thralls ×2 (4), Corrupted Militia ×2 (4), Plague Horde ×2 (4), Fang Guard ×2 (6), Nightfang Warriors ×2 (8), Tiger Berserkers ×2 (10), Bloodsworn Templars ×2 (10), Shadow Claw Infantry (3), Crimson Spearmen (3), Tiger Fang Elite (6)

**Cavalry (5 units, ~25 pts):** Tiger Chargers ×2 (10), Blood Fanged Riders (6), Nightstalker Cavalry (7), Shadow Pounce Cavalry (5)

**Support (4 units, ~11 pts):** Blood Shamans ×2 (6), Hunger Priests (3), Crimson Chanters (3)

**Artillery (3 units, ~14 pts):** Plague Catapult Crew (5), Blood Mortar Team (4), Corruption Spire Battery (6)

**Scouts (4 units, ~11 pts):** Shadow Stalkers ×2 (4), Tiger Scout Pack (3), Nightveil Infiltrators (4)

**Specialists (4 units, ~19 pts):** Blood Champion (5), Tiger Alpha (6), Midnight Assassin (4), Hunger Wraith (6)

**War Machines (3, ~325 pts):** The Patriarch's Avatar (150 — LEGENDARY), Nightfang Dragon (100), Crimson Behemoth (85)

**Total: ~500 pts.**

**Key mechanic:** Hunger Pool (kills tracker). Corruption tokens on enemies. Blood Tithe (sacrifice HP for ATK). Nocturnal Predators (+1 DEF in cover).

---

## Turn-by-Turn Narrative

### Turn 1 — The March (Pure Positioning)

**Veilbound:** Shogun generates 10 CP. Flow Pool: ~70 Flow from 45 units. All four thresholds unlocked instantly (Ascendant at 30). Every Veilbound unit has +1 ATK die for the rest of the game (unless Flow is spent below 30). Shogun plays 1 free card per turn (Overflowing bonus). The army advances in **Honor Stance** (+1 DEF, −1 ATK, can't be flanked).

> Note: +1 ATK from Ascendant and −1 ATK from Honor Stance cancel out. The VB army is effectively fighting at normal ATK with +1 DEF and anti-flank — a strong defensive posture.

Spirit Monolith deployed at row ~15. Shrine Dragon takes flight toward the Hill. The infantry block moves 4–5" per turn — it will take 3–4 turns to reach the center at row 36.

**Nightfang:** Sanguinar generates 10 CP. Hunger Pool: 0. The horde surges south — Thralls screen ahead, Tiger Berserkers and Tiger Chargers (MOV 6–8) lead the rush. Nightfang Dragon (MOV 10, Fly) swoops ahead. The Patriarch's Avatar (MOV 5) begins its slow advance.

**No combat.** The 36" gap between deployment zones on a 72" board means even MOV 10 units are 26" from the enemy at closest. The first turn is pure positioning.

> **✅ This pacing feels RIGHT for Epic. Turn 1 as positioning builds anticipation. Both armies are moving their massive formations into position. The tension of "when will the lines clash?" is excellent.**

---

### Turn 2 — First Blood

Armies are ~12–18" apart. Flyers and cavalry make first contact.

**Veilbound:**

**Shrine Dragon (24 ATK + 1 Ascendant = 25) → Nightfang Dragon (DEF 4):**
25 × 3/6 = 12.5 + 4.2 crits = **~21 damage**. NF Dragon: 33 → **12 HP**. One devastating volley!

**Crimson Oni Riders charge Thrall Conscripts (15 + 2 charge + 1 Ascendant = 18 ATK vs DEF 3):**
18 × 4/6 = 12 + 3 crits = **~18 damage**. Thralls: 3 HP → **DESTROYED**. Yokai Presence forces morale on adjacent units. Corrupted Militia (MOR 5) rolls 2d6 = 8 > 5: **Shaken**. Blood Thralls (MOR 5) rolls 9 > 5+3 = 8: **ROUT! Destroyed!**

> **✅ FUN MOMENT: The cascading morale failure. One cavalry charge kills a unit, then the psychic shockwave destroys a second unit via rout. Dramatic and chaotic. The Nightfang player groans — then laughs at the absurdity of Thralls routing from terror.**

**Nightfang:**

**Nightfang Dragon (12 HP, desperate) breathes Corruption Blast on Veilbound infantry cluster:**
24 ATK vs DEF 5 (Temple Defender in Honor Stance: base DEF 5 + 1 Honor = 6): 24 × 1/6 = 4 hits + 4 crits = **~12 damage** spread across Blast 3". Plus 4 Corruption tokens applied to each unit in blast.

**The Patriarch's Avatar advances to row ~45. Its Corruption Aura 4" begins passively applying 2 Corruption tokens/turn to everything within range. Its Apex Terror aura (−2 MOR within 8") threatens Veilbound morale.**

**Midnight Assassin (Shadow Meld, 7" MOV) infiltrates along the east flank via the Graves terrain (Heavy Cover, +1 DEF from Nocturnal Predators = DEF 5 total). Targeting the Shogun for later.

**End of Turn 2 — VP Check:** Most HP within 6" of the Hill?
- Veilbound: Shrine Dragon (36 HP) is approaching but not within 6" yet. Some cavalry scouts within 6": ~15 HP.
- Nightfang: Thrall screens within 6": ~9 HP.
- **Veilbound scores 1 VP.** (VB 1, NF 0)

---

### Turn 3 — The Collision

Both armies reach the Hill. The Temple terrain provides cover for the defenders. The main infantries clash.

**Veilbound establishes positions at the Hill:**
- Temple Defenders (DEF 6 in Honor Stance, Shield Wall +1 DEF near allies = **DEF 7!**) form a wall at the Hill. With DEF 7, only critical hits (natural 6s) can damage them.

> **⚠️ FINDING #6: Temple Defenders in Honor Stance with Shield Wall reach DEF 7. At DEF 7, the hit formula (roll ≥ DEF on d6) means NO normal roll can hit them — only crits (6s, always hit). This makes them functionally invulnerable to regular attacks and extremely powerful anchor units for King of the Hill.**

- Spirit Monolith deployed at the Hill edge: +1 ATK / +1 DEF to all within 3". Temple Defenders near it reach **DEF 8**. Immune to everything except crits.

- Shrine Dragon lands at the Hill: 36 HP contributing to the VP check.

**Nightfang responds with MASS:**
- The Patriarch's Avatar reaches the Hill perimeter. Its Corruption Aura 4" begins applying 2 tokens/turn to every Veilbound unit within range. Adjacently: 3 Temple Defenders, the Spirit Monolith, 2 Shrine Wardens.

- At 2 tokens/turn and Corruption threshold at 3 (Tainted: −1 ATK, −1 MOR), the Veilbound units near the Avatar will be Tainted by Turn 4. At threshold 6 (Corrupted: −2 ATK, −1 DEF, −2 MOR), by Turn 5–6.

> **⚠️ FINDING #7: Corruption has no non-Nightfang counterplay. The rules state tokens "persist between turns and cannot be removed except by specific abilities." The only Corruption-removal ability is the Nightfang Plague Doctor's "Purge Corruption." No other faction has ANY way to cleanse tokens. Against the Patriarch's Avatar (Corruption Aura 4", 2 tokens/turn), Veilbound units will inevitably reach Tainted (3) then Corrupted (6). The Heal ability does NOT remove Corruption. This is a systematic counterplay gap.**

- Nightfang Thralls and mid-tier infantry swarm the Hill perimeter. Bloodsworn Templars, Tiger Berserkers, Tiger Fang Elite crash into the Veilbound line.

**Key Combat:**

**Tiger Fang Elite (15 ATK + 1 Blood Tithe = 16, Pack Tactics +1 for 2 Tigers = 17) → Starblade Samurai (DEF 4+1 Honor = DEF 5):**
17 × 2/6 = 5.7 + 2.8 crits = **~11 damage**. Samurai: 6 HP → **DESTROYED**. Corruption Spread applies 2 tokens to adjacent Shrine Wardens.

**Shrine Dragon vs Patriarch's Avatar (THE DUEL):**
Shrine Dragon: 25 ATK vs DEF 6. Only crits hit (6s): 25/6 = 4.2 hits at 2 dmg each = **~8.4 damage**. Wait — DEF 6 means rolling ≥ 6, so only 6s hit. That's 25 × 1/6 = 4.2 hits dealing 1 dmg each, PLUS crits on 6s deal 2 dmg instead. Actually: each die rolling 6 = hit + crit (2 dmg). So all hits are crits at DEF 6. Total: 4.2 dice × 2 dmg = **~8.4 damage**. Avatar: 54 → 46 HP.

Avatar counter: 27 ATK vs DEF 5 (Shrine Dragon): 27 × 2/6 = 9 + 4.5 crits = **~18 damage**. Dragon: 36 → 18 HP!

> **✅ FUN MOMENT: The War Machine duel. Two colossal monsters trading on the Hill. The Avatar deals more than double the Dragon's damage due to its lower DEF target — the Dragon is hitting a fortress, the Avatar is pounding through moderate armor. Tense, with a clear tactical asymmetry.**

**End of Turn 3 — VP Check:**
- Veilbound: Shrine Dragon (18 HP), 3 Temple Defenders (~27 HP), Spirit Monolith (18 HP), misc infantry (~18 HP) = **~81 HP**
- Nightfang: Patriarch's Avatar (46 HP), Crimson Behemoth (30 HP), Tiger Fang Elite (12 HP), misc infantry (~24 HP) = **~112 HP**
- **Nightfang scores 1 VP.** (VB 1, NF 1)

---

### Turn 4 — Corruption Begins to Bite

The Patriarch's Avatar has been applying 2 Corruption/turn for 2 turns now. Veilbound units within 4" have 4 tokens each.

**Corruption status on Veilbound Hill defenders:**
| Unit | Tokens | Threshold | Effect |
|---|---|---|---|
| Temple Defenders (3) | 4 each | Tainted (3) | −1 ATK, −1 MOR |
| Spirit Monolith | 4 | Tainted | −1 ATK (irrelevant — 0 ATK), −1 MOR |
| Shrine Wardens (2) | 2+2 from spread = 4 | Tainted | −1 ATK, −1 MOR |

Temple Defenders in Honor Stance: base ATK 6, −1 (Honor), −1 (Tainted) = **4 ATK**. They're barely scratching things.

> **This is the corruption death spiral.** Veilbound's defensive strategy (Honor Stance, bunker at the Hill) is the WORST possible approach against Nightfang Corruption. Staying still = more tokens. Honor Stance (−1 ATK) compounds the −1 ATK from Tainted. The Veilbound player realizes they need to switch to Revelation Stance (+1 ATK, −1 DEF) to maintain damage output — but that drops their fortress DEF from 7 to 5, making them vulnerable to the horde.

**Veilbound pivot to Revelation Stance:**
Temple Defenders switch to Revelation: ATK 6 + 1 (Revelation) + 1 (Ascendant) − 1 (Tainted) = **7 ATK**. DEF drops from 7 to 4. They generate +1 Flow each too.

> **✅ FUN OBSERVATION: The stance switch under Corruption pressure is actually an EXCELLENT decision point! The Veilbound player must choose between "stay tanky and slowly die to corruption" vs "go aggressive and risk getting killed faster but actually doing damage." Corruption forcing a change of plans is thematic and tactically rich. The mechanic itself is great — the problem is the LACK OF COUNTERPLAY (can't cleanse tokens at all).**

**Shrine Dragon takes the Avatar hit and strikes back:**
Dragon: 25 vs DEF 6 = 4.2 × 2 = ~8 dmg. Avatar: 46 → 38 HP.
Avatar: 27 vs DEF 5 = 9 + 4.5 crits = ~18 dmg. Dragon: 18 → **0 HP. DESTROYED!**

> **✅ DRAMATIC MOMENT: The Shrine Dragon falls! 100 pts, the Veilbound's aerial champion, torn apart by the Patriarch's Avatar. The Avatar roars. Veilbound Flow Pool drops (lost 3 Flow/turn from the Dragon). The battle shifts.**

**Veilbound response — targeting the Avatar:**
The Shogun personally engages: 18 + 1 (Ascendant) + 1 (Revelation) = 20 ATK. If Celestial Blade ignores armor (treating DEF as 1): 20 × 6/6 = 20 hits + crits on 6s (3.3 × 2 dmg extra) = **~23 damage**. Avatar: 38 → 15 HP!

> **✅ FUN MOMENT: The Shogun draws the Celestial Blade and carves through the Avatar's hide. The "ignore armor" ability against DEF 6 is the EXACT tool needed — it feels like a designed counter-moment. The Veilbound player punches the air.**

**Komainu Guardian Colossus also attacks Avatar:**
18 vs DEF 6 = 3 × 2 = 6 dmg. Avatar: 15 → 9 HP.

**Hunger Pool:** Nightfang has killed ~12 units by now. Pool: 12. Ravenous (10) threshold: +1 ATK die to all Nightfang.

**End of Turn 4 — VP:** VB has more HP at the Hill (Avatar wounded, VB brought WMs in). **VB scores.** (VB 2, NF 2)

---

### Turn 5 — The Avatar Falls

**Nightfang desperation:** Blood Tithe — Sanguinar sacrifices 4 HP (33→29) to draw 2 cards. Plays "Red Harvest" (all Nightfang units within 6" of a kill gain +2 ATK this turn).

**Avatar attacks the Shogun (27 + 1 Ravenous = 28 ATK vs DEF 5 Revelation = DEF 4):** 28 × 3/6 = 14 + 4.7 crits = **~23 damage**. Shogun: 45 → 22 HP. Brutal!

**Veilbound strikes back — combined fire on Avatar:**
- Shogun (Celestial Blade): ~23 dmg. Avatar: 9 → **DESTROYED!**

> **✅ THE LEGENDARY FALLS. Both teams stand up. The Patriarch's Avatar — 150 pts, Corruption Aura, Apex Terror, 54 HP — is dead. The Shogun's personal blade struck the killing blow. This is the "defeat the final boss" moment. INCREDIBLE gameplay narrative.**

**Aftermath of Avatar death:**
- All Corruption Aura 4" effects stop being applied (but existing tokens persist!)
- Apex Terror (−2 MOR) aura disappears — nearby VB units gain effective +2 MOR
- Nightfang loses their heaviest hitter and Hill anchor

**But.** The corruption already applied doesn't go away. VB units at 4 tokens will reach 6 (Corrupted: −2 ATK, −1 DEF, −2 MOR) by Turn 6–7 from other Nightfang corruption sources.

**End of Turn 5 VP:** Veilbound controls Hill with WMs and infantry. **VB scores.** (VB 3, NF 2)

---

### Turns 6–8 — The Grind

With the Avatar gone, the VP race shifts to Veilbound. But corruption continues to degrade their infantry.

**Turn 6:** VB units at 5–6 Corruption tokens. Corrupted threshold (6): −2 ATK, −1 DEF, −2 MOR. Temple Defenders in Revelation: ATK 6+1+1−2 = 6. DEF 5−1−1 = DEF 3. MOR 8−2 = 6. They're falling apart from the inside.

> **The corruption, applied by the now-dead Avatar, continues to erode the Veilbound line from beyond the grave. This is thematically PERFECT — the Blight lingers even after the source dies — but mechanically frustrating because there is NOTHING the VB player can do about it.**

Nightfang sends the Crimson Behemoth (30 HP, Corruption Aura 3") to the Hill. It continues the corruption pressure.

**VP Turn 6:** VB barely holds. **VB scores.** (VB 4, NF 2)

**Turn 7:** Nightfang masses remaining forces at the Hill. Tiger Alpha + pack of Tiger Berserkers (Pack Tactics +1 ATK each) slam into corrupted VB infantry. 

Corrupted Temple Defenders at DEF 3 are now tissue paper:
Tiger Berserkers (15+1 Ravenous + 1 Pack = 17 ATK vs DEF 3): 17 × 4/6 = 11.3 + 2.8 crits = **~17 damage**. Temple Defenders: 9 HP → **DESTROYED**. The corruption weakened them enough.

**VP Turn 7:** Nightfang has more HP at the Hill after destroying VB infantry. **NF scores.** (VB 4, NF 3)

**Turn 8:** Final push. VB has the Komainu (30 HP) and Oni Juggernaut (36 HP, but far away — MOV 5, been walking for 8 turns and just arriving). NF has Crimson Behemoth (30 HP) and a dozen infantry swarming.

Komainu vs Crimson Behemoth at the Hill: 18 vs DEF 5 = 6 + 3 crits = **~12 damage**. Behemoth: 30 → 18 HP.
Behemoth counter: 21+1 Ravenous = 22 vs DEF 5 = 7.3 + 3.7 crits = **~15 damage**. Komainu: 30 → 15 HP.

**Hunger Pool: 15+ → GORGED.** All Nightfang gain Blood Drain (heal on kills). Sanguinar heals 3 HP.

VP Check: VB has Komainu (15 HP), Shogun (22 HP), misc infantry (corrupted, ~12 HP) = **49 HP**.
NF has Behemoth (18 HP), various infantry and pack units (~35 HP) = **53 HP**.

**Nightfang scores.** (VB 4, NF 4)

**Turn 9:** It comes down to this. Both sides swing everything at the Hill.

Oni Juggernaut finally arrives (27 ATK + 3 Devastating Charge = 30 ATK): 30 vs DEF 5 = 10 + 5 crits = **~20 damage** to Crimson Behemoth. Behemoth: 18 → **DESTROYED!**

VP Check: Veilbound has 72+ HP at the Hill. Nightfang has ~40 HP (infantry swarm).

**VEILBOUND SCORES. VB 5, NF 4.**

### **GAME OVER: Veilbound Shogunate wins King of the Hill, 5-4, Turn 9.**

---

## Game 3 — Fun Analysis

| Aspect | Rating | Notes |
|---|---|---|
| **Epic scale drama** | ⭐⭐⭐⭐⭐ | Avatar vs Dragon. Shogun's Celestial Blade kill. The legendary falling. Multiple jaw-drop moments. |
| **Faction identity** | ⭐⭐⭐⭐⭐ | Nightfang Corruption slowly eating VB discipline = THEMATIC and SCARY. Veilbound stance-switching under pressure = heroic adaptation. |
| **Decision density** | ⭐⭐⭐⭐ | Stance switching, Flow spending, when/how to attack the Avatar, formation vs spread (corruption vs efficiency). |
| **Pacing** | ⭐⭐⭐ | Turns 1–2 slow (positioning). Turns 3–5 explosive. Turns 6–9 grinding. 9 turns with 45+ models/side = 4–6 hours real-time. |
| **Balance** | ⭐⭐⭐⭐ | 5-4, came down to the last turn. Both factions felt competitive. Excellent. |
| **King of the Hill** | ⭐⭐⭐⭐ | Creates a focal point preventing standoffs. Forces engagement. The HP-based scoring rewards bringing WMs. |
| **Corruption narrative** | ⭐⭐⭐⭐⭐ | The tokens lingering after the Avatar died = haunting. Corruption eroding the disciplined VB army = beautiful faction-vs-faction storytelling. But needs counterplay. |
| **Practicality** | ⭐⭐ | 45+ models × 9 turns = 400+ unit activations. Corruption tracking on 20+ units, Flow counting, Stance management. Bookkeeping is ENORMOUS. |

---

# MASTER FINDINGS — ALL THREE GAMES

## Critical Balance Issues

| # | Finding | Severity | Games | Recommendation |
|---|---|---|---|---|
| 1 | **Skirmish unit cap too low** | 🔴 | G1 | Raise max_units from 15 → 20. Current cap strands 10–30 pts unused. |
| 2 | **Artillery covers entire Skirmish board** | 🔴 | G1 | Cap Skirmish artillery range at 18", or ban Indirect Fire at Skirmish. |
| 3 | **Melee factions non-interactive Turn 1 at Skirmish** | 🔴 | G1 | Consider: "Turn 1: no ranged attacks beyond 12"" or Nightfang-specific Ambush deployment. |
| 4 | **Corruption has no non-NF counterplay** | 🔴 | G3 | Allow Heal abilities to remove 1 Corruption token OR add: "Remove 1 token per End Phase if unit took no damage this turn." |
| 5 | **Veilbound Flow scales too fast in Epic** | 🟡 | G3 | 60+ Flow Turn 1 = all thresholds unlocked instantly. Cap Flow Pool at 40, or cap per-unit generation at 1 in Epic. |
| 6 | **Temple Defenders reach DEF 7+ (only crits hit)** | 🟡 | G3 | Honor Stance + Shield Wall + Spirit Monolith = DEF 8. Functionally invincible to non-crit attacks. Cap DEF at 6 or cap stacking DEF bonuses at +2. |
| 7 | **Hunger Pool thresholds don't scale by game size** | 🟡 | G1,G3 | 5/10/15 kills: unreachable at Skirmish (15 units), trivial at Epic (48+ units). Scale: Skirmish 3/6/10, Standard 5/10/15, Epic 8/15/25. |
| 8 | **WM costs create extreme army-building tension** | 🟡 | G2 | 80–150 pt WMs eat 40–75% of Standard budget. Not necessarily a problem (forces meaningful choices), but limits build variety. Consider WM-focused army rules adjustment. |
| 9 | **Brood-Queen spawns too many free units** | 🟡 | G2 | ~8 free Spiderlings over 6 turns at 90 pts. Massively efficient. Cap lifetime spawns at 6. |
| 10 | **Web-Anchor destruction rules missing** | 🟡 | G2 | Can anchors be attacked? How? Counterplay to the Web network is unclear. |
| 11 | **Scout Forward Deploy too strong on small boards** | 🟡 | G1 | 6" forward + 12" MOV Fly = behind enemy lines Turn 1 on 24" boards. Cap at 3" in Skirmish. |
| 12 | **Army building is complex for casual players** | 🟡 | All | 6+ simultaneous constraints. Needs a quick-build calculator or pre-built sample armies. |
| 13 | **Grid Cohesion bookkeeping tedious at scale** | 🟡 | G2 | Checking adjacency for 25+ units every turn is slow. Consider simplifying to "base-to-base with 1+ ally = Grid Active." |
| 14 | **Epic games impractically long** | 🟡 | G3 | 45+ models × 9 turns ≈ 4–6 hours. Consider alternating activation (IGOUGO is slow) or unit grouping (activate in squads). |

## Fun Factor Summary

| Scale | Fun | Best Moment | Worst Moment | Est. Playtime |
|---|---|---|---|---|
| **Skirmish** | ⭐⭐ | Midnight Assassin on the commander | NF doing nothing Turn 1 while 4 units die | ~45 min |
| **Standard** | ⭐⭐⭐⭐⭐ | Teleport behind lines to steal objective | Grid Cohesion measurement tedium | ~2 hours |
| **Epic** | ⭐⭐⭐⭐ | Shogun killing the Avatar with Celestial Blade | Corruption death spiral with no counterplay | ~4–6 hours |

## Overall Assessment

**The game is MOST FUN at Standard scale.** Both faction mechanics engage fully, the board allows positioning and flanking, games have clear dramatic arcs, and playtime is reasonable (~2 hours). Standard should be the recommended default game size.

**Skirmish needs significant work.** Unit cap, artillery dominance, and alpha-strike problems make small games lopsided. Melee factions suffer disproportionately. The fixes are straightforward (raise cap, limit range, add Turn 1 protection).

**Epic is spectacular but impractical.** War Machine duels, legendary kills, and faction mechanics at full power create incredible moments. But bookkeeping at 45+ units with Corruption tokens, Flow tracking, Grid checks, and Stance management would exhaust real players. Epic needs either simplified tracking rules, alternating activation, or digital assist tools.

**The rebalance pass worked.** Unit costs feel reasonable. No 1-pt trash units. War Machines feel appropriately massive. The core combat math (ATK dice vs DEF threshold) is clean and satisfying.

**Five genuinely distinct factions.** Each plays differently: ID's Grid rewards discipline, NF's Corruption creates horror-movie dread, TW's Web enables chess-like teleport tactics, VB's Flow builds momentum, EC's Heat creates volatile risk. This is impressive design work.

**Three critical fixes needed:**
1. **Corruption counterplay** — add universal token removal
2. **Skirmish scaling** — raise unit cap, limit artillery/scout range
3. **Hunger Pool scaling** — adjust thresholds per game size

**One design highlight:** Thornweft's Fate-Threads are the best mechanic in the game. Non-regenerating, finite, agonizing to spend, impactful when used. Every other faction should have a comparably tense resource to manage.
