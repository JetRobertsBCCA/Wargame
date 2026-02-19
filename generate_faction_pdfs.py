#!/usr/bin/env python3
"""
Shardborne — Faction Codex PDF Generator
=========================================
Generates a richly themed PDF codex for each of the 5 factions,
written from the perspective OF the faction itself. Each PDF includes:
  - Faction lore, philosophy, and doctrine
  - Playstyle and tactics guide (in-voice)
  - Complete commander profiles with stats and skill tree summaries
  - Full unit roster organized by type
  - Fragment catalogue
  - Faction-specific mechanics explained
  - Battlefield tactics and strategy advice

Requires: fpdf2, pillow (for decorative elements)
"""

import os
import re
import json
import math
from fpdf import FPDF

# ═══════════════════════════════════════════
# PATHS
# ═══════════════════════════════════════════
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
FACTIONS_DIR = os.path.join(DATA_DIR, "factions")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "codex")

# ═══════════════════════════════════════════
# FACTION DEFINITIONS
# ═══════════════════════════════════════════

FACTIONS = {
    "emberclaw-warpack": {
        "name": "Emberclaw Warpack",
        "icon": "🐉",
        "color": (255, 107, 53),       # #ff6b35
        "dark": (140, 50, 15),
        "accent": (255, 200, 50),
        "bg": (255, 245, 235),
        "author_title": "Compiled by the Ember Council — For the Eyes of the Bonded",
        "epigraph": "\"The sky belongs to the Warpack. In the air, only strength and flame decide.\"",
        "theme": "Dragon-bonded aerial warriors who wield dragonfire and soar on drake-back",
        "flavor": (
            "From burning nests in the Scorched Peaks, the Emberclaw ride drakes born of molten stone "
            "and feral flame. Every warrior is bonded to a drake — a partnership sealed in fire that "
            "grants both rider and beast unnatural strength. To face the Warpack is to face the storm "
            "itself: wings blotting the sun, claws raking steel, and the endless, roaring furnace of "
            "dragonfire consuming all below."
        ),
        "philosophy": "Strength through bonding; power through flame; glory through the skies.",
        "government": "Ember Council — 5 Flamewarden elders who have each survived three bonding cycles",
        "hierarchy": "Flamewarden → Scorchcaller → Ashbringer → Kindled → Unbonded",
        "lore_leader": "The Crimson Tyrant — a divine ancestor said to be the First Drake, now a semi-mythic figure whose flame allegedly still burns in the deepest nest",
        "doctrine": [
            ("The First Flame", "All fire is sacred; every blaze is a prayer to the Crimson Tyrant, whose eternal flame lit the first bonding."),
            ("The Bond Unbroken", "A rider who abandons their drake is worse than dead — they are forgotten. Their name is struck from the nesting rolls, their ashes scattered without ceremony."),
            ("The Ascent", "The higher you fly, the closer to truth. The ground is for the unworthy — walls, trenches, and fortifications are the tools of cowards who fear the open sky."),
        ],
        "mechanic_name": "The Heat Pool",
        "mechanic_desc": (
            "Every flame we kindle, every breath our drakes unleash, feeds the Heat Pool — "
            "a shared reservoir of thermal fury that binds the Warpack together. As the battle rages, "
            "Heat accumulates. Wise commanders learn to ride the edge: spend Heat for devastating "
            "Superheated Strikes, empowered Breath Weapons, or the terrifying Firestorm. But beware — "
            "let the Pool exceed 15 and it Overheats: every unit takes 1 damage as the sky itself "
            "catches fire, and the Commander is left gasping, unable to channel Fragments. "
            "Heat decays by 3 each Command Phase. Control the burn, or be consumed by it."
        ),
        "mechanic_table": [
            ("Heat Sources", "Fire keyword attacks, Breath Weapons, Drake Bond activations, fire kills"),
            ("Spend 2 Heat", "Superheated Strike: +2 damage on next hit"),
            ("Spend 3 Heat", "Extra Breath Weapon activation"),
            ("Spend 4 Heat", "Thermal Updraft: +4 MOV to all Fly units this turn"),
            ("Spend 6 Heat", "Firestorm: d6 damage to all non-Emberclaw in 6\""),
            ("Overheat (15+)", "All units take 1 damage, Commander can't play Fragments next turn"),
            ("Decay", "Heat decreases by 3 at each Command Phase"),
        ],
        "faction_bonuses": [
            "Fly ignores terrain penalties — the sky is our highway.",
            "Breath Weapons ignore cover — dragonfire seeps through stone.",
            "Drake Bond grants +1 ATK to bonded pairs, plus shared wound pool.",
            "Flame Aura: adjacent enemies take automatic damage from our burning presence.",
        ],
        "tactics_intro": (
            "Brothers and sisters of the flame — hear me well. We do not fight like the Iron Dominion's "
            "grinding war machines, nor the Nightfang's pestilent hordes. We strike from ABOVE. Our "
            "doctrine is the alpha strike: overwhelming force from an angle the enemy cannot defend."
        ),
        "tactics": [
            ("Strike From the Sky", "Deploy your cavalry wide. Use Ashrider Scouts to identify weak points, then commit Sky Lancers in a Diving Charge at the exposed flank. Never engage head-on — only the Unbonded are foolish enough for that, and they know it."),
            ("Control the Heat", "A wise Scorchcaller keeps Heat between 8 and 12. Enough for emergency Firestorm, but below the Overheat threshold. Use Forge Tenders and Heat Channelers to manage the pool."),
            ("The Breath Weapon Gambit", "Stack Breath Weapon units (Dragon Breath Battery, Scorchcaller Elites) and fire in sequence. Each attack ignores cover, and the cumulative Heat generation allows you to trigger Firestorm immediately after — devastating packed formations."),
            ("Protect the Nests", "Hatchery Guard and Nesting Wardens aren't glamorous, but they spawn reinforcements throughout the game. Keep them behind the line and let them produce Fledglings while your main force keeps pressure on."),
            ("The Tidescar Gambit", "If you field Tidescar the Exiled, know that his Ash Curse debuff aura affects EVERYONE near him — including allies. Deploy him far from your own lines and send him straight into the enemy. He's meant to die gloriously."),
            ("Fragment Timing", "Our Fragments cost Heat. Wait until Heat is high (10+) before activating — the bonus damage synergizes with natural Overheat thresholds, turning a liability into weaponized fury."),
        ],
    },
    "iron-dominion": {
        "name": "Iron Dominion",
        "icon": "⚙️",
        "color": (233, 69, 96),         # #e94560
        "dark": (100, 25, 40),
        "accent": (200, 200, 220),
        "bg": (240, 240, 248),
        "author_title": "Forge Council Technical Manual — Clearance Level: Vanguard",
        "epigraph": "\"Knowledge is the supreme currency; ignorance is the only sin.\"",
        "theme": "Technocratic empire of clockwork soldiers, steam-powered war machines, and fragment engineering",
        "flavor": (
            "The Iron Dominion marches to the rhythm of pistons and steam. Founded on the belief that "
            "fragments can be tamed through engineering, this technocratic empire has replaced flesh "
            "with clockwork and faith with precision. Every soldier is enhanced, every war machine is "
            "a marvel of arcane engineering, and every fragment is a tool to be calibrated. Where others "
            "fear the unknown, we measure it, catalogue it, and build weapons from it."
        ),
        "philosophy": "Fragments are not magic — they are science we haven't understood yet.",
        "government": "Technocratic oligarchy — Forge Council led by Arch-Fabricator Voltan Kress",
        "hierarchy": "Arch-Fabricator → Forge Council → Lord/Lady Engineers → War Machine Handlers → Clockwork Infantry",
        "lore_leader": "Arch-Fabricator Voltan Kress — whose mechanical heart has beaten for 147 years",
        "doctrine": [
            ("The Forge", "Knowledge is the supreme currency; ignorance is the only sin. Every fragment, every anomaly, every phenomenon can be understood if sufficient resources are allocated to its study."),
            ("The Grid", "Together we are stronger; isolated we are nothing. The Grid Cohesion system is not merely tactical doctrine — it is the foundational truth of the Dominion. No cog turns alone."),
            ("The Spark", "Fragments are not mystical. They are not divine. They are energy sources of extraordinary density, and with proper calibration they will power the future we build."),
        ],
        "mechanic_name": "Grid Cohesion & Fragment Charges",
        "mechanic_desc": (
            "The Grid is the beating heart of Iron Dominion tactical doctrine. Units within 4\" of "
            "allied units form a mesh of overlapping fields, shared targeting data, and coordinated "
            "fire disciplines. An isolated Dominion soldier is merely adequate. A Grid-connected "
            "formation is devastatingly efficient. Fragment Charges accumulate near War Machines and "
            "Support units, providing the energy necessary to activate our engineered Fragment devices."
        ),
        "mechanic_table": [
            ("Isolated (0 allies within 4\")", "-1 ATK die. The Grid is silent. Fix this immediately."),
            ("Connected (1 ally within 4\")", "No bonus, no penalty. Baseline acceptable."),
            ("Grid Active (2+ allies within 4\")", "+1 ATK die. The Grid sings."),
            ("Grid Fortified (3+ incl. Support)", "+1 ATK die AND +1 DEF. Optimal state."),
            ("Fragment Charges", "Generated 1/turn per unit near War Machines or Support"),
            ("Fragment Activation", "Costs 1-4 Charges depending on tier; d6 instability roll"),
            ("Instability (roll 1 on d6)", "Fragment misfires — 2 damage to nearest friendly unit"),
        ],
        "faction_bonuses": [
            "Mechanical units gain +1 durability — reinforced alloy plating.",
            "War machines cost -1 point with a Knowledge-path commander.",
            "Fragment instability reduced by 10% — superior containment systems.",
            "Engineers repair 1 HP per turn to adjacent mechanical units.",
        ],
        "tactics_intro": (
            "ATTENTION: This tactical brief is classified Forge Council Priority Alpha. "
            "The following doctrines have been stress-tested across 1,247 simulated engagements "
            "with a 94.3% favorable outcome rate when properly executed. Deviation from protocol "
            "results in Grid degradation and is strongly inadvisable. All commanders will acknowledge."
        ),
        "tactics": [
            ("Maintain Grid Integrity", "This is not a suggestion — it is the Prime Directive. Keep units within 4\" of at least 2 allies at ALL times. Grid Fortified (+1 ATK, +1 DEF) is the target state. Train your deployment to achieve this from Turn 1."),
            ("The Anvil and Hammer", "Deploy Steam Heavy Guards and Clockwork Vanguard as the anvil — Grid Fortified, shields locked, absorbing the charge. Then sweep the flanks with Steam Lancers and Gear-Rider Hussars. The enemy breaks on the anvil; the hammer finishes them."),
            ("War Machine Supremacy", "Our War Machines are the finest in the Shardborne. The Clockwork Titan alone is worth 90 points of raw devastation. Always pair War Machines with Gearwright Engineers for sustained repair. A Titan at full HP is terrifying; a Titan that self-repairs is unbeatable."),
            ("Fragment Charge Economy", "Overclocked Engineers generate Fragment Charges at 2x rate. Position them centrally, near your War Machine core. Build to 4 Charges before activating high-tier Fragments — the efficiency curve rewards patience."),
            ("Artillery Doctrine", "The Mechanized Siege Engine has 24\" range. Combined with Aether Cannon Walker, you control the entire battlefield from Turn 1. Use Steam Recon Flyers to spot, then delete priority targets from maximum range."),
            ("Counter-Rushing Protocol", "Against the Emberclaw and Nightfang, expect early aggression. Deploy in a tight Grid with Steam Heavy Guards forward. Their first charge will bounce off Grid Fortified DEF 6. Then counter-punch with your War Machines while they're overextended."),
        ],
    },
    "nightfang-dominion": {
        "name": "Nightfang Dominion",
        "icon": "🩸",
        "color": (220, 38, 38),         # #dc2626
        "dark": (80, 10, 10),
        "accent": (160, 30, 30),
        "bg": (248, 235, 235),
        "author_title": "Dictated by the Blood Court — Transcribed in Thrall Ink",
        "epigraph": "\"All living things are merely blood waiting to be consumed.\"",
        "theme": "Vampiric tiger empire of plague, corruption, thrall armies, and blood magic",
        "flavor": (
            "From the blood-drenched jungles of the Crimson Maw, the Nightfang Dominion rises — "
            "a predatory empire of vampiric tiger-lords who rule through plague, corruption, and "
            "the unquenchable hunger that drives them. Every creature beneath our banner is either "
            "predator or prey. And we, the Nightfang, are ALWAYS the predators. The Blight is not "
            "disease — it is evolution. The Hunger is not weakness — it is power. And the blood we "
            "consume builds an empire that will outlast the stars."
        ),
        "philosophy": "Consumption. Propagation. Dominance.",
        "government": "The Blood Court — ruled by Lord Sanguinar, the Blood Patriarch",
        "hierarchy": "Lord Sanguinar → Blood Dukes & Duchesses → Fang Generals → Plague Heralds → Thrall Masters → Thralls",
        "lore_leader": "Lord Sanguinar, the Blood Patriarch — who has consumed the blood of ten thousand warriors and remembers each one",
        "doctrine": [
            ("Consumption", "Feed first, question never. Every enemy is sustenance. Every battlefield is a feast. The strong consume the weak — this is not cruelty, it is the natural order perfected."),
            ("Propagation", "The Blight is not disease — it is evolution. When our corruption spreads, it does not destroy — it TRANSFORMS. The corrupted become ours. Their strength feeds our Hunger Pool. Their pain fuels our ascension."),
            ("Dominance", "The weak serve; the strong consume. There is no middle ground. A Thrall who fights well may earn the Quickening. A warrior who fails is merely... dinner."),
        ],
        "mechanic_name": "Corruption, Hunger, and Blood Tithe",
        "mechanic_desc": (
            "Three interconnected systems fuel the Dominion's war machine. CORRUPTION tokens stack "
            "on enemies through melee contact, progressively weakening them until they can barely "
            "lift their weapons. The HUNGER POOL tracks our collective kills — as the body count "
            "rises, the entire army grows stronger, faster, and hungrier. And BLOOD TITHE lets any "
            "unit sacrifice its own HP for immediate power — because pain is just another weapon."
        ),
        "mechanic_table": [
            ("Clean (0 tokens)", "No corruption effect. Target is fresh. Fix this."),
            ("Tainted (3 tokens)", "-1 ATK, -1 MOR. The rot begins."),
            ("Corrupted (6 tokens)", "-2 ATK, -1 DEF, -2 MOR. The flesh rebels."),
            ("Consumed (9 tokens)", "-3 ATK, -2 DEF, -3 MOR, must roll to act. Practically ours."),
            ("Hunger: Peckish", "+1 MOV all Nightfang. The scent of blood carried."),
            ("Hunger: Ravenous", "+1 ATK die all Nightfang. The frenzy builds."),
            ("Hunger: Gorged", "Commander heals 3HP, all gain Blood Drain. The feast is complete."),
            ("Blood Tithe (Units)", "Sacrifice 1 HP → +1 ATK die this attack"),
            ("Blood Tithe (Commander)", "Sacrifice 2 HP → draw 1 card immediately"),
        ],
        "faction_bonuses": [
            "Corruption Spread: melee hits apply Corruption tokens to targets — rotting from within.",
            "Blood Tithe: sacrifice HP for +ATK or card draw — pain IS power.",
            "Hunger Pool: kills accumulate into army-wide permanent buffs.",
            "Nocturnal Predators: +1 DEF in cover/shadow terrain — we see in the dark.",
        ],
        "tactics_intro": (
            "Listen well, whelps. The Blood Court does not waste words. What follows is how you hunt. "
            "How you feed. How you transform prey into fuel for the Dominion's endless hunger. "
            "Those who learn will ascend. Those who fail will be recycled. Both outcomes serve us."
        ),
        "tactics": [
            ("The Thrall Wave", "Thrall Conscripts and Plague Horde cost 2 points each. They die easily — that is their PURPOSE. Send them first. They absorb charges, apply Corruption tokens on contact, and every one of them that dies feeds the Hunger Pool. Even in death, they serve."),
            ("Corruption Stacking", "Melee combat applies Corruption tokens. Stack your attacks on priority targets — once an enemy reaches Tainted (3 tokens), they lose 1 ATK and 1 MOR. At Corrupted (6), they're barely functional. Nightfang Warriors apply 2 tokens per hit. Tiger Berserkers apply 3."),
            ("The Hunger Clock", "At Standard size, Ravenous triggers at 10 kills, granting +1 ATK die to your ENTIRE army. This is your win condition. Rush kills on cheap targets. If the enemy has expensive, durable units, feed Thralls into their cheapest to accelerate the counter."),
            ("Blood Tithe Timing", "Blood Tithe costs HP — don't use it frivolously. The optimal moment is when a Commander is at 60%+ HP with a critical combat about to resolve. Sacrifice 2 HP to draw a card that might save a 29-point commander."),
            ("The Tiger Fang Elite", "At 6 points and 18 ATK with Corruption 3, the Tiger Fang Elite is the most cost-efficient murder machine in the roster. Always bring at least 2. They're the scalpel while Thralls are the hammer."),
            ("Counter-Play: Iron Dominion", "Their Grid makes them tough. Solution: Corruption doesn't care about DEF bonuses. Stack tokens from cheap Thralls, then use Blood Reavers with Frenzy to exploit the -ATK debuff. Their Grid crumbles when they can't hit back."),
        ],
    },
    "thornweft-matriarchy": {
        "name": "Thornweft Matriarchy",
        "icon": "🕸️",
        "color": (107, 33, 168),         # #6b21a8
        "dark": (50, 15, 80),
        "accent": (180, 130, 220),
        "bg": (245, 238, 252),
        "author_title": "Woven by the Loom Council — Sealed with Gossamer Thread",
        "epigraph": "\"Fate is not written — it is woven.\"",
        "theme": "Spider-worshipping fate-weavers who spin silk roads that rewrite geography",
        "flavor": (
            "The Thornweft do not march to war — we weave it. From the living Web that spans our "
            "underground empire, the Matriarchy sends armies that arrive from impossible angles, "
            "fight on terrain that didn't exist moments ago, and vanish into silk-spun shadows "
            "when the battle turns. Our spiders are not pets — they are partners, bonded at the "
            "soul, and together we reshape reality one thread at a time. Where others see a "
            "battlefield, we see raw material waiting to be rewoven."
        ),
        "philosophy": "The battlefield is raw material — reshape it.",
        "government": "Loom Council — 5 Loom-Mothers who each oversee a Domain of the Web",
        "hierarchy": "Arachessa the Weave-Queen → Loom Council → Thread-Seers → Silk-Marshals → Web-Spinners → Shuttle-Consorts",
        "lore_leader": "Arachessa the Weave-Queen — fused with the Web's central nexus for 200 years, seeing all threads simultaneously",
        "doctrine": [
            ("The Loom", "The battlefield is raw material — reshape it. Every rock, every river, every shadow is a thread waiting to be rewoven into something that serves US. Terrain is not an obstacle — it is a weapon we haven't deployed yet."),
            ("The Silk", "Every strand connects; isolation is death. The Web is all. A warrior outside the Web-Anchor network is a thread cut loose — weak, vulnerable, purposeless. Stay connected. Stay woven. Stay strong."),
            ("The Fang", "Even spiders bite — patience ends in violence. We are not pacifists. We are not passive. We are PATIENT. And when patience runs out, the Fang strikes — swift, venomous, absolute."),
        ],
        "mechanic_name": "Web-Anchor Network & Fate-Threads",
        "mechanic_desc": (
            "The Web-Anchor Network is our greatest instrument. Anchors placed across the "
            "battlefield create a silk-spun infrastructure of teleportation corridors, defensive "
            "buffs, and strategic flexibility that no other faction can match. Fate-Threads are "
            "our rarest resource — finite strands of destiny-altering energy that let us force "
            "enemy rerolls, negate their cards, or guarantee our own critical strikes."
        ),
        "mechanic_table": [
            ("Web-Anchor Placement", "1 per turn, within 8\" of any friendly unit"),
            ("Max Anchors", "4 (Skirmish) / 6 (Standard) / 10 (Epic)"),
            ("Teleport", "Up to 3 units/turn: within 4\" of Anchor → within 4\" of any other"),
            ("Severed (0 Anchors within 6\")", "-1 ATK, -1 MOR. Cut off from the Web."),
            ("Threaded (1 Anchor within 6\")", "No bonus. Minimum acceptable connection."),
            ("Woven (2 Anchors within 6\")", "+1 DEF. The Web strengthens."),
            ("Enthroned (3+ Anchors within 6\")", "+1 DEF AND +1 ATK. Full resonance."),
            ("Fate-Thread Pool", "Equal to Commander's Command stat (finite per game)"),
            ("1 Thread", "Force enemy reroll OR grant ally reroll"),
            ("2 Threads", "Force enemy Morale re-check"),
            ("3 Threads", "Negate an enemy card effect completely"),
        ],
        "faction_bonuses": [
            "Web-Network Teleport: our units phase through silk-space between Anchors.",
            "Fate-Threads: finite but devastating — force rerolls, negate cards, rewrite outcomes.",
            "Gossamer Trap: create 4\" zones that are impassable for enemies, open for us.",
            "Silk Shroud: +1 DEF near web terrain — the silk itself protects its weavers.",
        ],
        "tactics_intro": (
            "Children of the Web, attend: what follows is the weaving pattern for victory. "
            "Unlike the crude bludgeoning of the Warpack or the grinding machinery of the Dominion, "
            "OUR art is patience, position, and precision. Every thread you place, every Anchor "
            "you deploy, every Fate-Thread you spend — these are stitches in the grand design. "
            "Weave well, and the enemy will find themselves tangled in a web they never saw coming."
        ),
        "tactics": [
            ("The Opening Weave", "Turn 1: place your first Web-Anchor aggressively — 8\" forward, near a central objective. Turn 2: place one on each flank. By Turn 3, you have a teleportation triangle that controls the center of the board. Your opponent must now guess where your army will appear."),
            ("Teleport Ambush", "Position 3 cheap units (Thread-Warden Infantry) near a forward Anchor. At the start of Movement Phase, teleport your heavy hitters — Fang Guard Elite, Matriarch Riders — to the forward Anchor. Charge from unexpected angles. Teleport back next turn if threatened."),
            ("Fate-Thread Conservation", "You have a FINITE pool. Do NOT spend Fate-Threads frivolously. Save them for: (1) forcing enemy commander to reroll a critical hit, (2) negating a game-changing enemy card, (3) guaranteeing your own assassination strike lands."),
            ("Gossamer Trap Denial", "Silk-Warden Morthis can blanket the board with impassable Gossamer Traps. Place them across enemy reinforcement lanes, forcing them to take long detours while your teleporting army bypasses them entirely."),
            ("The Assassin Thread", "Thread-Cutter Nyx has 21 ATK, 2 DEF, 18 HP. She is the ultimate glass cannon. Teleport her to a rear Anchor, walk her into the enemy commander, and execute. If she dies after the kill, you've traded 19 points for their 25+ point commander. This is always worth it."),
            ("Counter-Play: Nightfang", "Their Corruption requires melee contact. Deny it. Use Silk-Shot Skirmishers at range. Teleport away when they close. Their Thrall hordes will stumble into Gossamer Traps while your Venom Dancers poison the elite Tiger units from a distance."),
        ],
    },
    "veilbound-shogunate": {
        "name": "Veilbound Shogunate",
        "icon": "⛩️",
        "color": (139, 92, 246),         # #8b5cf6
        "dark": (55, 30, 110),
        "accent": (200, 170, 255),
        "bg": (245, 240, 255),
        "author_title": "Scroll of the Three Veils — Dictated by the Masked Lords",
        "epigraph": "\"Perfection through the erasure of self. Order as a gateway to the unknowable.\"",
        "theme": "Eldritch samurai civilization blending rigid discipline with cosmic horror entities",
        "flavor": (
            "We are the Veilbound. An ancient warrior civilization that blends rigid samurai "
            "discipline with exposure to incomprehensible cosmic entities from beyond the veil of "
            "reality. Our warriors channel otherworldly power through ritualized combat forms. "
            "Our priests commune with yokai and kami. Our commanders walk the razor edge between "
            "enlightened mastery and existential dissolution. Where lesser factions see madness, "
            "we see the truth beyond the veil — and we have made it our weapon."
        ),
        "philosophy": "The body is a vessel. The mind is a gate. Reality is a suggestion.",
        "government": "The Shrouded Shogunate — ruled by the masked Shogun whose identity is unknown, even to the Masked Lords",
        "hierarchy": "Shrouded Shogun → Masked Lords → Elite Commanders → Ritual Captains → Ashigaru",
        "lore_leader": "The Shrouded Shogun — no one alive has seen their face. Some whisper that there is no face beneath the mask — only the void itself.",
        "doctrine": [
            ("Veil of Flesh", "The body is a vessel — train it until it breaks, then train it more. A Veilbound warrior's physical form has been honed through decades of brutal discipline until it moves without conscious thought."),
            ("Veil of Thought", "The mind is a gate — open it to the whispers beyond. Through meditation, ritual, and controlled exposure to the entities beyond the veil, our warriors hear the cosmic currents that guide fate."),
            ("Veil of Reality", "Reality is a suggestion — the disciplined may overwrite it. At the highest levels of mastery, our warriors and commanders can impose their will upon the fabric of existence itself."),
        ],
        "mechanic_name": "Ritual Flow & The Stance System",
        "mechanic_desc": (
            "Ritual Flow is the accumulation of spiritual energy generated by our warriors' "
            "disciplined combat. Each turn, as our units fight, pray, and channel, Flow builds "
            "in a shared pool — unlocking increasingly powerful tier abilities. The Stance System "
            "allows each unit to choose its spiritual posture each turn: Honor Stance for "
            "unbreakable defense, or Revelation Stance for devastating offense at greater risk. "
            "These two systems interlock — Revelation Stance generates more Flow, accelerating "
            "your path to the devastating Ascendant tier."
        ),
        "mechanic_table": [
            ("Stirring (5 Flow)", "Unlock Tier 1 abilities. The veil thins."),
            ("Surging (12 Flow)", "Unlock Tier 2 + all units +1 MOR. Spirits awaken."),
            ("Overflowing (20 Flow)", "Unlock Tier 3 + 1 free card per turn. Reality bends."),
            ("Ascendant (30 Flow)", "Unlock Tier 4 + all units +1 ATK die + transformations available."),
            ("Honor Stance", "+1 DEF, -1 ATK, cannot be flanked. Iron discipline."),
            ("Revelation Stance", "+1 ATK, -1 DEF, generate +1 Flow. Open the gate."),
            ("Fragment Cost", "Activation costs Flow (tier × 2). No instability — purified by discipline."),
        ],
        "faction_bonuses": [
            "+1 morale resistance — our warriors do not know fear, only discipline.",
            "Enemy -1 morale when engaged in melee — our presence is existentially unsettling.",
            "10% miss chance on adjacent enemies — Yokai Presence warps targeting.",
            "Commanders are immune to fear effects — they have gazed beyond the veil and returned.",
        ],
        "tactics_intro": (
            "Warriors of the Veil — this scroll contains the combat doctrines handed down from the "
            "Masked Lords. Read. Memorize. Internalize. Then burn this scroll, for true knowledge "
            "lives in the body, not on paper. Our way is precision, not brute force. Patience, "
            "not recklessness. Each warrior is worth ten of the enemy. Act accordingly."
        ),
        "tactics": [
            ("The Flow Ramp", "Early turns: all units in Revelation Stance to generate Flow aggressively. Accept the -1 DEF — use terrain and positioning to compensate. By Turn 3, you should be at Surging (12 Flow). By Turn 4, Overflowing (20 Flow). At Ascendant, you win."),
            ("Stance Dancing", "The best Veilbound players switch stances turn by turn. Revelation on Turn 1 (generate Flow), Honor on Turn 2 (absorb the counter-attack), Revelation on Turn 3 (push again). This rhythm keeps the enemy guessing while steadily building Flow."),
            ("The Kintsugi Principle", "Kintsugi Blademasters gain +1 ATK per HP lost. At 5/9 HP remaining, they have 16 ATK. Don't heal them. Let them rage. Position Shrine Wardens nearby for morale support, but let the gold-cracked warriors break the enemy with their pain."),
            ("Yokai Pressure", "Adjacent enemies have a 10% miss chance from Yokai Presence. Stack this with Honor Stance (+1 DEF) and Shrine Oath bonuses (+1 DEF). The enemy needs 6+ to hit — and 10% of those still miss. Your Shrine Wardens become functionally invulnerable."),
            ("Assassination Doctrine", "Commander Kagero has 18 ATK, 12 MOV, and stealth. He exists to kill enemy commanders. Flow to Surging, activate his Tier 2 ability for guaranteed backstrike, and cut the head off the snake. Without their commander, the enemy army crumbles."),
            ("Counter-Play: Thornweft", "Their teleportation is annoying, but our morale warfare counters it. They must appear SOMEWHERE — when they do, engage with units that impose -1 MOR. Sacred Grounds terrain reduces their Fate-Thread effectiveness. Force them to fight, and our discipline beats their tricks."),
        ],
    },
}


