extends Control
## CampaignSelect — Commander campaign selection screen.
## Shows all available campaigns organized by faction, with commander details.
## Navigates to CampaignOverview when a campaign is selected.

const FACTION_COLORS := {
	CombatantDefinition.Faction.EMBERCLAW: Color(0.85, 0.25, 0.10),
	CombatantDefinition.Faction.IRON_DOMINION: Color(0.45, 0.52, 0.60),
	CombatantDefinition.Faction.NIGHTFANG: Color(0.50, 0.12, 0.60),
	CombatantDefinition.Faction.THORNWEFT: Color(0.18, 0.62, 0.18),
	CombatantDefinition.Faction.VEILBOUND: Color(0.15, 0.45, 0.80),
}

const FACTION_NAMES := {
	CombatantDefinition.Faction.EMBERCLAW: "Emberclaw Warpack",
	CombatantDefinition.Faction.IRON_DOMINION: "Iron Dominion",
	CombatantDefinition.Faction.NIGHTFANG: "Nightfang Dominion",
	CombatantDefinition.Faction.THORNWEFT: "Thornweft Matriarchy",
	CombatantDefinition.Faction.VEILBOUND: "Veilbound Shogunate",
}

var _scroll_container: ScrollContainer
var _content_vbox: VBoxContainer
var _saves_container: VBoxContainer

func _ready():
	set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_IGNORE
	_build_ui()
	AudioManager.play_music("menu")
	# Fade in from black
	var fade = ColorRect.new()
	fade.color = Color.BLACK
	fade.set_anchors_preset(Control.PRESET_FULL_RECT)
	fade.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(fade)
	var tween = create_tween()
	tween.tween_property(fade, "modulate:a", 0.0, 0.5)
	tween.tween_callback(fade.queue_free)

# ══════════════════════════════════════════════════════════════
# UI CONSTRUCTION
# ══════════════════════════════════════════════════════════════

func _build_ui():
	# Background
	var bg = ColorRect.new()
	bg.color = Color(0.04, 0.03, 0.08)
	bg.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	bg.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(bg)

	# Main layout
	var margin = MarginContainer.new()
	margin.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 40)
	margin.add_theme_constant_override("margin_top", 30)
	margin.add_theme_constant_override("margin_right", 40)
	margin.add_theme_constant_override("margin_bottom", 30)
	add_child(margin)

	var main_vbox = VBoxContainer.new()
	main_vbox.add_theme_constant_override("separation", 12)
	margin.add_child(main_vbox)

	# ── Header ──
	_build_header(main_vbox)

	# ── Separator ──
	var sep = HSeparator.new()
	var sep_style = StyleBoxFlat.new()
	sep_style.bg_color = Color(0.8, 0.65, 0.15, 0.3)
	sep_style.content_margin_top = 0
	sep_style.content_margin_bottom = 0
	sep.add_theme_stylebox_override("separator", sep_style)
	main_vbox.add_child(sep)

	# ── Scrollable campaign list ──
	_scroll_container = ScrollContainer.new()
	_scroll_container.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_scroll_container.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	main_vbox.add_child(_scroll_container)

	_content_vbox = VBoxContainer.new()
	_content_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_content_vbox.add_theme_constant_override("separation", 16)
	_scroll_container.add_child(_content_vbox)

	# ── Build saved campaigns (if any) ──
	_build_saved_campaigns_section()

	# ── Build campaign cards ──
	_build_campaign_list()

	# ── Back button ──
	var bottom_bar = HBoxContainer.new()
	bottom_bar.add_theme_constant_override("separation", 10)
	main_vbox.add_child(bottom_bar)

	var back_btn = Button.new()
	back_btn.text = "← BACK TO MENU"
	back_btn.custom_minimum_size = Vector2(180, 40)
	back_btn.add_theme_font_size_override("font_size", 14)
	back_btn.focus_mode = Control.FOCUS_NONE
	var back_style = StyleBoxFlat.new()
	back_style.bg_color = Color(0.15, 0.12, 0.08, 0.6)
	back_style.corner_radius_top_left = 4
	back_style.corner_radius_top_right = 4
	back_style.corner_radius_bottom_left = 4
	back_style.corner_radius_bottom_right = 4
	back_style.border_width_left = 2
	back_style.border_color = Color(0.6, 0.5, 0.2, 0.5)
	back_style.content_margin_left = 12
	back_style.content_margin_right = 12
	back_style.content_margin_top = 6
	back_style.content_margin_bottom = 6
	back_btn.add_theme_stylebox_override("normal", back_style)
	var back_hover = back_style.duplicate()
	back_hover.bg_color = Color(0.25, 0.2, 0.12, 0.7)
	back_btn.add_theme_stylebox_override("hover", back_hover)
	back_btn.add_theme_color_override("font_color", Color(0.7, 0.6, 0.4))
	back_btn.add_theme_color_override("font_hover_color", Color(1.0, 0.9, 0.6))
	back_btn.pressed.connect(_on_back)
	bottom_bar.add_child(back_btn)


