extends Node
## BattleConfig — Global singleton that passes army selections from Army Builder to Combat.
## Added as autoload so data persists across scene changes.

var has_custom_armies := false

# Player side
var player_army: Array = []      # Array of unit name strings
var player_faction: int = -1

# Enemy side
var enemy_army: Array = []
var enemy_faction: int = -1

# Scenario
var scenario_type: String = "total_war"
var round_limit: int = 6
var battle_size: String = "standard"  # skirmish, standard, epic

# Campaign mode
var is_campaign := false
var campaign_battle_index: int = 0
var campaign_manager = null        # Reference to CampaignManager instance (persists across scenes)
var tutorial_tips: Array = []      # Tutorial tips for the current battle
var campaign_id: String = ""       # Active campaign ID for scene returns

# Battle modifiers — environmental effects applied during campaign battles
var battle_modifiers: Dictionary = {}  # e.g. {"enemy_def_bonus": 1, "label": "Dug In"}

# Difficulty setting: 0=Easy, 1=Normal, 2=Hard, 3=Brutal
var difficulty: int = 1

## Difficulty modifiers applied to enemy stats
const DIFFICULTY_SETTINGS := {
	0: {"label": "Easy",   "enemy_atk":  0, "enemy_def": -1, "enemy_hp_mult": 0.8, "player_cp_bonus": 1},
	1: {"label": "Normal", "enemy_atk":  0, "enemy_def":  0, "enemy_hp_mult": 1.0, "player_cp_bonus": 0},
	2: {"label": "Hard",   "enemy_atk":  1, "enemy_def":  1, "enemy_hp_mult": 1.2, "player_cp_bonus": 0},
	3: {"label": "Brutal", "enemy_atk":  2, "enemy_def":  1, "enemy_hp_mult": 1.5, "player_cp_bonus": 0},
}

func get_difficulty_label() -> String:
	return DIFFICULTY_SETTINGS.get(difficulty, {}).get("label", "Normal")

func get_difficulty_settings() -> Dictionary:
	return DIFFICULTY_SETTINGS.get(difficulty, DIFFICULTY_SETTINGS[1])

# Save/Load flag — set when loading a saved campaign (skip battle-return flow)
var is_loaded_save := false

func set_armies(p_army: Array, e_army: Array, p_faction: int, e_faction: int):
	player_army = p_army.duplicate()
	enemy_army = e_army.duplicate()
	player_faction = p_faction
	enemy_faction = e_faction
	has_custom_armies = true

func clear():
	has_custom_armies = false
	player_army.clear()
	enemy_army.clear()
	player_faction = -1
	enemy_faction = -1
	scenario_type = "total_war"
	round_limit = 6
	battle_size = "standard"
	campaign_battle_index = 0
	battle_modifiers = {}
	# NOTE: is_campaign, campaign_manager, campaign_id, and tutorial_tips
	# are NOT cleared here — they persist across battle scenes so the
	# results screen can detect campaign mode and return to campaign flow

func clear_campaign():
	"""Full reset including campaign state."""
	clear()
	campaign_manager = null
	campaign_id = ""
	is_loaded_save = false