# ═══════════════════════════════════════════
# DATA PARSING
# ═══════════════════════════════════════════

def read_js_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def sanitize(text):
    """Replace non-latin1 characters with safe equivalents for PDF output."""
    if not isinstance(text, str):
        return str(text) if text is not None else ""
    replacements = {
        '\u2014': '--',   # em dash
        '\u2013': '-',    # en dash
        '\u2018': "'",    # left single quote
        '\u2019': "'",    # right single quote
        '\u201c': '"',    # left double quote
        '\u201d': '"',    # right double quote
        '\u2026': '...',  # ellipsis
        '\u2022': '*',    # bullet
        '\u00b7': '*',    # middle dot
        '\u2212': '-',    # minus sign
        '\u00e9': 'e',    # e-acute
        '\u2122': '(TM)', # trademark
        '\u00a9': '(c)',  # copyright
        '\u00ae': '(R)',  # registered
        '\u2665': '<3',   # heart
        '\u2605': '*',    # star
        '\u00d7': 'x',   # multiplication sign
        '\u2192': '->',  # right arrow
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    # Strip any remaining non-latin1 characters
    text = text.encode('latin-1', errors='replace').decode('latin-1')
    return text


def find_matching_brace(text, start):
    """Find the matching closing brace for an opening brace at position start."""
    depth = 0
    i = start
    in_string = False
    string_char = None
    while i < len(text):
        c = text[i]
        if in_string:
            if c == '\\':
                i += 2
                continue
            if c == string_char:
                in_string = False
        else:
            if c in ('"', "'", '`'):
                in_string = True
                string_char = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return i
        i += 1
    return -1


def extract_objects_from_block(block):
    """Extract all top-level {...} objects from a block of text."""
    objects = []
    i = 0
    while i < len(block):
        if block[i] == '{':
            end = find_matching_brace(block, i)
            if end > i:
                obj_text = block[i:end+1]
                obj = parse_js_object(obj_text)
                if obj:
                    objects.append(obj)
                i = end + 1
            else:
                i += 1
        else:
            i += 1
    return objects


def extract_js_objects(text, array_name):
    """Extract JS objects from:
    Pattern A: gameData.<array_name>.push(obj1, obj2, ...)
    Pattern B: const <variable> = [...]; <variable>.forEach(x => gameData.<array_name>.push(x))
    """
    objects = []

    # Pattern A: gameData.X.push( ... ) — may contain multiple objects
    push_pattern = re.compile(
        r'gameData\.' + re.escape(array_name) + r'\.push\(',
        re.DOTALL
    )
    for m in push_pattern.finditer(text):
        start = m.end()
        # Find the matching close paren for this push( call
        depth = 1
        i = start
        in_string = False
        string_char = None
        while i < len(text) and depth > 0:
            c = text[i]
            if in_string:
                if c == '\\':
                    i += 2
                    continue
                if c == string_char:
                    in_string = False
            else:
                if c in ('"', "'", '`'):
                    in_string = True
                    string_char = c
                elif c == '(':
                    depth += 1
                elif c == ')':
                    depth -= 1
            i += 1
        push_content = text[start:i-1]
        objs = extract_objects_from_block(push_content)
        objects.extend(objs)

    # Pattern B: const X = [...]; X.forEach(c => gameData.Y.push(c))
    const_pattern = re.compile(
        r'const\s+(\w+)\s*=\s*\[',
        re.DOTALL
    )
    for m in const_pattern.finditer(text):
        var_name = m.group(1)
        # Check if this variable is forEach'd into gameData.<array_name>
        forEach_pattern = re.compile(
            re.escape(var_name) + r'\.forEach\(\w+\s*=>\s*gameData\.' + re.escape(array_name) + r'\.push'
        )
        if not forEach_pattern.search(text):
            continue

        start = m.end()
        # Find matching ] for the const X = [
        depth = 1
        i = start
        in_string = False
        string_char = None
        while i < len(text) and depth > 0:
            c = text[i]
            if in_string:
                if c == '\\':
                    i += 2
                    continue
                if c == string_char:
                    in_string = False
            else:
                if c in ('"', "'", '`'):
                    in_string = True
                    string_char = c
                elif c == '[':
                    depth += 1
                elif c == ']':
                    depth -= 1
            i += 1
        array_content = text[start:i-1]
        objs = extract_objects_from_block(array_content)
        objects.extend(objs)

    return objects


def parse_js_object(text):
    """Parse a JS object literal into a Python dict using robust tokenizer."""
    try:
        cleaned = text.strip()
        # Remove JS comments
        cleaned = re.sub(r'//[^\n]*', '', cleaned)
        # Remove trailing commas before } or ]
        cleaned = re.sub(r',(\s*[}\]])', r'\1', cleaned)

        # Convert single-quoted strings to double-quoted, respecting nesting
        result = []
        i = 0
        while i < len(cleaned):
            c = cleaned[i]
            if c == '"':
                # Already in double-quoted string - pass through
                result.append(c)
                i += 1
                while i < len(cleaned):
                    if cleaned[i] == '\\':
                        result.append(cleaned[i:i+2])
                        i += 2
                        continue
                    result.append(cleaned[i])
                    if cleaned[i] == '"':
                        i += 1
                        break
                    i += 1
            elif c == "'":
                # Single-quoted string -> convert to double-quoted
                result.append('"')
                i += 1
                while i < len(cleaned):
                    if cleaned[i] == '\\':
                        result.append(cleaned[i:i+2])
                        i += 2
                        continue
                    if cleaned[i] == "'":
                        i += 1
                        break
                    if cleaned[i] == '"':
                        result.append('\\"')
                        i += 1
                        continue
                    result.append(cleaned[i])
                    i += 1
                result.append('"')
            else:
                result.append(c)
                i += 1
        cleaned = ''.join(result)

        # Handle unquoted keys
        cleaned = re.sub(r'(?<=[{,\n])\s*(\w+)\s*:', r'"\1":', cleaned)
        # Handle JS booleans/null
        cleaned = re.sub(r'\btrue\b', 'True', cleaned)
        cleaned = re.sub(r'\bfalse\b', 'False', cleaned)
        cleaned = re.sub(r'\bnull\b', 'None', cleaned)
        cleaned = re.sub(r'\bundefined\b', 'None', cleaned)
        return eval(cleaned)
    except Exception:
        return None


# ═══════════════════════════════════════════
# PDF CLASS
# ═══════════════════════════════════════════

class FactionCodex(FPDF):
    """Custom PDF class for faction codex documents."""

    def __init__(self, faction_key):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.faction_key = faction_key
        self.faction = FACTIONS[faction_key]
        self.r, self.g, self.b = self.faction["color"]
        self.dr, self.dg, self.db = self.faction["dark"]
        self.ar, self.ag, self.ab = self.faction["accent"]
        self.bgr, self.bgg, self.bgb = self.faction["bg"]
        self.set_auto_page_break(auto=True, margin=20)
        self.set_margins(15, 15, 15)

        # Add built-in fonts only
        self.add_page()

    def header(self):
        # Dark header bar
        self.set_fill_color(self.dr, self.dg, self.db)
        self.rect(0, 0, 210, 12, 'F')
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 2)
        self.cell(0, 8, sanitize(f"SHARDBORNE -- {self.faction['name'].upper()} CODEX"), new_x="RIGHT", new_y="TOP", align="L")
        self.cell(0, 8, sanitize(f"Page {self.page_no()}"), new_x="LMARGIN", new_y="NEXT", align="R")
        self.set_y(16)

    def footer(self):
        self.set_y(-15)
        self.set_fill_color(self.dr, self.dg, self.db)
        self.rect(0, 282, 210, 15, 'F')
        self.set_font("Helvetica", "I", 7)
        self.set_text_color(200, 200, 200)
        self.cell(0, 10, sanitize(self.faction["author_title"]), align="C")

    def chapter_title(self, title, subtitle=None):
        """Full-width chapter header with faction color."""
        if self.get_y() > 240:
            self.add_page()
        self.ln(4)
        # Colored bar
        self.set_fill_color(self.r, self.g, self.b)
        self.rect(15, self.get_y(), 180, 10, 'F')
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(255, 255, 255)
        self.set_x(20)
        self.cell(170, 10, sanitize(title.upper()), new_x="LMARGIN", new_y="NEXT", align="L")
        if subtitle:
            self.set_font("Helvetica", "I", 9)
            self.set_text_color(self.r, self.g, self.b)
            self.cell(0, 6, sanitize(subtitle), new_x="LMARGIN", new_y="NEXT")
        self.ln(2)
        self.set_text_color(30, 30, 30)

    def section_header(self, title):
        """Section sub-header with accent line."""
        if self.get_y() > 260:
            self.add_page()
        self.ln(3)
        self.set_draw_color(self.r, self.g, self.b)
        self.set_line_width(0.5)
        self.line(15, self.get_y(), 195, self.get_y())
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(self.dr, self.dg, self.db)
        self.cell(0, 7, sanitize(title), new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(30, 30, 30)
        self.ln(1)

    def body_text(self, text):
        """Standard body paragraph."""
        self.set_font("Helvetica", "", 9)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 5, sanitize(text))
        self.ln(2)

    def italic_text(self, text):
        """Italicized flavor text."""
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(self.r, self.g, self.b)
        self.multi_cell(0, 5, sanitize(text))
        self.set_text_color(40, 40, 40)
        self.ln(2)

    def quote_block(self, text):
        """Indented quote with bar."""
        x = self.get_x()
        y = self.get_y()
        self.set_fill_color(self.bgr, self.bgg, self.bgb)
        self.set_draw_color(self.r, self.g, self.b)
        self.set_line_width(1.0)
        self.set_font("Helvetica", "I", 10)
        self.set_text_color(self.dr, self.dg, self.db)
        safe = sanitize(text)
        # Estimate height
        lines = len(safe) / 85 + 1
        h = max(lines * 5.5, 8)
        self.rect(20, y, 170, h + 4, 'F')
        self.line(20, y, 20, y + h + 4)
        self.set_xy(25, y + 2)
        self.multi_cell(160, 5.5, safe)
        self.ln(3)
        self.set_text_color(40, 40, 40)

    def stat_line(self, label, value):
        """Bold label + normal value on same line."""
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(self.dr, self.dg, self.db)
        safe_label = sanitize(label)
        w = self.get_string_width(safe_label + ": ") + 2
        self.cell(w, 5, safe_label + ": ", new_x="RIGHT", new_y="TOP")
        self.set_font("Helvetica", "", 9)
        self.set_text_color(40, 40, 40)
        self.cell(0, 5, sanitize(str(value)), new_x="LMARGIN", new_y="NEXT")

    def add_table(self, headers, rows, col_widths=None):
        """Draw a table with headers and rows."""
        if self.get_y() > 250:
            self.add_page()

        if col_widths is None:
            total = 180
            col_widths = [total / len(headers)] * len(headers)

        # Header row
        self.set_fill_color(self.r, self.g, self.b)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 8)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 6, sanitize(h), border=1, fill=True, align="C")
        self.ln()

        # Data rows
        self.set_font("Helvetica", "", 7.5)
        self.set_text_color(30, 30, 30)
        alt = False
        for row in rows:
            if self.get_y() > 270:
                self.add_page()
                # Reprint header
                self.set_fill_color(self.r, self.g, self.b)
                self.set_text_color(255, 255, 255)
                self.set_font("Helvetica", "B", 8)
                for i, h in enumerate(headers):
                    self.cell(col_widths[i], 6, sanitize(h), border=1, fill=True, align="C")
                self.ln()
                self.set_font("Helvetica", "", 7.5)
                self.set_text_color(30, 30, 30)
                alt = False

            if alt:
                self.set_fill_color(self.bgr, self.bgg, self.bgb)
            else:
                self.set_fill_color(255, 255, 255)
            for i, val in enumerate(row):
                self.cell(col_widths[i], 5.5, sanitize(str(val)[:50]), border=1, fill=True, align="C" if i > 0 else "L")
            self.ln()
            alt = not alt
        self.ln(3)

    def bullet_list(self, items):
        """Bulleted list."""
        self.set_font("Helvetica", "", 9)
        self.set_text_color(40, 40, 40)
        for item in items:
            if self.get_y() > 270:
                self.add_page()
            self.set_x(20)
            self.cell(5, 5, "-", new_x="RIGHT", new_y="TOP")
            self.multi_cell(160, 5, sanitize(item))
            self.ln(1)
        self.ln(1)

    def numbered_doctrine(self, doctrines):
        """Numbered doctrine entries with bold titles."""
        for i, (title, desc) in enumerate(doctrines, 1):
            if self.get_y() > 265:
                self.add_page()
            self.set_font("Helvetica", "B", 9)
            self.set_text_color(self.r, self.g, self.b)
            self.cell(8, 5, f"{i}.", new_x="RIGHT", new_y="TOP")
            self.cell(0, 5, sanitize(title), new_x="LMARGIN", new_y="NEXT")
            self.set_font("Helvetica", "", 9)
            self.set_text_color(50, 50, 50)
            self.set_x(25)
            self.multi_cell(160, 5, sanitize(desc))
            self.ln(2)

    def tactic_block(self, title, desc):
        """Tactic section with bold heading."""
        if self.get_y() > 255:
            self.add_page()
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(self.dr, self.dg, self.db)
        self.cell(0, 6, sanitize(f">> {title}"), new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 9)
        self.set_text_color(50, 50, 50)
        self.set_x(20)
        self.multi_cell(165, 5, sanitize(desc))
        self.ln(2)