func _build_header(parent: Control):
	var header_hbox = HBoxContainer.new()
	header_hbox.add_theme_constant_override("separation", 16)
	parent.add_child(header_hbox)

	var title_vbox = VBoxContainer.new()
	title_vbox.add_theme_constant_override("separation", 4)
	header_hbox.add_child(title_vbox)

	var title = RichTextLabel.new()
	title.bbcode_enabled = true
	title.fit_content = true
	title.scroll_active = false
	title.mouse_filter = MOUSE_FILTER_IGNORE
	title.text = "[color=#FFD700][font_size=36]CAMPAIGNS[/font_size][/color]"
	title_vbox.add_child(title)

	var subtitle = RichTextLabel.new()
	subtitle.bbcode_enabled = true
	subtitle.fit_content = true
	subtitle.scroll_active = false
	subtitle.mouse_filter = MOUSE_FILTER_IGNORE
	subtitle.text = "[color=#8888AA][font_size=13]Choose a commander and forge their legend in the Shardlands[/font_size][/color]"
	title_vbox.add_child(subtitle)


func _build_campaign_list():
	var campaigns = CampaignData.get_all_campaigns()

	if campaigns.is_empty():
		var empty_label = Label.new()
		empty_label.text = "No campaigns available yet."
		empty_label.add_theme_font_size_override("font_size", 16)
		empty_label.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5))
		_content_vbox.add_child(empty_label)
		return

	# Group campaigns by faction
	var by_faction := {}
	for c in campaigns:
		var fe = c.faction_enum
		if not by_faction.has(fe):
			by_faction[fe] = []
		by_faction[fe].append(c)

	# Build a section per faction
	for faction_enum in [
		CombatantDefinition.Faction.EMBERCLAW,
		CombatantDefinition.Faction.IRON_DOMINION,
		CombatantDefinition.Faction.NIGHTFANG,
		CombatantDefinition.Faction.THORNWEFT,
		CombatantDefinition.Faction.VEILBOUND,
	]:
		if not by_faction.has(faction_enum):
			continue
		_build_faction_section(faction_enum, by_faction[faction_enum])


func _build_faction_section(faction_enum: int, campaigns: Array):
	var faction_color: Color = FACTION_COLORS.get(faction_enum, Color.WHITE)
	var faction_name: String = FACTION_NAMES.get(faction_enum, "Unknown")

	# Faction header
	var header = HBoxContainer.new()
	header.add_theme_constant_override("separation", 8)
	_content_vbox.add_child(header)

	var color_bar = ColorRect.new()
	color_bar.custom_minimum_size = Vector2(4, 24)
	color_bar.color = faction_color
	header.add_child(color_bar)

	var faction_label = Label.new()
	faction_label.text = faction_name.to_upper()
	faction_label.add_theme_font_size_override("font_size", 16)
	faction_label.add_theme_color_override("font_color", faction_color.lightened(0.3))
	header.add_child(faction_label)

	# Campaign cards
	for c in campaigns:
		_build_campaign_card(c, faction_color)


