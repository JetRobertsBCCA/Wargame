extends Node
## CampaignManager — Manages story-driven campaigns for individual commanders.
## Handles campaign progression, mission flow, story sequences, and persistent army state.
##
## Flow: Campaign Select → Overview → Pre-Story → Battle → Post-Story → ... → Ending
##
## This is NOT an autoload — it is instantiated by campaign scenes as needed.
## Campaign state is stored here and passed to BattleConfig for each battle.

signal story_requested(dialogue: Array, callback: Callable)
signal mission_started(mission_index: int, mission: Dictionary)
signal mission_completed(mission_index: int, result: Dictionary)
signal campaign_completed(campaign_id: String)

# ══════════════════════════════════════════════════════════════
# CAMPAIGN STATE
# ══════════════════════════════════════════════════════════════

var campaign_id: String = ""
var campaign_data: Dictionary = {}
var campaign_active: bool = false
var current_mission: int = 0
var mission_results: Array = []  # Array of result dicts per completed mission

## Persistent army modifications (veterancy, casualties, etc.)
var veterancy: Dictionary = {}   # unit_name → {xp, level, bonuses}
var casualties: Array = []       # Unit names lost in previous missions

# ══════════════════════════════════════════════════════════════
# CAMPAIGN LIFECYCLE
# ══════════════════════════════════════════════════════════════

func start_campaign(id: String) -> bool:
	"""Load and start a campaign by its ID."""
	var data = CampaignData.get_campaign(id)
	if data.is_empty():
		push_error("CampaignManager: Failed to load campaign '%s'" % id)
		return false

	campaign_id = id
	campaign_data = data
	campaign_active = true
	current_mission = 0
	mission_results.clear()
	veterancy.clear()
	casualties.clear()

	print("[CampaignManager] Started campaign: %s (%s)" % [data.title, data.commander])
	return true

func get_campaign_title() -> String:
	return campaign_data.get("title", "Unknown Campaign")

func get_commander_name() -> String:
	return campaign_data.get("commander", "Unknown")

func get_faction_enum() -> int:
	return campaign_data.get("faction_enum", 0)

func get_total_missions() -> int:
	var missions = campaign_data.get("missions", [])
	return missions.size()

func get_current_mission_index() -> int:
	return current_mission

func is_campaign_complete() -> bool:
	return current_mission >= get_total_missions()

# ══════════════════════════════════════════════════════════════
# OPENING STORY
# ══════════════════════════════════════════════════════════════

func get_opening_story() -> Array:
	"""Returns the campaign opening dialogue sequence."""
	return campaign_data.get("opening_story", [])

# ══════════════════════════════════════════════════════════════
# MISSION ACCESS
# ══════════════════════════════════════════════════════════════

func get_current_mission() -> Dictionary:
	"""Returns the current mission definition."""
	var missions = campaign_data.get("missions", [])
	if current_mission < 0 or current_mission >= missions.size():
		return {}
	return missions[current_mission]

func get_mission(index: int) -> Dictionary:
	"""Returns a specific mission by index."""
	var missions = campaign_data.get("missions", [])
	if index < 0 or index >= missions.size():
		return {}
	return missions[index]

func get_pre_story() -> Array:
	"""Returns pre-battle dialogue for the current mission."""
	var mission = get_current_mission()
	return mission.get("pre_story", [])

func get_post_story() -> Array:
	"""Returns post-victory dialogue for the current mission."""
	var mission = get_current_mission()
	return mission.get("post_story", [])

func get_defeat_story() -> Array:
	"""Returns defeat dialogue for the current mission."""
	var mission = get_current_mission()
	return mission.get("defeat_story", [])

func get_tutorial_tips() -> Array:
	"""Returns tutorial tips for the current mission."""
	var mission = get_current_mission()
	return mission.get("tutorial_tips", [])

func get_ending_story() -> Array:
	"""Returns the campaign ending dialogue sequence."""
	return campaign_data.get("ending_story", [])

# ══════════════════════════════════════════════════════════════
# BATTLE SETUP — Configures BattleConfig for the current mission
# ══════════════════════════════════════════════════════════════

func setup_battle() -> bool:
	"""Configures BattleConfig with the current mission's army and settings."""
	var mission = get_current_mission()
	if mission.is_empty():
		push_error("CampaignManager: No mission to set up")
		return false

	var player_army: Array = mission.get("player_army", [])
	var enemy_army: Array = mission.get("enemy_army", [])
	var enemy_faction: int = mission.get("enemy_faction", 0)
	var faction_enum: int = get_faction_enum()

	# Configure BattleConfig
	BattleConfig.clear()
	BattleConfig.is_campaign = true
	BattleConfig.campaign_battle_index = current_mission
	BattleConfig.player_army = player_army.duplicate()
	BattleConfig.enemy_army = enemy_army.duplicate()
	BattleConfig.player_faction = faction_enum
	BattleConfig.enemy_faction = enemy_faction
	BattleConfig.has_custom_armies = true
	BattleConfig.scenario_type = mission.get("scenario", "total_war")
	BattleConfig.round_limit = mission.get("round_limit", 6)
	BattleConfig.battle_size = mission.get("battle_size", "standard")

	# Store tutorial tips in BattleConfig for the combat UI to display
	BattleConfig.tutorial_tips = mission.get("tutorial_tips", [])
	# Store battle modifiers for the combat system to apply
	BattleConfig.battle_modifiers = mission.get("battle_modifiers", {})
	# Store campaign manager reference
	BattleConfig.campaign_manager = self

	mission_started.emit(current_mission, mission)
	print("[CampaignManager] Battle configured: Mission %d — %s" % [current_mission + 1, mission.title])
	return true

