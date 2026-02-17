// ==========================================
// Shardborne Universe Wiki - Army Builder
// ==========================================

function initArmyBuilder() {
  // Populate faction selector
  const factionContainer = document.getElementById("faction-select");
  if (factionContainer) {
    factionContainer.innerHTML = "";
    gameData.factions.forEach((f) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.textContent = (f.icon || "") + " " + f.name;
      btn.onclick = () => selectArmyFaction(f.id);
      factionContainer.appendChild(btn);
    });
  }

  // Leave commander select empty until faction is chosen
  const commanderSelect = document.getElementById("commander-select");
  if (commanderSelect) {
    commanderSelect.innerHTML = '<option value="">-- Choose a Faction First --</option>';
  }

  // Clear unit and fragment selectors
  const unitContainer = document.getElementById("unit-selector");
  if (unitContainer) unitContainer.innerHTML = '<p style="color: #555;">Select a faction and commander first.</p>';

  const fragContainer = document.getElementById("fragment-selector");
  if (fragContainer) fragContainer.innerHTML = '<p style="color: #555;">Select a faction first.</p>';

  // Update display
  updateArmyDisplay();
}

function selectArmyFaction(factionId) {
  // Clear army when switching faction
  currentArmy.faction = factionId;
  currentArmy.commander = null;
  currentArmy.evolution = null;
  currentArmy.units = [];
  currentArmy.fragments = [];

  // Highlight selected faction button
  document.querySelectorAll("#faction-select .filter-btn").forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");

  // Populate commander dropdown with only this faction's commanders
  const commanderSelect = document.getElementById("commander-select");
  if (commanderSelect) {
    const factionCommanders = getCommandersByFaction(factionId);
    commanderSelect.innerHTML = '<option value="">-- Choose a Commander --</option>';
    factionCommanders.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.name;
      option.textContent = `${c.name}${c.title ? " — " + c.title : ""}${c.points_cost ? " (" + c.points_cost + " pts)" : ""}`;
      commanderSelect.appendChild(option);
    });
  }

  // Clear commander preview
  const preview = document.getElementById("commander-preview");
  if (preview) preview.innerHTML = "";

  // Clear evolution preview
  const evoPreview = document.getElementById("evolution-preview");
  if (evoPreview) evoPreview.innerHTML = "";
  document.querySelectorAll("#evolution-select .filter-btn").forEach((b) => b.classList.remove("active"));

  // Load faction-specific units and fragments
  loadUnitSelector("all");
  loadFragmentSelector();
  updateArmyDisplay();
}

function loadUnitSelector(filterType) {
  const container = document.getElementById("unit-selector");
  if (!container) return;

  container.innerHTML = "";

  if (!currentArmy.faction) {
    container.innerHTML = '<p style="color: #555;">Select a faction first.</p>';
    return;
  }

  // Get units for the selected faction only
  const factionUnits = getUnitsByFaction(currentArmy.faction);
  const filteredUnits =
    filterType === "all"
      ? factionUnits
      : factionUnits.filter((u) => u.type === filterType);

  // Get signature unit names from selected commander
  const signatureUnits = (currentArmy.commander && currentArmy.commander.signature_units) || [];

  if (filteredUnits.length === 0) {
    container.innerHTML = '<p style="color: #555;">No units of this type for this faction.</p>';
    return;
  }

  filteredUnits.forEach((unit) => {
    const isSignature = signatureUnits.includes(unit.name);
    const div = document.createElement("div");
    div.className = "unit-option" + (isSignature ? " signature-unit" : "");
    div.onclick = () => addUnitToArmy(unit.name);
    const descPreview = unit.description ? unit.description.substring(0, 120) + (unit.description.length > 120 ? '...' : '') : '';
    div.innerHTML = `
            <div>
                <span class="unit-name">${isSignature ? "★ " : ""}${unit.name}</span>
                <span class="unit-cost">${unit.points_cost} pts</span>
            </div>
            ${descPreview ? `<div style="font-size: 0.7rem; color: #888; margin-top: 2px; line-height: 1.3;">${descPreview}</div>` : ''}
        `;
    div.title = unit.description || unit.flavor_text || '';
    container.appendChild(div);
  });
}

function loadFragmentSelector() {
  const container = document.getElementById("fragment-selector");
  if (!container) return;

  if (!currentArmy.faction) {
    container.innerHTML = '<p style="color: #555;">Select a faction first.</p>';
    return;
  }

  const factionFragments = getFragmentsByFaction(currentArmy.faction);

  container.innerHTML = '<div class="unit-selector">';

  factionFragments.forEach((fragment) => {
    const isSelected = currentArmy.fragments.includes(fragment.name);
    container.innerHTML += `
            <div class="unit-option ${isSelected ? "selected" : ""}" onclick="toggleFragment('${fragment.name.replace(/'/g, "\\'")}')">
                <span class="unit-name">${fragment.name}</span>
                <span class="unit-cost">${fragment.risk_instability}</span>
            </div>
        `;
  });

  container.innerHTML += "</div>";
}

