extends Control
## MainMenu — Polished entry point for Shardborne TRPG.
## Dark fantasy theme with animated background, faction accents, and styled buttons.

# ── Faction accent colors for the background decoration ──
const FACTION_COLORS := [
	Color(0.85, 0.25, 0.10),  # Emberclaw — fiery red
	Color(0.45, 0.52, 0.60),  # Iron Dominion — steel
	Color(0.50, 0.12, 0.60),  # Nightfang — violet
	Color(0.18, 0.62, 0.18),  # Thornweft — green
	Color(0.15, 0.45, 0.80),  # Veilbound — blue
]

const FACTION_NAMES := [
	"Emberclaw Warpack",
	"Iron Dominion",
	"Nightfang Dominion",
	"Thornweft Matriarchy",
	"Veilbound Shogunate",
]

const LORE_LINES := [
	"\"The shards call to those bold enough to claim them.\"",
	"\"In the crucible of war, empires are forged — or forgotten.\"",
	"\"Five factions. One broken world. Only ruin waits for the weak.\"",
	"\"Command your forces. Break the enemy. Seize the shards.\"",
	"\"Every commander falls eventually. Legends fall last.\"",
	"\"The battlefield remembers every decision you make.\"",
	"\"We burn so that nothing is forgotten.\" — Emberclaw war-chant",
	"\"The Grid endures. The Grid prevails.\" — Iron Dominion doctrine",
	"\"We are the web and the spider both.\" — Thornweft teaching",
	"\"Hunger is not weakness — it is purpose.\" — Nightfang creed",
	"\"Flow like water. Strike like the tide.\" — Veilbound proverb",
	"\"The drakes remember when the world was fire. They long for those days.\"",
	"\"Corruption is patient. It does not conquer — it inherits.\"",
	"\"Every thread in the web knows the spider's intent.\"",
	"\"In the space between stances, the Veilbound find truth.\"",
	"\"Steel without discipline is scrap. Discipline without steel is a funeral.\"",
	"\"The shards are fragments of a god. Or a prison. No one agrees.\"",
	"\"War does not determine who is right — only who remains.\"",
]

# ── Shard particle data ──
var _shards: Array = []   # Array of {pos, vel, color, size, alpha, life}
var _shard_timer := 0.0

# ── Lore rotation ──
var _lore_label: RichTextLabel
var _lore_index := 0
var _lore_timer := 0.0
const LORE_CYCLE_TIME := 5.0

# ── Faction bar glow ──
var _faction_icons: Array = []
var _glow_timer := 0.0

func _ready():
	# Ensure we fill the viewport
	set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_IGNORE
	_build_ui()
	# Seed initial particles
	for i in range(25):
		_spawn_shard(true)
	# Play menu music
	AudioManager.play_music("menu")

func _process(delta: float):
	_update_shards(delta)
	_update_lore(delta)
	_update_faction_glow(delta)
	queue_redraw()

# ══════════════════════════════════════════════════════════════
# UI CONSTRUCTION
# ══════════════════════════════════════════════════════════════

