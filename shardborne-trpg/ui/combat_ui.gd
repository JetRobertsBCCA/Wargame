extends Control
## Shardborne Combat UI — Full tactical TRPG interface (reworked).
## Two-column bottom bar: active unit + skills on left, combat log on right.
## Click-to-inspect popup for any unit (ally or enemy).

signal turn_ended()

@export var combat: Combat
@export var controller: CController

const TQIcon = preload("res://ui/tq_icon.tscn")

# ── Side color lookup ──
const SIDE_COLORS := {
	0: Color(0.3, 0.7, 1.0),   # Player — cyan/blue
	1: Color(1.0, 0.35, 0.25),  # Enemy — red
}

const UNIT_TYPE_NAMES := ["Commander", "Infantry", "Cavalry", "Support", "Scout", "Artillery", "Specialist", "War Machine"]

# ── Faction-themed turn labels ──
const TURN_FLAVOR := {
	CombatantDefinition.Faction.EMBERCLAW: ["THE WARPACK STRIKES", "THE WARPACK ACTS"],
	CombatantDefinition.Faction.IRON_DOMINION: ["THE DOMINION COMMANDS", "THE DOMINION ACTS"],
	CombatantDefinition.Faction.NIGHTFANG: ["THE NIGHTFANG HUNGER", "THE NIGHTFANG ACT"],
	CombatantDefinition.Faction.THORNWEFT: ["THE MATRIARCHY WEAVES", "THE MATRIARCHY ACTS"],
	CombatantDefinition.Faction.VEILBOUND: ["THE SHOGUNATE RESPONDS", "THE SHOGUNATE ACTS"],
}

# ── Faction resource tier qualifiers ──
const RESOURCE_TIERS := {
	"heat": [[3, "Smoldering"], [6, "Blazing"], [9, "Inferno!"]],
	"grid_cohesion": [[3, "Forming"], [5, "Linked"], [8, "Fortified!"]],
	"hunger": [[3, "Peckish"], [6, "Starving"], [10, "Frenzy!"]],
	"flow": [[3, "Trickling"], [5, "Surging"], [8, "Torrent!"]],
	"fate_threads": [[2, "Stirring"], [4, "Weaving"], [6, "Entangled!"]],
}

# ── Dynamically created UI nodes ──
var _top_bar: PanelContainer
var _turn_queue_container: HBoxContainer
var _phase_label: Label
var _round_label: Label
var _resource_label: RichTextLabel
var _enemy_resource_label: RichTextLabel
var _cp_label: Label
var _vp_label: Label

var _bottom_bar: PanelContainer
var _active_name_label: Label
var _active_type_label: Label
var _active_stats_label: Label
var _active_status_label: RichTextLabel
var _active_icon: TextureRect
var _active_unit_panel: PanelContainer
var _movement_label: Label
var _skill_buttons: Array = []  # Array[Button]
var _end_turn_btn: Button
var _log_text: RichTextLabel
var _select_target_panel: PanelContainer

var _inspect_panel: PanelContainer
var _inspect_name: RichTextLabel
var _inspect_stats: RichTextLabel
var _inspect_status: RichTextLabel
var _inspect_specials: RichTextLabel
var _inspect_icon: TextureRect
var _inspected_comb: Dictionary = {}

var _card_hand_container: HBoxContainer
var _card_hand_panel: PanelContainer
var _current_comb: Dictionary = {}  # Currently active combatant
var _tutorial_panel: PanelContainer  # Campaign tutorial tips overlay

# ── Pause menu ──
var _pause_overlay: ColorRect
var _pause_panel: PanelContainer
var _paused := false

# ── Speed controls ──
var _speed_multiplier := 1.0
var _speed_label: Label

# ── Minimap ──
var _minimap_rect: ColorRect
var _minimap_container: Control
const MINIMAP_WIDTH := 144  # 36 tiles * 4px
const MINIMAP_HEIGHT := 84  # 21 tiles * 4px
const MINIMAP_TILE := 4     # px per tile

# ══════════════════════════════════════════════════════════════
# INITIALIZATION
# ══════════════════════════════════════════════════════════════

func _ready():
	set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_IGNORE
	_build_top_bar()
	_build_bottom_bar()
	_build_inspect_panel()
	_build_card_hand()
	_build_tutorial_tips()
	_build_pause_menu()
	_build_minimap()


func _unhandled_input(event: InputEvent):
	# Escape key → toggle pause menu (only when undo not available in controller)
	if event is InputEventKey and event.is_released() and event.keycode == KEY_ESCAPE:
		if _paused:
			_toggle_pause()
			get_viewport().set_input_as_handled()
			return
		# Only open pause if controller doesn't have undo available
		if controller and controller._undo_available:
			pass  # Let CController handle the undo
		else:
			_toggle_pause()
			get_viewport().set_input_as_handled()
			return
	# Block all other input while paused
	if _paused:
		return
	# Right-click to inspect any unit on the map, or show terrain info
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_RIGHT and event.is_released():
		if controller and controller.tile_map:
			var mouse_pos = controller.get_global_mouse_position()
			var tile_pos = controller.tile_map.local_to_map(mouse_pos)
			var comb = controller.get_combatant_at_position(tile_pos)
			if comb != null and comb.alive:
				_show_inspect(comb)
			else:
				# No unit here — show terrain info instead
				_show_terrain_inspect(tile_pos)
	# Left-click outside inspect panel hides it
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT and event.is_pressed():
		if _inspect_panel.visible:
			_hide_inspect()

# ══════════════════════════════════════════════════════════════
# TOP BAR — Turn Queue + Phase + Round + VP
# ══════════════════════════════════════════════════════════════

func _build_top_bar():
	_top_bar = PanelContainer.new()
	_top_bar.set_anchors_and_offsets_preset(PRESET_TOP_WIDE)
	_top_bar.offset_bottom = 44
	var tb_style = StyleBoxFlat.new()
	tb_style.bg_color = Color(0.04, 0.04, 0.08, 0.85)
	tb_style.border_width_bottom = 1
	tb_style.border_color = Color(0.2, 0.2, 0.3, 0.5)
	tb_style.content_margin_left = 8
	tb_style.content_margin_right = 8
	tb_style.content_margin_top = 2
	tb_style.content_margin_bottom = 2
	_top_bar.add_theme_stylebox_override("panel", tb_style)
	_top_bar.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(_top_bar)

	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 10)
	hbox.mouse_filter = MOUSE_FILTER_IGNORE
	_top_bar.add_child(hbox)

	# Phase / Round indicator
	var phase_vbox = VBoxContainer.new()
	phase_vbox.custom_minimum_size = Vector2(140, 0)
	phase_vbox.add_theme_constant_override("separation", 0)
	phase_vbox.mouse_filter = MOUSE_FILTER_IGNORE
	hbox.add_child(phase_vbox)

	_phase_label = Label.new()
	_phase_label.text = "Combat Phase"
	_phase_label.add_theme_font_size_override("font_size", 13)
	_phase_label.add_theme_color_override("font_color", Color(0.9, 0.8, 0.4))
	phase_vbox.add_child(_phase_label)

	_round_label = Label.new()
	_round_label.text = "Round 1"
	_round_label.add_theme_font_size_override("font_size", 11)
	_round_label.add_theme_color_override("font_color", Color(0.55, 0.55, 0.65))
	phase_vbox.add_child(_round_label)

	# Separator
	var sep = VSeparator.new()
	sep.mouse_filter = MOUSE_FILTER_IGNORE
	hbox.add_child(sep)

	# Turn queue
	var tq_vbox = VBoxContainer.new()
	tq_vbox.add_theme_constant_override("separation", 0)
	tq_vbox.mouse_filter = MOUSE_FILTER_IGNORE
	hbox.add_child(tq_vbox)

	var tq_title = Label.new()
	tq_title.text = "TURN ORDER"
	tq_title.add_theme_font_size_override("font_size", 9)
	tq_title.add_theme_color_override("font_color", Color(0.45, 0.45, 0.55))
	tq_vbox.add_child(tq_title)

	_turn_queue_container = HBoxContainer.new()
	_turn_queue_container.add_theme_constant_override("separation", 2)
	_turn_queue_container.mouse_filter = MOUSE_FILTER_IGNORE
	tq_vbox.add_child(_turn_queue_container)

	# Expand spacer
	var spacer = Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	spacer.mouse_filter = MOUSE_FILTER_IGNORE
	hbox.add_child(spacer)

	# Faction resources (player side)
	_resource_label = RichTextLabel.new()
	_resource_label.bbcode_enabled = true
	_resource_label.fit_content = true
	_resource_label.scroll_active = false
	_resource_label.mouse_filter = MOUSE_FILTER_PASS
	_resource_label.tooltip_text = ""
	_resource_label.custom_minimum_size = Vector2(130, 0)
	hbox.add_child(_resource_label)

	# Enemy faction resources
	_enemy_resource_label = RichTextLabel.new()
	_enemy_resource_label.bbcode_enabled = true
	_enemy_resource_label.fit_content = true
	_enemy_resource_label.scroll_active = false
	_enemy_resource_label.mouse_filter = MOUSE_FILTER_PASS
	_enemy_resource_label.tooltip_text = ""
	_enemy_resource_label.custom_minimum_size = Vector2(130, 0)
	hbox.add_child(_enemy_resource_label)

	# Command Points display
	_cp_label = Label.new()
	_cp_label.text = "CP: 0"
	_cp_label.add_theme_font_size_override("font_size", 12)
	_cp_label.add_theme_color_override("font_color", Color(0.5, 0.85, 1.0))
	_cp_label.custom_minimum_size = Vector2(50, 0)
	_cp_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	hbox.add_child(_cp_label)

	# VP display
	_vp_label = Label.new()
	_vp_label.text = "VP: 0 — 0"
	_vp_label.add_theme_font_size_override("font_size", 12)
	_vp_label.add_theme_color_override("font_color", Color(0.8, 0.7, 0.3))
	_vp_label.custom_minimum_size = Vector2(90, 0)
	_vp_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	hbox.add_child(_vp_label)


