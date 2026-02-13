// ==========================================
// War Crier Universe Wiki - Application Logic
// ==========================================

// Global State
let currentArmy = {
  commander: null,
  evolution: null,
  units: [],
  fragments: [],
  pointsLimit: 200,
};

let campaignState = {
  commander: null,
  level: 1,
  xp: 0,
  skillChoices: [],
  evolution: null,
  battles: [],
  fragments: [],
  persistentUnits: [],
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
});

// ==========================================
// Embedded Page Templates
// ==========================================
const pageTemplates = {
  home: `<div id="home-page" class="page active">
    <h2>Welcome to the War Crier Universe</h2>
    <p class="intro-text">This is the central hub for all information related to the War Crier Universe wargame. Explore the factions, commanders, units, and the mysterious fragments that shape the battlefield.</p>
    <div class="dashboard-grid">
        <div class="dashboard-card" onclick="showPage('factions')">
            <div class="dashboard-icon">⚔️</div>
            <h3>Factions</h3>
            <p>Explore the armies of the War Crier Universe</p>
            <span class="dashboard-count" id="faction-count"></span>
        </div>
        <div class="dashboard-card" onclick="showPage('commanders')">
            <div class="dashboard-icon">👑</div>
            <h3>Commanders</h3>
            <p>Unique leaders with RPG progression</p>
            <span class="dashboard-count" id="commander-count"></span>
        </div>
        <div class="dashboard-card" onclick="showPage('units')">
            <div class="dashboard-icon">🛡️</div>
            <h3>Units</h3>
            <p>Standard troops & war machines</p>
            <span class="dashboard-count" id="unit-count"></span>
        </div>
        <div class="dashboard-card" onclick="showPage('fragments')">
            <div class="dashboard-icon">💎</div>
            <h3>Fragments</h3>
            <p>Mysterious power sources with risk/reward</p>
            <span class="dashboard-count" id="fragment-count"></span>
        </div>
        <div class="dashboard-card" onclick="showPage('gameplay')">
            <div class="dashboard-icon">📖</div>
            <h3>Gameplay</h3>
            <p>Rules, mechanics & strategy guides</p>
            <span class="dashboard-count">Full Rulebook</span>
        </div>
        <div class="dashboard-card" onclick="showPage('army-builder')">
            <div class="dashboard-icon">🏗️</div>
            <h3>Army Builder</h3>
            <p>Build and calculate your army lists</p>
            <span class="dashboard-count">Interactive Tool</span>
        </div>
        <div class="dashboard-card" onclick="showPage('campaign-tracker')">
            <div class="dashboard-icon">📊</div>
            <h3>Campaign Tracker</h3>
            <p>Track XP, levels & battle outcomes</p>
            <span class="dashboard-count">Multi-Day Campaigns</span>
        </div>
        <div class="dashboard-card" onclick="showPage('sample-gameplay')">
            <div class="dashboard-icon">⚡</div>
            <h3>Sample Battle</h3>
            <p>Learn by example with tutorial battles</p>
            <span class="dashboard-count">Clockwork Nexus</span>
        </div>
    </div>
    <div class="card updates-card">
        <h3>📢 Latest Updates</h3>
        <ul class="update-list">
            <li><span class="update-date">Feb 2026</span> Veilbound Shogunate faction with 13 commanders fully documented</li>
            <li><span class="update-date">Feb 2026</span> Iron Dominion faction fully documented with 11 commanders</li>
            <li><span class="update-date">Feb 2026</span> 100+ units including war machines across both factions</li>
            <li><span class="update-date">Feb 2026</span> Fragment catalog with 15 unique fragments</li>
            <li><span class="update-date">Feb 2026</span> Commander RPG progression with branching skill trees</li>
            <li><span class="update-date">Feb 2026</span> Interactive Army Builder & Campaign Tracker tools</li>
        </ul>
    </div>
    <div class="card">
        <h3>🌍 The War Crier Universe</h3>
        <p>In a world where clockwork precision meets cosmic fragment energy, armies clash across steam-shrouded battlefields. The <strong>Iron Dominion</strong> fields human/clockwork hybrids wielding fragment-infused technology, while the <strong>Veilbound Shogunate</strong> channels eldritch cosmic rituals through masked samurai warriors.</p>
        <p>Every commander faces a fundamental choice: embrace <strong>Knowledge</strong> for controlled, precise power, or surrender to <strong>Chaos</strong> for devastating but unpredictable effects.</p>
    </div>
    <div class="quick-ref-grid">
        <div class="card quick-ref-card">
            <h4>🎯 Battle Sizes</h4>
            <ul>
                <li><strong>Skirmish:</strong> 50–100 points</li>
                <li><strong>Medium:</strong> 200–300 points</li>
                <li><strong>Epic:</strong> 500+ points</li>
            </ul>
        </div>
        <div class="card quick-ref-card">
            <h4>⚡ Evolution Paths</h4>
            <ul>
                <li><strong>Knowledge:</strong> Precise control</li>
                <li><strong>Chaos:</strong> High risk/reward</li>
                <li><strong>Hybrid:</strong> Balanced approach</li>
            </ul>
        </div>
        <div class="card quick-ref-card">
            <h4>🔧 Unit Types</h4>
            <ul>
                <li>Infantry • Cavalry • Support</li>
                <li>Specialist • Artillery • Scout</li>
                <li>War Machines (10+ points)</li>
            </ul>
        </div>
    </div>
    <div class="card">
        <h3>🏷️ Tagging System</h3>
        <div class="tag-legend">
            <span class="tag tag-knowledge">Knowledge-heavy</span>
            <span class="tag tag-chaos">Chaos-heavy</span>
            <span class="tag tag-hybrid">Hybrid</span>
            <span class="tag tag-warmachine">War Machine</span>
            <span class="tag tag-elite">Elite</span>
            <span class="tag tag-support">Support</span>
            <span class="tag tag-experimental">Experimental</span>
        </div>
    </div>
</div>`,

  factions: `<div id="factions-page" class="page active"><h2>Factions</h2><div id="faction-list"></div></div>`,

  commanders: `<div id="commanders-page" class="page active"><h2>Commanders</h2><div id="commander-list"></div></div>`,

  units: `<div id="units-page" class="page active"><h2>Units</h2><div id="unit-list"></div></div>`,

  fragments: `<div id="fragments-page" class="page active"><h2>Fragments</h2><div id="fragment-list"></div></div>`,

  gameplay: `<div id="gameplay-page" class="page active">
    <h2>📜 Core Rules — War Crier Universe</h2>
    <p style="color: #aaa;">Version ${gameData.rules ? gameData.rules.version : "1.0"} &nbsp;|&nbsp; Dice + Deck Building &nbsp;|&nbsp; Measurement in Inches</p>
    
    <div id="rules-nav" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        <button class="filter-btn active" onclick="showRulesSection('all', this)">All Sections</button>
        <button class="filter-btn" onclick="showRulesSection('army', this)">Army Building</button>
        <button class="filter-btn" onclick="showRulesSection('turn', this)">Turn Structure</button>
        <button class="filter-btn" onclick="showRulesSection('combat', this)">Combat</button>
        <button class="filter-btn" onclick="showRulesSection('cards', this)">Cards & Decks</button>
        <button class="filter-btn" onclick="showRulesSection('factionmech', this)">Faction Mechanics</button>
        <button class="filter-btn" onclick="showRulesSection('victory', this)">Victory</button>
        <button class="filter-btn" onclick="showRulesSection('stats', this)">Stat Reference</button>
    </div>
    <div id="rules-content"></div>
</div>`,

  "sample-gameplay": `<div id="sample-gameplay-page" class="page active">
    <h2>Sample Gameplay: Skirmish at the Clockwork Nexus</h2>
    <div class="card">
        <h3>Scenario Overview</h3>
        <ul><li><strong>Battle Size:</strong> 150 points per player</li><li><strong>Player Commander:</strong> Lord Calculon (Knowledge Evolution)</li><li><strong>Opponent Commander:</strong> Lady Cogsworth (Chaos Evolution)</li></ul>
    </div>
    <div class="card">
        <h3>Step 1 — Army Setup</h3>
        <h4>Lord Calculon's Army (Iron Dominion, 150 points)</h4>
        <p><strong>Commander:</strong> Lord Calculon (Level 10, Knowledge Evolution)</p>
        <p><strong>Units:</strong></p>
        <ul><li>10 Clockwork Infantry (20 pts)</li><li>5 Elite Vanguard (20 pts)</li><li>4 Gearwright Engineers (12 pts)</li><li>6 Steam Artillery Crew (30 pts)</li><li>5 Clockwork Cavalry (20 pts)</li></ul>
        <p><strong>War Machines:</strong> 1 Clockwork Titan (12 pts), 1 Steam Colossus (10 pts)</p>
        <p><strong>Fragments:</strong> Core Fragment, Overclock Node</p>
        <hr>
        <h4>Lady Cogsworth's Army (Iron Dominion, 150 points)</h4>
        <p><strong>Commander:</strong> Lady Cogsworth (Level 10, Chaos Evolution)</p>
        <p><strong>Units:</strong></p>
        <ul><li>8 Clockwork Cavalry (32 pts)</li><li>6 Steam Recon Flyers (18 pts)</li><li>5 Aether Infused Soldiers (15 pts)</li><li>4 Experimental Constructs (16 pts)</li></ul>
        <p><strong>War Machines:</strong> 1 Chrono Walker (14 pts), 1 Arcane Steam Golem (11 pts)</p>
        <p><strong>Fragments:</strong> Fragment Swarm, Reality Shard</p>
    </div>
    <div class="card">
        <h3>Step 2 — Tactical Layer Setup</h3>
        <p><strong>Battlefield:</strong> Industrial Clockwork Nexus</p>
        <p><strong>Terrain Hazards:</strong> Steam vents, conveyor belts, fragment shards</p>
        <h4>Commander Cards Available</h4>
        <ul><li><strong>Calculon:</strong> Coordinated Strike (precision attacks), Overclocked Engines (war machine efficiency)</li><li><strong>Cogsworth:</strong> Unstable Skirmisher (random AoE), Fragment Conduit (warped battlefield)</li></ul>
    </div>
    <div class="card">
        <h3>Step 3 — Sample Turn Sequence</h3>
        <h4>Turn 1</h4>
        <ul><li>Calculon deploys Clockwork Infantry at central corridor; activates Core Fragment (stable +1 attack)</li><li>Lady Cogsworth moves Cavalry flanking; triggers Fragment Swarm, causing unpredictable AoE nearby</li></ul>
        <h4>Turn 2</h4>
        <ul><li>Calculon uses Overclock Node → Clockwork Titan attacks enemy rear; damage +2</li><li>Lady Cogsworth activates Reality Shard → terrain shift causes Calculon's Cavalry to lose movement this turn</li></ul>
        <h4>Turn 3 — Tactical Zoom-In</h4>
        <ul><li>Calculon's Elite Vanguard confronts Cogsworth's Experimental Constructs</li><li><strong>Fragment interaction:</strong> Knowledge Evolution → precise bonus → constructs take extra damage</li><li><strong>Cogsworth's Chaos Evolution:</strong> Experimental Constructs trigger random AoE → minor friendly collateral</li></ul>
        <h4>Turn 4</h4>
        <ul><li>Clockwork Titan smashes through enemy lines, AoE hit on 2 units</li><li>Chrono Walker warps activation order; Calculon's Engineers delayed</li></ul>
        <h4>Turn 5</h4>
        <ul><li>Calculon coordinates Cavalry + Vanguard using Coordinated Strike card → double attacks</li><li>Cogsworth uses Unstable Skirmisher → Fragment interaction boosts Cavalry speed</li></ul>
    </div>
    <div class="card">
        <h3>Step 4 — Outcome</h3>
        <ul><li>Calculon's Knowledge evolution provided stable, predictable damage</li><li>Cogsworth's Chaos evolution introduced high-risk battlefield changes</li><li>Fragments directly influenced battle flow</li><li>Tactical zoom-ins added emergent RPG-style gameplay</li><li>Multi-day campaign: surviving units retain buffs/damage, XP awarded</li></ul>
    </div>
    <div class="card">
        <h3>Step 5 — Lessons</h3>
        <ul><li><strong>Commander evolution matters:</strong> Knowledge favors control; Chaos favors risk/reward</li><li><strong>Fragment choice is strategic:</strong> Combining fragments amplifies effects but increases risk</li><li><strong>Unit selection:</strong> Align units with commander's style for maximum synergy</li><li><strong>Tactical zoom-ins:</strong> Elite units and fragment events can turn the tide</li><li><strong>Point scaling:</strong> Use the army builder to adjust for different battle sizes</li></ul>
    </div>
</div>`,

  "army-builder": `<div id="army-builder-page" class="page active">
    <h2>Army Builder</h2>
    <p>Build your army list, select your commander, and calculate points. Fragment effects are shown based on your commander's evolution path.</p>
    <div class="army-builder-container">
        <div class="army-panel">
            <div class="card"><h3>1. Select Commander</h3><select id="commander-select" class="commander-select" onchange="updateSelectedCommander()"><option value="">-- Choose a Commander --</option></select><div id="commander-preview"></div></div>
            <div class="card"><h3>2. Select Evolution Path</h3><div class="filter-controls" id="evolution-select"><button class="filter-btn" onclick="selectEvolution('knowledge')">Knowledge</button><button class="filter-btn" onclick="selectEvolution('chaos')">Chaos</button><button class="filter-btn" onclick="selectEvolution('hybrid')">Hybrid</button></div><div id="evolution-preview"></div></div>
            <div class="card"><h3>3. Battle Size</h3><div class="filter-controls"><button class="filter-btn" onclick="setPointsLimit(100)">Skirmish (100)</button><button class="filter-btn active" onclick="setPointsLimit(200)">Medium (200)</button><button class="filter-btn" onclick="setPointsLimit(300)">Large (300)</button><button class="filter-btn" onclick="setPointsLimit(500)">Epic (500)</button></div></div>
            <div class="card"><h3>4. Select Units</h3><div class="filter-controls"><button class="filter-btn active" onclick="filterUnits('all')">All</button><button class="filter-btn" onclick="filterUnits('Infantry')">Infantry</button><button class="filter-btn" onclick="filterUnits('Cavalry')">Cavalry</button><button class="filter-btn" onclick="filterUnits('Support')">Support</button><button class="filter-btn" onclick="filterUnits('Specialist')">Specialist</button><button class="filter-btn" onclick="filterUnits('Artillery')">Artillery</button><button class="filter-btn" onclick="filterUnits('Scout')">Scout</button><button class="filter-btn" onclick="filterUnits('War Machine')">War Machines</button></div><div id="unit-selector" class="unit-selector"></div></div>
            <div class="card"><h3>5. Assign Fragments</h3><div id="fragment-selector"></div><div id="fragment-effects"></div></div>
        </div>
        <div>
            <div class="points-display"><div>Points Used</div><div class="points-total" id="points-used">0</div><div class="points-limit">/ <span id="points-limit">200</span></div><div class="points-bar"><div class="points-fill" id="points-bar-fill" style="width: 0%"></div></div><div id="points-status" style="color: #4caf50">Ready for battle!</div></div>
            <div class="army-panel" style="margin-top: 1rem;"><h4>Your Army</h4><div id="army-commander-display"></div><hr style="border-color: #0f3460;"><div id="army-list" class="army-list"><p style="color: #888; text-align: center;">Add units to your army</p></div></div>
            <div class="army-panel" style="margin-top: 1rem;"><h4>Army Actions</h4><button class="btn" onclick="saveArmy()" style="width: 100%; margin-bottom: 0.5rem;">💾 Save Army</button><button class="btn btn-secondary" onclick="loadArmy()" style="width: 100%; margin-bottom: 0.5rem;">📂 Load Army</button><button class="btn btn-secondary" onclick="clearArmy()" style="width: 100%;">🗑️ Clear Army</button></div>
            <div class="army-panel" style="margin-top: 1rem;"><h4>Fragment Effects Summary</h4><div id="active-fragment-effects"><p style="color: #888; font-size: 0.9rem;">Select fragments to see their effects based on your evolution path.</p></div></div>
        </div>
    </div>
</div>`,

  "campaign-tracker": `<div id="campaign-tracker-page" class="page active">
    <h2>Campaign Tracker</h2>
    <p>Track your commander's progression, XP, unit persistence, and fragment interactions across multiple battles.</p>
    <div class="campaign-header"><div><select id="campaign-commander-select" class="commander-select" onchange="updateCampaignCommander()"><option value="">-- Select Your Commander --</option></select></div><div class="campaign-actions"><button class="btn" onclick="saveCampaign()">💾 Save Campaign</button><button class="btn btn-secondary" onclick="loadCampaign()">📂 Load Campaign</button><button class="btn btn-secondary" onclick="newCampaign()">🆕 New Campaign</button></div></div>
    <div class="dashboard-grid">
        <div class="card"><h3>Commander Status</h3><div id="campaign-commander-info"><p style="color: #888;">Select a commander to start tracking.</p></div><div class="level-display">Level <span id="commander-level">1</span></div><div class="xp-container"><div class="xp-bar"><div class="xp-fill" id="xp-bar-fill" style="width: 0%"></div><span class="xp-text"><span id="current-xp">0</span> / <span id="xp-to-level">100</span> XP</span></div></div><div style="margin-top: 1rem;"><button class="btn" onclick="addXP(25)" style="font-size: 0.8rem;">+25 XP</button><button class="btn" onclick="addXP(50)" style="font-size: 0.8rem;">+50 XP</button><button class="btn" onclick="addXP(100)" style="font-size: 0.8rem;">+100 XP</button></div></div>
        <div class="card"><h3>Evolution Path</h3><div id="evolution-path-tracker"><p style="color: #888;">Your skill choices will be tracked here as you level up.</p></div><div id="current-evolution-path" style="margin-top: 1rem;"><strong>Current Path:</strong> <span id="path-tendency" style="color: #888;">Undetermined</span></div></div>
        <div class="card"><h3>Campaign Statistics</h3><div class="stats-grid"><div class="stat-item"><span class="stat-value" id="battles-won">0</span><span class="stat-label">Victories</span></div><div class="stat-item"><span class="stat-value" id="battles-lost">0</span><span class="stat-label">Defeats</span></div><div class="stat-item"><span class="stat-value" id="battles-drawn">0</span><span class="stat-label">Draws</span></div><div class="stat-item"><span class="stat-value" id="total-xp-earned">0</span><span class="stat-label">Total XP</span></div></div></div>
        <div class="card"><h3>Active Fragments</h3><div id="active-fragments" class="fragment-tracker"><p style="color: #888;">No fragments collected yet.</p></div><div style="margin-top: 1rem;"><button class="btn btn-secondary" onclick="openFragmentSelector()" style="width: 100%;">+ Add Fragment</button></div></div>
    </div>
    <div class="card"><h3>Skill Tree Progression</h3><div id="skill-tree-display" class="skill-tree"><p style="color: #888; text-align: center;">Select a commander to view their skill tree.</p></div></div>
    <div class="card"><h3>Battle Log</h3><div style="margin-bottom: 1rem;"><button class="btn" onclick="recordBattle('victory')">🏆 Record Victory</button><button class="btn btn-secondary" onclick="recordBattle('defeat')">💀 Record Defeat</button><button class="btn btn-secondary" onclick="recordBattle('draw')">🤝 Record Draw</button></div><div id="battle-log" class="battle-log"><p style="color: #888; text-align: center;">No battles recorded yet. Start your campaign!</p></div></div>
    <div class="card"><h3>Unit Persistence Tracker</h3><p style="color: #888; font-size: 0.9rem;">Track damage, buffs, and mutations that persist across battles.</p><div id="persistent-units"><table style="width: 100%; border-collapse: collapse;"><thead><tr style="border-bottom: 2px solid #0f3460;"><th style="text-align: left; padding: 0.5rem;">Unit Name</th><th style="text-align: center; padding: 0.5rem;">Status</th><th style="text-align: center; padding: 0.5rem;">Buffs</th><th style="text-align: center; padding: 0.5rem;">Mutations</th><th style="text-align: center; padding: 0.5rem;">Actions</th></tr></thead><tbody id="unit-tracker-body"><tr><td colspan="5" style="text-align: center; padding: 1rem; color: #888;">Add units to track their campaign progression</td></tr></tbody></table></div><div style="margin-top: 1rem;"><button class="btn btn-secondary" onclick="addPersistentUnit()">+ Add Unit to Tracker</button></div></div>
    <div id="levelup-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center;"><div class="card" style="max-width: 600px; margin: 2rem;"><h3>🎉 Level Up!</h3><p>Your commander has reached a new level! Choose your skill upgrade:</p><div id="levelup-choices" class="evolution-grid"></div></div></div>
</div>`,
};

