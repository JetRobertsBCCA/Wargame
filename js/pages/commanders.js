// ==========================================
// Shardborne Universe Wiki - Commanders Page
// ==========================================

const FACTION_IMAGE_FOLDERS = {
  'emberclaw-warpack': 'Emberclaw',
  'iron-dominion': 'IronDominion',
  'nightfang-dominion': 'NightFang',
  'veilbound-shogunate': 'veilboundShogunate',
  'thornweft-matriarchy': 'Thornweft'
};

function getCommanderImagePath(commander) {
  const folder = FACTION_IMAGE_FOLDERS[commander.faction];
  if (!folder) return null;
  const name = commander.name;
  return `data/factions/Images/${folder}/${name}.webp`;
}

function loadCommanders() {
  const contentEl = document.getElementById("commander-list");
  if (!contentEl) return;

  gameData.commanders.forEach((commander) => {
    const faction = getFactionById(commander.faction);
    const card = document.createElement("div");
    card.className = "card";

    // Generate tags
    const tags = commander.tags
      ? commander.tags
          .map((t) => `<span class="tag tag-${t.split("-")[0]}">${t}</span>`)
          .join(" ")
      : "";

    const imgPath = getCommanderImagePath(commander);
    const imgHTML = imgPath
      ? `<img class="commander-thumb" src="${imgPath}" alt="${commander.name}" onerror="this.style.display='none'">`
      : '';

    card.innerHTML = `
            <div class="commander-card-layout">
            ${imgHTML}
            <div class="commander-card-info">
            <h3><a href="#commander/${encodeURIComponent(commander.name)}">${commander.name}</a> ${commander.title ? "- " + commander.title : ""}</h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : "Unknown"} ${commander.points_cost ? `&nbsp;|&nbsp; <strong style="color: #e94560;">${commander.points_cost} pts</strong>` : ""}</p>
            <p><strong>Theme:</strong> ${commander.theme}</p>
            <p><strong>Playstyle:</strong> ${commander.playstyle}</p>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">Command</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">Knowledge</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">Leadership</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Agility}</span><span class="stat-label">Agility</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Health}</span><span class="stat-label">Health</span></div>
            </div>
            ${commander.battle_stats ? `
            <div style="margin-top: 0.75rem;">
                <div style="font-size: 0.75rem; color: #888; margin-bottom: 0.25rem;">⚔️ Battlefield Stats</div>
                <div class="stats-grid">
                    <div class="stat-item"><span class="stat-value">${commander.battle_stats.ATK}</span><span class="stat-label">ATK</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.battle_stats.DEF}</span><span class="stat-label">DEF</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.battle_stats.HP}</span><span class="stat-label">HP</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.battle_stats.MOV}\"</span><span class="stat-label">MOV</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.battle_stats.RNG}\"</span><span class="stat-label">RNG</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.battle_stats.MOR}</span><span class="stat-label">MOR</span></div>
                </div>
            </div>` : ""}
            ${tags ? `<div style="margin-top: 1rem;">${tags}</div>` : ""}
            </div>
            </div>
        `;
    contentEl.appendChild(card);
  });
}

