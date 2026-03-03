extends Control
## StoryScreen — Displays narrative dialogue sequences between campaign battles.
## Shows speaker name, dialogue text with typewriter effect, and faction-colored accents.
## Advances on click/keypress and calls a completion callback when the sequence ends.
##
## Usage:
##   var screen = preload("res://scenes/story_screen.tscn").instantiate()
##   add_child(screen)
##   screen.play_sequence(dialogue_array, func(): on_story_done())

signal sequence_completed

# ── Typewriter settings ──
const CHARS_PER_SECOND := 40.0
const PAUSE_AFTER_LINE := 0.15  # Brief pause after typewriter finishes

# ── State ──
var _dialogue: Array = []
var _current_index: int = 0
var _typewriter_pos: int = 0
var _typewriter_timer: float = 0.0
var _is_typing: bool = false
var _waiting_for_input: bool = false
var _completion_callback: Callable
var _pause_timer: float = 0.0

# ── UI References ──
var _speaker_label: RichTextLabel
var _text_label: RichTextLabel
var _continue_label: Label
var _portrait_rect: ColorRect  # Colored block representing speaker faction
var _bg: ColorRect
var _dim_overlay: ColorRect
var _progress_label: Label

func _ready():
	set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_STOP  # Capture all input
	_build_ui()

func _process(delta: float):
	if _is_typing:
		_update_typewriter(delta)
	elif _pause_timer > 0:
		_pause_timer -= delta
		if _pause_timer <= 0:
			_waiting_for_input = true
			_continue_label.visible = true
			_pulse_continue(delta)
	elif _waiting_for_input:
		_pulse_continue(delta)

var _pulse_time := 0.0
func _pulse_continue(delta: float):
	_pulse_time += delta
	if _continue_label:
		_continue_label.modulate.a = 0.4 + sin(_pulse_time * 3.0) * 0.3

func _gui_input(event: InputEvent):
	if event is InputEventMouseButton and event.pressed:
		_advance()
	elif event is InputEventKey and event.pressed:
		if event.keycode == KEY_ESCAPE:
			_skip_all()
		elif event.keycode in [KEY_SPACE, KEY_ENTER, KEY_KP_ENTER]:
			_advance()

# ══════════════════════════════════════════════════════════════
# PUBLIC API
# ══════════════════════════════════════════════════════════════

func play_sequence(dialogue: Array, on_complete: Callable = Callable()):
	"""Begin playing a dialogue sequence. Calls on_complete when finished."""
	_dialogue = dialogue
	_current_index = 0
	_completion_callback = on_complete
	if _dialogue.is_empty():
		_finish()
		return
	_show_entry(0)

# ══════════════════════════════════════════════════════════════
# DIALOGUE FLOW
# ══════════════════════════════════════════════════════════════

func _advance():
	if _is_typing:
		# Skip typewriter — show full text immediately
		_is_typing = false
		_show_full_text()
		_pause_timer = 0.0
		_waiting_for_input = true
		_continue_label.visible = true
	elif _waiting_for_input:
		# Move to next dialogue entry
		_waiting_for_input = false
		_continue_label.visible = false
		_current_index += 1
		if _current_index >= _dialogue.size():
			_finish()
		else:
			_show_entry(_current_index)

func _show_entry(index: int):
	var entry = _dialogue[index]
	var speaker: String = entry.get("speaker", "NARRATOR")
	var text: String = entry.get("text", "")
	var mood: String = entry.get("mood", "neutral")

	# Update progress
	_progress_label.text = "%d / %d" % [index + 1, _dialogue.size()]

	# Speaker styling
	var speaker_color: Color = CampaignData.get_speaker_color(speaker)

	if speaker == "NARRATOR":
		_speaker_label.text = ""
		_portrait_rect.color = Color(0.3, 0.3, 0.35, 0.3)
	elif speaker == "FHAH-ZOLG":
		_speaker_label.text = "[color=#CC33FF][font_size=16]%s[/font_size][/color]" % speaker
		_portrait_rect.color = Color(0.6, 0.1, 0.8, 0.6)
	else:
		var hex = speaker_color.to_html(false)
		_speaker_label.text = "[color=#%s][font_size=16]%s[/font_size][/color]" % [hex, speaker]
		_portrait_rect.color = Color(speaker_color.r, speaker_color.g, speaker_color.b, 0.4)

	# Start typewriter
	_typewriter_pos = 0
	_typewriter_timer = 0.0
	_is_typing = true
	_waiting_for_input = false
	_continue_label.visible = false
	_text_label.text = ""

	# Store full text for reference
	_text_label.set_meta("full_text", text)
	_text_label.set_meta("speaker", speaker)

func _update_typewriter(delta: float):
	_typewriter_timer += delta
	var full_text: String = _text_label.get_meta("full_text", "")
	var speaker: String = _text_label.get_meta("speaker", "NARRATOR")
	var target_pos = int(_typewriter_timer * CHARS_PER_SECOND)

	if target_pos >= full_text.length():
		_show_full_text()
		_is_typing = false
		_pause_timer = PAUSE_AFTER_LINE
	elif target_pos > _typewriter_pos:
		_typewriter_pos = target_pos
		var visible_text = full_text.substr(0, _typewriter_pos)
		_format_text(visible_text, speaker)

func _show_full_text():
	var full_text: String = _text_label.get_meta("full_text", "")
	var speaker: String = _text_label.get_meta("speaker", "NARRATOR")
	_format_text(full_text, speaker)

