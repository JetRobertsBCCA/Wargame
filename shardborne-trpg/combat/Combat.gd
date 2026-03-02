extends Node
class_name Combat

## Shardborne TRPG Combat Manager
## Delegates faction skills → FactionSkillManager, faction state → FactionStateManager.
## Core combat loop, turn management, cards, AI, and morale remain here.

const UnitLabel = preload("res://ui/unit_label.gd")

signal register_combat(combat_node: Node)
signal turn_advanced(combatant: Dictionary)
signal combatant_added(combatant: Dictionary)
signal combatant_died(combatant: Dictionary)
signal update_turn_queue(combatants: Array, turn_queue: Array)
signal update_information(text: String)
signal update_combatants(combatants: Array)
signal combat_finished()

var combatants = []

enum Group { PLAYERS, ENEMIES }

var groups = [
	[], # players
	[], # enemies
]

var current_combatant = 0
var turn = 0
var turn_queue = []
var round_number = 1

@export var game_ui: Control
@export var controller: CController

# ══════════════════════════════════════════════════════════════
# MANAGERS (Extracted sub-systems)
# ══════════════════════════════════════════════════════════════

var _skill_manager := FactionSkillManager.new()
var _faction_mgr := FactionStateManager.new()

# ══════════════════════════════════════════════════════════════
# FACTION STATE
# ══════════════════════════════════════════════════════════════

## Per-side faction state (index 0 = player, 1 = enemy)
var faction_state = [{}, {}]

## Track which factions each side is using
var side_faction = [-1, -1]

## Command Points per side
var command_points = [0, 0]

# ══════════════════════════════════════════════════════════════
# CARD SYSTEM STATE
# ══════════════════════════════════════════════════════════════

var card_decks = [[], []]  # Per-side draw piles
var card_hands = [[], []]  # Per-side hands
var card_discard = [[], []]  # Per-side discard piles

# ══════════════════════════════════════════════════════════════
# SCENARIO SYSTEM
# ══════════════════════════════════════════════════════════════

var scenario_manager: Node = null

## Guard flag to prevent double combat_finish / advance after game ends
var _combat_over := false

## Track commander-dead CP penalty per side (increases by 1 each time a commander dies)
var _commander_dead_cp_penalty := [0, 0]

# ══════════════════════════════════════════════════════════════
# LORE & FLAVOR TEXT
# ══════════════════════════════════════════════════════════════

## Faction-themed round herald messages (keyed by faction enum → [early, mid, late])
const ROUND_HERALD := {
	CombatantDefinition.Faction.EMBERCLAW: [
		"The war-horns blaze — a new tide of fire sweeps the field!",
		"Smoke chokes the sky as the Warpack surges forward!",
		"The drakes shriek — the flames will not be denied!",
	],
	CombatantDefinition.Faction.IRON_DOMINION: [
		"Gears grind and fragments align — the Grid recalibrates.",
		"Steel boots stamp in unison as new orders propagate.",
		"The Dominion's war machine thunders onward, relentless.",
	],
	CombatantDefinition.Faction.NIGHTFANG: [
		"Shadow stirs and the dead remember their hunger.",
		"Corruption bleeds through the earth — the Nightfang advance.",
		"The blood-moon rises higher. The feeding has only begun.",
	],
	CombatantDefinition.Faction.THORNWEFT: [
		"Gossamer threads tighten — the Matriarchy weaves its will.",
		"The forest shifts. Every root and vine obeys.",
		"Nature's patience ends. The web closes around the prey.",
	],
	CombatantDefinition.Faction.VEILBOUND: [
		"The Veil ripples — spirits whisper new instructions.",
		"Flow surges through the shogunate. Steel and soul harmonize.",
		"The ancestors speak with urgency. Every blade must answer.",
	],
}

## Faction CP generation verbs
const CP_FLAVOR := {
	CombatantDefinition.Faction.EMBERCLAW: "war-horns rally",
	CombatantDefinition.Faction.IRON_DOMINION: "command lattice generates",
	CombatantDefinition.Faction.NIGHTFANG: "dark whispers channel",
	CombatantDefinition.Faction.THORNWEFT: "fate-weavers spin",
	CombatantDefinition.Faction.VEILBOUND: "spirit conduits focus",
}

## Faction death flavor (keyed by faction → [generic_death, commander_death])
const DEATH_FLAVOR := {
	CombatantDefinition.Faction.EMBERCLAW: [
		"%s crumbles to ash and cinder.",
		"%s's flame extinguishes — the Warpack howls!",
	],
	CombatantDefinition.Faction.IRON_DOMINION: [
		"%s's gears seize and collapse into scrap.",
		"%s's command circuit goes dark — the Grid falters!",
	],
	CombatantDefinition.Faction.NIGHTFANG: [
		"%s withers to bone and dust.",
		"%s's immortal reign ends — the horde wails!",
	],
	CombatantDefinition.Faction.THORNWEFT: [
		"%s is reclaimed by root and soil.",
		"%s falls — the web trembles with grief!",
	],
	CombatantDefinition.Faction.VEILBOUND: [
		"%s's spirit is severed from the Veil.",
		"%s's honor shatters — the shogunate mourns!",
	],
}

## Faction morale text: [pass, shaken, routed]
const MORALE_FLAVOR := {
	CombatantDefinition.Faction.EMBERCLAW: [
		"Their fire holds!",
		"The flame wavers — %s falters!",
		"The fire dies — %s breaks and flees!",
	],
	CombatantDefinition.Faction.IRON_DOMINION: [
		"The Grid holds firm.",
		"Signal degradation — %s's resolve cracks!",
		"Grid link severed — %s is routed!",
	],
	CombatantDefinition.Faction.NIGHTFANG: [
		"The blood-hunger steadies them.",
		"Even the undying know fear — %s recoils!",
		"The hunger devours reason — %s flees!",
	],
	CombatantDefinition.Faction.THORNWEFT: [
		"The web vibrates with resolve.",
		"Gossamer threads snap — %s's courage frays!",
		"The web unravels — %s scatters in panic!",
	],
	CombatantDefinition.Faction.VEILBOUND: [
		"Ancestral spirits steady their blade.",
		"The Veil flickers — %s loses focus!",
		"The spirits fall silent — %s abandons the field!",
	],
}

## Faction victory/defeat banners
const VICTORY_FLAVOR := {
	CombatantDefinition.Faction.EMBERCLAW: ["THE WARPACK CLAIMS THE FIELD!", "The fires dim… the Warpack retreats."],
	CombatantDefinition.Faction.IRON_DOMINION: ["THE GRID HOLDS — DOMINION PREVAILS!", "The Grid fractures… the Dominion withdraws."],
	CombatantDefinition.Faction.NIGHTFANG: ["THE NIGHT FEEDS ETERNAL!", "Dawn breaks… the Nightfang recede into shadow."],
	CombatantDefinition.Faction.THORNWEFT: ["THE WEB IS COMPLETE — ALL ENSNARED!", "The threads fray… the Matriarchy withdraws."],
	CombatantDefinition.Faction.VEILBOUND: ["THE VEIL SPEAKS — HONOR IS SATISFIED!", "The ancestors weep… the Shogunate retreats."],
}

## Helper: get faction name from side index
func _get_faction_name(side: int) -> String:
	return FactionDatabase.FACTIONS.get(side_faction[side], {}).get("name", "Unknown")

# ══════════════════════════════════════════════════════════════
# INITIALIZATION
# ══════════════════════════════════════════════════════════════

func _ready():
	emit_signal("register_combat", self)
	randomize()

	# Notify state machine that battle is active
	if GameStateMachine.current_state != GameStateMachine.GameState.BATTLE:
		GameStateMachine.force_state(GameStateMachine.GameState.BATTLE)

	# Wire manager log signals → update_information
	_skill_manager.skill_log.connect(func(msg): update_information.emit(msg))
	_faction_mgr.faction_log.connect(func(msg): update_information.emit(msg))

	# Handle end-of-combat
	combat_finished.connect(_on_combat_finished)

	# Check for army builder / BattleConfig data
	if BattleConfig.has_custom_armies:
		_setup_from_battle_config()
	else:
		_setup_demo_battle()

	# Generate initial CP from commanders
	_generate_command_points(0)
	_generate_command_points(1)

	# Build and draw starting cards
	_build_deck(0)
	_build_deck(1)
	_draw_cards(0, GameRules.STARTING_HAND_SIZE)
	_draw_cards(1, GameRules.STARTING_HAND_SIZE)

	# Announce battle start
	var p_faction = FactionDatabase.FACTIONS.get(side_faction[0], {}).get("name", "Player")
	var e_faction = FactionDatabase.FACTIONS.get(side_faction[1], {}).get("name", "Enemy")
	update_information.emit("[color=gold]═══ SHARDBORNE: %s vs %s ═══[/color]\n" % [p_faction, e_faction])

	# Setup scenario
	scenario_manager = preload("res://combat/scenario_manager.gd").new()
	add_child(scenario_manager)
	var scenario_type = BattleConfig.scenario_type if BattleConfig.has_custom_armies else "total_war"
	var round_limit = BattleConfig.round_limit if BattleConfig.has_custom_armies else 6
	scenario_manager.setup(scenario_type, self, round_limit)
	scenario_manager.scenario_ended.connect(_on_scenario_ended)
	update_information.emit("[color=silver]Scenario: %s[/color]\n" % scenario_manager.get_scenario_name())
	update_information.emit("[color=silver]%s[/color]\n" % scenario_manager.get_scenario_description())

	# Setup Drake Bonds for Emberclaw sides
	for side in [0, 1]:
		if side_faction[side] == CombatantDefinition.Faction.EMBERCLAW:
			_faction_mgr.setup_drake_bonds(side, faction_state[side], combatants, groups)

	update_information.emit("Round %d begins.\n" % round_number)

	emit_signal("update_turn_queue", combatants, turn_queue)
	controller.set_controlled_combatant(combatants[turn_queue[0]])
	game_ui.set_skill_list(combatants[turn_queue[0]].skill_list)
	_update_active_highlight(combatants[turn_queue[0]])

	# Update UI with faction state and card hand
	if game_ui.has_method("update_faction_resources"):
		game_ui.update_faction_resources(faction_state[0])
	if game_ui.has_method("update_card_hand"):
		game_ui.update_card_hand(card_hands[0])

	# Clear BattleConfig so Quick Battle from menu works normally next time
	BattleConfig.clear()

## Setup from Army Builder selections
func _setup_from_battle_config():
	side_faction[0] = BattleConfig.player_faction
	side_faction[1] = BattleConfig.enemy_faction
	_init_faction_state(0, side_faction[0])
	_init_faction_state(1, side_faction[1])

	# Place player units on left side, avoiding collisions
	var occupied_cells: Array[Vector2i] = []
	for unit_name in BattleConfig.player_army:
		var pos = _find_open_cell(Vector2i(2, 2), Vector2i(5, 18), occupied_cells)
		occupied_cells.append(pos)
		_add_unit_by_name(unit_name, 0, pos)

	# Place enemy units on right side
	for unit_name in BattleConfig.enemy_army:
		var pos = _find_open_cell(Vector2i(11, 2), Vector2i(14, 18), occupied_cells)
		occupied_cells.append(pos)
		_add_unit_by_name(unit_name, 1, pos)

