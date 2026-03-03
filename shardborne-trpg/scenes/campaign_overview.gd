extends Control
## CampaignOverview — The campaign hub screen.
## Shows commander info, mission progress, and manages the story→battle→story flow.
##
## This scene is the central controller for campaign progression:
## 1. First visit: shows opening story, then mission 1 briefing
## 2. After returning from battle: shows post-story, then next mission briefing
## 3. After final battle: shows ending story and campaign complete screen

# ── Campaign state ──
var _campaign_manager: Node  # CampaignManager instance
var _campaign_data: Dictionary = {}
var _returning_from_battle: bool = false  # True when coming back from a battle
var _last_battle_won: bool = false
var _story_screen_scene := preload("res://scenes/story_screen.tscn")

# ── UI references ──
var _main_container: VBoxContainer
var _missions_vbox: VBoxContainer
var _action_button: Button
var _status_label: RichTextLabel
var _commander_label: RichTextLabel
var _roster_vbox: VBoxContainer
var _fade_overlay: ColorRect

# ── Faction colors ──
const FACTION_COLORS := {
	CombatantDefinition.Faction.EMBERCLAW: Color(0.85, 0.25, 0.10),
	CombatantDefinition.Faction.IRON_DOMINION: Color(0.45, 0.52, 0.60),
	CombatantDefinition.Faction.NIGHTFANG: Color(0.50, 0.12, 0.60),
	CombatantDefinition.Faction.THORNWEFT: Color(0.18, 0.62, 0.18),
	CombatantDefinition.Faction.VEILBOUND: Color(0.15, 0.45, 0.80),
}

func _ready():
	set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	mouse_filter = MOUSE_FILTER_IGNORE

	var campaign_id = BattleConfig.campaign_id
	if campaign_id.is_empty():
		push_error("CampaignOverview: No campaign_id set in BattleConfig")
		get_tree().change_scene_to_file("res://scenes/campaign_select.tscn")
		return

	# Check if we have an existing campaign manager (returning from battle or loaded save)
	if BattleConfig.campaign_manager != null:
		_campaign_manager = BattleConfig.campaign_manager
		if BattleConfig.is_loaded_save:
			# Loaded from a save — go straight to hub, no battle-return flow
			_returning_from_battle = false
			BattleConfig.is_loaded_save = false
		else:
			_returning_from_battle = true
			_last_battle_won = BattleConfig.get_meta("last_battle_won", false) if BattleConfig.has_meta("last_battle_won") else true
	else:
		# Fresh campaign start
		_campaign_manager = preload("res://combat/campaign_manager_v2.gd").new()
		if not _campaign_manager.start_campaign(campaign_id):
			push_error("CampaignOverview: Failed to start campaign '%s'" % campaign_id)
			get_tree().change_scene_to_file("res://scenes/campaign_select.tscn")
			return
		BattleConfig.campaign_manager = _campaign_manager

	_campaign_data = CampaignData.get_campaign(campaign_id)
	_build_ui()

	# Create fade overlay (on top of everything)
	_fade_overlay = ColorRect.new()
	_fade_overlay.color = Color.BLACK
	_fade_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	_fade_overlay.mouse_filter = MOUSE_FILTER_IGNORE
	add_child(_fade_overlay)

	# Fade in from black
	var fade_in = create_tween()
	fade_in.tween_property(_fade_overlay, "modulate:a", 0.0, 0.5)

	# Determine what to show
	AudioManager.play_music("campaign")
	if _returning_from_battle:
		_handle_return_from_battle()
	else:
		_show_opening_story()


# ══════════════════════════════════════════════════════════════
# FLOW CONTROL
# ══════════════════════════════════════════════════════════════

func _show_opening_story():
	"""Play the campaign opening story, then show the hub."""
	var opening = _campaign_manager.get_opening_story()
	if opening.is_empty():
		_show_hub()
		return
	_play_story(opening, _show_hub)

func _handle_return_from_battle():
	"""Handle returning from a battle — show appropriate story."""
	if _last_battle_won:
		# Show post-victory story for the PREVIOUS mission (current_mission was already advanced)
		var prev_index = _campaign_manager.get_current_mission_index() - 1
		if prev_index >= 0:
			var prev_mission = _campaign_manager.get_mission(prev_index)
			# Show victory banner first, then story
			_show_mission_complete_banner(prev_index, prev_mission.get("title", ""), func():
				var post_story = prev_mission.get("post_story", [])
				if not post_story.is_empty():
					_play_story(post_story, _check_campaign_complete)
				else:
					_check_campaign_complete()
			)
		else:
			_check_campaign_complete()
	else:
		# Show defeat story — mission index hasn't advanced
		var defeat_story = _campaign_manager.get_defeat_story()
		if not defeat_story.is_empty():
			_play_story(defeat_story, _show_hub)
		else:
			_show_hub()

func _check_campaign_complete():
	"""After post-victory story, check if campaign is done."""
	if _campaign_manager.is_campaign_complete():
		_show_ending_story()
	else:
		# Show an inter-mission event before returning to hub
		_show_inter_mission_event()

func _show_mission_complete_banner(mission_index: int, mission_title: String, on_done: Callable):
	"""Show a tween-animated 'Mission Complete!' banner, then call on_done."""
	var overlay = ColorRect.new()
	overlay.color = Color(0, 0, 0, 0.6)
	overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(overlay)

	var banner = VBoxContainer.new()
	banner.set_anchors_preset(Control.PRESET_CENTER)
	banner.alignment = BoxContainer.ALIGNMENT_CENTER
	overlay.add_child(banner)

	var check_label = Label.new()
	check_label.text = "✓"
	check_label.add_theme_font_size_override("font_size", 48)
	check_label.add_theme_color_override("font_color", Color(0.2, 1.0, 0.3))
	check_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	banner.add_child(check_label)

	var title_label = Label.new()
	title_label.text = "Mission %d Complete!" % (mission_index + 1)
	title_label.add_theme_font_size_override("font_size", 32)
	title_label.add_theme_color_override("font_color", Color(1.0, 0.85, 0.3))
	title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	banner.add_child(title_label)

	if not mission_title.is_empty():
		var sub_label = Label.new()
		sub_label.text = "\"%s\"" % mission_title
		sub_label.add_theme_font_size_override("font_size", 18)
		sub_label.add_theme_color_override("font_color", Color(0.7, 0.7, 0.7))
		sub_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		banner.add_child(sub_label)

	# Animate: fade in, hold, fade out
	overlay.modulate.a = 0.0
	var tween = create_tween()
	tween.tween_property(overlay, "modulate:a", 1.0, 0.4)
	tween.tween_interval(1.8)
	tween.tween_property(overlay, "modulate:a", 0.0, 0.4)
	tween.tween_callback(func():
		overlay.queue_free()
		on_done.call()
	)

func _show_ending_story():
	"""Play the campaign ending story."""
	var ending = _campaign_manager.get_ending_story()
	if ending.is_empty():
		_show_campaign_complete()
		return
	_play_story(ending, _show_campaign_complete)

func _show_campaign_complete():
	"""Show campaign complete screen."""
	_clear_content()
	SaveManager.mark_campaign_complete(BattleConfig.campaign_id)
	AudioManager.play_sfx("campaign_complete")
	AudioManager.play_music("win", false)
	_build_campaign_complete_ui()

