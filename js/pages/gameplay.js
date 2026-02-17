// ==========================================
// Shardborne Universe Wiki - Gameplay / Rules Page
// ==========================================

function loadRulesPage() {
  showRulesSection("all", null);
}

function showRulesSection(section, btn) {
  if (btn) {
    document
      .querySelectorAll("#rules-nav .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }
  const el = document.getElementById("rules-content");
  if (!el) return;
  const r = gameData.rules;
  if (!r) {
    el.innerHTML = '<div class="card"><p>No rules data found.</p></div>';
    return;
  }

  let html = "";
  const showAll = section === "all";

  // STAT REFERENCE
  if (showAll || section === "stats") {
    html += `<div class="card">
            <h3>📊 Unit Stat Reference</h3>
            <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #e94560;">
                    <th style="text-align:left; padding: 8px; color: #e94560;">Stat</th>
                    <th style="text-align:left; padding: 8px; color: #e94560;">Meaning</th>
                    <th style="text-align:left; padding: 8px; color: #e94560;">How It Works</th>
                </tr>
                ${Object.entries(r.stat_definitions)
                  .map(
                    ([key, val]) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 8px; font-weight: bold; color: #e94560;">${key.toUpperCase()}</td>
                    <td style="padding: 8px;">${val.name || key}</td>
                    <td style="padding: 8px; color: #ccc;">${val.description}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
        </div>`;
  }

  // ARMY BUILDING
  if (showAll || section === "army") {
    const ab = r.army_building;
    html += `<div class="card">
            <h3>🏗️ Army Building</h3>
            ${ab.unit_definition ? `<div style="background: rgba(233,69,96,0.08); border: 1px solid rgba(233,69,96,0.2); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                <h4 style="margin: 0 0 0.5rem 0; color: #e94560;">📐 Unit Model</h4>
                <p style="margin: 0; color: #ccc;">${ab.unit_definition}</p>
            </div>` : ""}
            <h4>Battle Sizes</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
                ${Object.entries(ab.battle_sizes)
                  .map(
                    ([key, val]) => `
                <div style="background: rgba(233,69,96,0.08); border: 1px solid rgba(233,69,96,0.2); border-radius: 8px; padding: 1rem; text-align: center;">
                    <div style="font-size: 0.8rem; color: #aaa; text-transform: uppercase;">${key}</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #e94560;">${val.points} pts</div>
                    <div style="font-size: 0.85rem; color: #ccc;">${val.min_units}–${val.max_units} units</div>
                    <div style="font-size: 0.85rem; color: #ccc;">Max ${val.max_war_machines} War Machines</div>
                </div>`,
                  )
                  .join("")}
            </div>
            <h4>Composition Rules</h4>
            <ul>${ab.composition_rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
            <h4>Deck Building</h4>
            <ul>
                <li><strong>Pool Size:</strong> ~${ab.deck_rules.pool_size} cards available per commander</li>
                <li><strong>Deck Size:</strong> ${ab.deck_rules.deck_size} cards chosen for battle</li>
                <li><strong>Draw:</strong> ${ab.deck_rules.draw_per_turn} cards per turn</li>
                <li><strong>Max Hand:</strong> ${ab.deck_rules.max_hand_size} cards</li>
                <li>${ab.deck_rules.discard_rule}</li>
            </ul>
        </div>`;
  }

  // TURN STRUCTURE
  if (showAll || section === "turn") {
    html += `<div class="card">
            <h3>🔄 Turn Structure</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
                ${r.turn_structure.phases
                  .map(
                    (phase, i) => `
                <div style="background: rgba(233,69,96,0.05); border-left: 4px solid #e94560; padding: 1rem; border-radius: 0 8px 8px 0;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #e94560;">Phase ${i + 1}: ${phase.name}</h4>
                    <p style="margin: 0 0 0.5rem 0; color: #ccc;">${phase.description}</p>
                    <ul style="margin: 0;">${phase.actions.map((a) => `<li>${a}</li>`).join("")}</ul>
                </div>`,
                  )
                  .join("")}
            </div>
        </div>`;
  }

  // COMBAT RESOLUTION
  if (showAll || section === "combat") {
    const cr = r.combat_resolution;
    html += `<div class="card">
            <h3>⚔️ Combat Resolution</h3>
            <ol style="padding-left: 1.5rem;">
                ${cr.steps
                  .map(
                    (step) => `
                <li style="margin-bottom: 1rem;">
                    <strong style="color: #e94560;">${step.name}:</strong> ${step.description}
                </li>`,
                  )
                  .join("")}
            </ol>
            <h4>Combat Modifiers</h4>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #e94560;">
                    <th style="text-align:left; padding: 6px; color: #e94560;">Modifier</th>
                    <th style="text-align:left; padding: 6px; color: #e94560;">Effect</th>
                </tr>
                ${cr.modifiers
                  .map(
                    (m) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 6px; font-weight: bold;">${m.name}</td>
                    <td style="padding: 6px; color: #ccc;">${m.effect}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
        </div>`;
  }

  // CARDS & DECKS
  if (showAll || section === "cards") {
    const cards = r.card_rules;
    html += `<div class="card">
            <h3>🃏 Commander Cards & Deck Building</h3>
            <p><strong>Only commanders can play cards.</strong> Cards are the commander's strategic influence over the battlefield — representing orders, inventions, rituals, and tactical genius.</p>
            <h4>Card Types</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                ${cards.card_types
                  .map(
                    (ct) => `
                <div style="background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.2); border-radius: 8px; padding: 1rem;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #a78bfa;">${ct.type}</h4>
                    <p style="margin: 0; color: #ccc; font-size: 0.9rem;">${ct.description}</p>
                </div>`,
                  )
                  .join("")}
            </div>
            <h4>Timing Rules</h4>
            <ul>${cards.timing.map((t) => `<li>${t}</li>`).join("")}</ul>
            <h4>Command Points (CP)</h4>
            <p>Each turn, your commander generates CP equal to their <strong>Command</strong> stat. Spend CP to play cards. Unspent CP does NOT carry over.</p>
        </div>`;
  }

  // FACTION MECHANICS
  if (showAll || section === "factionmech") {
    const fm = r.faction_mechanics;
    // Iron Dominion
    html += `<div class="card">
            <h3>⚙️ Iron Dominion — Grid Cohesion & Fragments</h3>
            <p>${fm.iron_dominion.grid_cohesion.description}</p>
            <h4>Grid Tiers</h4>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #e94560;">
                    <th style="text-align:left; padding: 6px; color: #e94560;">Tier</th>
                    <th style="text-align:left; padding: 6px; color: #e94560;">Units Needed</th>
                    <th style="text-align:left; padding: 6px; color: #e94560;">Bonus</th>
                </tr>
                ${fm.iron_dominion.grid_cohesion.tiers
                  .map(
                    (t) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 6px; font-weight: bold;">${t.name}</td>
                    <td style="padding: 6px;">${t.units_within_3_inches}+ within 3"</td>
                    <td style="padding: 6px; color: #ccc;">${t.bonus}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
            <h4>Fragment Charges</h4>
            <p>${fm.iron_dominion.fragment_charges.description}</p>
            <ul>${fm.iron_dominion.fragment_charges.instability.map((i) => `<li>${i}</li>`).join("")}</ul>
        </div>`;

    // Veilbound Shogunate
    html += `<div class="card">
            <h3>🌙 Veilbound Shogunate — Ritual Flow & Stance System</h3>
            <p>${fm.veilbound_shogunate.ritual_flow.description}</p>
            <h4>Flow Thresholds</h4>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #a78bfa;">
                    <th style="text-align:left; padding: 6px; color: #a78bfa;">Threshold</th>
                    <th style="text-align:left; padding: 6px; color: #a78bfa;">Flow Required</th>
                    <th style="text-align:left; padding: 6px; color: #a78bfa;">Effect</th>
                </tr>
                ${fm.veilbound_shogunate.ritual_flow.thresholds
                  .map(
                    (t) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 6px; font-weight: bold;">${t.name}</td>
                    <td style="padding: 6px;">${t.flow_required}+</td>
                    <td style="padding: 6px; color: #ccc;">${t.effect}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
            <h4>Stance System</h4>
            <p>${fm.veilbound_shogunate.stance_system.description}</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                ${fm.veilbound_shogunate.stance_system.stances
                  .map(
                    (s) => `
                <div style="background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.2); border-radius: 8px; padding: 1rem;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #a78bfa;">${s.name}</h4>
                    <p style="margin: 0; color: #ccc; font-size: 0.9rem;">${s.effect}</p>
                </div>`,
                  )
                  .join("")}
            </div>
        </div>`;

    // Nightfang Dominion
    html += `<div class="card">
            <h3>🩸 Nightfang Dominion — Corruption, Blood Tithe & Hunger Pool</h3>
            <p>${fm.nightfang_dominion.corruption_system.description}</p>
            <h4>Corruption Thresholds</h4>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #dc2626;">
                    <th style="text-align:left; padding: 6px; color: #dc2626;">Stage</th>
                    <th style="text-align:left; padding: 6px; color: #dc2626;">Tokens</th>
                    <th style="text-align:left; padding: 6px; color: #dc2626;">Effect</th>
                </tr>
                ${fm.nightfang_dominion.corruption_system.thresholds
                  .map(
                    (t) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 6px; font-weight: bold;">${t.name}</td>
                    <td style="padding: 6px;">${t.tokens}+</td>
                    <td style="padding: 6px; color: #ccc;">${t.effect}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
            <h4>Corruption Spread Rules</h4>
            <ul>${fm.nightfang_dominion.corruption_system.spread_rules.map((r) => `<li>${r}</li>`).join("")}</ul>

            <h4>Blood Tithe</h4>
            <p>${fm.nightfang_dominion.blood_tithe.description}</p>
            <ul>${fm.nightfang_dominion.blood_tithe.rules.map((r) => `<li>${r}</li>`).join("")}</ul>

            <h4>Hunger Pool</h4>
            <p>${fm.nightfang_dominion.hunger_pool.description}</p>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #dc2626;">
                    <th style="text-align:left; padding: 6px; color: #dc2626;">Stage</th>
                    <th style="text-align:left; padding: 6px; color: #dc2626;">Kills Needed</th>
                    <th style="text-align:left; padding: 6px; color: #dc2626;">Effect</th>
                </tr>
                ${fm.nightfang_dominion.hunger_pool.thresholds
                  .map(
                    (t) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 6px; font-weight: bold;">${t.name}</td>
                    <td style="padding: 6px;">${t.kills}+</td>
                    <td style="padding: 6px; color: #ccc;">${t.effect}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
            <ul>${fm.nightfang_dominion.hunger_pool.pool_rules.map((r) => `<li>${r}</li>`).join("")}</ul>

            <h4>🌙 Nocturnal Predators</h4>
            <p>${fm.nightfang_dominion.nocturnal_predators.description}</p>
            <p style="font-style: italic; opacity: 0.85;">${fm.nightfang_dominion.nocturnal_predators.rule}</p>
        </div>`;
  }

  // VICTORY CONDITIONS
  if (showAll || section === "victory") {
    html += `<div class="card">
            <h3>🏆 Victory Conditions</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                ${r.victory_conditions.modes
                  .map(
                    (m) => `
                <div style="background: rgba(233,69,96,0.05); border: 1px solid rgba(233,69,96,0.15); border-radius: 8px; padding: 1rem;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #e94560;">${m.name}</h4>
                    <p style="margin: 0; color: #ccc; font-size: 0.9rem;">${m.description}</p>
                </div>`,
                  )
                  .join("")}
            </div>
            ${r.victory_conditions.tiebreaker ? `<p style="margin-top: 0.5rem; color: #aaa;"><strong>Tiebreaker:</strong> ${r.victory_conditions.tiebreaker}</p>` : ""}
        </div>`;

    html += `<div class="card">
            <h3>🏔️ Terrain Types</h3>
            ${r.terrain_rules.overview ? `<p style="color: #ccc; margin-bottom: 1rem;">${r.terrain_rules.overview}</p>` : ""}
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0;">
                ${r.terrain_rules.types
                  .map(
                    (t) => `
                <div style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <strong style="color: #e94560;">${t.name}:</strong> <span style="color: #ccc;">${t.effect}</span>
                </div>`,
                  )
                  .join("")}
            </div>
        </div>`;
  }

  // PRE-GAME SEQUENCE
  if (showAll || section === "pregame") {
    const pg = r.pre_game;
    if (pg) {
      html += `<div class="card">
            <h3>🎯 Pre-Game Sequence</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${pg.overview}</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0;">
                ${pg.steps
                  .map(
                    (s) => `
                <div style="background: rgba(233,69,96,0.05); border-left: 4px solid #e94560; padding: 1rem; border-radius: 0 8px 8px 0;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #e94560;">Step ${s.step}: ${s.name}</h4>
                    <p style="margin: 0; color: #ccc;">${s.description}</p>
                </div>`,
                  )
                  .join("")}
            </div>
        </div>`;
    }
  }

  // MOVEMENT
  if (showAll || section === "movement") {
    const mv = r.movement;
    if (mv) {
      html += `<div class="card">
            <h3>🏃 Movement</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${mv.overview}</p>
            <h4>Core Rules</h4>
            <ul>${mv.core_rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
            <h4>Difficult Terrain</h4>
            <div style="background: rgba(233,69,96,0.05); border-left: 4px solid #ff9800; padding: 1rem; border-radius: 0 8px 8px 0; margin: 1rem 0;">
                <p style="margin: 0 0 0.5rem 0;">${mv.difficult_terrain.description}</p>
                <p style="margin: 0 0 0.5rem 0; color: #aaa;"><em>Examples: ${mv.difficult_terrain.examples}</em></p>
                <p style="margin: 0; color: #ccc;">${mv.difficult_terrain.rule}</p>
            </div>
            <h4>Charging</h4>
            <p style="color: #ccc; margin-bottom: 0.5rem;">${mv.charging.description}</p>
            <ul>${mv.charging.rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
            <h4>Special Movement</h4>
            <ul>${mv.special_movement.map((rule) => `<li style="margin-bottom: 0.5rem;">${rule}</li>`).join("")}</ul>
            <div style="background: rgba(233,69,96,0.05); border-left: 4px solid #e94560; padding: 1rem; border-radius: 0 8px 8px 0; margin: 1rem 0;">
                <h4 style="margin: 0 0 0.5rem 0; color: #e94560;">⚙️ War Machine Movement</h4>
                <p style="margin: 0; color: #ccc;">${mv.war_machine_movement}</p>
            </div>
        </div>`;
    }
  }

  // LINE OF SIGHT & POSITIONING
  if (showAll || section === "positioning") {
    const los = r.line_of_sight;
    const facing = r.facing;
    if (los) {
      html += `<div class="card">
            <h3>👁️ Line of Sight</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${los.overview}</p>
            <h4>Core Rules</h4>
            <ul>${los.rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
            <h4>Exceptions</h4>
            <ul>${los.exceptions.map((e) => `<li>${e}</li>`).join("")}</ul>
        </div>`;
    }
    if (facing) {
      html += `<div class="card">
            <h3>🧭 Facing & Flanking</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${facing.overview}</p>
            <ul>${facing.rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
        </div>`;
    }
  }

  // ENGAGEMENT & CHALLENGES
  if (showAll || section === "engagement") {
    const eng = r.engagement;
    const ch = r.challenges;
    if (eng) {
      html += `<div class="card">
            <h3>⚔️ Engagement & Melee</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${eng.overview}</p>
            <ul>${eng.rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
        </div>`;
    }
    if (ch) {
      html += `<div class="card">
            <h3>🤺 Challenges (Duels)</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${ch.overview}</p>
            <ol>${ch.rules.map((rule) => `<li style="margin-bottom: 0.5rem;">${rule}</li>`).join("")}</ol>
        </div>`;
    }
  }

  // MORALE
  if (showAll || section === "morale") {
    const mor = r.morale;
    if (mor) {
      html += `<div class="card">
            <h3>💀 Morale</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${mor.overview}</p>
            <ul>${mor.rules.map((rule) => `<li style="margin-bottom: 0.5rem;">${rule}</li>`).join("")}</ul>
        </div>`;
    }
  }

  // KEYWORDS GLOSSARY
  if (showAll || section === "keywords") {
    const kw = r.keywords;
    if (kw) {
      html += `<div class="card">
            <h3>🔑 Keywords Glossary</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${kw.overview}</p>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr style="border-bottom: 2px solid #e94560;">
                    <th style="text-align:left; padding: 6px; color: #e94560; width: 160px;">Keyword</th>
                    <th style="text-align:left; padding: 6px; color: #e94560;">Description</th>
                </tr>
                ${kw.entries
                  .map(
                    (k) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 6px; font-weight: bold; color: #a78bfa;">${k.name}</td>
                    <td style="padding: 6px; color: #ccc;">${k.description}</td>
                </tr>`,
                  )
                  .join("")}
            </table>
        </div>`;
    }
  }

  // SCENARIOS & MISSIONS
  if (showAll || section === "scenarios") {
    const sc = r.scenarios;
    if (sc) {
      html += `<div class="card">
            <h3>🗺️ Scenarios & Missions</h3>
            <p style="color: #ccc; margin-bottom: 1rem;">${sc.overview}</p>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
                ${sc.missions
                  .map(
                    (m) => `
                <div style="background: rgba(233,69,96,0.05); border: 1px solid rgba(233,69,96,0.15); border-radius: 8px; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h4 style="margin: 0; color: #e94560;">${m.name}</h4>
                        <div>
                            <span style="background: rgba(167,139,250,0.15); color: #a78bfa; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 0.5rem;">${m.type}</span>
                            <span style="background: rgba(233,69,96,0.15); color: #e94560; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${m.recommended_size}</span>
                        </div>
                    </div>
                    <p style="margin: 0 0 0.5rem 0; color: #ccc;">${m.description}</p>
                    <p style="margin: 0; color: #aaa; font-size: 0.85rem;"><strong>Special Rules:</strong> ${m.special_rules}</p>
                </div>`,
                  )
                  .join("")}
            </div>
        </div>`;
    }
  }

  el.innerHTML = html;
}
