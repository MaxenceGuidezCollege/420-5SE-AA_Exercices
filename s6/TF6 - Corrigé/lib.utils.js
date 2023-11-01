function isInt(n) {
    // Utiliser le double == pour forcer la coercicion
    // Ne pas utiliser le comparateur strict ===
    return Number.parseInt(n) == n;
}

module.exports = {
    isInt
};