extends Control
## Army Builder — Select faction, pick units within point budget, then launch combat.

signal army_confirmed(player_army: Array, enemy_army: Array, player_faction: int, enemy_faction: int)

const FACTIONS = [
	{"id": CombatantDefinition.Faction.EMBERCLAW, "name": "Emberclaw Warpack", "color": Color(0.9, 0.2, 0.1)},
	{"id": CombatantDefinition.Faction.IRON_DOMINION, "name": "Iron Dominion", "color": Color(0.6, 0.65, 0.7)},
	{"id": CombatantDefinition.Faction.NIGHTFANG, "name": "Nightfang Dominion", "color": Color(0.5, 0.1, 0.6)},
	{"id": CombatantDefinition.Faction.THORNWEFT, "name": "Thornweft Matriarchy", "color": Color(0.2, 0.7, 0.3)},
	{"id": CombatantDefinition.Faction.VEILBOUND, "name": "Veilbound Shogunate", "color": Color(0.2, 0.4, 0.9)},
]

var player_faction_id: int = -1
var enemy_faction_id: int = -1
var player_army: Array = []  # Array of unit names
var enemy_army: Array = []
var points_budget: int = 250
var player_points: int = 0
var enemy_points: int = 0
var selecting_for: String = "player"  # "player" or "enemy"

# UI node refs
var faction_list: VBoxContainer
var unit_list: VBoxContainer
var army_list: VBoxContainer
var points_label: Label
var budget_spin: SpinBox
var confirm_btn: Button
var title_label: Label
var faction_panel: PanelContainer
var unit_panel: PanelContainer
var army_panel: PanelContainer

func _ready():
	_build_ui()
	_show_faction_selection()

func _build_ui():
	# Main layout
	var bg = ColorRect.new()
	bg.color = Color(0.08, 0.08, 0.12, 1.0)
	bg.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	add_child(bg)

	var margin = MarginContainer.new()
	margin.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 20)
	margin.add_theme_constant_override("margin_right", 20)
	margin.add_theme_constant_override("margin_top", 20)
	margin.add_theme_constant_override("margin_bottom", 20)
	add_child(margin)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 10)
	margin.add_child(vbox)

	# Title
	title_label = Label.new()
	title_label.text = "SHARDBORNE — ARMY BUILDER"
	title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title_label.add_theme_font_size_override("font_size", 22)
	title_label.add_theme_color_override("font_color", Color.GOLD)
	vbox.add_child(title_label)

	# Budget row
	var budget_row = HBoxContainer.new()
	budget_row.add_theme_constant_override("separation", 10)
	vbox.add_child(budget_row)
	var budget_lbl = Label.new()
	budget_lbl.text = "Point Budget:"
	budget_row.add_child(budget_lbl)
	budget_spin = SpinBox.new()
	budget_spin.min_value = 50
	budget_spin.max_value = 1000
	budget_spin.step = 25
	budget_spin.value = 250
	budget_spin.value_changed.connect(_on_budget_changed)
	budget_row.add_child(budget_spin)
	points_label = Label.new()
	points_label.text = "  Used: 0 / 250"
	budget_row.add_child(points_label)

	# Content area — 3 panels side by side
	var hbox = HBoxContainer.new()
	hbox.size_flags_vertical = SIZE_EXPAND_FILL
	hbox.add_theme_constant_override("separation", 10)
	vbox.add_child(hbox)

	# Faction panel
	faction_panel = _make_panel("Select Faction")
	hbox.add_child(faction_panel)
	faction_list = faction_panel.get_node("VBox/Scroll/List")

	# Unit panel
	unit_panel = _make_panel("Available Units")
	hbox.add_child(unit_panel)
	unit_list = unit_panel.get_node("VBox/Scroll/List")

	# Army panel
	army_panel = _make_panel("Your Army")
	hbox.add_child(army_panel)
	army_list = army_panel.get_node("VBox/Scroll/List")

	# Bottom buttons
	var btn_row = HBoxContainer.new()
	btn_row.add_theme_constant_override("separation", 10)
	btn_row.alignment = BoxContainer.ALIGNMENT_CENTER
	vbox.add_child(btn_row)

	var switch_btn = Button.new()
	switch_btn.text = "Switch to Enemy"
	switch_btn.pressed.connect(_on_switch_side)
	btn_row.add_child(switch_btn)

	var auto_btn = Button.new()
	auto_btn.text = "Auto-Fill Enemy"
	auto_btn.pressed.connect(_on_auto_fill_enemy)
	btn_row.add_child(auto_btn)

	var clear_btn = Button.new()
	clear_btn.text = "Clear Army"
	clear_btn.pressed.connect(_on_clear_army)
	btn_row.add_child(clear_btn)

	confirm_btn = Button.new()
	confirm_btn.text = "Start Battle!"
	confirm_btn.pressed.connect(_on_confirm)
	confirm_btn.disabled = true
	btn_row.add_child(confirm_btn)

	var back_btn = Button.new()
	back_btn.text = "Back"
	back_btn.pressed.connect(func(): get_tree().change_scene_to_file("res://scenes/main_menu.tscn"))
	btn_row.add_child(back_btn)

