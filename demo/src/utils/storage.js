const TOKEN_KEY = 'fleet_access_token';
const REFRESH_KEY = 'fleet_refresh_token';
const REMEMBER_KEY = 'fleet_remember_me';
const USER_KEY = 'fleet_user';

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY),
  setToken: (token, remember) => {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(TOKEN_KEY, token);
    localStorage.setItem(REMEMBER_KEY, String(remember));
  },
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY),
  setRefreshToken: (token, remember) => {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(REFRESH_KEY, token);
  },
  getUser: () => {
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user, remember) => {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(USER_KEY, JSON.stringify(user));
  },
  clearAuth: () => {
    [localStorage, sessionStorage].forEach((s) => {
      s.removeItem(TOKEN_KEY);
      s.removeItem(REFRESH_KEY);
      s.removeItem(USER_KEY);
    });
    localStorage.removeItem(REMEMBER_KEY);
  },
  isRemembered: () => localStorage.getItem(REMEMBER_KEY) === 'true',
};