func _format_text(text: String, speaker: String):
	if speaker == "NARRATOR":
		_text_label.text = "[color=#B8B8CC][font_size=15][i]%s[/i][/font_size][/color]" % text
	elif speaker == "FHAH-ZOLG":
		_text_label.text = "[color=#DD88FF][font_size=15]%s[/font_size][/color]" % text
	else:
		_text_label.text = "[color=#E0E0E0][font_size=15]%s[/font_size][/color]" % text

func _finish():
	if _completion_callback.is_valid():
		_completion_callback.call()
	else:
		sequence_completed.emit()
	queue_free()

func _skip_all():
	"""Skip the entire remaining dialogue sequence."""
	_is_typing = false
	_waiting_for_input = false
	_finish()

# ══════════════════════════════════════════════════════════════
# UI CONSTRUCTION
# ══════════════════════════════════════════════════════════════

func _build_ui():
	# Dark semi-transparent overlay
	_dim_overlay = ColorRect.new()
	_dim_overlay.color = Color(0.02, 0.02, 0.04, 0.92)
	_dim_overlay.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	_dim_overlay.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(_dim_overlay)

	# Main content centered
	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	center.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(center)

	var panel = PanelContainer.new()
	panel.custom_minimum_size = Vector2(700, 300)
	var panel_style = StyleBoxFlat.new()
	panel_style.bg_color = Color(0.06, 0.05, 0.1, 0.95)
	panel_style.corner_radius_top_left = 8
	panel_style.corner_radius_top_right = 8
	panel_style.corner_radius_bottom_left = 8
	panel_style.corner_radius_bottom_right = 8
	panel_style.border_width_top = 1
	panel_style.border_width_bottom = 1
	panel_style.border_width_left = 1
	panel_style.border_width_right = 1
	panel_style.border_color = Color(0.8, 0.65, 0.15, 0.3)
	panel_style.content_margin_left = 24
	panel_style.content_margin_right = 24
	panel_style.content_margin_top = 20
	panel_style.content_margin_bottom = 20
	panel.add_theme_stylebox_override("panel", panel_style)
	panel.mouse_filter = MOUSE_FILTER_IGNORE
	center.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 12)
	vbox.mouse_filter = MOUSE_FILTER_IGNORE
	panel.add_child(vbox)

	# Speaker row: portrait block + name
	var speaker_row = HBoxContainer.new()
	speaker_row.add_theme_constant_override("separation", 12)
	speaker_row.mouse_filter = MOUSE_FILTER_IGNORE
	vbox.add_child(speaker_row)

	_portrait_rect = ColorRect.new()
	_portrait_rect.custom_minimum_size = Vector2(8, 28)
	_portrait_rect.color = Color(0.3, 0.3, 0.35, 0.3)
	_portrait_rect.mouse_filter = MOUSE_FILTER_IGNORE
	speaker_row.add_child(_portrait_rect)

	_speaker_label = RichTextLabel.new()
	_speaker_label.bbcode_enabled = true
	_speaker_label.fit_content = true
	_speaker_label.scroll_active = false
	_speaker_label.mouse_filter = MOUSE_FILTER_IGNORE
	_speaker_label.custom_minimum_size = Vector2(400, 0)
	speaker_row.add_child(_speaker_label)

	# Thin separator
	var sep = HSeparator.new()
	var sep_style = StyleBoxFlat.new()
	sep_style.bg_color = Color(0.5, 0.5, 0.55, 0.2)
	sep_style.content_margin_top = 0
	sep_style.content_margin_bottom = 0
	sep.add_theme_stylebox_override("separator", sep_style)
	vbox.add_child(sep)

	# Text area
	_text_label = RichTextLabel.new()
	_text_label.bbcode_enabled = true
	_text_label.fit_content = true
	_text_label.scroll_active = false
	_text_label.mouse_filter = MOUSE_FILTER_IGNORE
	_text_label.custom_minimum_size = Vector2(650, 120)
	vbox.add_child(_text_label)

	# Bottom bar: continue hint + progress
	var spacer = Control.new()
	spacer.size_flags_vertical = Control.SIZE_EXPAND_FILL
	spacer.mouse_filter = MOUSE_FILTER_IGNORE
	vbox.add_child(spacer)

	var bottom = HBoxContainer.new()
	bottom.mouse_filter = MOUSE_FILTER_IGNORE
	vbox.add_child(bottom)

	_continue_label = Label.new()
	_continue_label.text = "Click or press SPACE to continue..."
	_continue_label.add_theme_font_size_override("font_size", 11)
	_continue_label.add_theme_color_override("font_color", Color(0.5, 0.5, 0.55, 0.6))
	_continue_label.visible = false
	bottom.add_child(_continue_label)

	var expand = Control.new()
	expand.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	expand.mouse_filter = MOUSE_FILTER_IGNORE
	bottom.add_child(expand)

	_progress_label = Label.new()
	_progress_label.text = "1 / 1"
	_progress_label.add_theme_font_size_override("font_size", 11)
	_progress_label.add_theme_color_override("font_color", Color(0.4, 0.4, 0.45, 0.5))
	bottom.add_child(_progress_label)

	# Skip hint at top-right
	var skip_hint = Label.new()
	skip_hint.text = "ESC to skip all"
	skip_hint.add_theme_font_size_override("font_size", 10)
	skip_hint.add_theme_color_override("font_color", Color(0.4, 0.4, 0.45, 0.3))
	skip_hint.set_anchors_and_offsets_preset(PRESET_TOP_RIGHT)
	skip_hint.offset_left = -110
	skip_hint.offset_top = 8
	skip_hint.offset_right = -8
	skip_hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	add_child(skip_hint)
