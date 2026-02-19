# COMPREHENSIVE BALANCE PASS AUDIT — ALL 5 FACTIONS

---

## PHASE 1: Every Unit with `points_cost: 1`

| # | Unit Name | Faction | File | Line | ATK | DEF | HP | MOV | RNG | MOR | Key Specials |
|---|-----------|---------|------|------|-----|-----|-----|-----|-----|-----|-------------|
| 1 | Ashborn Infantry | Emberclaw Warpack | emberclaw-warpack.js | 1383 | 6 | 3 | 3 | 5 | 1 | 6 | Fire Resistant |
| 2 | Infantry Regiment | Iron Dominion | iron-dominion.js | 2374 | 6 | 3 | 3 | 5 | 1 | 6 | Grid Node |
| 3 | Thread-Warden Infantry | Thornweft Matriarchy | thornweft-matriarchy.js | 1409 | 6 | 3 | 3 | 5 | 1 | 6 | — |
| 4 | Shuttle-Consort Militia | Thornweft Matriarchy | thornweft-matriarchy.js | 1419 | 6 | 2 | 3 | 5 | 1 | 5 | Expendable |
| 5 | Thrall Conscripts | Nightfang Dominion | nightfang-dominion.js | 1941 | 3 | 3 | 3 | 5 | 1 | 4 | Thrall, Expendable |
| 6 | Plague Horde | Nightfang Dominion | nightfang-dominion.js | 1965 | 3 | 2 | 3 | 5 | 1 | 4 | Tarpit, Expendable |
| 7 | Blood Runners | Nightfang Dominion | nightfang-dominion.js | 2825 | 3 | 2 | 3 | **10** | 1 | 4 | Thrall, Expendable, Scout |
| 8 | Veiled Ashigaru | Veilbound Shogunate | veilbound-shogunate.js | 2600 | 6 | 3 | 3 | 5 | 1 | 6 | Stance, Cavalry Screen |
| 9 | Inkblade Initiates | Veilbound Shogunate | veilbound-shogunate.js | 2636 | 6 | 3 | 3 | **6** | 1 | 6 | Stance, Duelist |

### Phase 1 Analysis

**Baseline 1-pt stat line:** ATK:6, DEF:3, HP:3, MOV:5, RNG:1, MOR:6 (used by Ashborn Infantry, Infantry Regiment, Thread-Warden Infantry, Veiled Ashigaru)

**Below-baseline 1-pt units (weaker — fair at 1pt):**
- Thrall Conscripts: ATK:3/ MOR:4 — much weaker than baseline, correct at 1pt
- Plague Horde: ATK:3/ DEF:2/ MOR:4 — weakest unit in the game, correct at 1pt  
- Shuttle-Consort Militia: DEF:2/ MOR:5 — slightly below baseline, correct at 1pt
- Blood Runners: ATK:3/ DEF:2/ MOR:4 — terrible combat stats BUT **MOV:10 + Scout deploy** (see Phase 2)

**At-or-above-baseline 1-pt units:**
- Inkblade Initiates: MOV:6 (above baseline) + Stance + Duelist — a touch generous but acceptable
- Veiled Ashigaru: Baseline + Stance + Cavalry Screen — fine

---

## PHASE 2: Undercosted Units

### 1. Aether Hackers — Iron Dominion
- **File:** iron-dominion.js **Line:** 2561
- **Cost:** 2 pts
- **Stats:** ATK:3, DEF:3, HP:6, MOV:5, RNG:**12**, MOR:7
- **Specials:** Hack (disable War Machine on 4+), Grid Node
- **Problem:** RNG:12 is the highest non-artillery range in the faction. Hack ability can disable a 80–180pt War Machine with a single die roll. At 2pts this unit provides enormous strategic value — it's a cheap War Machine counter with zero risk.
- **Recommendation:** Raise to **3 pts**. Alternatively, change Hack to activate on 5+ instead of 4+.