func _build_ui():
	# ── Background gradient ──
	var bg = _create_gradient_bg()
	add_child(bg)

	# ── Main content: two-column layout ──
	var content = HBoxContainer.new()
	content.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	content.add_theme_constant_override("separation", 0)
	content.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(content)

	# ── LEFT COLUMN: Title + Lore (60% width) ──
	var left_panel = PanelContainer.new()
	left_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	left_panel.size_flags_stretch_ratio = 1.4
	left_panel.mouse_filter = MOUSE_FILTER_IGNORE
	var left_style = StyleBoxFlat.new()
	left_style.bg_color = Color(0, 0, 0, 0)
	left_panel.add_theme_stylebox_override("panel", left_style)
	content.add_child(left_panel)

	var left_margin = MarginContainer.new()
	left_margin.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	left_margin.add_theme_constant_override("margin_left", 60)
	left_margin.add_theme_constant_override("margin_top", 48)
	left_margin.add_theme_constant_override("margin_right", 20)
	left_margin.add_theme_constant_override("margin_bottom", 48)
	left_margin.mouse_filter = MOUSE_FILTER_IGNORE
	left_panel.add_child(left_margin)

	var left_vbox = VBoxContainer.new()
	left_vbox.add_theme_constant_override("separation", 6)
	left_vbox.mouse_filter = MOUSE_FILTER_IGNORE
	left_margin.add_child(left_vbox)

	# Title
	var title = RichTextLabel.new()
	title.bbcode_enabled = true
	title.fit_content = true
	title.scroll_active = false
	title.mouse_filter = MOUSE_FILTER_IGNORE
	title.text = "[color=#FFD700][font_size=52]SHARDBORNE[/font_size][/color]"
	left_vbox.add_child(title)

	# Subtitle
	var subtitle = RichTextLabel.new()
	subtitle.bbcode_enabled = true
	subtitle.fit_content = true
	subtitle.scroll_active = false
	subtitle.mouse_filter = MOUSE_FILTER_IGNORE
	subtitle.text = "[color=#B8B8CC][font_size=18]T A C T I C A L   R P G[/font_size][/color]"
	left_vbox.add_child(subtitle)

	# Decorative line
	var line_container = Control.new()
	line_container.custom_minimum_size = Vector2(0, 4)
	line_container.mouse_filter = MOUSE_FILTER_IGNORE
	left_vbox.add_child(line_container)
	var deco_line = ColorRect.new()
	deco_line.color = Color(0.8, 0.65, 0.1, 0.6)
	deco_line.custom_minimum_size = Vector2(280, 2)
	deco_line.mouse_filter = MOUSE_FILTER_IGNORE
	line_container.add_child(deco_line)

	# Spacer
	var spacer1 = Control.new()
	spacer1.custom_minimum_size = Vector2(0, 12)
	spacer1.mouse_filter = MOUSE_FILTER_IGNORE
	left_vbox.add_child(spacer1)

	# Lore text (rotates)
	_lore_label = RichTextLabel.new()
	_lore_label.bbcode_enabled = true
	_lore_label.fit_content = true
	_lore_label.scroll_active = false
	_lore_label.mouse_filter = MOUSE_FILTER_IGNORE
	_lore_label.custom_minimum_size = Vector2(380, 40)
	_set_lore_text()
	left_vbox.add_child(_lore_label)

	# Vertical spacer to push faction bar down
	var left_expand = Control.new()
	left_expand.size_flags_vertical = Control.SIZE_EXPAND_FILL
	left_expand.mouse_filter = MOUSE_FILTER_IGNORE
	left_vbox.add_child(left_expand)

	# Faction bar (5 colored blocks)
	var faction_section = VBoxContainer.new()
	faction_section.add_theme_constant_override("separation", 6)
	faction_section.mouse_filter = MOUSE_FILTER_IGNORE
	left_vbox.add_child(faction_section)

	var faction_title = Label.new()
	faction_title.text = "FACTIONS"
	faction_title.add_theme_font_size_override("font_size", 11)
	faction_title.add_theme_color_override("font_color", Color(0.6, 0.6, 0.6, 0.7))
	faction_section.add_child(faction_title)

	var faction_bar = HBoxContainer.new()
	faction_bar.add_theme_constant_override("separation", 6)
	faction_bar.mouse_filter = MOUSE_FILTER_IGNORE
	faction_section.add_child(faction_bar)

	for i in range(5):
		var block = _create_faction_block(i)
		faction_bar.add_child(block)
		_faction_icons.append(block)

	# Version text
	var version = Label.new()
	version.text = "v0.4.0 — Early Development"
	version.add_theme_font_size_override("font_size", 11)
	version.add_theme_color_override("font_color", Color(0.4, 0.4, 0.4, 0.5))
	left_vbox.add_child(version)

	# ── RIGHT COLUMN: Menu Buttons (40% width) ──
	var right_panel = PanelContainer.new()
	right_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	right_panel.size_flags_stretch_ratio = 1.0
	var right_style = StyleBoxFlat.new()
	right_style.bg_color = Color(0.03, 0.03, 0.06, 0.7)
	right_style.border_width_left = 1
	right_style.border_color = Color(0.8, 0.65, 0.15, 0.25)
	right_panel.add_theme_stylebox_override("panel", right_style)
	content.add_child(right_panel)

	var right_margin = MarginContainer.new()
	right_margin.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	right_margin.add_theme_constant_override("margin_left", 40)
	right_margin.add_theme_constant_override("margin_top", 60)
	right_margin.add_theme_constant_override("margin_right", 40)
	right_margin.add_theme_constant_override("margin_bottom", 60)
	right_panel.add_child(right_margin)

	var right_vbox = VBoxContainer.new()
	right_vbox.add_theme_constant_override("separation", 10)
	right_vbox.alignment = BoxContainer.ALIGNMENT_CENTER
	right_margin.add_child(right_vbox)

	# Menu title
	var menu_title = Label.new()
	menu_title.text = "MAIN MENU"
	menu_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_title.add_theme_font_size_override("font_size", 14)
	menu_title.add_theme_color_override("font_color", Color(0.65, 0.55, 0.3, 0.8))
	right_vbox.add_child(menu_title)

	# Thin separator
	var sep = HSeparator.new()
	sep.add_theme_stylebox_override("separator", _make_thin_separator())
	right_vbox.add_child(sep)

	var spacer2 = Control.new()
	spacer2.custom_minimum_size = Vector2(0, 8)
	right_vbox.add_child(spacer2)

	# Menu buttons
	_add_menu_button(right_vbox, "QUICK  BATTLE", "Jump straight into combat with preset armies",
		Color(0.85, 0.3, 0.15), _on_quick_battle)
	_add_menu_button(right_vbox, "ARMY  BUILDER", "Assemble your forces before the fight",
		Color(0.3, 0.55, 0.85), _on_army_builder)
	_add_menu_button(right_vbox, "CAMPAIGN", "Commander story campaigns with lore and progression",
		Color(0.2, 0.65, 0.25), _on_campaign)

	# Difficulty selector
	var diff_hbox = HBoxContainer.new()
	diff_hbox.alignment = BoxContainer.ALIGNMENT_CENTER
	diff_hbox.add_theme_constant_override("separation", 6)
	right_vbox.add_child(diff_hbox)
	var diff_title = Label.new()
	diff_title.text = "Difficulty:"
	diff_title.add_theme_font_size_override("font_size", 12)
	diff_title.add_theme_color_override("font_color", Color(0.6, 0.55, 0.5))
	diff_hbox.add_child(diff_title)
	var diff_options = OptionButton.new()
	diff_options.add_item("Easy", 0)
	diff_options.add_item("Normal", 1)
	diff_options.add_item("Hard", 2)
	diff_options.add_item("Brutal", 3)
	diff_options.selected = BattleConfig.difficulty
	diff_options.add_theme_font_size_override("font_size", 12)
	diff_options.custom_minimum_size = Vector2(100, 28)
	diff_options.item_selected.connect(func(idx): BattleConfig.difficulty = idx)
	diff_hbox.add_child(diff_options)

	# Tutorial button
	var tut_btn = Button.new()
	tut_btn.text = "HOW TO PLAY"
	tut_btn.custom_minimum_size = Vector2(280, 36)
	tut_btn.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	tut_btn.add_theme_font_size_override("font_size", 12)
	var tut_style_n = _make_button_style(Color(0.3, 0.3, 0.15, 0.3))
	tut_style_n.border_width_left = 3
	tut_style_n.border_color = Color(0.7, 0.6, 0.2, 0.4)
	tut_btn.add_theme_stylebox_override("normal", tut_style_n)
	var tut_style_h = _make_button_style(Color(0.4, 0.35, 0.15, 0.5))
	tut_style_h.border_width_left = 3
	tut_style_h.border_color = Color(0.8, 0.7, 0.2)
	tut_btn.add_theme_stylebox_override("hover", tut_style_h)
	tut_btn.add_theme_color_override("font_color", Color(0.8, 0.75, 0.5))
	tut_btn.add_theme_color_override("font_hover_color", Color(1.0, 0.9, 0.5))
	tut_btn.focus_mode = Control.FOCUS_NONE
	tut_btn.pressed.connect(_show_tutorial)
	right_vbox.add_child(tut_btn)

	# Bottom spacer
	var expand = Control.new()
	expand.size_flags_vertical = Control.SIZE_EXPAND_FILL
	right_vbox.add_child(expand)

	# Quit (smaller, subtle)
	var quit_sep = HSeparator.new()
	quit_sep.add_theme_stylebox_override("separator", _make_thin_separator())
	right_vbox.add_child(quit_sep)

	var quit_btn = Button.new()
	quit_btn.text = "QUIT"
	quit_btn.custom_minimum_size = Vector2(120, 32)
	quit_btn.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	quit_btn.add_theme_font_size_override("font_size", 12)
	var quit_style_n = _make_button_style(Color(0.3, 0.15, 0.15, 0.4))
	var quit_style_h = _make_button_style(Color(0.5, 0.15, 0.15, 0.6))
	var quit_style_p = _make_button_style(Color(0.3, 0.08, 0.08, 0.7))
	quit_btn.add_theme_stylebox_override("normal", quit_style_n)
	quit_btn.add_theme_stylebox_override("hover", quit_style_h)
	quit_btn.add_theme_stylebox_override("pressed", quit_style_p)
	quit_btn.add_theme_color_override("font_color", Color(0.6, 0.4, 0.4))
	quit_btn.add_theme_color_override("font_hover_color", Color(0.85, 0.4, 0.4))
	quit_btn.focus_mode = Control.FOCUS_NONE
	quit_btn.pressed.connect(func(): get_tree().quit())
	right_vbox.add_child(quit_btn)