func _show_hub():
	"""Refresh the hub with current mission info."""
	_refresh_missions()
	_update_action_button()
	_update_status()
	_refresh_roster()

# ══════════════════════════════════════════════════════════════
# INTER-MISSION EVENTS — Random choices between battles
# ══════════════════════════════════════════════════════════════

const INTER_MISSION_EVENTS := [
	{
		"title": "Abandoned Forge",
		"text": "Your scouts found an abandoned shard-forge, still warm. You have time for one task.",
		"option_a": {"label": "Reforge Weapons", "desc": "+5 XP to all melee units", "effect": "xp_melee"},
		"option_b": {"label": "Reinforce Armor", "desc": "+5 XP to all infantry units", "effect": "xp_infantry"},
	},
	{
		"title": "Shard Cache",
		"text": "A hidden shard deposit glows beneath the rubble. How do you use it?",
		"option_a": {"label": "Absorb the Heat", "desc": "Heal all units fully", "effect": "heal_all"},
		"option_b": {"label": "Study the Shards", "desc": "+5 XP to your commander", "effect": "xp_commander"},
	},
	{
		"title": "Wandering Warriors",
		"text": "A band of displaced warriors offers to share what they know. What do you ask?",
		"option_a": {"label": "Combat Techniques", "desc": "+5 XP to 3 random units", "effect": "xp_random"},
		"option_b": {"label": "Enemy Intelligence", "desc": "+1 CP at start of next battle", "effect": "cp_bonus"},
	},
	{
		"title": "Drake Nest",
		"text": "Your drakes discovered a nesting site. The warband can rest here, but time is short.",
		"option_a": {"label": "Full Rest", "desc": "All casualties from last battle restored", "effect": "restore_casualties"},
		"option_b": {"label": "Drake Training", "desc": "+5 XP to all mounted/flying units", "effect": "xp_mounted"},
	},
	{
		"title": "Ominous Whispers",
		"text": "The shards pulse with a strange rhythm. Vex feels something watching...",
		"option_a": {"label": "Embrace the Vision", "desc": "+10 XP to commander, but -1 MOR next battle", "effect": "vision_embrace"},
		"option_b": {"label": "Shut It Out", "desc": "+5 XP to all units", "effect": "xp_all"},
	},
]

# Faction-specific events keyed by CombatantDefinition.Faction enum
const FACTION_EVENTS := {
	CombatantDefinition.Faction.EMBERCLAW: [
		{
			"title": "Volcanic Vent",
			"text": "A fissure of raw shard-fire splits the ground open. The drakes are restless with excitement.",
			"option_a": {"label": "Stoke the Flames", "desc": "+8 XP to all melee units", "effect": "xp_melee_8"},
			"option_b": {"label": "Harvest Heat-Shards", "desc": "Heal all units + restore casualties", "effect": "full_restore"},
		},
		{
			"title": "Feral Drake Pack",
			"text": "A pack of wild drakes circles your warcamp. Vex eyes them with interest.",
			"option_a": {"label": "Tame Them", "desc": "+8 XP to mounted/cavalry units", "effect": "xp_mounted_8"},
			"option_b": {"label": "Drive Them Off", "desc": "+5 XP to all ranged units", "effect": "xp_ranged"},
		},
	],
	CombatantDefinition.Faction.IRON_DOMINION: [
		{
			"title": "Data Fragment Recovery",
			"text": "A corrupted Grid relay emits faint signals. Your engineers can attempt to decode it.",
			"option_a": {"label": "Full Decode", "desc": "+8 XP to your commander", "effect": "xp_commander_8"},
			"option_b": {"label": "Extract Components", "desc": "+5 XP to all war machine units", "effect": "xp_machine"},
		},
		{
			"title": "Emergency Refit",
			"text": "The warforged units have taken structural damage. Your foundry can handle two tasks.",
			"option_a": {"label": "Armor Refit", "desc": "Restore all casualties", "effect": "restore_casualties"},
			"option_b": {"label": "Weapon Upgrade", "desc": "+5 XP to all elite units", "effect": "xp_elite"},
		},
	],
	CombatantDefinition.Faction.NIGHTFANG: [
		{
			"title": "Shard Corruption Pool",
			"text": "A pool of dark shard-energy pulses with unlife. The Nightfang hunger draws you near.",
			"option_a": {"label": "Drink Deep", "desc": "+10 XP to commander, +5 all elites", "effect": "corruption_feast"},
			"option_b": {"label": "Drain Carefully", "desc": "Heal all units, restore casualties", "effect": "full_restore"},
		},
		{
			"title": "Risen Scouts",
			"text": "Your thralls have unearthed a mass grave from a forgotten battle. Potential recruits...",
			"option_a": {"label": "Raise Them", "desc": "+8 XP to all line infantry", "effect": "xp_line_8"},
			"option_b": {"label": "Loot the Graves", "desc": "+5 XP to all units", "effect": "xp_all"},
		},
	],
	CombatantDefinition.Faction.THORNWEFT: [
		{
			"title": "Ancient Root Network",
			"text": "The forest floor trembles — you've found a convergence of fate-threads woven into living wood.",
			"option_a": {"label": "Weave New Threads", "desc": "+8 XP to all specialist units", "effect": "xp_specialist_8"},
			"option_b": {"label": "Strengthen the Web", "desc": "+5 XP to all units", "effect": "xp_all"},
		},
		{
			"title": "Thorned Sanctuary",
			"text": "A hidden grove wrapped in thorns offers shelter. The matriarch senses powerful flora within.",
			"option_a": {"label": "Harvest Spores", "desc": "+8 XP to ranged/support units", "effect": "xp_ranged_support_8"},
			"option_b": {"label": "Rest in Safety", "desc": "Heal all, restore casualties", "effect": "full_restore"},
		},
	],
	CombatantDefinition.Faction.VEILBOUND: [
		{
			"title": "Spirit Convergence",
			"text": "The veil thins at this crossing. Ancestral spirits swirl around your warriors, offering guidance.",
			"option_a": {"label": "Channel Ancestors", "desc": "+10 XP to commander", "effect": "xp_commander_10"},
			"option_b": {"label": "Share the Blessing", "desc": "+5 XP to all units", "effect": "xp_all"},
		},
		{
			"title": "Ritual Shrine",
			"text": "An ancient shrine to the Old Stances stands intact. Your monks can perform one rite.",
			"option_a": {"label": "Rite of Steel", "desc": "+8 XP to melee/elite units", "effect": "xp_melee_elite_8"},
			"option_b": {"label": "Rite of Mending", "desc": "Heal all, restore casualties", "effect": "full_restore"},
		},
	],
}

func _get_event_pool() -> Array:
	"""Return combined generic + faction-specific event pool."""
	var pool = INTER_MISSION_EVENTS.duplicate()
	var faction_enum = _campaign_manager.get_faction_enum()
	if FACTION_EVENTS.has(faction_enum):
		pool.append_array(FACTION_EVENTS[faction_enum])
	return pool