# ══════════════════════════════════════════════════════════════
# BOTTOM BAR — Active Unit | Skills | Combat Log
# ══════════════════════════════════════════════════════════════

func _build_bottom_bar():
	_bottom_bar = PanelContainer.new()
	_bottom_bar.set_anchors_and_offsets_preset(PRESET_BOTTOM_WIDE)
	_bottom_bar.offset_top = -130
	var bar_style = StyleBoxFlat.new()
	bar_style.bg_color = Color(0.05, 0.05, 0.09, 0.92)
	bar_style.border_width_top = 1
	bar_style.border_color = Color(0.25, 0.25, 0.35, 0.6)
	bar_style.content_margin_left = 6
	bar_style.content_margin_right = 6
	bar_style.content_margin_top = 4
	bar_style.content_margin_bottom = 4
	_bottom_bar.add_theme_stylebox_override("panel", bar_style)
	add_child(_bottom_bar)

	var main_hbox = HBoxContainer.new()
	main_hbox.add_theme_constant_override("separation", 6)
	_bottom_bar.add_child(main_hbox)

	# ── LEFT: Active Unit Info (fixed width) ──
	var unit_panel = PanelContainer.new()
	unit_panel.custom_minimum_size = Vector2(240, 0)
	unit_panel.size_flags_horizontal = Control.SIZE_SHRINK_BEGIN
	var up_style = StyleBoxFlat.new()
	up_style.bg_color = Color(0.07, 0.07, 0.13, 0.7)
	up_style.border_width_left = 3
	up_style.border_color = Color(0.3, 0.7, 1.0, 0.8)  # Side color accent — updated per unit
	up_style.corner_radius_top_left = 3
	up_style.corner_radius_bottom_left = 3
	up_style.corner_radius_top_right = 3
	up_style.corner_radius_bottom_right = 3
	up_style.content_margin_left = 8
	up_style.content_margin_right = 6
	up_style.content_margin_top = 4
	up_style.content_margin_bottom = 4
	unit_panel.add_theme_stylebox_override("panel", up_style)
	_active_unit_panel = unit_panel
	main_hbox.add_child(unit_panel)

	var unit_hbox = HBoxContainer.new()
	unit_hbox.add_theme_constant_override("separation", 6)
	unit_panel.add_child(unit_hbox)

	# Icon
	_active_icon = TextureRect.new()
	_active_icon.custom_minimum_size = Vector2(52, 52)
	_active_icon.expand_mode = TextureRect.EXPAND_FIT_WIDTH_PROPORTIONAL
	_active_icon.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	_active_icon.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	unit_hbox.add_child(_active_icon)

	# Text column
	var unit_vbox = VBoxContainer.new()
	unit_vbox.add_theme_constant_override("separation", 1)
	unit_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	unit_hbox.add_child(unit_vbox)

	# Name — plain Label, big and bold-colored
	_active_name_label = Label.new()
	_active_name_label.text = "—"
	_active_name_label.add_theme_font_size_override("font_size", 14)
	_active_name_label.add_theme_color_override("font_color", Color(0.4, 0.8, 1.0))
	_active_name_label.clip_text = true
	_active_name_label.custom_minimum_size = Vector2(170, 0)
	unit_vbox.add_child(_active_name_label)

	# Type subtitle
	_active_type_label = Label.new()
	_active_type_label.text = ""
	_active_type_label.add_theme_font_size_override("font_size", 10)
	_active_type_label.add_theme_color_override("font_color", Color(0.5, 0.5, 0.55))
	unit_vbox.add_child(_active_type_label)

	# Stats line — plain Label
	_active_stats_label = Label.new()
	_active_stats_label.text = "ATK — DEF — HP —/—"
	_active_stats_label.add_theme_font_size_override("font_size", 11)
	_active_stats_label.add_theme_color_override("font_color", Color(0.75, 0.75, 0.8))
	_active_stats_label.clip_text = true
	unit_vbox.add_child(_active_stats_label)

	# Second stat line
	_movement_label = Label.new()
	_movement_label.text = "MOV — RNG — MOR —"
	_movement_label.add_theme_font_size_override("font_size", 10)
	_movement_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.5))
	unit_vbox.add_child(_movement_label)

	# Status effects (BBCode needed for colors)
	_active_status_label = RichTextLabel.new()
	_active_status_label.bbcode_enabled = true
	_active_status_label.fit_content = true
	_active_status_label.scroll_active = false
	_active_status_label.mouse_filter = MOUSE_FILTER_IGNORE
	_active_status_label.custom_minimum_size = Vector2(170, 0)
	_active_status_label.add_theme_font_size_override("normal_font_size", 9)
	unit_vbox.add_child(_active_status_label)

	# ── CENTER: Skills + End Turn ──
	var skills_vbox = VBoxContainer.new()
	skills_vbox.add_theme_constant_override("separation", 3)
	skills_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	main_hbox.add_child(skills_vbox)

	# Skill grid in its own panel
	var skill_panel = PanelContainer.new()
	var sp_style = StyleBoxFlat.new()
	sp_style.bg_color = Color(0.06, 0.06, 0.1, 0.5)
	sp_style.corner_radius_top_left = 3
	sp_style.corner_radius_top_right = 3
	sp_style.corner_radius_bottom_left = 3
	sp_style.corner_radius_bottom_right = 3
	sp_style.content_margin_left = 4
	sp_style.content_margin_right = 4
	sp_style.content_margin_top = 4
	sp_style.content_margin_bottom = 4
	skill_panel.add_theme_stylebox_override("panel", sp_style)
	skill_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	skills_vbox.add_child(skill_panel)

	var skill_grid = GridContainer.new()
	skill_grid.columns = 6
	skill_grid.add_theme_constant_override("h_separation", 2)
	skill_grid.add_theme_constant_override("v_separation", 2)
	skill_panel.add_child(skill_grid)

	for i in range(12):
		var btn = Button.new()
		btn.custom_minimum_size = Vector2(40, 40)
		btn.focus_mode = Control.FOCUS_NONE
		btn.icon_alignment = HORIZONTAL_ALIGNMENT_CENTER
		btn.expand_icon = true
		btn.disabled = true
		skill_grid.add_child(btn)
		_skill_buttons.append(btn)

	# Bottom row: Select Target + End Turn
	var bottom_row = HBoxContainer.new()
	bottom_row.add_theme_constant_override("separation", 8)
	skills_vbox.add_child(bottom_row)

	_select_target_panel = PanelContainer.new()
	_select_target_panel.visible = false
	var st_style = _make_panel_style(Color(0.15, 0.1, 0.0, 0.8), 1, Color(0.9, 0.7, 0.2, 0.5))
	_select_target_panel.add_theme_stylebox_override("panel", st_style)
	var st_label = Label.new()
	st_label.text = "  Select Target  "
	st_label.add_theme_font_size_override("font_size", 11)
	st_label.add_theme_color_override("font_color", Color(1.0, 0.85, 0.3))
	_select_target_panel.add_child(st_label)
	bottom_row.add_child(_select_target_panel)

	var spacer = Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	bottom_row.add_child(spacer)

	_end_turn_btn = Button.new()
	_end_turn_btn.text = "End Turn"
	_end_turn_btn.custom_minimum_size = Vector2(80, 26)
	_end_turn_btn.focus_mode = Control.FOCUS_NONE
	_end_turn_btn.add_theme_font_size_override("font_size", 11)
	var etn = _make_btn_style(Color(0.22, 0.22, 0.28, 0.8))
	var eth = _make_btn_style(Color(0.32, 0.32, 0.38, 0.9))
	var etp = _make_btn_style(Color(0.18, 0.18, 0.22, 0.95))
	var etd = _make_btn_style(Color(0.1, 0.1, 0.13, 0.5))
	_end_turn_btn.add_theme_stylebox_override("normal", etn)
	_end_turn_btn.add_theme_stylebox_override("hover", eth)
	_end_turn_btn.add_theme_stylebox_override("pressed", etp)
	_end_turn_btn.add_theme_stylebox_override("disabled", etd)
	_end_turn_btn.add_theme_color_override("font_color", Color(0.8, 0.8, 0.85))
	_end_turn_btn.add_theme_color_override("font_disabled_color", Color(0.3, 0.3, 0.35))
	_end_turn_btn.pressed.connect(_on_end_turn_button_pressed)
	bottom_row.add_child(_end_turn_btn)

	# ── RIGHT: Combat Log ──
	var log_panel = PanelContainer.new()
	log_panel.custom_minimum_size = Vector2(280, 0)
	log_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	log_panel.size_flags_stretch_ratio = 0.75
	var lp_style = StyleBoxFlat.new()
	lp_style.bg_color = Color(0.03, 0.03, 0.06, 0.7)
	lp_style.border_width_left = 1
	lp_style.border_color = Color(0.2, 0.2, 0.3, 0.4)
	lp_style.corner_radius_top_left = 3
	lp_style.corner_radius_top_right = 3
	lp_style.corner_radius_bottom_left = 3
	lp_style.corner_radius_bottom_right = 3
	lp_style.content_margin_left = 6
	lp_style.content_margin_right = 6
	lp_style.content_margin_top = 3
	lp_style.content_margin_bottom = 3
	log_panel.add_theme_stylebox_override("panel", lp_style)
	main_hbox.add_child(log_panel)

	var log_vbox = VBoxContainer.new()
	log_vbox.add_theme_constant_override("separation", 1)
	log_panel.add_child(log_vbox)

	var log_title = Label.new()
	log_title.text = "COMBAT LOG"
	log_title.add_theme_font_size_override("font_size", 9)
	log_title.add_theme_color_override("font_color", Color(0.4, 0.4, 0.5))
	log_vbox.add_child(log_title)

	_log_text = RichTextLabel.new()
	_log_text.bbcode_enabled = true
	_log_text.scroll_following = true
	_log_text.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_log_text.add_theme_font_size_override("normal_font_size", 10)
	log_vbox.add_child(_log_text)


