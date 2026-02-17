// ==========================================
// Shardborne Universe Wiki - Helper Functions
// ==========================================

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