func _show_inter_mission_event():
	"""Show a random event with two choices between missions."""
	AudioManager.play_sfx("event_appear")
	var pool = _get_event_pool()
	var event = pool[randi() % pool.size()]

	var overlay = ColorRect.new()
	overlay.name = "EventOverlay"
	overlay.color = Color(0.0, 0.0, 0.0, 0.7)
	overlay.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	overlay.mouse_filter = MOUSE_FILTER_STOP
	add_child(overlay)

	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	center.mouse_filter = MOUSE_FILTER_IGNORE
	overlay.add_child(center)

	var panel = PanelContainer.new()
	panel.custom_minimum_size = Vector2(480, 280)
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
	pstyle.border_color = Color(0.8, 0.65, 0.15, 0.6)
	pstyle.content_margin_left = 28
	pstyle.content_margin_right = 28
	pstyle.content_margin_top = 24
	pstyle.content_margin_bottom = 24
	panel.add_theme_stylebox_override("panel", pstyle)
	center.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 14)
	panel.add_child(vbox)

	# Event header
	var header = Label.new()
	header.text = "⚔ %s" % event.title
	header.add_theme_font_size_override("font_size", 20)
	header.add_theme_color_override("font_color", Color(1.0, 0.85, 0.3))
	header.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(header)

	# Event description
	var desc = Label.new()
	desc.text = event.text
	desc.add_theme_font_size_override("font_size", 14)
	desc.add_theme_color_override("font_color", Color(0.8, 0.78, 0.7))
	desc.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	desc.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	vbox.add_child(desc)

	var spacer = Control.new()
	spacer.custom_minimum_size = Vector2(0, 8)
	vbox.add_child(spacer)

	# Option buttons
	var btn_row = HBoxContainer.new()
	btn_row.add_theme_constant_override("separation", 16)
	btn_row.alignment = BoxContainer.ALIGNMENT_CENTER
	vbox.add_child(btn_row)

	var btn_a = _make_event_button(event.option_a.label, event.option_a.desc, Color(0.3, 0.6, 0.9))
	btn_a.pressed.connect(func():
		_apply_event_effect(event.option_a.effect)
		overlay.queue_free()
		_show_hub()
	)
	btn_row.add_child(btn_a)

	var btn_b = _make_event_button(event.option_b.label, event.option_b.desc, Color(0.9, 0.5, 0.2))
	btn_b.pressed.connect(func():
		_apply_event_effect(event.option_b.effect)
		overlay.queue_free()
		_show_hub()
	)
	btn_row.add_child(btn_b)

	# Fade in
	overlay.modulate.a = 0.0
	var tween = create_tween()
	tween.tween_property(overlay, "modulate:a", 1.0, 0.4)

func _make_event_button(label_text: String, desc_text: String, accent: Color) -> Button:
	var btn = Button.new()
	btn.custom_minimum_size = Vector2(190, 70)
	btn.focus_mode = Control.FOCUS_NONE
	var style = StyleBoxFlat.new()
	style.bg_color = Color(accent.r, accent.g, accent.b, 0.15)
	style.corner_radius_top_left = 6
	style.corner_radius_top_right = 6
	style.corner_radius_bottom_left = 6
	style.corner_radius_bottom_right = 6
	style.border_width_left = 2
	style.border_width_right = 1
	style.border_width_top = 1
	style.border_width_bottom = 1
	style.border_color = Color(accent.r, accent.g, accent.b, 0.5)
	style.content_margin_left = 12
	style.content_margin_right = 12
	style.content_margin_top = 8
	style.content_margin_bottom = 8
	btn.add_theme_stylebox_override("normal", style)
	var hover = style.duplicate()
	hover.bg_color = Color(accent.r, accent.g, accent.b, 0.3)
	btn.add_theme_stylebox_override("hover", hover)
	btn.text = "%s\n%s" % [label_text, desc_text]
	btn.add_theme_font_size_override("font_size", 12)
	btn.add_theme_color_override("font_color", accent.lightened(0.3))
	btn.add_theme_color_override("font_hover_color", accent.lightened(0.5))
	return btn

func _apply_event_effect(effect: String):
	"""Apply the chosen event effect to the campaign state."""
	var cm = _campaign_manager
	match effect:
		"xp_melee":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.MELEE, CombatantDefinition.UnitType.ELITE]:
					cm._grant_xp(unit_name, 5)
		"xp_infantry":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.LINE, CombatantDefinition.UnitType.MELEE]:
					cm._grant_xp(unit_name, 5)
		"heal_all":
			cm.casualties.clear()
		"xp_commander":
			var cmd_name = cm.get_commander_name()
			cm._grant_xp(cmd_name, 5)
		"xp_random":
			var names = cm.veterancy.keys()
			names.shuffle()
			for i in range(mini(3, names.size())):
				cm._grant_xp(names[i], 5)
		"cp_bonus":
			# Store a one-time CP bonus — will be picked up by battle modifiers
			pass  # CP bonus is minor; granting XP to commander as fallback
			cm._grant_xp(cm.get_commander_name(), 3)
		"restore_casualties":
			cm.casualties.clear()
		"xp_mounted":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.CAVALRY, CombatantDefinition.UnitType.WAR_MACHINE]:
					cm._grant_xp(unit_name, 5)
		"vision_embrace":
			cm._grant_xp(cm.get_commander_name(), 10)
		"xp_all":
			for unit_name in cm.veterancy:
				cm._grant_xp(unit_name, 5)
		# ── Faction-specific effects ──
		"xp_melee_8":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.MELEE, CombatantDefinition.UnitType.ELITE]:
					cm._grant_xp(unit_name, 8)
		"full_restore":
			cm.casualties.clear()
		"xp_mounted_8":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.CAVALRY, CombatantDefinition.UnitType.WAR_MACHINE]:
					cm._grant_xp(unit_name, 8)
		"xp_ranged":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type == CombatantDefinition.UnitType.RANGED:
					cm._grant_xp(unit_name, 5)
		"xp_commander_8":
			cm._grant_xp(cm.get_commander_name(), 8)
		"xp_machine":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type == CombatantDefinition.UnitType.WAR_MACHINE:
					cm._grant_xp(unit_name, 5)
		"xp_elite":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type == CombatantDefinition.UnitType.ELITE:
					cm._grant_xp(unit_name, 5)
		"corruption_feast":
			cm._grant_xp(cm.get_commander_name(), 10)
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type == CombatantDefinition.UnitType.ELITE:
					cm._grant_xp(unit_name, 5)
		"xp_line_8":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type == CombatantDefinition.UnitType.LINE:
					cm._grant_xp(unit_name, 8)
		"xp_specialist_8":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type == CombatantDefinition.UnitType.SPECIALIST:
					cm._grant_xp(unit_name, 8)
		"xp_ranged_support_8":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.RANGED, CombatantDefinition.UnitType.SUPPORT]:
					cm._grant_xp(unit_name, 8)
		"xp_commander_10":
			cm._grant_xp(cm.get_commander_name(), 10)
		"xp_melee_elite_8":
			for unit_name in cm.veterancy:
				var def = FactionDatabase.get_unit(unit_name)
				if def and def.unit_type in [CombatantDefinition.UnitType.MELEE, CombatantDefinition.UnitType.ELITE]:
					cm._grant_xp(unit_name, 8)

func _play_story(dialogue: Array, on_complete: Callable):
	"""Instantiate StoryScreen and play a dialogue sequence."""
	var screen = _story_screen_scene.instantiate()
	add_child(screen)
	screen.play_sequence(dialogue, on_complete)