// ==========================================
// Page Navigation
// ==========================================

function showPage(pageId) {
  const html = pageTemplates[pageId];
  if (!html) {
    document.getElementById("content").innerHTML =
      '<div class="card"><h2>Page not found</h2><p>The requested page does not exist.</p></div>';
    return;
  }
  document.getElementById("content").innerHTML = html;

  // Ensure the page div is visible (CSS hides .page without .active)
  const pageDiv = document.getElementById("content").querySelector(".page");
  if (pageDiv) pageDiv.classList.add("active");

  // Update home page counts dynamically
  if (pageId === "home") {
    const fc = document.getElementById("faction-count");
    const cc = document.getElementById("commander-count");
    const uc = document.getElementById("unit-count");
    const frc = document.getElementById("fragment-count");
    if (fc)
      fc.textContent =
        gameData.factions.length +
        " Faction" +
        (gameData.factions.length !== 1 ? "s" : "");
    if (cc) cc.textContent = gameData.commanders.length + " Commanders";
    if (uc) uc.textContent = gameData.units.length + " Units";
    if (frc) frc.textContent = gameData.fragments.length + " Fragments";
  }

  // Initialize page-specific content
  switch (pageId) {
    case "factions":
      loadFactions();
      break;
    case "commanders":
      loadCommanders();
      break;
    case "units":
      loadUnits();
      break;
    case "fragments":
      loadFragments();
      break;
    case "army-builder":
      initArmyBuilder();
      break;
    case "campaign-tracker":
      initCampaignTracker();
      break;
    case "gameplay":
      loadRulesPage();
      break;
  }
}