# ══════════════════════════════════════════════════════════════
# GRADIENT BACKGROUND
# ══════════════════════════════════════════════════════════════

func _create_gradient_bg() -> TextureRect:
	var width := 64
	var height := 64
	var img := Image.create(width, height, false, Image.FORMAT_RGBA8)
	var top_color := Color(0.04, 0.03, 0.08)
	var mid_color := Color(0.06, 0.05, 0.12)
	var bot_color := Color(0.03, 0.03, 0.06)
	for y in range(height):
		var t := float(y) / float(height - 1)
		var color: Color
		if t < 0.5:
			color = top_color.lerp(mid_color, t * 2.0)
		else:
			color = mid_color.lerp(bot_color, (t - 0.5) * 2.0)
		for x in range(width):
			# Subtle horizontal variation
			var h_t := float(x) / float(width - 1)
			var shifted = color.lerp(color.lightened(0.02), sin(h_t * PI) * 0.5 + 0.5)
			img.set_pixel(x, y, shifted)

	var tex := ImageTexture.create_from_image(img)
	var rect := TextureRect.new()
	rect.texture = tex
	rect.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	rect.stretch_mode = TextureRect.STRETCH_TILE
	rect.mouse_filter = MOUSE_FILTER_IGNORE
	return rect


# ══════════════════════════════════════════════════════════════
# MENU BUTTONS
# ══════════════════════════════════════════════════════════════

