// ==========================================
// Shardborne Universe Wiki - Page Templates
// ==========================================

const pageTemplates = {
  home: `<div id="home-page" class="page active">
    <h2>Welcome to the Shardborne Universe</h2>
    <p class="intro-text">This is the central hub for all information related to the Shardborne Universe wargame. Explore the factions, commanders, units, and the mysterious fragments that shape the battlefield.</p>
    <div class="dashboard-grid">
        <div class="dashboard-card" onclick="showPage('factions')">
            <div class="dashboard-icon">⚔️</div>
            <h3>Factions</h3>
            <p>Explore the armies of the Shardborne Universe</p>
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
            <li><span class="update-date">Jun 2026</span> Nightfang Dominion — plague/corruption vampire tiger faction with 13 commanders, 60 units, 85 cards, 15 fragments</li>
            <li><span class="update-date">Feb 2026</span> Veilbound Shogunate faction with 13 commanders fully documented</li>
            <li><span class="update-date">Feb 2026</span> Iron Dominion faction fully documented with 11 commanders</li>
            <li><span class="update-date">Feb 2026</span> 160+ units including war machines across all three factions</li>
            <li><span class="update-date">Feb 2026</span> Fragment catalog with 45 unique fragments</li>
            <li><span class="update-date">Feb 2026</span> Commander RPG progression with branching skill trees</li>
            <li><span class="update-date">Feb 2026</span> Interactive Army Builder & Campaign Tracker tools</li>
        </ul>
    </div>
    <div class="card">
        <h3>🌍 The Shardborne Universe</h3>
        <p>In a world where clockwork precision meets cosmic fragment energy, armies clash across steam-shrouded battlefields. The <strong>Iron Dominion</strong> fields human/clockwork hybrids wielding fragment-infused technology, the <strong>Veilbound Shogunate</strong> channels eldritch cosmic rituals through masked samurai warriors, and the <strong>Nightfang Dominion</strong> unleashes plague-corrupted vampire tigers and thrall armies that spread the Scarlet Blight across every battlefield.</p>
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
    <h2>📜 Core Rules — Shardborne Universe</h2>
    <p style="color: #aaa;">Version ${gameData.rules ? gameData.rules.version : "1.0"} &nbsp;|&nbsp; Dice + Deck Building &nbsp;|&nbsp; Measurement in Inches</p>
    
    <div id="rules-nav" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        <button class="filter-btn active" onclick="showRulesSection('all', this)">All Sections</button>
        <button class="filter-btn" onclick="showRulesSection('pregame', this)">Pre-Game Setup</button>
        <button class="filter-btn" onclick="showRulesSection('army', this)">Army Building</button>
        <button class="filter-btn" onclick="showRulesSection('turn', this)">Turn Structure</button>
        <button class="filter-btn" onclick="showRulesSection('movement', this)">Movement</button>
        <button class="filter-btn" onclick="showRulesSection('combat', this)">Combat</button>
        <button class="filter-btn" onclick="showRulesSection('positioning', this)">LOS & Positioning</button>
        <button class="filter-btn" onclick="showRulesSection('engagement', this)">Engagement & Duels</button>
        <button class="filter-btn" onclick="showRulesSection('morale', this)">Morale</button>
        <button class="filter-btn" onclick="showRulesSection('cards', this)">Cards & Decks</button>
        <button class="filter-btn" onclick="showRulesSection('factionmech', this)">Faction Mechanics</button>
        <button class="filter-btn" onclick="showRulesSection('victory', this)">Victory & Terrain</button>
        <button class="filter-btn" onclick="showRulesSection('keywords', this)">Keywords</button>
        <button class="filter-btn" onclick="showRulesSection('scenarios', this)">Scenarios</button>
        <button class="filter-btn" onclick="showRulesSection('stats', this)">Stat Reference</button>
    </div>
    <div id="rules-content"></div>
</div>`,

  "sample-gameplay": `<div id="sample-gameplay-page" class="page active">
    <h2>⚔️ Sample Battle: The Bridge of Iron and Spirits</h2>
    <p style="color: #aaa;">A complete turn-by-turn walkthrough using real unit stats, card costs, and combat resolution.</p>
    
    <div class="card">
        <h3>📋 Battle Setup</h3>
        <ul>
            <li><strong>Battle Size:</strong> Standard (200 pts per side)</li>
            <li><strong>Victory Condition:</strong> Annihilation (destroy all enemy units or the enemy Commander)</li>
            <li><strong>Table:</strong> 36" × 48"</li>
            <li><strong>Terrain:</strong> Bridge at center (Open), forest on east flank (Light Cover), ruins on west (Heavy Cover), river (Difficult Terrain) running north-south</li>
            <li><strong>Max Turns:</strong> 6</li>
        </ul>
    </div>

    <div class="card">
        <h3>🏗️ Army Lists</h3>
        
        <h4 style="color: #e94560;">⚙️ Iron Dominion — Commander Ironweld (24 pts)</h4>
        <p style="color: #aaa;">ATK 6 | DEF 5 | HP 11 | MOV 4" | RNG 3" | MOR 10 — An aggressive frontline commander</p>
        <table style="width:100%; border-collapse: collapse; margin: 0.5rem 0;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.15);"><th style="text-align:left; padding: 4px; color: #e94560;">Unit</th><th style="padding: 4px; color: #e94560;">Qty</th><th style="padding: 4px; color: #e94560;">Pts Each</th><th style="padding: 4px; color: #e94560;">Stats (ATK/DEF/HP/MOV/RNG)</th></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Clockwork Infantry</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">2</td><td style="padding: 4px; color: #ccc;">2/4/2/5"/1" — Grid Node, Fearless</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Elite Vanguard</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">4</td><td style="padding: 4px; color: #ccc;">4/4/2/5"/1" — Grid Node</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Aether Infused Soldiers</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">3</td><td style="padding: 4px; color: #ccc;">3/3/2/6"/1" — Grid Node, Fragment Infused</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Steam Artillery Crew</td><td style="text-align:center; padding: 4px;">2</td><td style="text-align:center; padding: 4px;">5</td><td style="padding: 4px; color: #ccc;">4/3/2/3"/24" — Grid Node, Blast 2"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Gearwright Engineers</td><td style="text-align:center; padding: 4px;">2</td><td style="text-align:center; padding: 4px;">3</td><td style="padding: 4px; color: #ccc;">1/3/2/5"/1" — Repair, Grid Node</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Scouts / Recon</td><td style="text-align:center; padding: 4px;">2</td><td style="text-align:center; padding: 4px;">1</td><td style="padding: 4px; color: #ccc;">1/3/1/8"/8" — Scout, Spotter</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Clockwork Titan (War Machine)</td><td style="text-align:center; padding: 4px;">1</td><td style="text-align:center; padding: 4px;">14</td><td style="padding: 4px; color: #ccc;">6/5/8/4"/1" — Towering, Grid Anchor, Siege</td></tr>
        </table>
        <p style="color: #aaa; font-size: 0.85rem;"><strong>Subtotal:</strong> 24 + 6 + 12 + 9 + 10 + 6 + 2 + 14 = 83 pts</p>
        <p style="color: #aaa; font-size: 0.85rem;">+ 3× Mechanized Infantry (9) + 3× Siege Infantry (12) + 3× Sharpshooters (6) + 3× Clockwork Infantry (6) + 2× Infantry Regiment (2) = 118 pts</p>
        <p style="color: #e94560; font-weight: bold;">Grand Total: 201 pts | 30 models + Commander</p>
        <p><strong>Fragments:</strong> Core Fragment (1 charge, +1 ATK to adjacent unit), Overclock Node (2 charges, enhance War Machine activation)</p>
        <p><strong>Deck (15 cards):</strong> Coordinated Assault (3 CP), Strategic Advance (2 CP), Calculated Strike (1 CP), and 12 others from Ironweld's 20-card pool</p>

        <hr style="border-color: rgba(255,255,255,0.1); margin: 1.5rem 0;">

        <h4 style="color: #a78bfa;">🌙 Veilbound Shogunate — Ritual Captain Akikaze (19 pts)</h4>
        <p style="color: #aaa;">ATK 5 | DEF 3 | HP 9 | MOV 5" | RNG 6" | MOR 10 — A ritual/Flow-focused commander</p>
        <table style="width:100%; border-collapse: collapse; margin: 0.5rem 0;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.15);"><th style="text-align:left; padding: 4px; color: #a78bfa;">Unit</th><th style="padding: 4px; color: #a78bfa;">Qty</th><th style="padding: 4px; color: #a78bfa;">Pts Each</th><th style="padding: 4px; color: #a78bfa;">Stats (ATK/DEF/HP/MOV/RNG)</th></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Starblade Samurai</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">4</td><td style="padding: 4px; color: #ccc;">4/4/2/5"/1"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Temple Defenders</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">3</td><td style="padding: 4px; color: #ccc;">2/5/3/4"/1"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Shrine Wardens</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">2</td><td style="padding: 4px; color: #ccc;">2/4/2/5"/1"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Dreampiercer Archers</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">4</td><td style="padding: 4px; color: #ccc;">3/3/2/5"/20"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Star Serpent Lancers (Cavalry)</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">5</td><td style="padding: 4px; color: #ccc;">4/4/2/9"/1"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Spirit Healer Monks</td><td style="text-align:center; padding: 4px;">2</td><td style="text-align:center; padding: 4px;">3</td><td style="padding: 4px; color: #ccc;">0/3/2/5"/1" — Heal</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Ink Dragon Scouts</td><td style="text-align:center; padding: 4px;">2</td><td style="text-align:center; padding: 4px;">4</td><td style="padding: 4px; color: #ccc;">2/3/2/9"/8" — Scout</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Veiled Ashigaru</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">1</td><td style="padding: 4px; color: #ccc;">2/3/1/5"/1"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Moonlit Duelists</td><td style="text-align:center; padding: 4px;">3</td><td style="text-align:center; padding: 4px;">3</td><td style="padding: 4px; color: #ccc;">3/4/2/6"/1"</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 4px;">Shrine Dragon (War Machine)</td><td style="text-align:center; padding: 4px;">1</td><td style="text-align:center; padding: 4px;">14</td><td style="padding: 4px; color: #ccc;">7/4/10/8"/12" — Fly, Towering, Blast 3"</td></tr>
        </table>
        <p style="color: #a78bfa; font-weight: bold;">Total: 19 + 12 + 9 + 6 + 12 + 15 + 6 + 8 + 3 + 9 + 14 = 113 pts — plus 3× Inkblade Initiates (3), 3× Lotus Ascetics (12), 3× Mask Bearers (6) = 200 pts | 35 models + Commander</p>
        <p><strong>Fragments:</strong> Spirit Thread (1 charge, +1 ATK to Spirit unit), Kitsune Charm (2 charges, force reroll)</p>
        <p><strong>Stances:</strong> All infantry start in Balanced Stance. May switch to Revelation or Honor during Command Phase.</p>
    </div>

    <div class="card">
        <h3>🎲 Pre-Game Sequence</h3>
        <ol>
            <li><strong>Agree on Parameters:</strong> Standard 200 pts, Annihilation, 6 terrain pieces</li>
            <li><strong>Reveal Army Lists:</strong> Both players show lists simultaneously — open information</li>
            <li><strong>Place Terrain:</strong> Players alternate placing 3 terrain each. Bridge center, forest east, ruins west, river north-south</li>
            <li><strong>Roll for Initiative:</strong> Iron Dominion rolls 4, Veilbound rolls 6. Veilbound chooses to deploy second.</li>
            <li><strong>Deploy:</strong> Iron Dominion deploys first (alternating units). Scouts deploy 6" ahead. Veilbound deploys second → takes Turn 1</li>
            <li><strong>Draw Opening Hand:</strong> Both players shuffle their 15-card deck, draw 5 cards. Akikaze mulligans, shuffles, draws 5 new cards.</li>
        </ol>
    </div>

    <div class="card">
        <h3>🔄 Turn 1 — Opening Moves</h3>
        
        <h4 style="color: #a78bfa;">Veilbound Shogunate (Active Player)</h4>
        <p><strong>Command Phase:</strong> Akikaze generates 6 CP. Draws 2 cards (hand now 7). Declares Starblade Samurai switch to Revelation Stance (+1 ATK, −1 DEF). Adds Ritual Flow from surviving units to the Flow Pool.</p>
        <p><strong>Movement Phase:</strong> Star Serpent Lancers move 9" up east flank (through forest = Light Cover). Starblade Samurai advance 5" toward the bridge. Ink Dragon Scouts (deployed 6" ahead via Scout) move 9" to spot for the Dreampiercer Archers.</p>
        <p><strong>Combat Phase:</strong> Dreampiercer Archers (RNG 20") fire at the Clockwork Titan across the table. ATK 3 dice each, 3 archers fire. Roll: 9d6 → 1, 2, 3, 4, 4, 5, 5, 6, 6. Titan DEF is 5. Hits: 5, 5, 6, 6 = 4 hits. The two 6s are criticals (2 dmg each). Total damage: <strong>6 HP</strong> to the Titan (8 HP → 2 HP remaining!).</p>
        <p><strong>End Phase:</strong> No morale checks needed (no VB units took damage). Flow Pool accumulates.</p>

        <hr style="border-color: rgba(255,255,255,0.05); margin: 1rem 0;">

        <h4 style="color: #e94560;">Iron Dominion (Active Player)</h4>
        <p><strong>Command Phase:</strong> Ironweld generates 9 CP. Draws 2 cards (hand now 7). Grid Cohesion check: 3 Clockwork Infantry within 3" = Grid Active (+1 ATK). Ironweld plays <strong>Calculated Strike</strong> (1 CP) on the Steam Artillery — they may reroll misses this turn. (8 CP remaining)</p>
        <p><strong>Movement Phase:</strong> Clockwork Titan limps forward 4" (badly damaged, needs repair). Gearwright Engineers move 5" to be adjacent. Scouts advance 8" toward the bridge. Elite Vanguard move 5" toward center.</p>
        <p><strong>Combat Phase:</strong> Steam Artillery Crew (RNG 24") targets Starblade Samurai at the bridge. ATK 4 each, 2 artillery fire. Roll: 8d6 → 1, 1, 2, 3, 4, 5, 5, 6. Samurai in Revelation Stance: DEF is 4−1=3. Hits: 3, 4, 5, 5, 6 = 5 hits! The 6 is critical (+1 dmg). Total: <strong>6 damage</strong> to 3 Starblade Samurai (2 HP each = 6 HP pool). Two Samurai destroyed, third at 2 HP. Ironweld uses Calculated Strike to reroll misses (1, 1, 2) → 3, 4, 6 = 3 more hits → third Samurai destroyed!</p>
        <p><strong>End Phase:</strong> Gearwright Engineers use Repair to restore 1 HP to the Clockwork Titan (2 → 3 HP). No morale checks (Clockwork Infantry are Fearless).</p>
    </div>

    <div class="card">
        <h3>🔄 Turn 2 — The Clash at the Bridge</h3>
        
        <h4 style="color: #a78bfa;">Veilbound Shogunate</h4>
        <p><strong>Command Phase:</strong> Akikaze generates 6 CP. Draws 2 cards. Switches Temple Defenders to Honor Stance (+1 DEF, −1 ATK, cannot be flanked). Spends Spirit Thread fragment (1 charge) — grants +1 ATK to the Star Serpent Lancers.</p>
        <p><strong>Movement Phase:</strong> Star Serpent Lancers <strong>Charge!</strong> They move 9" in a straight line toward Ironweld's Elite Vanguard, ending within 1" → Engaged. Charge grants +1 ATK die. Temple Defenders advance 4" to hold the bridge in Honor Stance.</p>
        <p><strong>Combat Phase:</strong> Star Serpent Lancers (ATK 4 + 1 Charge + 1 Spirit Thread = <strong>6 dice</strong>) attack Elite Vanguard (DEF 4). Roll 6d6: 2, 3, 4, 5, 5, 6. Hits: 4, 5, 5, 6 = 4 hits (6 is critical = 2 dmg). Total: <strong>5 damage</strong>. Elite Vanguard has 2 HP → destroyed! Lancers Consolidate 2" toward the next Vanguard.</p>
        <p><strong>End Phase:</strong> No morale issues. Flow Pool rises past Awakened threshold (+1 to all Ritual abilities).</p>

        <hr style="border-color: rgba(255,255,255,0.05); margin: 1rem 0;">

        <h4 style="color: #e94560;">Iron Dominion</h4>
        <p><strong>Command Phase:</strong> Ironweld generates 9 CP. Draws 2 cards. Plays <strong>Coordinated Assault</strong> (3 CP) — all units within 6" of Ironweld attacking the same target get +1 ATK die. (6 CP remaining)</p>
        <p><strong>Movement Phase:</strong> 2 remaining Elite Vanguard move toward the Lancers. Ironweld advances 4" into range (RNG 3"). Aether Infused Soldiers move 6" through ruins (Heavy Cover, +2 DEF vs ranged).</p>
        <p><strong>Combat Phase:</strong> <em>Ranged:</em> Ironweld fires at Star Serpent Lancers. ATK 6 + 1 (Coordinated Assault) = 7 dice vs DEF 4. Roll 7d6: 1, 3, 4, 4, 5, 6, 6. Hits: 4, 4, 5, 6, 6 = 5 hits (two 6s = 2 extra dmg). Total: <strong>7 damage</strong>. Lancers have 2 HP each — 3 Lancers destroyed, 1 damage wasted (no spillover). <em>Melee:</em> Elite Vanguard engages remaining targets.</p>
        <p><strong>End Phase:</strong> Grid Fortified bonus activates (3+ ID units including Support within 3" = +1 ATK and +1 DEF).</p>
    </div>

    <div class="card">
        <h3>🔄 Turns 3–5 — Summary</h3>
        <ul>
            <li><strong>Turn 3:</strong> Akikaze activates Kitsune Charm fragment (2 charges) — forces Ironweld to reroll his next ATK and take the lower result. Shrine Dragon swoops in (Fly keyword), breathing fire at clustered ID infantry: ATK 7, Blast 3", devastating. Ironweld spends 3 CP on a defensive card to negate 2 hits. Morale check: Aether Infused Soldier rolls 2d6 = 9, exceeds MOR 7 → becomes Shaken.</li>
            <li><strong>Turn 4:</strong> Shaken Aether Soldier attempts to Rally (wasn't damaged this turn): rolls 2d6 = 6, ≤ MOR 7 → Rally succeeds, Shaken removed. Ironweld issues a <strong>Challenge</strong> to Akikaze! Both commanders Engaged at the bridge. Ironweld ATK 6 vs DEF 3: rolls 6d6 → 3, 4, 4, 5, 6, 6 = 5 hits + 2 crits = <strong>7 damage</strong> to Akikaze (9 → 2 HP!). Akikaze ATK 5 vs DEF 5: rolls 5d6 → 2, 3, 5, 5, 6 = 3 hits + 1 crit = <strong>4 damage</strong> to Ironweld (11 → 7 HP).</li>
            <li><strong>Turn 5:</strong> Akikaze, at 2 HP, falls back. Spirit Healer Monks use Heal to restore 1 HP (2 → 3 HP). Shrine Dragon targets wounded Clockwork Titan and finishes it (3 HP → 0, destroyed). Remaining ID infantry push forward with Grid Fortified bonuses. Veiled Ashigaru Rout after failing morale by 4+.</li>
        </ul>
    </div>

    <div class="card">
        <h3>🏆 Turn 6 — Final Resolution</h3>
        <p>Iron Dominion holds the bridge with Grid Fortified infantry. The Veilbound still have the Shrine Dragon and Akikaze (3 HP), but have lost most infantry. Ironweld at 7 HP with 3 Grid-linked Clockwork Infantry is a fortress.</p>
        <p><strong>Points Destroyed:</strong> Iron Dominion destroyed ~120 pts of Veilbound forces. Veilbound destroyed ~95 pts of Iron Dominion forces.</p>
        <p><strong>Result:</strong> Neither commander is destroyed. By Annihilation tiebreaker: the player who destroyed the most total points wins. <strong>Iron Dominion wins!</strong></p>
    </div>

    <div class="card">
        <h3>📝 Key Takeaways</h3>
        <ul>
            <li><strong>Dice Mechanic:</strong> Roll ATK dice, each ≥ target's DEF = 1 hit (1 damage). Natural 6 = Critical Hit (2 damage). Simple, fast, dramatic.</li>
            <li><strong>Charging is powerful:</strong> Star Serpent Lancers with Charge (+1 ATK) + Spirit Thread (+1 ATK) deleted an Elite Vanguard in one attack. Plan charges carefully.</li>
            <li><strong>Grid Cohesion rewards clustering:</strong> Iron Dominion gains +1 ATK/DEF when 3+ units stay within 3" — but they're vulnerable to Blast attacks.</li>
            <li><strong>Stances create trade-offs:</strong> Revelation (+1 ATK, −1 DEF) made Samurai hit harder but die easier. Honor (+1 DEF, no flanking) makes Defenders nearly immovable.</li>
            <li><strong>Commanders are your brain:</strong> Ironweld's 9 CP per turn funded powerful cards. Losing your commander triggers army-wide MOR −2 checks.</li>
            <li><strong>Fragment timing matters:</strong> Spirit Thread at the right moment made a cavalry charge lethal. Kitsune Charm disrupted a critical attack roll.</li>
            <li><strong>Morale cascades:</strong> Shaken units get −1 ATK and may Rout (MOR exceeded by 3+). Keep Commander Aura (+1 MOR within 6") near vulnerable units.</li>
        </ul>
    </div>
</div>`,

  "army-builder": `<div id="army-builder-page" class="page active">
    <h2>Army Builder</h2>
    <p>Select your faction, choose your commander, and build your army list.</p>
    <div class="army-builder-container">
        <div class="army-panel">
            <div class="card"><h3>1. Select Faction</h3><div id="faction-select" class="filter-controls"></div></div>
            <div class="card"><h3>2. Select Commander</h3><select id="commander-select" class="commander-select" onchange="updateSelectedCommander()"><option value="">-- Choose a Faction First --</option></select><div id="commander-preview"></div></div>
            <div class="card"><h3>3. Select Evolution Path</h3><div class="filter-controls" id="evolution-select"><button class="filter-btn" onclick="selectEvolution('knowledge')">Knowledge</button><button class="filter-btn" onclick="selectEvolution('chaos')">Chaos</button><button class="filter-btn" onclick="selectEvolution('hybrid')">Hybrid</button></div><div id="evolution-preview"></div></div>
            <div class="card" id="army-skill-tree-card" style="display: none;"><h3>Commander Skill Tree</h3><p style="font-size: 0.85rem; color: #888;">Skills available to your selected commander during campaign play.</p><div id="army-skill-tree-display"></div><div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.75rem;"><h4 style="cursor: pointer; color: #a78bfa; margin: 0;" onclick="var el = document.getElementById('universal-tree-ref'); el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.textContent = el.style.display === 'none' ? '▶ Universal Campaign Skills Reference' : '▼ Universal Campaign Skills Reference';">▶ Universal Campaign Skills Reference</h4><div id="universal-tree-ref" style="display: none; margin-top: 0.5rem;"></div></div></div>
            <div class="card"><h3>4. Battle Size</h3><div class="filter-controls"><button class="filter-btn" onclick="setPointsLimit(100)">Skirmish (100)</button><button class="filter-btn active" onclick="setPointsLimit(200)">Medium (200)</button><button class="filter-btn" onclick="setPointsLimit(300)">Large (300)</button><button class="filter-btn" onclick="setPointsLimit(500)">Epic (500)</button></div></div>
            <div class="card"><h3>5. Select Units</h3><div class="filter-controls"><button class="filter-btn active" onclick="filterUnits('all')">All</button><button class="filter-btn" onclick="filterUnits('Infantry')">Infantry</button><button class="filter-btn" onclick="filterUnits('Cavalry')">Cavalry</button><button class="filter-btn" onclick="filterUnits('Support')">Support</button><button class="filter-btn" onclick="filterUnits('Specialist')">Specialist</button><button class="filter-btn" onclick="filterUnits('Artillery')">Artillery</button><button class="filter-btn" onclick="filterUnits('Scout')">Scout</button><button class="filter-btn" onclick="filterUnits('War Machine')">War Machines</button></div><div id="unit-selector" class="unit-selector"></div></div>
            <div class="card"><h3>6. Assign Fragments</h3><div id="fragment-selector"></div><div id="fragment-effects"></div></div>
        </div>
        <div>
            <div class="points-display"><div>Points Used</div><div class="points-total" id="points-used">0</div><div class="points-limit">/ <span id="points-limit">200</span></div><div class="points-bar"><div class="points-fill" id="points-bar-fill" style="width: 0%"></div></div><div id="points-status" style="color: #4caf50">Ready for battle!</div></div>
            <div class="army-panel" style="margin-top: 1rem;"><h4>Your Army</h4><div id="army-commander-display"></div><hr style="border-color: #0f3460;"><div id="army-list" class="army-list"><p style="color: #888; text-align: center;">Add units to your army</p></div></div>
            <div class="army-panel" style="margin-top: 1rem;"><h4>Army Actions</h4><button class="btn" onclick="saveArmy()" style="width: 100%; margin-bottom: 0.5rem;">Save Army</button><button class="btn btn-secondary" onclick="loadArmy()" style="width: 100%; margin-bottom: 0.5rem;">Load Army</button><button class="btn btn-secondary" onclick="clearArmy()" style="width: 100%;">Clear Army</button></div>
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
    <div class="card"><h3>⚔️ Between Games</h3><p style="color: #888; font-size: 0.9rem;">After each battle, resolve these steps in order. This handles injuries, resupply, and fragment discovery.</p>
      <div id="between-games-panel">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 6px; border-left: 3px solid #f44336;">
            <h4 style="margin: 0 0 0.5rem 0; color: #f44336;">Step 1 — Injury Rolls</h4>
            <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 0.5rem 0;">Each destroyed unit rolls 1d6:</p>
            <ul style="font-size: 0.8rem; color: #ccc; margin: 0; padding-left: 1.2rem;">
              <li><strong>1:</strong> Killed permanently (removed from roster)</li>
              <li><strong>2:</strong> Crippled (−1 HP & −1 ATK next game)</li>
              <li><strong>3-4:</strong> Walking Wounded (−1 HP next game)</li>
              <li><strong>5-6:</strong> Full Recovery</li>
            </ul>
            <div style="margin-top: 0.75rem;"><input id="injury-unit-name" type="text" placeholder="Destroyed unit name..." style="width: 60%; padding: 0.3rem; background: #1a1a2e; border: 1px solid #333; color: #fff; border-radius: 4px;"><button class="btn btn-secondary" onclick="rollInjury()" style="font-size: 0.8rem; margin-left: 0.5rem;">🎲 Roll Injury</button></div>
            <div id="injury-result" style="margin-top: 0.5rem; font-size: 0.85rem;"></div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 6px; border-left: 3px solid #ff9800;">
            <h4 style="margin: 0 0 0.5rem 0; color: #ff9800;">Step 2 — Commander Injury</h4>
            <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 0.5rem 0;">If your Commander was destroyed, roll 1d6:</p>
            <ul style="font-size: 0.8rem; color: #ccc; margin: 0; padding-left: 1.2rem;">
              <li><strong>1:</strong> Grievous — misses next game (substitute leads)</li>
              <li><strong>2-3:</strong> Shaken — starts next game at −1 Command</li>
              <li><strong>4-6:</strong> Battle-hardened — full recovery, +1 HP next game</li>
            </ul>
            <div style="margin-top: 0.75rem;"><button class="btn btn-secondary" onclick="rollCommanderInjury()" style="font-size: 0.8rem;">🎲 Roll Commander Injury</button></div>
            <div id="commander-injury-result" style="margin-top: 0.5rem; font-size: 0.85rem;"></div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 6px; border-left: 3px solid #4caf50;">
            <h4 style="margin: 0 0 0.5rem 0; color: #4caf50;">Step 3 — Resupply Points</h4>
            <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 0.5rem 0;">Earn points to rebuild your roster (1 RP = 1 army-building point):</p>
            <ul style="font-size: 0.8rem; color: #ccc; margin: 0; padding-left: 1.2rem;">
              <li><strong>Win:</strong> 10 Resupply Points</li>
              <li><strong>Loss:</strong> 15 Resupply Points (catch-up)</li>
              <li><strong>Draw:</strong> 12 Resupply Points</li>
            </ul>
            <div style="margin-top: 0.75rem;">
              <span style="font-size: 0.85rem; color: #ccc;">Total Resupply Earned: <strong id="total-resupply" style="color: #4caf50;">0</strong> RP</span>
            </div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 6px; border-left: 3px solid #a78bfa;">
            <h4 style="margin: 0 0 0.5rem 0; color: #a78bfa;">Step 4 — Fragment Discovery</h4>
            <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 0.5rem 0;">Roll 1d6 after each game. On 5-6, discover a new fragment. Winner chooses; loser draws randomly.</p>
            <div style="margin-top: 0.75rem;">
              <select id="fragment-battle-result" style="padding: 0.3rem; background: #1a1a2e; border: 1px solid #333; color: #fff; border-radius: 4px; margin-right: 0.5rem;"><option value="winner">Winner</option><option value="loser">Loser</option></select>
              <button class="btn btn-secondary" onclick="rollFragmentDiscovery()" style="font-size: 0.8rem;">🎲 Roll Discovery</button>
            </div>
            <div id="fragment-discovery-result" style="margin-top: 0.5rem; font-size: 0.85rem;"></div>
          </div>
        </div>
        <div id="injury-log" style="margin-top: 1rem;"></div>
      </div>
    </div>
    <div class="card"><h3>Unit Persistence Tracker</h3><p style="color: #888; font-size: 0.9rem;">Track damage, buffs, and mutations that persist across battles.</p><div id="persistent-units"><table style="width: 100%; border-collapse: collapse;"><thead><tr style="border-bottom: 2px solid #0f3460;"><th style="text-align: left; padding: 0.5rem;">Unit Name</th><th style="text-align: center; padding: 0.5rem;">Status</th><th style="text-align: center; padding: 0.5rem;">Buffs</th><th style="text-align: center; padding: 0.5rem;">Mutations</th><th style="text-align: center; padding: 0.5rem;">Actions</th></tr></thead><tbody id="unit-tracker-body"><tr><td colspan="5" style="text-align: center; padding: 1rem; color: #888;">Add units to track their campaign progression</td></tr></tbody></table></div><div style="margin-top: 1rem;"><button class="btn btn-secondary" onclick="addPersistentUnit()">+ Add Unit to Tracker</button></div></div>
    <div id="levelup-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center;"><div class="card" style="max-width: 600px; margin: 2rem;"><h3>🎉 Level Up!</h3><p>Your commander has reached a new level! Choose your skill upgrade:</p><div id="levelup-choices" class="evolution-grid"></div></div></div>
</div>`,
};
