// ============================================================
// VOUCHER STUB
// ============================================================
window.Voucher = {
  async check() { return { valid: false, discount: 0 }; },
  async apply() { return null; }
};
console.log('[voucher] Stub loaded');
