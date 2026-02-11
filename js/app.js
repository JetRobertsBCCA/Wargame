// ==========================================
// War Crier Universe Wiki - Application Logic
// ==========================================

// Global State
let currentArmy = {
    commander: null,
    evolution: null,
    units: [],
    fragments: [],
    pointsLimit: 200
};

let campaignState = {
    commander: null,
    level: 1,
    xp: 0,
    skillChoices: [],
    evolution: null,
    battles: [],
    fragments: [],
    persistentUnits: []
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// ==========================================
// Page Navigation
// ==========================================

function showPage(pageId) {
    fetch(`pages/${pageId}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            
            // Initialize page-specific content
            switch(pageId) {
                case 'factions':
                    loadFactions();
                    break;
                case 'commanders':
                    loadCommanders();
                    break;
                case 'units':
                    loadUnits();
                    break;
                case 'fragments':
                    loadFragments();
                    break;
                case 'army-builder':
                    initArmyBuilder();
                    break;
                case 'campaign-tracker':
                    initCampaignTracker();
                    break;
            }
        });
}

// ==========================================
// Search Functionality
// ==========================================

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const allContent = [
        ...gameData.factions,
        ...gameData.commanders,
        ...gameData.units,
        ...gameData.fragments
    ];

    const results = allContent.filter(item => 
        item.name.toLowerCase().includes(query) ||
        (item.theme && item.theme.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.playstyle && item.playstyle.toLowerCase().includes(query)) ||
        (item.role && item.role.toLowerCase().includes(query))
    );

    const contentEl = document.getElementById('content');
    contentEl.innerHTML = '<h2>Search Results</h2>';
    
    if (results.length > 0) {
        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            let content = `<h3>${item.name}</h3>`;
            if(item.type) content += `<p><strong>Type:</strong> ${item.type}</p>`;
            if(item.theme) content += `<p><strong>Theme:</strong> ${item.theme}</p>`;
            if(item.playstyle) content += `<p><strong>Playstyle:</strong> ${item.playstyle}</p>`;
            if(item.description) content += `<p>${item.description}</p>`;
            if(item.effects) content += `<p><strong>Effects:</strong> ${item.effects}</p>`;
            card.innerHTML = content;
            contentEl.appendChild(card);
        });
    } else {
        contentEl.innerHTML += '<p>No results found.</p>';
    }
}

// ==========================================
// Faction Loading
// ==========================================

function loadFactions() {
    const contentEl = document.getElementById('faction-list');
    if (!contentEl) return;
    
    gameData.factions.forEach(faction => {
        const factionCommanders = getCommandersByFaction(faction.id);
        const factionUnits = getUnitsByFaction(faction.id).filter(u => u.type !== 'War Machine');
        const factionWarMachines = getUnitsByFaction(faction.id).filter(u => u.type === 'War Machine');
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${faction.name}</h3>
            <p><strong>Theme:</strong> ${faction.theme}</p>
            <p>${faction.flavor_text}</p>
            <p><strong>Core Philosophy:</strong> ${faction.core_philosophy}</p>
            
            ${faction.faction_bonuses ? `
            <h4>Faction Bonuses</h4>
            <ul>
                ${faction.faction_bonuses.map(b => `<li>${b}</li>`).join('')}
            </ul>
            ` : ''}
            
            ${faction.playstyle_notes ? `<p><strong>Playstyle Notes:</strong> ${faction.playstyle_notes}</p>` : ''}
            
            <h4>Commanders (${factionCommanders.length})</h4>
            <ul>
                ${factionCommanders.map(c => `<li><a href="#" onclick="showCommander('${c.name}')">${c.name}${c.title ? ' - ' + c.title : ''}</a></li>`).join('')}
            </ul>
            
            <h4>Standard Units (${factionUnits.length})</h4>
            <ul>
                ${factionUnits.slice(0, 10).map(u => `<li><a href="#" onclick="showUnit('${u.name}')">${u.name}</a> (${u.points_cost} pts)</li>`).join('')}
                ${factionUnits.length > 10 ? `<li><em>...and ${factionUnits.length - 10} more. <a href="#" onclick="showPage('units')">View all</a></em></li>` : ''}
            </ul>
            
            <h4>War Machines (${factionWarMachines.length})</h4>
            <ul>
                ${factionWarMachines.map(u => `<li><a href="#" onclick="showUnit('${u.name}')">${u.name}</a> (${u.points_cost} pts)</li>`).join('')}
            </ul>
        `;
        contentEl.appendChild(card);
    });
}

// ==========================================
// Commander Loading & Display
// ==========================================