# ══════════════════════════════════════════════════════════════
# INSPECT PANEL — Click any unit to see full info
# ══════════════════════════════════════════════════════════════

func _build_inspect_panel():
	_inspect_panel = PanelContainer.new()
	_inspect_panel.visible = false
	_inspect_panel.set_anchors_preset(PRESET_CENTER_LEFT)
	_inspect_panel.offset_left = 16
	_inspect_panel.offset_right = 290
	_inspect_panel.offset_top = -120
	_inspect_panel.offset_bottom = 120
	_inspect_panel.add_theme_stylebox_override("panel", _make_panel_style(
		Color(0.06, 0.06, 0.12, 0.94), 2, Color(0.6, 0.5, 0.2, 0.7)))
	_inspect_panel.mouse_filter = MOUSE_FILTER_STOP
	add_child(_inspect_panel)

	var margin = MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 10)
	margin.add_theme_constant_override("margin_right", 10)
	margin.add_theme_constant_override("margin_top", 8)
	margin.add_theme_constant_override("margin_bottom", 8)
	_inspect_panel.add_child(margin)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 4)
	margin.add_child(vbox)

	# Header row: icon + name
	var header = HBoxContainer.new()
	header.add_theme_constant_override("separation", 8)
	vbox.add_child(header)

	_inspect_icon = TextureRect.new()
	_inspect_icon.custom_minimum_size = Vector2(48, 48)
	_inspect_icon.expand_mode = TextureRect.EXPAND_FIT_WIDTH_PROPORTIONAL
	_inspect_icon.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	_inspect_icon.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	header.add_child(_inspect_icon)

	_inspect_name = RichTextLabel.new()
	_inspect_name.bbcode_enabled = true
	_inspect_name.fit_content = true
	_inspect_name.scroll_active = false
	_inspect_name.mouse_filter = MOUSE_FILTER_IGNORE
	_inspect_name.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_inspect_name.custom_minimum_size = Vector2(0, 40)
	header.add_child(_inspect_name)

	var sep = HSeparator.new()
	vbox.add_child(sep)

	_inspect_stats = RichTextLabel.new()
	_inspect_stats.bbcode_enabled = true
	_inspect_stats.fit_content = true
	_inspect_stats.scroll_active = false
	_inspect_stats.mouse_filter = MOUSE_FILTER_IGNORE
	_inspect_stats.custom_minimum_size = Vector2(0, 40)
	vbox.add_child(_inspect_stats)

	_inspect_status = RichTextLabel.new()
	_inspect_status.bbcode_enabled = true
	_inspect_status.fit_content = true
	_inspect_status.scroll_active = false
	_inspect_status.mouse_filter = MOUSE_FILTER_IGNORE
	_inspect_status.custom_minimum_size = Vector2(0, 16)
	vbox.add_child(_inspect_status)

	var sep2 = HSeparator.new()
	vbox.add_child(sep2)

	_inspect_specials = RichTextLabel.new()
	_inspect_specials.bbcode_enabled = true
	_inspect_specials.fit_content = true
	_inspect_specials.scroll_active = false
	_inspect_specials.mouse_filter = MOUSE_FILTER_IGNORE
	_inspect_specials.custom_minimum_size = Vector2(0, 20)
	vbox.add_child(_inspect_specials)

	# Close hint
	var close_hint = Label.new()
	close_hint.text = "Click to close"
	close_hint.add_theme_font_size_override("font_size", 9)
	close_hint.add_theme_color_override("font_color", Color(0.4, 0.4, 0.45))
	close_hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(close_hint)


# ══════════════════════════════════════════════════════════════
# CARD HAND
# ══════════════════════════════════════════════════════════════

func _build_card_hand():
	_card_hand_panel = PanelContainer.new()
	_card_hand_panel.visible = false
	_card_hand_panel.set_anchors_and_offsets_preset(PRESET_BOTTOM_WIDE)
	_card_hand_panel.offset_top = -200
	_card_hand_panel.offset_bottom = -164
	_card_hand_panel.add_theme_stylebox_override("panel", _make_panel_style(Color(0.05, 0.04, 0.1, 0.85)))
	add_child(_card_hand_panel)

	_card_hand_container = HBoxContainer.new()
	_card_hand_container.add_theme_constant_override("separation", 4)
	_card_hand_panel.add_child(_card_hand_container)


## Build tutorial tips panel — shows campaign mission tips in a dismissible overlay
func _build_tutorial_tips():
	if not BattleConfig.is_campaign or BattleConfig.tutorial_tips.is_empty():
		return

	_tutorial_panel = PanelContainer.new()
	_tutorial_panel.set_anchors_preset(PRESET_CENTER_RIGHT)
	_tutorial_panel.offset_left = -280
	_tutorial_panel.offset_right = -12
	_tutorial_panel.offset_top = -100
	_tutorial_panel.offset_bottom = 100
	var tip_style = _make_panel_style(Color(0.06, 0.06, 0.12, 0.92), 1, Color(0.8, 0.65, 0.15, 0.4))
	tip_style.content_margin_left = 12
	tip_style.content_margin_right = 12
	tip_style.content_margin_top = 8
	tip_style.content_margin_bottom = 8
	_tutorial_panel.add_theme_stylebox_override("panel", tip_style)
	_tutorial_panel.mouse_filter = MOUSE_FILTER_STOP
	add_child(_tutorial_panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 6)
	_tutorial_panel.add_child(vbox)

	# Header row with dismiss button
	var header = HBoxContainer.new()
	header.add_theme_constant_override("separation", 6)
	vbox.add_child(header)

	var title = Label.new()
	title.text = "💡 TIPS"
	title.add_theme_font_size_override("font_size", 12)
	title.add_theme_color_override("font_color", Color(0.9, 0.8, 0.3))
	title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	header.add_child(title)

	var dismiss_btn = Button.new()
	dismiss_btn.text = "✕"
	dismiss_btn.custom_minimum_size = Vector2(24, 24)
	dismiss_btn.add_theme_font_size_override("font_size", 12)
	dismiss_btn.focus_mode = Control.FOCUS_NONE
	dismiss_btn.flat = true
	dismiss_btn.add_theme_color_override("font_color", Color(0.6, 0.5, 0.4))
	dismiss_btn.add_theme_color_override("font_hover_color", Color(1.0, 0.8, 0.4))
	dismiss_btn.pressed.connect(func(): _tutorial_panel.queue_free())
	header.add_child(dismiss_btn)

	# Tip entries
	for tip in BattleConfig.tutorial_tips:
		var tip_label = RichTextLabel.new()
		tip_label.bbcode_enabled = true
		tip_label.fit_content = true
		tip_label.scroll_active = false
		tip_label.mouse_filter = MOUSE_FILTER_IGNORE
		tip_label.text = "[color=#CCCCDD][font_size=11]• %s[/font_size][/color]" % tip
		vbox.add_child(tip_label)


