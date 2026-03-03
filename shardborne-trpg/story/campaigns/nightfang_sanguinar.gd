class_name NightfangSanguinarCampaign
## Lord Sanguinar — "The Eternal Hunger"
## The first Nightfang Dominion campaign. Teaches terror tactics, Hunger management,
## corruption spreading, and Blood Drain sustain through 6 escalating battles.
##
## Story: Lord Sanguinar and his court awaken in the Shardlands — starving.
## The sun that burned Nethurra is gone, but so is everything else. The Blood
## Patriarch must feed his people, establish dominion, and discover what dared
## to cage the apex predator of the Eternal Dusk.
##
## Note: Mission 3 depicts the same battle as Emberclaw Vex's Mission 5
## ("Hunger in the Dark") — from Sanguinar's perspective.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_sanguinar",
		"commander": "Lord Sanguinar",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Eternal Hunger",
		"description": "Lord Sanguinar's court awakens in the Shardlands — starving, fractured, and caged in an alien world. The Blood Patriarch has ruled for ten thousand years. He will not be prey.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

# ══════════════════════════════════════════════════════════════
# OPENING STORY — Shown when player first starts the campaign
# ══════════════════════════════════════════════════════════════

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Hunger."),
		ShardLore.narration("Not the polite, manageable appetite of a lord at court. Not the elegant thirst sated by a crystal goblet of warmed vitae. This was the Hunger — the deep one, the ancient one, the kind that turned even immortals into beasts."),
		ShardLore.dialogue("Lord Sanguinar", "...Where is the dusk?", "disoriented"),
		ShardLore.narration("Lord Sanguinar opened eyes that had not known confusion in ten thousand years. Above him was a sky of fractured grey — not the eternal twilight of Nethurra, not the burning sun that had torn his world apart. Something else entirely. Something wrong."),
		ShardLore.narration("Around him, his court lay scattered like broken dolls — lords, thralls, beasts, and all the elegant machinery of an immortal civilization, cast across alien stone like refuse."),
		ShardLore.dialogue("Lord Sanguinar", "Countess.", "commanding"),
		ShardLore.dialogue("Countess Nyxara", "My lord. I... the sun. I remember the sun rising in Nethurra. The pain. The screaming. And then—", "shaken"),
		ShardLore.dialogue("Lord Sanguinar", "And then this. Yes. I remember as well. The question is not what happened — it is what we do about it.", "cold"),
		ShardLore.narration("He rose. His body — ageless, powerful, sustained by ten millennia of blood magic — responded with familiar grace. But beneath the control, beneath the aristocratic composure, the Hunger coiled like a serpent."),
		ShardLore.dialogue("Lord Sanguinar", "Status of the court.", "demanding"),
		ShardLore.dialogue("Countess Nyxara", "Fractured. Perhaps two hundred survivors within sight. The thralls are panicking. The tigers are... agitated. And my lord — we are all starving. There is no blood here. No livestock. No population to draw from.", "grim"),
		ShardLore.narration("No population. For the Nightfang Dominion — a civilization built on the blood tithe of mortal subjects — those two words were a death sentence."),
		ShardLore.dialogue("Lord Sanguinar", "Then we will find one. I did not survive ten thousand years of Nethurra's politics, three civil wars, and the death of the sun itself to starve in some forgotten ruin. Gather the court. Arm the thralls. Wake the tigers.", "iron_will"),
		ShardLore.narration("He paused, nostrils flaring. On the wind — distant, faint, but unmistakable — the scent of living blood."),
		ShardLore.dialogue("Lord Sanguinar", "Something is alive out there. Something warm. Something... that does not know we are here yet.", "predatory"),
		ShardLore.narration("For the first time since the fall, Lord Sanguinar smiled. It was not a pleasant smile."),
		ShardLore.fhah_zolg("Ah, the Blood Patriarch. The oldest piece on my board. The most dangerous. And the most... predictable. Predators always hunt. It's what makes them so easy to direct."),
	]

# ══════════════════════════════════════════════════════════════
# MISSIONS — 6 escalating battles
# ══════════════════════════════════════════════════════════════

static func _missions() -> Array:
	return [
		_mission_1_the_awakening_hunger(),
		_mission_2_cold_iron(),
		_mission_3_the_great_hunt(),
		_mission_4_the_honourable_dead(),
		_mission_5_silk_and_blood(),
		_mission_6_the_eternal_hunger(),
	]

# ────────────────────────────────────────────────────────
# MISSION 1: The Awakening Hunger
# Tutorial: Basic combat, Blood Drain, corruption mechanics
# ────────────────────────────────────────────────────────

