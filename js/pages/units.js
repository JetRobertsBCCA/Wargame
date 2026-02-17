// ==========================================
// Shardborne Universe Wiki - Units Page
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
            <p><strong>Type:</strong> ${unit.type} | <strong>Points:</strong> <span style="color: #e94560; font-weight: bold;">${unit.points_cost}</span>${unit.ritual_flow ? ` | <strong>Ritual Flow:</strong> <span style="color: #a78bfa; font-weight: bold;">+${unit.ritual_flow}</span>` : ""}${unit.corruption_spread ? ` | <strong>Corruption Spread:</strong> <span style="color: #dc2626; font-weight: bold;">+${unit.corruption_spread}</span>` : ""}</p>
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
            ${unit.description ? `<p style="font-size: 0.8rem; color: #999; margin-top: 0.5rem; line-height: 1.4;">${unit.description.length > 200 ? unit.description.substring(0, 200) + '...' : unit.description}</p>` : ""}
        `;
    contentEl.appendChild(card);
  });
}

// Note: getUnitTypeIcon() is defined in js/components/helpers.js

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
            ${unit.ritual_flow ? ` &nbsp;|&nbsp; <strong>Ritual Flow:</strong> <span style="color: #a78bfa; font-weight: bold;">+${unit.ritual_flow}</span>` : ""}${unit.corruption_spread ? ` &nbsp;|&nbsp; <strong>Corruption Spread:</strong> <span style="color: #dc2626; font-weight: bold;">+${unit.corruption_spread}</span>` : ""}</p>
            
            ${statBlockHTML}
            
            <p><strong>Role / Purpose:</strong> ${unit.role}</p>
            
            ${specialHTML}
            
            <p><strong>Fragment Interactions:</strong> ${unit.fragment_interactions}</p>
            <p><em>${unit.flavor_text}</em></p>
            ${unit.description ? `
            <div style="margin: 1.5rem 0; padding: 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
                <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #ccc; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">📖 Unit Description</h3>
                <p style="color: #ddd; line-height: 1.7; margin: 0; font-size: 0.95rem;">${unit.description}</p>
            </div>
            ` : ''}
            
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