func _build_campaign_card(campaign: Dictionary, accent: Color):
	var card = PanelContainer.new()
	card.custom_minimum_size = Vector2(0, 80)
	var card_style = StyleBoxFlat.new()
	card_style.bg_color = Color(accent.r, accent.g, accent.b, 0.08)
	card_style.corner_radius_top_left = 6
	card_style.corner_radius_top_right = 6
	card_style.corner_radius_bottom_left = 6
	card_style.corner_radius_bottom_right = 6
	card_style.border_width_left = 3
	card_style.border_color = accent.darkened(0.3)
	card_style.content_margin_left = 16
	card_style.content_margin_right = 16
	card_style.content_margin_top = 12
	card_style.content_margin_bottom = 12
	card.add_theme_stylebox_override("panel", card_style)
	_content_vbox.add_child(card)

	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 16)
	card.add_child(hbox)

	# Left: Commander info
	var info_vbox = VBoxContainer.new()
	info_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	info_vbox.add_theme_constant_override("separation", 4)
	hbox.add_child(info_vbox)

	var title_label = RichTextLabel.new()
	title_label.bbcode_enabled = true
	title_label.fit_content = true
	title_label.scroll_active = false
	title_label.mouse_filter = MOUSE_FILTER_IGNORE
	var title_color = accent.lightened(0.4).to_html(false)
	title_label.text = "[color=#%s][font_size=18]%s[/font_size][/color]  [color=#AAA][font_size=13]— %s[/font_size][/color]" % [
		title_color, campaign.title, campaign.commander]
	info_vbox.add_child(title_label)

	var desc_label = Label.new()
	desc_label.text = campaign.description
	desc_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	desc_label.add_theme_font_size_override("font_size", 12)
	desc_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.65))
	info_vbox.add_child(desc_label)

	var meta_label = Label.new()
	meta_label.text = "%d Missions  •  %s  •  %s" % [
		campaign.mission_count, campaign.difficulty, campaign.teaches]
	meta_label.add_theme_font_size_override("font_size", 11)
	meta_label.add_theme_color_override("font_color", Color(0.45, 0.45, 0.5))
	info_vbox.add_child(meta_label)

	# Completion badge
	if SaveManager.is_campaign_completed(campaign.id):
		var badge = Label.new()
		badge.text = "✓ COMPLETED"
		badge.add_theme_font_size_override("font_size", 11)
		badge.add_theme_color_override("font_color", Color(0.3, 0.85, 0.3))
		info_vbox.add_child(badge)
		card_style.border_color = Color(0.3, 0.75, 0.3, 0.6)

	# Right: Start button
	var btn_container = VBoxContainer.new()
	btn_container.alignment = BoxContainer.ALIGNMENT_CENTER
	hbox.add_child(btn_container)

	var start_btn = Button.new()
	start_btn.text = "BEGIN"
	start_btn.custom_minimum_size = Vector2(100, 40)
	start_btn.add_theme_font_size_override("font_size", 14)
	start_btn.focus_mode = Control.FOCUS_NONE

	var btn_style = StyleBoxFlat.new()
	btn_style.bg_color = Color(accent.r, accent.g, accent.b, 0.2)
	btn_style.corner_radius_top_left = 4
	btn_style.corner_radius_top_right = 4
	btn_style.corner_radius_bottom_left = 4
	btn_style.corner_radius_bottom_right = 4
	btn_style.border_width_left = 2
	btn_style.border_width_right = 2
	btn_style.border_width_top = 1
	btn_style.border_width_bottom = 1
	btn_style.border_color = accent.darkened(0.1)
	btn_style.content_margin_left = 12
	btn_style.content_margin_right = 12
	btn_style.content_margin_top = 6
	btn_style.content_margin_bottom = 6
	start_btn.add_theme_stylebox_override("normal", btn_style)

	var hover_style = btn_style.duplicate()
	hover_style.bg_color = Color(accent.r, accent.g, accent.b, 0.4)
	hover_style.border_color = accent.lightened(0.2)
	start_btn.add_theme_stylebox_override("hover", hover_style)

	var pressed_style = btn_style.duplicate()
	pressed_style.bg_color = Color(accent.r, accent.g, accent.b, 0.5)
	start_btn.add_theme_stylebox_override("pressed", pressed_style)

	start_btn.add_theme_color_override("font_color", accent.lightened(0.3))
	start_btn.add_theme_color_override("font_hover_color", Color(1.0, 0.95, 0.85))

	var campaign_id = campaign.id
	start_btn.pressed.connect(func(): _on_campaign_selected(campaign_id))
	btn_container.add_child(start_btn)

# ══════════════════════════════════════════════════════════════
# SAVED CAMPAIGNS
# ══════════════════════════════════════════════════════════════