## Find an open cell in the given rectangle, avoiding occupied_cells
func _find_open_cell(start: Vector2i, end: Vector2i, occupied: Array[Vector2i]) -> Vector2i:
	for y in range(start.y, end.y + 1, 2):
		for x in range(start.x, end.x + 1):
			var pos = Vector2i(x, y)
			if pos not in occupied:
				return pos
	# Fallback: scan odd rows
	for y in range(start.y + 1, end.y + 1, 2):
		for x in range(start.x, end.x + 1):
			var pos = Vector2i(x, y)
			if pos not in occupied:
				return pos
	# Last resort
	return Vector2i(start.x, start.y)

## Fallback demo battle (Quick Battle from menu)
func _setup_demo_battle():
	side_faction[0] = CombatantDefinition.Faction.EMBERCLAW
	side_faction[1] = CombatantDefinition.Faction.IRON_DOMINION
	_init_faction_state(0, side_faction[0])
	_init_faction_state(1, side_faction[1])

	# Player side — Emberclaw
	_add_unit_by_name("Scorchcaller Vex", 0, Vector2i(3, 5))
	_add_unit_by_name("Flameborn Guard", 0, Vector2i(4, 7))
	_add_unit_by_name("Emberclaw Warriors", 0, Vector2i(4, 3))
	_add_unit_by_name("Pyromancer Adepts", 0, Vector2i(2, 5))

	# Enemy side — Iron Dominion
	_add_unit_by_name("Commander Ironweld", 1, Vector2i(12, 5))
	_add_unit_by_name("Elite Vanguard", 1, Vector2i(11, 3))
	_add_unit_by_name("Clockwork Infantry", 1, Vector2i(11, 7))
	_add_unit_by_name("Steam-Powered Sharpshooters", 1, Vector2i(13, 5))

func _add_unit_by_name(unit_name: String, side: int, pos: Vector2i) -> void:
	var def := FactionDatabase.get_unit(unit_name)
	if def == null:
		push_warning("Unit not found in FactionDatabase: " + unit_name)
		return
	add_combatant(create_combatant(def), side, pos)

# ══════════════════════════════════════════════════════════════
# FACTION STATE INITIALIZATION
# ══════════════════════════════════════════════════════════════

func _init_faction_state(side: int, faction: int) -> void:
	faction_state[side] = FactionStateManager.create_faction_state(faction)


# ══════════════════════════════════════════════════════════════
# COMBATANT CREATION
# ══════════════════════════════════════════════════════════════

func create_combatant(definition: CombatantDefinition, override_name: String = "") -> Dictionary:
	var skill_list: Array[String] = []
	# All units get melee attack
	skill_list.append("attack_melee")
	# Ranged units also get ranged attack
	if definition.rng > 1:
		skill_list.append("attack_ranged")
	# Fragment users / magic
	if definition.has_special("Fragment User") or definition.has_special("Magic"):
		skill_list.append("basic_magic")
	# Commanders get Rally
	if definition.is_commander():
		skill_list.append("rally")
	# Ranged units get Overwatch (optional)
	if definition.rng > 1:
		skill_list.append("overwatch")
	# Append faction-specific skills based on specials
	_assign_faction_skills(definition, skill_list)
	# Append any skills from definition
	if definition.skills.size() > 0:
		for sk in definition.skills:
			if sk not in skill_list:
				skill_list.append(sk)

	var comb = {
		"name": definition.unit_name if override_name.is_empty() else override_name,
		"definition": definition,
		# ── Core Shardborne Stats ──
		"atk": definition.atk,
		"defense": definition.defense,
		"max_hp": definition.max_hp,
		"hp": definition.max_hp,
		"mov": definition.mov,
		"rng": definition.rng,
		"mor": definition.mor,
		"cmd": definition.cmd,
		"pts": definition.pts,
		# ── Combat State ──
		"alive": true,
		"shaken": false,
		"turn_taken": false,
		"has_charged": false,
		"atk_modifier": 0,
		"def_modifier": 0,
		"mor_modifier": 0,
		"mov_modifier": 0,
		# ── Faction-Specific State ──
		"corruption_tokens": 0,  # Nightfang: corruption on this unit
		"overwatch_active": false,
		"stance": "balanced",    # Veilbound stance
		"guarding": "",          # Honor Guard: name of unit being guarded
		"guarded_by": "",        # Honor Guard: name of unit guarding this one
		# ── Facing System ──
		"facing": GameRules.Facing.RIGHT,  # Updated on add_combatant based on side
		# ── Status Effects ──
		"status_effects": [],    # Array of active status effect keys
		# ── Legacy Compatibility ──
		"class": definition.class_t,
		"movement_class": definition.class_m,
		"movement": definition.movement,
		"initiative": definition.initiative,
		"skill_list": skill_list,
		# ── Visual ──
		"icon": definition.icon,
		"map_sprite": definition.map_sprite,
	}
	return comb

func _assign_faction_skills(def: CombatantDefinition, skills: Array) -> void:
	match def.faction:
		CombatantDefinition.Faction.EMBERCLAW:
			if def.has_special("Breath Weapon"):
				skills.append("flame_burst")
			if def.has_special("Fire"):
				skills.append("stoke_flames")
			if def.unit_type == CombatantDefinition.UnitType.CAVALRY:
				skills.append("inferno_charge")
			if def.is_commander():
				skills.append("heat_vent")

		CombatantDefinition.Faction.IRON_DOMINION:
			if def.has_special("Grid Node") or def.has_special("Shield Wall"):
				skills.append("shield_wall")
			if def.has_special("Fragment User"):
				skills.append("fragment_overload")
			if def.rng > 1 and def.has_special("Grid Node"):
				skills.append("coordinated_fire")
			if def.has_special("Repair") or def.unit_type == CombatantDefinition.UnitType.SUPPORT:
				skills.append("repair")
			if def.unit_type == CombatantDefinition.UnitType.ARTILLERY:
				skills.append("artillery_barrage")

		CombatantDefinition.Faction.NIGHTFANG:
			if def.has_special("Corruption Spread") or def.corruption_spread > 0:
				skills.append("corrupt_bite")
			if def.has_special("Blood") or def.is_commander():
				skills.append("blood_tithe")
			if def.has_special("Shadow Meld") or def.has_special("Mist Form"):
				skills.append("shadow_step")
			if def.has_special("Blood Drain"):
				skills.append("feast")
			if def.has_special("Terror"):
				skills.append("terror_shriek")

		CombatantDefinition.Faction.THORNWEFT:
			if def.has_special("Web-Walk") or def.rng > 1:
				skills.append("web_snare")
			if def.is_commander() or def.unit_type == CombatantDefinition.UnitType.SUPPORT:
				skills.append("fate_weave")
			if def.has_special("Silk Camouflage"):
				skills.append("gossamer_trap")
			if def.is_commander():
				skills.append("anchor_pulse")

		CombatantDefinition.Faction.VEILBOUND:
			if def.has_special("Stance"):
				skills.append("stance_strike")
			if def.unit_type == CombatantDefinition.UnitType.SUPPORT or def.is_commander():
				skills.append("ritual_channel")
			if def.has_special("Spirit Glide") or def.has_special("Void Resolve"):
				skills.append("phase_strike")
			if def.is_commander():
				skills.append("veil_walk")
			if def.has_special("Temple Vow"):
				skills.append("honor_guard")


# ══════════════════════════════════════════════════════════════
# TURN MANAGEMENT
# ══════════════════════════════════════════════════════════════

func sort_turn_queue(a, b):
	return combatants[b].initiative < combatants[a].initiative

func add_combatant(combatant: Dictionary, side: int, position: Vector2i):
	combatant["position"] = position
	combatant["side"] = side
	# Set default facing: player faces right, enemy faces left
	combatant["facing"] = GameRules.Facing.RIGHT if side == 0 else GameRules.Facing.LEFT
	combatants.append(combatant)
	groups[side].append(combatants.size() - 1)

	var new_combatant_sprite = Sprite2D.new()
	new_combatant_sprite.texture = combatant.map_sprite
	$"../Terrain/TileMap".add_child(new_combatant_sprite)
	new_combatant_sprite.position = Vector2(position * 32.0) + Vector2(16, 16)
	new_combatant_sprite.z_index = 1
	new_combatant_sprite.hframes = 2
	if side == 0:
		new_combatant_sprite.flip_h = true
	else:
		combatant["initiative"] -= 1
	combatant["sprite"] = new_combatant_sprite

	# Floating HP bar + side border
	var label_node = Node2D.new()
	label_node.set_script(UnitLabel)
	label_node.combatant = combatant
	label_node.side_color = Color(0.4, 0.8, 1.0) if side == 0 else Color(1.0, 0.45, 0.35)
	new_combatant_sprite.add_child(label_node)
	combatant["label_node"] = label_node

	turn_queue.append(combatants.size() - 1)
	turn_queue.sort_custom(sort_turn_queue)
	emit_signal("combatant_added", combatant)

func get_current_combatant():
	return combatants[current_combatant]

## Update the active-unit highlight ring on the map
func _update_active_highlight(active_comb: Dictionary) -> void:
	for comb in combatants:
		var label = comb.get("label_node")
		if label != null:
			label.is_active = (comb == active_comb)

## Set hover state on a combatant's label (called by CController on mouse move)
func set_hovered_combatant(hovered_comb) -> void:
	for comb in combatants:
		var label = comb.get("label_node")
		if label != null:
			label.is_hovered = (comb == hovered_comb)

func get_distance(attacker: Dictionary, target: Dictionary) -> int:
	var p1 = attacker.position
	var p2 = target.position
	return absi(p1.x - p2.x) + absi(p1.y - p2.y)

func set_next_combatant():
	turn += 1
	if turn >= turn_queue.size():
		# ── New Round ──
		round_number += 1
		# Reset modifiers BEFORE round-start effects so corruption/buffs stick
		for comb in combatants:
			comb.turn_taken = false
			comb.has_charged = false
			comb.atk_modifier = 0
			comb.def_modifier = 0
			comb.mor_modifier = 0
			comb.mov_modifier = 0
			comb.overwatch_active = false
		_on_round_start()
		turn = 0
	current_combatant = turn_queue[turn]

func advance_turn():
	if _combat_over:
		return
	combatants[current_combatant].turn_taken = true
	set_next_combatant()
	var safety := 0
	while !combatants[current_combatant].alive:
		set_next_combatant()
		safety += 1
		if safety > combatants.size():
			combat_finish()
			return
	var comb = combatants[current_combatant]

	# Per-unit turn start effects (may skip turn via return, but never recurse)
	if _on_unit_turn_start(comb):
		return  # Unit's turn was consumed (e.g. corruption); _on_unit_turn_start calls advance_turn itself

	# Update active unit highlight on map
	_update_active_highlight(comb)

	emit_signal("turn_advanced", comb)
	emit_signal("update_combatants", combatants)

	# Update faction UI for active side
	if game_ui.has_method("update_faction_resources"):
		game_ui.update_faction_resources(faction_state[comb.side])

	if comb.side == 1:
		await get_tree().create_timer(0.6).timeout
		ai_process(comb)


