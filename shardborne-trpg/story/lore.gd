class_name ShardLore
## ShardLore — Canonical lore and world-building for Shardborne campaigns.
## All overarching narrative, faction backstories, and Fhah-Zolg mythology.
## This file is the single source of truth for campaign story consistency.

# ══════════════════════════════════════════════════════════════
# THE CHAOS GOD — FHAH-ZOLG
# ══════════════════════════════════════════════════════════════

const FHAH_ZOLG_TITLE := "The Architect of Ruin"
const FHAH_ZOLG_EPITHET := "He Who Watches the Board"

## The core premise: Fhah-Zolg pulls factions from their home realms into the Shardlands
const OVERARCHING_PREMISE := """In the spaces between worlds, there exists a being older than gods and crueler than time itself. Fhah-Zolg — the Architect of Ruin — does not conquer. He does not destroy. He collects.

From five different realms, he has torn entire civilizations free of their roots and cast them into the Shardlands — a broken plane of reality stitched together from the fragments of dead worlds. Here, the shards of a shattered god litter the battlefield like pieces on a game board.

And that is precisely what they are.

Fhah-Zolg watches from beyond the veil, amused by the wars that erupt as five factions — each ripped from everything they knew — struggle to survive, to conquer, to find meaning in a world that exists solely for his entertainment.

The factions do not know this. Not yet. They believe the Shardlands are a natural catastrophe, a convergence of realities, a test from their own gods. They fight for territory, for resources, for the shards themselves — never suspecting that every battle, every death, every desperate victory is merely another move in a game played by something that has forgotten what mercy means."""

## Fhah-Zolg's voice lines (used in campaign interludes)
const FHAH_ZOLG_WHISPERS := [
	"\"Dance for me. You do it so beautifully when you think no one is watching.\"",
	"\"Another piece moves across my board. How delightful.\"",
	"\"They call it war. I call it art.\"",
	"\"The strongest shard burns brightest — right before it shatters.\"",
	"\"Do they pray to their gods? How charming. Their gods cannot hear them here.\"",
	"\"I did not bring them here to win. I brought them here to struggle.\"",
	"\"Every commander believes they are the hero. That is what makes this so entertaining.\"",
	"\"The Shardlands are not a prison. They are a stage. And I am the only audience that matters.\"",
	"\"Five civilizations. Five ways of war. Five flavors of desperation.\"",
	"\"Let them find the shards. Let them grow strong. The fall is always better from a height.\"",
]

# ══════════════════════════════════════════════════════════════
# THE SHARDLANDS — THE ARENA
# ══════════════════════════════════════════════════════════════

const SHARDLANDS_DESCRIPTION := """The Shardlands stretch endlessly — a patchwork of stolen geography stitched together without logic or mercy. Volcanic ridges from the Emberclaw homelands bleed into the crystalline forests of the Thornweft. Iron Dominion cities stand half-merged with Nightfang crypts. Veilbound temples rise from ground that shifts between realities.

The land itself is unstable. Shardstorms — violent eruptions of raw magical energy — sweep across the terrain without warning, reshaping the battlefield and forcing even the most disciplined armies to adapt or die.

At the center of it all: the Shards. Fragments of a dead god, pulsing with power that every faction covets. Some believe collecting enough shards will open a path home. Others believe the shards are weapons, keys, or prison bars. None of them are entirely wrong."""

# ══════════════════════════════════════════════════════════════
# FACTION ORIGIN STORIES — What each faction lost
# ══════════════════════════════════════════════════════════════

