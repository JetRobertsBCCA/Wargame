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

# ── Dynamically created UI nodes ──
var _top_bar: PanelContainer
var _turn_queue_container: HBoxContainer
var _phase_label: Label
var _round_label: Label
var _resource_label: RichTextLabel
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


func _unhandled_input(event: InputEvent):
	# Right-click to inspect any unit on the map
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_RIGHT and event.is_released():
		if controller and controller.tile_map:
			var mouse_pos = controller.get_global_mouse_position()
			var tile_pos = controller.tile_map.local_to_map(mouse_pos)
			var comb = controller.get_combatant_at_position(tile_pos)
			if comb != null and comb.alive:
				_show_inspect(comb)
			else:
				_hide_inspect()
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

	# Faction resources
	_resource_label = RichTextLabel.new()
	_resource_label.bbcode_enabled = true
	_resource_label.fit_content = true
	_resource_label.scroll_active = false
	_resource_label.mouse_filter = MOUSE_FILTER_IGNORE
	_resource_label.custom_minimum_size = Vector2(140, 0)
	hbox.add_child(_resource_label)

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
	_movement_label.text = "MOV %d  |  RNG %d  |  MOR %d" % [comb.mov, comb.rng, mor_total]


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

	# Specials & skills
	_inspect_specials.clear()
	if comb.has("definition"):
		var def: CombatantDefinition = comb.definition
		if def.specials.size() > 0:
			_inspect_specials.append_text("[color=#AA9966]Specials:[/color] ")
			var spec_parts := []
			for sp in def.specials:
				spec_parts.append("[color=#CCBB88]%s[/color]" % sp)
			_inspect_specials.append_text(", ".join(spec_parts))
			_inspect_specials.append_text("\n")
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
	if faction_state.has("heat"):
		_resource_label.append_text("[color=#FF4010]Heat: %d[/color]\n" % faction_state.heat)
	if faction_state.has("grid_cohesion"):
		_resource_label.append_text("[color=#8090CC]Grid: %d[/color]\n" % faction_state.grid_cohesion)
	if faction_state.has("hunger"):
		_resource_label.append_text("[color=#CC2255]Hunger: %d[/color]\n" % faction_state.hunger)
	if faction_state.has("flow"):
		_resource_label.append_text("[color=#3388EE]Flow: %d[/color]\n" % faction_state.flow)
	if faction_state.has("fate_threads"):
		_resource_label.append_text("[color=#33BB55]Fate: %d[/color]\n" % faction_state.fate_threads)

	# Update VP display
	if combat and combat.scenario_manager:
		var vp = combat.scenario_manager.vp
		_vp_label.text = "VP: %d — %d" % [vp[0], vp[1]]


# ══════════════════════════════════════════════════════════════
# CARD HAND
# ══════════════════════════════════════════════════════════════

func update_card_hand(cards: Array):
	if _card_hand_panel == null:
		return
	_card_hand_panel.visible = cards.size() > 0
	for child in _card_hand_container.get_children():
		child.queue_free()
	for card in cards:
		var btn = Button.new()
		btn.custom_minimum_size = Vector2(110, 30)
		btn.text = card.get("name", "Card")
		btn.tooltip_text = "%s\n%s" % [card.get("type", "").capitalize(), card.get("description", "")]
		btn.add_theme_font_size_override("font_size", 11)
		btn.pressed.connect(func(): _on_card_played(card))
		_card_hand_container.add_child(btn)

func _on_card_played(card: Dictionary):
	if combat.has_method("play_card"):
		combat.play_card(card)


# ══════════════════════════════════════════════════════════════
# PHASE INDICATOR
# ══════════════════════════════════════════════════════════════

func update_phase(phase_name: String):
	if _phase_label == null:
		return
	_phase_label.text = phase_name


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
	var title = RichTextLabel.new()
	title.bbcode_enabled = true
	title.fit_content = true
	title.scroll_active = false
	title.text = "[center][color=gold]══ BATTLE COMPLETE ══[/color]\n[color=%s]%s Win![/color][/center]" % [winner_color, results.winner]
	title.custom_minimum_size = Vector2(0, 50)
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
	btn.text = "Return to Menu"
	btn.custom_minimum_size = Vector2(180, 40)
	btn.pressed.connect(func(): get_tree().change_scene_to_file("res://scenes/main_menu.tscn"))
	btn_c.add_child(btn)