# ══════════════════════════════════════════════════════════════
# BATTLE LAUNCH
# ══════════════════════════════════════════════════════════════

func _on_start_mission():
	"""Show pre-battle story, then launch the battle."""
	var pre_story = _campaign_manager.get_pre_story()
	if pre_story.is_empty():
		_launch_battle()
	else:
		_play_story(pre_story, _launch_battle)

func _launch_battle():
	"""Configure BattleConfig and transition to battle scene with fade-out."""
	if not _campaign_manager.setup_battle():
		push_error("CampaignOverview: Failed to setup battle")
		return

	# Fade out to black before loading battle
	_fade_overlay.mouse_filter = MOUSE_FILTER_STOP  # block input during fade
	var fade_out = create_tween()
	fade_out.tween_property(_fade_overlay, "modulate:a", 1.0, 0.5)
	fade_out.tween_callback(func():
		GameStateMachine.reset()
		GameStateMachine.transition_to(GameStateMachine.GameState.BATTLE)
		get_tree().change_scene_to_file("res://scenes/game.tscn")
	)

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

	# Main margin
	var margin = MarginContainer.new()
	margin.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 50)
	margin.add_theme_constant_override("margin_top", 30)
	margin.add_theme_constant_override("margin_right", 50)
	margin.add_theme_constant_override("margin_bottom", 30)
	add_child(margin)

	_main_container = VBoxContainer.new()
	_main_container.add_theme_constant_override("separation", 12)
	margin.add_child(_main_container)

	var faction_enum = _campaign_manager.get_faction_enum()
	var accent: Color = FACTION_COLORS.get(faction_enum, Color(0.8, 0.65, 0.15))

	# ── Header: Campaign title + Commander ──
	_build_header(accent)

	# ── Separator ──
	var sep = HSeparator.new()
	var sep_style = StyleBoxFlat.new()
	sep_style.bg_color = Color(accent.r, accent.g, accent.b, 0.3)
	sep_style.content_margin_top = 0
	sep_style.content_margin_bottom = 0
	sep.add_theme_stylebox_override("separator", sep_style)
	_main_container.add_child(sep)

	# ── Two-column layout ──
	var columns = HBoxContainer.new()
	columns.add_theme_constant_override("separation", 24)
	columns.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_main_container.add_child(columns)

	# Left column: Mission list
	var left = VBoxContainer.new()
	left.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	left.size_flags_stretch_ratio = 1.5
	left.add_theme_constant_override("separation", 8)
	columns.add_child(left)

	var missions_title = Label.new()
	missions_title.text = "MISSIONS"
	missions_title.add_theme_font_size_override("font_size", 14)
	missions_title.add_theme_color_override("font_color", Color(0.6, 0.55, 0.4))
	left.add_child(missions_title)

	var scroll = ScrollContainer.new()
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	left.add_child(scroll)

	_missions_vbox = VBoxContainer.new()
	_missions_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_missions_vbox.add_theme_constant_override("separation", 6)
	scroll.add_child(_missions_vbox)

	# Right column: Status + Action
	var right = VBoxContainer.new()
	right.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	right.size_flags_stretch_ratio = 1.0
	right.add_theme_constant_override("separation", 12)
	columns.add_child(right)

	var status_title = Label.new()
	status_title.text = "STATUS"
	status_title.add_theme_font_size_override("font_size", 14)
	status_title.add_theme_color_override("font_color", Color(0.6, 0.55, 0.4))
	right.add_child(status_title)

	_status_label = RichTextLabel.new()
	_status_label.bbcode_enabled = true
	_status_label.fit_content = true
	_status_label.scroll_active = false
	_status_label.mouse_filter = MOUSE_FILTER_IGNORE
	_status_label.custom_minimum_size = Vector2(250, 100)
	right.add_child(_status_label)

	# ── Army Roster ──
	var roster_title = Label.new()
	roster_title.text = "YOUR ARMY"
	roster_title.add_theme_font_size_override("font_size", 14)
	roster_title.add_theme_color_override("font_color", Color(0.6, 0.55, 0.4))
	right.add_child(roster_title)

	var roster_scroll = ScrollContainer.new()
	roster_scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	roster_scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	roster_scroll.custom_minimum_size = Vector2(250, 120)
	right.add_child(roster_scroll)

	_roster_vbox = VBoxContainer.new()
	_roster_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_roster_vbox.add_theme_constant_override("separation", 2)
	roster_scroll.add_child(_roster_vbox)

	# Action button
	var spacer = Control.new()
	spacer.size_flags_vertical = Control.SIZE_EXPAND_FILL
	right.add_child(spacer)

	_action_button = Button.new()
	_action_button.text = "BEGIN MISSION"
	_action_button.custom_minimum_size = Vector2(220, 50)
	_action_button.add_theme_font_size_override("font_size", 16)
	_action_button.focus_mode = Control.FOCUS_NONE
	var btn_style = StyleBoxFlat.new()
	btn_style.bg_color = Color(accent.r, accent.g, accent.b, 0.2)
	btn_style.corner_radius_top_left = 6
	btn_style.corner_radius_top_right = 6
	btn_style.corner_radius_bottom_left = 6
	btn_style.corner_radius_bottom_right = 6
	btn_style.border_width_left = 3
	btn_style.border_width_right = 1
	btn_style.border_width_top = 1
	btn_style.border_width_bottom = 1
	btn_style.border_color = accent
	btn_style.content_margin_left = 16
	btn_style.content_margin_right = 16
	btn_style.content_margin_top = 10
	btn_style.content_margin_bottom = 10
	_action_button.add_theme_stylebox_override("normal", btn_style)
	var hover_style = btn_style.duplicate()
	hover_style.bg_color = Color(accent.r, accent.g, accent.b, 0.35)
	_action_button.add_theme_stylebox_override("hover", hover_style)
	_action_button.add_theme_color_override("font_color", accent.lightened(0.3))
	_action_button.add_theme_color_override("font_hover_color", Color(1.0, 0.95, 0.85))
	_action_button.pressed.connect(_on_start_mission)
	right.add_child(_action_button)

	# ── Bottom bar ──
	var bottom = HBoxContainer.new()
	bottom.add_theme_constant_override("separation", 10)
	_main_container.add_child(bottom)

	var back_btn = Button.new()
	back_btn.text = "← ABANDON CAMPAIGN"
	back_btn.custom_minimum_size = Vector2(200, 36)
	back_btn.add_theme_font_size_override("font_size", 12)
	back_btn.focus_mode = Control.FOCUS_NONE
	var back_style = StyleBoxFlat.new()
	back_style.bg_color = Color(0.15, 0.08, 0.08, 0.5)
	back_style.corner_radius_top_left = 4
	back_style.corner_radius_top_right = 4
	back_style.corner_radius_bottom_left = 4
	back_style.corner_radius_bottom_right = 4
	back_style.border_width_left = 2
	back_style.border_color = Color(0.5, 0.2, 0.2, 0.4)
	back_style.content_margin_left = 12
	back_style.content_margin_right = 12
	back_style.content_margin_top = 4
	back_style.content_margin_bottom = 4
	back_btn.add_theme_stylebox_override("normal", back_style)
	var back_hover = back_style.duplicate()
	back_hover.bg_color = Color(0.25, 0.12, 0.12, 0.6)
	back_btn.add_theme_stylebox_override("hover", back_hover)
	back_btn.add_theme_color_override("font_color", Color(0.6, 0.35, 0.35))
	back_btn.add_theme_color_override("font_hover_color", Color(0.9, 0.4, 0.4))
	back_btn.pressed.connect(_on_abandon)
	bottom.add_child(back_btn)

	# ── Save button ──
	var save_btn = Button.new()
	save_btn.text = "💾 SAVE CAMPAIGN"
	save_btn.custom_minimum_size = Vector2(180, 36)
	save_btn.add_theme_font_size_override("font_size", 12)
	save_btn.focus_mode = Control.FOCUS_NONE
	var save_style = StyleBoxFlat.new()
	save_style.bg_color = Color(0.08, 0.15, 0.12, 0.5)
	save_style.corner_radius_top_left = 4
	save_style.corner_radius_top_right = 4
	save_style.corner_radius_bottom_left = 4
	save_style.corner_radius_bottom_right = 4
	save_style.border_width_left = 2
	save_style.border_color = Color(0.2, 0.5, 0.3, 0.4)
	save_style.content_margin_left = 12
	save_style.content_margin_right = 12
	save_style.content_margin_top = 4
	save_style.content_margin_bottom = 4
	save_btn.add_theme_stylebox_override("normal", save_style)
	var save_hover = save_style.duplicate()
	save_hover.bg_color = Color(0.12, 0.25, 0.18, 0.6)
	save_btn.add_theme_stylebox_override("hover", save_hover)
	save_btn.add_theme_color_override("font_color", Color(0.35, 0.65, 0.45))
	save_btn.add_theme_color_override("font_hover_color", Color(0.5, 0.9, 0.6))
	save_btn.pressed.connect(_on_save_campaign)
	bottom.add_child(save_btn)

	# Build initial mission list
	_refresh_missions()
	_update_action_button()
	_update_status()
	_refresh_roster()