const FACTION_ORIGINS := {
	"emberclaw_warpack": {
		"home_realm": "Ignareth — The Burning Peaks",
		"what_they_lost": "Their volcanic homeland, where drakes nested in rivers of magma and the sky was always red. The Emberclaw were apex predators in Ignareth — unchallenged rulers of a world shaped by fire.",
		"how_they_arrived": "The entire Crimson Caldera — their capital and nesting grounds — was ripped from the earth mid-eruption. Warriors, drakes, hatchlings, and civilians all tumbled into the Shardlands in a cataclysm of fire and confusion.",
		"their_motivation": "Survival first, dominance second. The Emberclaw believe the shards contain enough fire-energy to rebuild Ignareth. They will burn anything that stands between them and home.",
		"tone": "Fierce, proud, desperate. They are predators in a cage, and the cage is making them angrier.",
	},
	"iron_dominion": {
		"home_realm": "Axiomar — The Eternal Machine",
		"what_they_lost": "A continent-spanning clockwork civilization where every citizen was a cog in the Grid — a vast, interconnected network of shared consciousness and mechanical precision. In Axiomar, disorder was the only sin.",
		"how_they_arrived": "The Grid itself cracked. One moment, a billion synchronized minds worked in perfect unity. The next, entire city-sectors phased out of reality and materialized in the Shardlands. The Grid is fragmented now — local networks that can sense each other but cannot reconnect.",
		"their_motivation": "Restore the Grid. The Iron Dominion believes the shards are processing nodes of some greater machine — perhaps the very framework of reality. If they can reassemble enough nodes, they can rebuild the Grid and bring order to chaos.",
		"tone": "Cold, logical, quietly desperate. Every wasted resource is a wound. Every battle without purpose is an error in the equation.",
	},
	"nightfang_dominion": {
		"home_realm": "Nethurra — The Eternal Dusk",
		"what_they_lost": "An empire of endless twilight where the vampire lords ruled from obsidian spires and the mortal population served willingly — or unwillingly — as the foundation of an immortal society. In Nethurra, death was not an ending but a promotion.",
		"how_they_arrived": "The sun rose in Nethurra for the first time in ten thousand years. In the blinding light, the land itself dissolved, and the Nightfang court — lords, thralls, beasts, and all — fell screaming into the Shardlands. They arrived starving.",
		"their_motivation": "The Hunger drives everything. The Nightfang need living populations to feed upon, and the Shardlands offer four other factions full of warm bodies. But deeper than hunger is pride — Lord Sanguinar will not be a refugee. He will be a conqueror.",
		"tone": "Aristocratic, hungry, darkly elegant. They are predators who have been denied their prey, and they are losing patience.",
	},
	"thornweft_matriarchy": {
		"home_realm": "Silthara — The Living Web",
		"what_they_lost": "A world where nature and civilization were one — where cities grew from living silk, where spider-queens wove reality itself into patterns of breathtaking complexity. The Great Web connected every creature, every plant, every thought.",
		"how_they_arrived": "The Great Web was cut. Something — something immensely powerful — severed the core threads that held Silthara together. The Matriarchy's strongest weavers felt reality unravel around them and instinctively wove emergency cocoons, preserving their people as they fell between worlds.",
		"their_motivation": "Rebuild the Web. The Thornweft see the Shardlands as raw material — a broken world begging to be rewoven. They believe they can weave a new Web here, connecting the shards together into a new Silthara. But the other factions keep disrupting the pattern.",
		"tone": "Patient, alien, unsettling. They see the world as threads to be woven, and other factions as tangles to be cut or incorporated.",
	},
	"veilbound_shogunate": {
		"home_realm": "Reishima — The Spirit Kingdoms",
		"what_they_lost": "An archipelago nation where the boundary between the physical and spiritual was thin as rice paper. Every warrior trained to harmonize with ancestral spirits, every blade carried the memories of those who wielded it before. Honor and tradition were not abstract concepts — they were sources of literal power.",
		"how_they_arrived": "The Veil — the barrier between the spirit world and the physical — collapsed entirely. Rather than spirits flooding into the mortal realm, the mortal realm collapsed into the spaces between. The Shogunate's warriors found themselves in the Shardlands with their spirits still whispering, but cut off from the ancestral temples that gave those whispers meaning.",
		"their_motivation": "Restore the Veil and find a path back to Reishima. The Veilbound believe the shards may be fragments of the Veil itself. They collect them with reverence, treating battle as a sacred duty rather than mere warfare. But honor demands they protect the innocent — even the 'innocent' of enemy factions.",
		"tone": "Honorable, spiritual, conflicted. They fight because they must, but every battle without purpose wounds their collective soul.",
	},
}

# ══════════════════════════════════════════════════════════════
# CAMPAIGN THEMES — Per-faction story arcs  
# ══════════════════════════════════════════════════════════════

## Each faction's campaigns follow a progression:
## 1. Arrival & Confusion (tutorial battles)
## 2. First contact with other factions
## 3. Discovery of the shards' true nature
## 4. Rising power and moral choices
## 5. Confrontation with a major threat
## 6. Open-ended resolution (allows cross-campaign connections)

const CAMPAIGN_ARC_STRUCTURE := [
	"Awakening — The commander arrives in the Shardlands. Small battle, basic mechanics.",
	"First Blood — First real engagement with an enemy faction. Faction mechanics introduced.",
	"The Gathering — A larger conflict over a shard. Objectives and terrain matter.",
	"Revelations — A discovery that changes the commander's understanding. Difficulty spike.",
	"The Storm — A major battle that tests everything learned. High stakes.",
	"Reckoning — The final battle. Hardest fight, open ending that connects to other campaigns.",
]

# ══════════════════════════════════════════════════════════════
# INTER-CAMPAIGN CONNECTIONS
# ══════════════════════════════════════════════════════════════

## Commanders that can appear as allies/cameos in other campaigns
## Format: commander_name → possible_roles
const CROSSOVER_COMMANDERS := {
	"Scorchcaller Vex": ["rival", "reluctant_ally"],
	"Lord Calculon": ["information_broker", "temporary_ally"],
	"Lord Sanguinar": ["antagonist", "dark_ally"],
	"Loom-Mother Vethiss": ["mysterious_guide", "rival"],
	"The Shrouded Shogun": ["honor_bound_ally", "antagonist"],
}

# ══════════════════════════════════════════════════════════════
# DIALOGUE HELPERS
# ══════════════════════════════════════════════════════════════

## Standard dialogue entry format used across all campaigns
## speaker: Character name (or "NARRATOR", "FHAH-ZOLG")
## text: The dialogue line
## mood: Optional emotional context (for future portrait expressions)
static func dialogue(speaker: String, text: String, mood: String = "neutral") -> Dictionary:
	return {"speaker": speaker, "text": text, "mood": mood}

static func narration(text: String) -> Dictionary:
	return {"speaker": "NARRATOR", "text": text, "mood": "neutral"}

static func fhah_zolg(text: String) -> Dictionary:
	return {"speaker": "FHAH-ZOLG", "text": text, "mood": "amused"}