func _add_menu_button(parent: Control, title: String, desc: String, accent: Color, callback: Callable):
	var container = VBoxContainer.new()
	container.add_theme_constant_override("separation", 2)
	parent.add_child(container)

	var btn = Button.new()
	btn.text = title
	btn.custom_minimum_size = Vector2(280, 48)
	btn.add_theme_font_size_override("font_size", 16)
	btn.focus_mode = Control.FOCUS_NONE

	var style_n = _make_button_style(Color(accent.r, accent.g, accent.b, 0.12))
	style_n.border_width_left = 3
	style_n.border_color = accent.darkened(0.3)

	var style_h = _make_button_style(Color(accent.r, accent.g, accent.b, 0.25))
	style_h.border_width_left = 3
	style_h.border_color = accent

	var style_p = _make_button_style(Color(accent.r, accent.g, accent.b, 0.35))
	style_p.border_width_left = 3
	style_p.border_color = accent.lightened(0.2)

	btn.add_theme_stylebox_override("normal", style_n)
	btn.add_theme_stylebox_override("hover", style_h)
	btn.add_theme_stylebox_override("pressed", style_p)
	btn.add_theme_color_override("font_color", Color(0.82, 0.8, 0.75))
	btn.add_theme_color_override("font_hover_color", Color(1.0, 0.95, 0.85))
	btn.add_theme_color_override("font_pressed_color", accent.lightened(0.4))
	btn.alignment = HORIZONTAL_ALIGNMENT_LEFT
	btn.pressed.connect(callback)
	container.add_child(btn)

	var desc_label = Label.new()
	desc_label.text = "  " + desc
	desc_label.add_theme_font_size_override("font_size", 11)
	desc_label.add_theme_color_override("font_color", Color(0.45, 0.45, 0.5, 0.7))
	container.add_child(desc_label)


func _make_button_style(bg_color: Color) -> StyleBoxFlat:
	var style = StyleBoxFlat.new()
	style.bg_color = bg_color
	style.corner_radius_top_left = 4
	style.corner_radius_top_right = 4
	style.corner_radius_bottom_left = 4
	style.corner_radius_bottom_right = 4
	style.content_margin_left = 16
	style.content_margin_right = 16
	style.content_margin_top = 8
	style.content_margin_bottom = 8
	return style


func _make_thin_separator() -> StyleBoxFlat:
	var style = StyleBoxFlat.new()
	style.bg_color = Color(0.8, 0.65, 0.15, 0.15)
	style.content_margin_top = 0
	style.content_margin_bottom = 0
	return style


