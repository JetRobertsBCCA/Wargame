// ==========================================
// Shardborne Universe Wiki - Factions Page
// ==========================================

function getFactionLogoPath(factionId) {
  const folders = {
    'emberclaw-warpack': 'Emberclaw',
    'iron-dominion': 'IronDominion',
    'nightfang-dominion': 'NightFang',
    'veilbound-shogunate': 'veilboundShogunate',
    'thornweft-matriarchy': 'Thornweft'
  };
  const folder = folders[factionId];
  if (!folder) return null;
  return `data/factions/Images/${folder}/FactionLogo.webp`;
}

function loadFactions() {
  const contentEl = document.getElementById("faction-list");
  if (!contentEl) return;

  contentEl.innerHTML =
    '<div class="faction-overview-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem;"></div>';
  const grid = contentEl.querySelector(".faction-overview-grid");

  gameData.factions.forEach((faction) => {
    const commanders = getCommandersByFaction(faction.id);
    const units = getUnitsByFaction(faction.id);
    const warMachines = units.filter((u) => u.type === "War Machine");
    const standardUnits = units.filter((u) => u.type !== "War Machine");
    const icon = faction.icon || "⚔️";
    const color = faction.color || "#e94560";

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
    card.onclick = () => location.hash = '#faction/' + faction.id;

    const logoPath = getFactionLogoPath(faction.id);
    const logoHtml = logoPath
      ? `<img src="${logoPath}" alt="${faction.name} logo" class="faction-logo-card" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
         <div style="font-size: 3rem; display: none;">${icon}</div>`
      : `<div style="font-size: 3rem;">${icon}</div>`;

    card.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                ${logoHtml}
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

  const icon = faction.icon || "⚔️";
  const color = faction.color || "#e94560";

  const contentEl = document.getElementById("content");
  contentEl.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <button class="btn btn-secondary" onclick="location.hash='#factions'" style="font-size: 0.85rem;">← All Factions</button>
        </div>

        <div class="card" style="border-top: 4px solid ${color};">
            <div class="faction-detail-header">
                ${(() => {
                  const lp = getFactionLogoPath(faction.id);
                  return lp
                    ? `<img src="${lp}" alt="${faction.name} logo" class="faction-logo-detail" onerror="this.style.display='none'">`
                    : `<span style="font-size: 3rem;">${icon}</span>`;
                })()}
                <div class="faction-detail-title">
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

        <!-- Blood Creed (Nightfang) -->
        ${
          faction.blood_creed
            ? `
        <div class="card" style="border-left: 3px solid #dc2626;">
            <h3 style="color: #f87171;">🩸 The Blood Creed</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.blood_creed.overview}</p>
            ${faction.blood_creed.tenets
              .map(
                (t, i) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #fca5a5;">${["1️⃣", "2️⃣", "3️⃣"][i]} ${t.name}</h5>
                <p><strong>Concept:</strong> <em>${t.concept}</em></p>
                <p><strong>Implications:</strong></p>
                <ul>${t.implications.map((im) => `<li>${im}</li>`).join("")}</ul>
                <p><strong>Battlefield Mechanics:</strong></p>
                <ul>${t.mechanics.map((m) => `<li>${m}</li>`).join("")}</ul>
                <p><strong>Symbol:</strong> ${t.symbol}</p>
            </div>
            `,
              )
              .join("")}
            <div style="margin-top: 1rem;">
                <h5 style="color: #fca5a5;">Creed in Practice</h5>
                <ul>
                    <li><strong>Training:</strong> ${faction.blood_creed.creed_in_practice.training}</li>
                    <li><strong>Hierarchy Integration:</strong> ${faction.blood_creed.creed_in_practice.hierarchy_integration}</li>
                    <li><strong>Combat Philosophy:</strong> ${faction.blood_creed.creed_in_practice.combat_philosophy}</li>
                </ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.blood_creed.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Blood Patriarch (Nightfang) -->
        ${
          faction.blood_patriarch
            ? `
        <div class="card" style="border-left: 3px solid #e2e8f0;">
            <h3 style="color: #e2e8f0;">🩸 ${faction.blood_patriarch.title}</h3>
            <p><strong>Role:</strong> ${faction.blood_patriarch.role} &mdash; <em>${faction.blood_patriarch.faction_rank}</em></p>
            <p><strong>Known As:</strong> ${faction.blood_patriarch.aliases.map((a) => `<em>&ldquo;${a}&rdquo;</em>`).join(", ")}</p>
            <p style="font-style: italic; opacity: 0.85; margin-top: 0.5rem;">${faction.blood_patriarch.summary}</p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Appearance</h5>
                <ul>${faction.blood_patriarch.appearance.map((a) => `<li>${a}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Personality & Command Style</h5>
                <ul>${faction.blood_patriarch.personality.map((p) => `<li><strong>${p.trait}:</strong> ${p.description}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Abilities & Powers</h5>
                ${faction.blood_patriarch.abilities
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
                <ul>${faction.blood_patriarch.faction_role.map((r) => `<li><strong>${r.area}:</strong> ${r.detail}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #cbd5e1;">Lore Notes</h5>
                <ul>${faction.blood_patriarch.lore_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.blood_patriarch.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Corruption Stages (Nightfang) -->
        ${
          faction.corruption_stages
            ? `
        <div class="card" style="border-left: 3px solid #dc2626;">
            <h3 style="color: #f87171;">🔄 Corruption Stages</h3>
            <p style="font-style: italic; opacity: 0.85;">${faction.corruption_stages.overview}</p>
            ${faction.corruption_stages.stages
              .map(
                (s) => `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #fca5a5;">Stage ${s.stage_number} — ${s.name}</h5>
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
                <h5 style="color: #fca5a5;">Progression Notes</h5>
                <ul>${faction.corruption_stages.progression_notes.map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>
            <div style="margin-top: 0.75rem;">
                ${faction.corruption_stages.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
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
                ${(faction.military_doctrine.core_principles || []).map((p) => typeof p === 'string' ? `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;"><li>${p}</li></div>` : `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #fde68a;">${p.name}</strong>
                    <ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
                </div>`).join("")}
            </div>
            ${(faction.military_doctrine.battlefield_behavior || faction.military_doctrine.battlefield_tactics) ? `
            <div style="margin-top: 1.25rem;">
                <h4 style="color: #fcd34d;">Battlefield Tactics</h4>
                ${(faction.military_doctrine.battlefield_behavior || faction.military_doctrine.battlefield_tactics || []).map((b) => typeof b === 'string' ? `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;"><li>${b}</li></div>` : `
                <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                    <strong style="color: #fde68a;">${b.name}</strong>
                    <ul>${b.details.map((d) => `<li>${d}</li>`).join("")}</ul>
                </div>`).join("")}
            </div>` : ''}
            ${faction.military_doctrine.strategic_notes ? `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h5 style="color: #fcd34d;">Strategic Notes</h5>
                <ul>${(Array.isArray(faction.military_doctrine.strategic_notes) ? faction.military_doctrine.strategic_notes : [faction.military_doctrine.strategic_notes]).map((n) => `<li>${n}</li>`).join("")}</ul>
            </div>` : ''}
            ${faction.military_doctrine.keywords ? `
            <div style="margin-top: 0.75rem;">
                ${faction.military_doctrine.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>` : ''}
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
            ${(faction.war_machines_lore.general_characteristics || faction.war_machines_lore.characteristics) ? `
            <div style="margin-top: 1rem;">
                <h4 style="color: #bfdbfe;">General Characteristics</h4>
                <ul>${(faction.war_machines_lore.general_characteristics || faction.war_machines_lore.characteristics || []).map((c) => typeof c === 'string' ? `<li>${c}</li>` : `<li><strong>${c.trait}:</strong> ${c.detail}</li>`).join("")}</ul>
            </div>` : ''}
            <div style="margin-top: 1rem;">
                <h4 style="color: #bfdbfe;">Tactical Role</h4>
                ${typeof faction.war_machines_lore.tactical_role === 'string' ? `<p>${faction.war_machines_lore.tactical_role}</p>` : `<ul>${(faction.war_machines_lore.tactical_role || []).map((r) => `<li>${r}</li>`).join("")}</ul>`}
            </div>
            ${faction.war_machines_lore.keywords ? `
            <div style="margin-top: 0.75rem;">
                ${faction.war_machines_lore.keywords.map((k) => `<span class="tag">${k}</span>`).join(" ")}
            </div>` : ''}
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
              faction.culture_philosophy.pillar_expansion
                ? `
            <h4>Core Beliefs</h4>
            <ul>${faction.culture_philosophy.pillar_expansion.map((p) => `<li>${p}</li>`).join("")}</ul>
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
              (faction.culture_philosophy.cultural_practices || faction.culture_philosophy.practices)
                ? `
            <h4>Cultural Practices</h4>
            <ul>${(faction.culture_philosophy.cultural_practices || faction.culture_philosophy.practices).map((r) => `<li>${r}</li>`).join("")}</ul>
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
            ${typeof faction.military_traditions.battlefield_philosophy === 'string' ? `<p>${faction.military_traditions.battlefield_philosophy}</p>` : `<ul>${(faction.military_traditions.battlefield_philosophy || []).map((p) => `<li>${p}</li>`).join("")}</ul>`}
            ${
              (faction.military_traditions.ritual_warfare || faction.military_traditions.rites_of_warfare)
                ? `
            <h4>Rites of Warfare</h4>
            <ul>${(faction.military_traditions.ritual_warfare || faction.military_traditions.rites_of_warfare).map((r) => `<li>${r}</li>`).join("")}</ul>
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
            ${(faction.military_traditions.unit_naming_conventions || faction.military_traditions.naming_conventions) ? `
            <h4>Unit Naming Conventions</h4>
            <ul>${(faction.military_traditions.unit_naming_conventions || faction.military_traditions.naming_conventions).map((n) => `<li>${n}</li>`).join("")}</ul>` : ''}
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
            <ul>${faction.geography_strongholds.battlefield_features.map((f) => typeof f === 'string' ? `<li>${f}</li>` : `<li><strong>${f.name}:</strong> ${f.description}</li>`).join("")}</ul>
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
                <div style="padding: 0.75rem; background: rgba(255,255,255,0.03); border-left: 3px solid ${color}; border-radius: 4px; cursor: pointer;" onclick="location.hash='#commander/${encodeURIComponent(c.name)}'">
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
                <div style="padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="location.hash='#unit/${encodeURIComponent(u.name)}'">
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
                <div style="padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="location.hash='#unit/${encodeURIComponent(u.name)}'">
                    <span>🤖 ${u.name}</span>
                    <span style="color: #e94560; font-weight: bold; font-size: 0.85rem;">${u.points_cost} pts</span>
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>

        <div style="margin-top: 1.5rem;">
            <button class="btn btn-secondary" onclick="location.hash='#factions'">← All Factions</button>
        </div>
    `;
}