# ══════════════════════════════════════════════════════════════
# ROUND EVENTS
# ══════════════════════════════════════════════════════════════

func _on_round_start():
	# Faction-themed round herald
	var herald_lines := []
	for side in [0, 1]:
		var faction = side_faction[side]
		if faction in ROUND_HERALD:
			var lines = ROUND_HERALD[faction]
			# Pick early/mid/late based on round
			var idx = clampi(round_number - 1, 0, lines.size() - 1)
			herald_lines.append(lines[idx])
	var herald_text := ""
	if herald_lines.size() > 0:
		herald_text = " — %s" % herald_lines[0]
	update_information.emit("\n[color=gold]═══ Round %d ═══[/color][color=#CCAA66][i]%s[/i][/color]\n" % [round_number, herald_text])
	GameStateMachine.start_round(round_number)

	# Score objectives from previous round
	if scenario_manager and round_number > 1:
		scenario_manager.on_round_end(round_number - 1)
		update_information.emit("[color=silver]%s[/color]\n" % scenario_manager.get_vp_text())

	# Generate CP for both sides
	_generate_command_points(0)
	_generate_command_points(1)

	# Draw cards
	_draw_cards(0, GameRules.DRAW_PER_TURN)
	_draw_cards(1, GameRules.DRAW_PER_TURN)

	# Enforce hand limit (discard excess)
	_enforce_hand_limit(0)
	_enforce_hand_limit(1)

	# Update card hand UI for player
	if game_ui and game_ui.has_method("update_card_hand"):
		game_ui.update_card_hand(card_hands[0])

	# Faction-specific round start
	for side in [0, 1]:
		_faction_round_start(side)

	# Update phase indicator
	if game_ui.has_method("update_phase"):
		game_ui.update_phase("Round %d" % round_number)

func _generate_command_points(side: int):
	var cp := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive and comb.cmd > 0:
			cp += comb.cmd
	# Apply commander-death CP penalty
	cp = maxi(0, cp - _commander_dead_cp_penalty[side])
	command_points[side] += cp
	if cp > 0:
		var faction = side_faction[side]
		var faction_name = _get_faction_name(side)
		var verb = CP_FLAVOR.get(faction, "generates")
		var penalty_text = ""
		if _commander_dead_cp_penalty[side] > 0:
			penalty_text = " (-%d commander loss)" % _commander_dead_cp_penalty[side]
		update_information.emit("[color=silver]%s's %s %d CP%s (total: %d)[/color]\n" % [faction_name, verb, cp, penalty_text, command_points[side]])

func _faction_round_start(side: int):
	var faction = side_faction[side]
	var state = faction_state[side]
	_faction_mgr.process_round_start(side, faction, state, combatants, groups)

	# Veilbound: AI auto-switches stances during Command Phase
	if faction == CombatantDefinition.Faction.VEILBOUND and side == 1:
		_ai_veilbound_stance_switch(side)


## Player-callable: switch a Veilbound unit's stance (free action during Command Phase).
func switch_unit_stance(comb: Dictionary, new_stance: String) -> bool:
	return _faction_mgr.switch_stance(comb, new_stance)


## AI: Decide stances for Veilbound units. Aggressive when behind, defensive when ahead.
func _ai_veilbound_stance_switch(side: int) -> void:
	var my_alive := 0
	var enemy_alive := 0
	var opp_side = 1 - side
	for idx in groups[side]:
		if combatants[idx].alive:
			my_alive += 1
	for idx in groups[opp_side]:
		if combatants[idx].alive:
			enemy_alive += 1
	# If losing (fewer units) go aggressive, if winning go defensive
	var prefer_revelation = my_alive <= enemy_alive
	for idx in groups[side]:
		var comb = combatants[idx]
		if not comb.alive:
			continue
		if comb.definition.faction != CombatantDefinition.Faction.VEILBOUND:
			continue
		var utype = comb.definition.unit_type
		if utype != CombatantDefinition.UnitType.INFANTRY and utype != CombatantDefinition.UnitType.CAVALRY:
			continue
		# Front-line infantry: match strategy, cavalry: always revelation for aggression
		var target_stance = "revelation" if (prefer_revelation or utype == CombatantDefinition.UnitType.CAVALRY) else "honor"
		if comb.get("stance", "") != target_stance:
			_faction_mgr.switch_stance(comb, target_stance)

## Returns true if the unit's turn was consumed (skip further processing).
func _on_unit_turn_start(comb: Dictionary) -> bool:
	if _combat_over:
		return true
	# ── Terrain effects at start of turn ──
	_apply_terrain_effects(comb)
	if _combat_over or not comb.alive:
		if not _combat_over:
			advance_turn()
		return true

	# Burning damage + extinguish roll + DEF penalty
	if "burning" in comb.status_effects:
		update_information.emit("[color=orange]%s burns for 1 damage! (-1 DEF)[/color]\n" % comb.name)
		comb.def_modifier -= 1  # Burning applies -1 DEF
		apply_damage(comb, 1)
		if _combat_over:
			return true
		if not comb.alive:
			advance_turn()
			return true
		# Extinguish roll: 4+ on d6
		var extinguish_roll = randi_range(1, 6)
		if extinguish_roll >= 4:
			comb.status_effects.erase("burning")
			comb.def_modifier += 1  # Remove the DEF penalty
			update_information.emit("[color=lime]%s extinguishes the flames! (rolled %d)[/color]\n" % [comb.name, extinguish_roll])
		else:
			update_information.emit("[color=orange]  Extinguish failed (rolled %d, need 4+)[/color]\n" % extinguish_roll)

	# Staggered wears off after 1 turn
	if "staggered" in comb.status_effects:
		comb.status_effects.erase("staggered")
		comb.atk_modifier += 1   # Remove the -1 ATK
		comb.mov_modifier += 2   # Remove the -2 MOV
		update_information.emit("[color=silver]%s recovers from Stagger.[/color]\n" % comb.name)

	# Severed wears off after 1 turn
	if "severed" in comb.status_effects:
		comb.status_effects.erase("severed")
		update_information.emit("[color=silver]%s's faction link is restored.[/color]\n" % comb.name)

	# Regeneration keyword: heal 1 HP at start of turn
	if comb.definition.has_special("Regeneration") and comb.hp < comb.max_hp:
		comb.hp = mini(comb.hp + 1, comb.max_hp)
		update_information.emit("[color=green]%s regenerates 1 HP (%d/%d)[/color]\n" % [comb.name, comb.hp, comb.max_hp])
		update_combatants.emit(combatants)

	# Routed units must flee every turn
	if "routed" in comb.status_effects:
		_apply_routed_flee(comb)
		if _combat_over:
			return true
		if not comb.alive:
			advance_turn()
			return true
		advance_turn()
		return true  # Routed units can't do anything else

	# Corruption effects
	if comb.corruption_tokens >= 9:
		# Consumed: roll d6, on 1-2 cannot act
		var roll = randi_range(1, 6)
		if roll <= 2:
			update_information.emit("[color=purple]%s is Consumed by corruption and cannot act! (rolled %d)[/color]\n" % [
				comb.name, roll])
			advance_turn()
			return true

	return false


# ══════════════════════════════════════════════════════════════
# SHARDBORNE COMBAT — d6 Dice Pool
# ══════════════════════════════════════════════════════════════