# ═══════════════════════════════════════════
# PDF GENERATION
# ═══════════════════════════════════════════

def format_stat_block(stats):
    """Format a stats dict into a compact string."""
    parts = []
    for key in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"]:
        if key in stats:
            parts.append(f"{key}:{stats[key]}")
    return " | ".join(parts)


def generate_faction_pdf(faction_key):
    """Generate a complete PDF codex for a given faction."""
    fdata = FACTIONS[faction_key]
    fname = fdata["name"]
    print(f"\n  Building {fname} codex...")

    # ── Read faction data ──
    js_path = os.path.join(FACTIONS_DIR, f"{faction_key}.js")
    js_text = read_js_file(js_path)
    commanders = extract_js_objects(js_text, "commanders")
    units = extract_js_objects(js_text, "units")
    fragments = extract_js_objects(js_text, "fragments")

    print(f"    Parsed: {len(commanders)} commanders, {len(units)} units, {len(fragments)} fragments")

    # ── Create PDF ──
    pdf = FactionCodex(faction_key)

    # ════════════════════════════════════════
    # COVER PAGE
    # ════════════════════════════════════════
    pdf.set_y(50)
    # Large faction icon area
    pdf.set_fill_color(*fdata["dark"])
    pdf.rect(0, 30, 210, 90, 'F')

    pdf.set_font("Helvetica", "B", 40)
    pdf.set_text_color(255, 255, 255)
    pdf.set_y(45)
    pdf.cell(0, 20, sanitize(fdata["icon"]), new_x="LMARGIN", new_y="NEXT", align="C")

    pdf.set_font("Helvetica", "B", 28)
    # Clean the name for encoding safety
    safe_name = sanitize(fname.upper())
    pdf.cell(0, 15, safe_name, new_x="LMARGIN", new_y="NEXT", align="C")

    pdf.set_font("Helvetica", "", 14)
    pdf.set_text_color(220, 220, 220)
    pdf.cell(0, 10, "CODEX IMPERIALIS", new_x="LMARGIN", new_y="NEXT", align="C")

    # Accent line
    pdf.set_y(125)
    pdf.set_draw_color(*fdata["color"])
    pdf.set_line_width(2)
    pdf.line(40, 125, 170, 125)

    # Epigraph
    pdf.set_y(135)
    pdf.set_font("Helvetica", "I", 12)
    pdf.set_text_color(*fdata["color"])
    pdf.multi_cell(0, 7, sanitize(fdata["epigraph"]), align="C")

    # Theme
    pdf.set_y(160)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(0, 6, sanitize(fdata["flavor"]), align="C")

    # Author line
    pdf.set_y(210)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(120, 120, 120)
    pdf.multi_cell(0, 5, sanitize(fdata["author_title"]), align="C")

    pdf.set_y(230)
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(150, 150, 150)
    pdf.cell(0, 5, "SHARDBORNE UNIVERSE -- TABLETOP WARGAME", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.cell(0, 5, "v2.0", new_x="LMARGIN", new_y="NEXT", align="C")

    # ════════════════════════════════════════
    # TABLE OF CONTENTS
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("Table of Contents")
    toc_items = [
        "I. Our History & Creed",
        "II. Political Structure & Hierarchy",
        "III. The Doctrine",
        f"IV. Our Engine: {fdata['mechanic_name']}",
        "V. Faction Abilities",
        "VI. The War Council — Commanders",
        "VII. The Ranks — Complete Unit Roster",
        "VIII. Sacred Artifacts — Fragment Catalogue",
        "IX. Tactical Doctrine — How We Win",
        "X. Appendix — Quick Reference",
    ]
    pdf.set_font("Helvetica", "", 11)
    for i, item in enumerate(toc_items):
        pdf.set_text_color(*fdata["dark"])
        pdf.cell(0, 8, sanitize(item), new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    pdf.italic_text("This codex is classified. Its contents are for the eyes of sworn warriors only.")

    # ════════════════════════════════════════
    # I. HISTORY & CREED
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("I. Our History & Creed", fdata["theme"])
    pdf.quote_block(fdata["epigraph"])
    pdf.body_text(fdata["flavor"])
    pdf.stat_line("Core Philosophy", fdata["philosophy"])
    pdf.ln(3)

    # ════════════════════════════════════════
    # II. POLITICAL STRUCTURE
    # ════════════════════════════════════════
    pdf.chapter_title("II. Political Structure & Hierarchy")
    pdf.stat_line("Government", fdata["government"])
    pdf.stat_line("Hierarchy", fdata["hierarchy"])
    pdf.stat_line("Lore Leader", fdata["lore_leader"])
    pdf.ln(3)

    # ════════════════════════════════════════
    # III. THE DOCTRINE
    # ════════════════════════════════════════
    pdf.chapter_title("III. The Doctrine")
    pdf.numbered_doctrine(fdata["doctrine"])

    # ════════════════════════════════════════
    # IV. FACTION MECHANIC
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title(f"IV. Our Engine: {fdata['mechanic_name']}")
    pdf.body_text(fdata["mechanic_desc"])

    headers = ["Level / Action", "Effect"]
    rows = [(label, desc) for label, desc in fdata["mechanic_table"]]
    pdf.add_table(headers, rows, col_widths=[50, 130])

    # ════════════════════════════════════════
    # V. FACTION ABILITIES
    # ════════════════════════════════════════
    pdf.chapter_title("V. Faction Abilities")
    pdf.bullet_list(fdata["faction_bonuses"])

    # ════════════════════════════════════════
    # VI. COMMANDERS
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("VI. The War Council", f"{len(commanders)} Commanders of the {fname}")

    if faction_key == "emberclaw-warpack":
        pdf.italic_text(
            "These are the chosen of the Ember Council. Each has survived the bonding fires, "
            "each commands the loyalty of drakes and warriors alike. Know their strengths, "
            "understand their doctrine, and follow their lead into the burning sky."
        )
    elif faction_key == "iron-dominion":
        pdf.italic_text(
            "The following personnel profiles have been compiled by the Forge Council's Department "
            "of Strategic Assessment. Each commander has been evaluated across 47 performance metrics. "
            "Deployment recommendations follow each profile."
        )
    elif faction_key == "nightfang-dominion":
        pdf.italic_text(
            "The Blood Court's war leaders. Each has proven their strength through consumption, "
            "each has earned their rank in blood. The weak ones were eaten long ago. "
            "What remains is terrible, efficient, and always hungry."
        )
    elif faction_key == "thornweft-matriarchy":
        pdf.italic_text(
            "The weavers of fate, the spiders at the center of the web. Each of these commanders "
            "has been chosen by the Loom Council for their unique ability to reshape battlefields. "
            "Study their threads — and learn to weave your own."
        )
    elif faction_key == "veilbound-shogunate":
        pdf.italic_text(
            "The warriors who have pierced the Three Veils. Each commander below has achieved mastery "
            "beyond what lesser civilizations consider possible. Their combat forms are prayers. "
            "Their presence reshapes reality. Serve them with absolute discipline."
        )

    for ci, cmd in enumerate(commanders):
        if pdf.get_y() > 230:
            pdf.add_page()

        name = sanitize(cmd.get("name", "Unknown"))
        title = sanitize(cmd.get("title", ""))
        flavor = sanitize(cmd.get("flavor_text", cmd.get("description", "")))
        bs = cmd.get("battle_stats", {})
        base = cmd.get("base_stats", {})
        pts = cmd.get("points_cost", "?")

        pdf.section_header(f"{ci+1}. {name}")
        if title:
            pdf.italic_text(title)

        # Battle stats table
        stat_headers = ["ATK", "DEF", "HP", "MOV", "RNG", "MOR", "PTS"]
        stat_row = [
            str(bs.get("ATK", "-")),
            str(bs.get("DEF", "-")),
            str(bs.get("HP", "-")),
            str(bs.get("MOV", "-")),
            str(bs.get("RNG", "-")),
            str(bs.get("MOR", "-")),
            str(pts),
        ]
        pdf.add_table(stat_headers, [stat_row], col_widths=[25, 25, 25, 25, 25, 25, 30])

        # Base stats if available
        if base:
            base_parts = []
            for key in ["Command", "Knowledge", "Leadership", "Agility", "Health"]:
                if key in base:
                    base_parts.append(f"{key}: {base[key]}")
            if base_parts:
                pdf.stat_line("Base Stats", " | ".join(base_parts))

        # Flavor text
        if flavor and isinstance(flavor, str) and len(flavor) > 5:
            pdf.set_font("Helvetica", "I", 8)
            pdf.set_text_color(100, 100, 100)
            # Limit length for space
            display_flavor = flavor[:300] + ("..." if len(flavor) > 300 else "")
            pdf.multi_cell(0, 4.5, sanitize(display_flavor))
            pdf.ln(1)

        # Skills summary
        skills = cmd.get("skills", [])
        if skills:
            skill_names = []
            for sk in skills[:8]:
                if isinstance(sk, dict):
                    skill_names.append(sanitize(sk.get("name", "")))
                elif isinstance(sk, str):
                    skill_names.append(sanitize(sk))
            if skill_names:
                pdf.stat_line("Key Skills", ", ".join(filter(None, skill_names)))

        # Evolution paths
        evolution = cmd.get("evolution", cmd.get("evolution_paths", {}))
        if isinstance(evolution, dict):
            paths = []
            for path_name in ["knowledge", "chaos", "hybrid", "Knowledge", "Chaos", "Hybrid"]:
                p = evolution.get(path_name)
                if p:
                    pname = p.get("name", path_name.title())
                    pdesc = p.get("description", "")
                    if pdesc:
                        paths.append(f"{path_name.title()} -> {pname}: {pdesc[:100]}")
            if paths:
                pdf.set_font("Helvetica", "", 7.5)
                pdf.set_text_color(80, 80, 80)
                for p in paths[:3]:
                    pdf.set_x(20)
                    pdf.multi_cell(165, 4, sanitize(p))
                pdf.ln(1)

        pdf.ln(2)

    # ════════════════════════════════════════
    # VII. UNIT ROSTER
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("VII. The Ranks", f"Complete Unit Roster — {len(units)} Units")

    if faction_key == "emberclaw-warpack":
        pdf.italic_text("Every warrior listed below has been forged in the bonding fires. From the rawest Unbonded recruit to the mightiest War Drake, each serves the flame.")
    elif faction_key == "iron-dominion":
        pdf.italic_text("Standardized unit specifications. All measurements calibrated. All performance metrics validated across minimum 200 field engagements.")
    elif faction_key == "nightfang-dominion":
        pdf.italic_text("The ranks of the Dominion — from expendable Thrall meat to the apex predators that lead the hunt. Each serves its purpose in the endless feast.")
    elif faction_key == "thornweft-matriarchy":
        pdf.italic_text("Every warrior, spider, and construct in the Matriarchy's web. Each thread has its place. Each operative serves the grand pattern.")
    elif faction_key == "veilbound-shogunate":
        pdf.italic_text("From the humble Ashigaru to the transcendent Spirit Monolith, each warrior has pierced at least one Veil. Their discipline is their power.")

    # Organize by type
    unit_types = {}
    for u in units:
        utype = u.get("type", "Other")
        if utype not in unit_types:
            unit_types[utype] = []
        unit_types[utype].append(u)

    type_order = ["Infantry", "Cavalry", "Support", "Scout", "Scouts", "Artillery", "Specialist", "Specialists", "War Machine", "War Machines"]
    sorted_types = sorted(unit_types.keys(), key=lambda x: type_order.index(x) if x in type_order else 99)

    for utype in sorted_types:
        units_of_type = unit_types[utype]
        pdf.section_header(f"{utype} ({len(units_of_type)} units)")

        # Build table
        headers = ["Name", "PTS", "ATK", "DEF", "HP", "MOV", "RNG", "MOR", "Specials"]
        rows = []
        for u in sorted(units_of_type, key=lambda x: x.get("points_cost", 0)):
            s = u.get("stats", u.get("battle_stats", {}))
            specials = u.get("specials", u.get("special", []))
            special_str = ""
            if isinstance(specials, list):
                special_names = []
                for sp in specials[:3]:
                    if isinstance(sp, dict):
                        special_names.append(sp.get("name", ""))
                    elif isinstance(sp, str):
                        special_names.append(sp)
                special_str = ", ".join(filter(None, special_names))
            elif isinstance(specials, str):
                special_str = specials[:40]

            rows.append([
                sanitize(u.get("name", "?")[:22]),
                str(u.get("points_cost", "?")),
                str(s.get("ATK", "-")),
                str(s.get("DEF", "-")),
                str(s.get("HP", "-")),
                str(s.get("MOV", "-")),
                str(s.get("RNG", "-")),
                str(s.get("MOR", "-")),
                sanitize(special_str[:35]),
            ])

        pdf.add_table(headers, rows, col_widths=[35, 12, 12, 12, 12, 12, 12, 12, 61])

    # ════════════════════════════════════════
    # VIII. FRAGMENTS
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("VIII. Sacred Artifacts", f"Fragment Catalogue — {len(fragments)} Fragments")

    if faction_key == "emberclaw-warpack":
        pdf.italic_text("Fragment shards forged in dragonfire, each carrying a sliver of the Crimson Tyrant's ancient power. Handle with reverence — and asbestos gloves.")
    elif faction_key == "iron-dominion":
        pdf.italic_text("Catalogued fragments in containment-rated housings. Each has been calibrated for optimal energy throughput. Standard safety protocols: Level 3 containment minimum.")
    elif faction_key == "nightfang-dominion":
        pdf.italic_text("The blood-soaked relics of the Dominion. Each fragment has been fed, each resonates with the Hunger. They are not tools — they are extensions of our appetite.")
    elif faction_key == "thornweft-matriarchy":
        pdf.italic_text("Each fragment has been pre-woven into the Web's destiny matrix. Their activation costs 1 Fate-Thread — a price the Loom Council considers acceptable for the power they yield.")
    elif faction_key == "veilbound-shogunate":
        pdf.italic_text("Sacred relics from beyond the Veil, purified through ritual and discipline. Their activation costs Flow — spiritual energy freely given, never stolen.")

    for fi, frag in enumerate(fragments):
        if pdf.get_y() > 260:
            pdf.add_page()

        name = sanitize(frag.get("name", "Unknown Fragment"))
        effect = sanitize(frag.get("effect", frag.get("description", "")))
        tier = frag.get("tier", frag.get("rarity", ""))
        cost = frag.get("cost", frag.get("activation_cost", ""))
        flavor = sanitize(frag.get("flavor_text", ""))

        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*fdata["dark"])
        pdf.cell(0, 5, sanitize(f"{fi+1}. {name}"), new_x="LMARGIN", new_y="NEXT")

        if tier:
            pdf.stat_line("Tier", str(tier))
        if cost:
            pdf.stat_line("Cost", str(cost))
        if effect and isinstance(effect, str):
            pdf.set_font("Helvetica", "", 8)
            pdf.set_text_color(50, 50, 50)
            pdf.set_x(20)
            pdf.multi_cell(165, 4.5, sanitize(str(effect)[:250]))
        if flavor and isinstance(flavor, str):
            pdf.set_font("Helvetica", "I", 7.5)
            pdf.set_text_color(120, 120, 120)
            pdf.set_x(25)
            pdf.multi_cell(160, 4, sanitize(str(flavor)[:150]))
        pdf.ln(2)

    # ════════════════════════════════════════
    # IX. TACTICAL DOCTRINE
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("IX. Tactical Doctrine", "How We Win")
    pdf.body_text(fdata["tactics_intro"])

    for title, desc in fdata["tactics"]:
        pdf.tactic_block(title, desc)

    # ════════════════════════════════════════
    # X. APPENDIX — QUICK REFERENCE
    # ════════════════════════════════════════
    pdf.add_page()
    pdf.chapter_title("X. Appendix", "Quick Reference & Combat Summary")

    pdf.section_header("Combat Resolution")
    pdf.body_text(
        "Roll ATK dice. Each die >= target's DEF = 1 Hit (1 damage). "
        "Natural 6 = Critical Hit (always hits, deals 2 damage, ignores DEF 7+). "
        "Subtract total damage from target's HP. Unit destroyed at 0 HP."
    )

    pdf.section_header("Combat Modifiers")
    modifiers = [
        ("Flanking", "+1 ATK die"),
        ("Rear Attack", "+2 ATK dice"),
        ("Light Cover", "+1 DEF vs ranged"),
        ("Heavy Cover", "+2 DEF vs ranged"),
        ("Elevated", "+1 ATK die (ranged)"),
        ("Charging (5\"+ straight)", "+1 ATK die (melee)"),
        ("Commander Aura (8\")", "+1 MOR"),
    ]
    pdf.add_table(["Modifier", "Effect"], modifiers, col_widths=[60, 120])

    pdf.section_header("Morale Tests")
    pdf.body_text(
        "When a unit is at half HP or below at the End Phase, roll 2d6. "
        "If the total is <= the unit's MOR stat, they pass. If they fail, "
        "the unit flees and is removed from play. Commander Aura adds +1 MOR "
        "to all units within 8\"."
    )

    pdf.section_header("Army Building")
    army_rules = [
        ("Skirmish", "50-100 pts | 5-20 units | 1 WM max | 30x30\""),
        ("Standard", "200-300 pts | 15-30 units | 3 WM max | 48x48\""),
        ("Epic", "500+ pts | 30-60 units | 6 WM max | 60x72\""),
    ]
    pdf.add_table(["Battle Size", "Rules"], army_rules, col_widths=[40, 140])

    pdf.section_header("Victory Conditions")
    pdf.bullet_list([
        "Annihilation: Destroy the enemy Commander",
        "Objective Control: Control majority of 3 objectives after the final turn",
        "Attrition: Destroy the most enemy points over the full game",
        "King of the Hill: First to 5 VP from controlling the center objective",
    ])

    # Final page — dedication
    pdf.add_page()
    pdf.set_y(100)
    pdf.set_font("Helvetica", "I", 14)
    pdf.set_text_color(*fdata["color"])
    pdf.multi_cell(0, 8, sanitize(fdata["epigraph"]), align="C")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(120, 120, 120)
    pdf.multi_cell(0, 6, sanitize(f"END OF {fname.upper()} CODEX\n\nFor the glory of the {fname}.\nShardborne Universe v2.0"), align="C")

    # ── Save ──
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    safe_filename = faction_key.replace("-", "_")
    output_path = os.path.join(OUTPUT_DIR, f"{safe_filename}_codex.pdf")
    pdf.output(output_path)
    file_size = os.path.getsize(output_path)
    print(f"    -> {output_path} ({file_size:,} bytes, {pdf.page_no()} pages)")
    return output_path


# ═══════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════

def main():
    print("=" * 50)
    print("  SHARDBORNE — Faction Codex PDF Generator")
    print("=" * 50)

    generated = []
    for faction_key in FACTIONS:
        try:
            path = generate_faction_pdf(faction_key)
            generated.append(path)
        except Exception as e:
            print(f"  ERROR generating {faction_key}: {e}")
            import traceback
            traceback.print_exc()

    print(f"\n{'=' * 50}")
    print(f"  Generated {len(generated)} faction codex PDFs")
    print(f"  Output directory: {OUTPUT_DIR}")
    print(f"{'=' * 50}")
    for p in generated:
        print(f"    {os.path.basename(p)}")


if __name__ == "__main__":
    main()