func _build_header(accent: Color):
	var header = HBoxContainer.new()
	header.add_theme_constant_override("separation", 16)
	_main_container.add_child(header)

	# Commander color bar
	var bar = ColorRect.new()
	bar.custom_minimum_size = Vector2(6, 60)
	bar.color = accent
	header.add_child(bar)

	var header_vbox = VBoxContainer.new()
	header_vbox.add_theme_constant_override("separation", 4)
	header.add_child(header_vbox)

	var title = RichTextLabel.new()
	title.bbcode_enabled = true
	title.fit_content = true
	title.scroll_active = false
	title.mouse_filter = MOUSE_FILTER_IGNORE
	var hex = accent.lightened(0.3).to_html(false)
	title.text = "[color=#FFD700][font_size=28]%s[/font_size][/color]" % _campaign_data.get("title", "Campaign")
	header_vbox.add_child(title)

	_commander_label = RichTextLabel.new()
	_commander_label.bbcode_enabled = true
	_commander_label.fit_content = true
	_commander_label.scroll_active = false
	_commander_label.mouse_filter = MOUSE_FILTER_IGNORE
	_commander_label.text = "[color=#%s][font_size=15]Commander: %s[/font_size][/color]" % [
		hex, _campaign_data.get("commander", "Unknown")]
	header_vbox.add_child(_commander_label)


# ══════════════════════════════════════════════════════════════
# DYNAMIC UI UPDATES
# ══════════════════════════════════════════════════════════════

func _refresh_missions():
	"""Rebuild the mission list showing progress."""
	# Clear existing
	for child in _missions_vbox.get_children():
		child.queue_free()

	var total = _campaign_manager.get_total_missions()
	var current = _campaign_manager.get_current_mission_index()
	var faction_enum = _campaign_manager.get_faction_enum()
	var accent: Color = FACTION_COLORS.get(faction_enum, Color(0.8, 0.65, 0.15))

	for i in range(total):
		var mission = _campaign_manager.get_mission(i)
		var is_current = (i == current)
		var is_complete = (i < current)
		_build_mission_row(i, mission, is_current, is_complete, accent)

func _build_mission_row(index: int, mission: Dictionary, is_current: bool, is_complete: bool, accent: Color):
	var row = PanelContainer.new()
	var row_style = StyleBoxFlat.new()

	if is_current:
		row_style.bg_color = Color(accent.r, accent.g, accent.b, 0.12)
		row_style.border_width_left = 3
		row_style.border_color = accent
	elif is_complete:
		row_style.bg_color = Color(0.1, 0.15, 0.1, 0.3)
		row_style.border_width_left = 3
		row_style.border_color = Color(0.3, 0.7, 0.3, 0.5)
	else:
		row_style.bg_color = Color(0.08, 0.08, 0.1, 0.3)
		row_style.border_width_left = 3
		row_style.border_color = Color(0.3, 0.3, 0.35, 0.3)

	row_style.corner_radius_top_left = 4
	row_style.corner_radius_top_right = 4
	row_style.corner_radius_bottom_left = 4
	row_style.corner_radius_bottom_right = 4
	row_style.content_margin_left = 12
	row_style.content_margin_right = 12
	row_style.content_margin_top = 8
	row_style.content_margin_bottom = 8
	row.add_theme_stylebox_override("panel", row_style)
	_missions_vbox.add_child(row)

	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 10)
	hbox.mouse_filter = MOUSE_FILTER_IGNORE
	row.add_child(hbox)

	# Status icon
	var status = Label.new()
	if is_complete:
		status.text = "✓"
		status.add_theme_color_override("font_color", Color(0.3, 0.8, 0.3))
	elif is_current:
		status.text = "►"
		status.add_theme_color_override("font_color", accent.lightened(0.3))
	else:
		status.text = "○"
		status.add_theme_color_override("font_color", Color(0.4, 0.4, 0.45))
	status.add_theme_font_size_override("font_size", 14)
	hbox.add_child(status)

	# Mission number + title
	var title = Label.new()
	title.text = "Mission %d: %s" % [index + 1, mission.get("title", "Unknown")]
	title.add_theme_font_size_override("font_size", 14)
	if is_current:
		title.add_theme_color_override("font_color", Color(0.9, 0.85, 0.7))
	elif is_complete:
		title.add_theme_color_override("font_color", Color(0.5, 0.7, 0.5))
	else:
		title.add_theme_color_override("font_color", Color(0.45, 0.45, 0.5))
	hbox.add_child(title)

	# Battle size badge
	var expand = Control.new()
	expand.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	expand.mouse_filter = MOUSE_FILTER_IGNORE
	hbox.add_child(expand)

	var size_label = Label.new()
	size_label.text = mission.get("battle_size", "standard").to_upper()
	size_label.add_theme_font_size_override("font_size", 10)
	size_label.add_theme_color_override("font_color", Color(0.45, 0.45, 0.5, 0.6))
	hbox.add_child(size_label)


func _update_action_button():
	if _campaign_manager.is_campaign_complete():
		_action_button.text = "CAMPAIGN COMPLETE"
		_action_button.disabled = true
	else:
		var mission = _campaign_manager.get_current_mission()
		_action_button.text = "BEGIN: %s" % mission.get("title", "Mission")
		_action_button.disabled = false

