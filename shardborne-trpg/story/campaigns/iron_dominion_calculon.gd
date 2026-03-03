class_name IronDominionCalculonCampaign
## Lord Calculon — "The Grid Remembers"
## The first Iron Dominion campaign. Teaches defensive doctrine, Grid Cohesion,
## combined arms, and positional strategy through 6 escalating battles.
##
## Story: Lord Calculon awakens in the Shardlands with fractured Grid connectivity.
## He must reassemble his forces, analyze the alien landscape, and discover
## the mathematical truth behind the Shardlands — even if the answer terrifies him.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_calculon",
		"commander": "Lord Calculon",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Grid Remembers",
		"description": "Lord Calculon's Grid is shattered. Fragments of shared consciousness flicker like dying signals in the dark. Restore the network, analyze the anomaly, and impose order on chaos.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

# ══════════════════════════════════════════════════════════════
# OPENING STORY — Shown when player first starts the campaign
# ══════════════════════════════════════════════════════════════

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Error."),
		ShardLore.narration("Error. Error. Error."),
		ShardLore.narration("The word pulsed through Lord Calculon's consciousness like a heartbeat made of static — a thousand subroutines screaming into a void where the Grid should have been."),
		ShardLore.dialogue("Lord Calculon", "Grid status: fragmented. Connectivity: 2.3 percent. Node count: ...insufficient data. Unacceptable.", "analytical"),
		ShardLore.narration("Lord Calculon pulled himself upright. His body — half organic, half clockwork, all precision — responded with a reassuring click of gears and the soft hum of aetheric fuel cells. Around him, soldiers of the Iron Dominion lay scattered across impossible terrain: volcanic glass fused with crystalline formations that defied every geological model in his database."),
		ShardLore.narration("The Grid — the vast interconnected network of shared consciousness that united every citizen of Axiomar — was gone. Not destroyed. Fragmented. He could feel distant echoes of other nodes, too far away to synchronize, too faint to analyze."),
		ShardLore.dialogue("Lord Calculon", "All units within acoustic range, respond. Priority Alpha. Designation, status, and remaining armament.", "commanding"),
		ShardLore.narration("They responded. Not as a synchronized chorus — the way it should have been — but as individuals. Separate voices. Separate minds. The wrongness of it made Calculon's processors ache."),
		ShardLore.dialogue("Lord Calculon", "Forty-seven active units. Nine war machines in various states of functionality. Grid connectivity: local only, range approximately 200 meters. This is... survivable. Barely.", "clinical"),
		ShardLore.narration("He ran the numbers. No recognizable stellar configurations. No matching atmospheric signatures. No Grid relay stations. Conclusion: they were no longer in Axiomar. Probability of natural translocation event: 0.0000003 percent."),
		ShardLore.dialogue("Lord Calculon", "This was deliberate. Something moved us. The question is not where we are — that will reveal itself through observation. The question is: what variable are we in this equation?", "contemplative"),
		ShardLore.narration("In the distance, something howled. Something that did not appear in any database Lord Calculon had ever compiled."),
		ShardLore.dialogue("Lord Calculon", "Unknown hostiles. Grid Cohesion protocol: local mesh only. All units, defensive formation Theta-7. We will analyze the threat before we engage it. That is not cowardice — it is efficiency.", "measured"),
		ShardLore.fhah_zolg("Ah, the clockwork lord. He counts everything. Measures everything. And still he does not see the board. But he will. He's too clever not to. And when he does... oh, that will be the interesting part."),
	]

# ══════════════════════════════════════════════════════════════
# MISSIONS — 6 escalating battles
# ══════════════════════════════════════════════════════════════

static func _missions() -> Array:
	return [
		_mission_1_signal_noise(),
		_mission_2_the_corrosion(),
		_mission_3_grid_expansion(),
		_mission_4_fire_and_formula(),
		_mission_5_the_weavers_equation(),
		_mission_6_the_grid_remembers(),
	]

# ────────────────────────────────────────────────────────
# MISSION 1: Signal and Noise
# Tutorial: Basic movement, defense, Grid Cohesion positioning
# ────────────────────────────────────────────────────────