static func _mission_1_the_awakening_hunger() -> Dictionary:
	return {
		"title": "The Awakening Hunger",
		"objectives_text": "Destroy all enemy units. Feed the Hunger — your warriors need blood to survive.",
		"pre_story": [
			ShardLore.narration("The scent led them southeast, across a landscape of volcanic glass and shattered crystal. Sanguinar's thralls — barely coherent with hunger — stumbled forward on instinct alone. The court's finest warriors were little better. Ten thousand years of civilized feeding habits, and now they were reduced to hunting."),
			ShardLore.dialogue("Lord Sanguinar", "Nyxara. What are those?", "curious"),
			ShardLore.narration("On the horizon, figures moved — squat, muscular, wreathed in an orange glow that made the air shimmer. They carried weapons that smoked with heat, and their skin was the dark red of cooling magma."),
			ShardLore.dialogue("Countess Nyxara", "Unknown species. Reptilian traits. Thermal aetheric signature — they appear to generate heat from their own biology. And my lord... they are alive. Very alive.", "hungry"),
			ShardLore.dialogue("Lord Sanguinar", "Then tonight, my court dines. These creatures will learn the same lesson every species in Nethurra learned before them: the Nightfang Dominion does not ask permission to feed.", "regal"),
			ShardLore.narration("He drew his blade — an ancient thing, black as the space between stars, its edge singing with blood magic."),
			ShardLore.dialogue("Lord Sanguinar", "Thralls forward. Blood Thralls on the flanks. And remember — we do not waste. Every drop counts.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The fire-blooded creatures fought bravely — with more fury than skill, more heat than discipline. They died well. And their blood... their blood was extraordinary."),
			ShardLore.dialogue("Lord Sanguinar", "Fascinating. Their vitae carries thermal aetheric energy. It burns going down, but the potency is... remarkable. One of these warriors feeds as well as ten Nethurran mortals.", "pleased"),
			ShardLore.dialogue("Countess Nyxara", "The thralls are already recovering, my lord. The hunger is — not sated, never sated — but dulled. For now.", "relieved"),
			ShardLore.narration("Sanguinar knelt beside one of the fallen warriors and examined its equipment. Crude but effective. These were soldiers, not animals. A civilization. A martial culture."),
			ShardLore.dialogue("Lord Sanguinar", "There will be more. This was a scouting party — which means there is an army somewhere nearby. Good. An army means a population. And a population means a sustainable food supply. The Nightfang Dominion is many things, Nyxara, but wasteful is not among them. We will not exterminate these creatures. We will farm them.", "calculating"),
			ShardLore.narration("He looked out across the alien landscape and, for a brief moment, something almost like wonder crossed his ancient face."),
			ShardLore.dialogue("Lord Sanguinar", "...Five different scents on the wind. Five species. Five flavors. Perhaps this prison is not entirely without amenities.", "darkly_amused"),
		],
		"defeat_story": [
			ShardLore.narration("The fire-blooded warriors proved more dangerous than anticipated. Weakened by hunger, the Nightfang assault faltered."),
			ShardLore.dialogue("Lord Sanguinar", "Unacceptable. We are starving, not defeated. Withdraw, regroup, and let the hunger sharpen us rather than weaken us. We are predators. We do not fail hunts — we learn from them.", "coldly_furious"),
		],
		"player_army": [
			"Lord Sanguinar",
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Blood Thralls",
		],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": [
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"The Nightfang Dominion feeds on death. Your units can drain blood from defeated enemies.",
			"Thrall Conscripts are expendable — use them to absorb enemy charges.",
			"Lord Sanguinar is your most powerful unit. Don't let him get surrounded early.",
			"Corruption weakens enemies over time. Spread it and let it do the work.",
		],
		"battle_modifiers": {
			"label": "Starving Court",
			"description": "The Hunger weakens your warriors. All Nightfang units -1 DEF from starvation.",
			"player_def_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 2: Cold Iron
# Tutorial: Terror tactics, morale warfare, fighting machines
# ────────────────────────────────────────────────────────

static func _mission_2_cold_iron() -> Dictionary:
	return {
		"title": "Cold Iron",
		"objectives_text": "Destroy the Iron Dominion patrol. Beware — machines resist corruption and do not fear the dark.",
		"pre_story": [
			ShardLore.narration("Three nights after the first feast, Sanguinar's scouts reported a new faction — one that marched in rigid formations, communicated through invisible signals, and smelled of oil and heated metal rather than blood."),
			ShardLore.dialogue("Countess Nyxara", "My lord, the shadowstalkers report something... unusual. These soldiers are not entirely organic. Metal and flesh merged — gears where joints should be, steam where breath should be.", "intrigued"),
			ShardLore.dialogue("Lord Sanguinar", "Half-machine soldiers. I have read about such things in the oldest Nethurran archives — civilizations that replace their mortality with clockwork. A novel approach to the problem of death. Less elegant than ours.", "dismissive"),
			ShardLore.dialogue("Countess Nyxara", "There is a concern, my lord. The thralls who attempted to drain one of their scouts... they reported the blood was wrong. Thin. Oily. It barely fed the Hunger.", "worried"),
			ShardLore.narration("Sanguinar's expression darkened."),
			ShardLore.dialogue("Lord Sanguinar", "Machines that resist the blood drain. Soldiers that do not know fear. An army that communicates faster than sound. This is a more interesting prey than the fire-folk.", "thoughtful"),
			ShardLore.narration("He looked at the Iron Dominion patrol through the twilight — clicking, whirring, maddeningly precise."),
			ShardLore.dialogue("Lord Sanguinar", "But in ten thousand years, I have never encountered prey I could not take. Nyxara — terror protocols. If their blood is thin, their morale may be thinner. Let us find out what these machines fear when the shadows come alive.", "predatory"),
		],
		"post_story": [
			ShardLore.narration("The Iron Dominion patrol was destroyed, but not consumed. Their blood — more aetheric fluid than vitae — left the Hunger unsatisfied. Sanguinar stood over a fallen soldier and studied the intricate clockwork of its internals with a surgeon's eye."),
			ShardLore.dialogue("Lord Sanguinar", "Unsatisfying as food. But as adversaries? Remarkable. Their formation-based defense required three separate flanking maneuvers to crack. They adapt to terror — absorbing it, analyzing it, developing countermeasures even during the battle.", "impressed"),
			ShardLore.dialogue("Countess Nyxara", "They are difficult to frighten. Their... Grid, the scouts call it... shares courage as well as information. Break the Grid, and they crumble. But intact? They fight as one mind.", "analytical"),
			ShardLore.dialogue("Lord Sanguinar", "One mind operating through many bodies. Sound familiar, Nyxara?", "pointed"),
			ShardLore.narration("She nodded slowly. The Nightfang court — lord and thrall, vampire and beast — was itself a hierarchy of shared blood, shared hunger, shared will. Two different empires, built on two different forms of connection. The parallel was uncomfortable."),
			ShardLore.dialogue("Lord Sanguinar", "These 'Iron Dominion' are not prey — not useful prey, at any rate. They are competitors. File them as threats, priority two. The fire-folk remain priority one. Their blood is too exquisite to waste on petty skirmishes.", "strategic"),
		],
		"defeat_story": [
			ShardLore.narration("The clockwork soldiers held formation with inhuman discipline. Every terror tactic shattered against their Grid-linked resolve."),
			ShardLore.dialogue("Lord Sanguinar", "Cold iron and colder minds. These machines do not break as flesh does. We require a different approach — isolation. Sever the Grid, and they become merely mortal. Withdraw.", "calculating"),
		],
		"player_army": [
			"Lord Sanguinar",
			"Thrall Conscripts",
			"Blood Reavers",
			"Blood Reavers",
			"Shadow Stalkers",
			"Blood Shamans",
		],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": [
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Scouts/Recon",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"The Iron Dominion resist terror — their Grid shares morale across the formation.",
			"Focus fire to eliminate isolated units. The Grid weakens when units are destroyed.",
			"Shadow Stalkers can scout ahead — use them to spot enemy positions before engaging.",
			"Blood Shamans heal your warriors. Keep them behind your front line.",
		],
		"battle_modifiers": {
			"label": "Cold Iron",
			"description": "Machine blood doesn't feed the Hunger. Your units gain no HP from Blood Drain this battle.",
			"player_atk_bonus": 0,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 3: The Great Hunt
# Tutorial: Offensive objectives, combined arms assault
# Cross-campaign: This is Vex's Mission 5 from Sanguinar's perspective
# ────────────────────────────────────────────────────────

static func _mission_3_the_great_hunt() -> Dictionary:
	return {
		"title": "The Great Hunt",
		"objectives_text": "Seize the Emberclaw supply line. Cut their logistics and claim their provisions — your court needs to feed.",
		"pre_story": [
			ShardLore.narration("The Emberclaw called themselves a warpack. Sanguinar called them a larder."),
			ShardLore.narration("For six nights, his scouts had tracked the fire-folk's commander — a fierce creature called Scorchcaller Vex — and mapped her warband's movements. They had supply lines. Camp positions. Patrol routes. Everything a proper hunt required."),
			ShardLore.dialogue("Lord Sanguinar", "The fire-queen is bold but predictable. She leads from the front, exposes her flanks, and relies on fury over tactics. In Nethurra, she would have been dead inside a decade.", "contemptuous"),
			ShardLore.dialogue("Countess Nyxara", "She has strength, my lord. And passion. The thralls who faced her scouts speak of fire that burns not just flesh, but will. She is... dangerous.", "cautious"),
			ShardLore.dialogue("Lord Sanguinar", "Dangerous makes the blood taste better. Tonight, we strike her supply line. Not to destroy her — not yet. To feed. To remind her what it means to share this world with the Nightfang. And Nyxara?", "predatory"),
			ShardLore.dialogue("Countess Nyxara", "My lord?", "attentive"),
			ShardLore.dialogue("Lord Sanguinar", "I want her to know it was us. I want her to fear the dusk. Fear is a flavor, and I have not tasted it in far too long.", "darkly_pleased"),
			ShardLore.narration("In the distance, Emberclaw campfires burned like terrestrial stars. They would not burn for long."),
		],
		"post_story": [
			ShardLore.narration("The supply line collapsed like a severed artery. Sanguinar's forces swept through with surgical precision — taking what they needed, destroying what they didn't, and leaving enough survivors to carry the terror home."),
			ShardLore.dialogue("Lord Sanguinar", "The fire-queen will be furious. Good. Anger makes prey careless, and careless prey is easy to catch.", "satisfied"),
			ShardLore.narration("But the hunt had revealed something unexpected. Among the Emberclaw's supplies, Sanguinar's blood shamans found shard fragments — warm, pulsing, humming with an energy that was neither heat nor blood but something more fundamental."),
			ShardLore.dialogue("Countess Nyxara", "My lord — these shards react to blood magic. When I channeled through one, the Hunger... quieted. For a moment, I felt almost... sated. As if the shard itself was food for something deeper than the body.", "awed"),
			ShardLore.dialogue("Lord Sanguinar", "A substance that feeds the Hunger without blood. In ten thousand years, I have never encountered such a thing.", "intrigued"),
			ShardLore.narration("He held a shard to the light. In its facets, he saw reflections that were not his own — glimpses of other places, other wars, other pieces on a board he was only beginning to perceive."),
			ShardLore.dialogue("Lord Sanguinar", "We are not the only predators here, Nyxara. Something greater has set this stage. The fire-folk, the machines, us — we are all performers in someone else's entertainment. The question is: who is the audience?", "dangerous"),
			ShardLore.fhah_zolg("He smells it. Of all my pieces, the old predator has the keenest instincts. He cannot see me, not yet, but he can feel the hand that moves him. Delicious. Terrifying. Exactly as planned."),
		],
		"defeat_story": [
			ShardLore.narration("The Emberclaw fought with the fury of cornered animals. Their fire scorched the shadows, drove back the thralls, and held the supply line against every assault."),
			ShardLore.dialogue("Lord Sanguinar", "The fire-queen has teeth. I respect that — even as I plan to extract them. Withdraw. We do not waste the Hunger on failed hunts. We learn, we adapt, and we return stronger.", "cold_admiration"),
			ShardLore.dialogue("Countess Nyxara", "Shall I prepare another approach, my lord?", "dutiful"),
			ShardLore.dialogue("Lord Sanguinar", "The same approach, perfected. A predator does not invent new jaws. It simply bites harder.", "resolute"),
		],
		"player_army": [
			"Lord Sanguinar",
			"Thrall Conscripts",
			"Blood Reavers",
			"Nightfang Warriors",
			"Fang Guard",
			"Tiger Berserkers",
			"Blood Shamans",
			"Blood Mortar Team",
		],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Pyromancer Adepts",
			"Emberknight Riders",
		],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": [
			"Supply Lines: seize both corridor endpoints to cut the enemy's logistics chain.",
			"Use Thrall Conscripts to absorb the Emberclaw's initial charge while your elites flank.",
			"Tiger Berserkers hit hard but die fast — time their charge for maximum impact.",
			"Blood Mortar Team can soften distant targets. Position them where they have line of sight.",
		],
		"battle_modifiers": {
			"label": "Night Assault",
			"description": "You strike at dusk. Enemy ranged units suffer -1 ATK in the fading light.",
			"enemy_atk_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 4: The Honourable Dead
# Tutorial: Fighting a defensive enemy, adapting to corruption-resistant foes
# First use of "broken_ground" scenario
# ────────────────────────────────────────────────────────

static func _mission_4_the_honourable_dead() -> Dictionary:
	return {
		"title": "The Honourable Dead",
		"objectives_text": "Overcome the Veilbound defensive positions across the broken terrain. Their spirit wards resist your corruption — adapt or perish.",
		"pre_story": [
			ShardLore.narration("The fourth faction was different."),
			ShardLore.narration("Where the fire-folk burned and the machines calculated, these warriors — lean, disciplined, draped in flowing silk and carrying blades that hummed with spiritual energy — simply stood. And waited. With a patience that made even Sanguinar uncomfortable."),
			ShardLore.dialogue("Countess Nyxara", "They call themselves the Veilbound Shogunate. Their scouts did not flee when ours approached. They bowed. My lord — they bowed and offered to negotiate.", "bewildered"),
			ShardLore.dialogue("Lord Sanguinar", "Negotiate? With the Nightfang?", "amused"),
			ShardLore.dialogue("Countess Nyxara", "They spoke of honor. Of the sanctity of combat. Of something called the Veil and the spirits that dwell beyond it. They invited you, personally, to a formal parley.", "hesitant"),
			ShardLore.narration("Sanguinar considered this for approximately three seconds."),
			ShardLore.dialogue("Lord Sanguinar", "How... quaint. In ten thousand years, I have been feared, worshipped, obeyed, and occasionally defied. But invited to tea? That is a new one.", "dryly_amused"),
			ShardLore.narration("He looked out at the Veilbound positions — shrine markers, spirit wards, and warriors in perfect formation across a field of shattered terrain. Their aetheric signatures were strange — not blood, not fire, not machine, but something ethereal. Ghost-like."),
			ShardLore.dialogue("Lord Sanguinar", "Their spirits ward against corruption. Interesting. Every other faction's defenses have had seams — cracks the darkness could exploit. These... do not. Or at least, the cracks are not where I expect them.", "analytical"),
			ShardLore.narration("He drew his blade."),
			ShardLore.dialogue("Lord Sanguinar", "Decline the parley. We are Nightfang. We do not negotiate with the living — we renegotiate the terms of their existence. Let us see if their honor bleeds.", "cold"),
		],
		"post_story": [
			ShardLore.narration("Victory, but not the kind Sanguinar was accustomed to. The Veilbound did not break. They did not flee. They fought with a calm, implacable discipline that reminded him unsettlingly of... himself."),
			ShardLore.dialogue("Lord Sanguinar", "Curious. They knew they were losing and not one of them panicked. Not one fled. They simply... adjusted. Repositioned. Died without complaint when the geometry required it.", "disturbed"),
			ShardLore.dialogue("Countess Nyxara", "Their commander — Hoshimaru, the prisoners called him — walked into the final melee personally. He challenged our Blood Champion to single combat and... held him. For nine minutes. A mortal. Holding a vampire in single combat for nine minutes.", "impressed"),
			ShardLore.dialogue("Lord Sanguinar", "What happened to Hoshimaru?", "quiet"),
			ShardLore.dialogue("Countess Nyxara", "He fell. But he wounded the Champion badly before he did. And before he died, he said something odd: 'Tell your lord that the spirits know his name. They have been expecting him.'", "unsettled"),
			ShardLore.narration("Sanguinar stood very still for a moment. In ten thousand years, very few things had given him pause. 'The spirits have been expecting him' was one of them."),
			ShardLore.dialogue("Lord Sanguinar", "The other factions were prey. These Veilbound are something else entirely. They fight as if death is not an ending but a... transition. And their spirits — Nyxara, their spirits see through our shadow magic as if it were glass. That should not be possible.", "troubled"),
			ShardLore.narration("He looked at the shard fragments recovered from the battlefield. Each one, when touched by blood magic, resonated with the same ghostly frequency as the Veilbound's spirit wards. As if the shards and the spirits were made of the same substance."),
			ShardLore.dialogue("Lord Sanguinar", "Five factions. Five methods of power. Fire, iron, blood, silk, spirit. All drawn to the same broken world. All fighting over the same shards. This is not a war — it is an experiment.", "revelation"),
		],
		"defeat_story": [
			ShardLore.narration("The spirit wards held. The Veilbound's discipline was absolute — an impenetrable wall of honor and steel that corruption could not erode and terror could not shake."),
			ShardLore.dialogue("Lord Sanguinar", "Their spirits burn where our shadows touch. How inconvenient. We require a different doctrine — one that does not rely on fear. When the prey is not afraid, you must simply be stronger.", "measured"),
		],
		"player_army": [
			"Lord Sanguinar",
			"Blood Reavers",
			"Nightfang Warriors",
			"Tiger Berserkers",
			"Shadow Claw Infantry",
			"Nightstalker Cavalry",
			"Blood Shamans",
			"Plague Catapult Crew",
			"Blood Champion",
		],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": [
			"Elite Cmdr Hoshimaru",
			"Shrine Wardens",
			"Veiled Ashigaru",
			"Temple Defenders",
			"Starblade Samurai",
			"Moonlit Duelists",
			"Dreampiercer Archers",
		],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": [
			"Broken Ground: the terrain is shattered and unstable. Movement is restricted between zones.",
			"The Veilbound's spirit wards resist corruption — brute force may work better than your usual tactics.",
			"Nightstalker Cavalry can navigate broken terrain better than infantry. Use them to flank.",
			"Target their Dreampiercer Archers early — their phase arrows ignore obstacles.",
		],
		"battle_modifiers": {
			"label": "Spirit Wards",
			"description": "Veilbound spirit wards dampen corruption. Enemy units gain +1 MOR.",
			"enemy_mor_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 5: Silk and Blood
# Tutorial: Fighting in a Shardstorm, adapting to chaos
# First use of "shardstorm" scenario
# ────────────────────────────────────────────────────────

static func _mission_5_silk_and_blood() -> Dictionary:
	return {
		"title": "Silk and Blood",
		"objectives_text": "Survive the Shardstorm and defeat the Thornweft forces. The storm reshapes the battlefield — adapt or be consumed.",
		"pre_story": [
			ShardLore.narration("The sky cracked."),
			ShardLore.narration("Not thunder — something deeper, older, more violent. The very fabric of the Shardlands tore open and raw shard energy poured through like light through a wound, reshaping terrain, scrambling aetheric signals, and turning the battlefield into a kaleidoscope of chaos."),
			ShardLore.dialogue("Lord Sanguinar", "Shardstorm. How dramatic.", "unimpressed"),
			ShardLore.dialogue("Countess Nyxara", "My lord, the storm is disrupting our shadow magic. The thralls cannot maintain cohesion. And there is something moving in the storm — something large, with too many legs.", "alarmed"),
			ShardLore.narration("From the churning shard-light emerged the Thornweft Matriarchy — spider-queens and their silk-wrapped armies, moving with an organic coordination that was at once beautiful and profoundly alien. At their head, a figure that radiated intelligence like a web radiates geometry."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Lord Sanguinar. I have been weaving your fate-thread since you arrived. Do you know what it looks like?", "serene"),
			ShardLore.dialogue("Lord Sanguinar", "Enlighten me, spider.", "dangerous"),
			ShardLore.dialogue("Loom-Mother Vethiss", "A knot. A tight, ancient, stubborn knot that refuses to be unwoven. I have never seen a thread so resilient — or so tangled. You fascinate me, Blood Lord. And things that fascinate me, I collect.", "amused"),
			ShardLore.dialogue("Lord Sanguinar", "You are welcome to try, Loom-Mother. But in ten thousand years, many have attempted to collect me. They are all dead now, and I have an excellent memory for those who annoyed me.", "lethal"),
			ShardLore.narration("The shardstorm howled between them, reshaping the ground with every pulse. Two predator civilizations — one of blood, one of silk — faced each other in the eye of chaos."),
			ShardLore.dialogue("Lord Sanguinar", "All units — advance through the storm. The spider wants a thread? She will find a noose.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The Thornweft retreated into the storm, their silk lines dissolving as the shardstorm's energy overwhelmed even their weaving. Sanguinar stood victorious on churning ground, surrounded by the wreckage of spider constructs and torn webbing."),
			ShardLore.narration("But it did not feel like victory. Vethiss had fought with a patience that bordered on indifference — as if the battle itself was secondary to something she was observing. Something she was learning."),
			ShardLore.dialogue("Lord Sanguinar", "She was studying me. The entire battle — she was not trying to win. She was gathering data. Weaving my pattern into her web so she could predict me later.", "cold_fury"),
			ShardLore.dialogue("Countess Nyxara", "What do we do about it, my lord?", "concerned"),
			ShardLore.dialogue("Lord Sanguinar", "Nothing, for now. A predator that studies its prey is merely a patient predator. And I have more patience than any spider ever woven.", "controlled"),
			ShardLore.narration("The shardstorm began to subside, and in its wake, a chilling clarity. Sanguinar could see far across the Shardlands — further than ever before. And everywhere he looked, he saw evidence of design. The terrain wasn't random. The factions weren't random. Even the storms weren't random."),
			ShardLore.dialogue("Lord Sanguinar", "Nyxara. In all the legends of Nethurra — the oldest ones, from before even my time — is there any tale of a god who collects civilizations the way a child collects insects?", "quiet"),
			ShardLore.dialogue("Countess Nyxara", "...There are whispers, my lord. The Blood Prophets spoke of the Architect — a being who builds worlds from the wreckage of other worlds. We dismissed it as mythology.", "uneasy"),
			ShardLore.dialogue("Lord Sanguinar", "Mythology has a troubling tendency to be true when you least want it to be.", "grim"),
		],
		"defeat_story": [
			ShardLore.narration("The shardstorm and the Thornweft proved a lethal combination. Vethiss's webs channeled the storm's energy directly into the Nightfang lines, turning raw chaos into directed destruction."),
			ShardLore.dialogue("Lord Sanguinar", "She uses the storm. She weaves the very chaos into a weapon. Impressive. I hate it. Retreat to stable ground — we regroup when the storm passes.", "grudging"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Run along, Blood Lord. The Web will be here when you return. The Web is always here.", "patient"),
		],
		"player_army": [
			"Lord Sanguinar",
			"Nightfang Warriors",
			"Tiger Berserkers",
			"Bloodsworn Templars",
			"Tiger Fang Elite",
			"Nightstalker Cavalry",
			"Blood Shamans",
			"Corruption Spreaders",
			"Plague Catapult Crew",
			"Blood Champion",
		],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": [
			"Loom-Mother Vethiss",
			"Spiderling Swarm",
			"Spiderling Swarm",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Fate-Thread Weavers",
			"Silk Colossus",
		],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": [
			"Shardstorm: the battlefield shifts each round! Terrain may change, units may be displaced.",
			"Spread your forces to avoid being caught in a single storm pulse.",
			"Tiger Fang Elite are your shock troops — time their charge between storm pulses.",
			"The Silk Colossus is dangerous — focus fire from range before it reaches your line.",
		],
		"battle_modifiers": {
			"label": "Shardstorm Fury",
			"description": "The storm disrupts all magic. Both sides suffer -1 ATK from aetheric interference.",
			"player_atk_bonus": -1,
			"enemy_atk_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 6: The Eternal Hunger
# Final battle — hardest fight, the apex predator confronts the cage
# ────────────────────────────────────────────────────────

static func _mission_6_the_eternal_hunger() -> Dictionary:
	return {
		"title": "The Eternal Hunger",
		"objectives_text": "Seize the Shard Nexus from the Veilbound Shogunate. The truth awaits at the heart of the convergence.",
		"pre_story": [
			ShardLore.narration("Lord Sanguinar stood at the edge of the Shard Nexus and felt something he had not felt in ten thousand years: awe."),
			ShardLore.narration("The convergence was immense — pillars of crystallized shard energy rising from the earth like the ribs of a dead god, each one pulsing with a light that was neither warm nor cold but fundamentally alive. The Hunger recoiled from it and craved it simultaneously, as if even the curse that sustained the Nightfang recognized something older and more powerful than itself."),
			ShardLore.dialogue("Lord Sanguinar", "This is it. The center of the board. Every shard we have collected, every battle we have fought — it all leads here.", "grave"),
			ShardLore.dialogue("Countess Nyxara", "My lord, the Veilbound have established positions throughout the nexus. And their commander is not one of the subordinates we faced before. This is their supreme leader — they call him the Shrouded Shogun.", "warning"),
			ShardLore.narration("Sanguinar looked across the convergence field. The Veilbound stood in perfect formation around the central pillars — shrine wards active, spiritual energy crackling through their ranks. And at their center, a figure that seemed to exist partially outside of reality — a warrior wrapped in layers of shadow and light, carrying a blade that hummed with ancestral resonance."),
			ShardLore.dialogue("Lord Sanguinar", "The Shrouded Shogun. I have heard the whispers. A commander who fights with the weight of a thousand generations behind every blow. A warrior-poet who considers war a sacred ritual.", "measuring"),
			ShardLore.narration("He drew his own blade — the Fang of Nethurra, black as the void between stars, ancient as the dusk itself."),
			ShardLore.dialogue("Lord Sanguinar", "Let me tell you something, Nyxara. In ten thousand years, I have ruled an empire, survived three civil wars, outlasted the death of my own sun, and been cast into this broken cage by a god I have not yet met. I have been patient. I have been strategic. I have been restrained.", "building"),
			ShardLore.narration("His eyes blazed crimson."),
			ShardLore.dialogue("Lord Sanguinar", "I am done being restrained. Tonight, the Nightfang Dominion takes the convergence. Not with terror, not with corruption, not with the subtle arts of the old court. With raw, overwhelming, unrelenting force. Let the Shogun bring his spirits. Let the god behind the curtain watch. I am Lord Sanguinar. I have been hungry since the beginning of time. And tonight — I feed.", "battle_fury"),
		],
		"post_story": [
			ShardLore.narration("The Shrouded Shogun fell as he fought — without retreat, without surrender, with the quiet dignity of a warrior who had always known this was how it would end. Sanguinar, bloodied and breathing hard for the first time in centuries, watched the Veilbound commander collapse among the shards."),
			ShardLore.dialogue("Lord Sanguinar", "You fought well, Shogun. In Nethurra, I would have offered you immortality. Here... I can only offer respect. It is a lesser currency, but it is all this broken world has left.", "solemn"),
			ShardLore.narration("And then the shards activated."),
			ShardLore.narration("Every pillar in the convergence blazed to life simultaneously, flooding the battlefield with white-gold light. The Hunger screamed inside Sanguinar — not from pain but from recognition. This energy. This ancient, impossible, familiar energy."),
			ShardLore.dialogue("Lord Sanguinar", "...This is blood. Not mortal blood, not aetheric blood — divine blood. The shards are the blood of a dead god. And I — I have been drinking from his veins this entire time.", "horrified_wonder"),
			ShardLore.narration("The vision came. Not gradually, but all at once — a face made of nothing and everything, vast as the space between worlds, old as the concept of hunger itself."),
			ShardLore.fhah_zolg("Lord Sanguinar. The oldest piece on my board. The most patient predator in five civilizations. Tell me — do you know what you look like from up here?"),
			ShardLore.dialogue("Lord Sanguinar", "Show me.", "defiant"),
			ShardLore.fhah_zolg("A rat in a cage. A magnificent, ancient, terrifying rat — but a rat nonetheless. You hunt because I let you hunt. You feed because I let you feed. You think you are the predator? You are the experiment. And you have been performing beautifully."),
			ShardLore.narration("Silence. Lord Sanguinar stood in the light of a dead god's blood and faced the truth with the composure of a lord who had faced worse truths before. But his hands were shaking. His ancient, immortal hands were shaking."),
			ShardLore.dialogue("Lord Sanguinar", "...A cage.", "whisper"),
			ShardLore.narration("Then the shaking stopped. And when Lord Sanguinar spoke again, his voice was the cold, absolute certainty of a predator who has found something to hunt that is actually worth the effort."),
			ShardLore.dialogue("Lord Sanguinar", "You made one mistake, Architect. One small, fatal mistake that your arrogance prevents you from seeing.", "quiet_menace"),
			ShardLore.fhah_zolg("Oh? And what is that?"),
			ShardLore.dialogue("Lord Sanguinar", "You locked five apex predators in the same cage. Five civilizations that were the dominant species in their respective worlds. Five flavors of violence, ambition, and survival instinct — all compressed into a single arena with nowhere to go but through each other.", "cold"),
			ShardLore.narration("He raised the Fang of Nethurra."),
			ShardLore.dialogue("Lord Sanguinar", "In ten thousand years, I have learned one absolute truth: a predator in a cage does not become prey. It becomes more dangerous. And a cage full of predators? That is not a prison, Fhah-Zolg. That is a crucible. You have not trapped us. You have forged us.", "triumphant"),
			ShardLore.narration("The vision wavered. For the first time in an eternity, the Architect's smile flickered."),
			ShardLore.fhah_zolg("...Interesting. You are not afraid. Not even a little."),
			ShardLore.dialogue("Lord Sanguinar", "I am the thing that other things are afraid of. You want a game? Then play. But understand this — I have played games for longer than your shards have been broken. And I have never, in ten thousand years, lost a game I intended to win.", "promise"),
			ShardLore.narration("The vision collapsed. The light faded. Lord Sanguinar stood alone in the convergence, surrounded by the blood of a dead god, thinking."),
		],
		"defeat_story": [
			ShardLore.narration("The Shrouded Shogun's spiritual power was absolute. His warriors fought as one — living and dead, flesh and spirit — an army that transcended mortality itself."),
			ShardLore.dialogue("Lord Sanguinar", "He fights with ghosts at his back. Every blow carries the weight of ancestors. I have underestimated the power of the dead — which is ironic, given what I am. We withdraw. The convergence will wait. I have waited ten thousand years. I can wait a little longer.", "bitter_respect"),
		],
		"player_army": [
			"Lord Sanguinar",
			"Tiger Berserkers",
			"Tiger Fang Elite",
			"Bloodsworn Templars",
			"Nightfang Warriors",
			"Nightstalker Cavalry",
			"Blood Fanged Riders",
			"Blood Shamans",
			"Blood Champion",
			"Tiger Alpha",
			"Plague Catapult Crew",
			"Crimson Behemoth",
		],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": [
			"The Shrouded Shogun",
			"Shrine Wardens",
			"Starblade Samurai",
			"Oni Mask Executioners",
			"Kintsugi Blademasters",
			"Temple Defenders",
			"Crimson Oni Riders",
			"Dreampiercer Archers",
			"Spirit Healer Monks",
			"Komainu Guardian Colossus",
		],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": [
			"This is the final battle. Bring everything — full Hunger, full corruption, full force.",
			"The Crimson Behemoth is your war engine — protect it until it reaches the Veilbound line.",
			"The Shrouded Shogun is extremely powerful. Avoid him until you can commit your full strength.",
			"Shard objectives win the game. Don't get drawn into a pure deathmatch — control the points.",
		],
		"battle_modifiers": {
			"label": "Divine Blood",
			"description": "The convergence feeds the Hunger. Nightfang units gain +1 ATK from the dead god's blood.",
			"player_atk_bonus": 1,
			"enemy_hp_bonus": 1,
		},
	}

# ══════════════════════════════════════════════════════════════
# ENDING STORY — Shown after completing all missions
# ══════════════════════════════════════════════════════════════

static func _ending_story() -> Array:
	return [
		ShardLore.narration("===  CAMPAIGN COMPLETE: THE ETERNAL HUNGER  ==="),
		ShardLore.narration("Lord Sanguinar has survived the Shardlands. He has fed on fire, resisted iron, hunted the living, and faced the dead. He has stood in the blood of a dead god and told the Architect of Ruin that he is not afraid."),
		ShardLore.narration("And he meant it. Perhaps that is the most terrifying thing about the Blood Patriarch — he always means exactly what he says."),
		ShardLore.dialogue("Lord Sanguinar", "Nyxara. I received a transmission. The clockwork lord — Calculon — is broadcasting on all frequencies. He claims to understand the Shardlands. He claims to have data. He is proposing... cooperation.", "contemplative"),
		ShardLore.dialogue("Countess Nyxara", "Do you believe him, my lord?", "curious"),
		ShardLore.dialogue("Lord Sanguinar", "He is a machine-lord who worships logic. Deception is inefficient, and Calculon abhors inefficiency. So yes — I believe he believes what he is saying. Whether he is correct is another matter. But his data may prove... useful.", "measured"),
		ShardLore.narration("Sanguinar walked to the edge of the convergence and looked out across the Shardlands — a broken world of fire and silk and iron and spirit, with a god watching from behind the curtain."),
		ShardLore.dialogue("Lord Sanguinar", "The fire-queen wants to burn Fhah-Zolg. The machine-lord wants to solve him. The spider-queen wants to weave him. The shogun wants to honor-duel him. And I?", "quiet"),
		ShardLore.narration("He sheathed the Fang of Nethurra."),
		ShardLore.dialogue("Lord Sanguinar", "I want to teach him what ten thousand years of hunger feels like. Calculon wants a coalition? Very well. I will attend his meeting. Not as an ally — allies are for those who trust. As an investor. The Nightfang will contribute our resources, our intelligence, and our ten thousand years of experience in making powerful things bleed. In return, I want one thing.", "business"),
		ShardLore.dialogue("Countess Nyxara", "What thing, my lord?", "attentive"),
		ShardLore.dialogue("Lord Sanguinar", "When we find Fhah-Zolg — and we will find him — I want the first bite.", "predatory"),
		ShardLore.narration("The Blood Patriarch turned east, where the distant glow of Calculon's Grid relay flickered like a mechanical star."),
		ShardLore.narration("Behind him, the Nightfang Dominion followed — hungry, ancient, and no longer caged. They had been the monsters of Nethurra. They would be the monsters of the Shardlands. And if Fhah-Zolg thought that made them predictable — well."),
		ShardLore.narration("Predictable predators are still predators."),
		ShardLore.narration("Somewhere beyond the veil of reality, Fhah-Zolg reviewed his calculations. For the second time in an eternity, the numbers did not add up."),
		ShardLore.fhah_zolg("...Three of them. Three of my pieces, beginning to see the board. The fire-queen, the clockwork lord, and now the old predator. They are talking to each other. Sharing data. Building alliances. This was not in the scenario parameters."),
		ShardLore.fhah_zolg("Oh well. I suppose I should be flattered. It takes a truly exceptional game to make the pieces cooperate. Let them plot. Let them scheme. Let them believe they can change the rules."),
		ShardLore.fhah_zolg("The game is more interesting this way."),
	]