// ==========================================
// Rules / Gameplay Page
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
        </div>`;

    html += `<div class="card">
            <h3>🏔️ Terrain Types</h3>
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

  el.innerHTML = html;
}

// ==========================================
// Search Functionality
// ==========================================

function search() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const allContent = [
    ...gameData.factions,
    ...gameData.commanders,
    ...gameData.units,
    ...gameData.fragments,
  ];

  const results = allContent.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      (item.theme && item.theme.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.playstyle && item.playstyle.toLowerCase().includes(query)) ||
      (item.role && item.role.toLowerCase().includes(query)),
  );

  const contentEl = document.getElementById("content");
  contentEl.innerHTML = "<h2>Search Results</h2>";

  if (results.length > 0) {
    results.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      let content = `<h3>${item.name}</h3>`;
      if (item.type) content += `<p><strong>Type:</strong> ${item.type}</p>`;
      if (item.theme) content += `<p><strong>Theme:</strong> ${item.theme}</p>`;
      if (item.playstyle)
        content += `<p><strong>Playstyle:</strong> ${item.playstyle}</p>`;
      if (item.description) content += `<p>${item.description}</p>`;
      if (item.effects)
        content += `<p><strong>Effects:</strong> ${item.effects}</p>`;
      card.innerHTML = content;
      contentEl.appendChild(card);
    });
  } else {
    contentEl.innerHTML += "<p>No results found.</p>";
  }
}

// ==========================================
// Faction Loading
// ==========================================

