# Shardborne Audio Assets

Place `.mp3` files in the folders below. The `AudioManager` autoload discovers them by filename.

## Music (`music/`)

### Faction Themes (`music/faction/`)
One theme per faction, named by faction ID:
- `emberclaw.mp3`
- `iron_dominion.mp3`
- `nightfang.mp3`
- `thornweft.mp3`
- `veilbound.mp3`

### UI Music (`music/ui/`)
- `menu.mp3` — Main menu
- `win.mp3` — Victory screen
- `defeat.mp3` — Defeat screen
- `campaign.mp3` — Campaign hub (optional, falls back to faction theme)
- `story.mp3` — Story/dialogue sequences (optional)

## Sound Effects (`sfx/`)

### Combat (`sfx/combat/`)
- `attack_hit.mp3` — Melee/ranged hit connects
- `attack_miss.mp3` — Attack whiffs
- `critical_hit.mp3` — Roll of 6 (crit)
- `unit_death.mp3` — Unit killed
- `morale_break.mp3` — Unit becomes shaken
- `heal.mp3` — HP restored

### UI (`sfx/ui/`)
- `button_click.mp3` — Menu/button press
- `card_play.mp3` — Card played from hand
- `card_draw.mp3` — Cards drawn
- `turn_start.mp3` — Your unit's turn begins
- `round_start.mp3` — New round begins
- `deploy.mp3` — Unit placed during deployment
- `pause.mp3` — Pause menu opens

### Events (`sfx/events/`)
- `level_up.mp3` — Unit gains a veterancy level
- `event_appear.mp3` — Inter-mission event pops up
- `campaign_complete.mp3` — Campaign finished fanfare
- `objective_scored.mp3` — VP scored

## Notes
- MP3 format recommended (Godot 4 imports as `AudioStreamMP3`)
- Keep files ≤ 2 MB each for music, ≤ 200 KB for SFX
- AudioManager auto-discovers files on startup — just drop them in