func _make_panel(header_text: String) -> PanelContainer:
	var panel = PanelContainer.new()
	panel.size_flags_horizontal = SIZE_EXPAND_FILL
	panel.size_flags_vertical = SIZE_EXPAND_FILL
	var style = StyleBoxFlat.new()
	style.bg_color = Color(0.12, 0.12, 0.18, 1.0)
	style.corner_radius_top_left = 4
	style.corner_radius_top_right = 4
	style.corner_radius_bottom_left = 4
	style.corner_radius_bottom_right = 4
	style.content_margin_left = 8
	style.content_margin_right = 8
	style.content_margin_top = 8
	style.content_margin_bottom = 8
	panel.add_theme_stylebox_override("panel", style)

	var vbox = VBoxContainer.new()
	vbox.name = "VBox"
	vbox.add_theme_constant_override("separation", 6)
	panel.add_child(vbox)

	var header = Label.new()
	header.text = header_text
	header.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	header.add_theme_color_override("font_color", Color.GOLD)
	vbox.add_child(header)

	var scroll = ScrollContainer.new()
	scroll.name = "Scroll"
	scroll.size_flags_vertical = SIZE_EXPAND_FILL
	vbox.add_child(scroll)

	var list = VBoxContainer.new()
	list.name = "List"
	list.size_flags_horizontal = SIZE_EXPAND_FILL
	list.add_theme_constant_override("separation", 4)
	scroll.add_child(list)

	return panel


# ══════════════════════════════════════════════════════════════
# FACTION SELECTION
# ══════════════════════════════════════════════════════════════

func _show_faction_selection():
	_clear_list(faction_list)
	_clear_list(unit_list)
	title_label.text = "SHARDBORNE — Select %s Faction" % selecting_for.capitalize()

	for faction in FACTIONS:
		var btn = Button.new()
		btn.text = faction.name
		btn.add_theme_color_override("font_color", faction.color)
		btn.pressed.connect(_on_faction_selected.bind(faction.id))
		faction_list.add_child(btn)

func _on_faction_selected(faction_id: int):
	if selecting_for == "player":
		player_faction_id = faction_id
		_show_unit_list(faction_id)
	else:
		enemy_faction_id = faction_id
		_show_unit_list(faction_id)

func _show_unit_list(faction_id: int):
	_clear_list(unit_list)
	var faction_key = FactionDatabase.FACTIONS.keys()[faction_id] if faction_id < FactionDatabase.FACTIONS.size() else ""

	# Search faction database for units
	var all_units = FactionDatabase.get_faction(faction_id)
	if all_units.is_empty():
		var lbl = Label.new()
		lbl.text = "No units found"
		unit_list.add_child(lbl)
		return

	# Sort by pts
	all_units.sort_custom(func(a, b): return a.pts < b.pts)

	for unit_def in all_units:
		var btn = Button.new()
		var type_str = CombatantDefinition.UnitType.keys()[unit_def.unit_type] if unit_def.unit_type < CombatantDefinition.UnitType.size() else "?"
		btn.text = "%s (%s) — %d pts" % [unit_def.unit_name, type_str, unit_def.pts]
		btn.tooltip_text = "ATK:%d DEF:%d HP:%d MOV:%d RNG:%d MOR:%d" % [
			unit_def.atk, unit_def.defense, unit_def.max_hp, unit_def.mov, unit_def.rng, unit_def.mor]
		btn.pressed.connect(_on_unit_added.bind(unit_def))
		unit_list.add_child(btn)

	title_label.text = "SHARDBORNE — Pick Units (%s)" % selecting_for.capitalize()