func _update_status():
	var summary = _campaign_manager.get_campaign_summary()
	var text := "[color=#AAA][font_size=13]"
	text += "Progress: %d / %d missions\n" % [summary.missions_completed, summary.total_missions]
	text += "Victories: %d\n" % summary.victories
	if summary.defeats > 0:
		text += "Defeats: %d\n" % summary.defeats

	# Current mission objectives
	if not _campaign_manager.is_campaign_complete():
		var mission = _campaign_manager.get_current_mission()
		var obj_text = mission.get("objectives_text", "")
		if obj_text != "":
			text += "\n[color=#FFD700]Objective:[/color]\n"
			text += "[color=#CCC]%s[/color]\n" % obj_text
		var battle_size = mission.get("battle_size", "standard")
		var scenario = mission.get("scenario", "total_war")
		text += "\n[color=#888]%s • %s • %d rounds[/color]\n" % [
			battle_size.to_upper(), scenario.replace("_", " ").capitalize(),
			mission.get("round_limit", 6)]

		# Enemy intel
		var enemy_faction_enum = mission.get("enemy_faction", -1)
		var enemy_name = FactionDatabase.FACTIONS.get(enemy_faction_enum, {}).get("name", "Unknown")
		var enemy_army: Array = mission.get("enemy_army", [])
		text += "\n[color=#FF6644]Enemy Intel:[/color]\n"
		text += "[color=#CC9999]Faction: %s[/color]\n" % enemy_name
		text += "[color=#CC9999]Forces: %d units[/color]\n" % enemy_army.size()
		# Check for enemy commander
		var has_commander := false
		for unit_name in enemy_army:
			var unit_def = FactionDatabase.get_unit(unit_name)
			if unit_def and unit_def.is_commander():
				text += "[color=#FF8866]  ⚠ Commander: %s[/color]\n" % unit_name
				has_commander = true
				break
		if not has_commander:
			text += "[color=#999]  No enemy commander detected[/color]\n"

		# Battle modifier preview
		var mods = mission.get("battle_modifiers", {})
		if not mods.is_empty():
			text += "\n[color=#FFAA33]⚡ %s[/color]\n" % mods.get("label", "Modifier")
			if mods.has("description"):
				text += "[color=#AA8844]  %s[/color]\n" % mods.description

	# Show veterancy
	if not summary.veterancy.is_empty():
		text += "\n[color=#FFD700]Veterans:[/color]\n"
		for unit_name in summary.veterancy:
			var vet = summary.veterancy[unit_name]
			if vet.level > 0:
				text += "  %s (Lv.%d)\n" % [unit_name, vet.level]
	text += "[/font_size][/color]"
	_status_label.text = text


func _clear_content():
	for child in _main_container.get_children():
		child.queue_free()

func _refresh_roster():
	"""Populate the army roster panel with unit names, levels, and XP."""
	if _roster_vbox == null:
		return
	for child in _roster_vbox.get_children():
		child.queue_free()

	var vet = _campaign_manager.veterancy
	var casualties: Array = _campaign_manager.casualties

	# Sorted by level descending
	var entries: Array = []
	for unit_name in vet:
		var v = vet[unit_name]
		entries.append({"name": unit_name, "level": v.get("level", 0), "xp": v.get("xp", 0),
			"bonuses": v.get("bonuses", []), "dead": unit_name in casualties})
	entries.sort_custom(func(a, b): return a.level > b.level)

	for e in entries:
		var row = HBoxContainer.new()
		row.add_theme_constant_override("separation", 6)
		_roster_vbox.add_child(row)

		# Stars for level
		var stars_text = ""
		if e.level > 0:
			stars_text = "★".repeat(mini(e.level, 5)) + " "

		var name_label = Label.new()
		name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		name_label.add_theme_font_size_override("font_size", 11)
		if e.dead:
			name_label.text = "%s%s  ☠" % [stars_text, e.name]
			name_label.add_theme_color_override("font_color", Color(0.5, 0.3, 0.3))
		else:
			name_label.text = "%s%s" % [stars_text, e.name]
			if e.level > 0:
				name_label.add_theme_color_override("font_color", Color(0.85, 0.75, 0.3))
			else:
				name_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.65))
		# Tooltip with bonuses
		if e.bonuses.size() > 0:
			name_label.tooltip_text = "Lv.%d — XP:%d\nBonuses: %s" % [e.level, e.xp, ", ".join(e.bonuses)]
		else:
			name_label.tooltip_text = "Lv.%d — XP:%d" % [e.level, e.xp]
		name_label.mouse_filter = Control.MOUSE_FILTER_PASS
		row.add_child(name_label)

		var xp_label = Label.new()
		xp_label.text = "XP:%d" % e.xp
		xp_label.add_theme_font_size_override("font_size", 10)
		xp_label.add_theme_color_override("font_color", Color(0.45, 0.45, 0.5))
		row.add_child(xp_label)

# ══════════════════════════════════════════════════════════════
# CAMPAIGN COMPLETE UI
# ══════════════════════════════════════════════════════════════