function loadFactions() {
  const contentEl = document.getElementById("faction-list");
  if (!contentEl) return;

  const factionIcons = {
    "iron-dominion": "⚙️",
    "veilbound-shogunate": "⛩️",
  };
  const factionColors = {
    "iron-dominion": "#e94560",
    "veilbound-shogunate": "#8b5cf6",
  };

  contentEl.innerHTML =
    '<div class="faction-overview-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem;"></div>';
  const grid = contentEl.querySelector(".faction-overview-grid");

  gameData.factions.forEach((faction) => {
    const commanders = getCommandersByFaction(faction.id);
    const units = getUnitsByFaction(faction.id);
    const warMachines = units.filter((u) => u.type === "War Machine");
    const standardUnits = units.filter((u) => u.type !== "War Machine");
    const icon = factionIcons[faction.id] || "⚔️";
    const color = factionColors[faction.id] || "#e94560";

    const card = document.createElement("div");
    card.className = "card";
    card.style.cssText = `border-top: 4px solid ${color}; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;`;
    card.onmouseenter = () => {
      card.style.transform = "translateY(-4px)";
      card.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
    };
    card.onmouseleave = () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    };
    card.onclick = () => showFactionDetail(faction.id);

    card.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="font-size: 3rem;">${icon}</div>
                <h3 style="color: ${color}; margin: 0.5rem 0;">${faction.name}</h3>
            </div>
            <p style="font-style: italic; opacity: 0.85; font-size: 0.9rem;">${faction.theme}</p>
            <p style="font-size: 0.9rem;">${faction.flavor_text.substring(0, 200)}...</p>
            <div style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <div style="text-align: center; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${color};">${commanders.length}</div>
                    <div style="font-size: 0.8rem; color: #888;">Commanders</div>
                </div>
                <div style="text-align: center; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${color};">${standardUnits.length}</div>
                    <div style="font-size: 0.8rem; color: #888;">Units</div>
                </div>
                <div style="text-align: center; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${color};">${warMachines.length}</div>
                    <div style="font-size: 0.8rem; color: #888;">War Machines</div>
                </div>
                <div style="text-align: center; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${color};">${faction.faction_bonuses ? faction.faction_bonuses.length : 0}</div>
                    <div style="font-size: 0.8rem; color: #888;">Bonuses</div>
                </div>
            </div>
            <div style="margin-top: 1rem; text-align: center;">
                <span class="btn" style="display: inline-block; font-size: 0.9rem;">Explore ${faction.name} →</span>
            </div>
        `;
    grid.appendChild(card);
  });
}

// ==========================================
// Individual Faction Detail Page
// ==========================================

function showFactionDetail(factionId) {
  const faction = getFactionById(factionId);
  if (!faction) return;

  const factionCommanders = getCommandersByFaction(faction.id);
  const factionUnits = getUnitsByFaction(faction.id).filter(
    (u) => u.type !== "War Machine",
  );
  const factionWarMachines = getUnitsByFaction(faction.id).filter(
    (u) => u.type === "War Machine",
  );

  const factionIcons = { "iron-dominion": "⚙️", "veilbound-shogunate": "⛩️" };
  const factionColors = {
    "iron-dominion": "#e94560",
    "veilbound-shogunate": "#8b5cf6",
  };
  const icon = factionIcons[faction.id] || "⚔️";
  const color = factionColors[faction.id] || "#e94560";

  const contentEl = document.getElementById("content");
  contentEl.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <button class="btn btn-secondary" onclick="showPage('factions')" style="font-size: 0.85rem;">← All Factions</button>
        </div>

        <div class="card" style="border-top: 4px solid ${color};">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <span style="font-size: 3rem;">${icon}</span>
                <div>
                    <h2 style="margin: 0; color: ${color};">${faction.name}</h2>
                    <p style="margin: 0.25rem 0 0 0; opacity: 0.7;">${faction.theme}</p>
                </div>
            </div>
            <p>${faction.flavor_text}</p>
            ${faction.motif_description ? `<p style="font-style: italic; opacity: 0.85;">${faction.motif_description}</p>` : ""}
            <p><strong>Core Philosophy:</strong> ${faction.core_philosophy}</p>
        </div>

        <!-- Quick Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="card" style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; font-weight: bold; color: ${color};">${factionCommanders.length}</div>
                <div style="font-size: 0.85rem; color: #888;">Commanders</div>
            </div>
            <div class="card" style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; font-weight: bold; color: ${color};">${factionUnits.length}</div>
                <div style="font-size: 0.85rem; color: #888;">Units</div>
            </div>
            <div class="card" style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; font-weight: bold; color: ${color};">${factionWarMachines.length}</div>
                <div style="font-size: 0.85rem; color: #888;">War Machines</div>
            </div>
            <div class="card" style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; font-weight: bold; color: ${color};">${faction.faction_bonuses ? faction.faction_bonuses.length : 0}</div>
                <div style="font-size: 0.85rem; color: #888;">Bonuses</div>
            </div>
        </div>

        <!-- Faction Bonuses & Playstyle -->
        <div class="card">
            ${
              faction.faction_bonuses
                ? `
            <h3 style="color: ${color};">Faction Bonuses</h3>
            <ul>
                ${faction.faction_bonuses.map((b) => `<li>${b}</li>`).join("")}
            </ul>
            `
                : ""
            }
            ${faction.playstyle_notes ? `<p><strong>Playstyle Notes:</strong> ${faction.playstyle_notes}</p>` : ""}
        </div>

        <!-- Worldview & Philosophy -->
        ${
          faction.worldview ||
          faction.eldritch_relationship ||
          faction.political_structure
            ? `
        <div class="card">
            ${
              faction.worldview
                ? `
            <h3 style="color: ${color};">Worldview</h3>
            <ul>
                ${faction.worldview.map((w) => `<li>${w}</li>`).join("")}
            </ul>
            `
                : ""
            }
            ${
              faction.eldritch_relationship
                ? `
            <h4>Relationship to Eldritch Forces</h4>
            <p>${faction.eldritch_relationship}</p>
            `
                : ""
            }
            ${
              faction.political_structure
                ? `
            <h4>Political Structure</h4>
            <p>${faction.political_structure}</p>
            `
                : ""
            }
        </div>
        `
            : ""
        }

        <!-- Three Veils -->
        ${
          faction.three_veils
            ? `
        <div class="card" style="border-left: 3px solid #8b5cf6;">
            <h3 style="color: #a78bfa;">⛩️ The Three Veils Doctrine</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.three_veils.overview}</p>
            ${faction.three_veils.veils
              .map(
                (v, i) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c4b5fd;">${["1️⃣", "2️⃣", "3️⃣"][i]} ${v.name}</h5>
                <p><strong>Concept:</strong> <em>${v.concept}</em></p>
                <p><strong>Implications for Soldiers:</strong></p>
                <ul>${v.implications.map((im) => `<li>${im}</li>`).join("")}</ul>
                <p><strong>Battlefield Mechanics:</strong></p>
                <ul>${v.mechanics.map((m) => `<li>${m}</li>`).join("")}</ul>
                <p><strong>Visual Symbol:</strong> ${v.symbol}</p>
            </div>
            `,
              )
              .join("")}
            <div style="margin-top: 1rem;">
                <h5 style="color: #c4b5fd;">Doctrine in Practice</h5>
                <ul>
                    <li><strong>Training:</strong> ${faction.three_veils.doctrine_in_practice.training}</li>
                    <li><strong>Hierarchy Integration:</strong> ${faction.three_veils.doctrine_in_practice.hierarchy_integration}</li>
                    <li><strong>Combat Philosophy:</strong> ${faction.three_veils.doctrine_in_practice.combat_philosophy}</li>
                </ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.three_veils.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Iron Doctrine -->
        ${
          faction.iron_doctrine
            ? `
        <div class="card" style="border-left: 3px solid #e94560;">
            <h3 style="color: #e94560;">⚙️ The Iron Doctrine</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.iron_doctrine.overview}</p>
            ${faction.iron_doctrine.pillars
              .map(
                (p, i) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #f87171;">${["1️⃣", "2️⃣", "3️⃣"][i]} ${p.name}</h5>
                <p><strong>Concept:</strong> <em>${p.concept}</em></p>
                <p><strong>Implications:</strong></p>
                <ul>${p.implications.map((im) => `<li>${im}</li>`).join("")}</ul>
                <p><strong>Battlefield Mechanics:</strong></p>
                <ul>${p.mechanics.map((m) => `<li>${m}</li>`).join("")}</ul>
                <p><strong>Symbol:</strong> ${p.symbol}</p>
            </div>
            `,
              )
              .join("")}
            <div style="margin-top: 1rem;">
                <h5 style="color: #f87171;">Doctrine in Practice</h5>
                <ul>
                    <li><strong>Training:</strong> ${faction.iron_doctrine.doctrine_in_practice.training}</li>
                    <li><strong>Hierarchy Integration:</strong> ${faction.iron_doctrine.doctrine_in_practice.hierarchy_integration}</li>
                    <li><strong>Combat Philosophy:</strong> ${faction.iron_doctrine.doctrine_in_practice.combat_philosophy}</li>
                </ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.iron_doctrine.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Hierarchy -->
        ${
          faction.hierarchy
            ? `
        <div class="card" style="border-left: 3px solid #dc2626;">
            <h3 style="color: #f87171;">🏯 Faction Hierarchy & Titles</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.hierarchy.overview}</p>
            ${faction.hierarchy.ranks
              .map(
                (r) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #fca5a5;">${r.title}</h5>
                <p><strong>Role:</strong> ${r.role}</p>
                <p><strong>Responsibilities:</strong></p>
                <ul>${r.responsibilities.map((x) => `<li>${x}</li>`).join("")}</ul>
                <p><strong>Characteristics:</strong></p>
                <ul>${r.characteristics.map((x) => `<li>${x}</li>`).join("")}</ul>
            </div>
            `,
              )
              .join("")}
            <div style="margin-top: 1.25rem;">
                <h5 style="color: #fca5a5;">Titles & Honorifics</h5>
                <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.9rem;">
                    <thead><tr style="border-bottom: 2px solid rgba(220,38,38,0.3);">
                        <th style="text-align: left; padding: 0.4rem;">Title</th>
                        <th style="text-align: left; padding: 0.4rem;">Significance</th>
                        <th style="text-align: left; padding: 0.4rem;">Notes</th>
                    </tr></thead>
                    <tbody>
                        ${faction.hierarchy.titles_table
                          .map(
                            (
                              t,
                            ) => `<tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 0.4rem; font-weight: bold;">${t.title}</td>
                            <td style="padding: 0.4rem;">${t.significance}</td>
                            <td style="padding: 0.4rem; font-style: italic;">${t.notes}</td>
                        </tr>`,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
            <div style="margin-top: 1rem;">
                <h5 style="color: #fca5a5;">Hierarchy Notes</h5>
                <ul>${faction.hierarchy.hierarchy_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.hierarchy.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Shrouded Shogun -->
        ${
          faction.shrouded_shogun
            ? `
        <div class="card" style="border-left: 3px solid #e2e8f0;">
            <h3 style="color: #e2e8f0;">\u2694\ufe0f ${faction.shrouded_shogun.title}</h3>
            <p><strong>Role:</strong> ${faction.shrouded_shogun.role} &mdash; <em>${faction.shrouded_shogun.faction_rank}</em></p>
            <p><strong>Known As:</strong> ${faction.shrouded_shogun.aliases.map((a) => `<em>&ldquo;${a}&rdquo;</em>`).join(", ")}</p>
            <p style="font-style: italic; opacity: 0.85; margin-top: 0.5rem;">${faction.shrouded_shogun.summary}</p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Appearance</h5>
                <ul>${faction.shrouded_shogun.appearance.map((a) => `<li>${a}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Personality & Command Style</h5>
                <ul>${faction.shrouded_shogun.personality.map((p) => `<li><strong>${p.trait}:</strong> ${p.description}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Abilities & Powers</h5>
                ${faction.shrouded_shogun.abilities
                  .map(
                    (ab) => `
                <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
                    <strong style="color: #f1f5f9;">${ab.name}</strong>
                    <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">${ab.description}</p>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Role in the Faction</h5>
                <ul>${faction.shrouded_shogun.faction_role.map((r) => `<li><strong>${r.area}:</strong> ${r.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Lore Notes</h5>
                <ul>${faction.shrouded_shogun.lore_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.shrouded_shogun.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Arch-Fabricator -->
        ${
          faction.arch_fabricator
            ? `
        <div class="card" style="border-left: 3px solid #e2e8f0;">
            <h3 style="color: #e2e8f0;">⚙️ ${faction.arch_fabricator.title}</h3>
            <p><strong>Role:</strong> ${faction.arch_fabricator.role} &mdash; <em>${faction.arch_fabricator.faction_rank}</em></p>
            <p><strong>Known As:</strong> ${faction.arch_fabricator.aliases.map((a) => `<em>&ldquo;${a}&rdquo;</em>`).join(", ")}</p>
            <p style="font-style: italic; opacity: 0.85; margin-top: 0.5rem;">${faction.arch_fabricator.summary}</p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Appearance</h5>
                <ul>${faction.arch_fabricator.appearance.map((a) => `<li>${a}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Personality & Command Style</h5>
                <ul>${faction.arch_fabricator.personality.map((p) => `<li><strong>${p.trait}:</strong> ${p.description}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Abilities & Powers</h5>
                ${faction.arch_fabricator.abilities
                  .map(
                    (ab) => `
                <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
                    <strong style="color: #f1f5f9;">${ab.name}</strong>
                    <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">${ab.description}</p>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Role in the Faction</h5>
                <ul>${faction.arch_fabricator.faction_role.map((r) => `<li><strong>${r.area}:</strong> ${r.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Lore Notes</h5>
                <ul>${faction.arch_fabricator.lore_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.arch_fabricator.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Transformation Stages -->
        ${
          faction.transformation_stages
            ? `
        <div class="card" style="border-left: 3px solid #10b981;">
            <h3 style="color: #6ee7b7;">\ud83d\udd04 Transformation Stages</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.transformation_stages.overview}</p>
            ${faction.transformation_stages.stages
              .map(
                (s) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #a7f3d0;">Stage ${s.stage_number} \u2014 ${s.name}</h5>
                <p style="opacity: 0.9;">${s.overview}</p>
                <p><strong>Physical Characteristics:</strong></p>
                <ul>${s.physical.map((p) => `<li>${p}</li>`).join("")}</ul>
                <p><strong>Abilities & Mechanics:</strong></p>
                <ul>${s.abilities.map((a) => `<li>${a}</li>`).join("")}</ul>
                <p><strong>Behavior & Tactics:</strong></p>
                <ul>${s.behavior.map((b) => `<li>${b}</li>`).join("")}</ul>
            </div>
            `,
              )
              .join("")}
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #a7f3d0;">Progression Notes</h5>
                <ul>${faction.transformation_stages.progression_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.transformation_stages.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Augmentation Tiers -->
        ${
          faction.augmentation_tiers
            ? `
        <div class="card" style="border-left: 3px solid #10b981;">
            <h3 style="color: #6ee7b7;">🔧 Augmentation Tiers</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.augmentation_tiers.overview}</p>
            ${faction.augmentation_tiers.stages
              .map(
                (s) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #a7f3d0;">Tier ${s.stage_number} — ${s.name}</h5>
                <p style="opacity: 0.9;">${s.overview}</p>
                <p><strong>Physical Characteristics:</strong></p>
                <ul>${s.physical.map((p) => `<li>${p}</li>`).join("")}</ul>
                <p><strong>Abilities & Mechanics:</strong></p>
                <ul>${s.abilities.map((a) => `<li>${a}</li>`).join("")}</ul>
                <p><strong>Behavior & Tactics:</strong></p>
                <ul>${s.behavior.map((b) => `<li>${b}</li>`).join("")}</ul>
            </div>
            `,
              )
              .join("")}
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #a7f3d0;">Progression Notes</h5>
                <ul>${faction.augmentation_tiers.progression_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.augmentation_tiers.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Military Doctrine -->
        ${
          faction.military_doctrine
            ? `
        <div class="card" style="border-left: 3px solid #f59e0b;">
            <h3 style="color: #fbbf24;">\u2694\ufe0f Military Doctrine & Battlefield Behavior</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.military_doctrine.overview}</p>
            <div style="margin-top: 1rem;">
                <h4 style="color: #fcd34d;">Core Principles</h4>
                ${faction.military_doctrine.core_principles
                  .map(
                    (p) => `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #fde68a;">${p.name}</strong>
                    <ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1.25rem;">
                <h4 style="color: #fcd34d;">Battlefield Behavior</h4>
                ${faction.military_doctrine.battlefield_behavior
                  .map(
                    (b) => `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #fde68a;">${b.name}</strong>
                    <ul>${b.details.map((d) => `<li>${d}</li>`).join("")}</ul>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #fcd34d;">Strategic Notes</h5>
                <ul>${faction.military_doctrine.strategic_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.military_doctrine.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- War Machines Lore -->
        ${
          faction.war_machines_lore
            ? `
        <div class="card" style="border-left: 3px solid #3b82f6;">
            <h3 style="color: #93c5fd;">\ud83c\udfef War Machines / Titans</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.war_machines_lore.overview}</p>
            <div style="margin-top: 1rem;">
                <h4 style="color: #bfdbfe;">General Characteristics</h4>
                <ul>${faction.war_machines_lore.general_characteristics.map((c) => `<li><strong>${c.trait}:</strong> ${c.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem;">
                <h4 style="color: #bfdbfe;">Tactical Role</h4>
                <ul>${faction.war_machines_lore.tactical_role.map((r) => `<li>${r}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.war_machines_lore.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Signature Weapons -->
        ${
          faction.signature_weapons
            ? `
        <div class="card" style="border-left: 3px solid #ec4899;">
            <h3 style="color: #f9a8d4;">\ud83d\udde1\ufe0f Signature Weapons</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.signature_weapons.overview}</p>
            <div style="margin-top: 1rem;">
                <h4 style="color: #fbcfe8;">Core Weapon Traits</h4>
                <ul>${faction.signature_weapons.core_traits.map((c) => `<li><strong>${c.trait}:</strong> ${c.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem;">
                <h4 style="color: #fbcfe8;">Notable Weapons</h4>
                ${faction.signature_weapons.weapons
                  .map(
                    (w) => `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #fda4af;">${w.name}</strong> <span style="opacity: 0.7; font-size: 0.85rem;">\u2014 ${w.type}</span>
                    <p style="margin: 0.3rem 0 0 0;"><strong>Wielder:</strong> ${w.wielder}</p>
                    <p style="margin: 0.2rem 0 0 0;"><strong>Properties:</strong> ${w.properties}</p>
                    <p style="margin: 0.2rem 0 0 0; font-style: italic; opacity: 0.8;"><strong>Lore:</strong> ${w.lore}</p>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #fbcfe8;">Tactical Notes</h5>
                <ul>${faction.signature_weapons.tactical_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.signature_weapons.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Cosmic Entity -->
        ${
          faction.cosmic_entity
            ? `
        <div class="card" style="border-left: 3px solid #6366f1;">
            <h3 style="color: #a5b4fc;">\ud83c\udf0c The Cosmic Entity They Serve</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.cosmic_entity.overview}</p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Names & Titles</h5>
                <p><strong>Primary Name:</strong> <em>${faction.cosmic_entity.primary_name}</em></p>
                <p><strong>Ritual Aliases:</strong> ${faction.cosmic_entity.aliases.map((a) => `<em>&ldquo;${a}&rdquo;</em>`).join(", ")}</p>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Nature & Essence</h5>
                <ul>${faction.cosmic_entity.nature.map((n) => `<li><strong>${n.trait}:</strong> ${n.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem;">
                <h5 style="color: #c7d2fe;">Relationship with the Shogunate</h5>
                ${faction.cosmic_entity.relationship
                  .map(
                    (r) => `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #e0e7ff;">${r.aspect}</strong>
                    <ul>${r.details.map((d) => `<li>${d}</li>`).join("")}</ul>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Lore Notes</h5>
                <ul>${faction.cosmic_entity.lore_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Influence on Faction Philosophy</h5>
                <ul>${faction.cosmic_entity.influence_on_philosophy.map((p) => `<li>${p}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.cosmic_entity.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Fragment Source -->
        ${
          faction.fragment_source
            ? `
        <div class="card" style="border-left: 3px solid #6366f1;">
            <h3 style="color: #a5b4fc;">⚡ The Source of Fragment Power</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.fragment_source.overview}</p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Names & Titles</h5>
                <p><strong>Primary Name:</strong> <em>${faction.fragment_source.primary_name}</em></p>
                <p><strong>Aliases:</strong> ${faction.fragment_source.aliases.map((a) => `<em>&ldquo;${a}&rdquo;</em>`).join(", ")}</p>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Nature & Essence</h5>
                <ul>${faction.fragment_source.nature.map((n) => `<li><strong>${n.trait}:</strong> ${n.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem;">
                <h5 style="color: #c7d2fe;">Relationship with the Dominion</h5>
                ${faction.fragment_source.relationship
                  .map(
                    (r) => `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #e0e7ff;">${r.aspect}</strong>
                    <ul>${r.details.map((d) => `<li>${d}</li>`).join("")}</ul>
                </div>
                `,
                  )
                  .join("")}
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Lore Notes</h5>
                <ul>${faction.fragment_source.lore_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #c7d2fe;">Influence on Faction Philosophy</h5>
                <ul>${faction.fragment_source.influence_on_philosophy.map((p) => `<li>${p}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.fragment_source.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Historical Background -->
        ${
          faction.historical_background
            ? `
        <div class="card" style="border-left: 3px solid #d4a574;">
            <h3 style="color: #d4a574;">&#9776; Historical Background</h3>
            <h4>Origins</h4>
            <p>${faction.historical_background.origins}</p>
            <h4>Rise to Power</h4>
            <p>${faction.historical_background.rise_to_power}</p>
            <h4>Major Conflicts</h4>
            ${faction.historical_background.major_conflicts
              .map(
                (c) => `
                <div style="background: rgba(212,165,116,0.08); padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
                    <strong style="color: #d4a574;">${c.name}</strong>
                    <p style="margin: 0.25rem 0 0 0;">${c.description}</p>
                </div>
            `,
              )
              .join("")}
        </div>
        `
            : ""
        }

        <!-- Culture & Philosophy -->
        ${
          faction.culture_philosophy
            ? `
        <div class="card" style="border-left: 3px solid #e0c097;">
            <h3 style="color: #e0c097;">&#9775; Culture & Philosophy</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.culture_philosophy.overview}</p>
            ${
              faction.culture_philosophy.three_veils_expanded
                ? `
            <h4>The Three Veils (Expanded)</h4>
            ${faction.culture_philosophy.three_veils_expanded
              .map(
                (v) => `
                <div style="background: rgba(224,192,151,0.08); padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
                    <strong style="color: #e0c097;">${v.veil}</strong>
                    <p style="margin: 0.25rem 0 0 0;">${v.focus}</p>
                </div>
            `,
              )
              .join("")}
            `
                : ""
            }
            ${
              faction.culture_philosophy.three_pillars_expanded
                ? `
            <h4>The Three Pillars (Expanded)</h4>
            ${faction.culture_philosophy.three_pillars_expanded
              .map(
                (v) => `
                <div style="background: rgba(224,192,151,0.08); padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
                    <strong style="color: #e0c097;">${v.pillar}</strong>
                    <p style="margin: 0.25rem 0 0 0;">${v.focus}</p>
                </div>
            `,
              )
              .join("")}
            `
                : ""
            }
            ${
              faction.culture_philosophy.ritual_practices
                ? `
            <h4>Ritual Practices</h4>
            <ul>${faction.culture_philosophy.ritual_practices.map((r) => `<li>${r}</li>`).join("")}</ul>
            `
                : ""
            }
            ${
              faction.culture_philosophy.cultural_practices
                ? `
            <h4>Cultural Practices</h4>
            <ul>${faction.culture_philosophy.cultural_practices.map((r) => `<li>${r}</li>`).join("")}</ul>
            `
                : ""
            }
            <h4>Symbols</h4>
            <ul>${faction.culture_philosophy.symbols.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        `
            : ""
        }

        <!-- Military Traditions -->
        ${
          faction.military_traditions
            ? `
        <div class="card" style="border-left: 3px solid #c49b6e;">
            <h3 style="color: #c49b6e;">&#9876; Military Doctrine & Traditions</h3>
            <h4>Battlefield Philosophy</h4>
            <ul>${faction.military_traditions.battlefield_philosophy.map((p) => `<li>${p}</li>`).join("")}</ul>
            ${
              faction.military_traditions.ritual_warfare
                ? `
            <h4>Ritual Warfare</h4>
            <ul>${faction.military_traditions.ritual_warfare.map((r) => `<li>${r}</li>`).join("")}</ul>
            `
                : ""
            }
            ${
              faction.military_traditions.forge_rites
                ? `
            <h4>Forge Rites</h4>
            <ul>${faction.military_traditions.forge_rites.map((r) => `<li>${r}</li>`).join("")}</ul>
            `
                : ""
            }
            <h4>Unit Naming Conventions</h4>
            <ul>${faction.military_traditions.unit_naming_conventions.map((n) => `<li>${n}</li>`).join("")}</ul>
        </div>
        `
            : ""
        }

        <!-- Geography & Strongholds -->
        ${
          faction.geography_strongholds
            ? `
        <div class="card" style="border-left: 3px solid #7ab89e;">
            <h3 style="color: #7ab89e;">&#9968; Geography & Strongholds</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.geography_strongholds.overview}</p>
            <h4>Sacred Sites</h4>
            ${faction.geography_strongholds.sacred_sites
              .map(
                (s) => `
                <div style="background: rgba(122,184,158,0.08); padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
                    <strong style="color: #7ab89e;">${s.name}</strong>
                    <p style="margin: 0.25rem 0 0 0;">${s.description}</p>
                </div>
            `,
              )
              .join("")}
            <h4>Battlefield Features</h4>
            <ul>${faction.geography_strongholds.battlefield_features.map((f) => `<li>${f}</li>`).join("")}</ul>
        </div>
        `
            : ""
        }

        <!-- Unique Phenomena -->
        ${
          faction.unique_phenomena
            ? `
        <div class="card" style="border-left: 3px solid #b07acc;">
            <h3 style="color: #b07acc;">&#10052; Unique Phenomena</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.unique_phenomena.overview}</p>
            ${faction.unique_phenomena.phenomena
              .map(
                (p) => `
                <div style="background: rgba(176,122,204,0.08); padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.75rem;">
                    <strong style="color: #b07acc; font-size: 1.05em;">${p.name}</strong>
                    <p style="margin: 0.25rem 0 0.25rem 0;">${p.description}</p>
                    <p style="margin: 0; font-size: 0.9em; color: #b07acc;"><strong>Gameplay Effect:</strong> ${p.gameplay_effect}</p>
                </div>
            `,
              )
              .join("")}
        </div>
        `
            : ""
        }

        <!-- Faction Keywords -->
        ${
          faction.faction_keywords
            ? `
        <div class="card">
            <h3 style="color: ${color};">Faction Keywords</h3>
            <div style="margin-top: 0.5rem;">
                ${faction.faction_keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Commanders Roster -->
        <div class="card">
            <h3 style="color: ${color};">👑 Commanders (${factionCommanders.length})</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.75rem; margin-top: 1rem;">
                ${factionCommanders
                  .map(
                    (c) => `
                <div style="padding: 0.75rem; background: rgba(255,255,255,0.03); border-left: 3px solid ${color}; border-radius: 4px; cursor: pointer;" onclick="showCommander('${c.name}')">
                    <strong style="color: #e8e8e8;">${c.name}</strong>
                    ${c.title ? `<span style="opacity: 0.6; font-size: 0.85rem;"> — ${c.title}</span>` : ""}
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; opacity: 0.7;">${c.theme}</p>
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>

        <!-- Units Roster -->
        <div class="card">
            <h3 style="color: ${color};">🛡️ Standard Units (${factionUnits.length})</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.5rem; margin-top: 1rem;">
                ${factionUnits
                  .map(
                    (u) => `
                <div style="padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="showUnit('${u.name}')">
                    <span>${getUnitTypeIcon(u.type)} ${u.name}</span>
                    <span style="color: #e94560; font-weight: bold; font-size: 0.85rem;">${u.points_cost} pts</span>
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>

        <!-- War Machines -->
        <div class="card">
            <h3 style="color: ${color};">🤖 War Machines (${factionWarMachines.length})</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.5rem; margin-top: 1rem;">
                ${factionWarMachines
                  .map(
                    (u) => `
                <div style="padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="showUnit('${u.name}')">
                    <span>🤖 ${u.name}</span>
                    <span style="color: #e94560; font-weight: bold; font-size: 0.85rem;">${u.points_cost} pts</span>
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>

        <div style="margin-top: 1.5rem;">
            <button class="btn btn-secondary" onclick="showPage('factions')">← All Factions</button>
        </div>
    `;
}

// ==========================================
// Commander Loading & Display
// ==========================================

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

    card.innerHTML = `
            <h3><a href="#" onclick="showCommander('${commander.name}')">${commander.name}</a> ${commander.title ? "- " + commander.title : ""}</h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : "Unknown"}</p>
            <p><strong>Theme:</strong> ${commander.theme}</p>
            <p><strong>Playstyle:</strong> ${commander.playstyle}</p>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">Command</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">Knowledge</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">Leadership</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Agility}</span><span class="stat-label">Agility</span></div>
                <div class="stat-item"><span class="stat-value">${commander.base_stats.Health}</span><span class="stat-label">Health</span></div>
            </div>
            ${tags ? `<div style="margin-top: 1rem;">${tags}</div>` : ""}
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
      // Old format (level_2 through level_10 keys)
      for (let level = 2; level <= 10; level++) {
        const levelKey = `level_${level}`;
        if (commander.skill_tree[levelKey]) {
          const skills = commander.skill_tree[levelKey];
          skillTreeHTML += `
                        <div class="skill-level">
                            <div class="skill-level-num">${level}</div>
                            <div class="skill-option skill-knowledge">${skills.knowledge || "-"}</div>
                            <div class="skill-option skill-chaos">${skills.chaos || "-"}</div>
                            <div class="skill-option skill-tactical">${skills.tactical || "-"}</div>
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

  // Generate starting deck HTML
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

  contentEl.innerHTML = `
        <div class="card">
            <h2>${commander.name} ${commander.title ? "- " + commander.title : ""}</h2>
            <p><strong>Faction:</strong> <a href="#" onclick="showFactionDetail('${commander.faction}')">${faction ? faction.name : "Unknown"}</a></p>
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
                ${commander.signature_units.map((u) => `<li><a href="#" onclick="showUnit('${u}')">${u}</a></li>`).join("")}
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
                <button class="btn btn-secondary" onclick="showFactionDetail('${commander.faction}')">← ${faction ? faction.name : "Faction"}</button>
                <button class="btn" onclick="showPage('commanders')">← All Commanders</button>
            </div>
        </div>
    `;
}

// ==========================================
// Unit Loading & Display
// ==========================================

function loadUnits() {
  const contentEl = document.getElementById("unit-list");
  if (!contentEl) return;

  // Add filter controls
  const filterDiv = document.createElement("div");
  filterDiv.className = "filter-controls";
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

  renderUnitsList("all");
}

function filterUnitsList(type, btn) {
  // Update active button
  document
    .querySelectorAll(".filter-controls .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderUnitsList(type);
}

function renderUnitsList(filterType) {
  const contentEl = document.getElementById("unit-list");
  if (!contentEl) return;

  contentEl.innerHTML = "";

  const filteredUnits =
    filterType === "all"
      ? gameData.units
      : gameData.units.filter((u) => u.type === filterType);

  filteredUnits.forEach((unit) => {
    const faction = getFactionById(unit.faction);
    const card = document.createElement("div");
    card.className = "card";

    const typeClass = `type-${unit.type.toLowerCase().replace(" ", "")}`;
    const s = unit.stats || {};
    const hasStats = s.ATK !== undefined;

    card.innerHTML = `
            <h3>
                <span class="unit-type-icon ${typeClass}">${getUnitTypeIcon(unit.type)}</span>
                <a href="#" onclick="showUnit('${unit.name}')">${unit.name}</a>
            </h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : "Unknown"}</p>
            <p><strong>Type:</strong> ${unit.type} | <strong>Points:</strong> <span style="color: #e94560; font-weight: bold;">${unit.points_cost}</span>${unit.ritual_flow ? ` | <strong>Ritual Flow:</strong> <span style="color: #a78bfa; font-weight: bold;">+${unit.ritual_flow}</span>` : ""}</p>
            ${
              hasStats
                ? `<div style="display: flex; gap: 0.3rem; margin: 0.5rem 0; flex-wrap: wrap;">
                <span class="stat-pip" title="Attack Dice" style="background: rgba(233,69,96,0.15); border: 1px solid rgba(233,69,96,0.3); border-radius: 4px; padding: 2px 6px; font-size: 0.75rem;">⚔️${s.ATK}</span>
                <span class="stat-pip" title="Defense" style="background: rgba(233,69,96,0.15); border: 1px solid rgba(233,69,96,0.3); border-radius: 4px; padding: 2px 6px; font-size: 0.75rem;">🛡️${s.DEF}+</span>
                <span class="stat-pip" title="Hit Points" style="background: rgba(233,69,96,0.15); border: 1px solid rgba(233,69,96,0.3); border-radius: 4px; padding: 2px 6px; font-size: 0.75rem;">❤️${s.HP}</span>
                <span class="stat-pip" title="Movement" style="background: rgba(233,69,96,0.15); border: 1px solid rgba(233,69,96,0.3); border-radius: 4px; padding: 2px 6px; font-size: 0.75rem;">🏃${s.MOV}"</span>
                <span class="stat-pip" title="Range" style="background: rgba(233,69,96,0.15); border: 1px solid rgba(233,69,96,0.3); border-radius: 4px; padding: 2px 6px; font-size: 0.75rem;">🎯${s.RNG === 1 ? "Melee" : s.RNG + '"'}</span>
                <span class="stat-pip" title="Morale" style="background: rgba(233,69,96,0.15); border: 1px solid rgba(233,69,96,0.3); border-radius: 4px; padding: 2px 6px; font-size: 0.75rem;">🧠${s.MOR}</span>
            </div>`
                : ""
            }
            <p><strong>Role:</strong> ${unit.role}</p>
            ${unit.special && unit.special.length > 0 ? `<p style="font-size: 0.8rem; color: #a78bfa;"><strong>Special:</strong> ${unit.special.map((s) => s.split("(")[0].trim()).join(", ")}</p>` : ""}
        `;
    contentEl.appendChild(card);
  });
}

function getUnitTypeIcon(type) {
  const icons = {
    Infantry: "⚔️",
    Cavalry: "🐎",
    Support: "🔧",
    Specialist: "⭐",
    Artillery: "💣",
    Scout: "👁️",
    "War Machine": "🤖",
  };
  return icons[type] || "•";
}

function showUnit(name) {
  const unit = gameData.units.find((u) => u.name === name);
  if (!unit) return;

  const faction = getFactionById(unit.faction);
  const contentEl = document.getElementById("content");

  // Find commanders with this as signature unit
  const signatureCommanders = gameData.commanders.filter(
    (c) => c.signature_units && c.signature_units.includes(unit.name),
  );

  const typeClass = `type-${unit.type.toLowerCase().replace(" ", "")}`;

  // Build stat block
  const stats = unit.stats || {};
  const statLabels = [
    { key: "ATK", label: "ATK", icon: "⚔️", desc: "Attack dice rolled" },
    {
      key: "DEF",
      label: "DEF",
      icon: "🛡️",
      desc: "Target number to hit (roll ≥)",
    },
    { key: "HP", label: "HP", icon: "❤️", desc: "Hit points" },
    { key: "MOV", label: "MOV", icon: "🏃", desc: "Movement (inches)" },
    { key: "RNG", label: "RNG", icon: "🎯", desc: "Range (inches, 1=melee)" },
    { key: "MOR", label: "MOR", icon: "🧠", desc: "Morale (2d6 roll-under)" },
  ];
  const statBlockHTML =
    stats.ATK !== undefined
      ? `
        <div class="stat-block" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; margin: 1.5rem 0; text-align: center;">
            ${statLabels
              .map(
                (s) => `
                <div style="background: rgba(233,69,96,0.1); border: 1px solid rgba(233,69,96,0.3); border-radius: 8px; padding: 0.75rem 0.25rem;" title="${s.desc}">
                    <div style="font-size: 0.7rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px;">${s.icon} ${s.label}</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #e94560;">${stats[s.key]}</div>
                </div>
            `,
              )
              .join("")}
        </div>
    `
      : "";

  // Build special abilities
  const specialHTML =
    unit.special && unit.special.length > 0
      ? `
        <div style="margin: 1rem 0; padding: 1rem; background: rgba(167,139,250,0.08); border-left: 3px solid #a78bfa; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #a78bfa;">⚡ Special Abilities</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${unit.special
                  .map((s) => {
                    const parts = s.match(/^([^(]+)(\(.+\))?$/);
                    const name = parts ? parts[1].trim() : s;
                    const desc = parts && parts[2] ? parts[2] : "";
                    return `<li style="margin-bottom: 0.5rem; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <strong style="color: #e94560;">${name}</strong> ${desc ? `<span style="color: #ccc;">${desc}</span>` : ""}
                    </li>`;
                  })
                  .join("")}
            </ul>
        </div>
    `
      : "";

  contentEl.innerHTML = `
        <div class="card">
            <h2>
                <span class="unit-type-icon ${typeClass}" style="font-size: 2rem;">${getUnitTypeIcon(unit.type)}</span>
                ${unit.name}
            </h2>
            <p><strong>Faction:</strong> <a href="#" onclick="showFactionDetail('${unit.faction}')">${faction ? faction.name : "Unknown"}</a></p>
            <p><strong>Type:</strong> ${unit.type} &nbsp;|&nbsp; <strong>Points:</strong> <span style="color: #e94560; font-size: 1.3rem; font-weight: bold;">${unit.points_cost}</span>
            ${unit.ritual_flow ? ` &nbsp;|&nbsp; <strong>Ritual Flow:</strong> <span style="color: #a78bfa; font-weight: bold;">+${unit.ritual_flow}</span>` : ""}</p>
            
            ${statBlockHTML}
            
            <p><strong>Role / Purpose:</strong> ${unit.role}</p>
            
            ${specialHTML}
            
            <p><strong>Fragment Interactions:</strong> ${unit.fragment_interactions}</p>
            <p><em>${unit.flavor_text}</em></p>
            
            ${
              signatureCommanders.length > 0
                ? `
            <h3>Signature Unit For</h3>
            <ul>
                ${signatureCommanders.map((c) => `<li><a href="#" onclick="showCommander('${c.name}')">${c.name}</a></li>`).join("")}
            </ul>
            `
                : ""
            }
            
            <div style="margin-top: 2rem; display: flex; gap: 0.75rem;">
                <button class="btn btn-secondary" onclick="showFactionDetail('${unit.faction}')">← ${faction ? faction.name : "Faction"}</button>
                <button class="btn" onclick="showPage('units')">← All Units</button>
            </div>
        </div>
    `;
}

// ==========================================
// Fragment Loading & Display
// ==========================================

function loadFragments() {
  const contentEl = document.getElementById("fragment-list");
  if (!contentEl) return;

  gameData.fragments.forEach((fragment) => {
    const faction = getFactionById(fragment.faction);
    const card = document.createElement("div");
    card.className = "card";

    const riskColor =
      {
        Low: "#4caf50",
        Medium: "#ff9800",
        High: "#f44336",
        "Very High": "#9c27b0",
      }[fragment.risk_instability] || "#888";

    card.innerHTML = `
            <h3>💎 ${fragment.name}</h3>
            <p><strong>Faction:</strong> ${faction ? faction.name : "Universal"}</p>
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
  const commanderSelect = document.getElementById("commander-select");
  if (commanderSelect) {
    gameData.commanders.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.name;
      option.textContent = `${c.name}${c.title ? " - " + c.title : ""}`;
      commanderSelect.appendChild(option);
    });
  }

  // Load units
  loadUnitSelector("all");

  // Load fragments
  loadFragmentSelector();

  // Update display
  updateArmyDisplay();
}

function loadUnitSelector(filterType) {
  const container = document.getElementById("unit-selector");
  if (!container) return;

  container.innerHTML = "";

  const filteredUnits =
    filterType === "all"
      ? gameData.units
      : gameData.units.filter((u) => u.type === filterType);

  filteredUnits.forEach((unit) => {
    const div = document.createElement("div");
    div.className = "unit-option";
    div.onclick = () => addUnitToArmy(unit.name);
    div.innerHTML = `
            <span class="unit-name">${unit.name}</span>
            <span class="unit-cost">${unit.points_cost} pts</span>
        `;
    container.appendChild(div);
  });
}

function loadFragmentSelector() {
  const container = document.getElementById("fragment-selector");
  if (!container) return;

  container.innerHTML = '<div class="unit-selector">';

  gameData.fragments.forEach((fragment) => {
    const isSelected = currentArmy.fragments.includes(fragment.name);
    container.innerHTML += `
            <div class="unit-option ${isSelected ? "selected" : ""}" onclick="toggleFragment('${fragment.name}')">
                <span class="unit-name">💎 ${fragment.name}</span>
                <span class="unit-cost">${fragment.risk_instability}</span>
            </div>
        `;
  });

  container.innerHTML += "</div>";
}

function filterUnits(type) {
  document
    .querySelectorAll("#army-builder-page .filter-controls .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
  loadUnitSelector(type);
}

function updateSelectedCommander() {
  const select = document.getElementById("commander-select");
  const commander = gameData.commanders.find((c) => c.name === select.value);
  currentArmy.commander = commander;

  const preview = document.getElementById("commander-preview");
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
  document
    .querySelectorAll("#evolution-select .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");

  const preview = document.getElementById("evolution-preview");
  if (
    preview &&
    currentArmy.commander &&
    currentArmy.commander.evolution_paths
  ) {
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
  document.getElementById("points-limit").textContent = limit;

  document
    .querySelectorAll("#army-builder-page .card:nth-child(3) .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");

  updateArmyDisplay();
}

function addUnitToArmy(unitName) {
  const existingIndex = currentArmy.units.findIndex((u) => u.name === unitName);
  if (existingIndex >= 0) {
    currentArmy.units[existingIndex].quantity++;
  } else {
    const unit = gameData.units.find((u) => u.name === unitName);
    currentArmy.units.push({ ...unit, quantity: 1 });
  }
  updateArmyDisplay();
}

function removeUnitFromArmy(unitName) {
  const existingIndex = currentArmy.units.findIndex((u) => u.name === unitName);
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
  const pointsUsed = currentArmy.units.reduce(
    (sum, u) => sum + u.points_cost * u.quantity,
    0,
  );

  // Update points display
  document.getElementById("points-used").textContent = pointsUsed;
  const percentage = Math.min(
    (pointsUsed / currentArmy.pointsLimit) * 100,
    100,
  );
  document.getElementById("points-bar-fill").style.width = percentage + "%";

  const statusEl = document.getElementById("points-status");
  if (pointsUsed > currentArmy.pointsLimit) {
    statusEl.textContent = "Over limit!";
    statusEl.style.color = "#f44336";
  } else if (pointsUsed === currentArmy.pointsLimit) {
    statusEl.textContent = "Perfect!";
    statusEl.style.color = "#4caf50";
  } else {
    statusEl.textContent = `${currentArmy.pointsLimit - pointsUsed} points remaining`;
    statusEl.style.color = "#4fc3f7";
  }

  // Update commander display
  const cmdDisplay = document.getElementById("army-commander-display");
  if (cmdDisplay) {
    if (currentArmy.commander) {
      cmdDisplay.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>${currentArmy.commander.name}</strong></span>
                    ${currentArmy.evolution ? `<span class="tag tag-${currentArmy.evolution}">${currentArmy.evolution}</span>` : ""}
                </div>
            `;
    } else {
      cmdDisplay.innerHTML =
        '<p style="color: #888;">No commander selected</p>';
    }
  }

  // Update army list
  const armyList = document.getElementById("army-list");
  if (armyList) {
    if (currentArmy.units.length === 0) {
      armyList.innerHTML =
        '<p style="color: #888; text-align: center;">Add units to your army</p>';
    } else {
      armyList.innerHTML = currentArmy.units
        .map(
          (unit) => `
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
            `,
        )
        .join("");
    }
  }
}

function updateFragmentEffects() {
  const container = document.getElementById("active-fragment-effects");
  if (!container) return;

  if (currentArmy.fragments.length === 0) {
    container.innerHTML =
      '<p style="color: #888; font-size: 0.9rem;">Select fragments to see their effects.</p>';
    return;
  }

  container.innerHTML = currentArmy.fragments
    .map((fragName) => {
      const fragment = gameData.fragments.find((f) => f.name === fragName);
      if (!fragment) return "";

      return `
            <div style="margin-bottom: 0.75rem; padding: 0.5rem; background: #0f3460; border-radius: 6px;">
                <strong>💎 ${fragment.name}</strong>
                <p style="font-size: 0.85rem; margin: 0.25rem 0;">${fragment.effects}</p>
                ${currentArmy.evolution ? `<p style="font-size: 0.8rem; color: #4fc3f7;">${fragment.interaction_evolution}</p>` : ""}
            </div>
        `;
    })
    .join("");
}

function saveArmy() {
  const armyData = JSON.stringify(currentArmy);
  localStorage.setItem("savedArmy", armyData);
  alert("Army saved successfully!");
}

function loadArmy() {
  const saved = localStorage.getItem("savedArmy");
  if (saved) {
    currentArmy = JSON.parse(saved);

    // Update UI
    const select = document.getElementById("commander-select");
    if (select && currentArmy.commander) {
      select.value = currentArmy.commander.name;
      updateSelectedCommander();
    }

    document.getElementById("points-limit").textContent =
      currentArmy.pointsLimit;
    loadFragmentSelector();
    updateArmyDisplay();
    updateFragmentEffects();

    alert("Army loaded successfully!");
  } else {
    alert("No saved army found.");
  }
}

function clearArmy() {
  if (confirm("Are you sure you want to clear your army?")) {
    currentArmy = {
      commander: null,
      evolution: null,
      units: [],
      fragments: [],
      pointsLimit: 200,
    };

    document.getElementById("commander-select").value = "";
    document.getElementById("commander-preview").innerHTML = "";
    document.getElementById("evolution-preview").innerHTML = "";
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
  if (!container || !campaignState.commander) {
    container.innerHTML =
      '<p style="color: #888; text-align: center;">Select a commander to view their skill tree.</p>';
    return;
  }

  const tree = campaignState.commander.skill_tree;
  if (!tree || typeof tree !== "object") return;

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
      const choice = campaignState.skillChoices.find((c) => c.level === level);
      const isUnlocked = level <= campaignState.level + 1;

      html += `
                <div class="skill-level">
                    <div class="skill-level-num" style="${level <= campaignState.level ? "" : "opacity: 0.5;"}">${level}</div>
                    <div class="skill-option skill-knowledge" style="${choice?.path === "knowledge" ? "border: 2px solid #fff;" : ""} ${!isUnlocked ? "opacity: 0.5;" : ""}" 
                         ${isUnlocked && !choice ? `onclick="selectSkill(${level}, 'knowledge')"` : ""}>
                        ${skills.knowledge || "-"}
                        ${choice?.path === "knowledge" ? " ✓" : ""}
                    </div>
                    <div class="skill-option skill-chaos" style="${choice?.path === "chaos" ? "border: 2px solid #fff;" : ""} ${!isUnlocked ? "opacity: 0.5;" : ""}"
                         ${isUnlocked && !choice ? `onclick="selectSkill(${level}, 'chaos')"` : ""}>
                        ${skills.chaos || "-"}
                        ${choice?.path === "chaos" ? " ✓" : ""}
                    </div>
                    <div class="skill-option skill-tactical" style="${choice?.path === "tactical" ? "border: 2px solid #fff;" : ""} ${!isUnlocked ? "opacity: 0.5;" : ""}"
                         ${isUnlocked && !choice ? `onclick="selectSkill(${level}, 'tactical')"` : ""}>
                        ${skills.tactical || "-"}
                        ${choice?.path === "tactical" ? " ✓" : ""}
                    </div>
                </div>
            `;
    }
  }

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
  campaignState.skillChoices.forEach((c) => {
    pathCounts[c.path]++;
  });

  const el = document.getElementById("path-tendency");
  if (!el) return;

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