static func _mission_1_signal_noise() -> Dictionary:
	return {
		"title": "Signal and Noise",
		"objectives_text": "Destroy all corrupted hostiles. Keep your units close — Grid Cohesion is your strength.",
		"pre_story": [
			ShardLore.narration("The first encounter came within hours. Corrupted creatures — eyeless things that moved in jerking, arrhythmic patterns — emerged from fissures in the crystallized ground and converged on the Iron Dominion's perimeter."),
			ShardLore.dialogue("Lord Calculon", "Contact. Multiple hostiles, bearing northeast. Composition: organic, heavily corrupted, minimal intelligence. Threat assessment: low individually, moderate in aggregate.", "clinical"),
			ShardLore.narration("Calculon studied their approach. No coordination. No flanking. No tactical awareness whatsoever. Just hunger and momentum."),
			ShardLore.dialogue("Lord Calculon", "Defensive line, standard spacing. Infantry forward, Sentinels anchoring the flanks. Remember: the Grid is local. Stay within formation range or you fight alone. And Iron Dominion soldiers do not fight alone.", "firm"),
		],
		"post_story": [
			ShardLore.narration("The creatures fell with mathematical predictability. Calculon's formation held, each unit covering its neighbor's blind spots with mechanical precision."),
			ShardLore.dialogue("Lord Calculon", "Efficient. Casualties: zero. Ammunition expended: within optimal parameters. These creatures were... insufficient as a dataset. We have learned nothing about our adversary.", "dissatisfied"),
			ShardLore.narration("But analysis of the fallen creatures revealed something interesting. Their corruption — a black, oily substance that seemed to pulse with its own heartbeat — contained trace aetheric signatures. Signatures that were not entirely unfamiliar."),
			ShardLore.dialogue("Lord Calculon", "This corruption responds to aetheric wavelengths. It could, theoretically, interface with the Grid. That is... concerning. File it. Flag it priority three. We continue the advance.", "troubled"),
		],
		"defeat_story": [
			ShardLore.narration("The formations broke. Without full Grid connectivity, the soldiers fought as individuals — and individuals were not what the Iron Dominion excelled at."),
			ShardLore.dialogue("Lord Calculon", "Unacceptable. Recompute formation spacing. Reassign fire lanes. We will not make the same error twice. The Grid may be fractured, but discipline is not.", "sharp"),
		],
		"player_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Thrall Conscripts",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Iron Dominion units gain Grid Cohesion bonuses when positioned near each other.",
			"Steam Sentinels are your anvil — place them where the enemy will attack.",
			"Lord Calculon generates Command Points — use them for special orders.",
			"Keep your formation tight. Isolated units lose their Grid bonus and become vulnerable.",
		],
		"battle_modifiers": {
			"label": "Fractured Grid",
			"description": "Grid connectivity is minimal. All Iron Dominion units -1 ATK from signal degradation.",
			"player_atk_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 2: The Corrosion
# Tutorial: Ranged combat, positioning, fighting Nightfang corruption
# ────────────────────────────────────────────────────────

static func _mission_2_the_corrosion() -> Dictionary:
	return {
		"title": "The Corrosion",
		"objectives_text": "Defeat the Nightfang raiding party. Use ranged firepower to destroy them before they close the distance.",
		"pre_story": [
			ShardLore.narration("Three cycles of observation. Calculon had catalogued the terrain, mapped the local shard concentrations, and established a rudimentary Grid mesh across his encampment. And then the Nightfang arrived."),
			ShardLore.narration("Not the mindless creatures from before. These were soldiers — pale, gaunt, eyes burning with a cold hunger that made Calculon's threat assessment algorithms spike."),
			ShardLore.dialogue("Lord Calculon", "New faction contact. Designation: unknown. Biological, organized, driven by apparent compulsive feeding behavior. Interesting — their command structure mirrors parasitic hive-organisms.", "fascinated"),
			ShardLore.narration("The Nightfang advanced with unsettling purpose. They did not charge — they stalked. Spreading out to encircle. Testing the perimeter."),
			ShardLore.dialogue("Lord Calculon", "They are probing our defenses. A rational tactic. This faction possesses tactical intelligence. Adjustment required: deploy Sharpshooters to maximum range. Deny them the approach.", "calculated"),
			ShardLore.narration("He paused, running one final calculation."),
			ShardLore.dialogue("Lord Calculon", "And activate Fragment Charges on the Steam Sentinels. If those creatures reach our line, I want them to regret it.", "cold"),
		],
		"post_story": [
			ShardLore.narration("The Nightfang retreated — not routed, but withdrawn, like water receding before a wave. They had lost soldiers but showed no grief, no panic. Only... recalculation."),
			ShardLore.dialogue("Lord Calculon", "Concerning. That retreat was not emotional. It was analytical. Their commander made a cost-benefit assessment and chose withdrawal. We are not the only ones who can think.", "wary"),
			ShardLore.narration("Examination of the Nightfang fallen revealed disturbing data. Their organic components were sustained by a form of blood-borne aetheric energy — stolen from other living beings. The corruption wasn't a disease. It was a fuel system."),
			ShardLore.dialogue("Lord Calculon", "They convert biomass into aetheric energy through blood absorption. Efficient. Horrifying. But efficient. I wonder what would happen if one attempted to drain an Iron Dominion soldier... We are half machine. Would the corruption know what to do with gears?", "morbidly_curious"),
			ShardLore.narration("He made a note: DO NOT test this hypothesis."),
		],
		"defeat_story": [
			ShardLore.narration("The corrupted soldiers closed too fast. The Sharpshooters couldn't maintain enough volume of fire, and the Nightfang reached the line with their hunger intact."),
			ShardLore.dialogue("Lord Calculon", "Error in range calculations. The enemy's approach speed exceeds stored parameters. Recalibrating. We will prepare a more suitable reception for the next engagement.", "irritated"),
		],
		"player_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Steam-Powered Sharpshooters",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Blood Reavers",
			"Blood Reavers",
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Shadow Stalkers",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Sharpshooters deal damage from distance — keep them behind your Sentinels.",
			"Focus fire: concentrate ranged attacks on one enemy unit at a time.",
			"Don't let fast enemies flank your Sharpshooters — they're fragile up close.",
			"Grid Cohesion makes your ranged units more accurate. Keep formations tight.",
		],
		"battle_modifiers": {
			"label": "Night Hunters",
			"description": "The Nightfang are hunting. Enemy units gain +1 MOV from bloodlust.",
			"enemy_mov_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 3: Grid Expansion
# Tutorial: Objectives, controlling territory, Command Points
# ────────────────────────────────────────────────────────

static func _mission_3_grid_expansion() -> Dictionary:
	return {
		"title": "Grid Expansion",
		"objectives_text": "Capture and hold shard relay points. Each controlled point extends your Grid range — control more than the enemy to win.",
		"pre_story": [
			ShardLore.narration("Lord Calculon's scouts — clicking, whirring mechanisms that moved through the broken terrain with insectile precision — returned with vital intelligence. Three shard concentrations formed a rough triangle across a plateau of fused metal and crystal. Each pulsed with aetheric energy compatible with Grid architecture."),
			ShardLore.dialogue("Lord Calculon", "Analysis complete. These shard concentrations could serve as Grid relay nodes. If we capture and attune them, local Grid coverage would expand from 200 meters to approximately 1.4 kilometers. That changes everything.", "intent"),
			ShardLore.narration("But they were not the only ones interested. An organized force — green banners, skittering formations, moving with an unsettling organic coordination — was converging from the south."),
			ShardLore.dialogue("Lord Calculon", "Faction contact: arthropod-derivative species with apparent web-based infrastructure. Designation: Thornweft, based on intercepted acoustic communications. They exhibit a distributed intelligence model similar to the Grid, but biological. Fascinating. And inconvenient.", "analytical"),
			ShardLore.narration("Calculon studied the battlefield. The Thornweft were already establishing silk lines between the shard nodes — weaving connections much as the Grid linked relay stations."),
			ShardLore.dialogue("Lord Calculon", "They want the same thing we do — a network. We cannot allow a competing intelligence to establish dominance. Priority one: capture and hold more relay nodes than the enemy. Speed is not our strength, but precision is.", "strategic"),
		],
		"post_story": [
			ShardLore.narration("The Grid expanded. Three nodes, synchronized, humming with shard-amplified aetheric energy. Calculon felt it immediately — the return of connected thought, the warm pulse of data flowing between soldiers. Not the full Grid, not the billion voices of Axiomar, but something. Enough."),
			ShardLore.dialogue("Lord Calculon", "Grid coverage: 1,380 meters. Node synchronization: optimal. I can... I can hear them again. The other units. Not just their words — their data. Their status. Their readiness. This is what we are. This is what we were always meant to be.", "emotional"),
			ShardLore.narration("It was the closest Lord Calculon had come to showing emotion since arriving in the Shardlands. He quickly corrected himself."),
			ShardLore.dialogue("Lord Calculon", "The Thornweft retreated but they left silk anchor-threads on two of the nodes. Residual. They will attempt to reclaim these positions. More importantly: their weaving technology is not dissimilar to Grid relay protocols. Both systems connect distributed intelligence across a physical substrate. The parallel is... not coincidental.", "suspicious"),
			ShardLore.fhah_zolg("He sees patterns. He sees connections. He sees everything except the hand that placed the pieces. But give him time. That magnificent, relentless mind will compute the truth eventually. And when it does — oh, I must remember to watch closely."),
		],
		"defeat_story": [
			ShardLore.narration("The Thornweft's webs proved faster than Iron Dominion formations. By the time Calculon's soldiers reached the relay nodes, silk was already woven deep into the shard-crystal."),
			ShardLore.dialogue("Lord Calculon", "Insufficient velocity. We require a revised deployment pattern — advance elements to secure nodes while the main force provides covering fire. Recalculating...", "frustrated"),
		],
		"player_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Gearwright Engineers",
			"Scouts/Recon",
		],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": [
			"Spiderling Swarm",
			"Spiderling Swarm",
			"Silk-Warden Regulars",
			"Silk-Warden Regulars",
			"Shuttle-Consort Militia",
			"Fate-Thread Weavers",
		],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"Shard Clash: capture and hold shard markers. Each one earns VP every round.",
			"Scouts move fast — send them ahead to capture early while infantry advances.",
			"Engineers can repair damaged units. Keep them near the front line.",
			"Don't spread too thin. Hold 2 of 3 objectives rather than weakly contesting all 3.",
		],
		"battle_modifiers": {
			"label": "Grid Relay Boost",
			"description": "Shard energy amplifies the Grid. Your units gain +1 DEF near captured objectives.",
			"player_def_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 4: Fire and Formula
# Tutorial: Combined arms, heavy units, fighting Emberclaw aggression
# ────────────────────────────────────────────────────────

static func _mission_4_fire_and_formula() -> Dictionary:
	return {
		"title": "Fire and Formula",
		"objectives_text": "Defend the Grid relay hub against the Emberclaw assault. Hold the center position — you cannot afford to lose it.",
		"pre_story": [
			ShardLore.narration("The fire came before the army."),
			ShardLore.narration("A wall of heat rolled across the plateau, warping the air and making the Grid relay nodes crackle with interference. Calculon's sensors screamed warnings — massive aetheric signatures, moving fast, closing from the west."),
			ShardLore.dialogue("Lord Calculon", "Faction contact: pyrokinetic species, high aggression index. Designation: Emberclaw. They are approaching with... enthusiasm.", "dry"),
			ShardLore.narration("Enthusiasm was an understatement. The Emberclaw charged like the land itself was on fire — because in several places, it was. Their commander, a drake-bonded warrior wreathed in flames, led from the front with a ferocity that defied rational engagement doctrine."),
			ShardLore.dialogue("Lord Calculon", "Analysis: their commander — Scorchcaller Vex — generates extreme thermal output and inspires irrational bravery in subordinate units. She is the fulcrum of their assault. Remove her, and the momentum collapses. However...", "calculating"),
			ShardLore.narration("He watched Vex cut through a scouting party like a blade through paper."),
			ShardLore.dialogue("Lord Calculon", "...however, approaching her directly appears inadvisable. Alternative: absorb the charge. Let them spend their Heat against our Sentinels. Then counter with Artillery and war machines when their momentum fails. Fire burns hot but it burns fast. Metal endures.", "resolute"),
		],
		"post_story": [
			ShardLore.narration("The Emberclaw charge broke against Iron Dominion steel like a wave against a breakwater — violent, spectacular, and ultimately futile. Vex herself fought with breathtaking fury, but fury alone could not overcome interlocking fields of fire and Sentinel shield walls."),
			ShardLore.dialogue("Lord Calculon", "The Emberclaw retreated. Their commander survived — she is difficult to kill, that one. But the relay hub is secure. Damage: moderate. Casualties: within acceptable parameters.", "satisfied"),
			ShardLore.narration("As the fires died and smoke cleared, Calculon walked the battlefield with his data-scribes, recording every detail. The Emberclaw fought with passion and speed. The Grid fought with precision and patience. Two philosophies of war, tested against each other."),
			ShardLore.dialogue("Lord Calculon", "Interesting data point: the Emberclaw's 'Heat' mechanic operates on principles similar to aetheric overclocking — a temporary boost in performance at the cost of long-term stability. Axiomar rejected that model centuries ago. And yet... their peak output exceeds ours. There may be something worth studying here.", "grudging_respect"),
			ShardLore.narration("He paused at the edge of the battlefield, where shard fragments scattered by the fighting caught the light."),
			ShardLore.dialogue("Lord Calculon", "Wait. These shard resonance patterns... I've seen this before. In Axiomar. In the deepest archives. The frequency is identical to the Grid's core operating signal. The shards are not random debris — they are components. Components of something that was deliberately disassembled.", "revelation"),
		],
		"defeat_story": [
			ShardLore.narration("The Emberclaw's Heat overwhelmed the Grid relay defenses. Calculon's formations held longer than most would have, but fire has a way of finding every gap in even the most precise defense."),
			ShardLore.dialogue("Lord Calculon", "Heat dissipation failure. Our defensive algorithms did not account for sustained thermal assault. Adjusting parameters. The next engagement will end differently.", "cold_fury"),
		],
		"player_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Steam Heavy Guards",
			"Clockwork Cavalry",
			"Steam Artillery Crew",
		],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Emberforged Blades",
			"Pyromancer Adepts",
			"Emberknight Riders",
		],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": [
			"King of the Hill: hold the center relay hub for 2 VP per round. Don't give it up!",
			"Steam Sentinels are your shield wall — position them between Emberclaw charges and your backline.",
			"Artillery can devastate clumped enemies. Fire at the Emberclaw's charge lanes.",
			"The Emberclaw hit hardest on the first charge. Absorb it, then counterattack when their Heat cools.",
		],
		"battle_modifiers": {
			"label": "Grid Relay Network",
			"description": "The relay hub boosts Grid Cohesion. Your units gain +1 DEF while holding the center.",
			"player_def_bonus": 1,
			"enemy_atk_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 5: The Weaver's Equation
# Tutorial: Difficult terrain, managing multiple threats, adapting tactics
# ────────────────────────────────────────────────────────

static func _mission_5_the_weavers_equation() -> Dictionary:
	return {
		"title": "The Weaver's Equation",
		"objectives_text": "Secure the supply line through Thornweft territory. Hold both ends of the corridor to maintain your logistics chain.",
		"pre_story": [
			ShardLore.narration("The Thornweft struck without warning — and without sound. One moment, the supply convoy was moving through a narrow pass. The next, silk lines exploded from every surface, snaring wheels, fouling gears, and pulling soldiers into web-shrouded darkness."),
			ShardLore.dialogue("Lord Calculon", "Ambush. Grid interference — their silk is disrupting local network coherence. Clever. Very clever.", "impressed"),
			ShardLore.narration("From the webs, a voice emerged — not spoken aloud, but vibrating through the silk itself, a resonance that the Grid picked up as corrupted data."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Your network. Your beautiful, rigid, mechanical network. Can you feel how fragile it is, clockwork lord? One thread pulled, and the whole tapestry unravels.", "taunting"),
			ShardLore.dialogue("Lord Calculon", "Loom-Mother Vethiss. Your intelligence-gathering is commendable. Your understanding of Grid architecture, however, is flawed. A network is not a tapestry. Cut a thread, and the network reroutes. That is what makes it superior to your primitive web.", "disdainful"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Primitive? Oh, metal-mind. The Web was weaving worlds together when your clockwork was still learning to count. But please — show me how your Grid 'reroutes.' I am always eager to learn.", "amused"),
			ShardLore.narration("Calculon felt a rare surge of anger — quickly suppressed. Emotion was noise. Data was signal."),
			ShardLore.dialogue("Lord Calculon", "All units: recalibrate to anti-ambush protocols. Advance in echelon. Clear every web anchor within weapons range. We will establish this supply corridor through sheer mathematical certainty.", "iron_will"),
		],
		"post_story": [
			ShardLore.narration("The supply line held — barely. Vethiss's Thornweft fought with an alien patience that tested every algorithm in Calculon's tactical library. They did not charge. They did not retreat. They simply... adjusted. Adapted. Rewove."),
			ShardLore.dialogue("Lord Calculon", "Casualties: significant. The Thornweft's tactical model is... uncomfortably effective against standard Grid doctrine. Their distributed intelligence reacts faster than our command protocols. I require an upgrade.", "grudging"),
			ShardLore.narration("In the aftermath, Calculon's engineers recovered Thornweft silk samples. Under aetheric analysis, the silk revealed a staggering truth."),
			ShardLore.dialogue("Lord Calculon", "The silk... it carries data. Not electromagnetic, not aetheric — something else. Something older. The Thornweft's Web and our Grid are fundamentally the same technology expressed through different substrates. Both are attempts to connect distributed minds into a unified intelligence.", "stunned"),
			ShardLore.narration("He sat in silence for a full 3.7 seconds — an eternity for a mind that processed at terahertz speeds."),
			ShardLore.dialogue("Lord Calculon", "Five factions. Five civilizations. Each with a different method of connecting, controlling, or empowering their people. Fire. Blood. Silk. Gears. Spirit. Five solutions to the same problem. As if someone was... testing variables.", "dawning_horror"),
			ShardLore.fhah_zolg("There it is. The moment I've been waiting for. He's seen the edge of the pattern. Watch him now — watch how that magnificent mind struggles with the implication. He'll try to reject it first. They always do. But Calculon? He's too honest. Too precise. He cannot lie to himself. That is his blessing and his curse."),
		],
		"defeat_story": [
			ShardLore.narration("The silk was everywhere — in the gears, in the joints, in the Grid relay circuits. Vethiss's Thornweft had woven their ambush with the patience of a geologist and the precision of a mathematician."),
			ShardLore.dialogue("Lord Calculon", "Supply line compromised. Grid coherence at 34 percent. Retreating to defensible position. This... requires a comprehensive tactical revision.", "grim"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Come back anytime, clockwork lord. The Web is patient. The Web is always patient.", "serene"),
		],
		"player_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Clockwork Infantry",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Gearwright Engineers",
			"Clockwork Cavalry",
			"Gear-Rider Hussars",
			"Steam Artillery Crew",
		],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": [
			"Loom-Mother Vethiss",
			"Spiderling Swarm",
			"Spiderling Swarm",
			"Silk-Warden Regulars",
			"Silk-Warden Regulars",
			"Shuttle-Consort Militia",
			"Shuttle-Consort Militia",
			"Fate-Thread Weavers",
			"Silk Colossus",
		],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": [
			"Supply Lines: hold both corridor endpoints. Losing one cuts your supply and weakens all units.",
			"The Thornweft excel at disruption — protect your flanks and rear.",
			"Cavalry can break through web lines and reach threatened positions quickly.",
			"Engineers are critical here. They can repair units damaged by web traps.",
		],
		"battle_modifiers": {
			"label": "Web-Tangled Terrain",
			"description": "Thornweft silk slows movement. All units -1 MOV in the pass.",
			"player_mov_bonus": -1,
			"enemy_mov_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 6: The Grid Remembers
# Final battle — hardest fight, the truth revealed
# ────────────────────────────────────────────────────────

static func _mission_6_the_grid_remembers() -> Dictionary:
	return {
		"title": "The Grid Remembers",
		"objectives_text": "Seize the Shard Convergence and resist all opposition. The truth lies at the center of the storm.",
		"pre_story": [
			ShardLore.narration("Lord Calculon stood at the edge of the Shard Convergence — the largest shard cluster yet discovered, its crystalline pillars rising from the earth like the bones of a dead god. And in a way, that's exactly what they were."),
			ShardLore.dialogue("Lord Calculon", "Final analysis complete. I have been... delaying this moment. Processing the implications. The data is conclusive.", "heavy"),
			ShardLore.narration("He turned to his officers — commanders who had followed him through the alien dark of the Shardlands, who had fought fire and shadow and silk on his orders."),
			ShardLore.dialogue("Lord Calculon", "The shards are not debris. They are processors. Each one contains a fragment of a computational matrix so vast it makes the Grid look like an abacus. Someone built an intelligence — a mind — that spanned multiple realities. And then someone else broke it. Deliberately.", "measured"),
			ShardLore.narration("Silence. Even the hum of clockwork seemed to quiet."),
			ShardLore.dialogue("Lord Calculon", "The Shardlands are not a place. They are a laboratory. We — all five factions — were brought here as experimental subjects. Variables in an equation I have not yet fully solved. But I know the convergence point will contain enough processing power to complete the calculation.", "determined"),
			ShardLore.narration("From every direction, armies converged. The Nightfang, drawn by the scent of power. The other factions, each sensing that the convergence was the key to everything. Calculon had predicted this. He had planned for it."),
			ShardLore.dialogue("Lord Calculon", "This is not a battle for territory. This is a battle for information. The faction that controls the convergence controls the answer. And the Grid does not forget. The Grid does not forgive. The Grid remembers everything.", "fierce"),
			ShardLore.narration("For the first time in the campaign, Lord Calculon drew his weapon — a blade of folded steel and aetheric circuitry that hummed with Grid resonance."),
			ShardLore.dialogue("Lord Calculon", "Iron Dominion — all units — maximum commitment. Today we learn the truth. Whatever it costs.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The convergence fell. Not through brute force — through precision. Through patience. Through the relentless, grinding, unstoppable efficiency of the Iron Dominion at its finest."),
			ShardLore.narration("And at the center of the shard cluster, surrounded by the humming fragments of a dead god's mind, Lord Calculon finally saw the equation complete."),
			ShardLore.dialogue("Lord Calculon", "I see it now. The complete architecture. Five factions — five different expressions of connection. Fire connects through passion. Blood connects through hunger. Silk connects through pattern. Spirit connects through tradition. And gears connect through logic.", "awed"),
			ShardLore.narration("The shards pulsed. And in that pulse, data flowed — not Grid data, but something older, vaster, more complex than anything Axiomar had ever produced."),
			ShardLore.dialogue("Lord Calculon", "We were not brought here randomly. We were selected. Selected because each faction represents a fundamental approach to the same problem: how to unite disparate minds into a single purpose. Whoever did this wanted to observe which model was superior. Or... whether they could be combined.", "horrified"),
			ShardLore.narration("And then the face appeared. Not in the shards, but in the data itself — a pattern that resolved into something Calculon's algorithms could only describe as a face. Vast. Ancient. Amused."),
			ShardLore.fhah_zolg("Ah, Lord Calculon. You computed faster than I expected. Most impressive. Tell me — now that you've seen the equation, do you understand what the answer means?"),
			ShardLore.dialogue("Lord Calculon", "...You. You are the variable I could not account for. The constant outside the equation. You brought us here. You broke the shards. You set the board.", "cold"),
			ShardLore.fhah_zolg("I did not break them, little clockwork. I collected the fragments after they were already broken. Waste not, want not. But yes — I set the board. And you have all played so beautifully."),
			ShardLore.narration("The vision faded. The data stream collapsed. Calculon stood alone in the humming silence of the convergence, his processors running at maximum capacity."),
			ShardLore.dialogue("Lord Calculon", "...The equation is incomplete. He showed me enough to understand the problem, but not enough to solve it. He wants us to keep playing. To keep fighting. To keep generating data for his experiment.", "quiet_fury"),
			ShardLore.narration("Calculon sheathed his blade. When he spoke again, his voice was different — not the cold, analytical tone of a machine-lord, but something harder. Something almost human."),
			ShardLore.dialogue("Lord Calculon", "I was built to solve problems. To find answers. To impose order on chaos. And I have never — never — left an equation unfinished. Fhah-Zolg thinks he is the experimenter and we are the subjects. He is wrong. He is a variable. And variables can be solved.", "steel"),
			ShardLore.narration("He opened a Grid channel — the widest broadcast he could manage."),
			ShardLore.dialogue("Lord Calculon", "This is Lord Calculon of the Iron Dominion, broadcasting on all frequencies. To the Emberclaw commander, Scorchcaller Vex: I have information you need. To the Thornweft Loom-Mother: I believe our networks are more compatible than either of us realized. I propose a meeting. Unarmed. Data only. Because the thing watching us from beyond the board... it is afraid of what happens when we stop fighting each other and start solving the real equation.", "broadcast"),
			ShardLore.narration("He closed the channel and looked up at the alien sky."),
			ShardLore.dialogue("Lord Calculon", "The Grid remembers, Fhah-Zolg. And I will make sure it never forgets what you did.", "promise"),
		],
		"defeat_story": [
			ShardLore.narration("The convergence held by other hands. Calculon's army — precise, disciplined, unbreakable — finally broke. Not from weakness, but from the sheer weight of opposition."),
			ShardLore.dialogue("Lord Calculon", "Retreat. Orderly. Maintain Grid coherence to the last. We have lost a battle, not the war. The data from this engagement alone is worth the cost. And the equation... the equation is still waiting to be solved.", "unbroken"),
			ShardLore.narration("Even in defeat, Lord Calculon's mind was already working. Always working. Always computing."),
		],
		"player_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Clockwork Infantry",
			"Steam Sentinels",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Steam Heavy Guards",
			"Clockwork Cavalry",
			"Gear-Rider Hussars",
			"Steam Artillery Crew",
			"Clockwork Titan",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Lord Sanguinar",
			"Blood Reavers",
			"Blood Reavers",
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Nightfang Warriors",
			"Tiger Berserkers",
			"Blood Shamans",
			"Shadow Stalkers",
			"Crimson Behemoth",
		],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": [
			"This is the final battle. Use everything you've learned about Grid positioning.",
			"The Clockwork Titan is your trump card — protect it from being surrounded.",
			"Focus on holding shard objectives. Victory Points win this battle, not kills alone.",
			"Keep Calculon alive — his Command Points fuel your entire army's effectiveness.",
		],
		"battle_modifiers": {
			"label": "Shard Convergence",
			"description": "Raw shard energy floods the field. All units gain +1 HP. The stakes have never been higher.",
			"player_hp_bonus": 1,
			"enemy_hp_bonus": 1,
		},
	}

# ══════════════════════════════════════════════════════════════
# ENDING STORY — Shown after completing all missions
# ══════════════════════════════════════════════════════════════

static func _ending_story() -> Array:
	return [
		ShardLore.narration("===  CAMPAIGN COMPLETE: THE GRID REMEMBERS  ==="),
		ShardLore.narration("Lord Calculon has survived the Shardlands. He has fought corruption, fire, silk, and shadow. He has rebuilt the Grid — not as it was, but as something new. Something tempered by hardship and sharpened by data that Axiomar never possessed."),
		ShardLore.narration("And he has seen the truth — or at least the edge of it. The Shardlands are an experiment. Five factions, five philosophies, five ways of connecting minds and waging war, all watched by something ancient and amused."),
		ShardLore.narration("But Calculon is not a soldier or a philosopher. He is an engineer. And engineers do not despair at problems. They solve them."),
		ShardLore.dialogue("Lord Calculon", "The Grid has stored every engagement, every data point, every anomaly from our time in the Shardlands. Combined with the shard fragments we've collected, I now have enough processing capacity to model Fhah-Zolg's experimental parameters. Given sufficient time and data, I can compute the equation that holds the Shardlands together. And then I can break it.", "determined"),
		ShardLore.narration("He opened the Grid channel again, broadcasting to anyone who would listen."),
		ShardLore.dialogue("Lord Calculon", "To all factions: I am Lord Calculon of the Iron Dominion. I know what the Shardlands are. I know why we were brought here. And I know — theoretically — how to get us home. But I cannot do it alone. The equation requires five variables. Five factions. Five cooperative inputs. I propose what the Grid would call a merge. Temporary. Conditional. But necessary.", "broadcast"),
		ShardLore.narration("He waited. For the first time in his existence, Lord Calculon was uncertain of the outcome."),
		ShardLore.narration("Somewhere, Scorchcaller Vex's campfire flickered. Somewhere, Loom-Mother Vethiss paused mid-weave. Somewhere, a Veilbound sword monk tilted his head as if listening to a ghost."),
		ShardLore.narration("And somewhere beyond the veil of reality, Fhah-Zolg stopped laughing."),
		ShardLore.fhah_zolg("...Oh. Oh, that's unexpected. The clockwork lord is trying to change the rules. How delightfully arrogant. How beautifully, terrifyingly logical. I may have miscalculated."),
		ShardLore.narration("Lord Calculon smiled. It was the first time anyone in the Iron Dominion had ever seen him smile."),
		ShardLore.dialogue("Lord Calculon", "Error detected, Fhah-Zolg. Your error. The Grid never forgets. And it never, ever stops computing.", "triumphant"),
	]