## auto_advance: if true (default), calls advance_turn() at end. Set false for overwatch.
func attack(attacker: Dictionary, target: Dictionary, attack_key: String, auto_advance: bool = true):
	if _combat_over:
		return

	# Non-Combatant units cannot attack
	if attacker.definition.has_special("Non-Combatant"):
		update_information.emit("[color=red]%s is a Non-Combatant and cannot attack.[/color]\n" % attacker.name)
		if attacker.side == 1:
			advance_turn()
		return

	# Engaged units cannot use ranged attacks
	if attack_key != "attack_melee" and "engaged" in attacker.get("status_effects", []):
		update_information.emit("[color=red]%s is engaged and cannot shoot![/color]\n" % attacker.name)
		if attacker.side == 1:
			advance_turn()
		return

	var distance = get_distance(attacker, target)

	# Determine range based on attack type
	var max_range: int = 1
	if attack_key == "attack_ranged":
		max_range = attacker.rng
	elif attack_key == "basic_magic":
		max_range = maxi(attacker.rng, 6)
	# Melee is always range 1

	if distance > max_range:
		update_information.emit("Target out of range (%d / %d).\n" % [distance, max_range])
		if attacker.side == 1:
			advance_turn()
		return

	if distance > 1 and attack_key == "attack_melee":
		update_information.emit("Target too far for melee.\n")
		if attacker.side == 1:
			advance_turn()
		return

	# Stealthed units can't be targeted at range beyond 4 tiles
	if "stealthed" in target.get("status_effects", []):
		if distance > 4 and attack_key != "attack_melee":
			update_information.emit("[color=dark_violet]%s is hidden in the shadows — too far to target![/color]\n" % target.name)
			if attacker.side == 1:
				advance_turn()
			return

	# ── Line of Sight check for ranged attacks ──
	if attack_key != "attack_melee":
		# Indirect Fire keyword ignores LoS
		if not attacker.definition.has_special("Indirect Fire"):
			var los_result = _check_line_of_sight(attacker, target)
			if los_result == GameRules.LOS_BLOCKED_PENALTY:
				update_information.emit("[color=red]No line of sight to %s — blocked by terrain![/color]\n" % target.name)
				if attacker.side == 1:
					advance_turn()
				return
			elif los_result < 0:
				atk_mod += los_result
				update_information.emit("[color=silver]  (LoS obstructed: %d ATK penalty)[/color]\n" % los_result)
		else:
			# Indirect Fire: -1 ATK if no spotter
			var has_spotter := false
			for idx in groups[attacker.side]:
				var ally = combatants[idx]
				if ally != attacker and ally.alive and get_distance(ally, target) <= 8:
					has_spotter = true
					break
			if not has_spotter:
				atk_mod -= 1
				update_information.emit("[color=silver]  (Indirect Fire without spotter: -1 ATK)[/color]\n")

	# ── Calculate modifiers ──
	var atk_mod: int = attacker.atk_modifier
	var def_mod: int = target.def_modifier

	# Shaken attacker penalty
	if attacker.shaken:
		atk_mod -= 1

	# Charging bonus
	if attacker.has_charged and attack_key == "attack_melee":
		# Turn 1 restriction: no charges
		if round_number <= 1:
			attacker.has_charged = false
			update_information.emit("[color=gray]  (Charge negated — Turn 1 restriction)[/color]\n")
		else:
			atk_mod += GameRules.COMBAT_MODIFIERS.get("charging", {}).get("atk_mod", 1)
		# Momentum Strike: additional +1 ATK on charge
		if attacker.definition.has_special("Momentum Strike"):
			atk_mod += 1
			update_information.emit("[color=silver]  (Momentum Strike +1 ATK)[/color]\n")

	# ── Flanking/Rear bonus using facing system ──
	if attack_key == "attack_melee":
		var arc = _check_attack_arc(attacker, target)
		if arc == 2:
			atk_mod += GameRules.REAR_ATK_BONUS
			update_information.emit("[color=silver]  (Rear attack +%d ATK!)[/color]\n" % GameRules.REAR_ATK_BONUS)
		elif arc == 1:
			atk_mod += GameRules.FLANK_ATK_BONUS
			update_information.emit("[color=silver]  (Flanking +%d ATK)[/color]\n" % GameRules.FLANK_ATK_BONUS)

	# ── Terrain cover bonus on target DEF (ranged attacks only) ──
	if attack_key != "attack_melee":
		# Breath Weapon and Sniper ignore cover
		if not attacker.definition.has_special("Breath Weapon") and not attacker.definition.has_special("Sniper"):
			var cover_bonus := _get_terrain_cover(target)
			if cover_bonus > 0:
				def_mod += cover_bonus
				update_information.emit("[color=silver]  (Cover +%d DEF)[/color]\n" % cover_bonus)
		else:
			if attacker.definition.has_special("Breath Weapon"):
				update_information.emit("[color=silver]  (Breath Weapon ignores cover)[/color]\n")
			elif attacker.definition.has_special("Sniper"):
				update_information.emit("[color=silver]  (Sniper ignores cover)[/color]\n")

	# Corruption penalty on target's DEF
	if target.corruption_tokens > 0:
		var corruption_def_pen = _get_corruption_def_penalty(target.corruption_tokens)
		def_mod += corruption_def_pen  # Negative value = easier to hit

	# Faction-specific attack modifiers
	atk_mod += _get_faction_attack_bonus(attacker, target, attack_key)
	def_mod += _get_faction_defense_bonus(target)

	# ── Drake Bond ATK bonus: +1 ATK when within 6 tiles of bonded partner ──
	var drake_bond_bonus = _faction_mgr.get_drake_bond_atk_bonus(attacker, combatants)
	if drake_bond_bonus > 0:
		atk_mod += drake_bond_bonus
		update_information.emit("[color=orange]  (Drake Bond: +%d ATK)[/color]\n" % drake_bond_bonus)

	# ── Elevated terrain: +1 ATK for ranged attacks from elevated position ──
	if attack_key != "attack_melee":
		var attacker_terrain = _get_terrain_type_at(attacker.position)
		if attacker_terrain == "difficult":  # Elevated/forest = cost 2
			atk_mod += GameRules.COMBAT_MODIFIERS.get("elevated", {}).get("atk_mod", 1)
			update_information.emit("[color=silver]  (Elevated: +1 ATK)[/color]\n")

	# ── Roll dice ──
	var dice_count: int = maxi(1, attacker.atk + atk_mod)
	var target_def: int = maxi(2, target.defense + def_mod)
	# Sharpshot: crits on 5+ instead of 6
	var crit_threshold := 6
	if attacker.definition.has_special("Sharpshot"):
		crit_threshold = 5
	# Severed: no faction abilities (no keyword bonuses) — already handled above
	var result = _roll_attack_dice(dice_count, target_def, crit_threshold)

	# ── Keyword damage modifiers ──
	# Siege: double damage to War Machines/structures
	if attacker.definition.has_special("Siege") and target.definition.is_war_machine():
		result.total_damage *= 2
		update_information.emit("[color=silver]  (Siege: double damage!)[/color]\n")

	# Fire Resistant: half damage from fire attacks (round down, min 1)
	if target.definition.has_special("Fire Resistant") and attacker.definition.has_special("Fire"):
		result.total_damage = maxi(1, result.total_damage / 2)
		update_information.emit("[color=silver]  (Fire Resistant: damage halved)[/color]\n")

	# Fire Immune: no damage from fire attacks
	if target.definition.has_special("Fire Immune") and attacker.definition.has_special("Fire"):
		result.total_damage = 0
		update_information.emit("[color=silver]  (Fire Immune!)[/color]\n")

	# Ethereal: 50% chance per hit to ignore non-magical damage
	if target.definition.has_special("Ethereal") and not attacker.definition.has_special("Magic") and not attacker.definition.has_special("Fragment User"):
		var ethereal_blocked := 0
		for i in range(result.hits):
			if randi_range(1, 2) == 1:
				ethereal_blocked += 1
		if ethereal_blocked > 0:
			result.total_damage = maxi(0, result.total_damage - ethereal_blocked)
			update_information.emit("[color=silver]  (Ethereal blocks %d hits)[/color]\n" % ethereal_blocked)

	# ── Format roll output ──
	var rolls_str = ""
	for r in result.rolls:
		if r == 6:
			rolls_str += "[color=gold]%d[/color] " % r
		elif r >= target_def:
			rolls_str += "[color=lime]%d[/color] " % r
		else:
			rolls_str += "[color=gray]%d[/color] " % r

	update_information.emit("[color=yellow]%s[/color] attacks [color=red]%s[/color] — [%dd6 vs DEF %d]\n" % [
		attacker.name, target.name, dice_count, target_def])
	update_information.emit("Rolls: %s→ [color=lime]%d hits[/color], [color=gold]%d crits[/color]\n" % [
		rolls_str, result.hits, result.crits])

	# ── Apply damage ──
	if result.total_damage > 0:
		var actual_target = target
		# Honor Guard: redirect damage to guardian if present
		if target.guarded_by != "":
			for c in combatants:
				if c.alive and c.name == target.guarded_by:
					update_information.emit("[color=cyan]%s intercepts the blow for %s![/color]\n" % [c.name, target.name])
					actual_target = c
					# Clear guard after use
					c.guarding = ""
					target.guarded_by = ""
					break
		apply_damage(actual_target, result.total_damage)

		# Post-hit effects
		_on_attack_hit(attacker, actual_target, result, attack_key)

		# Consolidate: after melee kill, move 3 tiles toward nearest enemy
		if attack_key == "attack_melee" and not actual_target.alive and attacker.alive:
			if controller and controller.has_method("apply_consolidate"):
				controller.apply_consolidate(attacker)
	else:
		update_information.emit("No damage dealt.\n")

	# Post-attack faction effects
	_on_attack_complete(attacker, target, attack_key)

	# ── Blast keyword: hit all other units within 2 tiles of target ──
	if attacker.definition.has_special("Blast") and result.total_damage > 0:
		var blast_radius := 2
		update_information.emit("[color=orange]BLAST! Hits all units within %d tiles![/color]\n" % blast_radius)
		var blast_targets: Array = []
		for c in combatants:
			if c.alive and c != target and c != attacker:
				if get_distance(target, c) <= blast_radius:
					blast_targets.append(c)
		for bt in blast_targets:
			var blast_dmg := maxi(1, result.total_damage / 2)  # Half damage to splash
			update_information.emit("[color=orange]  Blast hits %s for %d![/color]\n" % [bt.name, blast_dmg])
			apply_damage(bt, blast_dmg)
			if _combat_over:
				return

	# Attacking breaks stealth
	if "stealthed" in attacker.get("status_effects", []):
		attacker.status_effects.erase("stealthed")
		update_information.emit("[color=gray]%s breaks stealth![/color]\n" % attacker.name)

	if _check_combat_over():
		return

	if auto_advance:
		advance_turn()

func _check_combat_over() -> bool:
	if _combat_over:
		return true
	if groups[Group.ENEMIES].size() < 1 or groups[Group.PLAYERS].size() < 1:
		combat_finish()
		return true
	return false

func _roll_attack_dice(dice_count: int, target_def: int, crit_threshold: int = 6) -> Dictionary:
	var hits := 0
	var crits := 0
	var rolls: Array = []
	for i in range(dice_count):
		var roll := randi_range(1, 6)
		rolls.append(roll)
		if roll >= crit_threshold:
			crits += 1
			hits += 1
		elif roll >= target_def:
			hits += 1
	var total_damage: int = (hits - crits) + (crits * 2)
	return {"hits": hits, "crits": crits, "total_damage": total_damage, "rolls": rolls}

func apply_damage(target: Dictionary, damage: int) -> void:
	target.hp -= damage
	update_combatants.emit(combatants)
	update_information.emit("[color=red]%s[/color] takes [color=gray]%d damage[/color] (%d/%d HP)\n" % [
		target.name, damage, maxi(0, target.hp), target.max_hp])
	if target.hp <= 0:
		combatant_die(target)
	elif target.hp <= target.max_hp / 2:
		# Check morale when below half HP
		check_morale(target)

# Named attack shortcuts for UI skill buttons
func attack_melee(attacker: Dictionary, target: Dictionary):
	attack(attacker, target, "attack_melee")

func attack_ranged(attacker: Dictionary, target: Dictionary):
	attack(attacker, target, "attack_ranged")

func basic_magic(attacker: Dictionary, target: Dictionary):
	attack(attacker, target, "basic_magic")


# ══════════════════════════════════════════════════════════════
# POSITIONAL COMBAT HELPERS
# ══════════════════════════════════════════════════════════════

## Check if the attacker is flanking or rear-attacking the target using facing.
## Returns: 0 = frontal, 1 = flank (+1 ATK), 2 = rear (+2 ATK)
func _check_attack_arc(attacker: Dictionary, target: Dictionary) -> int:
	var apos: Vector2i = attacker.position
	var tpos: Vector2i = target.position
	var dx: int = apos.x - tpos.x
	var dy: int = apos.y - tpos.y

	# Determine if attacker is in front, side, or rear arc based on target's facing
	var target_facing: int = target.get("facing", GameRules.Facing.RIGHT)
	var is_rear := false
	var is_flank := false

	match target_facing:
		GameRules.Facing.RIGHT:
			if dx < 0: is_rear = true      # Attacker is to the LEFT (behind)
			elif dy != 0 and dx == 0: is_flank = true  # Attacker is above/below
		GameRules.Facing.LEFT:
			if dx > 0: is_rear = true       # Attacker is to the RIGHT (behind)
			elif dy != 0 and dx == 0: is_flank = true
		GameRules.Facing.UP:
			if dy > 0: is_rear = true       # Attacker is BELOW (behind)
			elif dx != 0 and dy == 0: is_flank = true
		GameRules.Facing.DOWN:
			if dy < 0: is_rear = true       # Attacker is ABOVE (behind)
			elif dx != 0 and dy == 0: is_flank = true

	# Honor Stance: cannot be flanked
	if target.get("stance") == "honor":
		is_flank = false
		is_rear = false

	if is_rear:
		return 2
	elif is_flank:
		return 1
	return 0

## Legacy flanking check (now uses facing)
func _check_flanking(attacker: Dictionary, target: Dictionary) -> bool:
	return _check_attack_arc(attacker, target) >= 1

## Get terrain cover bonus for the target's position (for ranged attacks).
## Reads tile terrain type and returns DEF bonus from GameRules.
func _get_terrain_cover(target: Dictionary) -> int:
	if controller == null or controller.tile_map == null:
		return 0
	var tile_data = controller.tile_map.get_cell_tile_data(0, target.position)
	if tile_data == null:
		return 0
	var cost = int(tile_data.get_custom_data("Cost"))
	# Cover heuristic: forest/ruins (cost 2) = light cover, walls/buildings (cost 3+) = heavy cover
	if cost >= 3:
		return GameRules.COMBAT_MODIFIERS.get("cover_heavy", {}).get("def_mod", 2)
	elif cost >= 2:
		return GameRules.COMBAT_MODIFIERS.get("cover_light", {}).get("def_mod", 1)
	return 0

