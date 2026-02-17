// ==========================================
// Shardborne Universe Wiki - Fragments Page
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
            ${fragment.activation_cost ? `<p><strong>Activation Cost:</strong> ${fragment.activation_cost} ${fragment.faction === "veilbound-shogunate" ? "Ritual Flow" : fragment.faction === "nightfang-dominion" ? "Blood Charge(s)" : "Fragment Charge(s)"}</p>` : ""}
            <p><strong>Evolution Synergy:</strong> ${fragment.interaction_evolution}</p>
        `;
    contentEl.appendChild(card);
  });
}
