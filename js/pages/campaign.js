// ==========================================
// Shardborne Universe Wiki - Campaign Tracker
// ==========================================

function initCampaignTracker() {
  // Populate commander select
  const commanderSelect = document.getElementById("campaign-commander-select");
  if (commanderSelect) {
    gameData.commanders.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.name;
      option.textContent = `${c.name}${c.title ? " - " + c.title : ""}`;
      commanderSelect.appendChild(option);
    });
  }

  // Load saved campaign if exists
  const saved = localStorage.getItem("campaignState");
  if (saved) {
    campaignState = JSON.parse(saved);
    if (commanderSelect && campaignState.commander) {
      commanderSelect.value = campaignState.commander.name;
    }
    updateCampaignUI();
  }
}

function updateCampaignCommander() {
  const select = document.getElementById("campaign-commander-select");
  const commander = gameData.commanders.find((c) => c.name === select.value);
  campaignState.commander = commander;
  campaignState.level = 1;
  campaignState.xp = 0;
  campaignState.skillChoices = [];
  campaignState.evolution = null;

  updateCampaignUI();
}

function updateCampaignUI() {
  // Update commander info
  const infoEl = document.getElementById("campaign-commander-info");
  if (infoEl && campaignState.commander) {
    infoEl.innerHTML = `
            <p><strong>${campaignState.commander.name}</strong> - ${campaignState.commander.title || ""}</p>
            <p style="font-size: 0.9rem; color: #888;">${campaignState.commander.theme}</p>
        `;
  }

  // Update level and XP
  document.getElementById("commander-level").textContent = campaignState.level;
  const xpToLevel = campaignState.level * 100;
  document.getElementById("xp-to-level").textContent = xpToLevel;
  document.getElementById("current-xp").textContent = campaignState.xp;
  document.getElementById("xp-bar-fill").style.width =
    (campaignState.xp / xpToLevel) * 100 + "%";

  // Update battle stats
  const victories = campaignState.battles.filter(
    (b) => b.result === "victory",
  ).length;
  const defeats = campaignState.battles.filter(
    (b) => b.result === "defeat",
  ).length;
  const draws = campaignState.battles.filter((b) => b.result === "draw").length;
  const totalXP = campaignState.battles.reduce((sum, b) => sum + b.xp, 0);

  document.getElementById("battles-won").textContent = victories;
  document.getElementById("battles-lost").textContent = defeats;
  document.getElementById("battles-drawn").textContent = draws;
  document.getElementById("total-xp-earned").textContent = totalXP;

  // Update skill tree display
  updateSkillTreeDisplay();

  // Update battle log
  updateBattleLog();

  // Update path tendency
  updatePathTendency();
}