# ══════════════════════════════════════════════════════════════
# BATTLE RESULT — Called when a battle ends
# ══════════════════════════════════════════════════════════════

func complete_mission(victory: bool, player_casualties_list: Array = []) -> Dictionary:
	"""Record mission result and advance. Returns result dict."""
	var mission = get_current_mission()
	var result = {
		"mission_index": current_mission,
		"mission_title": mission.get("title", "Unknown"),
		"victory": victory,
		"player_casualties": player_casualties_list,
	}

	if victory:
		# Snapshot veterancy levels before granting XP
		var pre_levels: Dictionary = {}
		for unit_name in veterancy:
			pre_levels[unit_name] = veterancy[unit_name].level

		# Grant veterancy XP to surviving units
		var army = mission.get("player_army", [])
		for unit_name in army:
			if unit_name in player_casualties_list:
				continue
			_grant_xp(unit_name, 5)

		# Build level-up report for display
		var level_ups: Array = []
		for unit_name in veterancy:
			var old_level = pre_levels.get(unit_name, 0)
			var new_level = veterancy[unit_name].level
			if new_level > old_level:
				var new_bonus = veterancy[unit_name].bonuses[-1]
				level_ups.append({"unit": unit_name, "level": new_level, "bonus": new_bonus})
		result["level_ups"] = level_ups
		result["xp_gained"] = 5

		mission_results.append(result)
		current_mission += 1
		mission_completed.emit(current_mission - 1, result)

		# Check if campaign is complete
		if is_campaign_complete():
			campaign_completed.emit(campaign_id)
	else:
		# On defeat, DON'T advance — let the player retry
		# Penalty: lose some XP from casualties as a consequence
		var xp_lost_units: Array = []
		for unit_name in player_casualties_list:
			if veterancy.has(unit_name) and veterancy[unit_name].xp > 0:
				var lost = mini(3, veterancy[unit_name].xp)
				veterancy[unit_name].xp -= lost
				xp_lost_units.append(unit_name)
				print("[CampaignManager] %s lost %d XP from defeat" % [unit_name, lost])
		result["xp_lost_units"] = xp_lost_units
		mission_results.append(result)

	return result

# ══════════════════════════════════════════════════════════════
# VETERANCY SYSTEM
# ══════════════════════════════════════════════════════════════

func _grant_xp(unit_name: String, amount: int) -> void:
	if not veterancy.has(unit_name):
		veterancy[unit_name] = {"xp": 0, "level": 0, "bonuses": []}

	var vet = veterancy[unit_name]
	vet.xp += amount

	# Check for level up
	while vet.xp >= _xp_for_level(vet.level + 1):
		vet.level += 1
		var bonus = _get_level_bonus(vet.level)
		vet.bonuses.append(bonus)
		AudioManager.play_sfx("level_up")
		print("[CampaignManager] %s leveled up to %d! Gained %s" % [unit_name, vet.level, bonus])

func _xp_for_level(level: int) -> int:
	return level * 15

func _get_level_bonus(level: int) -> String:
	var bonuses = ["+1 HP", "+1 ATK", "+1 DEF", "+1 MOV", "+1 MOR", "+1 HP"]
	return bonuses[(level - 1) % bonuses.size()]

## Apply veterancy bonuses to a combatant dict (called during battle setup)
func apply_veterancy_to_combatant(unit_name: String, combatant: Dictionary) -> void:
	if not veterancy.has(unit_name):
		return
	var vet = veterancy[unit_name]
	for bonus in vet.bonuses:
		match bonus:
			"+1 HP":
				combatant.max_hp = combatant.get("max_hp", 3) + 1
				combatant.hp = combatant.get("hp", 3) + 1
			"+1 ATK":
				combatant.atk = combatant.get("atk", 6) + 1
			"+1 DEF":
				combatant.defense = combatant.get("defense", 4) + 1
			"+1 MOV":
				combatant.mov = combatant.get("mov", 5) + 1
			"+1 MOR":
				combatant.mor = combatant.get("mor", 6) + 1

# ══════════════════════════════════════════════════════════════
# STATUS HELPERS
# ══════════════════════════════════════════════════════════════

func get_progress_text() -> String:
	return "Mission %d / %d" % [current_mission + 1, get_total_missions()]

func get_campaign_summary() -> Dictionary:
	var victories = 0
	var defeats = 0
	for r in mission_results:
		if r.victory:
			victories += 1
		else:
			defeats += 1
	return {
		"campaign_id": campaign_id,
		"campaign_title": get_campaign_title(),
		"commander": get_commander_name(),
		"missions_completed": current_mission,
		"total_missions": get_total_missions(),
		"victories": victories,
		"defeats": defeats,
		"veterancy": veterancy.duplicate(true),
	}