# ══════════════════════════════════════════════════════════════
# FACTION BAR BLOCKS
const FACTION_TAGLINES := [
	"Fire-born warriors bonded with drakes. They fight with furious speed and unstoppable heat.",
	"Relentless war machine powered by the Grid. Discipline is their greatest weapon.",
	"Masters of corruption and undying hunger. The dead serve, and the living will join them.",
	"Nature's wrath given form. The web connects all, and none escape the Matriarchy.",
	"Spirit-touched warriors who flow between stances. Honor guides every blade.",
]

# ══════════════════════════════════════════════════════════════
# FACTION BLOCKS
# ══════════════════════════════════════════════════════════════

func _create_faction_block(index: int) -> PanelContainer:
	var block = PanelContainer.new()
	block.custom_minimum_size = Vector2(52, 42)
	block.tooltip_text = "%s\n%s" % [FACTION_NAMES[index], FACTION_TAGLINES[index]]
	block.mouse_filter = MOUSE_FILTER_PASS

	var style = StyleBoxFlat.new()
	style.bg_color = FACTION_COLORS[index].darkened(0.5)
	style.corner_radius_top_left = 3
	style.corner_radius_top_right = 3
	style.corner_radius_bottom_left = 3
	style.corner_radius_bottom_right = 3
	style.border_width_top = 1
	style.border_width_bottom = 1
	style.border_width_left = 1
	style.border_width_right = 1
	style.border_color = FACTION_COLORS[index].darkened(0.2)
	block.add_theme_stylebox_override("panel", style)

	var inner = ColorRect.new()
	inner.custom_minimum_size = Vector2(48, 4)
	inner.color = FACTION_COLORS[index]
	inner.mouse_filter = MOUSE_FILTER_IGNORE
	block.add_child(inner)

	return block


# ══════════════════════════════════════════════════════════════
# SHARD PARTICLES (drawn in _draw)
# ══════════════════════════════════════════════════════════════

func _spawn_shard(randomize_life: bool = false):
	var color_idx := randi() % FACTION_COLORS.size()
	var base_color: Color = FACTION_COLORS[color_idx].lightened(0.3)
	base_color.a = randf_range(0.05, 0.2)
	var shard = {
		"pos": Vector2(randf_range(0, size.x), randf_range(0, size.y)),
		"vel": Vector2(randf_range(-8, 8), randf_range(-15, -5)),
		"color": base_color,
		"size": randf_range(1.5, 4.0),
		"alpha": base_color.a,
		"life": randf_range(4.0, 10.0) if not randomize_life else randf_range(0.0, 10.0),
		"max_life": 10.0,
	}
	_shards.append(shard)

func _update_shards(delta: float):
	_shard_timer += delta
	if _shard_timer > 0.3:
		_shard_timer = 0.0
		if _shards.size() < 40:
			_spawn_shard()

	var to_remove := []
	for i in range(_shards.size()):
		var s = _shards[i]
		s.pos += s.vel * delta
		s.life -= delta
		# Fade in/out
		var life_ratio = s.life / s.max_life
		if life_ratio > 0.8:
			s.color.a = s.alpha * ((1.0 - life_ratio) / 0.2)
		elif life_ratio < 0.3:
			s.color.a = s.alpha * (life_ratio / 0.3)
		if s.life <= 0:
			to_remove.append(i)

	to_remove.reverse()
	for idx in to_remove:
		_shards.remove_at(idx)


func _update_lore(delta: float):
	_lore_timer += delta
	if _lore_timer >= LORE_CYCLE_TIME:
		_lore_timer = 0.0
		_lore_index = (_lore_index + 1) % LORE_LINES.size()
		_set_lore_text()

func _set_lore_text():
	if _lore_label:
		_lore_label.text = "[color=#8888AA][font_size=13][i]%s[/i][/font_size][/color]" % LORE_LINES[_lore_index]


func _update_faction_glow(delta: float):
	_glow_timer += delta
	for i in range(_faction_icons.size()):
		var block: PanelContainer = _faction_icons[i]
		# Subtle breathing glow, each offset by faction index
		var phase = _glow_timer * 0.8 + i * 1.2
		var glow = (sin(phase) * 0.5 + 0.5) * 0.3
		var style = block.get_theme_stylebox("panel") as StyleBoxFlat
		if style:
			style.border_color = FACTION_COLORS[i].lerp(FACTION_COLORS[i].lightened(0.4), glow)


# ══════════════════════════════════════════════════════════════
# CUSTOM DRAWING (particles + vignette)
# ══════════════════════════════════════════════════════════════