function updateSkillTreeDisplay() {
  const container = document.getElementById("skill-tree-display");
  if (!container) return;
  if (!campaignState.commander) {
    container.innerHTML =
      '<p style="color: #888; text-align: center;">Select a commander to view their skill tree.</p>';
    return;
  }

  const tree = campaignState.commander.skill_tree;
  if (!tree || typeof tree !== "object") {
    container.innerHTML = '<p style="color: #888; text-align: center;">No skill tree data for this commander.</p>';
    return;
  }

  let html = '';

  // Branching format (Veilbound etc.)
  if (tree.format === 'branching' && tree.levels) {
    html += '<p style="font-size: 0.85rem; color: #888; margin-bottom: 0.5rem;">Choose one option (A or B) per level. Click a skill to select it.</p>';
    const lvlColors = ['#4caf50','#4caf50','#4caf50','#ff9800','#ff9800','#ff9800','#e91e63','#e91e63','#e91e63'];
    tree.levels.forEach((lvl, idx) => {
      const c = lvlColors[idx] || '#e91e63';
      const choice = campaignState.skillChoices.find(ch => ch.level === lvl.level);
      const isUnlocked = lvl.level <= campaignState.level + 1;
      const typeBadge = t => t === 'Passive' ? 'rgba(76,175,80,0.15); color: #4caf50' : 'rgba(33,150,243,0.15); color: #2196f3';
      const renderOption = (opt, optKey) => {
        const isChosen = choice?.path === optKey;
        const canSelect = isUnlocked && !choice;
        return `<div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${isChosen ? '#fff' : c}; padding: 0.5rem 0.7rem; border-radius: 4px; ${isChosen ? 'border: 2px solid #fff;' : ''} ${!isUnlocked ? 'opacity: 0.5;' : ''} ${canSelect ? 'cursor: pointer;' : ''}"
              ${canSelect ? `onclick="selectSkill(${lvl.level}, '${optKey}')"` : ''}>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #e8e8e8; font-size: 0.85em;">${optKey === 'option_a' ? 'A' : 'B'}: ${opt.name} ${isChosen ? '✓' : ''}</strong>
            <span style="font-size: 0.7em; padding: 0.1rem 0.3rem; border-radius: 3px; background: ${typeBadge(opt.type)};">${opt.type}</span>
          </div>
          <p style="margin: 0.2rem 0 0.1rem 0; font-size: 0.85em; opacity: 0.9;">${opt.description}</p>
          <p style="margin: 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${opt.effect}</p>
        </div>`;
      };
      html += `
        <div style="margin-bottom: 0.75rem;">
          <div style="font-weight: bold; color: ${c}; margin-bottom: 0.3rem; font-size: 0.9em;">Level ${lvl.level} ${lvl.level <= campaignState.level ? '' : '<span style="opacity: 0.5;">(locked)</span>'}</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            ${renderOption(lvl.option_a, 'option_a')}
            ${renderOption(lvl.option_b, 'option_b')}
          </div>
        </div>`;
    });
  } else {
    // Old format (level_2 through level_10) — show effects parsed from parenthetical names
    const parseSkillText = (text) => {
      if (!text || text === '-') return { name: '-', effect: '' };
      const match = text.match(/^([^(]+?)(?:\s*\(([^)]+)\))?$/);
      return { name: match ? match[1].trim() : text, effect: match && match[2] ? match[2].trim() : '' };
    };

    html += `
      <div class="skill-level" style="font-weight: bold; color: #888;">
        <div>LVL</div>
        <div style="text-align: center; color: #2196f3;">Knowledge</div>
        <div style="text-align: center; color: #f44336;">Chaos</div>
        <div style="text-align: center; color: #4caf50;">Tactical</div>
      </div>`;

    for (let level = 2; level <= 10; level++) {
      const levelKey = `level_${level}`;
      if (tree[levelKey]) {
        const skills = tree[levelKey];
        const choice = campaignState.skillChoices.find((c) => c.level === level);
        const isUnlocked = level <= campaignState.level + 1;

        const renderSkillOption = (skillText, pathKey, pathClass) => {
          const parsed = parseSkillText(skillText);
          const isChosen = choice?.path === pathKey;
          const canSelect = isUnlocked && !choice;
          return `<div class="skill-option ${pathClass}" style="${isChosen ? 'border: 2px solid #fff;' : ''} ${!isUnlocked ? 'opacity: 0.5;' : ''} ${canSelect ? 'cursor: pointer;' : ''} position: relative;"
                       ${canSelect ? `onclick="selectSkill(${level}, '${pathKey}')"` : ''}
                       title="${parsed.effect || parsed.name}">
            <div style="font-size: 0.85em;">${parsed.name} ${isChosen ? '✓' : ''}</div>
            ${parsed.effect ? `<div style="font-size: 0.7em; color: #aaa; margin-top: 2px;">↳ ${parsed.effect}</div>` : ''}
          </div>`;
        };

        html += `
          <div class="skill-level">
            <div class="skill-level-num" style="${level <= campaignState.level ? '' : 'opacity: 0.5;'}">${level}</div>
            ${renderSkillOption(skills.knowledge, 'knowledge', 'skill-knowledge')}
            ${renderSkillOption(skills.chaos, 'chaos', 'skill-chaos')}
            ${renderSkillOption(skills.tactical, 'tactical', 'skill-tactical')}
          </div>`;
      }
    }
  }

  // Add universal skill tree reference toggle
  html += `
    <div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.75rem;">
      <h4 style="cursor: pointer; color: #a78bfa; margin: 0;" onclick="var el = document.getElementById('campaign-universal-ref'); el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.textContent = el.style.display === 'none' ? '▶ Universal Campaign Skills Reference' : '▼ Universal Campaign Skills Reference';">▶ Universal Campaign Skills Reference</h4>
      <div id="campaign-universal-ref" style="display: none; margin-top: 0.5rem;">${renderUniversalSkillTreeReference()}</div>
    </div>`;

  container.innerHTML = html;
}