func _on_unit_added(unit_def: CombatantDefinition):
	var current_pts = player_points if selecting_for == "player" else enemy_points
	if current_pts + unit_def.pts > points_budget:
		return  # Over budget

	if selecting_for == "player":
		player_army.append(unit_def.unit_name)
		player_points += unit_def.pts
	else:
		enemy_army.append(unit_def.unit_name)
		enemy_points += unit_def.pts

	_refresh_army_list()
	_update_points()

func _refresh_army_list():
	_clear_list(army_list)
	var army = player_army if selecting_for == "player" else enemy_army

	for i in range(army.size()):
		var row = HBoxContainer.new()
		var lbl = Label.new()
		lbl.text = army[i]
		lbl.size_flags_horizontal = SIZE_EXPAND_FILL
		row.add_child(lbl)

		var remove_btn = Button.new()
		remove_btn.text = "X"
		remove_btn.pressed.connect(_on_unit_removed.bind(i))
		row.add_child(remove_btn)

		army_list.add_child(row)

	_check_confirm()

func _on_unit_removed(index: int):
	var army = player_army if selecting_for == "player" else enemy_army
	if index < army.size():
		var unit_name = army[index]
		var unit_def = FactionDatabase.get_unit(unit_name)
		if unit_def:
			if selecting_for == "player":
				player_points -= unit_def.pts
			else:
				enemy_points -= unit_def.pts
		army.remove_at(index)
	_refresh_army_list()
	_update_points()

func _update_points():
	var current_pts = player_points if selecting_for == "player" else enemy_points
	points_label.text = "  Used: %d / %d" % [current_pts, points_budget]
	if current_pts > points_budget:
		points_label.add_theme_color_override("font_color", Color.RED)
	else:
		points_label.add_theme_color_override("font_color", Color.WHITE)

func _on_budget_changed(value: float):
	points_budget = int(value)
	_update_points()

func _on_clear_army():
	if selecting_for == "player":
		player_army.clear()
		player_points = 0
	else:
		enemy_army.clear()
		enemy_points = 0
	_refresh_army_list()
	_update_points()

func _on_auto_fill_enemy():
	# Auto-pick a random opposing faction and fill with units
	var available = FACTIONS.filter(func(f): return f.id != player_faction_id)
	if available.is_empty():
		return
	available.shuffle()
	enemy_faction_id = available[0].id
	enemy_army.clear()
	enemy_points = 0

	var units = FactionDatabase.get_faction(enemy_faction_id)
	if units.is_empty():
		return

	# Ensure a commander
	var commanders = units.filter(func(u): return u.is_commander())
	if not commanders.is_empty():
		enemy_army.append(commanders[0].unit_name)
		enemy_points += commanders[0].pts

	# Fill with random units
	units.shuffle()
	for unit_def in units:
		if enemy_points + unit_def.pts <= points_budget and enemy_army.size() < 8:
			if unit_def.unit_name not in enemy_army:
				enemy_army.append(unit_def.unit_name)
				enemy_points += unit_def.pts

	selecting_for = "enemy"
	_refresh_army_list()
	_update_points()
	_check_confirm()

func _get_army_points(army: Array) -> int:
	var total := 0
	for name in army:
		var d = FactionDatabase.get_unit(name)
		if d:
			total += d.pts
	return total

func _check_confirm():
	# Need at least 1 unit per side and a commander
	var has_player_cmd = false
	for name in player_army:
		var d = FactionDatabase.get_unit(name)
		if d and d.is_commander():
			has_player_cmd = true
			break
	var has_enemy_cmd = false
	for name in enemy_army:
		var d = FactionDatabase.get_unit(name)
		if d and d.is_commander():
			has_enemy_cmd = true
			break
	confirm_btn.disabled = not (player_army.size() >= 2 and enemy_army.size() >= 2 and
		has_player_cmd and has_enemy_cmd and player_faction_id >= 0 and enemy_faction_id >= 0)

func _on_confirm():
	# Store selections in BattleConfig autoload and launch combat
	BattleConfig.set_armies(player_army, enemy_army, player_faction_id, enemy_faction_id)
	get_tree().change_scene_to_file("res://scenes/game.tscn")

func _on_switch_side():
	if selecting_for == "player":
		selecting_for = "enemy"
	else:
		selecting_for = "player"
	_show_faction_selection()
	_refresh_army_list()
	_update_points()

func _clear_list(container: VBoxContainer):
	if container == null:
		return
	for child in container.get_children():
		child.queue_free()