func _draw():
	# Draw shard particles
	for s in _shards:
		var rect = Rect2(s.pos - Vector2(s.size, s.size), Vector2(s.size * 2, s.size * 2))
		draw_rect(rect, s.color)

	# Vignette effect — dark corners
	var w = size.x
	var h = size.y
	# Top edge
	draw_rect(Rect2(0, 0, w, 40), Color(0, 0, 0, 0.4))
	# Bottom edge
	draw_rect(Rect2(0, h - 30, w, 30), Color(0, 0, 0, 0.5))


# ══════════════════════════════════════════════════════════════
# TUTORIAL OVERLAY
# ══════════════════════════════════════════════════════════════

func _show_tutorial():
	var overlay = ColorRect.new()
	overlay.color = Color(0.0, 0.0, 0.02, 0.85)
	overlay.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(overlay)

	var scroll = ScrollContainer.new()
	scroll.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	scroll.add_theme_constant_override("margin_left", 60)
	scroll.add_theme_constant_override("margin_right", 60)
	scroll.add_theme_constant_override("margin_top", 30)
	scroll.add_theme_constant_override("margin_bottom", 30)
	overlay.add_child(scroll)

	var panel = PanelContainer.new()
	panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var ps = StyleBoxFlat.new()
	ps.bg_color = Color(0.06, 0.06, 0.12, 0.95)
	ps.corner_radius_top_left = 6
	ps.corner_radius_top_right = 6
	ps.corner_radius_bottom_left = 6
	ps.corner_radius_bottom_right = 6
	ps.content_margin_left = 30
	ps.content_margin_right = 30
	ps.content_margin_top = 20
	ps.content_margin_bottom = 20
	panel.add_theme_stylebox_override("panel", ps)
	scroll.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 8)
	panel.add_child(vbox)

	var title = Label.new()
	title.text = "HOW TO PLAY SHARDBORNE"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_font_size_override("font_size", 20)
	title.add_theme_color_override("font_color", Color(0.9, 0.8, 0.3))
	vbox.add_child(title)

	var tutorial_text = RichTextLabel.new()
	tutorial_text.bbcode_enabled = true
	tutorial_text.fit_content = true
	tutorial_text.scroll_active = false
	tutorial_text.mouse_filter = Control.MOUSE_FILTER_IGNORE
	tutorial_text.add_theme_font_size_override("normal_font_size", 13)
	tutorial_text.text = """[color=gold]═ Turn Structure ═[/color]
[color=#CCCCDD]Each round, units activate one at a time in initiative order.
Each unit's turn has 3 phases:[/color]

[color=cyan]1. COMMAND[/color] — Play cards from your hand (costs CP).
[color=cyan]2. MOVEMENT[/color] — Move up to MOV tiles. Terrain affects cost.
[color=cyan]3. COMBAT[/color] — Use a skill (attack, ability, or end turn).

[color=gold]═ Combat ═[/color]
[color=#CCCCDD]Roll ATK dice (d6). Each die ≥ target DEF = 1 hit.
Rolling a 6 = CRIT (2 damage instead of 1).
Melee: range 1. Ranged: range = RNG stat. Magic: range = max(RNG, 6).[/color]

[color=gold]═ Morale ═[/color]
[color=#CCCCDD]When a unit drops below 50%% HP, roll 2d6 vs MOR.
Fail = Shaken (-1 ATK, must fall back). Fail badly = Routed (removed).[/color]

[color=gold]═ Engagement ═[/color]
[color=#CCCCDD]Units adjacent to enemies become Engaged.
Disengaging costs full movement. Flying units disengage free.[/color]

[color=gold]═ Cards & CP ═[/color]
[color=#CCCCDD]Commanders generate CP each round. Spend CP to play cards.
Cards provide buffs, heals, AOE damage, and faction abilities.[/color]

[color=gold]═ Flanking & Facing ═[/color]
[color=#CCCCDD]Attack from the side = +1 ATK (Flank).
Attack from behind = +2 ATK (Rear). Units face the direction they moved.[/color]

[color=gold]═ Keywords ═[/color]
[color=#CCCCDD]Blast: AOE splash. Siege: double vs War Machines. Stealth: hidden until attacking.
Ethereal: 50%% to ignore non-magic hits. Fire Resistant: halves fire damage.[/color]

[color=gold]═ Factions ═[/color]
[color=orange]Emberclaw[/color] — Heat resource. Aggressive, fire-based, drake bonds.
[color=#8090CC]Iron Dominion[/color] — Grid Cohesion. Defensive, formation bonuses, Fragment weapons.
[color=#CC2255]Nightfang[/color] — Hunger. Corruption, undying, life-drain.
[color=#33BB55]Thornweft[/color] — Fate Threads + Web-Anchors. Terrain control, fate manipulation.
[color=#3388EE]Veilbound[/color] — Ritual Flow + Stances. Stance switching, spirit abilities.
"""
	vbox.add_child(tutorial_text)

	var close_btn = Button.new()
	close_btn.text = "Close"
	close_btn.custom_minimum_size = Vector2(120, 36)
	close_btn.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	close_btn.add_theme_font_size_override("font_size", 14)
	close_btn.pressed.connect(func(): overlay.queue_free())
	vbox.add_child(close_btn)