function selectSkill(level, path) {
  if (level > campaignState.level + 1) {
    alert("You need to reach the previous level first!");
    return;
  }

  const existingChoice = campaignState.skillChoices.find(
    (c) => c.level === level,
  );
  if (existingChoice) {
    alert("You have already chosen a skill for this level!");
    return;
  }

  campaignState.skillChoices.push({ level, path });

  // Check if level 10 and determine evolution
  if (level === 10) {
    determineEvolution();
  }

  updateCampaignUI();
  saveCampaign();
}

function updatePathTendency() {
  const pathCounts = { knowledge: 0, chaos: 0, tactical: 0 };
  const isBranching = campaignState.commander?.skill_tree?.format === 'branching';
  campaignState.skillChoices.forEach((c) => {
    if (pathCounts[c.path] !== undefined) pathCounts[c.path]++;
  });

  const el = document.getElementById("path-tendency");
  if (!el) return;

  if (isBranching) {
    const totalChoices = campaignState.skillChoices.length;
    el.textContent = totalChoices > 0 ? `${totalChoices} skill${totalChoices > 1 ? 's' : ''} chosen` : 'Undetermined';
    el.style.color = totalChoices > 0 ? '#a78bfa' : '#888';
    return;
  }

  const maxPath = Object.entries(pathCounts).reduce(
    (a, b) => (a[1] > b[1] ? a : b),
    ["none", 0],
  );

  if (maxPath[1] === 0) {
    el.textContent = "Undetermined";
    el.style.color = "#888";
  } else {
    el.textContent = `Leaning ${maxPath[0].charAt(0).toUpperCase() + maxPath[0].slice(1)} (${maxPath[1]} choices)`;
    el.style.color =
      maxPath[0] === "knowledge"
        ? "#2196f3"
        : maxPath[0] === "chaos"
          ? "#f44336"
          : "#4caf50";
  }
}

function determineEvolution() {
  const pathCounts = { knowledge: 0, chaos: 0, tactical: 0 };
  campaignState.skillChoices.forEach((c) => {
    pathCounts[c.path]++;
  });

  const sorted = Object.entries(pathCounts).sort((a, b) => b[1] - a[1]);

  if (sorted[0][1] > sorted[1][1]) {
    campaignState.evolution = sorted[0][0];
  } else {
    campaignState.evolution = "hybrid";
  }

  alert(
    `Your commander has evolved into: ${campaignState.commander.evolution_paths[campaignState.evolution]?.name || campaignState.evolution}!`,
  );
}

function addXP(amount) {
  campaignState.xp += amount;
  const xpToLevel = campaignState.level * 100;

  while (campaignState.xp >= xpToLevel && campaignState.level < 10) {
    campaignState.xp -= xpToLevel;
    campaignState.level++;
    showLevelUpModal(campaignState.level);
  }

  if (campaignState.level >= 10) {
    campaignState.level = 10;
    campaignState.xp = 0;
  }

  updateCampaignUI();
  saveCampaign();
}