# ══════════════════════════════════════════════════════════════
# STYLE HELPERS
# ══════════════════════════════════════════════════════════════

func _make_panel_style(bg: Color, border_w: int = 0, border_c: Color = Color.TRANSPARENT) -> StyleBoxFlat:
	var s = StyleBoxFlat.new()
	s.bg_color = bg
	s.corner_radius_top_left = 4
	s.corner_radius_top_right = 4
	s.corner_radius_bottom_left = 4
	s.corner_radius_bottom_right = 4
	s.content_margin_left = 8
	s.content_margin_right = 8
	s.content_margin_top = 4
	s.content_margin_bottom = 4
	if border_w > 0:
		s.border_width_top = border_w
		s.border_width_bottom = border_w
		s.border_width_left = border_w
		s.border_width_right = border_w
		s.border_color = border_c
	return s

func _make_btn_style(bg: Color) -> StyleBoxFlat:
	var s = StyleBoxFlat.new()
	s.bg_color = bg
	s.corner_radius_top_left = 3
	s.corner_radius_top_right = 3
	s.corner_radius_bottom_left = 3
	s.corner_radius_bottom_right = 3
	s.content_margin_left = 8
	s.content_margin_right = 8
	s.content_margin_top = 4
	s.content_margin_bottom = 4
	return s


# ══════════════════════════════════════════════════════════════
# SIGNAL HANDLERS — Turn Queue
# ══════════════════════════════════════════════════════════════

func add_turn_queue_icon(combatant: Dictionary):
	if _turn_queue_container == null:
		return
	var new_icon = TQIcon.instantiate()
	_turn_queue_container.add_child(new_icon)
	new_icon.set_max_hp(combatant.max_hp)
	new_icon.set_hp(combatant.hp)
	new_icon.texture = combatant.icon
	new_icon.name = combatant.name
	new_icon.set_side(combatant.side)
	new_icon.tooltip_text = combatant.name

func update_turn_queue(combatants: Array, turn_queue: Array):
	for c in turn_queue:
		var comb = combatants[c]
		add_turn_queue_icon(comb)

func combatant_died(combatant):
	var turn_queue_icon = _turn_queue_container.find_child(combatant.name, false, false)
	if turn_queue_icon != null:
		turn_queue_icon.queue_free()

func add_combatant_status(comb: Dictionary):
	pass  # No longer using the old sidebar — info is in the bottom bar + inspect panel


# ══════════════════════════════════════════════════════════════
# SIGNAL HANDLERS — Active Unit Display
# ══════════════════════════════════════════════════════════════

func show_combatant_status_main(comb: Dictionary):
	if _active_icon == null:
		return
	_current_comb = comb
	# Icon
	_active_icon.texture = comb.get("icon", null)

	# Name — plain Label, colored by side
	var side_color = SIDE_COLORS.get(comb.side, Color.WHITE)
	_active_name_label.text = comb.name
	_active_name_label.add_theme_color_override("font_color", side_color)

	# Type subtitle
	var side_tag = "ALLY" if comb.side == 0 else "ENEMY"
	var type_idx = comb.definition.unit_type if comb.has("definition") else 1
	var type_name = UNIT_TYPE_NAMES[type_idx] if type_idx < UNIT_TYPE_NAMES.size() else "Unit"
	_active_type_label.text = "%s  ·  %s" % [side_tag, type_name]

	# Update left-border accent color to match side
	if _active_unit_panel:
		var style: StyleBoxFlat = _active_unit_panel.get_theme_stylebox("panel").duplicate()
		style.border_color = side_color * Color(1, 1, 1, 0.8)
		_active_unit_panel.add_theme_stylebox_override("panel", style)

	# Stats
	_update_active_stats(comb)

	# Status
	_update_status_text(_active_status_label, comb)

	# Skills
	set_skill_list(comb.skill_list)

	# Round display
	if combat:
		_round_label.text = "Round %d" % combat.round_number

	# Phase indicator — faction-themed turn announcement
	var turn_label := "YOUR TURN"
	var turn_color := Color(0.3, 0.85, 0.4)
	if combat:
		var faction = combat.side_faction[comb.side]
		var flavor = TURN_FLAVOR.get(faction, ["YOUR TURN", "ENEMY TURN"])
		if comb.side == 0:
			turn_label = flavor[0]
		else:
			turn_label = flavor[1]
			turn_color = Color(1.0, 0.4, 0.3)
	_phase_label.text = turn_label
	_phase_label.add_theme_color_override("font_color", turn_color)


func _update_active_stats(comb: Dictionary):
	var atk_mod = comb.get("atk_modifier", 0)
	var def_mod = comb.get("def_modifier", 0)
	var atk_total = comb.atk + atk_mod
	var def_total = comb.defense + def_mod
	var mor_total = comb.mor + comb.get("mor_modifier", 0)

	# Top stat line
	var atk_str = "ATK %d" % atk_total
	if atk_mod != 0:
		atk_str += "(%+d)" % atk_mod
	var def_str = "DEF %d" % def_total
	if def_mod != 0:
		def_str += "(%+d)" % def_mod
	_active_stats_label.text = "%s  |  %s  |  HP %d/%d" % [atk_str, def_str, comb.hp, comb.max_hp]

	# Bottom stat line (MOV/RNG/MOR) — reusing _movement_label for the secondary stats
	var mov_total = comb.mov + comb.get("mov_modifier", 0)
	_movement_label.text = "MOV %d  |  RNG %d  |  MOR %d" % [mov_total, comb.rng, mor_total]


func _update_status_text(label: RichTextLabel, comb: Dictionary):
	label.clear()
	var parts := []
	if comb.get("shaken", false):
		parts.append("[color=orange]SHAKEN[/color]")
	if comb.get("has_charged", false):
		parts.append("[color=cyan]CHARGED[/color]")
	if comb.get("overwatch_active", false):
		parts.append("[color=yellow]OVERWATCH[/color]")
	var atk_mod = comb.get("atk_modifier", 0)
	if atk_mod != 0:
		var c = "lime" if atk_mod > 0 else "red"
		parts.append("[color=%s]ATK %+d[/color]" % [c, atk_mod])
	var def_mod = comb.get("def_modifier", 0)
	if def_mod != 0:
		var c = "lime" if def_mod > 0 else "red"
		parts.append("[color=%s]DEF %+d[/color]" % [c, def_mod])
	for effect in comb.get("status_effects", []):
		parts.append("[color=#CC88CC]%s[/color]" % effect.capitalize())
	if comb.get("corruption_tokens", 0) > 0:
		parts.append("[color=#AA33AA]Corruption x%d[/color]" % comb.corruption_tokens)
	if parts.is_empty():
		label.append_text("[color=#555555]No status effects[/color]")
	else:
		label.append_text(" ".join(parts))


# ══════════════════════════════════════════════════════════════
# INSPECT — Full detail popup for any unit
# ══════════════════════════════════════════════════════════════