**3-line context:**
```
// iron-dominion.js, lines 2559–2575
      name: "Aether Hackers",
      faction: "iron-dominion",
      points_cost: 2,           // ← CHANGE TO 3
      role: "Anti-War Machine specialist",
```

---

### 2. Spiderling Scouts — Thornweft Matriarchy
- **File:** thornweft-matriarchy.js **Line:** 1426
- **Cost:** 2 pts
- **Stats:** ATK:9, DEF:2, HP:6, MOV:**10**, RNG:4, MOR:6
- **Type:** Cavalry
- **Specials:** Web-Sense Patrol (deploy 6" ahead), Web Trail
- **Problem:** ATK:9 + HP:6 + MOV:10 + RNG:4 + Scout deploy for only 2pts is far too efficient. Compare to Ashrider Scouts (3pts, ATK:12/MOV:12/HP:6) — Spiderling Scouts get 80% of the output for 67% of the cost, plus they create web terrain.
- **Recommendation:** Raise to **3 pts**.

**3-line context:**
```
// thornweft-matriarchy.js, line 1426
    { name: "Spiderling Scouts", faction: "thornweft-matriarchy", points_cost: 2,  // ← CHANGE TO 3
      role: "Light cavalry", fragment_interactions: "Speed/web buffs",
      ...stats: { ATK: 9, DEF: 2, HP: 6, MOV: 10, RNG: 4, MOR: 6 },
```

---

### 3. Ashrider Scouts — Emberclaw Warpack
- **File:** emberclaw-warpack.js **Line:** 1400
- **Cost:** 3 pts
- **Stats:** ATK:**12**, DEF:3, HP:6, MOV:**12**, RNG:4, MOR:7
- **Specials:** Fly, Fire Resistant, Scout Patrol
- **Problem:** ATK:12 + MOV:12 + Fly at 3pts outperforms dedicated 5pt cavalry in other factions. This is a flying, fast, hard-hitting scout that can reach any point on the board turn 1. The stat line is appropriate for 4–5pts.
- **Recommendation:** Raise to **4 pts**.

**3-line context:**
```
// emberclaw-warpack.js, line 1400
    { name: "Ashrider Scouts", faction: "emberclaw-warpack", points_cost: 3,  // ← CHANGE TO 4
      role: "Light cavalry", fragment_interactions: "Speed buffs",
      ...stats: { ATK: 12, DEF: 3, HP: 6, MOV: 12, RNG: 4, MOR: 7 },
```

---

### 4. Fledgling Swarm — Emberclaw Warpack
- **File:** emberclaw-warpack.js **Line:** 1427
- **Cost:** 2 pts
- **Stats:** ATK:6, DEF:2, HP:3, MOV:**10**, RNG:1, MOR:6
- **Type:** Specialist
- **Specials:** Fly, Swarm, Spark Breath (6" weak fire)
- **Problem:** Fly + MOV:10 + Swarm at 2pts gives unparalleled board control. They contest objectives, screen, and harass — all for less than a single infantry squad in some factions. The Fly keyword alone is worth a point premium.
- **Recommendation:** Raise to **3 pts**.

**3-line context:**
```
// emberclaw-warpack.js, line 1427
    { name: "Fledgling Swarm", faction: "emberclaw-warpack", points_cost: 2,  // ← CHANGE TO 3
      role: "Cheap flyers", fragment_interactions: "Growth",
      ...stats: { ATK: 6, DEF: 2, HP: 3, MOV: 10, RNG: 1, MOR: 6 }, special: ["Fly", "Swarm"...
```

---

### 5. Spiderling Swarm — Thornweft Matriarchy
- **File:** thornweft-matriarchy.js **Line:** 1453
- **Cost:** 2 pts
- **Stats:** ATK:**9**, DEF:1, HP:3, MOV:**8**, RNG:1, MOR:5
- **Type:** Specialist
- **Specials:** Swarm, Wall-Climber, Venom(1 token)
- **Problem:** ATK:9 is elite infantry territory. Combined with MOV:8, Wall-Climber, and Venom application, this unit does far too much for 2pts. The DEF:1 / HP:3 keeps them fragile, but their alpha-strike and venom output before dying is absurdly point-efficient.
- **Recommendation:** Raise to **3 pts**.

**3-line context:**
```
// thornweft-matriarchy.js, line 1453
    { name: "Spiderling Swarm", faction: "thornweft-matriarchy", points_cost: 2,  // ← CHANGE TO 3
      role: "Cheap screening", fragment_interactions: "Growth",
      ...stats: { ATK: 9, DEF: 1, HP: 3, MOV: 8, RNG: 1, MOR: 5 },
```

---

### 6. Silk-Shot Skirmishers — Thornweft Matriarchy
- **File:** thornweft-matriarchy.js **Line:** 1414
- **Cost:** 2 pts
- **Stats:** ATK:**9**, DEF:2, HP:3, MOV:6, RNG:**8**, MOR:6
- **Specials:** Venom Darts (apply 1 venom token at range), Skirmish
- **Problem:** ATK:9 + RNG:8 for 2pts is the best ranged infantry value in the game. They apply venom tokens at range while staying safe. No other faction has ranged harassment this cheap.
- **Recommendation:** Raise to **3 pts**.

**3-line context:**
```
// thornweft-matriarchy.js, line 1414
    { name: "Silk-Shot Skirmishers", faction: "thornweft-matriarchy", points_cost: 2,  // ← CHANGE TO 3
      role: "Ranged infantry", fragment_interactions: "Venom delivery",
      ...stats: { ATK: 9, DEF: 2, HP: 3, MOV: 6, RNG: 8, MOR: 6 },
```

---

### 7. Corruption Spreaders — Nightfang Dominion
- **File:** nightfang-dominion.js **Line:** 2483
- **Cost:** 2 pts
- **Stats:** ATK:0, DEF:3, HP:6, MOV:5, RNG:**6**, MOR:7
- **Specials:** Corruption, Plague Censer (apply 1 Corruption to all enemies within 3"), Non-Combatant
- **Problem:** While they can't attack, their passive AoE corruption application is faction-defining. At 2pts you can spam 5–6 of them for a corruption saturation strategy that makes entire armies rot. HP:6 + MOR:7 on a 2pt non-combatant is very durable for the price. They are the backbone of the strongest Nightfang strategy.
- **Recommendation:** Raise to **3 pts**.

**3-line context:**
```
// nightfang-dominion.js, lines 2483–2490
      name: "Corruption Spreaders",
      faction: "nightfang-dominion",
      points_cost: 2,           // ← CHANGE TO 3
      role: "Mobile Corruption delivery",
```

---

### 8. Blood Runners — Nightfang Dominion
- **File:** nightfang-dominion.js **Line:** 2825
- **Cost:** 1 pt
- **Stats:** ATK:3, DEF:2, HP:3, MOV:**10**, RNG:1, MOR:4
- **Specials:** Thrall, Expendable, Blood Scent Scout (deploy 6" ahead)
- **Problem:** MOV:10 + Scout deploy 6" ahead means they start 6" further up the board and can move 10" per turn. That's 16" of board presence on turn 1 — farther than any other unit in any faction. At 1pt they're virtually free objective-grabbers in scenario play. Expendable means losing them has zero morale cost.
- **Recommendation:** Raise to **2 pts**. They're better than Thrall Conscripts (also 1pt) in every strategic dimension except direct combat.

**3-line context:**
```
// nightfang-dominion.js, lines 2823–2830
      name: "Blood Runners",
      faction: "nightfang-dominion",
      points_cost: 1,           // ← CHANGE TO 2
      role: "Ultra-fast disposable scouts",
```

---

## PHASE 3: Overcosted Units

### 1. Fragment Artillery Crew — Emberclaw Warpack
- **File:** emberclaw-warpack.js **Line:** 1390
- **Cost:** 4 pts
- **Stats:** ATK:6, DEF:3, HP:6, MOV:4, RNG:1, MOR:7
- **Specials:** Operates War Machines, Command Drakes (partial)
- **Problem:** A support unit that operates artillery pieces but has RNG:1 — it can't do anything on its own. ATK:6 / DEF:3 / HP:6 at 4pts is 2pt-unit combat power. Compare to Drake Handlers (3pts, identical stats, also support). The extra point buys nothing.
- **Recommendation:** Reduce to **3 pts**.

**3-line context:**
```
// emberclaw-warpack.js, line 1390
    { name: "Fragment Artillery Crew", faction: "emberclaw-warpack", points_cost: 4,  // ← CHANGE TO 3
      role: "Support infantry", fragment_interactions: "Operates artillery",
      ...stats: { ATK: 6, DEF: 3, HP: 6, MOV: 4, RNG: 1, MOR: 7 },
```

---

### 2. Blight Weavers — Nightfang Dominion
- **File:** nightfang-dominion.js **Line:** 2604
- **Cost:** 4 pts
- **Stats:** ATK:0, DEF:3, HP:6, MOV:4, RNG:1, MOR:7
- **Specials:** Non-Combatant, Web of Corruption (create 3" Corruption Zone), Corruption Spread
- **Problem:** 0 ATK + Non-Combatant + MOV:4 at 4pts. Compare to Corruption Spreaders (2pts, also Non-Combatant, ATK:0, but with HP:6, RNG:6 AoE corruption, MOR:7). Blight Weavers have identical durability, slower speed, melee-only corruption delivery, and cost DOUBLE. Their terrain-creation is niche and doesn't justify the premium.
- **Recommendation:** Reduce to **3 pts**.

**3-line context:**
```
// nightfang-dominion.js, lines 2604–2610
      name: "Blight Weavers",
      faction: "nightfang-dominion",
      points_cost: 4,           // ← CHANGE TO 3
      role: "Corruption terrain creator",
```

---

### 3. Blight Reapers — Nightfang Dominion
- **File:** nightfang-dominion.js **Line:** 2209
- **Cost:** 5 pts
- **Stats:** ATK:12, DEF:3, HP:6, MOV:5, RNG:1, MOR:7 (+Anti-Elite: +3 ATK vs HP 9+)
- **Problem:** At 5pts they compete with Tiger Berserkers (5pts, ATK:12/ DEF:3/ HP:9/ MOV:6) who have 50% more HP and +1 MOV. The anti-elite niche is too narrow to justify equaling Tiger Berserkers in cost while being significantly less durable.
- **Recommendation:** Reduce to **4 pts**.

**3-line context:**
```
// nightfang-dominion.js, lines 2209–2215
      name: "Blight Reapers",
      faction: "nightfang-dominion",
      points_cost: 5,           // ← CHANGE TO 4
      role: "Anti-elite infantry",
```

---

### 4. Plague Knights — Nightfang Dominion
- **File:** nightfang-dominion.js **Line:** 2115
- **Cost:** 5 pts
- **Stats:** ATK:9, DEF:5, HP:9, MOV:**4**, RNG:1, MOR:7
- **Specials:** Corruption, Heavy Armor, Corruption Spread
- **Problem:** MOV:4 is crippling on a melee-only unit. They'll never catch anything. While DEF:5 / HP:9 makes them very durable, they're easily kited by anything with MOV 5+. Compare to Bloodsworn Templars (also 5pts) with the same ATK:9 but MOV:5, making them tactically viable. Plague Knights need a discount to compensate for their immobility.
- **Recommendation:** Reduce to **4 pts**.

**3-line context:**
```
// nightfang-dominion.js, lines 2115–2121
      name: "Plague Knights",
      faction: "nightfang-dominion",
      points_cost: 5,           // ← CHANGE TO 4
      role: "Heavy corruption infantry",
```

---

### 5. Hunger Wraith — Nightfang Dominion
- **File:** nightfang-dominion.js **Line:** 2992
- **Cost:** 8 pts
- **Stats:** ATK:12, DEF:6, HP:9, MOV:6, RNG:1, MOR:10
- **Specials:** Corruption Aura 2", Mist Form (incorporeal), Ethereal (only damaged by crits — natural 6), Blood-Drunk (auto-pass Morale, cannot retreat)
- **Problem:** Despite the Ethereal keyword making it extremely hard to kill, 8pts is an enormous investment in a specialist that Blood-Drunk forces into uncontrollable movement. It can't retreat and can't be directed. For 8pts you could field two Feral Skinchangers (5pts each, ATK:12, versatile) or a Blood Champion (5pts, ATK:15). The unreliability of Blood-Drunk at this price point makes it a trap choice.
- **Recommendation:** Reduce to **6 pts**.

**3-line context:**
```
// nightfang-dominion.js, lines 2992–2998
      name: "Hunger Wraith",
      faction: "nightfang-dominion",
      points_cost: 8,           // ← CHANGE TO 6
      role: "Ethereal damage specialist",
```

---

## PHASE 4: Iron Dominion Stat Clones

**Target stat line:** ATK:3, DEF:3, HP:6, MOV:5, RNG:1, MOR:7

All 6 units sharing this *exact identical* stat line:

| # | Unit Name | Line | Cost | Role | Key Specials |
|---|-----------|------|------|------|--------------|
| 1 | Gearwright Engineers | 2412 | 2 | Support | Repair, Construct Barricade |
| 2 | Clockwork Pioneers | 2545 | 2 | Support | Construct Barricade, Trap Layer |
| 3 | Arcane Tinkerers | 2591 | 3 | Specialist | Fragment Amplifier, Unstable Aura |
| 4 | Clockwork Engineers | 2812 | 2 | Support | Repair |
| 5 | Aether Engineers | 2915 | 3 | Support | Trap Layer, Remote Detonate |
| 6 | Arcane Tinker Battalion | 2958 | 3 | Specialist | Fragment Amplifier, Fragment Battery |

### Analysis

These 6 units have completely identical combat profiles. The cost difference (2 vs 3) is driven entirely by ability keywords. This creates two problems:

1. **Redundancy:** Gearwright Engineers (2pt, Repair + Barricade) and Clockwork Engineers (2pt, Repair) overlap heavily — Gearwrights are strictly better. Similarly, Arcane Tinkerers (3pt, Fragment Amplifier + Unstable Aura) vs Arcane Tinker Battalion (3pt, Fragment Amplifier + Fragment Battery) are nearly identical.

2. **Invisible differentiation:** New players can't distinguish these units by looking at stat blocks. They look identical on paper and differ only in ability text, which creates confusion.

### Recommendations

| Unit | Current | Recommended | Stat Change | Reason |
|------|---------|-------------|-------------|--------|
| Gearwright Engineers | 2pt | 2pt (keep) | — | Baseline support unit |
| Clockwork Pioneers | 2pt | 2pt (keep) | +1 MOV → MOV:6 | Pioneers should be faster; differentiates from Gearwrights |
| Arcane Tinkerers | 3pt | 3pt (keep) | +3 RNG → RNG:4 | Fragment abilities imply range; give them ranged capability |
| Clockwork Engineers | 2pt | **Remove or merge** | — | Strictly worse Gearwright Engineers; merge into Gearwrights |
| Aether Engineers | 3pt | 3pt (keep) | +1 DEF → DEF:4 | Trap experts should have defensive edge |
| Arcane Tinker Battalion | 3pt | 3pt (keep) | +3 HP → HP:9 | Battalion implies larger squad; more HP differentiates |

---

## PHASE 5: War Machine Cost Audit

### Cost Comparison Table (All Factions)

| Cost (pts) | Emberclaw | Iron Dominion | Thornweft | Nightfang | Veilbound |
|------------|-----------|---------------|-----------|-----------|-----------|
| 60 | Young War Drake | — | Cocoon Harvester, Trap-Layer Construct | — | — |
| 65 | Flame Engine | — | Crawler Siege Engine | — | — |
| 70 | Cinder Golem | — | Venom Engine, Phase-Silk Wraith Spider | — | — |
| 80 | Mature War Drake | Overclocked Automaton, Steam Colossus, Gear-Beast*, Mechanized Siege Engine | Web-Fortress | — | — |
| 85 | — | Aether Cannon Walker, Arcane Steam Golem | Fate-Loom Engine | — | Spirit Temple Walker, Lotus Ascendant Monolith |
| 90 | Fire Colossus | Clockwork Titan, Steam Gargoyle | Brood-Mother Spider | Bile Wurm | Walking Torii Gate, Hollow Ronin Construct |
| 95 | Magma Titan | — | — | Blood Engine, Blood Harvester Juggernaut, Plague Broodmother | Komainu Guardian Colossus, Celestial Ink Dragon |
| 100 | Scorched Titan | Chrono Walker | Silk Colossus | Crimson Behemoth, Corruption Colossus, Elder Tiger Horror | Shrine Dragon, Eclipse Manta Titan |
| 110 | Grounded Wyrm | Experimental Leviathan | Gossamer Titan | Plague Titan, Nightfang Dragon, Shadow Leviathan | Veilbound Oni Juggernaut, Shrouded Throne Entity |
| 150 | Pyrathax (Legendary†) | — | — | — | — |
| 180 | — | Titan Engine Imperius (Legendary) | Skithari (Legendary) | The Patriarch's Avatar (Legendary) | Celestial Shogun Construct (Legendary) |
| 200 | Obsidax (Legendary†) | — | — | — | — |

*Gear-Beast: could not locate `name: "Gear-Beast"` in file; may use a different name.  
†Emberclaw has TWO legendary War Machines (Pyrathax 150pt, Obsidax 200pt) while all other factions have exactly one at 180pt.

### Phase 5 Analysis

**Issue 1: Missing low-cost War Machines for Nightfang and Veilbound**
- Emberclaw has War Machines at 60, 65, 70pt (budget options)
- Thornweft has War Machines at 60, 65, 70pt (budget options)
- Iron Dominion starts at 80pt
- **Nightfang** starts at **90pt** — no budget War Machine options
- **Veilbound** starts at **85pt** — no budget War Machine options
- **Recommendation:** Add a 60–70pt War Machine for Nightfang and Veilbound to match roster diversity.

**Issue 2: Nightfang has no War Machine at 80pt**
- Every other faction has at least one 80pt War Machine. Nightfang jumps from nothing straight to 90pt.
- **Recommendation:** Reduce Bile Wurm from 90pt to **80pt** (it's melee-only with Burrow delay, making it one of the weaker War Machines at its tier).

**Issue 3: Emberclaw Legendary War Machine cost outliers**
- Pyrathax at 150pt and Obsidax at 200pt break the 180pt standard that all other factions use.
- Having two legendaries also gives Emberclaw more options at the apex tier.
- **Recommendation:** Either consolidate to one legendary at 180pt, or explicitly mark these as commander-locked (Pyrathax → Vex only, Obsidax → Tzarak only) so they function as commander abilities rather than open roster picks. Both are already noted as Legendary with commander restrictions, so the main issue is the non-standard pricing.

**Issue 4: Iron Dominion 80pt cluster**
- Four War Machines at 80pt (Overclocked Automaton, Steam Colossus, Gear-Beast, Mechanized Siege Engine) creates a glut at one price point. Differentiate costs:
  - Keep Steam Colossus and Mechanized Siege Engine at 80pt
  - Raise Overclocked Automaton to 85pt (its Overclocked keyword provides extra ATK)
  - Adjust Gear-Beast to 75pt (if it exists as named) to create a budget option

**Issue 5: Nightfang 95pt and 100pt clusters**
- Three units at each of 95pt and 100pt is crowded:
  - 95pt: Blood Engine, Blood Harvester Juggernaut, Plague Broodmother
  - 100pt: Crimson Behemoth, Corruption Colossus, Elder Tiger Horror
- **Recommendation:** Spread costs:
  - Plague Broodmother → 90pt (it's a spawner with only ATK:12 and MOV:3 — weakest combat stats at 95pt)
  - Corruption Colossus → 95pt (area-denial focus with lower ATK:15 vs peers' ATK:21)

---

## SUMMARY OF ALL RECOMMENDED CHANGES

### Cost Increases (Phase 2 — Undercosted)

| Unit | Faction | File:Line | Current | Proposed |
|------|---------|-----------|---------|----------|
| Aether Hackers | Iron Dominion | iron-dominion.js:2561 | 2 | **3** |
| Spiderling Scouts | Thornweft | thornweft-matriarchy.js:1426 | 2 | **3** |
| Ashrider Scouts | Emberclaw | emberclaw-warpack.js:1400 | 3 | **4** |
| Fledgling Swarm | Emberclaw | emberclaw-warpack.js:1427 | 2 | **3** |
| Spiderling Swarm | Thornweft | thornweft-matriarchy.js:1453 | 2 | **3** |
| Silk-Shot Skirmishers | Thornweft | thornweft-matriarchy.js:1414 | 2 | **3** |
| Corruption Spreaders | Nightfang | nightfang-dominion.js:2483 | 2 | **3** |
| Blood Runners | Nightfang | nightfang-dominion.js:2825 | 1 | **2** |

### Cost Decreases (Phase 3 — Overcosted)

| Unit | Faction | File:Line | Current | Proposed |
|------|---------|-----------|---------|----------|
| Fragment Artillery Crew | Emberclaw | emberclaw-warpack.js:1390 | 4 | **3** |
| Blight Weavers | Nightfang | nightfang-dominion.js:2604 | 4 | **3** |
| Blight Reapers | Nightfang | nightfang-dominion.js:2209 | 5 | **4** |
| Plague Knights | Nightfang | nightfang-dominion.js:2115 | 5 | **4** |
| Hunger Wraith | Nightfang | nightfang-dominion.js:2992 | 8 | **6** |

### Stat Differentiation (Phase 4 — Clones)

| Unit | File:Line | Change |
|------|-----------|--------|
| Clockwork Pioneers | iron-dominion.js:2545 | MOV: 5 → **6** |
| Arcane Tinkerers | iron-dominion.js:2591 | RNG: 1 → **4** |
| Clockwork Engineers | iron-dominion.js:2812 | **Merge into Gearwright Engineers** or remove |
| Aether Engineers | iron-dominion.js:2915 | DEF: 3 → **4** |
| Arcane Tinker Battalion | iron-dominion.js:2958 | HP: 6 → **9** |

### War Machine Adjustments (Phase 5)

| Unit | Faction | File:Line | Current | Proposed |
|------|---------|-----------|---------|----------|
| Bile Wurm | Nightfang | nightfang-dominion.js:3195 | 90 | **80** |
| Plague Broodmother | Nightfang | nightfang-dominion.js:3274 | 95 | **90** |
| Corruption Colossus | Nightfang | nightfang-dominion.js:3140 | 100 | **95** |

### Structural Recommendations (Phase 5)
- Add a 60–70pt War Machine to Nightfang Dominion
- Add a 60–70pt War Machine to Veilbound Shogunate
- Standardize Emberclaw legendary pricing or enforce commander-lock restrictions
- Spread Iron Dominion 80pt cluster across 75–85pt range