function showLevelUpModal(level) {
  const modal = document.getElementById("levelup-modal");
  const choices = document.getElementById("levelup-choices");
  if (!modal || !choices || !campaignState.commander) {
    alert(`Level Up! Your commander is now level ${level}!`);
    return;
  }

  const tree = campaignState.commander.skill_tree;
  if (!tree || typeof tree !== 'object') {
    alert(`Level Up! Your commander is now level ${level}!`);
    return;
  }

  let html = `<p style="color: #4fc3f7; font-size: 1.1rem; text-align: center;">🎉 Level ${level} Reached!</p>`;

  // Branching format
  if (tree.format === 'branching' && tree.levels) {
    const lvl = tree.levels.find(l => l.level === level);
    if (lvl) {
      const typeBadge = t => t === 'Passive' ? 'rgba(76,175,80,0.15); color: #4caf50' : 'rgba(33,150,243,0.15); color: #2196f3';
      html += `<p style="color: #ccc; text-align: center;">Choose one skill upgrade for Level ${level}:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <div style="background: rgba(255,255,255,0.05); border-left: 4px solid #4caf50; padding: 1rem; border-radius: 6px; cursor: pointer; transition: transform 0.1s;" 
               onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"
               onclick="selectSkill(${level}, 'option_a'); closeLevelUpModal();">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #e8e8e8; font-size: 1rem;">A: ${lvl.option_a.name}</strong>
              <span style="font-size: 0.75em; padding: 0.15rem 0.4rem; border-radius: 3px; background: ${typeBadge(lvl.option_a.type)};">${lvl.option_a.type}</span>
            </div>
            <p style="color: #ccc; margin: 0.3rem 0; font-size: 0.9em;">${lvl.option_a.description}</p>
            <p style="color: #aaa; margin: 0.3rem 0 0 0; font-size: 0.85em;"><strong>Effect:</strong> ${lvl.option_a.effect}</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-left: 4px solid #ff9800; padding: 1rem; border-radius: 6px; cursor: pointer; transition: transform 0.1s;"
               onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"
               onclick="selectSkill(${level}, 'option_b'); closeLevelUpModal();">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #e8e8e8; font-size: 1rem;">B: ${lvl.option_b.name}</strong>
              <span style="font-size: 0.75em; padding: 0.15rem 0.4rem; border-radius: 3px; background: ${typeBadge(lvl.option_b.type)};">${lvl.option_b.type}</span>
            </div>
            <p style="color: #ccc; margin: 0.3rem 0; font-size: 0.9em;">${lvl.option_b.description}</p>
            <p style="color: #aaa; margin: 0.3rem 0 0 0; font-size: 0.85em;"><strong>Effect:</strong> ${lvl.option_b.effect}</p>
          </div>
        </div>`;
    } else {
      html += '<p style="color: #888;">No skill choices available for this level.</p>';
      html += `<button class="btn" onclick="closeLevelUpModal()" style="width: 100%; margin-top: 1rem;">Continue</button>`;
    }
  } else {
    // Old format — show three path options
    const levelKey = `level_${level}`;
    const skills = tree[levelKey];
    if (skills) {
      const parseSkill = (text) => {
        if (!text || text === '-') return { name: '-', effect: '' };
        const match = text.match(/^([^(]+?)(?:\s*\(([^)]+)\))?$/);
        return { name: match ? match[1].trim() : text, effect: match && match[2] ? match[2].trim() : '' };
      };
      const k = parseSkill(skills.knowledge);
      const c = parseSkill(skills.chaos);
      const t = parseSkill(skills.tactical);

      html += `<p style="color: #ccc; text-align: center;">Choose one skill path for Level ${level}:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin-top: 1rem;">
          <div style="background: rgba(33,150,243,0.1); border-left: 4px solid #2196f3; padding: 1rem; border-radius: 6px; cursor: pointer; transition: transform 0.1s;"
               onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"
               onclick="selectSkill(${level}, 'knowledge'); closeLevelUpModal();">
            <strong style="color: #2196f3; font-size: 0.9rem;">🔵 Knowledge</strong>
            <div style="color: #e8e8e8; margin-top: 0.5rem; font-size: 0.95em;">${k.name}</div>
            ${k.effect ? `<div style="color: #aaa; font-size: 0.8em; margin-top: 0.3rem;">↳ ${k.effect}</div>` : ''}
          </div>
          <div style="background: rgba(244,67,54,0.1); border-left: 4px solid #f44336; padding: 1rem; border-radius: 6px; cursor: pointer; transition: transform 0.1s;"
               onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"
               onclick="selectSkill(${level}, 'chaos'); closeLevelUpModal();">
            <strong style="color: #f44336; font-size: 0.9rem;">🔴 Chaos</strong>
            <div style="color: #e8e8e8; margin-top: 0.5rem; font-size: 0.95em;">${c.name}</div>
            ${c.effect ? `<div style="color: #aaa; font-size: 0.8em; margin-top: 0.3rem;">↳ ${c.effect}</div>` : ''}
          </div>
          <div style="background: rgba(76,175,80,0.1); border-left: 4px solid #4caf50; padding: 1rem; border-radius: 6px; cursor: pointer; transition: transform 0.1s;"
               onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"
               onclick="selectSkill(${level}, 'tactical'); closeLevelUpModal();">
            <strong style="color: #4caf50; font-size: 0.9rem;">🟢 Tactical</strong>
            <div style="color: #e8e8e8; margin-top: 0.5rem; font-size: 0.95em;">${t.name}</div>
            ${t.effect ? `<div style="color: #aaa; font-size: 0.8em; margin-top: 0.3rem;">↳ ${t.effect}</div>` : ''}
          </div>
        </div>`;
    } else {
      html += '<p style="color: #888;">No skill choices available for this level.</p>';
      html += `<button class="btn" onclick="closeLevelUpModal()" style="width: 100%; margin-top: 1rem;">Continue</button>`;
    }
  }

  choices.innerHTML = html;
  modal.style.display = 'flex';
}