function filterUnits(type) {
  document
    .querySelectorAll("#army-builder-page .card:nth-child(6) .filter-controls .filter-btn")
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
    const faction = getFactionById(commander.faction);
    preview.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-inset, #050505); border: 1px solid var(--border, #1a3a1a);">
                <strong>${commander.name}</strong> - ${commander.theme}
                ${commander.signature_units ? `<div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--amber, #ffb000);">★ Signature Units: ${commander.signature_units.join(", ")}</div>` : ""}
                <div class="stats-grid" style="margin-top: 0.5rem;">
                    <div class="stat-item"><span class="stat-value">${commander.base_stats.Command}</span><span class="stat-label">CMD</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.base_stats.Knowledge}</span><span class="stat-label">KNW</span></div>
                    <div class="stat-item"><span class="stat-value">${commander.base_stats.Leadership}</span><span class="stat-label">LDR</span></div>
                </div>
                ${commander.battle_stats ? `
                <div style="font-size: 0.7rem; color: #555; margin-top: 0.5rem;">Battlefield: ATK ${commander.battle_stats.ATK} | DEF ${commander.battle_stats.DEF} | HP ${commander.battle_stats.HP} | MOV ${commander.battle_stats.MOV}" | RNG ${commander.battle_stats.RNG}" | MOR ${commander.battle_stats.MOR}</div>` : ""}
                ${commander.points_cost ? `<div style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--green, #33ff33);">${commander.points_cost} pts</div>` : ""}
            </div>
        `;
  } else if (preview) {
    preview.innerHTML = "";
  }

  // Refresh unit selector to show/highlight signature units
  loadUnitSelector("all");
  // Reset unit type filter buttons
  document.querySelectorAll("#army-builder-page .card:nth-child(6) .filter-controls .filter-btn").forEach((b, i) => {
    b.classList.toggle("active", i === 0);
  });

  // Update skill tree display in army builder
  const skillTreeCard = document.getElementById("army-skill-tree-card");
  const skillTreeDisplay = document.getElementById("army-skill-tree-display");
  const universalRef = document.getElementById("universal-tree-ref");
  if (skillTreeCard && skillTreeDisplay) {
    if (commander) {
      skillTreeCard.style.display = "block";
      skillTreeDisplay.innerHTML = renderCommanderSkillTreeCard(commander);
      if (universalRef) {
        universalRef.innerHTML = renderUniversalSkillTreeReference();
      }
    } else {
      skillTreeCard.style.display = "none";
      skillTreeDisplay.innerHTML = "";
    }
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
    .querySelectorAll("#army-builder-page .card:nth-child(5) .filter-btn")
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

    // Restore faction selection
    if (currentArmy.faction) {
      document.querySelectorAll("#faction-select .filter-btn").forEach((b) => {
        const factionName = gameData.factions.find(f => f.id === currentArmy.faction);
        if (factionName && b.textContent.includes(factionName.name)) {
          b.classList.add("active");
        } else {
          b.classList.remove("active");
        }
      });

      // Repopulate commander dropdown for faction
      const commanderSelect = document.getElementById("commander-select");
      if (commanderSelect) {
        const factionCommanders = getCommandersByFaction(currentArmy.faction);
        commanderSelect.innerHTML = '<option value="">-- Choose a Commander --</option>';
        factionCommanders.forEach((c) => {
          const option = document.createElement("option");
          option.value = c.name;
          option.textContent = `${c.name}${c.title ? " — " + c.title : ""}${c.points_cost ? " (" + c.points_cost + " pts)" : ""}`;
          commanderSelect.appendChild(option);
        });
      }
    }

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
      faction: null,
      commander: null,
      evolution: null,
      units: [],
      fragments: [],
      pointsLimit: 200,
    };

    // Reset faction buttons
    document.querySelectorAll("#faction-select .filter-btn").forEach((b) => b.classList.remove("active"));

    document.getElementById("commander-select").innerHTML = '<option value="">-- Choose a Faction First --</option>';
    document.getElementById("commander-preview").innerHTML = "";
    document.getElementById("evolution-preview").innerHTML = "";
    document.querySelectorAll("#evolution-select .filter-btn").forEach((b) => b.classList.remove("active"));
    document.getElementById("points-limit").textContent = "200";

    const unitContainer = document.getElementById("unit-selector");
    if (unitContainer) unitContainer.innerHTML = '<p style="color: #555;">Select a faction and commander first.</p>';

    loadFragmentSelector();
    updateArmyDisplay();
    updateFragmentEffects();
  }
}