func _build_campaign_complete_ui():
	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	_main_container.add_child(center)

	var scroll = ScrollContainer.new()
	scroll.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	center.add_child(scroll)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 12)
	vbox.alignment = BoxContainer.ALIGNMENT_CENTER
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scroll.add_child(vbox)

	var complete_title = RichTextLabel.new()
	complete_title.bbcode_enabled = true
	complete_title.fit_content = true
	complete_title.scroll_active = false
	complete_title.mouse_filter = MOUSE_FILTER_IGNORE
	complete_title.text = "[center][color=#FFD700][font_size=36]CAMPAIGN COMPLETE[/font_size][/color][/center]"
	vbox.add_child(complete_title)

	var campaign_title = RichTextLabel.new()
	campaign_title.bbcode_enabled = true
	campaign_title.fit_content = true
	campaign_title.scroll_active = false
	campaign_title.mouse_filter = MOUSE_FILTER_IGNORE
	campaign_title.text = "[center][color=#AAA][font_size=18]%s — %s[/font_size][/color][/center]" % [
		_campaign_data.get("title", ""), _campaign_data.get("commander", "")]
	vbox.add_child(campaign_title)

	# Campaign Rating
	var summary = _campaign_manager.get_campaign_summary()
	var rating = _calculate_campaign_rating(summary)
	var rating_colors = {"S": "#FFD700", "A": "#44DD44", "B": "#44AAFF", "C": "#FFAA33", "D": "#FF6644"}
	var rating_color = rating_colors.get(rating.grade, "#AAA")

	var rating_label = RichTextLabel.new()
	rating_label.bbcode_enabled = true
	rating_label.fit_content = true
	rating_label.scroll_active = false
	rating_label.mouse_filter = MOUSE_FILTER_IGNORE
	rating_label.text = "[center][color=%s][font_size=48]%s[/font_size][/color]\n" % [rating_color, rating.grade]
	rating_label.text += "[color=#AAA][font_size=14]%s[/font_size][/color][/center]" % rating.title
	vbox.add_child(rating_label)

	var stats = RichTextLabel.new()
	stats.bbcode_enabled = true
	stats.fit_content = true
	stats.scroll_active = false
	stats.mouse_filter = MOUSE_FILTER_IGNORE
	stats.text = "[center][color=#888][font_size=14]"
	stats.text += "Victories: %d  •  Defeats: %d\n" % [summary.victories, summary.defeats]
	stats.text += "Score: %d / %d" % [rating.score, rating.max_score]
	stats.text += "[/font_size][/color][/center]"
	vbox.add_child(stats)

	# Veterancy summary
	if not summary.veterancy.is_empty():
		var vet_label = RichTextLabel.new()
		vet_label.bbcode_enabled = true
		vet_label.fit_content = true
		vet_label.scroll_active = false
		vet_label.mouse_filter = MOUSE_FILTER_IGNORE
		var vet_text = "[center][color=#FFD700][font_size=16]═ Veteran Units ═[/font_size][/color]\n"
		var sorted_vets: Array = []
		for unit_name in summary.veterancy:
			var vet = summary.veterancy[unit_name]
			if vet.level > 0:
				sorted_vets.append({"name": unit_name, "level": vet.level, "bonuses": vet.bonuses})
		sorted_vets.sort_custom(func(a, b): return a.level > b.level)
		for sv in sorted_vets:
			var stars = "★".repeat(mini(sv.level, 5))
			var bonus_str = ", ".join(sv.bonuses)
			vet_text += "[color=#CCAA55]%s %s (Lv.%d)[/color]\n" % [stars, sv.name, sv.level]
			vet_text += "[color=#887744]  %s[/color]\n" % bonus_str
		vet_text += "[/center]"
		vet_label.text = vet_text
		vbox.add_child(vet_label)

	var spacer = Control.new()
	spacer.custom_minimum_size = Vector2(0, 12)
	vbox.add_child(spacer)

	var menu_btn = Button.new()
	menu_btn.text = "RETURN TO CAMPAIGNS"
	menu_btn.custom_minimum_size = Vector2(250, 48)
	menu_btn.add_theme_font_size_override("font_size", 16)
	menu_btn.focus_mode = Control.FOCUS_NONE
	menu_btn.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	var btn_style = StyleBoxFlat.new()
	btn_style.bg_color = Color(0.2, 0.15, 0.08, 0.5)
	btn_style.corner_radius_top_left = 6
	btn_style.corner_radius_top_right = 6
	btn_style.corner_radius_bottom_left = 6
	btn_style.corner_radius_bottom_right = 6
	btn_style.border_width_left = 2
	btn_style.border_color = Color(0.8, 0.65, 0.15, 0.5)
	btn_style.content_margin_left = 16
	btn_style.content_margin_right = 16
	btn_style.content_margin_top = 8
	btn_style.content_margin_bottom = 8
	menu_btn.add_theme_stylebox_override("normal", btn_style)
	var hover = btn_style.duplicate()
	hover.bg_color = Color(0.3, 0.25, 0.12, 0.6)
	menu_btn.add_theme_stylebox_override("hover", hover)
	menu_btn.add_theme_color_override("font_color", Color(0.8, 0.7, 0.5))
	menu_btn.add_theme_color_override("font_hover_color", Color(1.0, 0.9, 0.6))
	menu_btn.pressed.connect(func():
		BattleConfig.clear_campaign()
		get_tree().change_scene_to_file("res://scenes/campaign_select.tscn"))
	vbox.add_child(menu_btn)

func _calculate_campaign_rating(summary: Dictionary) -> Dictionary:
	"""Calculate a letter grade based on campaign performance."""
	# Score: 10 points per mission * total missions = max score
	# Deductions: -5 per defeat, -2 per veterancy level NOT gained (opportunity cost)
	var total_missions = summary.total_missions
	var max_score = total_missions * 10
	var score = max_score
	score -= summary.defeats * 5
	# Bonus for veterancy levels gained
	var total_vet_levels := 0
	for unit_name in summary.veterancy:
		total_vet_levels += summary.veterancy[unit_name].level
	score += total_vet_levels * 2
	max_score += total_missions * 4  # Potential vet bonus

	var ratio = float(score) / float(max_score) if max_score > 0 else 0.0
	var grade: String
	var title_text: String
	if summary.defeats == 0 and total_vet_levels >= total_missions:
		grade = "S"
		title_text = "Flawless Commander — The shards tremble before you"
	elif ratio >= 0.85:
		grade = "A"
		title_text = "Veteran Commander — Fire and glory"
	elif ratio >= 0.7:
		grade = "B"
		title_text = "Proven Commander — Battle-hardened"
	elif ratio >= 0.5:
		grade = "C"
		title_text = "Surviving Commander — Bloodied but standing"
	else:
		grade = "D"
		title_text = "Struggling Commander — The road was long"

	return {"grade": grade, "title": title_text, "score": score, "max_score": max_score}

# ══════════════════════════════════════════════════════════════
# SAVE SYSTEM
# ══════════════════════════════════════════════════════════════

func _on_save_campaign():
	"""Show the save slot selection dialog."""
	_show_save_slot_dialog()


func _show_save_slot_dialog():
	"""Build and show an overlay with 5 save slots."""
	var overlay = ColorRect.new()
	overlay.name = "SaveOverlay"
	overlay.color = Color(0.0, 0.0, 0.0, 0.6)
	overlay.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	overlay.mouse_filter = MOUSE_FILTER_STOP
	add_child(overlay)

	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	center.mouse_filter = MOUSE_FILTER_IGNORE
	overlay.add_child(center)

	var panel = PanelContainer.new()
	panel.custom_minimum_size = Vector2(500, 420)
	var pstyle = StyleBoxFlat.new()
	pstyle.bg_color = Color(0.06, 0.08, 0.12, 0.95)
	pstyle.corner_radius_top_left = 8
	pstyle.corner_radius_top_right = 8
	pstyle.corner_radius_bottom_left = 8
	pstyle.corner_radius_bottom_right = 8
	pstyle.border_width_top = 2
	pstyle.border_width_bottom = 2
	pstyle.border_width_left = 2
	pstyle.border_width_right = 2
	pstyle.border_color = Color(0.2, 0.5, 0.3, 0.5)
	pstyle.content_margin_left = 20
	pstyle.content_margin_right = 20
	pstyle.content_margin_top = 16
	pstyle.content_margin_bottom = 16
	panel.add_theme_stylebox_override("panel", pstyle)
	center.add_child(panel)

	var vbox = VBoxContainer.new()
	vbox.add_theme_constant_override("separation", 10)
	panel.add_child(vbox)

	# Title
	var title = Label.new()
	title.text = "SAVE CAMPAIGN"
	title.add_theme_font_size_override("font_size", 20)
	title.add_theme_color_override("font_color", Color(0.4, 0.8, 0.5))
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(title)

	var sep = HSeparator.new()
	var sep_style = StyleBoxFlat.new()
	sep_style.bg_color = Color(0.3, 0.6, 0.4, 0.3)
	sep_style.content_margin_top = 0
	sep_style.content_margin_bottom = 0
	sep.add_theme_stylebox_override("separator", sep_style)
	vbox.add_child(sep)

	# Save slots
	var saves = SaveManager.get_all_saves()
	for i in range(SaveManager.MAX_SLOTS):
		var slot_num = i + 1
		var save_data = saves[i]
		_build_save_slot_row(vbox, slot_num, save_data, overlay)

	# Cancel button
	var cancel_row = HBoxContainer.new()
	cancel_row.alignment = BoxContainer.ALIGNMENT_CENTER
	vbox.add_child(cancel_row)

	var cancel_btn = Button.new()
	cancel_btn.text = "Cancel"
	cancel_btn.custom_minimum_size = Vector2(120, 32)
	cancel_btn.focus_mode = Control.FOCUS_NONE
	cancel_btn.add_theme_font_size_override("font_size", 13)
	cancel_btn.pressed.connect(func(): overlay.queue_free())
	cancel_row.add_child(cancel_btn)


