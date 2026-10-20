// ============================================================
// AUTH STUB - Bỏ qua login
// ============================================================
window.Auth = {
  currentUser: null,
  async login() { throw new Error('Login disabled in standalone mode'); },
  async logout() { },
  onChange() { }
};
console.log('[auth] Disabled in standalone mode');
