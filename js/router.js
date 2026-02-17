// ==========================================
// Shardborne Universe Wiki - Router
// ==========================================

let _routerActive = false;

function showPage(pageId) {
  // If the router isn't currently handling a hashchange, update the hash
  // and let the hashchange handler do the rendering
  if (!_routerActive) {
    location.hash = "#" + pageId;
    return;
  }

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

function handleRoute() {
  _routerActive = true;

  const hash = location.hash.slice(1) || "home"; // Remove the '#'
  const parts = hash.split("/");
  const page = parts[0];
  const param = parts.length > 1 ? decodeURIComponent(parts.slice(1).join("/")) : null;

  // Handle detail routes
  if (page === "faction" && param) {
    showPage("factions");
    showFactionDetail(param);
  } else if (page === "commander" && param) {
    showPage("commanders");
    showCommander(param);
  } else if (page === "unit" && param) {
    showPage("units");
    showUnit(param);
  } else {
    showPage(page);
  }

  _routerActive = false;
}

// Listen for hash changes (back/forward buttons, programmatic)
window.addEventListener("hashchange", handleRoute);

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  if (location.hash) {
    handleRoute();
  } else {
    location.hash = "#home";
  }
});