func _build_save_slot_row(parent: Control, slot: int, save_data: Dictionary, overlay: Control):
	"""Build a single save slot row."""
	var row = HBoxContainer.new()
	row.add_theme_constant_override("separation", 10)
	parent.add_child(row)

	# Slot info
	var info = VBoxContainer.new()
	info.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	info.add_theme_constant_override("separation", 2)
	row.add_child(info)

	if save_data.is_empty():
		var empty_label = Label.new()
		empty_label.text = "Slot %d — Empty" % slot
		empty_label.add_theme_font_size_override("font_size", 14)
		empty_label.add_theme_color_override("font_color", Color(0.4, 0.4, 0.45))
		info.add_child(empty_label)
	else:
		var name_label = RichTextLabel.new()
		name_label.bbcode_enabled = true
		name_label.fit_content = true
		name_label.scroll_active = false
		name_label.mouse_filter = MOUSE_FILTER_IGNORE
		name_label.text = "[color=#DDDDDD]Slot %d[/color]  [color=#88CCAA]%s[/color]  [color=#888888]— %s[/color]" % [
			slot, save_data.get("campaign_title", "?"), save_data.get("commander", "?")]
		info.add_child(name_label)

		var detail_label = Label.new()
		var progress = "Mission %d/%d" % [
			save_data.get("current_mission", 0) + 1,
			save_data.get("total_missions", 0)]
		var timestamp = save_data.get("timestamp", "")
		if timestamp.length() > 16:
			timestamp = timestamp.substr(0, 16)
		detail_label.text = "%s  •  %s" % [progress, timestamp]
		detail_label.add_theme_font_size_override("font_size", 11)
		detail_label.add_theme_color_override("font_color", Color(0.5, 0.5, 0.55))
		info.add_child(detail_label)

	# Save button
	var save_btn = Button.new()
	save_btn.text = "SAVE" if save_data.is_empty() else "OVERWRITE"
	save_btn.custom_minimum_size = Vector2(100, 32)
	save_btn.focus_mode = Control.FOCUS_NONE
	save_btn.add_theme_font_size_override("font_size", 12)
	var btn_style = StyleBoxFlat.new()
	btn_style.bg_color = Color(0.15, 0.3, 0.2, 0.5)
	btn_style.corner_radius_top_left = 4
	btn_style.corner_radius_top_right = 4
	btn_style.corner_radius_bottom_left = 4
	btn_style.corner_radius_bottom_right = 4
	save_btn.add_theme_stylebox_override("normal", btn_style)
	var hover = btn_style.duplicate()
	hover.bg_color = Color(0.2, 0.4, 0.28, 0.6)
	save_btn.add_theme_stylebox_override("hover", hover)
	save_btn.add_theme_color_override("font_color", Color(0.4, 0.8, 0.5))
	save_btn.add_theme_color_override("font_hover_color", Color(0.6, 1.0, 0.7))

	var slot_num = slot
	save_btn.pressed.connect(func():
		_do_save_to_slot(slot_num, overlay)
	)
	row.add_child(save_btn)


func _do_save_to_slot(slot: int, overlay: Control):
	"""Actually save to the slot and show feedback."""
	var success = SaveManager.save_campaign(slot, _campaign_manager)
	overlay.queue_free()

	if success:
		_show_save_feedback("Campaign saved to Slot %d!" % slot, Color(0.4, 0.8, 0.5))
	else:
		_show_save_feedback("Failed to save!", Color(0.9, 0.3, 0.3))


func _show_save_feedback(text: String, color: Color):
	"""Show a brief floating feedback message that fades out."""
	var label = Label.new()
	label.text = text
	label.add_theme_font_size_override("font_size", 18)
	label.add_theme_color_override("font_color", color)
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.set_anchors_and_offsets_preset(PRESET_CENTER_TOP)
	label.position.y = 60
	add_child(label)

	var tween = create_tween()
	tween.tween_interval(1.5)
	tween.tween_property(label, "modulate:a", 0.0, 0.8)
	tween.tween_callback(label.queue_free)

# ══════════════════════════════════════════════════════════════
# NAVIGATION
# ══════════════════════════════════════════════════════════════

func _on_abandon():
	_show_confirm_dialog(
		"Abandon Campaign?",
		"All campaign progress will be lost. Are you sure?",
		func():
			BattleConfig.clear_campaign()
			get_tree().change_scene_to_file("res://scenes/campaign_select.tscn")
	)


func _show_confirm_dialog(title_text: String, body_text: String, on_confirm: Callable):
	"""Show a confirmation dialog overlay."""
	var overlay = ColorRect.new()
	overlay.name = "ConfirmOverlay"
	overlay.color = Color(0.0, 0.0, 0.0, 0.6)
	overlay.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	overlay.mouse_filter = MOUSE_FILTER_STOP
	add_child(overlay)

	var center = CenterContainer.new()
	center.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
	center.mouse_filter = MOUSE_FILTER_IGNORE
	overlay.add_child(center)

	var panel = PanelContainer.new()
	panel.custom_minimum_size = Vector2(400, 180)
	var pstyle = StyleBoxFlat.new()
	pstyle.bg_color = Color(0.08, 0.06, 0.12, 0.95)
	pstyle.corner_radius_top_left = 8
	pstyle.corner_radius_top_right = 8
	pstyle.corner_radius_bottom_left = 8
	pstyle.corner_radius_bottom_right = 8
	pstyle.border_width_top = 2
	pstyle.border_width_bottom = 2
	pstyle.border_width_left = 2
	pstyle.border_width_right = 2
	pstyle.border_color = Color(0.7, 0.3, 0.3, 0.6)
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
	title.text = title_text
	title.add_theme_font_size_override("font_size", 18)
	title.add_theme_color_override("font_color", Color(0.9, 0.4, 0.4))
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(title)

	var body = Label.new()
	body.text = body_text
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
	cancel_btn.custom_minimum_size = Vector2(120, 36)
	cancel_btn.focus_mode = Control.FOCUS_NONE
	cancel_btn.add_theme_font_size_override("font_size", 14)
	cancel_btn.pressed.connect(func(): overlay.queue_free())
	btn_row.add_child(cancel_btn)

	var confirm_btn = Button.new()
	confirm_btn.text = "Abandon"
	confirm_btn.custom_minimum_size = Vector2(120, 36)
	confirm_btn.focus_mode = Control.FOCUS_NONE
	confirm_btn.add_theme_font_size_override("font_size", 14)
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
	confirm_btn.pressed.connect(func():
		overlay.queue_free()
		on_confirm.call())
	btn_row.add_child(confirm_btn)
