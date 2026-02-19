# Shardborne — Tabletop Simulator Mod Guide

## Installation

### Step 1: Generate the Save File
```
cd Wargame
python tts_generator.py
```
This creates `Shardborne.json` in the project directory.

### Step 2: Install in TTS
Copy `Shardborne.json` to your TTS Saves folder:
```
%USERPROFILE%\Documents\My Games\Tabletop Simulator\Saves\
```
If TTS is installed and the Saves directory exists, the generator will also auto-copy for you.

### Step 3: Load in TTS
1. Open Tabletop Simulator
2. Go to **Games → Save & Load**
3. Click **Shardborne**
4. The mod loads with all components, scripting, and UI

---

## What's Included

| Component | Description | Count |
|-----------|-------------|-------|
| **Game Board** | Battlefield surface with faction-themed artwork | 1 |
| **Map Variants Bag** | 6 swappable themed battle maps | 6 |
| **Blast & Cone Templates** | AoE measurement overlays | 5 |
| **Range Rings** | Distance indicator rings | 5 |
| **Faction Bags** | One bag per faction containing all commanders, units, and fragments | 5 |
| **Commander Tokens** | Figurine-style standing tokens with full stat blocks and skill trees | 65 |
| **Unit Tokens** | Flat disc tokens with stats, specials, and abilities | 277 |
| **Fragment Tokens** | Purple tokens for fragment items | 75 |
| **Card Library** | All command, tech, fragment, and tactical cards | 394 |
| **Combat Dice** | White d6 dice for attacks | 10 |
| **Morale Dice** | Red d6 dice for morale tests | 2 |
| **Damage Tokens** | Red stackable tokens (1-damage and 5-damage) | 40 |
| **Objective Markers** | Gold tokens for scoring objectives | 5 |
| **Terrain System** | 3D structures, area tiles, faction terrain (3 sub-bags) | 70 |
| **VP Counters** | Click-adjustable victory point counters | 2 |
| **Round Counter** | Track current game round | 1 |
| **Ruler** | 12" measurement tool | 1 |
| **Quick Reference** | Rules summary notecard | 1 |
| **Deployment Zones** | Scripting zones for player deployment areas | 2 |

---

## Table Layout

```
         Player 2 (Red) Side
  ┌──────────────────────────────┐
  │  [Deploy Zone 2]             │
  │                              │
  │     ★ Objective Markers      │   ← Terrain Bag
  │        on battlefield        │   ← Damage Tokens
  │                              │   ← Dice Bag
  │  [Deploy Zone 1]             │   ← Counters
  └──────────────────────────────┘
         Player 1 (White) Side

  Left side: Faction Bags, Card Library
  Right side: Dice, Counters, Tokens
  Far left: Quick Reference, Ruler
```

---

## How to Play

### Guided Setup Wizard (New in v3.1)
Click the green **⚙ SETUP GAME** button on the main panel to launch the guided setup wizard. It walks both players through every step:

| Step | Action | Details |
|------|--------|---------|
| 1 | **Battle Size** | Choose Skirmish (50–100pts), Standard (200–300pts), or Epic (500+pts) |
| 2 | **Map** | Pick from 6 themed maps or Random — the game board auto-swaps |
| 3 | **Scenario** | Pick a scenario or Random — objectives are announced in chat |
| 4 | **Player 1 Faction** | P1 chooses their faction — bag moves to P1's area |
| 5 | **Player 2 Faction** | P2 chooses (P1's pick is disabled) — bag moves to P2's area |
| 6 | **Army Building** | Pull units from faction bags. Use **🔄 Scan Points** to live-track point totals. Use **✅ Validate** to run full army checks. Both players click **Ready** when done. |
| 7 | **Deployment** | Place units in deployment zones. Click **⚔ BEGIN GAME** to start Turn 1. |

The wizard announces each choice in chat so all players stay informed. You can use **◀ Back** to revisit previous steps or **✖ Cancel** to close the wizard.

### Manual Setup (Alternative)
1. **Click "Next Phase"** in the UI panel to start the game (initializes Turn 1)
2. Each player picks a faction bag and pulls it to their side
3. Open the bag (hover + press `L` or click `Search`) to see contents
4. Build your army:
   - Pick 1 Commander (pull from Commanders sub-bag)
   - Pick units up to your agreed point limit
   - Place on the table in your deployment zone
5. Each player draws 5 cards from the Card Library bag to form their starting hand
   - Hold cards in your **hand zone** (bottom of screen) to hide them from opponents

### Battle Sizes
| Size | Points | Units | War Machines | Table | Turns |
|------|--------|-------|-------------|-------|-------|
| Skirmish | 50–100 | 5–20 | 1 max | 30"×30" | 5 |
| Standard | 200–300 | 15–30 | 3 max | 48"×48" | 6 |
| Epic | 500+ | 30–60 | 6 max | 60"×72" | 7 |

> **Scale:** 1 TTS grid unit = 1 inch. Use TTS right-click → Measure for exact distances.

### Turn Structure

The UI panel (top-right) shows the current phase. Click **"Next Phase ▶"** to advance:

#### 1. Command Phase
- Both players gain **+3 CP** automatically
- Draw 2 cards (hand limit 7)
- Play Command and Tech cards by spending CP
- Activate Fragment abilities

#### 2. Movement Phase
- Move each unit up to its **MOV** stat in inches
- Difficult terrain = half movement
- Flying units ignore terrain
- Units within 1" of an enemy are **engaged** (can't freely leave)

#### 3. Combat Phase
- Declare attacks (check unit's **RNG** stat for range)
- Roll ATK dice: each die ≥ target's **DEF** = 1 hit
- Rolling a **6** = Critical Hit (deals 2 damage)
- Subtract total damage from target's **HP**
- Play Tactical cards to modify combat

#### 4. End Phase
- Units at half HP or below: roll **2d6 ≤ MOR** to pass morale
- Failed morale = unit flees (remove from play)
- Score objectives (1 VP per controlled marker)
- Click **"Next Turn ⟳"** to begin the next turn

---

## UI Panel Guide

The scripted UI panel appears in the **top-right corner**:

| Control | Function |
|---------|----------|
| **Next Phase ▶** | Advance to the next phase (or start game) |
| **Next Turn ⟳** | Begin the next turn (resets phases, gains CP) |
| **CP +/-** | Adjust Command Points for each player |
| **F +/-** | Track Fragment charges for each player |
| **VP +/-** | Track Victory Points for each player |
| **Heat +/-** | Emberclaw Heat Pool (max 15, Overheat at 16+) |
| **Hunger +** | Nightfang Hunger Pool (kill tracker) |
| **Flow +/-** | Veilbound Ritual Flow (max 40, tier thresholds) |
| **Fate -** | Thornweft Fate-Threads (spend only, finite) |
| **Anchors +/-** | Thornweft Web-Anchor counter |
| **F.Charges +** | Iron Dominion Fragment Charges |
| **Honor / Revel.** | Toggle Veilbound stance (Honor/Revelation/None) |
| **W/R Kills +** | Track kills per player |
| **⚔ Combat** | Opens the combat resolver panel |
| **🎲 Morale** | Auto-rolls 2d6 morale test |
| **🎲 d6** | Generic d6 roll |
| **⏱ Timer** | Toggle the phase/turn timer (warns after 3 min) |
| **📋 Log** | Show last 5 combat results |
| **▲ Min** | Collapse/expand the panel |
| **⚙ SETUP GAME** | Launch the guided setup wizard (v3.1) |

### Combat Resolver Panel
Clicking **⚔ Combat** opens a centered pop-up where you enter:
- **ATK Dice**: Number of attack dice to roll (e.g., 6)
- **vs DEF**: Target's DEF stat (e.g., 4)

Click **⚔ RESOLVE** to auto-roll. Results appear in chat with hits, crits, and total damage.

---

## Chat Commands

Type these in the TTS chat box (press Enter):

### Combat & Dice
| Command | Example | Description |
|---------|---------|-------------|
| `!atk <dice> vs <DEF> [mods]` | `!atk 6 vs 4 charge flank` | Attack roll with optional modifiers |
| `!morale <MOR>` | `!morale 8` | Morale test: rolls 2d6, pass if ≤ MOR |
| `!roll XdY` | `!roll 3d6` | Generic dice roll |
| `!breath <dice>` | `!breath 4` | Breath Weapon attack (ignores cover, auto +2 Heat) |
| `!measure` | `!measure` | Distance between last 2 picked-up objects |

**Combat Modifiers** — append any of these to `!atk`:
| Modifier | Effect | Example |
|----------|--------|---------|
| `charge` | +1 ATK (5"+ straight charge) | `!atk 6 vs 4 charge` |
| `flank` | +1 ATK | `!atk 6 vs 4 flank` |
| `rear` | +2 ATK | `!atk 6 vs 4 rear` |
| `cover` | +1 DEF | `!atk 6 vs 3 cover` |
| `heavy_cover` | +2 DEF | `!atk 6 vs 3 heavy_cover` |
| `elevated` | +1 ATK (ranged) | `!atk 5 vs 4 elevated` |
| `dive` | +2 ATK (Diving Charge) | `!atk 4 vs 4 dive` |
| `honor` | +1 DEF, -1 ATK (Veilbound) | `!atk 6 vs 4 honor` |
| `revelation` | +1 ATK, -1 DEF (Veilbound) | `!atk 6 vs 4 revelation` |
| `grid_active` | +1 ATK (Iron Dominion) | `!atk 5 vs 4 grid_active` |
| `grid_fortified` | +1 ATK, +1 DEF (Iron Dominion) | `!atk 5 vs 3 grid_fortified` |
| `isolated` | -1 ATK (Iron Dominion) | `!atk 5 vs 4 isolated` |
| `superheated` | +1 dmg per hit (Emberclaw) | `!atk 6 vs 4 superheated` |

Modifiers stack: `!atk 6 vs 4 charge flank elevated`

### Faction Mechanics
| Command | Example | Description |
|---------|---------|-------------|
| `!heat <+/-N>` | `!heat +3` | Adjust Emberclaw Heat Pool (max 15, Overheat at 16+) |
| `!hunger <+/-N>` | `!hunger +1` | Adjust Nightfang Hunger Pool (kill tracker) |
| `!flow <+/-N>` | `!flow +4` | Adjust Veilbound Ritual Flow (max 40) |
| `!fate <+/-N>` | `!fate -1` | Adjust Thornweft Fate-Threads (finite, no regen) |
| `!anchors <+/-N>` | `!anchors +1` | Adjust Thornweft Web-Anchor count |
| `!charges <+/-N>` | `!charges +2` | Adjust Iron Dominion Fragment Charges |
| `!stance <type>` | `!stance honor` | Set Veilbound stance (honor/revelation/none) |
| `!instability [thresh]` | `!instability 3` | Roll Iron Dominion fragment instability check |
| `!corruption <tokens>` | `!corruption 6` | Check Corruption effect at token count |
| `!pools` | `!pools` | Display all faction mechanic pools |
| `!breath <dice>` | `!breath 4` | Breath Weapon (ignores cover, +2 Heat auto) |

### Tracking
| Command | Example | Description |
|---------|---------|-------------|
| `!kill <white/red>` | `!kill red` | Record a kill for a player |
| `!vp <player> <+/-N>` | `!vp white +2` | Adjust Victory Points |
| `!cp <player> <+/-N>` | `!cp red -3` | Adjust Command Points |
| `!army` | `!army` | Validate army composition on table |

### Game
| Command | Example | Description |
|---------|---------|-------------|
| `!scenario` | `!scenario` | Generate a random scenario/mission |
| `!phase` | `!phase` | Show current turn/phase/all pools |
| `!reset` | `!reset` | Reset game state (all pools, kills, HP cleared) |
| `!help` | `!help` | Lists all commands |

### Right-Click Unit Context Menu
Right-click any unit token with HP stats to access:
- **Deal 1/2/3 Damage** — Subtract HP, announces when at half HP or destroyed
- **Heal 1/2 HP** — Restore HP up to maximum
- **Show HP** — Display current HP with visual health bar
- **Blood Tithe** — Sacrifice 1 HP for +1 ATK die (Nightfang mechanic)

### Attack Resolution Example
```
> !atk 6 vs 4
⚔️ ATTACK: 6 dice vs DEF 4
Rolls: [2, 4, 6, 1, 5, 3]
Hits: 3 | Crits: 1 | Total Damage: 4
```
- Die results 4, 5, 6 all hit (≥ DEF 4)
- The 6 is a crit (2 damage instead of 1)
- Total: 2 normal hits + 1 crit = 4 damage

---

## Reading Unit Tokens

### Hovering / Right-Clicking
Hover over any token to see its tooltip. The **Description** field contains:

```
[b]Ashborn Infantry[/b]
Type: Infantry | Role: Core troops
Points: 2
─────────────────
ATK:6 | DEF:3 | HP:3 | MOV:7 | RNG:1 | MOR:6
─────────────────
• Fire Resistant

"Unbonded warriors wielding flame-forged spears"
```

### Commander Tokens
Commander tokens are **standing figurines** (taller) marked with ⭐. They include:
- Base stats (Command, Knowledge, Leadership, Agility, Health)
- Battle stats (ATK, DEF, HP, MOV, RNG, MOR)
- **GM Notes** contain the full skill tree and evolution paths (right-click → Notes)

### Stat Reference
| Stat | Meaning |
|------|---------|
| **ATK** | Number of attack dice rolled |
| **DEF** | Target number to hit (die must ≥ DEF) |
| **HP** | Hit points before destruction |
| **MOV** | Movement in inches per turn |
| **RNG** | Maximum attack range in inches |
| **MOR** | Morale threshold (2d6 ≤ MOR to pass) |

---

## Card System

Cards are sorted into 4 type decks inside the **Card Library** bag:

| Type | Color | Deck | Usage |
|------|-------|------|-------|
| **Command** | 🟢 Green | CMD | Movement orders, army-wide buffs |
| **Tech** | 🔵 Blue | TECH | Equipment upgrades, constructs |
| **Fragment** | 🟣 Purple | FRAG | Powerful but risky abilities |
| **Tactical** | 🟠 Orange | TAC | Combat tricks, reactions |

### Card Drawing
- Draw **2 cards per turn** during Command Phase
- **Hand limit: 7** cards
- Only your **Commander** can play cards
- Cards have a **CP cost** that must be paid
- Cards played within Commander's communication range

### Using Cards
1. Pull a card from your hand zone
2. Read the timing (which phase it can be played)
3. Spend the CP cost (adjust the counter)
4. Place the card face-up and announce its effect
5. Resolve, then discard

---

## Damage Tracking

### Using Damage Tokens
1. Open the **❤️ Damage Tokens** bag
2. Pull out **1-damage** (red, marked "1") or **5-damage** (dark red, marked "5") tokens
3. Stack damage tokens **on top of** the unit token
4. When damage ≥ unit's HP, the unit is destroyed (remove both)

### Example
A unit with 9 HP takes 7 damage:
- Place one 5-damage token and two 1-damage tokens on it
- The unit has 2 HP remaining
- At End Phase, it's below half HP → roll morale (2d6 ≤ MOR)

---

## Terrain System

The **🗺️ Terrain** bag contains 3 organized sub-bags with 70 terrain pieces total.

### 🌍 Area Terrain (13 tiles)
Large flat tiles representing terrain zones. Drag onto the battlefield.

| Piece | Qty | Type | Effect |
|-------|-----|------|--------|
| 🌲 **Forest** | 4 | Difficult + Light Cover | Half movement. +1 DEF vs ranged. Partial LoS block. |
| 🟤 **Swamp** | 3 | Difficult | Half movement. No combat modifiers. |
| ☢ **Dangerous Ground** | 2 | Dangerous | Enter/start turn: roll 1d6, on 1 take 1 damage. |
| 💥 **Crater** | 2 | Difficult + Light Cover | Half movement. +1 DEF vs ranged. |
| 🟩 **Open Ground** | 2 | Open | No modifiers. Use to mark designated clear zones. |

### 🏗️ Structures & Blocks (23 pieces)
3D terrain models — hills, walls, buildings, and barriers.

| Piece | Qty | Type | Effect |
|-------|-----|------|--------|
| ⛰️ **Hill** | 3 | Elevated | +1 ATK die ranged down. +1 DEF vs melee from below. |
| 🏔️ **Tall Hill** | 2 | Elevated + Difficult | Same as hill, but difficult to climb. |
| 🏚️ **Ruins** | 3 | Heavy Cover | +2 DEF vs ranged. Blocks LoS when fully behind. |
| 🏢 **Building** | 2 | Impassable | Cannot enter (non-Fly). Blocks LoS completely. |
| 🧱 **Wall Section** | 4 | Heavy Cover | +2 DEF vs ranged. Blocks LoS. ~6" long. |
| 🪵 **Barricade** | 4 | Light Cover | +1 DEF vs ranged. Does NOT block LoS. ~4" long. |
| 🪨 **Rock Outcrop** | 3 | Light Cover | +1 DEF vs ranged. Climbable (difficult). |
| 🌉 **Bridge** | 1 | Open (Elevated) | Passage over rivers/chasms. +1 ATK down. |
| 🗼 **Watchtower** | 1 | Impassable + Elevated | Blocks LoS. Adjacent units gain Light Cover. |

### ⚔ Faction Terrain (34 markers)
Faction-specific terrain and special tokens.

| Marker | Qty | Faction | Purpose |
|--------|-----|---------|----------|
| 🔥 **Burning Terrain** | 6 | Emberclaw | Non-Emberclaw: 1 dmg + -1 MOV. Emberclaw: Open + 1 Heat. Blocks Stealth. 2 turn duration. |
| 🕸️ **Web-Anchor** | 10 | Thornweft | Teleport network node. Proximity buffs: Severed/Threaded/Woven/Enthroned. |
| 🪤 **Gossamer Trap** | 8 | Thornweft | 4" zone — Impassable to enemies, Open to Thornweft (+1 DEF inside). |
| 🌑 **Shadow Zone** | 4 | Nightfang | Nightfang +1 DEF. Counts as cover for Stealth. Enemies -1 RNG through. |
| 💎 **Fragment Deposit** | 3 | Neutral | Iron Dominion: +1 Fragment Charge/turn within 4". Veilbound: Difficult. |
| 🌀 **Spirit Well** | 3 | Neutral | Veilbound: +2 Ritual Flow/turn within 4". Iron Dominion: Dangerous. |

### Terrain Placement Guide
- **Recommended:** 6–10 terrain pieces for a standard game
- Players alternate placing terrain, starting with the player who has fewer army points
- Each piece must be classified by type (hover to read the tooltip)
- Right-click → **Lock** pieces after placement so they don't get bumped
- Use the Setup Wizard (Step 2) for map selection — maps have pre-suggested terrain layouts

---

## Battle Maps

The mod includes **6 procedurally generated themed battle maps** stored in the **🗺️ Map Variants** bag:

| Map | Theme | Description |
|-----|-------|-------------|
| **Volcanic Wastes** | Emberclaw | Lava rivers, molten rock, ash fields |
| **Dark Forest** | Thornweft | Dense canopy, twisted trees, creeping vines |
| **Iron Fortress** | Iron Dominion | Metallic walls, factory floors, steam vents |
| **Shadow Ruins** | Nightfang | Crumbling temples, purple fog, dark stone |
| **Sacred Grounds** | Veilbound | Cherry blossom paths, spirit gates, shrine plazas |
| **Open Plains** | Neutral | Grasslands, gentle hills, scattered rocks |

### Switching Maps
1. Open the **🗺️ Map Variants** bag
2. Pull out the desired map
3. Delete the current game board (right-click → Delete)
4. Place the new map — it auto-locks in position

### Custom Maps
Generate new maps by editing `generate_maps.py` and running it:
```bash
python generate_maps.py
```
Maps output to `data/factions/Images/Maps/` as 2048×2048 PNGs.

---

## Templates & Range Rings

### Blast & Cone Templates (📐 bag)
| Template | Use |
|----------|-----|
| **Blast 3"** | Small AoE abilities (Fireburst, Acid Spray) |
| **Blast 6"** | Large AoE abilities (Artillery barrages) |
| **Cone 6"** | Short breath weapons, sprays |
| **Cone 8"** | Medium breath weapons |
| **Cone 10"** | Large breath weapons (Pyroclast Catapult) |

Place the template centered on the target point. Any unit token touching the template is affected.

### Range Rings (📏 bag)
| Ring | Use |
|------|-----|
| **1"** | Melee engagement range |
| **3"** | Short abilities, auras, claiming objectives |
| **6"** | Medium range abilities |
| **8"** | Long range attacks |
| **10"** | Maximum artillery range |

Drop a ring centered on a unit to check what's within range.

---

## Army Validation

Type `!army` in chat to scan all units currently placed on the table. The system:
- Counts all unit tokens and reads their Points cost from descriptions
- Tallies commanders, units, war machines, and fragments
- Determines battle size (Skirmish/Standard/Epic) based on total points
- Validates composition rules (e.g., no War Machines in Skirmish, commander limits)
- Reports ✅ VALID or ❌ INVALID with specific issues

---

## Scenarios

Type `!scenario` to randomly generate a mission. Available scenarios:
- **King of the Hill** — Control the center for 2 VP/turn
- **Shardstorm** — Fragment tokens rain onto objectives each turn
- **The Last Stand** — One player defends, the other attacks 3 objectives
- **Total War** — Score VP for destroying enemy units (Commander kill = 5 VP)
- **Supply Lines** — Control caches for bonus CP each turn
- **Broken Ground** — Devastated battlefield with extra hazard terrain

---

## Images

Unit tokens for **Emberclaw Warpack** and **Iron Dominion** include artwork from the project's GitHub repo. Other factions display colored placeholder images. As new art is added to the repo and pushed to `main`, re-run `tts_generator.py` to update the image URLs.

### Regenerating the Save File
After any game data changes:
```
python tts_generator.py
```
This regenerates `Shardborne.json` with the latest stats, cards, and images.

---

## Tips & Tricks

- **Right-click tokens** for options: Flip, Lock, Tooltip, Copy, etc.
- **Press `R`** while hovering over dice to roll them
- **Middle-click** to peek at a face-down card
- **Lock terrain** (right-click → Lock) so it doesn't get knocked around
- **Clone units** (Ctrl+C / Ctrl+V) to field multiple copies of the same unit
- **Number keys (1-9)** set the quantity when cloning
- **Tab** flips the camera to the other side
- Use **TTS ruler** (right-click empty space → Measure) for movement and range

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Save file not appearing in TTS | Check the Saves folder path — it must be in `Documents\My Games\Tabletop Simulator\Saves\` |
| UI panel not showing | Wait a few seconds after loading — it initializes with a short delay |
| Images not loading | Ensure the GitHub repo is public and images are pushed to `main` |
| Parser errors | Check that the JS data files haven't changed their export pattern |
| Missing units/commanders | Re-run `tts_generator.py` — it reads fresh from the data files |

---

## File Structure

```
Wargame/
├── tts_generator.py          ← Run this to generate the TTS save
├── generate_maps.py          ← Procedural map & template image generator
├── Shardborne.json           ← Generated TTS save file
├── TTS_GUIDE.md              ← This guide
├── data/
│   ├── core.js               ← Card library, core rules
│   └── factions/
│       ├── emberclaw-warpack.js
│       ├── iron-dominion.js
│       ├── nightfang-dominion.js
│       ├── thornweft-matriarchy.js
│       ├── veilbound-shogunate.js
│       └── Images/
│           ├── Emberclaw/     ← Unit artwork (22 webp)
│           ├── IronDominion/  ← Unit artwork (35 webp)
│           └── Maps/          ← Battle map images (6 × 2048px PNG)
│               └── Templates/ ← Blast, cone, range ring images
```

---

*Generated for Shardborne v3.0 — Tabletop Simulator Edition*