func _build_saved_campaigns_section():
	"""Build the saved campaigns section at the top of the content list."""
	if not SaveManager.has_any_saves():
		return

	_saves_container = VBoxContainer.new()
	_saves_container.add_theme_constant_override("separation", 8)
	_content_vbox.add_child(_saves_container)

	_rebuild_saves_display()

	# Separator between saves and new campaigns
	var sep = HSeparator.new()
	var sep_style = StyleBoxFlat.new()
	sep_style.bg_color = Color(0.5, 0.5, 0.5, 0.2)
	sep_style.content_margin_top = 4
	sep_style.content_margin_bottom = 4
	sep.add_theme_stylebox_override("separator", sep_style)
	_content_vbox.add_child(sep)


func _rebuild_saves_display():
	"""Rebuild the saves list (called after delete)."""
	if _saves_container == null:
		return

	# Clear existing children
	for child in _saves_container.get_children():
		child.queue_free()

	# Section header
	var header = HBoxContainer.new()
	header.add_theme_constant_override("separation", 8)
	_saves_container.add_child(header)

	var color_bar = ColorRect.new()
	color_bar.custom_minimum_size = Vector2(4, 24)
	color_bar.color = Color(0.3, 0.7, 0.4)
	header.add_child(color_bar)

	var section_label = Label.new()
	section_label.text = "SAVED CAMPAIGNS"
	section_label.add_theme_font_size_override("font_size", 16)
	section_label.add_theme_color_override("font_color", Color(0.4, 0.8, 0.5, 0.9))
	header.add_child(section_label)

	# Build each populated save slot
	var saves = SaveManager.get_all_saves()
	var any_visible := false
	for i in range(SaveManager.MAX_SLOTS):
		var save_data = saves[i]
		if save_data.is_empty():
			continue
		any_visible = true
		_build_saved_campaign_card(i + 1, save_data)

	if not any_visible:
		# All saves were deleted — hide the whole section
		_saves_container.visible = false