function loadCommanders() {
    const contentEl = document.getElementById('commander-list');
    if (!contentEl) return;
    
    gameData.commanders.forEach(commander => {
        const faction = getFactionById(commander.faction);
        const card = document.createElement('div');
        card.className = 'card';
        
        // Generate tags
        const tags = commander.tags ? commander.tags.map(t => 
            `<span class="tag tag-${t.split('-')[0]}">${t}</span>`
        ).join(' ') : '';
        
        card.innerHTML = `
            <h3><a href="#" onclick="showCommander('${commander.name}')">${commander.name}</a> ${commander.title ? '- ' + commander.title : ''}</h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : 'Unknown'}</p>
            <p><strong>Theme:</strong> ${commander.theme}</p>
            <p><strong>Playstyle:</strong> ${commander.playstyle}</p>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">Command</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">Knowledge</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">Leadership</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Agility}</span><span class="stat-label">Agility</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Health}</span><span class="stat-label">Health</span></div>
            </div>
            ${tags ? `<div style="margin-top: 1rem;">${tags}</div>` : ''}
        `;
        contentEl.appendChild(card);
    });
}

function showCommander(name) {
    const commander = gameData.commanders.find(c => c.name === name);
    if (!commander) return;
    
    const faction = getFactionById(commander.faction);
    const contentEl = document.getElementById('content');
    
    // Generate skill tree HTML
    let skillTreeHTML = '';
    if (commander.skill_tree && typeof commander.skill_tree === 'object') {
        for (let level = 2; level <= 10; level++) {
            const levelKey = `level_${level}`;
            if (commander.skill_tree[levelKey]) {
                const skills = commander.skill_tree[levelKey];
                skillTreeHTML += `
                    <div class="skill-level">
                        <div class="skill-level-num">${level}</div>
                        <div class="skill-option skill-knowledge">${skills.knowledge || '-'}</div>
                        <div class="skill-option skill-chaos">${skills.chaos || '-'}</div>
                        <div class="skill-option skill-tactical">${skills.tactical || '-'}</div>
                    </div>
                `;
            }
        }
    }
    
    // Generate evolution paths HTML
    let evolutionHTML = '';
    if (commander.evolution_paths) {
        evolutionHTML = `
            <div class="evolution-grid">
                ${commander.evolution_paths.knowledge ? `
                <div class="evolution-card evolution-knowledge">
                    <h5>🔵 ${commander.evolution_paths.knowledge.name}</h5>
                    <p>${commander.evolution_paths.knowledge.description}</p>
                    <p><strong>Abilities:</strong> ${commander.evolution_paths.knowledge.abilities.join(', ')}</p>
                    <p><strong>Fragment Interaction:</strong> ${commander.evolution_paths.knowledge.fragment_interaction}</p>
                    <p><strong>Unit Synergy:</strong> ${commander.evolution_paths.knowledge.unit_synergy}</p>
                </div>` : ''}
                ${commander.evolution_paths.chaos ? `
                <div class="evolution-card evolution-chaos">
                    <h5>🔴 ${commander.evolution_paths.chaos.name}</h5>
                    <p>${commander.evolution_paths.chaos.description}</p>
                    <p><strong>Abilities:</strong> ${commander.evolution_paths.chaos.abilities.join(', ')}</p>
                    <p><strong>Fragment Interaction:</strong> ${commander.evolution_paths.chaos.fragment_interaction}</p>
                    <p><strong>Unit Synergy:</strong> ${commander.evolution_paths.chaos.unit_synergy}</p>
                </div>` : ''}
                ${commander.evolution_paths.hybrid ? `
                <div class="evolution-card evolution-hybrid">
                    <h5>🟣 ${commander.evolution_paths.hybrid.name}</h5>
                    <p>${commander.evolution_paths.hybrid.description}</p>
                    <p><strong>Abilities:</strong> ${commander.evolution_paths.hybrid.abilities.join(', ')}</p>
                    <p><strong>Fragment Interaction:</strong> ${commander.evolution_paths.hybrid.fragment_interaction}</p>
                    <p><strong>Unit Synergy:</strong> ${commander.evolution_paths.hybrid.unit_synergy}</p>
                </div>` : ''}
            </div>
        `;
    }
    
    // Generate starting deck HTML
    let deckHTML = '';
    if (commander.level_1_deck && typeof commander.level_1_deck === 'object') {
        deckHTML = '<div class="deck-grid">';
        if (commander.level_1_deck.command) {
            commander.level_1_deck.command.forEach(card => {
                deckHTML += `<div class="card-item card-command">${card}</div>`;
            });
        }
        if (commander.level_1_deck.tech) {
            commander.level_1_deck.tech.forEach(card => {
                deckHTML += `<div class="card-item card-tech">${card}</div>`;
            });
        }
        if (commander.level_1_deck.fragment) {
            commander.level_1_deck.fragment.forEach(card => {
                deckHTML += `<div class="card-item card-fragment">${card}</div>`;
            });
        }
        if (commander.level_1_deck.tactical) {
            commander.level_1_deck.tactical.forEach(card => {
                deckHTML += `<div class="card-item card-tactical">${card}</div>`;
            });
        }
        deckHTML += '</div>';
    }
    
    // Generate tags
    const tags = commander.tags ? commander.tags.map(t => 
        `<span class="tag tag-${t.split('-')[0]}">${t}</span>`
    ).join(' ') : '';
    
    contentEl.innerHTML = `
        <div class="card">
            <h2>${commander.name} ${commander.title ? '- ' + commander.title : ''}</h2>
            <p><strong>Faction:</strong> <a href="#" onclick="showPage('factions')">${faction ? faction.name : 'Unknown'}</a></p>
            <p><strong>Theme:</strong> ${commander.theme}</p>
            ${commander.personality ? `<p><strong>Personality:</strong> ${commander.personality}</p>` : ''}
            <p><strong>Playstyle:</strong> ${commander.playstyle}</p>
            <p>${commander.flavor_text || ''}</p>
            ${tags ? `<div style="margin: 1rem 0;">${tags}</div>` : ''}
            
            <h3>Base Stats</h3>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">Command</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">Knowledge</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">Leadership</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Agility}</span><span class="stat-label">Agility</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Health}</span><span class="stat-label">Health</span></div>
            </div>
            
            ${deckHTML ? `
            <h3>Level 1 Starting Deck</h3>
            <p style="font-size: 0.85rem; color: #888;"><span style="color: #2196f3;">●</span> Command &nbsp; <span style="color: #ff9800;">●</span> Tech &nbsp; <span style="color: #e91e63;">●</span> Fragment &nbsp; <span style="color: #4caf50;">●</span> Tactical</p>
            ${deckHTML}
            ` : ''}
            
            ${skillTreeHTML ? `
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
            ` : ''}
            
            <h3>Level 10 Evolution Paths</h3>
            ${evolutionHTML}
            
            ${commander.signature_units && commander.signature_units.length > 0 ? `
            <h3>Signature Units</h3>
            <ul>
                ${commander.signature_units.map(u => `<li><a href="#" onclick="showUnit('${u}')">${u}</a></li>`).join('')}
            </ul>
            ` : ''}
            
            ${commander.strategic_notes ? `
            <h3>Strategic Notes & Tips</h3>
            <p>${commander.strategic_notes}</p>
            ` : ''}
            
            <div style="margin-top: 2rem;">
                <button class="btn" onclick="showPage('commanders')">← Back to Commanders</button>
            </div>
        </div>
    `;
}

