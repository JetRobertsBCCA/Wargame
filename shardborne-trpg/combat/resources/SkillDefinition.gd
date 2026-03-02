extends Resource
class_name SkillDefinition

## Shardborne skill/action definition — used for combat actions, abilities, and specials.

enum SkillType { MELEE, RANGED, BREATH_WEAPON, MAGIC, SUPPORT, SPECIAL }
enum TargetType { ENEMY, ALLY, SELF, AREA, CONE }

@export var skill_name: String = ""
@export var skill_type: SkillType = SkillType.MELEE
@export var target_type: TargetType = TargetType.ENEMY
@export var description: String = ""

@export_group("Range")
@export var min_range: int = 1
@export var max_range: int = 1

@export_group("Combat Modifiers")
@export var atk_modifier: int = 0      ## Bonus/penalty to ATK dice when using this skill
@export var def_modifier: int = 0      ## Modifier to target DEF (negative = easier to hit)
@export var damage_modifier: int = 0   ## Bonus damage per hit
@export var ignore_cover: bool = false  ## Breath weapons, phase arrows, etc.
@export var ignore_armor: int = 0      ## Ignore X points of DEF

@export_group("Area Effect")
@export var is_aoe: bool = false
@export var aoe_radius: int = 0        ## Blast radius in tiles
@export var cone_length: int = 0       ## Cone length for breath weapons
@export var cone_width_start: int = 0  ## Cone width at origin
@export var cone_width_end: int = 0    ## Cone width at max range

@export_group("Costs & Cooldown")
@export var cp_cost: int = 0           ## Command Points to activate
@export var heat_cost: int = 0         ## Heat cost (Emberclaw)
@export var flow_cost: int = 0         ## Flow cost (Veilbound)
@export var fate_cost: int = 0         ## Fate-Thread cost (Thornweft)
@export var charge_cost: int = 0       ## Fragment Charge cost (Iron Dominion)
@export var hp_cost: int = 0           ## HP sacrifice (Blood Tithe etc.)
@export var cooldown: int = 0          ## Turns between uses (0 = every turn)
@export var uses_per_game: int = -1    ## -1 = unlimited, else limited uses

@export_group("Special Effects")
@export var creates_burning_terrain: bool = false
@export var creates_web_terrain: bool = false
@export var corruption_tokens: int = 0  ## Corruption tokens applied on hit
@export var generates_heat: int = 0     ## Heat generated on use
@export var generates_flow: int = 0     ## Flow generated on use
@export var heals: int = 0              ## HP healed (support skills)
@export var status_effect: String = ""  ## Status applied: "shaken", "engaged", etc.

@export_group("Visual")
@export var icon: Texture2D

## Display name (backwards compatible with old .name usage)
var name: String:
	get: return skill_name
	set(value): skill_name = value