func _show_inspect(comb: Dictionary):
	_inspected_comb = comb
	_inspect_panel.visible = true

	# Icon
	_inspect_icon.texture = comb.get("icon", null)

	# Name
	var side_color = SIDE_COLORS.get(comb.side, Color.WHITE)
	var side_tag = "ALLY" if comb.side == 0 else "ENEMY"
	var type_idx = comb.definition.unit_type if comb.has("definition") else 1
	var type_name = UNIT_TYPE_NAMES[type_idx] if type_idx < UNIT_TYPE_NAMES.size() else "Unit"
	_inspect_name.clear()
	_inspect_name.append_text("[color=#%s][b]%s[/b][/color]\n" % [side_color.to_html(false), comb.name])
	_inspect_name.push_font_size(10)
	_inspect_name.append_text("[color=#888888]%s · %s[/color]" % [side_tag, type_name])
	_inspect_name.pop()

	# Stats
	var atk_mod = comb.get("atk_modifier", 0)
	var def_mod = comb.get("def_modifier", 0)
	var atk_total = comb.atk + atk_mod
	var def_total = comb.defense + def_mod
	var atk_c = "orange" if atk_mod > 0 else ("#FFA040" if atk_mod == 0 else "red")
	var def_c = "#60B0FF" if def_mod >= 0 else "red"
	_inspect_stats.clear()
	_inspect_stats.append_text(
		"[color=%s]ATK %d[/color]  [color=%s]DEF %d[/color]  [color=#50FF50]HP %d/%d[/color]\n" % [
			atk_c, atk_total, def_c, def_total, comb.hp, comb.max_hp] +
		"[color=#FFFF60]MOV %d[/color]  [color=#DD80DD]RNG %d[/color]  [color=#CCCCCC]MOR %d[/color]  [color=#FFCC44]CMD %d[/color]" % [
			comb.mov, comb.rng, comb.mor + comb.get("mor_modifier", 0), comb.get("cmd", 0)]
	)

	# Status effects
	_update_status_text(_inspect_status, comb)

	# Specials & skills — with keyword glossary tooltips
	_inspect_specials.clear()
	if comb.has("definition"):
		var def: CombatantDefinition = comb.definition
		if def.specials.size() > 0:
			_inspect_specials.append_text("[color=#AA9966]Specials:[/color]\n")
			for sp in def.specials:
				var keyword_desc = GameRules.KEYWORDS.get(sp, "")
				if keyword_desc != "":
					_inspect_specials.append_text("  [color=#CCBB88]%s[/color] — [color=#888877][i]%s[/i][/color]\n" % [sp, keyword_desc])
				else:
					_inspect_specials.append_text("  [color=#CCBB88]%s[/color]\n" % sp)
		if comb.skill_list.size() > 0:
			_inspect_specials.append_text("[color=#7799AA]Skills:[/color] ")
			var skill_parts := []
			for sk in comb.skill_list:
				var display_name = sk.capitalize().replace("_", " ")
				if SkillDatabase.skills.has(sk):
					display_name = SkillDatabase.skills[sk].name
				skill_parts.append("[color=#99BBCC]%s[/color]" % display_name)
			_inspect_specials.append_text(", ".join(skill_parts))

func _hide_inspect():
	_inspect_panel.visible = false
	_inspected_comb = {}

## Show terrain info when right-clicking an empty tile
func _show_terrain_inspect(tile_pos: Vector2i) -> void:
	if controller == null or controller.tile_map == null:
		_hide_inspect()
		return
	var tile_data = controller.tile_map.get_cell_tile_data(0, tile_pos)
	if tile_data == null:
		_hide_inspect()
		return
	var cost = int(tile_data.get_custom_data("Cost"))
	var terrain_name := "Open Ground"
	var terrain_desc := "No movement penalty, no cover."
	if cost < 0 or cost >= 99:
		terrain_name = "Impassable"
		terrain_desc = "Cannot be traversed. Blocks line of sight."
	elif cost >= 3:
		terrain_name = "Heavy Cover"
		terrain_desc = "MOV cost %d. +2 DEF cover vs ranged. Obscures LoS." % cost
	elif cost >= 2:
		terrain_name = "Difficult / Forest"
		terrain_desc = "MOV cost %d. +1 DEF cover vs ranged. +1 ATK if elevated." % cost
	elif cost == 1:
		terrain_desc = "MOV cost 1. No cover bonus."
	# Show in inspect panel
	_inspected_comb = {}
	_inspect_icon.texture = null
	_inspect_name.clear()
	_inspect_name.append_text("[b][color=silver]%s[/color][/b]\n[color=gray]Tile (%d, %d)[/color]" % [terrain_name, tile_pos.x, tile_pos.y])
	_inspect_stats.clear()
	_inspect_stats.append_text("[color=silver]%s[/color]" % terrain_desc)
	_inspect_status.clear()
	_inspect_specials.clear()
	_inspect_panel.visible = true


# ══════════════════════════════════════════════════════════════
# SKILL BUTTONS
# ══════════════════════════════════════════════════════════════

func set_skill_list(skill_list: Array):
	if _skill_buttons.is_empty():
		return
	var is_player_turn = controller.player_turn if controller else false
	for i in range(_skill_buttons.size()):
		var btn = _skill_buttons[i]
		_clear_btn_connections(btn)
		if not is_player_turn:
			btn.disabled = true
			btn.icon = null
			btn.tooltip_text = ""
			continue
		btn.disabled = false
		if skill_list.size() > i:
			var skill_key = skill_list[i]
			if SkillDatabase.skills.has(skill_key):
				var skill = SkillDatabase.skills[skill_key]
				btn.icon = skill.icon
				btn.tooltip_text = "%s\n%s" % [skill.name, skill.description]
			else:
				btn.icon = SpriteGenerator.get_skill_icon(skill_key)
				btn.tooltip_text = skill_key.capitalize().replace("_", " ")
			var captured_key = skill_key
			btn.pressed.connect(func():
				controller.set_selected_skill(captured_key)
				controller.begin_target_selection()
			)
		else:
			btn.icon = null
			btn.tooltip_text = ""
			btn.disabled = true

	_end_turn_btn.disabled = not is_player_turn

func _clear_btn_connections(btn: Button):
	for conn in btn.pressed.get_connections():
		btn.pressed.disconnect(conn.callable)


# ══════════════════════════════════════════════════════════════
# SIGNAL HANDLERS — Combat events
# ══════════════════════════════════════════════════════════════

func _on_end_turn_button_pressed():
	turn_ended.emit()

func update_information(info: String):
	if _log_text == null:
		return
	_log_text.append_text(info)

func update_combatants(combatants: Array):
	if _turn_queue_container == null:
		return
	# Update turn queue icons
	for comb in combatants:
		var tq_icon = _turn_queue_container.find_child(comb.name, false, false)
		if tq_icon != null:
			tq_icon.set_hp(comb.hp)
			tq_icon.set_side(comb.side)
			tq_icon.set_turn_taken(comb.turn_taken)
	# Refresh inspect panel if it's showing and the unit is still there
	if _inspect_panel.visible and not _inspected_comb.is_empty():
		_show_inspect(_inspected_comb)

func set_movement(movement):
	if _movement_label == null:
		return
	var mor_total = 0
	if not _current_comb.is_empty():
		mor_total = _current_comb.get("mor", 0) + _current_comb.get("mor_modifier", 0)
		_movement_label.text = "MOV %d left  |  RNG %d  |  MOR %d" % [movement, _current_comb.get("rng", 0), mor_total]
	else:
		_movement_label.text = "MOV %d left" % movement

func _target_selection_finished():
	_select_target_panel.visible = false

func _target_selection_started():
	_select_target_panel.visible = true


# ══════════════════════════════════════════════════════════════
# FACTION RESOURCES
# ══════════════════════════════════════════════════════════════

