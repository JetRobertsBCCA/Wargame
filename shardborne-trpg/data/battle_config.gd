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

# Campaign mode
var is_campaign := false
var campaign_battle_index: int = 0

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
	is_campaign = false
	scenario_type = "total_war"
	round_limit = 6
	campaign_battle_index = 0