function showCommander(name) {
  const commander = gameData.commanders.find((c) => c.name === name);
  if (!commander) return;

  const faction = getFactionById(commander.faction);
  const contentEl = document.getElementById("content");

  // Generate skill tree HTML
  let skillTreeHTML = "";
  let hasDetailedTree = false;
  if (commander.skill_tree && typeof commander.skill_tree === "object") {
    // Branching format (levels array with option_a / option_b per level)
    if (
      commander.skill_tree.format === "branching" &&
      commander.skill_tree.levels
    ) {
      hasDetailedTree = true;
      const lvlColors = [
        "#4caf50",
        "#4caf50",
        "#4caf50",
        "#ff9800",
        "#ff9800",
        "#ff9800",
        "#e91e63",
        "#e91e63",
        "#e91e63",
      ];
      commander.skill_tree.levels.forEach((lvl, idx) => {
        const c = lvlColors[idx] || "#e91e63";
        const typeBadge = (t) =>
          t === "Passive"
            ? "rgba(76,175,80,0.15); color: #4caf50"
            : "rgba(33,150,243,0.15); color: #2196f3";
        skillTreeHTML += `
                    <div style="margin-bottom: 1rem;">
                        <div style="font-weight: bold; color: ${c}; margin-bottom: 0.4rem; font-size: 0.95em;">Level ${lvl.level}</div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                            <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${c}; padding: 0.5rem 0.7rem; border-radius: 4px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <strong style="color: #e8e8e8;">A: ${lvl.option_a.name}</strong>
                                    <span style="font-size: 0.75em; padding: 0.1rem 0.4rem; border-radius: 3px; background: ${typeBadge(lvl.option_a.type)};">${lvl.option_a.type}</span>
                                </div>
                                <p style="margin: 0.25rem 0 0.15rem 0; font-size: 0.9em; opacity: 0.9;">${lvl.option_a.description}</p>
                                <p style="margin: 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${lvl.option_a.effect}</p>
                            </div>
                            <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${c}; padding: 0.5rem 0.7rem; border-radius: 4px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <strong style="color: #e8e8e8;">B: ${lvl.option_b.name}</strong>
                                    <span style="font-size: 0.75em; padding: 0.1rem 0.4rem; border-radius: 3px; background: ${typeBadge(lvl.option_b.type)};">${lvl.option_b.type}</span>
                                </div>
                                <p style="margin: 0.25rem 0 0.15rem 0; font-size: 0.9em; opacity: 0.9;">${lvl.option_b.description}</p>
                                <p style="margin: 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${lvl.option_b.effect}</p>
                            </div>
                        </div>
                    </div>
                `;
      });
      // Evolution tier
      if (commander.skill_tree.evolution) {
        const evo = commander.skill_tree.evolution;
        skillTreeHTML += `
                    <div style="margin-top: 1.5rem;">
                        <h4 style="color: #b07acc; border-bottom: 2px solid #b07acc; padding-bottom: 0.3rem;">&#9812; ${evo.label}</h4>
                        <div class="evolution-grid">
                            ${
                              evo.knowledge
                                ? `
                            <div class="evolution-card evolution-knowledge">
                                <h5>&#128309; Knowledge — ${evo.knowledge.name}</h5>
                                ${evo.knowledge.abilities
                                  .map(
                                    (a) => `
                                    <div style="margin-bottom: 0.5rem; padding: 0.4rem 0.6rem; background: rgba(33,150,243,0.06); border-radius: 4px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <strong>${a.name}</strong>
                                            <span style="font-size: 0.75em; padding: 0.1rem 0.4rem; border-radius: 3px; background: ${a.type === "Passive" ? "rgba(76,175,80,0.15); color: #4caf50" : "rgba(33,150,243,0.15); color: #2196f3"};">${a.type}</span>
                                        </div>
                                        <p style="margin: 0.2rem 0; font-size: 0.9em;">${a.description}</p>
                                        <p style="margin: 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${a.effect}</p>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>`
                                : ""
                            }
                            ${
                              evo.chaos
                                ? `
                            <div class="evolution-card evolution-chaos">
                                <h5>&#128308; Chaos — ${evo.chaos.name}</h5>
                                ${evo.chaos.abilities
                                  .map(
                                    (a) => `
                                    <div style="margin-bottom: 0.5rem; padding: 0.4rem 0.6rem; background: rgba(244,67,54,0.06); border-radius: 4px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <strong>${a.name}</strong>
                                            <span style="font-size: 0.75em; padding: 0.1rem 0.4rem; border-radius: 3px; background: ${a.type === "Passive" ? "rgba(76,175,80,0.15); color: #4caf50" : "rgba(33,150,243,0.15); color: #2196f3"};">${a.type}</span>
                                        </div>
                                        <p style="margin: 0.2rem 0; font-size: 0.9em;">${a.description}</p>
                                        <p style="margin: 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${a.effect}</p>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>`
                                : ""
                            }
                        </div>
                    </div>
                `;
      }
    } else {
      // Old format (level_2 through level_10 keys) — parse effects from parenthetical names
      for (let level = 2; level <= 10; level++) {
        const levelKey = `level_${level}`;
        if (commander.skill_tree[levelKey]) {
          const skills = commander.skill_tree[levelKey];
          const tierColor = level <= 4 ? '#4caf50' : level <= 7 ? '#ff9800' : '#e91e63';
          const renderCell = (text, pathColor) => {
            if (!text || text === '-') return `<div class="skill-option" style="color: #555;">-</div>`;
            const match = text.match(/^([^(]+?)(?:\s*\(([^)]+)\))?$/);
            const name = match ? match[1].trim() : text;
            const effect = match && match[2] ? match[2].trim() : '';
            return `<div class="skill-option" style="border-left: 2px solid ${pathColor}; padding: 0.4rem 0.6rem;" title="${effect || name}">
              <div style="color: #e8e8e8; font-size: 0.88em;">${name}</div>
              ${effect ? `<div style="color: #aaa; font-size: 0.75em; margin-top: 2px;">↳ ${effect}</div>` : ''}
            </div>`;
          };
          skillTreeHTML += `
                        <div class="skill-level">
                            <div class="skill-level-num" style="color: ${tierColor};">${level}</div>
                            ${renderCell(skills.knowledge, '#2196f3')}
                            ${renderCell(skills.chaos, '#f44336')}
                            ${renderCell(skills.tactical, '#4caf50')}
                        </div>
                    `;
        }
      }
    }
  }

  // Generate evolution paths HTML
  let evolutionHTML = "";
  if (commander.evolution_paths) {
    evolutionHTML = `
            <div class="evolution-grid">
                ${
                  commander.evolution_paths.knowledge
                    ? `
                <div class="evolution-card evolution-knowledge">
                    <h5>🔵 ${commander.evolution_paths.knowledge.name}</h5>
                    <p>${commander.evolution_paths.knowledge.description}</p>
                    <p><strong>Abilities:</strong> ${commander.evolution_paths.knowledge.abilities.join(", ")}</p>
                    <p><strong>Fragment Interaction:</strong> ${commander.evolution_paths.knowledge.fragment_interaction}</p>
                    <p><strong>Unit Synergy:</strong> ${commander.evolution_paths.knowledge.unit_synergy}</p>
                </div>`
                    : ""
                }
                ${
                  commander.evolution_paths.chaos
                    ? `
                <div class="evolution-card evolution-chaos">
                    <h5>🔴 ${commander.evolution_paths.chaos.name}</h5>
                    <p>${commander.evolution_paths.chaos.description}</p>
                    <p><strong>Abilities:</strong> ${commander.evolution_paths.chaos.abilities.join(", ")}</p>
                    <p><strong>Fragment Interaction:</strong> ${commander.evolution_paths.chaos.fragment_interaction}</p>
                    <p><strong>Unit Synergy:</strong> ${commander.evolution_paths.chaos.unit_synergy}</p>
                </div>`
                    : ""
                }
                ${
                  commander.evolution_paths.hybrid
                    ? `
                <div class="evolution-card evolution-hybrid">
                    <h5>🟣 ${commander.evolution_paths.hybrid.name}</h5>
                    <p>${commander.evolution_paths.hybrid.description}</p>
                    <p><strong>Abilities:</strong> ${commander.evolution_paths.hybrid.abilities.join(", ")}</p>
                    <p><strong>Fragment Interaction:</strong> ${commander.evolution_paths.hybrid.fragment_interaction}</p>
                    <p><strong>Unit Synergy:</strong> ${commander.evolution_paths.hybrid.unit_synergy}</p>
                </div>`
                    : ""
                }
            </div>
        `;
  }

  // Generate starting deck HTML with card effects
  let deckHTML = "";
  const cardLib = gameData.card_library || {};

  function renderCardItem(cardName, typeFallback) {
    const info = cardLib[cardName];
    const cp = info ? info.cp : "?";
    const timing = info ? info.timing : "";
    const effect = info ? info.effect : "";
    const type = info ? info.type : typeFallback;
    return `<div class="card-item card-${type}" style="cursor: pointer; position: relative;" onclick="this.querySelector('.card-effect-detail').style.display = this.querySelector('.card-effect-detail').style.display === 'block' ? 'none' : 'block'">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong>${cardName}</strong>
                <span style="background: rgba(233,69,96,0.3); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold; color: #e94560;" title="CP Cost">${cp}</span>
            </div>
            <div class="card-effect-detail" style="display: none; margin-top: 0.5rem; font-size: 0.85rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: #a78bfa; font-size: 0.75rem; margin-bottom: 0.25rem;">⏱️ ${timing}</div>
                <div style="color: #ccc;">${effect}</div>
            </div>
        </div>`;
  }

  if (commander.level_1_deck && typeof commander.level_1_deck === "object") {
    deckHTML =
      '<p style="color: #aaa; font-size: 0.85rem;"><em>Click any card to reveal its effect.</em></p><div class="deck-grid">';
    if (commander.level_1_deck.command) {
      commander.level_1_deck.command.forEach((card) => {
        deckHTML += renderCardItem(card, "command");
      });
    }
    if (commander.level_1_deck.tech) {
      commander.level_1_deck.tech.forEach((card) => {
        deckHTML += renderCardItem(card, "tech");
      });
    }
    if (commander.level_1_deck.fragment) {
      commander.level_1_deck.fragment.forEach((card) => {
        deckHTML += renderCardItem(card, "fragment");
      });
    }
    if (commander.level_1_deck.tactical) {
      commander.level_1_deck.tactical.forEach((card) => {
        deckHTML += renderCardItem(card, "tactical");
      });
    }
    deckHTML += "</div>";
  }

  // Generate tags
  const tags = commander.tags
    ? commander.tags
        .map((t) => `<span class="tag tag-${t.split("-")[0]}">${t}</span>`)
        .join(" ")
    : "";

  const detailImgPath = getCommanderImagePath(commander);
  const detailImgHTML = detailImgPath
    ? `<div class="commander-portrait-wrap"><img class="commander-portrait" src="${detailImgPath}" alt="${commander.name}" onerror="this.parentElement.style.display='none'"></div>`
    : '';

  contentEl.innerHTML = `
        <div class="card">
            ${detailImgHTML}
            <h2>${commander.name} ${commander.title ? "- " + commander.title : ""}</h2>
            <p><strong>Faction:</strong> <a href="#faction/${commander.faction}">${faction ? faction.name : "Unknown"}</a> ${commander.points_cost ? `&nbsp;|&nbsp; <strong style="color: #e94560;">${commander.points_cost} pts</strong>` : ""}</p>
            <p><strong>Theme:</strong> ${commander.theme}</p>
            ${commander.personality ? `<p><strong>Personality:</strong> ${commander.personality}</p>` : ""}
            <p><strong>Playstyle:</strong> ${commander.playstyle}</p>
            <p>${commander.flavor_text || ""}</p>
            ${tags ? `<div style="margin: 1rem 0;">${tags}</div>` : ""}
            
            <h3>Base Stats</h3>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">Command</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">Knowledge</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">Leadership</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Agility}</span><span class="stat-label">Agility</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Health}</span><span class="stat-label">Health</span></div>
            </div>
            ${commander.battle_stats ? `
            <h3>⚔️ Battlefield Stats</h3>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-value">${commander.battle_stats.ATK}</span><span class="stat-label">ATK</span></div>
                <div class="stat-item"><span class="stat-value">${commander.battle_stats.DEF}</span><span class="stat-label">DEF</span></div>
                <div class="stat-item"><span class="stat-value">${commander.battle_stats.HP}</span><span class="stat-label">HP</span></div>
                <div class="stat-item"><span class="stat-value">${commander.battle_stats.MOV}\"</span><span class="stat-label">MOV</span></div>
                <div class="stat-item"><span class="stat-value">${commander.battle_stats.RNG}\"</span><span class="stat-label">RNG</span></div>
                <div class="stat-item"><span class="stat-value">${commander.battle_stats.MOR}</span><span class="stat-label">MOR</span></div>
            </div>` : ""}
            
            ${
              deckHTML
                ? `
            <h3>Level 1 Starting Deck</h3>
            <p style="font-size: 0.85rem; color: #888;"><span style="color: #2196f3;">●</span> Command &nbsp; <span style="color: #ff9800;">●</span> Tech &nbsp; <span style="color: #e91e63;">●</span> Fragment &nbsp; <span style="color: #4caf50;">●</span> Tactical</p>
            ${deckHTML}
            `
                : ""
            }
            
            ${
              skillTreeHTML
                ? hasDetailedTree
                  ? `
            <h3>Skill Tree</h3>
            ${skillTreeHTML}
            `
                  : `
            <h3>Skill Tree (Levels 2-10)</h3>
            <p style="font-size: 0.85rem; color: #888;">Choose one skill per level. Your choices determine your Level 10 Evolution.</p>
            <div class="skill-tree">
                <div class="skill-level" style="font-weight: bold; color: #888;">
                    <div>LVL</div>
                    <div style="text-align: center; color: #2196f3;">Knowledge</div>
                    <div style="text-align: center; color: #f44336;">Chaos</div>
                    <div style="text-align: center; color: #4caf50;">Tactical</div>
                </div>
                ${skillTreeHTML}
            </div>
            `
                : ""
            }
            
            ${
              !hasDetailedTree
                ? `
            <h3>Level 10 Evolution Paths</h3>
            ${evolutionHTML}
            `
                : ""
            }
            
            ${
              commander.signature_units && commander.signature_units.length > 0
                ? `
            <h3>Signature Units</h3>
            <ul>
                ${commander.signature_units.map((u) => `<li><a href="#unit/${encodeURIComponent(u)}">${u}</a></li>`).join("")}
            </ul>
            `
                : ""
            }
            
            ${
              commander.strategic_notes
                ? `
            <h3>Strategic Notes & Tips</h3>
            <p>${commander.strategic_notes}</p>
            `
                : ""
            }
            
            <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
                <button class="btn btn-secondary" onclick="location.hash='#faction/${commander.faction}'">← ${faction ? faction.name : "Faction"}</button>
                <button class="btn" onclick="location.hash='#commanders'">← All Commanders</button>
            </div>
        </div>
    `;
}