## Check Line of Sight between two combatants using Bresenham line.
## Returns: 0 = clear, -1/-2 = cover penalty, LOS_BLOCKED_PENALTY = blocked.
func _check_line_of_sight(attacker: Dictionary, target: Dictionary) -> int:
	if controller == null or controller.tile_map == null:
		return 0
	var from: Vector2i = attacker.position
	var to: Vector2i = target.position
	var tiles_along_path := _bresenham_line(from, to)
	var worst_cover := 0
	for tile in tiles_along_path:
		if tile == from or tile == to:
			continue
		var tile_data = controller.tile_map.get_cell_tile_data(0, tile)
		if tile_data == null:
			continue
		var cost = int(tile_data.get_custom_data("Cost"))
		# Impassable terrain blocks LoS entirely
		if cost < 0 or cost >= 99:
			return GameRules.LOS_BLOCKED_PENALTY
		# Heavy terrain along path = cover penalty
		if cost >= 3:
			worst_cover = mini(worst_cover, GameRules.LOS_HEAVY_COVER_ATK_PENALTY)
		elif cost >= 2:
			worst_cover = mini(worst_cover, GameRules.LOS_LIGHT_COVER_ATK_PENALTY)
	return worst_cover

## Bresenham line algorithm: returns all tiles between two points
func _bresenham_line(from: Vector2i, to: Vector2i) -> Array[Vector2i]:
	var result: Array[Vector2i] = []
	var dx := absi(to.x - from.x)
	var dy := absi(to.y - from.y)
	var sx := 1 if from.x < to.x else -1
	var sy := 1 if from.y < to.y else -1
	var err := dx - dy
	var x := from.x
	var y := from.y
	while true:
		result.append(Vector2i(x, y))
		if x == to.x and y == to.y:
			break
		var e2 := 2 * err
		if e2 > -dy:
			err -= dy
			x += sx
		if e2 < dx:
			err += dx
			y += sy
	return result

## Check if an attacker is adjacent to any enemy (engaged in melee)
func is_adjacent_to_enemy(comb: Dictionary) -> bool:
	var pos: Vector2i = comb.position
	for idx in groups[1 - comb.side]:
		var enemy = combatants[idx]
		if enemy.alive:
			var dist = absi(pos.x - enemy.position.x) + absi(pos.y - enemy.position.y)
			if dist <= 1:
				return true
	return false

## Apply terrain effects to a combatant based on their current tile
func _apply_terrain_effects(comb: Dictionary) -> void:
	if controller == null or controller.tile_map == null:
		return
	var tile_data = controller.tile_map.get_cell_tile_data(0, comb.position)
	if tile_data == null:
		comb["_in_cover"] = false
		return
	var cost = int(tile_data.get_custom_data("Cost"))

	# Track whether unit is in cover (used by Nocturnal Predators, etc.)
	comb["_in_cover"] = cost >= 2 and cost < 99  # Difficult or heavy cover

	# Elevated terrain: +1 ATK for ranged, +1 DEF
	if cost == 2:  # Elevated/forest terrain
		# Already handled via cover system
		pass

## Get terrain type string for a tile position
func _get_terrain_type_at(pos: Vector2i) -> String:
	if controller == null or controller.tile_map == null:
		return "open"
	var tile_data = controller.tile_map.get_cell_tile_data(0, pos)
	if tile_data == null:
		return "open"
	var cost = int(tile_data.get_custom_data("Cost"))
	if cost < 0 or cost >= 99:
		return "impassable"
	elif cost >= 3:
		return "heavy_cover"
	elif cost >= 2:
		return "difficult"
	return "open"

## Check if a tile is water terrain (prevents charging)
func _is_water_terrain(pos: Vector2i) -> bool:
	# Water terrain has cost 2 and specific tile type — for now heuristic
	return false  # Will be populated when terrain system is expanded


# ══════════════════════════════════════════════════════════════
# FACTION COMBAT MODIFIERS
# ══════════════════════════════════════════════════════════════

func _get_faction_attack_bonus(attacker: Dictionary, target: Dictionary, attack_key: String) -> int:
	return _faction_mgr.get_faction_attack_bonus(attacker, target, attack_key, faction_state, combatants, groups)

func _get_faction_defense_bonus(target: Dictionary) -> int:
	return _faction_mgr.get_faction_defense_bonus(target, faction_state, combatants, groups)

func _on_attack_hit(attacker: Dictionary, target: Dictionary, result: Dictionary, attack_key: String):
	_faction_mgr.on_attack_hit(attacker, target, result, attack_key, faction_state)
	# Blood Drain visual update
	if attacker.definition.has_special("Blood Drain") and not target.alive:
		update_combatants.emit(combatants)

func _on_attack_complete(attacker: Dictionary, target: Dictionary, attack_key: String):
	_faction_mgr.on_attack_complete(attacker, target, attack_key, faction_state)


# ══════════════════════════════════════════════════════════════
# FACTION SKILL WRAPPERS → FactionSkillManager
# ══════════════════════════════════════════════════════════════
# These thin wrappers keep the `combat.call(skill_key, attacker, target)` dispatch
# working from CController while the real logic lives in FactionSkillManager.

func flame_burst(attacker: Dictionary, target: Dictionary): _skill_manager.flame_burst(self, attacker, target)
func stoke_flames(attacker: Dictionary, target: Dictionary): _skill_manager.stoke_flames(self, attacker, target)
func inferno_charge(attacker: Dictionary, target: Dictionary): _skill_manager.inferno_charge(self, attacker, target)
func heat_vent(attacker: Dictionary, target: Dictionary): _skill_manager.heat_vent(self, attacker, target)
func pyroclasm(attacker: Dictionary, target: Dictionary): _skill_manager.pyroclasm(self, attacker, target)
func shield_wall(attacker: Dictionary, target: Dictionary): _skill_manager.shield_wall(self, attacker, target)
func fragment_overload(attacker: Dictionary, target: Dictionary): _skill_manager.fragment_overload(self, attacker, target)
func coordinated_fire(attacker: Dictionary, target: Dictionary): _skill_manager.coordinated_fire(self, attacker, target)
func repair(attacker: Dictionary, target: Dictionary): _skill_manager.repair(self, attacker, target)
func artillery_barrage(attacker: Dictionary, target: Dictionary): _skill_manager.artillery_barrage(self, attacker, target)
func corrupt_bite(attacker: Dictionary, target: Dictionary): _skill_manager.corrupt_bite(self, attacker, target)
func blood_tithe(attacker: Dictionary, target: Dictionary): _skill_manager.blood_tithe(self, attacker, target)
func shadow_step(attacker: Dictionary, target: Dictionary): _skill_manager.shadow_step(self, attacker, target)
func feast(attacker: Dictionary, target: Dictionary): _skill_manager.feast(self, attacker, target)
func terror_shriek(attacker: Dictionary, target: Dictionary): _skill_manager.terror_shriek(self, attacker, target)
func web_snare(attacker: Dictionary, target: Dictionary): _skill_manager.web_snare(self, attacker, target)
func fate_weave(attacker: Dictionary, target: Dictionary): _skill_manager.fate_weave(self, attacker, target)
func gossamer_trap(attacker: Dictionary, target: Dictionary): _skill_manager.gossamer_trap(self, attacker, target)
func anchor_pulse(attacker: Dictionary, target: Dictionary): _skill_manager.anchor_pulse(self, attacker, target)
func natures_wrath(attacker: Dictionary, target: Dictionary): _skill_manager.natures_wrath(self, attacker, target)
func stance_strike(attacker: Dictionary, target: Dictionary): _skill_manager.stance_strike(self, attacker, target)
func ritual_channel(attacker: Dictionary, target: Dictionary): _skill_manager.ritual_channel(self, attacker, target)
func phase_strike(attacker: Dictionary, target: Dictionary): _skill_manager.phase_strike(self, attacker, target)
func veil_walk(attacker: Dictionary, target: Dictionary): _skill_manager.veil_walk(self, attacker, target)
func honor_guard(attacker: Dictionary, target: Dictionary): _skill_manager.honor_guard(self, attacker, target)

## Rally (universal commander ability)
func rally(attacker: Dictionary, target: Dictionary): _skill_manager.rally(self, attacker, target)

## Overwatch
func overwatch(attacker: Dictionary, target: Dictionary): _skill_manager.overwatch(self, attacker, target)


# ══════════════════════════════════════════════════════════════
# FACTION HELPERS → FactionStateManager
# ══════════════════════════════════════════════════════════════

func _get_grid_tier(comb: Dictionary) -> Dictionary:
	return _faction_mgr.get_grid_tier(comb, combatants, groups)

func _recalculate_grid_cohesion(side: int):
	_faction_mgr.recalculate_grid_cohesion(side, faction_state[side], combatants, groups)

func _get_corruption_def_penalty(tokens: int) -> int:
	return FactionStateManager.get_corruption_def_penalty(tokens)

func _process_corruption_effects():
	_faction_mgr.process_corruption_effects(combatants)

func _update_hunger_tier(side: int):
	FactionStateManager.update_hunger_tier(faction_state[side])

func _count_web_anchors(side: int) -> int:
	return FactionStateManager.count_web_anchors(faction_state[side])

func _get_web_tier(comb: Dictionary) -> Dictionary:
	return _faction_mgr.get_web_tier(comb, faction_state, combatants, groups)

func _update_flow_tier(side: int):
	FactionStateManager.update_flow_tier(faction_state[side])

func _count_adjacent_allies(comb: Dictionary) -> int:
	return _faction_mgr.count_adjacent_allies(comb, combatants, groups)

func _count_nearby_with_special(comb: Dictionary, special: String, range_tiles: int) -> int:
	return _faction_mgr.count_nearby_with_special(comb, special, range_tiles, combatants, groups)


# ══════════════════════════════════════════════════════════════
# MORALE (Shardborne)
# ══════════════════════════════════════════════════════════════

func roll_morale(comb: Dictionary) -> Dictionary:
	var d1 := randi_range(1, 6)
	var d2 := randi_range(1, 6)
	var total := d1 + d2
	var mor: int = comb.mor + comb.mor_modifier
	var aura_applied := false
	# Commander aura: +1 MOR if commander within 8 tiles
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and ally.definition.is_commander():
			if get_distance(comb, ally) <= 8:
				mor += 1
				aura_applied = true
				break
	if aura_applied:
		update_information.emit("[color=silver]  (%s gains +1 MOR from commander aura)[/color]\n" % comb.name)

	# Terror aura: -1 MOR if enemy with Terror/Terrifying within 6 tiles
	# (Units with Void Resolve are immune to Terror)
	var terror_applied := false
	if not comb.definition.has_special("Void Resolve"):
		for idx in groups[1 - comb.side]:
			var enemy = combatants[idx]
			if enemy.alive and (enemy.definition.has_special("Terror") or enemy.definition.has_special("Terrifying")):
				if get_distance(comb, enemy) <= 6:
					mor -= 1
					terror_applied = true
					break
		if terror_applied:
			update_information.emit("[color=purple]  (%s suffers -1 MOR from Terror!)[/color]\n" % comb.name)

	# Inspiring aura: +1 MOR if ally with Inspiring within 3 tiles
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and ally.definition.has_special("Inspiring"):
			if get_distance(comb, ally) <= 3:
				mor += 1
				update_information.emit("[color=silver]  (%s +1 MOR from Inspiring ally)[/color]\n" % comb.name)
				break

	var passed := total <= mor
	var margin := mor - total
	return {"passed": passed, "d1": d1, "d2": d2, "total": total, "mor": mor, "margin": margin}