func update_faction_resources(faction_state: Dictionary):
	if _resource_label == null:
		return
	_resource_label.clear()
	var tooltip_parts := []
	if faction_state.has("heat"):
		var tier = _get_resource_tier("heat", faction_state.heat)
		_resource_label.append_text("[color=#FF4010]Heat: %d[/color] [color=#AA6030](%s)[/color]\n" % [faction_state.heat, tier])
		tooltip_parts.append("HEAT: Builds from fire attacks. High Heat unlocks powerful flame abilities. At 10+, triggers Overheat (2 dmg to all friendlies).")
	if faction_state.has("grid_cohesion"):
		var tier = _get_resource_tier("grid_cohesion", faction_state.grid_cohesion)
		_resource_label.append_text("[color=#8090CC]Grid: %d[/color] [color=#6070AA](%s)[/color]\n" % [faction_state.grid_cohesion, tier])
		tooltip_parts.append("GRID COHESION: Grows when units are in formation. Grants DEF bonuses at higher tiers. Drops when units die.")
	if faction_state.has("hunger"):
		var tier = _get_resource_tier("hunger", faction_state.hunger)
		_resource_label.append_text("[color=#CC2255]Hunger: %d[/color] [color=#AA3355](%s)[/color]\n" % [faction_state.hunger, tier])
		tooltip_parts.append("HUNGER: Rises each round and from kills. High Hunger boosts ATK but units take self-damage at Frenzy (10+).")
	if faction_state.has("flow"):
		var tier = _get_resource_tier("flow", faction_state.flow)
		_resource_label.append_text("[color=#3388EE]Flow: %d[/color] [color=#2266BB](%s)[/color]\n" % [faction_state.flow, tier])
		tooltip_parts.append("RITUAL FLOW: Generated by stance switching and cards. Spent on powerful spirit abilities like teleport and spirit surge.")
	if faction_state.has("fate_threads"):
		var tier = _get_resource_tier("fate_threads", faction_state.fate_threads)
		_resource_label.append_text("[color=#33BB55]Fate: %d[/color] [color=#229944](%s)[/color]\n" % [faction_state.fate_threads, tier])
		tooltip_parts.append("FATE THREADS: Woven near Web-Anchors. Spent to reroll dice (Fate Weave) or negate enemy cards (Fate Sever).")
	if tooltip_parts.size() > 0:
		_resource_label.tooltip_text = "\n".join(tooltip_parts)

	# Update CP display
	if combat and _cp_label:
		_cp_label.text = "CP: %d" % combat.command_points[0]

	# Update VP display
	if combat and combat.scenario_manager:
		var vp = combat.scenario_manager.vp
		_vp_label.text = "VP: %d — %d" % [vp[0], vp[1]]


## Get a thematic tier label for a faction resource value
func _get_resource_tier(resource_key: String, value: int) -> String:
	if resource_key not in RESOURCE_TIERS:
		return ""
	var tiers = RESOURCE_TIERS[resource_key]
	var label := tiers[0][1]  # Default to lowest tier name
	if value == 0:
		return "Dormant"
	for tier in tiers:
		if value >= tier[0]:
			label = tier[1]
	return label


# ══════════════════════════════════════════════════════════════
# CARD HAND
# ══════════════════════════════════════════════════════════════

func update_card_hand(cards: Array):
	if _card_hand_panel == null:
		return
	_card_hand_panel.visible = cards.size() > 0
	for child in _card_hand_container.get_children():
		child.queue_free()

	# Card type colors
	var type_colors := {
		"tactical": Color(0.3, 0.5, 0.8),
		"fragment": Color(0.8, 0.5, 0.15),
		"command": Color(0.7, 0.25, 0.7),
	}

	for card in cards:
		var btn = Button.new()
		btn.custom_minimum_size = Vector2(120, 30)
		var cp_cost = card.get("cp_cost", 1)
		var card_type = card.get("type", "tactical")
		btn.text = "%s (%dCP)" % [card.get("name", "Card"), cp_cost]
		btn.tooltip_text = "%s — Cost: %d CP\n%s" % [card_type.capitalize(), cp_cost, card.get("description", "")]
		# Add flavor text if present
		var flavor = card.get("flavor_text", "")
		if flavor != "":
			btn.tooltip_text = "\"%s\"\n\n%s" % [flavor, btn.tooltip_text]
		btn.add_theme_font_size_override("font_size", 11)

		# Color by card type
		var accent = type_colors.get(card_type, Color(0.4, 0.4, 0.5))
		var style_n = _make_btn_style(Color(accent.r, accent.g, accent.b, 0.25))
		style_n.border_width_bottom = 2
		style_n.border_color = accent
		btn.add_theme_stylebox_override("normal", style_n)
		var style_h = _make_btn_style(Color(accent.r, accent.g, accent.b, 0.45))
		style_h.border_width_bottom = 2
		style_h.border_color = accent.lightened(0.3)
		btn.add_theme_stylebox_override("hover", style_h)

		# Dim cards the player can't afford
		if combat and combat.command_points[0] < cp_cost:
			btn.modulate = Color(0.5, 0.5, 0.5, 0.7)
			btn.tooltip_text += "\n[Not enough CP]"
		btn.pressed.connect(func(): _on_card_played(card))
		_card_hand_container.add_child(btn)

func _on_card_played(card: Dictionary):
	AudioManager.play_sfx("card_play")
	if combat.has_method("play_card"):
		combat.play_card(card)


# ══════════════════════════════════════════════════════════════
# PHASE INDICATOR
# ══════════════════════════════════════════════════════════════

func update_phase(phase_name: String):
	if _phase_label == null:
		return
	_phase_label.text = phase_name

## Called when combat advances to a new unit's turn (connected via scene signal)
func _on_combat_turn_advanced(combatant: Dictionary):
	# Update phase label with active unit info
	var side_label := "Player" if combatant.side == 0 else "Enemy"
	var phase_text := GameStateMachine.get_phase_name()
	if _phase_label:
		_phase_label.text = "Round %d — %s — %s" % [GameStateMachine.round_number, phase_text, combatant.get("name", side_label)]


# ══════════════════════════════════════════════════════════════
# RESULTS SCREEN
# ══════════════════════════════════════════════════════════════