# ══════════════════════════════════════════════════════════════
# NAVIGATION
# ══════════════════════════════════════════════════════════════

func _on_quick_battle():
	_show_quick_battle_picker()

func _show_quick_battle_picker():
	"""Show a faction selection overlay for quick battle."""
	var overlay = ColorRect.new()
	overlay.name = "QuickBattleOverlay"
	overlay.color = Color(0.0, 0.0, 0.0, 0.7)
	overlay.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(overlay)

	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	center.mouse_filter = Control.MOUSE_FILTER_IGNORE
	overlay.add_child(center)

	var panel = PanelContainer.new()
	panel.custom_minimum_size = Vector2(520, 400)
	var pstyle = StyleBoxFlat.new()
	pstyle.bg_color = Color(0.06, 0.05, 0.10, 0.95)
	pstyle.corner_radius_top_left = 10
	pstyle.corner_radius_top_right = 10
	pstyle.corner_radius_bottom_left = 10
	pstyle.corner_radius_bottom_right = 10
	pstyle.border_width_top = 2
	pstyle.border_width_bottom = 2
	pstyle.border_width_left = 2
	pstyle.border_width_right = 2
	pstyle.border_color = Color(0.85, 0.3, 0.15, 0.6)
	pstyle.content_margin_left = 24
	pstyle.content_margin_right = 24
	pstyle.content_margin_top = 20
	pstyle.content_margin_bottom = 20
	panel.add_theme_stylebox_override("panel", pstyle)
	center.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 10)
	panel.add_child(vbox)

	var title = Label.new()
	title.text = "CHOOSE YOUR FACTION"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_font_size_override("font_size", 22)
	title.add_theme_color_override("font_color", Color(0.9, 0.8, 0.4))
	vbox.add_child(title)

	var subtitle = Label.new()
	subtitle.text = "Enemy faction will be randomly selected"
	subtitle.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	subtitle.add_theme_font_size_override("font_size", 12)
	subtitle.add_theme_color_override("font_color", Color(0.5, 0.5, 0.55))
	vbox.add_child(subtitle)

	vbox.add_child(HSeparator.new())

	# Faction buttons
	var faction_info := [
		{"enum": CombatantDefinition.Faction.EMBERCLAW, "name": "Emberclaw Warpack",
		 "desc": "Aggressive melee & drake riders. Heat fuels devastating attacks.",
		 "color": Color(0.85, 0.25, 0.10)},
		{"enum": CombatantDefinition.Faction.IRON_DOMINION, "name": "Iron Dominion",
		 "desc": "Warforged machines & grid-linked formations. Cohesion is their strength.",
		 "color": Color(0.45, 0.52, 0.60)},
		{"enum": CombatantDefinition.Faction.NIGHTFANG, "name": "Nightfang Dominion",
		 "desc": "Undead hordes & corruption magic. Feed the Hunger to grow unstoppable.",
		 "color": Color(0.50, 0.12, 0.60)},
		{"enum": CombatantDefinition.Faction.THORNWEFT, "name": "Thornweft Matriarchy",
		 "desc": "Nature magic & web control. Fate-threads manipulate the battlefield.",
		 "color": Color(0.18, 0.62, 0.18)},
		{"enum": CombatantDefinition.Faction.VEILBOUND, "name": "Veilbound Shogunate",
		 "desc": "Disciplined warriors & spirit stances. Flow between offense and defense.",
		 "color": Color(0.15, 0.45, 0.80)},
	]

	for fi in faction_info:
		var btn = Button.new()
		btn.text = "%s\n%s" % [fi.name, fi.desc]
		btn.custom_minimum_size = Vector2(460, 50)
		btn.add_theme_font_size_override("font_size", 12)
		btn.focus_mode = Control.FOCUS_NONE
		var bstyle = StyleBoxFlat.new()
		bstyle.bg_color = Color(fi.color.r, fi.color.g, fi.color.b, 0.12)
		bstyle.corner_radius_top_left = 6
		bstyle.corner_radius_top_right = 6
		bstyle.corner_radius_bottom_left = 6
		bstyle.corner_radius_bottom_right = 6
		bstyle.border_width_left = 3
		bstyle.border_color = fi.color.darkened(0.2)
		bstyle.content_margin_left = 14
		bstyle.content_margin_right = 14
		bstyle.content_margin_top = 6
		bstyle.content_margin_bottom = 6
		btn.add_theme_stylebox_override("normal", bstyle)
		var hstyle = bstyle.duplicate()
		hstyle.bg_color = Color(fi.color.r, fi.color.g, fi.color.b, 0.3)
		hstyle.border_color = fi.color.lightened(0.2)
		btn.add_theme_stylebox_override("hover", hstyle)
		btn.add_theme_color_override("font_color", fi.color.lightened(0.4))
		btn.add_theme_color_override("font_hover_color", Color(1.0, 0.95, 0.85))
		var faction_enum = fi.enum
		btn.pressed.connect(func(): _launch_quick_battle(faction_enum, overlay))
		vbox.add_child(btn)

	# Random button
	var rand_btn = Button.new()
	rand_btn.text = "⚄  RANDOM"
	rand_btn.custom_minimum_size = Vector2(460, 36)
	rand_btn.add_theme_font_size_override("font_size", 13)
	rand_btn.focus_mode = Control.FOCUS_NONE
	var rstyle = StyleBoxFlat.new()
	rstyle.bg_color = Color(0.5, 0.4, 0.2, 0.15)
	rstyle.corner_radius_top_left = 6
	rstyle.corner_radius_top_right = 6
	rstyle.corner_radius_bottom_left = 6
	rstyle.corner_radius_bottom_right = 6
	rstyle.border_width_left = 3
	rstyle.border_color = Color(0.7, 0.6, 0.3, 0.5)
	rstyle.content_margin_left = 14
	rstyle.content_margin_right = 14
	rstyle.content_margin_top = 4
	rstyle.content_margin_bottom = 4
	rand_btn.add_theme_stylebox_override("normal", rstyle)
	var rstyle_h = rstyle.duplicate()
	rstyle_h.bg_color = Color(0.6, 0.5, 0.3, 0.3)
	rand_btn.add_theme_stylebox_override("hover", rstyle_h)
	rand_btn.add_theme_color_override("font_color", Color(0.8, 0.7, 0.4))
	rand_btn.pressed.connect(func():
		var factions = FactionDatabase.FACTIONS.keys()
		_launch_quick_battle(factions[randi() % factions.size()], overlay))
	vbox.add_child(rand_btn)

	# Cancel button
	var cancel = Button.new()
	cancel.text = "Cancel"
	cancel.custom_minimum_size = Vector2(120, 30)
	cancel.add_theme_font_size_override("font_size", 12)
	cancel.focus_mode = Control.FOCUS_NONE
	cancel.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	cancel.add_theme_color_override("font_color", Color(0.6, 0.5, 0.5))
	cancel.pressed.connect(func(): overlay.queue_free())
	vbox.add_child(cancel)

	# Fade in
	overlay.modulate.a = 0.0
	var tween = create_tween()
	tween.tween_property(overlay, "modulate:a", 1.0, 0.25)

func _launch_quick_battle(player_faction_enum: int, overlay: Control):
	"""Launch a quick battle with the selected player faction and a random enemy faction."""
	overlay.queue_free()
	# Pick a random enemy faction (different from player)
	var all_factions = FactionDatabase.FACTIONS.keys()
	var enemy_factions = all_factions.filter(func(f): return f != player_faction_enum)
	var enemy_enum = enemy_factions[randi() % enemy_factions.size()]

	BattleConfig.clear()
	BattleConfig.player_faction = player_faction_enum
	BattleConfig.enemy_faction = enemy_enum
	BattleConfig.has_custom_armies = false  # Let Combat build default armies
	GameStateMachine.reset()
	GameStateMachine.transition_to(GameStateMachine.GameState.BATTLE)
	get_tree().change_scene_to_file("res://scenes/game.tscn")

func _on_army_builder():
	GameStateMachine.reset()
	GameStateMachine.transition_to(GameStateMachine.GameState.ARMY_SELECT)
	get_tree().change_scene_to_file("res://ui/army_builder.tscn")

func _on_campaign():
	GameStateMachine.reset()
	get_tree().change_scene_to_file("res://scenes/campaign_select.tscn")