function closeLevelUpModal() {
  const modal = document.getElementById("levelup-modal");
  if (modal) modal.style.display = 'none';
}

function recordBattle(result) {
  const xpRewards = { victory: 100, defeat: 25, draw: 50 };
  const xp = xpRewards[result];

  campaignState.battles.push({
    date: new Date().toLocaleDateString(),
    result,
    xp,
  });

  addXP(xp);
}

function updateBattleLog() {
  const container = document.getElementById("battle-log");
  if (!container) return;

  if (campaignState.battles.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center;">No battles recorded yet. Start your campaign!</p>';
    return;
  }

  container.innerHTML = campaignState.battles
    .slice()
    .reverse()
    .map(
      (battle) => `
        <div class="battle-entry battle-${battle.result}">
            <div style="display: flex; justify-content: space-between;">
                <span>${battle.result.charAt(0).toUpperCase() + battle.result.slice(1)}</span>
                <span style="color: #888;">${battle.date}</span>
            </div>
            <div style="color: #4fc3f7;">+${battle.xp} XP</div>
        </div>
    `,
    )
    .join("");
}

function saveCampaign() {
  localStorage.setItem("campaignState", JSON.stringify(campaignState));
}

function loadCampaign() {
  const saved = localStorage.getItem("campaignState");
  if (saved) {
    campaignState = JSON.parse(saved);
    const select = document.getElementById("campaign-commander-select");
    if (select && campaignState.commander) {
      select.value = campaignState.commander.name;
    }
    updateCampaignUI();
    alert("Campaign loaded successfully!");
  } else {
    alert("No saved campaign found.");
  }
}

function newCampaign() {
  if (
    confirm(
      "Are you sure you want to start a new campaign? This will clear your current progress.",
    )
  ) {
    campaignState = {
      commander: null,
      level: 1,
      xp: 0,
      skillChoices: [],
      evolution: null,
      battles: [],
      fragments: [],
      persistentUnits: [],
    };

    document.getElementById("campaign-commander-select").value = "";
    localStorage.removeItem("campaignState");
    updateCampaignUI();
  }
}

function openFragmentSelector() {
  const fragment = prompt("Enter fragment name to add:");
  if (
    fragment &&
    gameData.fragments.find(
      (f) => f.name.toLowerCase() === fragment.toLowerCase(),
    )
  ) {
    campaignState.fragments.push(fragment);
    updateCampaignUI();
    saveCampaign();
  } else if (fragment) {
    alert("Fragment not found. Please enter a valid fragment name.");
  }
}

function addPersistentUnit() {
  const unitName = prompt("Enter unit name to track:");
  if (
    unitName &&
    gameData.units.find((u) => u.name.toLowerCase() === unitName.toLowerCase())
  ) {
    campaignState.persistentUnits.push({
      name: unitName,
      status: "healthy",
      buffs: [],
      mutations: [],
    });
    updateCampaignUI();
    saveCampaign();
  } else if (unitName) {
    alert("Unit not found. Please enter a valid unit name.");
  }
}