func _build_saved_campaign_card(slot: int, save_data: Dictionary):
	"""Build a card for a saved campaign."""
	var faction_enum: int = int(save_data.get("faction_enum", 0))
	var accent: Color = FACTION_COLORS.get(faction_enum, Color(0.3, 0.7, 0.4))

	var card = PanelContainer.new()
	card.custom_minimum_size = Vector2(0, 64)
	var card_style = StyleBoxFlat.new()
	card_style.bg_color = Color(accent.r, accent.g, accent.b, 0.06)
	card_style.corner_radius_top_left = 6
	card_style.corner_radius_top_right = 6
	card_style.corner_radius_bottom_left = 6
	card_style.corner_radius_bottom_right = 6
	card_style.border_width_left = 3
	card_style.border_color = Color(0.3, 0.7, 0.4, 0.4)
	card_style.content_margin_left = 14
	card_style.content_margin_right = 14
	card_style.content_margin_top = 10
	card_style.content_margin_bottom = 10
	card.add_theme_stylebox_override("panel", card_style)
	_saves_container.add_child(card)

	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 12)
	card.add_child(hbox)

	# Slot badge
	var badge = Label.new()
	badge.text = "%d" % slot
	badge.add_theme_font_size_override("font_size", 20)
	badge.add_theme_color_override("font_color", Color(0.3, 0.6, 0.4, 0.5))
	badge.custom_minimum_size = Vector2(24, 0)
	badge.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	badge.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	hbox.add_child(badge)

	# Info
	var info = VBoxContainer.new()
	info.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	info.add_theme_constant_override("separation", 2)
	hbox.add_child(info)

	var title_label = RichTextLabel.new()
	title_label.bbcode_enabled = true
	title_label.fit_content = true
	title_label.scroll_active = false
	title_label.mouse_filter = MOUSE_FILTER_IGNORE
	var title_color = accent.lightened(0.4).to_html(false)
	title_label.text = "[color=#%s][font_size=16]%s[/font_size][/color]  [color=#999]— %s[/color]" % [
		title_color,
		save_data.get("campaign_title", "Unknown"),
		save_data.get("commander", "Unknown")]
	info.add_child(title_label)

	var progress_text = "Mission %d / %d" % [
		save_data.get("current_mission", 0) + 1,
		save_data.get("total_missions", 0)]
	var timestamp = save_data.get("timestamp", "")
	if timestamp.length() > 16:
		timestamp = timestamp.substr(0, 16)
	var detail_label = Label.new()
	detail_label.text = "%s  •  %s" % [progress_text, timestamp]
	detail_label.add_theme_font_size_override("font_size", 11)
	detail_label.add_theme_color_override("font_color", Color(0.5, 0.5, 0.55))
	info.add_child(detail_label)

	# Buttons
	var btn_vbox = VBoxContainer.new()
	btn_vbox.alignment = BoxContainer.ALIGNMENT_CENTER
	btn_vbox.add_theme_constant_override("separation", 4)
	hbox.add_child(btn_vbox)

	# Load button
	var load_btn = Button.new()
	load_btn.text = "CONTINUE"
	load_btn.custom_minimum_size = Vector2(100, 32)
	load_btn.focus_mode = Control.FOCUS_NONE
	load_btn.add_theme_font_size_override("font_size", 12)
	var load_style = StyleBoxFlat.new()
	load_style.bg_color = Color(0.15, 0.3, 0.2, 0.5)
	load_style.corner_radius_top_left = 4
	load_style.corner_radius_top_right = 4
	load_style.corner_radius_bottom_left = 4
	load_style.corner_radius_bottom_right = 4
	load_btn.add_theme_stylebox_override("normal", load_style)
	var load_hover = load_style.duplicate()
	load_hover.bg_color = Color(0.2, 0.4, 0.28, 0.6)
	load_btn.add_theme_stylebox_override("hover", load_hover)
	load_btn.add_theme_color_override("font_color", Color(0.4, 0.8, 0.5))
	load_btn.add_theme_color_override("font_hover_color", Color(0.6, 1.0, 0.7))

	var slot_num = slot
	load_btn.pressed.connect(func(): _on_load_save(slot_num))
	btn_vbox.add_child(load_btn)

	# Delete button
	var del_btn = Button.new()
	del_btn.text = "DELETE"
	del_btn.custom_minimum_size = Vector2(100, 28)
	del_btn.focus_mode = Control.FOCUS_NONE
	del_btn.add_theme_font_size_override("font_size", 11)
	var del_style = StyleBoxFlat.new()
	del_style.bg_color = Color(0.2, 0.08, 0.08, 0.4)
	del_style.corner_radius_top_left = 4
	del_style.corner_radius_top_right = 4
	del_style.corner_radius_bottom_left = 4
	del_style.corner_radius_bottom_right = 4
	del_btn.add_theme_stylebox_override("normal", del_style)
	var del_hover = del_style.duplicate()
	del_hover.bg_color = Color(0.3, 0.12, 0.12, 0.5)
	del_btn.add_theme_stylebox_override("hover", del_hover)
	del_btn.add_theme_color_override("font_color", Color(0.6, 0.3, 0.3))
	del_btn.add_theme_color_override("font_hover_color", Color(0.9, 0.4, 0.4))
	del_btn.pressed.connect(func(): _on_delete_save(slot_num))
	btn_vbox.add_child(del_btn)


func _on_load_save(slot: int):
	"""Load a saved campaign and jump to the campaign overview."""
	var save_data = SaveManager.load_save(slot)
	if save_data.is_empty():
		push_error("CampaignSelect: Failed to load save from slot %d" % slot)
		return

	var campaign_id: String = save_data.get("campaign_id", "")
	if campaign_id.is_empty():
		push_error("CampaignSelect: Save has no campaign_id")
		return

	# Create campaign manager and restore state
	var campaign_manager = preload("res://combat/campaign_manager_v2.gd").new()
	if not campaign_manager.start_campaign(campaign_id):
		push_error("CampaignSelect: Failed to start campaign '%s' from save" % campaign_id)
		return

	SaveManager.restore_campaign(campaign_manager, save_data)

	# Store in BattleConfig so overview picks it up
	BattleConfig.campaign_id = campaign_id
	BattleConfig.campaign_manager = campaign_manager
	BattleConfig.is_campaign = true
	BattleConfig.is_loaded_save = true

	get_tree().change_scene_to_file("res://scenes/campaign_overview.tscn")


func _on_delete_save(slot: int):
	"""Show a confirmation dialog, then delete the save."""
	_show_delete_confirm(slot)