func check_morale(comb: Dictionary) -> void:
	if comb.mor >= 10:
		return  # Fearless
	if comb.definition.has_special("Fearless"):
		return
	if comb.definition.has_special("Thrall") or comb.definition.has_special("Expendable"):
		return  # No morale check needed
	# Shaken units check at -2 per core.js
	var shaken_penalty := -2 if comb.shaken else 0

	var result = roll_morale(comb)
	# Apply shaken penalty to the effective margin
	result.margin += shaken_penalty
	var faction = side_faction[comb.side]
	var flavor = MORALE_FLAVOR.get(faction, ["Holds firm.", "%s wavers!", "%s flees!"])
	if result.passed and result.margin + shaken_penalty >= 0:
		update_information.emit("[color=lime]%s[/color] passes morale (%d vs MOR %d) — [i]%s[/i]\n" % [
			comb.name, result.total, result.mor, flavor[0]])
	else:
		# Determine Shaken vs Routed
		var fail_margin = result.total - result.mor - shaken_penalty
		if fail_margin >= GameRules.MORALE_ROUTED_THRESHOLD or comb.shaken:
			# ROUTED — unit must flee toward board edge
			update_information.emit("[color=red]%s[/color] ROUTED! — [i]%s[/i]\n" % [comb.name, flavor[2] % comb.name])
			if "routed" not in comb.status_effects:
				comb.status_effects.append("routed")
			# Routed units immediately flee this turn
			_apply_routed_flee(comb)
		else:
			comb.shaken = true
			if "shaken" not in comb.status_effects:
				comb.status_effects.append("shaken")
			update_information.emit("[color=orange]%s[/color] is SHAKEN (%d vs MOR %d) — [i]%s[/i]\n" % [
				comb.name, result.total, result.mor, flavor[1] % comb.name])

## Routed units flee toward their board edge. If they reach it, they're removed.
func _apply_routed_flee(comb: Dictionary) -> void:
	if not comb.alive:
		return
	var edge_x: int = 0 if comb.side == 0 else 35  # Player flees left, enemy flees right
	var pos: Vector2i = comb.position
	var flee_dist: int = comb.mov + comb.mov_modifier
	var direction := -1 if comb.side == 0 else 1
	var new_x := clampi(pos.x + direction * flee_dist, 0, 35)
	comb.position = Vector2i(new_x, pos.y)
	if comb.get("sprite"):
		comb.sprite.position = Vector2(comb.position * 32) + Vector2(16, 16)
	update_information.emit("[color=orange]%s flees toward the board edge! (now at %s)[/color]\n" % [comb.name, str(comb.position)])
	# Check if reached board edge — removed from play
	if (comb.side == 0 and new_x <= 0) or (comb.side == 1 and new_x >= 35):
		update_information.emit("[color=red]%s has fled the battlefield![/color]\n" % comb.name)
		combatant_die(comb)


# ══════════════════════════════════════════════════════════════
# DEATH & COMPLETION
# ══════════════════════════════════════════════════════════════

func combatant_die(combatant: Dictionary):
	var comb_id = combatants.find(combatant)
	if comb_id != -1:
		combatant.alive = false
		groups[combatant.side].erase(comb_id)
		# Faction-flavored death message
		var faction = side_faction[combatant.side]
		var is_commander = combatant.definition.unit_type == CombatantDefinition.UnitType.COMMANDER
		var death_lines = DEATH_FLAVOR.get(faction, ["%s destroyed.", "%s falls!"])
		var death_msg = death_lines[1] % combatant.name if is_commander else death_lines[0] % combatant.name
		update_information.emit("[color=red]%s[/color]\n" % death_msg)

		# Score kill VP
		var killer_side = 1 if combatant.side == 0 else 0
		if scenario_manager:
			scenario_manager.on_unit_killed(killer_side, combatant.definition)

		# ── Commander Death Effects (core.js) ──
		if is_commander:
			_on_commander_death(combatant)

		# ── Drake Bond Death: partner gains Vengeful ──
		if combatant.definition.has_special("Drake Bond"):
			_faction_mgr.on_drake_bond_death(combatant, combatants)

		# ── Emberclaw: Commander death = lose 5 Heat ──
		if is_commander and side_faction[combatant.side] == CombatantDefinition.Faction.EMBERCLAW:
			var ec_state = faction_state[combatant.side]
			ec_state.heat = maxi(0, ec_state.heat - 5)
			update_information.emit("[color=orange]Commander lost — Emberclaw loses 5 Heat (now %d).[/color]\n" % ec_state.heat)

		# Morale cascade: nearby allies of the dead unit test morale
		# (unless dead unit was Expendable — those don't trigger cascade)
		if not combatant.definition.has_special("Expendable"):
			_morale_cascade(combatant)

	combatant.sprite.frame = 1
	combatant_died.emit(combatant)

	# Check if combat is over
	if groups[Group.PLAYERS].size() < 1 or groups[Group.ENEMIES].size() < 1:
		combat_finish()

## Commander death: discard all cards, all friendlies morale check at -2, lose 1 CP/turn
func _on_commander_death(commander: Dictionary) -> void:
	var side = commander.side
	update_information.emit("[color=red]═══ COMMANDER FALLEN! ═══[/color]\n")

	# 1. Discard all remaining cards from hand
	var cards_lost = card_hands[side].size()
	if cards_lost > 0:
		card_discard[side].append_array(card_hands[side])
		card_hands[side].clear()
		update_information.emit("[color=red]  %d cards lost with the commander![/color]\n" % cards_lost)
		if game_ui and game_ui.has_method("update_card_hand"):
			game_ui.update_card_hand(card_hands[side])

	# 2. Permanent CP penalty
	_commander_dead_cp_penalty[side] += GameRules.COMMANDER_DEATH_CP_PENALTY
	update_information.emit("[color=red]  Army loses %d CP per turn from now on.[/color]\n" % _commander_dead_cp_penalty[side])

	# 3. All friendly units must check morale at -2
	update_information.emit("[color=red]  All allies must check morale at -2![/color]\n")
	var allies_to_check: Array = []
	for idx in groups[side]:
		var ally = combatants[idx]
		if ally.alive and ally != commander:
			allies_to_check.append(ally)
	for ally in allies_to_check:
		if _combat_over:
			return
		ally.mor_modifier -= 2  # Temporary -2 MOR for this check
		check_morale(ally)
		ally.mor_modifier += 2  # Restore after check

## When a unit dies, nearby allies (within 4 tiles) must test morale.
func _morale_cascade(dead: Dictionary) -> void:
	var allies_to_test: Array = []
	for idx in groups[dead.side]:
		var ally = combatants[idx]
		if ally.alive and ally != dead:
			if get_distance(dead, ally) <= 4:
				allies_to_test.append(ally)
	for ally in allies_to_test:
		if _combat_over:
			return
		update_information.emit("[color=silver]  %s witnesses a comrade fall — resolve wavers...[/color]\n" % ally.name)
		check_morale(ally)

func combat_finish():
	if _combat_over:
		return
	_combat_over = true
	GameStateMachine.transition_to(GameStateMachine.GameState.GAME_OVER)
	# Score final round objectives before declaring winner
	if scenario_manager:
		scenario_manager.on_round_end(round_number)
	var winner = "Players" if groups[Group.PLAYERS].size() > 0 else "Enemies"
	var winner_side = 0 if winner == "Players" else 1
	var winner_faction = side_faction[winner_side]
	var victory_text = VICTORY_FLAVOR.get(winner_faction, ["Victory!", "Defeat."])
	update_information.emit("\n[color=gold]══ %s ══[/color]\n" % victory_text[0])
	if scenario_manager:
		update_information.emit("[color=silver]Final %s[/color]\n" % scenario_manager.get_vp_text())
	emit_signal("combat_finished")

func _on_scenario_ended(winner_side: int, player_vp: int, enemy_vp: int):
	if _combat_over:
		return
	var winner_name = "Players" if winner_side == 0 else "Enemies"
	update_information.emit("\n[color=gold]══ Scenario Complete — %s win by objectives! ══[/color]\n" % winner_name)
	update_information.emit("[color=silver]Final VP: Player %d — Enemy %d[/color]\n" % [player_vp, enemy_vp])
	_combat_over = true
	GameStateMachine.transition_to(GameStateMachine.GameState.GAME_OVER)
	emit_signal("combat_finished")

func _on_combat_finished():
	# Disable further input
	if controller:
		controller.player_turn = false
	if game_ui and game_ui.has_method("set_skill_list"):
		game_ui.set_skill_list([])

	# Gather results data
	var winner = "Players" if groups[Group.PLAYERS].size() > 0 else "Enemies"
	var player_surviving := 0
	var player_lost := 0
	var enemy_surviving := 0
	var enemy_lost := 0
	for comb in combatants:
		if comb.side == 0:
			if comb.alive:
				player_surviving += 1
			else:
				player_lost += 1
		else:
			if comb.alive:
				enemy_surviving += 1
			else:
				enemy_lost += 1
	var player_vp := 0
	var enemy_vp := 0
	var scenario_name := "Total War"
	if scenario_manager:
		player_vp = scenario_manager.vp[0]
		enemy_vp = scenario_manager.vp[1]
		scenario_name = scenario_manager.get_scenario_name()

	var p_faction = FactionDatabase.FACTIONS.get(side_faction[0], {}).get("name", "Player")
	var e_faction = FactionDatabase.FACTIONS.get(side_faction[1], {}).get("name", "Enemy")

	var results := {
		"winner": winner,
		"scenario": scenario_name,
		"round": round_number,
		"player_faction": p_faction,
		"enemy_faction": e_faction,
		"player_vp": player_vp,
		"enemy_vp": enemy_vp,
		"player_surviving": player_surviving,
		"player_lost": player_lost,
		"enemy_surviving": enemy_surviving,
		"enemy_lost": enemy_lost,
	}

	if game_ui and game_ui.has_method("show_results_screen"):
		game_ui.show_results_screen(results)
	else:
		# Fallback: wait and return to menu
		await get_tree().create_timer(4.0).timeout
		get_tree().change_scene_to_file("res://scenes/main_menu.tscn")


# ══════════════════════════════════════════════════════════════
# CARD SYSTEM
# ══════════════════════════════════════════════════════════════