// ==========================================
// Unit Loading & Display
// ==========================================

function loadUnits() {
    const contentEl = document.getElementById('unit-list');
    if (!contentEl) return;
    
    // Add filter controls
    const filterDiv = document.createElement('div');
    filterDiv.className = 'filter-controls';
    filterDiv.innerHTML = `
        <button class="filter-btn active" onclick="filterUnitsList('all', this)">All</button>
        <button class="filter-btn" onclick="filterUnitsList('Infantry', this)">Infantry</button>
        <button class="filter-btn" onclick="filterUnitsList('Cavalry', this)">Cavalry</button>
        <button class="filter-btn" onclick="filterUnitsList('Support', this)">Support</button>
        <button class="filter-btn" onclick="filterUnitsList('Specialist', this)">Specialist</button>
        <button class="filter-btn" onclick="filterUnitsList('Artillery', this)">Artillery</button>
        <button class="filter-btn" onclick="filterUnitsList('Scout', this)">Scout</button>
        <button class="filter-btn" onclick="filterUnitsList('War Machine', this)">War Machines</button>
    `;
    contentEl.before(filterDiv);
    
    renderUnitsList('all');
}

function filterUnitsList(type, btn) {
    // Update active button
    document.querySelectorAll('.filter-controls .filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderUnitsList(type);
}

function renderUnitsList(filterType) {
    const contentEl = document.getElementById('unit-list');
    if (!contentEl) return;
    
    contentEl.innerHTML = '';
    
    const filteredUnits = filterType === 'all' 
        ? gameData.units 
        : gameData.units.filter(u => u.type === filterType);
    
    filteredUnits.forEach(unit => {
        const faction = getFactionById(unit.faction);
        const card = document.createElement('div');
        card.className = 'card';
        
        const typeClass = `type-${unit.type.toLowerCase().replace(' ', '')}`;
        
        card.innerHTML = `
            <h3>
                <span class="unit-type-icon ${typeClass}">${getUnitTypeIcon(unit.type)}</span>
                <a href="#" onclick="showUnit('${unit.name}')">${unit.name}</a>
            </h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : 'Unknown'}</p>
            <p><strong>Type:</strong> ${unit.type} | <strong>Points:</strong> <span style="color: #e94560; font-weight: bold;">${unit.points_cost}</span></p>
            <p><strong>Role:</strong> ${unit.role}</p>
        `;
        contentEl.appendChild(card);
    });
}

function getUnitTypeIcon(type) {
    const icons = {
        'Infantry': '⚔️',
        'Cavalry': '🐎',
        'Support': '🔧',
        'Specialist': '⭐',
        'Artillery': '💣',
        'Scout': '👁️',
        'War Machine': '🤖'
    };
    return icons[type] || '•';
}

function showUnit(name) {
    const unit = gameData.units.find(u => u.name === name);
    if (!unit) return;
    
    const faction = getFactionById(unit.faction);
    const contentEl = document.getElementById('content');
    
    // Find commanders with this as signature unit
    const signatureCommanders = gameData.commanders.filter(c => 
        c.signature_units && c.signature_units.includes(unit.name)
    );
    
    const typeClass = `type-${unit.type.toLowerCase().replace(' ', '')}`;
    
    contentEl.innerHTML = `
        <div class="card">
            <h2>
                <span class="unit-type-icon ${typeClass}" style="font-size: 2rem;">${getUnitTypeIcon(unit.type)}</span>
                ${unit.name}
            </h2>
            <p><strong>Faction:</strong> <a href="#" onclick="showPage('factions')">${faction ? faction.name : 'Unknown'}</a></p>
            <p><strong>Type:</strong> ${unit.type}</p>
            <p><strong>Points Cost:</strong> <span style="color: #e94560; font-size: 1.5rem; font-weight: bold;">${unit.points_cost}</span></p>
            <p><strong>Role / Purpose:</strong> ${unit.role}</p>
            <p><strong>Fragment Interactions:</strong> ${unit.fragment_interactions}</p>
            <p><em>${unit.flavor_text}</em></p>
            
            ${signatureCommanders.length > 0 ? `
            <h3>Signature Unit For</h3>
            <ul>
                ${signatureCommanders.map(c => `<li><a href="#" onclick="showCommander('${c.name}')">${c.name}</a></li>`).join('')}
            </ul>
            ` : ''}
            
            <div style="margin-top: 2rem;">
                <button class="btn" onclick="showPage('units')">← Back to Units</button>
            </div>
        </div>
    `;
}

// ==========================================
// Fragment Loading & Display
// ==========================================

function loadFragments() {
    const contentEl = document.getElementById('fragment-list');
    if (!contentEl) return;
    
    gameData.fragments.forEach(fragment => {
        const faction = getFactionById(fragment.faction);
        const card = document.createElement('div');
        card.className = 'card';
        
        const riskColor = {
            'Low': '#4caf50',
            'Medium': '#ff9800',
            'High': '#f44336',
            'Very High': '#9c27b0'
        }[fragment.risk_instability] || '#888';
        
        card.innerHTML = `
            <h3>💎 ${fragment.name}</h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : 'Universal'}</p>
            <p><strong>Effects:</strong> ${fragment.effects}</p>
            <p><strong>Risk/Instability:</strong> <span style="color: ${riskColor}; font-weight: bold;">${fragment.risk_instability}</span></p>
            <p><strong>Evolution Synergy:</strong> ${fragment.interaction_evolution}</p>
        `;
        contentEl.appendChild(card);
    });
}

// ==========================================
// Army Builder Functions
// ==========================================

function initArmyBuilder() {
    // Populate commander select
    const commanderSelect = document.getElementById('commander-select');
    if (commanderSelect) {
        gameData.commanders.forEach(c => {
            const option = document.createElement('option');
            option.value = c.name;
            option.textContent = `${c.name}${c.title ? ' - ' + c.title : ''}`;
            commanderSelect.appendChild(option);
        });
    }
    
    // Load units
    loadUnitSelector('all');
    
    // Load fragments
    loadFragmentSelector();
    
    // Update display
    updateArmyDisplay();
}

function loadUnitSelector(filterType) {
    const container = document.getElementById('unit-selector');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredUnits = filterType === 'all' 
        ? gameData.units 
        : gameData.units.filter(u => u.type === filterType);
    
    filteredUnits.forEach(unit => {
        const div = document.createElement('div');
        div.className = 'unit-option';
        div.onclick = () => addUnitToArmy(unit.name);
        div.innerHTML = `
            <span class="unit-name">${unit.name}</span>
            <span class="unit-cost">${unit.points_cost} pts</span>
        `;
        container.appendChild(div);
    });
}

function loadFragmentSelector() {
    const container = document.getElementById('fragment-selector');
    if (!container) return;
    
    container.innerHTML = '<div class="unit-selector">';
    
    gameData.fragments.forEach(fragment => {
        const isSelected = currentArmy.fragments.includes(fragment.name);
        container.innerHTML += `
            <div class="unit-option ${isSelected ? 'selected' : ''}" onclick="toggleFragment('${fragment.name}')">
                <span class="unit-name">💎 ${fragment.name}</span>
                <span class="unit-cost">${fragment.risk_instability}</span>
            </div>
        `;
    });
    
    container.innerHTML += '</div>';
}

function filterUnits(type) {
    document.querySelectorAll('#army-builder-page .filter-controls .filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    loadUnitSelector(type);
}

function updateSelectedCommander() {
    const select = document.getElementById('commander-select');
    const commander = gameData.commanders.find(c => c.name === select.value);
    currentArmy.commander = commander;
    
    const preview = document.getElementById('commander-preview');
    if (preview && commander) {
        preview.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: #0f3460; border-radius: 8px;">
                <strong>${commander.name}</strong> - ${commander.theme}
                <div class="stats-grid" style="margin-top: 0.5rem;">
                    <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">CMD</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">KNW</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">LDR</span></div>
                </div>
            </div>
        `;
    }
    
    updateArmyDisplay();
}

function selectEvolution(path) {
    currentArmy.evolution = path;
    document.querySelectorAll('#evolution-select .filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    const preview = document.getElementById('evolution-preview');
    if (preview && currentArmy.commander && currentArmy.commander.evolution_paths) {
        const evo = currentArmy.commander.evolution_paths[path];
        if (evo) {
            preview.innerHTML = `
                <div style="margin-top: 1rem; padding: 1rem; background: #0f3460; border-radius: 8px;">
                    <strong>${evo.name}</strong>
                    <p style="font-size: 0.9rem; margin: 0.5rem 0;">${evo.description}</p>
                </div>
            `;
        }
    }
    
    updateFragmentEffects();
}

function setPointsLimit(limit) {
    currentArmy.pointsLimit = limit;
    document.getElementById('points-limit').textContent = limit;
    
    document.querySelectorAll('#army-builder-page .card:nth-child(3) .filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    updateArmyDisplay();
}

function addUnitToArmy(unitName) {
    const existingIndex = currentArmy.units.findIndex(u => u.name === unitName);
    if (existingIndex >= 0) {
        currentArmy.units[existingIndex].quantity++;
    } else {
        const unit = gameData.units.find(u => u.name === unitName);
        currentArmy.units.push({ ...unit, quantity: 1 });
    }
    updateArmyDisplay();
}

function removeUnitFromArmy(unitName) {
    const existingIndex = currentArmy.units.findIndex(u => u.name === unitName);
    if (existingIndex >= 0) {
        if (currentArmy.units[existingIndex].quantity > 1) {
            currentArmy.units[existingIndex].quantity--;
        } else {
            currentArmy.units.splice(existingIndex, 1);
        }
    }
    updateArmyDisplay();
}

function toggleFragment(fragmentName) {
    const index = currentArmy.fragments.indexOf(fragmentName);
    if (index >= 0) {
        currentArmy.fragments.splice(index, 1);
    } else {
        currentArmy.fragments.push(fragmentName);
    }
    loadFragmentSelector();
    updateFragmentEffects();
}

function updateArmyDisplay() {
    // Calculate points
    const pointsUsed = currentArmy.units.reduce((sum, u) => sum + (u.points_cost * u.quantity), 0);
    
    // Update points display
    document.getElementById('points-used').textContent = pointsUsed;
    const percentage = Math.min((pointsUsed / currentArmy.pointsLimit) * 100, 100);
    document.getElementById('points-bar-fill').style.width = percentage + '%';
    
    const statusEl = document.getElementById('points-status');
    if (pointsUsed > currentArmy.pointsLimit) {
        statusEl.textContent = 'Over limit!';
        statusEl.style.color = '#f44336';
    } else if (pointsUsed === currentArmy.pointsLimit) {
        statusEl.textContent = 'Perfect!';
        statusEl.style.color = '#4caf50';
    } else {
        statusEl.textContent = `${currentArmy.pointsLimit - pointsUsed} points remaining`;
        statusEl.style.color = '#4fc3f7';
    }
    
    // Update commander display
    const cmdDisplay = document.getElementById('army-commander-display');
    if (cmdDisplay) {
        if (currentArmy.commander) {
            cmdDisplay.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>${currentArmy.commander.name}</strong></span>
                    ${currentArmy.evolution ? `<span class="tag tag-${currentArmy.evolution}">${currentArmy.evolution}</span>` : ''}
                </div>
            `;
        } else {
            cmdDisplay.innerHTML = '<p style="color: #888;">No commander selected</p>';
        }
    }
    
    // Update army list
    const armyList = document.getElementById('army-list');
    if (armyList) {
        if (currentArmy.units.length === 0) {
            armyList.innerHTML = '<p style="color: #888; text-align: center;">Add units to your army</p>';
        } else {
            armyList.innerHTML = currentArmy.units.map(unit => `
                <div class="army-item">
                    <div class="army-item-info">
                        <span class="army-item-qty">${unit.quantity}</span>
                        <span>${unit.name}</span>
                    </div>
                    <div class="army-item-controls">
                        <span style="color: #e94560; margin-right: 0.5rem;">${unit.points_cost * unit.quantity} pts</span>
                        <button class="qty-btn" onclick="removeUnitFromArmy('${unit.name}')">-</button>
                        <button class="qty-btn" onclick="addUnitToArmy('${unit.name}')">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateFragmentEffects() {
    const container = document.getElementById('active-fragment-effects');
    if (!container) return;
    
    if (currentArmy.fragments.length === 0) {
        container.innerHTML = '<p style="color: #888; font-size: 0.9rem;">Select fragments to see their effects.</p>';
        return;
    }
    
    container.innerHTML = currentArmy.fragments.map(fragName => {
        const fragment = gameData.fragments.find(f => f.name === fragName);
        if (!fragment) return '';
        
        return `
            <div style="margin-bottom: 0.75rem; padding: 0.5rem; background: #0f3460; border-radius: 6px;">
                <strong>💎 ${fragment.name}</strong>
                <p style="font-size: 0.85rem; margin: 0.25rem 0;">${fragment.effects}</p>
                ${currentArmy.evolution ? `<p style="font-size: 0.8rem; color: #4fc3f7;">${fragment.interaction_evolution}</p>` : ''}
            </div>
        `;
    }).join('');
}

function saveArmy() {
    const armyData = JSON.stringify(currentArmy);
    localStorage.setItem('savedArmy', armyData);
    alert('Army saved successfully!');
}

function loadArmy() {
    const saved = localStorage.getItem('savedArmy');
    if (saved) {
        currentArmy = JSON.parse(saved);
        
        // Update UI
        const select = document.getElementById('commander-select');
        if (select && currentArmy.commander) {
            select.value = currentArmy.commander.name;
            updateSelectedCommander();
        }
        
        document.getElementById('points-limit').textContent = currentArmy.pointsLimit;
        loadFragmentSelector();
        updateArmyDisplay();
        updateFragmentEffects();
        
        alert('Army loaded successfully!');
    } else {
        alert('No saved army found.');
    }
}

function clearArmy() {
    if (confirm('Are you sure you want to clear your army?')) {
        currentArmy = {
            commander: null,
            evolution: null,
            units: [],
            fragments: [],
            pointsLimit: 200
        };
        
        document.getElementById('commander-select').value = '';
        document.getElementById('commander-preview').innerHTML = '';
        document.getElementById('evolution-preview').innerHTML = '';
        loadFragmentSelector();
        updateArmyDisplay();
        updateFragmentEffects();
    }
}

// ==========================================
// Campaign Tracker Functions
// ==========================================

function initCampaignTracker() {
    // Populate commander select
    const commanderSelect = document.getElementById('campaign-commander-select');
    if (commanderSelect) {
        gameData.commanders.forEach(c => {
            const option = document.createElement('option');
            option.value = c.name;
            option.textContent = `${c.name}${c.title ? ' - ' + c.title : ''}`;
            commanderSelect.appendChild(option);
        });
    }
    
    // Load saved campaign if exists
    const saved = localStorage.getItem('campaignState');
    if (saved) {
        campaignState = JSON.parse(saved);
        if (commanderSelect && campaignState.commander) {
            commanderSelect.value = campaignState.commander.name;
        }
        updateCampaignUI();
    }
}

function updateCampaignCommander() {
    const select = document.getElementById('campaign-commander-select');
    const commander = gameData.commanders.find(c => c.name === select.value);
    campaignState.commander = commander;
    campaignState.level = 1;
    campaignState.xp = 0;
    campaignState.skillChoices = [];
    campaignState.evolution = null;
    
    updateCampaignUI();
}

function updateCampaignUI() {
    // Update commander info
    const infoEl = document.getElementById('campaign-commander-info');
    if (infoEl && campaignState.commander) {
        infoEl.innerHTML = `
            <p><strong>${campaignState.commander.name}</strong> - ${campaignState.commander.title || ''}</p>
            <p style="font-size: 0.9rem; color: #888;">${campaignState.commander.theme}</p>
        `;
    }
    
    // Update level and XP
    document.getElementById('commander-level').textContent = campaignState.level;
    const xpToLevel = campaignState.level * 100;
    document.getElementById('xp-to-level').textContent = xpToLevel;
    document.getElementById('current-xp').textContent = campaignState.xp;
    document.getElementById('xp-bar-fill').style.width = (campaignState.xp / xpToLevel * 100) + '%';
    
    // Update battle stats
    const victories = campaignState.battles.filter(b => b.result === 'victory').length;
    const defeats = campaignState.battles.filter(b => b.result === 'defeat').length;
    const draws = campaignState.battles.filter(b => b.result === 'draw').length;
    const totalXP = campaignState.battles.reduce((sum, b) => sum + b.xp, 0);
    
    document.getElementById('battles-won').textContent = victories;
    document.getElementById('battles-lost').textContent = defeats;
    document.getElementById('battles-drawn').textContent = draws;
    document.getElementById('total-xp-earned').textContent = totalXP;
    
    // Update skill tree display
    updateSkillTreeDisplay();
    
    // Update battle log
    updateBattleLog();
    
    // Update path tendency
    updatePathTendency();
}

function updateSkillTreeDisplay() {
    const container = document.getElementById('skill-tree-display');
    if (!container || !campaignState.commander) {
        container.innerHTML = '<p style="color: #888; text-align: center;">Select a commander to view their skill tree.</p>';
        return;
    }
    
    const tree = campaignState.commander.skill_tree;
    if (!tree || typeof tree !== 'object') return;
    
    let html = `
        <div class="skill-level" style="font-weight: bold; color: #888;">
            <div>LVL</div>
            <div style="text-align: center; color: #2196f3;">Knowledge</div>
            <div style="text-align: center; color: #f44336;">Chaos</div>
            <div style="text-align: center; color: #4caf50;">Tactical</div>
        </div>
    `;
    
    for (let level = 2; level <= 10; level++) {
        const levelKey = `level_${level}`;
        if (tree[levelKey]) {
            const skills = tree[levelKey];
            const choice = campaignState.skillChoices.find(c => c.level === level);
            const isUnlocked = level <= campaignState.level + 1;
            
            html += `
                <div class="skill-level">
                    <div class="skill-level-num" style="${level <= campaignState.level ? '' : 'opacity: 0.5;'}">${level}</div>
                    <div class="skill-option skill-knowledge" style="${choice?.path === 'knowledge' ? 'border: 2px solid #fff;' : ''} ${!isUnlocked ? 'opacity: 0.5;' : ''}" 
                         ${isUnlocked && !choice ? `onclick="selectSkill(${level}, 'knowledge')"` : ''}>
                        ${skills.knowledge || '-'}
                        ${choice?.path === 'knowledge' ? ' ✓' : ''}
                    </div>
                    <div class="skill-option skill-chaos" style="${choice?.path === 'chaos' ? 'border: 2px solid #fff;' : ''} ${!isUnlocked ? 'opacity: 0.5;' : ''}"
                         ${isUnlocked && !choice ? `onclick="selectSkill(${level}, 'chaos')"` : ''}>
                        ${skills.chaos || '-'}
                        ${choice?.path === 'chaos' ? ' ✓' : ''}
                    </div>
                    <div class="skill-option skill-tactical" style="${choice?.path === 'tactical' ? 'border: 2px solid #fff;' : ''} ${!isUnlocked ? 'opacity: 0.5;' : ''}"
                         ${isUnlocked && !choice ? `onclick="selectSkill(${level}, 'tactical')"` : ''}>
                        ${skills.tactical || '-'}
                        ${choice?.path === 'tactical' ? ' ✓' : ''}
                    </div>
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
}

function selectSkill(level, path) {
    if (level > campaignState.level + 1) {
        alert('You need to reach the previous level first!');
        return;
    }
    
    const existingChoice = campaignState.skillChoices.find(c => c.level === level);
    if (existingChoice) {
        alert('You have already chosen a skill for this level!');
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
    campaignState.skillChoices.forEach(c => {
        pathCounts[c.path]++;
    });
    
    const el = document.getElementById('path-tendency');
    if (!el) return;
    
    const maxPath = Object.entries(pathCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['none', 0]);
    
    if (maxPath[1] === 0) {
        el.textContent = 'Undetermined';
        el.style.color = '#888';
    } else {
        el.textContent = `Leaning ${maxPath[0].charAt(0).toUpperCase() + maxPath[0].slice(1)} (${maxPath[1]} choices)`;
        el.style.color = maxPath[0] === 'knowledge' ? '#2196f3' : maxPath[0] === 'chaos' ? '#f44336' : '#4caf50';
    }
}

function determineEvolution() {
    const pathCounts = { knowledge: 0, chaos: 0, tactical: 0 };
    campaignState.skillChoices.forEach(c => {
        pathCounts[c.path]++;
    });
    
    const sorted = Object.entries(pathCounts).sort((a, b) => b[1] - a[1]);
    
    if (sorted[0][1] > sorted[1][1]) {
        campaignState.evolution = sorted[0][0];
    } else {
        campaignState.evolution = 'hybrid';
    }
    
    alert(`Your commander has evolved into: ${campaignState.commander.evolution_paths[campaignState.evolution]?.name || campaignState.evolution}!`);
}

function addXP(amount) {
    campaignState.xp += amount;
    const xpToLevel = campaignState.level * 100;
    
    while (campaignState.xp >= xpToLevel && campaignState.level < 10) {
        campaignState.xp -= xpToLevel;
        campaignState.level++;
        alert(`Level Up! Your commander is now level ${campaignState.level}!`);
    }
    
    if (campaignState.level >= 10) {
        campaignState.level = 10;
        campaignState.xp = 0;
    }
    
    updateCampaignUI();
    saveCampaign();
}

function recordBattle(result) {
    const xpRewards = { victory: 100, defeat: 25, draw: 50 };
    const xp = xpRewards[result];
    
    campaignState.battles.push({
        date: new Date().toLocaleDateString(),
        result,
        xp
    });
    
    addXP(xp);
}

function updateBattleLog() {
    const container = document.getElementById('battle-log');
    if (!container) return;
    
    if (campaignState.battles.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center;">No battles recorded yet. Start your campaign!</p>';
        return;
    }
    
    container.innerHTML = campaignState.battles.slice().reverse().map(battle => `
        <div class="battle-entry battle-${battle.result}">
            <div style="display: flex; justify-content: space-between;">
                <span>${battle.result.charAt(0).toUpperCase() + battle.result.slice(1)}</span>
                <span style="color: #888;">${battle.date}</span>
            </div>
            <div style="color: #4fc3f7;">+${battle.xp} XP</div>
        </div>
    `).join('');
}

function saveCampaign() {
    localStorage.setItem('campaignState', JSON.stringify(campaignState));
}

function loadCampaign() {
    const saved = localStorage.getItem('campaignState');
    if (saved) {
        campaignState = JSON.parse(saved);
        const select = document.getElementById('campaign-commander-select');
        if (select && campaignState.commander) {
            select.value = campaignState.commander.name;
        }
        updateCampaignUI();
        alert('Campaign loaded successfully!');
    } else {
        alert('No saved campaign found.');
    }
}

function newCampaign() {
    if (confirm('Are you sure you want to start a new campaign? This will clear your current progress.')) {
        campaignState = {
            commander: null,
            level: 1,
            xp: 0,
            skillChoices: [],
            evolution: null,
            battles: [],
            fragments: [],
            persistentUnits: []
        };
        
        document.getElementById('campaign-commander-select').value = '';
        localStorage.removeItem('campaignState');
        updateCampaignUI();
    }
}

function openFragmentSelector() {
    const fragment = prompt('Enter fragment name to add:');
    if (fragment && gameData.fragments.find(f => f.name.toLowerCase() === fragment.toLowerCase())) {
        campaignState.fragments.push(fragment);
        updateCampaignUI();
        saveCampaign();
    } else if (fragment) {
        alert('Fragment not found. Please enter a valid fragment name.');
    }
}

function addPersistentUnit() {
    const unitName = prompt('Enter unit name to track:');
    if (unitName && gameData.units.find(u => u.name.toLowerCase() === unitName.toLowerCase())) {
        campaignState.persistentUnits.push({
            name: unitName,
            status: 'healthy',
            buffs: [],
            mutations: []
        });
        updateCampaignUI();
        saveCampaign();
    } else if (unitName) {
        alert('Unit not found. Please enter a valid unit name.');
    }
}