func _show_delete_confirm(slot: int):
	"""Show a confirmation overlay for deleting a save."""
	var overlay = ColorRect.new()
	overlay.name = "DeleteConfirmOverlay"
	overlay.color = Color(0.0, 0.0, 0.0, 0.6)
	overlay.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	overlay.mouse_filter = MOUSE_FILTER_STOP
	add_child(overlay)

	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	center.mouse_filter = MOUSE_FILTER_IGNORE
	overlay.add_child(center)

	var panel = PanelContainer.new()
	panel.custom_minimum_size = Vector2(360, 160)
	var pstyle = StyleBoxFlat.new()
	pstyle.bg_color = Color(0.08, 0.06, 0.10, 0.95)
	pstyle.corner_radius_top_left = 8
	pstyle.corner_radius_top_right = 8
	pstyle.corner_radius_bottom_left = 8
	pstyle.corner_radius_bottom_right = 8
	pstyle.border_width_top = 2
	pstyle.border_width_bottom = 2
	pstyle.border_width_left = 2
	pstyle.border_width_right = 2
	pstyle.border_color = Color(0.6, 0.25, 0.25, 0.5)
	pstyle.content_margin_left = 24
	pstyle.content_margin_right = 24
	pstyle.content_margin_top = 20
	pstyle.content_margin_bottom = 20
	panel.add_theme_stylebox_override("panel", pstyle)
	center.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 12)
	panel.add_child(vbox)

	var title = Label.new()
	title.text = "Delete Save?"
	title.add_theme_font_size_override("font_size", 18)
	title.add_theme_color_override("font_color", Color(0.9, 0.4, 0.4))
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(title)

	var body = Label.new()
	body.text = "This will permanently delete the save in Slot %d." % slot
	body.add_theme_font_size_override("font_size", 13)
	body.add_theme_color_override("font_color", Color(0.7, 0.7, 0.75))
	body.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	body.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	vbox.add_child(body)

	var spacer = Control.new()
	spacer.size_flags_vertical = Control.SIZE_EXPAND_FILL
	vbox.add_child(spacer)

	var btn_row = HBoxContainer.new()
	btn_row.add_theme_constant_override("separation", 16)
	btn_row.alignment = BoxContainer.ALIGNMENT_CENTER
	vbox.add_child(btn_row)

	var cancel_btn = Button.new()
	cancel_btn.text = "Cancel"
	cancel_btn.custom_minimum_size = Vector2(100, 32)
	cancel_btn.focus_mode = Control.FOCUS_NONE
	cancel_btn.add_theme_font_size_override("font_size", 13)
	cancel_btn.pressed.connect(func(): overlay.queue_free())
	btn_row.add_child(cancel_btn)

	var confirm_btn = Button.new()
	confirm_btn.text = "Delete"
	confirm_btn.custom_minimum_size = Vector2(100, 32)
	confirm_btn.focus_mode = Control.FOCUS_NONE
	confirm_btn.add_theme_font_size_override("font_size", 13)
	var confirm_style = StyleBoxFlat.new()
	confirm_style.bg_color = Color(0.5, 0.15, 0.15, 0.6)
	confirm_style.corner_radius_top_left = 4
	confirm_style.corner_radius_top_right = 4
	confirm_style.corner_radius_bottom_left = 4
	confirm_style.corner_radius_bottom_right = 4
	confirm_btn.add_theme_stylebox_override("normal", confirm_style)
	var confirm_hover = confirm_style.duplicate()
	confirm_hover.bg_color = Color(0.6, 0.2, 0.2, 0.7)
	confirm_btn.add_theme_stylebox_override("hover", confirm_hover)
	confirm_btn.add_theme_color_override("font_color", Color(0.9, 0.5, 0.5))
	confirm_btn.add_theme_color_override("font_hover_color", Color(1.0, 0.6, 0.6))

	var slot_num = slot
	confirm_btn.pressed.connect(func():
		overlay.queue_free()
		SaveManager.delete_save(slot_num)
		_rebuild_saves_display()
	)
	btn_row.add_child(confirm_btn)

# ══════════════════════════════════════════════════════════════
# NAVIGATION
# ══════════════════════════════════════════════════════════════

func _on_campaign_selected(campaign_id: String):
	BattleConfig.campaign_id = campaign_id
	get_tree().change_scene_to_file("res://scenes/campaign_overview.tscn")

func _on_back():
	BattleConfig.clear_campaign()
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")