func _build_deck(side: int):
	# Generate a basic card deck for the faction
	var faction = side_faction[side]
	var deck = []

	# Command cards (spend CP for effects)
	deck.append(_make_card("Tactical Advance", "command", "All units +1 MOV this turn.", {"mov_bonus": 1}, 1, "The earth shakes beneath disciplined boots."))
	deck.append(_make_card("Inspire", "command", "Remove Shaken from 1 unit.", {"remove_shaken": true}, 1, "A single word can turn the tide."))
	deck.append(_make_card("Reinforce", "command", "1 unit heals 2 HP.", {"heal": 2}, 1, "The wounded rise. The battle is not yet lost."))
	deck.append(_make_card("War Cry", "command", "All units +1 ATK this turn.", {"atk_bonus": 1}, 1, "Their fury echoes across the shattered fields."))
	deck.append(_make_card("Fortify", "command", "All units +1 DEF this turn.", {"def_bonus": 1}, 1, "Shields lock. Resolve hardens like stone."))

	# Tactical cards (reactive effects)
	deck.append(_make_card("Counter Strike", "tactical", "After being attacked, immediately attack back.", {"counter": true}, 1, "Strike me, and know my answer."))
	deck.append(_make_card("Evasion", "tactical", "1 unit gains +2 DEF against next attack.", {"def_bonus": 2}, 1, "The blade finds only shadow."))
	deck.append(_make_card("Ambush", "tactical", "1 ranged unit fires without provoking.", {"ambush": true}, 1, "Patience is a weapon sharper than steel."))

	# Faction-specific cards
	match faction:
		CombatantDefinition.Faction.EMBERCLAW:
			deck.append(_make_card("Firestorm", "fragment", "Spend 5 Heat: 2 dmg to all enemies in 4 tiles.", {"aoe_damage": 2, "heat_cost": 5}, 1, "The sky splits with molten fury."))
			deck.append(_make_card("Drake Fury", "fragment", "1 Fire unit +3 ATK this turn.", {"atk_bonus": 3}, 1, "When the drake screams, even stone trembles."))
			deck.append(_make_card("Thermal Surge", "tactical", "All Fire units generate +1 Heat.", {"heat_gain": 1}, 1, "The Ashlands remember their fire."))
		CombatantDefinition.Faction.IRON_DOMINION:
			deck.append(_make_card("Grid Override", "fragment", "All Grid units gain Fortified tier.", {"grid_override": true}, 1, "The Grid endures. The Grid prevails."))
			deck.append(_make_card("Fragment Charge", "fragment", "1 Fragment User fires at +3 ATK.", {"atk_bonus": 3}, 1, "Raw shard-energy crackles through the barrel."))
			deck.append(_make_card("Mechanical March", "tactical", "All War Machines +2 MOV.", {"wm_mov": 2}, 1, "Gears grind. The Dominion advances."))
		CombatantDefinition.Faction.NIGHTFANG:
			deck.append(_make_card("Blood Frenzy", "fragment", "All units +1 ATK. Commander takes 1 dmg.", {"atk_bonus": 1, "cmd_damage": 1}, 1, "Pain is a currency the Nightfang spend freely."))
			deck.append(_make_card("Corruption Wave", "fragment", "+2 Corruption to all enemies within 6\".", {"corruption_aoe": 2}, 1, "The rot seeps into marrow and soul alike."))
			deck.append(_make_card("Shadow Shroud", "tactical", "All Nightfang units gain Stealth this turn.", {"stealth": true}, 1, "Darkness is not absence — it is presence."))
		CombatantDefinition.Faction.THORNWEFT:
			deck.append(_make_card("Web Expansion", "fragment", "Place 2 Web-Anchors.", {"anchors": 2}, 1, "The forest reaches where blades cannot."))
			deck.append(_make_card("Fate Sever", "fragment", "Spend 3 Fate Threads: negate enemy card.", {"negate": true, "fate_cost": 3}, 1, "Some threads are not meant to be pulled."))
			deck.append(_make_card("Nature's Shield", "tactical", "All units near Anchors +2 DEF.", {"def_bonus": 2}, 1, "Root and thorn form a living fortress."))
		CombatantDefinition.Faction.VEILBOUND:
			deck.append(_make_card("Stance Shift", "fragment", "All Stance units switch stance for free + bonus.", {"stance_shift": true}, 1, "The river changes course, but never stops."))
			deck.append(_make_card("Veil Rift", "fragment", "Spend 5 Flow: teleport 1 unit anywhere.", {"teleport": true, "flow_cost": 5}, 1, "The Veil tears — and space bends to will."))
			deck.append(_make_card("Spirit Surge", "tactical", "+3 Flow. 1 unit attacks at +2 ATK.", {"flow_gain": 3, "atk_bonus": 2}, 1, "Ancestral fury courses through mortal steel."))

	# Pad to deck size
	while deck.size() < GameRules.DECK_SIZE:
		deck.append(_make_card("Tactical Reserve", "tactical", "Draw 1 extra card.", {"draw": 1}, 1, "Every commander keeps an ace in reserve."))

	deck.shuffle()
	card_decks[side] = deck

func _make_card(card_name: String, card_type: String, desc: String, effects: Dictionary, cp_cost: int = 1, flavor: String = "") -> Dictionary:
	return {
		"name": card_name,
		"type": card_type,
		"description": desc,
		"effects": effects,
		"cp_cost": cp_cost,
		"flavor_text": flavor,
	}

func _draw_cards(side: int, count: int):
	for i in range(count):
		if card_hands[side].size() >= GameRules.MAX_HAND_SIZE:
			break
		if card_decks[side].is_empty():
			# Shuffle discard back
			card_decks[side] = card_discard[side].duplicate()
			card_discard[side].clear()
			card_decks[side].shuffle()
		if not card_decks[side].is_empty():
			card_hands[side].append(card_decks[side].pop_back())

## Enforce hand limit — discard random excess cards (AI) or oldest (for consistency)
func _enforce_hand_limit(side: int) -> void:
	while card_hands[side].size() > GameRules.MAX_HAND_SIZE:
		var discarded = card_hands[side].pop_front()
		card_discard[side].append(discarded)
		if side == 0:
			update_information.emit("[color=gray]Discarded %s (hand limit %d)[/color]\n" % [discarded.name, GameRules.MAX_HAND_SIZE])

## Play a card from hand (called from UI)
func play_card(card: Dictionary):
	var side = 0  # Player side
	if card not in card_hands[side]:
		return
	# Check CP cost
	var cp_cost = card.get("cp_cost", 1)
	if command_points[side] < cp_cost:
		update_information.emit("[color=red]Not enough Command Points (%d needed, have %d)[/color]\n" % [cp_cost, command_points[side]])
		return
	# Turn 1 restriction: no cards costing 3+ CP
	if round_number <= 1 and cp_cost >= 3:
		update_information.emit("[color=gray]Cannot play cards costing 3+ CP on Turn 1.[/color]\n")
		return
	command_points[side] -= cp_cost
	card_hands[side].erase(card)
	card_discard[side].append(card)
	var effects = card.get("effects", {})

	update_information.emit("[color=gold]Card played: %s (-%d CP)[/color]\n" % [card.name, cp_cost])

	# Apply card effects
	if effects.has("atk_bonus"):
		for idx in groups[side]:
			combatants[idx].atk_modifier += effects.atk_bonus

	if effects.has("def_bonus"):
		for idx in groups[side]:
			combatants[idx].def_modifier += effects.def_bonus

	if effects.has("mov_bonus"):
		for idx in groups[side]:
			# Use a temporary mov modifier that resets at round start (not permanent base stat)
			combatants[idx].mov_modifier = combatants[idx].get("mov_modifier", 0) + effects.mov_bonus

	if effects.has("heal"):
		# Heal the current combatant
		var comb = get_current_combatant()
		comb.hp = mini(comb.hp + effects.heal, comb.max_hp)
		update_combatants.emit(combatants)

	if effects.has("remove_shaken"):
		for idx in groups[side]:
			if combatants[idx].shaken:
				combatants[idx].shaken = false
				update_information.emit("%s rallied by card!\n" % combatants[idx].name)
				break

	if effects.has("draw"):
		_draw_cards(side, effects.draw)

	# ── AoE damage (e.g., Firestorm) ──
	if effects.has("aoe_damage"):
		var enemy_side = 1 - side
		var aoe_dmg: int = effects.aoe_damage
		for idx in groups[enemy_side].duplicate():
			var t = combatants[idx]
			if t.alive:
				apply_damage(t, aoe_dmg)
				if _combat_over:
					return

	# ── Corruption AoE (Nightfang) ──
	if effects.has("corruption_aoe"):
		var enemy_side = 1 - side
		var tokens: int = effects.corruption_aoe
		for idx in groups[enemy_side]:
			var t = combatants[idx]
			if t.alive:
				t.corruption_tokens = t.get("corruption_tokens", 0) + tokens
				update_information.emit("[color=purple]%s gains %d corruption![/color]\n" % [t.name, tokens])

	# ── CMD damage (commander debuff) ──
	if effects.has("cmd_damage"):
		var enemy_side = 1 - side
		for idx in groups[enemy_side]:
			var t = combatants[idx]
			if t.alive and t.get("cmd", 0) > 0:
				t.atk_modifier -= effects.cmd_damage
				update_information.emit("[color=red]%s's command disrupted (-%d ATK)![/color]\n" % [t.name, effects.cmd_damage])
				break  # Hit one commander

	# ── Stealth (Shadow Shroud) ──
	if effects.has("stealth"):
		for idx in groups[side]:
			var c = combatants[idx]
			if c.alive and "stealthed" not in c.status_effects:
				c.status_effects.append("stealthed")
				c.def_modifier += 2
		update_information.emit("[color=dark_violet]All allies enter shadow shroud (+2 DEF, hidden).[/color]\n")

	# ── Counter (Counter Strike) ──
	if effects.has("counter"):
		var comb = get_current_combatant()
		if not comb.has("status_effects"):
			comb.status_effects = []
		comb.status_effects.append("counter")
		update_information.emit("[color=steel_blue]%s readies a counter strike![/color]\n" % comb.name)

	# ── Ambush ──
	if effects.has("ambush"):
		var comb = get_current_combatant()
		if not comb.has("status_effects"):
			comb.status_effects = []
		comb.status_effects.append("ambush")
		comb.atk_modifier += 2
		update_information.emit("[color=dark_green]%s sets an ambush (+2 ATK next attack)![/color]\n" % comb.name)

	# ── Teleport (Veilbound) ──
	if effects.has("teleport"):
		update_information.emit("[color=blue]Teleport effect granted to next move.[/color]\n")

	# ── Heat gain / cost (Emberclaw) ──
	if effects.has("heat_gain"):
		_faction_mgr.modify_heat(faction_state[side], effects.heat_gain)
	if effects.has("heat_cost"):
		var state = faction_state[side]
		if state.has("heat") and state.heat >= effects.heat_cost:
			_faction_mgr.modify_heat(state, -effects.heat_cost)
		else:
			update_information.emit("[color=red]Not enough Heat for card effect.[/color]\n")

	# ── Flow gain / cost (Veilbound) ──
	if effects.has("flow_gain"):
		if faction_state[side].has("flow"):
			faction_state[side].flow += effects.flow_gain
	if effects.has("flow_cost"):
		if faction_state[side].has("flow") and faction_state[side].flow >= effects.flow_cost:
			faction_state[side].flow -= effects.flow_cost

	# ── Fate cost (Thornweft) ──
	if effects.has("fate_cost"):
		if faction_state[side].has("fate_threads") and faction_state[side].fate_threads >= effects.fate_cost:
			faction_state[side].fate_threads -= effects.fate_cost

	# ── Grid override (Iron Dominion) ──
	if effects.has("grid_override"):
		for idx in groups[side]:
			combatants[idx].def_modifier += 1
		update_information.emit("[color=steel_blue]Grid Override: all units +1 DEF this round.[/color]\n")

	# ── War Machine MOV bonus ──
	if effects.has("wm_mov"):
		for idx in groups[side]:
			if combatants[idx].get("definition") and combatants[idx].definition.unit_type == CombatantDefinition.UnitType.WAR_MACHINE:
				combatants[idx].mov_modifier = combatants[idx].get("mov_modifier", 0) + effects.wm_mov
				update_information.emit("[color=steel_blue]%s gets +%d MOV.[/color]\n" % [combatants[idx].name, effects.wm_mov])

	# Update hand in UI
	if game_ui.has_method("update_card_hand"):
		game_ui.update_card_hand(card_hands[side])
	# Refresh faction resources & CP display
	if game_ui.has_method("update_faction_resources"):
		game_ui.update_faction_resources(faction_state[side])


