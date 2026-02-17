// ==========================================
// Shardborne Universe Wiki - Skill Tree Components
// ==========================================

function getUniversalSkillLookup() {
  const lookup = {};
  const tree = gameData.rules && gameData.rules.campaign && gameData.rules.campaign.skill_tree;
  if (!tree || !tree.paths) return lookup;
  Object.keys(tree.paths).forEach(path => {
    tree.paths[path].skills.forEach((skill, idx) => {
      lookup[skill.name.toLowerCase()] = { ...skill, path, tier: idx < 3 ? 1 : idx < 6 ? 2 : 3 };
    });
  });
  return lookup;
}

function renderCommanderSkillTreeCard(commander) {
  if (!commander || !commander.skill_tree || typeof commander.skill_tree !== 'object') {
    return '<p style="color: #888;">No skill tree data available for this commander.</p>';
  }

  const tree = commander.skill_tree;

  // Branching format (Veilbound etc.)
  if (tree.format === 'branching' && tree.levels) {
    const lvlColors = ['#4caf50','#4caf50','#4caf50','#ff9800','#ff9800','#ff9800','#e91e63','#e91e63','#e91e63'];
    let html = '<p style="font-size: 0.85rem; color: #888;">Choose one option (A or B) per level. Click to expand details.</p>';
    tree.levels.forEach((lvl, idx) => {
      const c = lvlColors[idx] || '#e91e63';
      const typeBadge = t => t === 'Passive' ? 'rgba(76,175,80,0.15); color: #4caf50' : 'rgba(33,150,243,0.15); color: #2196f3';
      html += `
        <div style="margin-bottom: 0.75rem;">
          <div style="font-weight: bold; color: ${c}; margin-bottom: 0.3rem; font-size: 0.9em;">Level ${lvl.level}</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem;">
            <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${c}; padding: 0.4rem 0.6rem; border-radius: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #e8e8e8; font-size: 0.85em;">A: ${lvl.option_a.name}</strong>
                <span style="font-size: 0.7em; padding: 0.1rem 0.3rem; border-radius: 3px; background: ${typeBadge(lvl.option_a.type)};">${lvl.option_a.type}</span>
              </div>
              <p style="margin: 0.2rem 0 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${lvl.option_a.effect}</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${c}; padding: 0.4rem 0.6rem; border-radius: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #e8e8e8; font-size: 0.85em;">B: ${lvl.option_b.name}</strong>
                <span style="font-size: 0.7em; padding: 0.1rem 0.3rem; border-radius: 3px; background: ${typeBadge(lvl.option_b.type)};">${lvl.option_b.type}</span>
              </div>
              <p style="margin: 0.2rem 0 0; font-size: 0.8em; color: #aaa;"><strong>Effect:</strong> ${lvl.option_b.effect}</p>
            </div>
          </div>
        </div>`;
    });
    return html;
  }

  // Old format (level_2 through level_10)
  let html = `
    <p style="font-size: 0.85rem; color: #888;">Choose one skill per level. Your choices determine your Level 10 Evolution.</p>
    <div style="display: grid; grid-template-columns: 50px 1fr 1fr 1fr; gap: 2px; font-size: 0.85rem;">
      <div style="font-weight: bold; color: #888; padding: 0.4rem; text-align: center;">LVL</div>
      <div style="font-weight: bold; color: #2196f3; padding: 0.4rem; text-align: center;">Knowledge</div>
      <div style="font-weight: bold; color: #f44336; padding: 0.4rem; text-align: center;">Chaos</div>
      <div style="font-weight: bold; color: #4caf50; padding: 0.4rem; text-align: center;">Tactical</div>`;

  for (let level = 2; level <= 10; level++) {
    const levelKey = `level_${level}`;
    if (tree[levelKey]) {
      const skills = tree[levelKey];
      const tierColor = level <= 4 ? '#4caf50' : level <= 7 ? '#ff9800' : '#e91e63';
      const renderSkillCell = (skillText, pathColor) => {
        if (!skillText || skillText === '-') return `<div style="padding: 0.4rem; color: #555; text-align: center;">-</div>`;
        const match = skillText.match(/^([^(]+?)(?:\s*\(([^)]+)\))?$/);
        const name = match ? match[1].trim() : skillText;
        const effect = match && match[2] ? match[2].trim() : '';
        return `<div style="padding: 0.4rem; background: rgba(255,255,255,0.02); border-left: 2px solid ${pathColor}; border-radius: 2px; cursor: default;" title="${effect || name}">
          <div style="color: #e8e8e8; font-size: 0.82em;">${name}</div>
          ${effect ? `<div style="color: #aaa; font-size: 0.72em; margin-top: 1px;">↳ ${effect}</div>` : ''}
        </div>`;
      };
      html += `
        <div style="color: ${tierColor}; font-weight: bold; padding: 0.4rem; text-align: center; display: flex; align-items: center; justify-content: center;">${level}</div>
        ${renderSkillCell(skills.knowledge, '#2196f3')}
        ${renderSkillCell(skills.chaos, '#f44336')}
        ${renderSkillCell(skills.tactical, '#4caf50')}`;
    }
  }
  html += '</div>';
  return html;
}

function renderUniversalSkillTreeReference() {
  const tree = gameData.rules && gameData.rules.campaign && gameData.rules.campaign.skill_tree;
  if (!tree || !tree.paths) return '';

  const pathColors = { knowledge: '#2196f3', chaos: '#f44336', tactical: '#4caf50' };
  const pathIcons = { knowledge: '🔵', chaos: '🔴', tactical: '🟢' };
  const tierLabels = ['Tier 1 (Lvl 2+)', 'Tier 2 (Lvl 5+)', 'Tier 3 (Lvl 8+)'];

  let html = `
    <p style="font-size: 0.85rem; color: #888; margin-bottom: 1rem;">${tree.overview || 'Universal campaign skills available to all commanders.'}</p>`;

  Object.keys(tree.paths).forEach(path => {
    const p = tree.paths[path];
    html += `
      <div style="margin-bottom: 1rem;">
        <h4 style="color: ${pathColors[path]}; margin-bottom: 0.3rem; font-size: 0.95rem;">${pathIcons[path]} ${path.charAt(0).toUpperCase() + path.slice(1)} Path</h4>
        <p style="font-size: 0.8rem; color: #999; margin: 0 0 0.5rem 0;">${p.theme}</p>`;
    p.skills.forEach((skill, idx) => {
      const tier = idx < 3 ? 0 : idx < 6 ? 1 : 2;
      const tierColor = tier === 0 ? '#4caf50' : tier === 1 ? '#ff9800' : '#e91e63';
      html += `
        <div style="margin-bottom: 0.3rem; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.02); border-left: 3px solid ${tierColor}; border-radius: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #e8e8e8; font-size: 0.85em;">${skill.name}</strong>
            <span style="font-size: 0.65em; color: ${tierColor}; opacity: 0.8;">${tierLabels[tier]}</span>
          </div>
          <p style="margin: 0.15rem 0 0 0; font-size: 0.8em; color: #aaa;">${skill.effect}</p>
        </div>`;
    });
    html += '</div>';
  });

  if (tree.skill_selection_rules) {
    html += '<div style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 4px; font-size: 0.8rem;">';
    html += '<strong style="color: #ccc;">Selection Rules:</strong><ul style="margin: 0.3rem 0 0 1rem; padding: 0; color: #aaa;">';
    tree.skill_selection_rules.forEach(rule => {
      html += `<li style="margin-bottom: 0.2rem;">${rule}</li>`;
    });
    html += '</ul></div>';
  }

  return html;
}