func show_results_screen(results: Dictionary):
	# Hide normal UI elements
	_top_bar.visible = false
	_bottom_bar.visible = false
	_card_hand_panel.visible = false
	_inspect_panel.visible = false

	# Build results overlay
	var overlay = ColorRect.new()
	overlay.name = "ResultsOverlay"
	overlay.color = Color(0.0, 0.0, 0.0, 0.75)
	overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(overlay)

	var panel = PanelContainer.new()
	panel.set_anchors_preset(Control.PRESET_CENTER)
	panel.custom_minimum_size = Vector2(420, 340)
	panel.position = Vector2(-210, -170)
	panel.add_theme_stylebox_override("panel", _make_panel_style(
		Color(0.08, 0.08, 0.14, 0.95), 2, Color(0.8, 0.65, 0.2, 1.0)))
	overlay.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 8)
	panel.add_child(vbox)

	var winner_color = "lime" if results.winner == "Players" else "red"
	# Play win or defeat music
	if results.winner == "Players":
		AudioManager.play_music("win", false)
	else:
		AudioManager.play_music("defeat", false)
	# Faction-themed victory/defeat banner
	var banner_text := "%s Win!" % results.winner
	var epitaph_text := ""
	if combat:
		var winner_side = 0 if results.winner == "Players" else 1
		var loser_side = 1 - winner_side
		var winner_faction = combat.side_faction[winner_side]
		var loser_faction = combat.side_faction[loser_side]
		var win_flavor = Combat.VICTORY_FLAVOR.get(winner_faction, ["VICTORY!", "Defeat."])
		var lose_flavor = Combat.VICTORY_FLAVOR.get(loser_faction, ["Victory!", "Defeat."])
		if results.winner == "Players":
			banner_text = win_flavor[0]
		else:
			banner_text = lose_flavor[1]
		epitaph_text = "In %d rounds, the shards changed hands." % results.round
	var title = RichTextLabel.new()
	title.bbcode_enabled = true
	title.fit_content = true
	title.scroll_active = false
	title.text = "[center][color=gold]══ BATTLE COMPLETE ══[/color]\n[color=%s]%s[/color]" % [winner_color, banner_text]
	if epitaph_text != "":
		title.text += "\n[color=#8888AA][i]%s[/i][/color]" % epitaph_text
	title.text += "[/center]"
	title.custom_minimum_size = Vector2(0, 65)
	vbox.add_child(title)

	var info = RichTextLabel.new()
	info.bbcode_enabled = true
	info.fit_content = true
	info.scroll_active = false
	info.text = "[center][color=silver]%s — Round %d[/color][/center]" % [results.scenario, results.round]
	info.custom_minimum_size = Vector2(0, 22)
	vbox.add_child(info)

	vbox.add_child(HSeparator.new())

	var vp_label = RichTextLabel.new()
	vp_label.bbcode_enabled = true
	vp_label.fit_content = true
	vp_label.scroll_active = false
	vp_label.text = "[center][color=gold]Victory Points[/color]\n[color=cyan]%s: %d[/color]  —  [color=orange]%s: %d[/color][/center]" % [
		results.player_faction, results.player_vp, results.enemy_faction, results.enemy_vp]
	vp_label.custom_minimum_size = Vector2(0, 40)
	vbox.add_child(vp_label)

	var cas = RichTextLabel.new()
	cas.bbcode_enabled = true
	cas.fit_content = true
	cas.scroll_active = false
	cas.text = "[center][color=gold]Casualties[/color]\n"
	cas.text += "[color=cyan]%s[/color]: %d surviving, %d lost\n" % [
		results.player_faction, results.player_surviving, results.player_lost]
	cas.text += "[color=orange]%s[/color]: %d surviving, %d lost[/center]" % [
		results.enemy_faction, results.enemy_surviving, results.enemy_lost]
	cas.custom_minimum_size = Vector2(0, 55)
	vbox.add_child(cas)

	vbox.add_child(HSeparator.new())

	var btn_c = CenterContainer.new()
	vbox.add_child(btn_c)
	var btn = Button.new()

	# Campaign mode: record result and return to campaign overview
	if BattleConfig.is_campaign and BattleConfig.campaign_manager != null:
		var victory = (results.winner == "Players")
		# Gather player casualties
		var player_casualties: Array = []
		if combat:
			for comb in combat.combatants:
				if comb.side == 0 and not comb.alive:
					player_casualties.append(comb.name)
		var mission_result = BattleConfig.campaign_manager.complete_mission(victory, player_casualties)
		BattleConfig.set_meta("last_battle_won", victory)

		# Show campaign rewards section
		if victory:
			var rewards = RichTextLabel.new()
			rewards.bbcode_enabled = true
			rewards.fit_content = true
			rewards.scroll_active = false
			var rewards_text = "[center][color=gold]═ Campaign Rewards ═[/color]\n"
			var xp_amount = mission_result.get("xp_gained", 5)
			var survivors = BattleConfig.player_army.size() - player_casualties.size()
			rewards_text += "[color=#88CC88]+%d XP to %d surviving units[/color]\n" % [xp_amount, survivors]
			var level_ups = mission_result.get("level_ups", [])
			if not level_ups.is_empty():
				for lu in level_ups:
					rewards_text += "[color=#FFD700]★ %s → Level %d (%s)[/color]\n" % [lu.unit, lu.level, lu.bonus]
			rewards_text += "[/center]"
			rewards.text = rewards_text
			rewards.custom_minimum_size = Vector2(0, 40)
			vbox.add_child(rewards)
			vbox.add_child(HSeparator.new())

		if victory:
			btn.text = "Continue Campaign"
		else:
			# Show defeat consequences
			var xp_lost = mission_result.get("xp_lost_units", [])
			if not xp_lost.is_empty():
				var penalty = RichTextLabel.new()
				penalty.bbcode_enabled = true
				penalty.fit_content = true
				penalty.scroll_active = false
				penalty.text = "[center][color=#FF6644]═ Defeat Penalty ═[/color]\n"
				penalty.text += "[color=#CC8888]Fallen units lost XP: %s[/color][/center]" % ", ".join(xp_lost)
				penalty.custom_minimum_size = Vector2(0, 30)
				vbox.add_child(penalty)
				vbox.add_child(HSeparator.new())
			btn.text = "Retry Mission"
		btn.custom_minimum_size = Vector2(200, 40)
		btn.pressed.connect(func(): get_tree().change_scene_to_file("res://scenes/campaign_overview.tscn"))
	else:
		btn.text = "Return to Menu"
		btn.custom_minimum_size = Vector2(180, 40)
		btn.pressed.connect(func(): get_tree().change_scene_to_file("res://scenes/main_menu.tscn"))
	btn_c.add_child(btn)

	# Retry button — immediately replays the same battle
	var retry_btn_c = CenterContainer.new()
	vbox.add_child(retry_btn_c)
	var retry_btn = Button.new()
	retry_btn.text = "Retry Battle"
	retry_btn.custom_minimum_size = Vector2(140, 32)
	retry_btn.add_theme_font_size_override("font_size", 12)
	retry_btn.add_theme_color_override("font_color", Color(0.7, 0.7, 0.75))
	retry_btn.pressed.connect(func():
		get_tree().paused = false
		Engine.time_scale = 1.0
		get_tree().change_scene_to_file("res://scenes/game.tscn"))
	retry_btn_c.add_child(retry_btn)


# ══════════════════════════════════════════════════════════════
# PAUSE MENU
# ══════════════════════════════════════════════════════════════

func _build_pause_menu():
	_pause_overlay = ColorRect.new()
	_pause_overlay.color = Color(0.0, 0.0, 0.0, 0.65)
	_pause_overlay.set_anchors_preset(PRESET_FULL_RECT)
	_pause_overlay.mouse_filter = MOUSE_FILTER_STOP
	_pause_overlay.visible = false
	_pause_overlay.process_mode = Node.PROCESS_MODE_ALWAYS
	add_child(_pause_overlay)

	_pause_panel = PanelContainer.new()
	_pause_panel.set_anchors_preset(PRESET_CENTER)
	_pause_panel.custom_minimum_size = Vector2(320, 340)
	_pause_panel.position = Vector2(-160, -170)
	_pause_panel.add_theme_stylebox_override("panel", _make_panel_style(
		Color(0.06, 0.06, 0.12, 0.95), 2, Color(0.8, 0.65, 0.2)))
	_pause_overlay.add_child(_pause_panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 8)
	_pause_panel.add_child(vbox)

	var title = Label.new()
	title.text = "PAUSED"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_font_size_override("font_size", 22)
	title.add_theme_color_override("font_color", Color(0.9, 0.8, 0.4))
	vbox.add_child(title)

	vbox.add_child(HSeparator.new())

	# Speed controls
	var speed_hbox = HBoxContainer.new()
	speed_hbox.alignment = BoxContainer.ALIGNMENT_CENTER
	speed_hbox.add_theme_constant_override("separation", 8)
	vbox.add_child(speed_hbox)

	var speed_title = Label.new()
	speed_title.text = "Game Speed:"
	speed_title.add_theme_font_size_override("font_size", 13)
	speed_title.add_theme_color_override("font_color", Color(0.7, 0.7, 0.8))
	speed_hbox.add_child(speed_title)

	for spd in [0.5, 1.0, 1.5, 2.0, 3.0]:
		var speed_btn = Button.new()
		speed_btn.text = "%gx" % spd
		speed_btn.custom_minimum_size = Vector2(40, 28)
		speed_btn.add_theme_font_size_override("font_size", 11)
		speed_btn.pressed.connect(_set_game_speed.bind(spd))
		speed_hbox.add_child(speed_btn)

	_speed_label = Label.new()
	_speed_label.text = "Current: 1x"
	_speed_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_speed_label.add_theme_font_size_override("font_size", 11)
	_speed_label.add_theme_color_override("font_color", Color(0.6, 0.8, 0.6))
	vbox.add_child(_speed_label)

	vbox.add_child(HSeparator.new())

	# Buttons
	_add_pause_button(vbox, "Resume", Color(0.3, 0.7, 0.3), func(): _toggle_pause())
	_add_pause_button(vbox, "Restart Battle", Color(0.7, 0.5, 0.2), func():
		get_tree().paused = false
		get_tree().change_scene_to_file("res://scenes/game.tscn"))
	if BattleConfig.is_campaign:
		_add_pause_button(vbox, "Abandon Campaign", Color(0.7, 0.25, 0.25), func():
			get_tree().paused = false
			BattleConfig.clear_campaign()
			get_tree().change_scene_to_file("res://scenes/campaign_select.tscn"))
	_add_pause_button(vbox, "Quit to Menu", Color(0.6, 0.3, 0.3), func():
		get_tree().paused = false
		BattleConfig.clear_campaign()
		get_tree().change_scene_to_file("res://scenes/main_menu.tscn"))

	var hint = Label.new()
	hint.text = "Press ESC to resume"
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	hint.add_theme_font_size_override("font_size", 10)
	hint.add_theme_color_override("font_color", Color(0.5, 0.5, 0.55))
	vbox.add_child(hint)

func _add_pause_button(parent: VBoxContainer, text: String, color: Color, callback: Callable):
	var btn = Button.new()
	btn.text = text
	btn.custom_minimum_size = Vector2(200, 36)
	btn.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	btn.add_theme_font_size_override("font_size", 14)
	var style_n = StyleBoxFlat.new()
	style_n.bg_color = Color(color.r, color.g, color.b, 0.3)
	style_n.border_width_bottom = 1
	style_n.border_color = Color(color.r, color.g, color.b, 0.5)
	style_n.corner_radius_top_left = 4
	style_n.corner_radius_top_right = 4
	style_n.corner_radius_bottom_left = 4
	style_n.corner_radius_bottom_right = 4
	style_n.content_margin_left = 12
	style_n.content_margin_right = 12
	style_n.content_margin_top = 6
	style_n.content_margin_bottom = 6
	btn.add_theme_stylebox_override("normal", style_n)
	var style_h = style_n.duplicate()
	style_h.bg_color = Color(color.r, color.g, color.b, 0.5)
	btn.add_theme_stylebox_override("hover", style_h)
	btn.pressed.connect(callback)
	parent.add_child(btn)