# ══════════════════════════════════════════════════════════════
# AI
# ══════════════════════════════════════════════════════════════

func ai_process(comb: Dictionary):
	if _combat_over:
		return

	# AI plays a card at start of its first unit's turn each round
	_ai_try_play_card()

	var nearest_target: Dictionary
	var nearest_dist := INF

	for target_idx in groups[Group.PLAYERS]:
		var target = combatants[target_idx]
		if not target.alive:
			continue
		var dist = get_distance(comb, target)
		if dist < nearest_dist:
			nearest_dist = dist
			nearest_target = target

	if nearest_target.is_empty():
		advance_turn()
		return

	# Non-Combatant AI: just move toward objectives, don't attack
	if comb.definition.has_special("Non-Combatant"):
		if nearest_dist > 3:
			await controller.ai_process(nearest_target.position)
		advance_turn()
		return

	# Try using a faction skill before basic attack
	if _ai_try_use_skill(comb, nearest_target, nearest_dist):
		return

	if nearest_dist <= 1:
		attack(comb, nearest_target, "attack_melee")
		return

	# Engaged units can't shoot — must melee or skip
	var is_engaged := "engaged" in comb.get("status_effects", [])

	if comb.rng > 1 and nearest_dist <= comb.rng and not is_engaged:
		attack(comb, nearest_target, "attack_ranged")
		return

	# Can't move while engaged
	if is_engaged:
		advance_turn()
		return

	# Move toward target then attack if in range
	await controller.ai_process(nearest_target.position)

	# Check for overwatch from player units
	_check_overwatch(comb)

	if not comb.alive:
		return  # Killed by overwatch

	if get_distance(comb, nearest_target) <= 1:
		attack(comb, nearest_target, "attack_melee")
	elif comb.rng > 1 and get_distance(comb, nearest_target) <= comb.rng:
		attack(comb, nearest_target, "attack_ranged")
	else:
		advance_turn()


## AI considers using a faction skill. Returns true if it used one (and already advanced turn).
func _ai_try_use_skill(comb: Dictionary, target: Dictionary, dist: float) -> bool:
	var side := comb.side
	var state: Dictionary = faction_state[side]
	var skill_list: Array = comb.get("skill_list", [])
	# Skip basic attacks and overwatch — AI already handles those
	var basic_skills := ["attack_melee", "attack_ranged", "basic_magic", "overwatch", "rally"]

	# ── Self-buff / heal priorities first ──
	# Blood Tithe: sacrifice 1 HP for +2 ATK when HP > 2 and enemy adjacent
	if "blood_tithe" in skill_list and comb.hp > 2 and dist <= 1:
		blood_tithe(comb, comb)
		return true
	# Stoke Flames: +ATK buff when heat is low and enemy is close
	if "stoke_flames" in skill_list and state.get("heat", 0) < state.get("heat_max", 10) - 3 and dist <= 2:
		stoke_flames(comb, comb)
		return true
	# Shield Wall: self-DEF buff when enemies are near
	if "shield_wall" in skill_list and dist <= 2:
		shield_wall(comb, comb)
		return true
	# Ritual Channel: generate flow and buff nearby allies
	if "ritual_channel" in skill_list and state.get("flow", 0) < 3:
		ritual_channel(comb, comb)
		return true

	# ── AoE attacks when multiple enemies are clustered ──
	var enemies_within_4 := 0
	for idx in groups[Group.PLAYERS]:
		var p = combatants[idx]
		if p.alive and get_distance(comb, p) <= 4:
			enemies_within_4 += 1
	# Heat Vent: spend heat to AoE damage (need 5+ heat and 2+ enemies nearby)
	if "heat_vent" in skill_list and state.get("heat", 0) >= 5 and enemies_within_4 >= 2:
		heat_vent(comb, comb)
		return true
	# Terror Shriek: AoE morale check (2+ enemies within 4)
	if "terror_shriek" in skill_list and enemies_within_4 >= 2:
		terror_shriek(comb, comb)
		return true
	# Fragment Overload: AoE damage (need charges and enemies close)
	if "fragment_overload" in skill_list and enemies_within_4 >= 2:
		fragment_overload(comb, comb)
		return true

	# ── Targeted offensive skills ──
	# Flame Burst: breath weapon when enemy is in range 1-3
	if "flame_burst" in skill_list and dist >= 1 and dist <= 3:
		flame_burst(comb, target)
		return true
	# Corrupt Bite: melee with corruption (prefer over basic attack)
	if "corrupt_bite" in skill_list and dist <= 1:
		corrupt_bite(comb, target)
		return true
	# Stance Strike: melee with stance bonus
	if "stance_strike" in skill_list and dist <= 1 and state.get("flow", 0) >= 1:
		stance_strike(comb, target)
		return true
	# Phase Strike: ignore-cover melee
	if "phase_strike" in skill_list and dist <= 1 and state.get("flow", 0) >= 2:
		phase_strike(comb, target)
		return true
	# Inferno Charge: powerful melee (if we haven't moved yet, treat as bonus)
	if "inferno_charge" in skill_list and dist <= 1:
		inferno_charge(comb, target)
		return true
	# Web Snare: ranged CC
	if "web_snare" in skill_list and dist >= 1 and dist <= 8 and not target.get("engaged", false):
		web_snare(comb, target)
		return true
	# Nature's Wrath: powerful ranged attack
	if "natures_wrath" in skill_list and dist >= 1 and dist <= 10 and state.get("fate_threads", 0) >= 2:
		natures_wrath(comb, target)
		return true
	# Coordinated Fire: ranged with ATK bonus
	if "coordinated_fire" in skill_list and dist >= 2 and dist <= 10:
		coordinated_fire(comb, target)
		return true
	# Pyroclasm: ranged fire magic
	if "pyroclasm" in skill_list and dist >= 1 and dist <= 8 and state.get("heat", 0) >= 3:
		pyroclasm(comb, target)
		return true
	# Artillery Barrage: long-range heavy attack
	if "artillery_barrage" in skill_list and dist >= 4 and dist <= 16:
		artillery_barrage(comb, target)
		return true

	# ── Support skills (target wounded ally) ──
	if "repair" in skill_list or "fate_weave" in skill_list or "honor_guard" in skill_list:
		var wounded_ally: Dictionary
		var worst_ratio := 1.0
		for idx in groups[side]:
			var ally = combatants[idx]
			if ally.alive and ally != comb:
				var ratio = float(ally.hp) / float(ally.max_hp)
				if ratio < worst_ratio:
					worst_ratio = ratio
					wounded_ally = ally
		if not wounded_ally.is_empty() and worst_ratio < 0.6:
			if "repair" in skill_list and get_distance(comb, wounded_ally) <= 1:
				repair(comb, wounded_ally)
				return true
			if "fate_weave" in skill_list and state.get("fate_threads", 0) >= 1:
				fate_weave(comb, wounded_ally)
				return true
			if "honor_guard" in skill_list and get_distance(comb, wounded_ally) <= 2 and state.get("flow", 0) >= 1:
				honor_guard(comb, wounded_ally)
				return true

	# ── Feast: consume dead enemy corpse for HP when wounded ──
	if "feast" in skill_list and float(comb.hp) / float(comb.max_hp) < 0.7:
		for idx in groups[Group.PLAYERS]:
			var dead_enemy = combatants[idx]
			if not dead_enemy.alive and get_distance(comb, dead_enemy) <= 1:
				feast(comb, dead_enemy)
				return true

	return false

## Check if any enemies with overwatch can fire at a unit that just moved.
## Uses auto_advance=false so it does NOT consume a turn.
func _check_overwatch(mover: Dictionary):
	if _combat_over:
		return
	var enemy_side = 1 if mover.side == 0 else 0
	for idx in groups[enemy_side]:
		var watcher = combatants[idx]
		if watcher.alive and watcher.overwatch_active:
			var dist = get_distance(watcher, mover)
			if dist <= watcher.rng and dist > 0:
				watcher.overwatch_active = false
				update_information.emit("[color=steel_blue]%s fires Overwatch at %s![/color]\n" % [watcher.name, mover.name])
				# Overwatch attack at -1 ATK, auto_advance=false to not skip turns
				watcher.atk_modifier -= 1
				attack(watcher, mover, "attack_ranged" if watcher.rng > 1 else "attack_melee", false)
				watcher.atk_modifier += 1
				break  # Only one overwatch per move

## AI card play — plays one useful card per round if it has CP
func _ai_try_play_card():
	var side := 1
	if card_hands[side].is_empty() or command_points[side] <= 0:
		return
	# Prioritize: War Cry > Fortify > Reinforce > Tactical Reserve
	var priority_names = ["War Cry", "Fortify", "Reinforce", "Tactical Reserve"]
	for pname in priority_names:
		for card in card_hands[side]:
			if card.name == pname:
				var cp_cost = card.get("cp_cost", 1)
				if command_points[side] >= cp_cost:
					command_points[side] -= cp_cost
					card_hands[side].erase(card)
					card_discard[side].append(card)
					var effects = card.get("effects", {})
					update_information.emit("[color=red]Enemy plays: %s[/color]\n" % card.name)
					if effects.has("atk_bonus"):
						for idx in groups[side]:
							combatants[idx].atk_modifier += effects.atk_bonus
					if effects.has("def_bonus"):
						for idx in groups[side]:
							combatants[idx].def_modifier += effects.def_bonus
					if effects.has("heal"):
						# Heal lowest HP enemy unit
						var lowest_hp_comb = null
						var lowest_ratio := 1.0
						for idx in groups[side]:
							var c = combatants[idx]
							if c.alive and c.hp < c.max_hp:
								var ratio = float(c.hp) / float(c.max_hp)
								if ratio < lowest_ratio:
									lowest_ratio = ratio
									lowest_hp_comb = c
						if lowest_hp_comb:
							lowest_hp_comb.hp = mini(lowest_hp_comb.hp + effects.heal, lowest_hp_comb.max_hp)
					if effects.has("draw"):
						_draw_cards(side, effects.draw)
					return  # Play at most 1 card per AI activation