func _toggle_pause():
	_paused = !_paused
	_pause_overlay.visible = _paused
	get_tree().paused = _paused
	AudioManager.play_sfx("pause")

func _set_game_speed(spd: float):
	_speed_multiplier = spd
	Engine.time_scale = spd
	if _speed_label:
		_speed_label.text = "Current: %gx" % spd


# ══════════════════════════════════════════════════════════════
# DAMAGE PREVIEW
# ══════════════════════════════════════════════════════════════

## Calculate and return expected damage info for display
func get_damage_preview(attacker: Dictionary, target: Dictionary, skill_key: String = "attack_melee") -> String:
	if attacker.is_empty() or target.is_empty():
		return ""
	var atk_dice: int = attacker.atk + attacker.get("atk_modifier", 0)
	var target_def: int = target.def + target.get("def_modifier", 0)

	# Faction modifiers
	if combat and combat._faction_mgr:
		atk_dice += combat._faction_mgr.get_faction_attack_bonus(attacker, target, combat)
		target_def += combat._faction_mgr.get_faction_defense_bonus(target, attacker, combat)

	# Terrain cover for ranged
	if skill_key in ["attack_ranged", "basic_magic"] and combat and combat.controller:
		var cover = combat._get_terrain_cover(target.position)
		target_def += cover

	# Charging
	if attacker.get("charged", false) and skill_key == "attack_melee":
		atk_dice += 1

	# Shaken penalty
	if attacker.get("shaken", false):
		atk_dice -= 1

	atk_dice = maxi(1, atk_dice)
	target_def = clampi(target_def, 2, 6)

	var hit_chance: float = (7.0 - target_def) / 6.0
	var expected_hits: float = atk_dice * hit_chance
	var crit_chance: float = 1.0 / 6.0
	var expected_crits: float = atk_dice * crit_chance
	var expected_dmg: float = expected_hits + expected_crits  # Crits add 1 extra

	return "[color=silver]%dd6 vs DEF %d[/color] — [color=yellow]~%.1f dmg[/color] (%.0f%% per die)" % [
		atk_dice, target_def, expected_dmg, hit_chance * 100.0]

var _dmg_preview_label: RichTextLabel

func show_damage_preview_tooltip(attacker: Dictionary, target: Dictionary, skill_key: String):
	var text = get_damage_preview(attacker, target, skill_key)
	if text.is_empty():
		hide_damage_preview_tooltip()
		return
	if _dmg_preview_label == null:
		_dmg_preview_label = RichTextLabel.new()
		_dmg_preview_label.bbcode_enabled = true
		_dmg_preview_label.fit_content = true
		_dmg_preview_label.scroll_active = false
		_dmg_preview_label.mouse_filter = MOUSE_FILTER_IGNORE
		_dmg_preview_label.set_anchors_preset(PRESET_BOTTOM_LEFT)
		_dmg_preview_label.offset_left = 260
		_dmg_preview_label.offset_bottom = -140
		_dmg_preview_label.offset_top = -160
		_dmg_preview_label.offset_right = 560
		_dmg_preview_label.add_theme_font_size_override("normal_font_size", 11)
		add_child(_dmg_preview_label)
	_dmg_preview_label.text = text
	_dmg_preview_label.visible = true

func hide_damage_preview_tooltip():
	if _dmg_preview_label:
		_dmg_preview_label.visible = false


# ══════════════════════════════════════════════════════════════
# END-OF-ROUND SUMMARY
# ══════════════════════════════════════════════════════════════

func show_round_summary(round_num: int, vp: Array, player_alive: int, enemy_alive: int):
	"""Flash a brief round summary banner."""
	var banner = PanelContainer.new()
	banner.set_anchors_preset(PRESET_CENTER_TOP)
	banner.position = Vector2(-180, 50)
	banner.custom_minimum_size = Vector2(360, 0)
	banner.add_theme_stylebox_override("panel", _make_panel_style(
		Color(0.06, 0.06, 0.12, 0.9), 1, Color(0.7, 0.6, 0.2, 0.8)))
	banner.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(banner)

	var label = RichTextLabel.new()
	label.bbcode_enabled = true
	label.fit_content = true
	label.scroll_active = false
	label.mouse_filter = MOUSE_FILTER_IGNORE
	label.text = "[center][color=gold]═ Round %d Complete ═[/color]\n" % round_num
	label.text += "[color=cyan]VP: %d[/color] — [color=orange]%d[/color]  |  " % [vp[0], vp[1]]
	label.text += "[color=cyan]%d alive[/color] vs [color=orange]%d alive[/color][/center]" % [player_alive, enemy_alive]
	banner.add_child(label)

	# Fade out after 2.5 seconds
	var tween = create_tween()
	tween.tween_interval(2.5)
	tween.tween_property(banner, "modulate:a", 0.0, 1.0)
	tween.tween_callback(banner.queue_free)

# ══════════════════════════════════════════════════════════════
# MINIMAP
# ══════════════════════════════════════════════════════════════

func _build_minimap():
	"""Build a small minimap in the bottom-right corner showing unit positions."""
	_minimap_container = Control.new()
	_minimap_container.mouse_filter = MOUSE_FILTER_IGNORE
	_minimap_container.set_anchors_preset(PRESET_BOTTOM_RIGHT)
	_minimap_container.position = Vector2(-MINIMAP_WIDTH - 12, -MINIMAP_HEIGHT - 60)
	_minimap_container.custom_minimum_size = Vector2(MINIMAP_WIDTH + 4, MINIMAP_HEIGHT + 4)
	_minimap_container.size = Vector2(MINIMAP_WIDTH + 4, MINIMAP_HEIGHT + 4)
	add_child(_minimap_container)

	# Background with border
	var bg = ColorRect.new()
	bg.color = Color(0.02, 0.02, 0.05, 0.8)
	bg.size = Vector2(MINIMAP_WIDTH + 4, MINIMAP_HEIGHT + 4)
	bg.mouse_filter = MOUSE_FILTER_IGNORE
	_minimap_container.add_child(bg)

	var border = ReferenceRect.new()
	border.size = bg.size
	border.border_color = Color(0.4, 0.35, 0.2, 0.6)
	border.border_width = 1.0
	border.editor_only = false
	border.mouse_filter = MOUSE_FILTER_IGNORE
	_minimap_container.add_child(border)

	# Unit dot container
	_minimap_rect = ColorRect.new()
	_minimap_rect.color = Color(0.0, 0.0, 0.0, 0.0)  # Transparent — just a parent for dots
	_minimap_rect.position = Vector2(2, 2)
	_minimap_rect.size = Vector2(MINIMAP_WIDTH, MINIMAP_HEIGHT)
	_minimap_rect.mouse_filter = MOUSE_FILTER_IGNORE
	_minimap_container.add_child(_minimap_rect)

	# Label
	var label = Label.new()
	label.text = "MAP"
	label.add_theme_font_size_override("font_size", 8)
	label.add_theme_color_override("font_color", Color(0.5, 0.45, 0.3, 0.6))
	label.position = Vector2(2, -12)
	label.mouse_filter = MOUSE_FILTER_IGNORE
	_minimap_container.add_child(label)


func update_minimap(combatants: Array):
	"""Refresh minimap dots from current combatant positions."""
	if _minimap_rect == null:
		return

	# Clear existing dots
	for child in _minimap_rect.get_children():
		child.queue_free()

	for comb in combatants:
		if not comb.get("alive", false):
			continue
		var pos = comb.get("position", Vector2i(-1, -1))
		if pos.x < 0 or pos.y < 0:
			continue

		var dot = ColorRect.new()
		dot.size = Vector2(MINIMAP_TILE, MINIMAP_TILE)
		dot.position = Vector2(pos.x * MINIMAP_TILE, pos.y * MINIMAP_TILE)
		dot.mouse_filter = MOUSE_FILTER_IGNORE

		if comb.get("side", 1) == 0:
			# Player unit — cyan, commander brighter
			if comb.get("is_commander", false):
				dot.color = Color(0.2, 1.0, 1.0)
			else:
				dot.color = Color(0.2, 0.7, 0.9, 0.9)
		else:
			# Enemy unit — red/orange
			if comb.get("is_commander", false):
				dot.color = Color(1.0, 0.3, 0.1)
			else:
				dot.color = Color(0.9, 0.4, 0.2, 0.85)

		_minimap_rect.add_child(dot)
