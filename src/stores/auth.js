import { defineStore } from 'pinia';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = parseJwt(token);
  return !payload || payload.exp * 1000 < Date.now();
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => {
      return !isTokenExpired(state.token);
    },

    userData: (state) => {
      if (isTokenExpired(state.token)) {
        return null;
      }
      return parseJwt(state.token);
    },
  },

  actions: {
    initialize() {
      const token = localStorage.getItem('token');
      if (!isTokenExpired(token)) {
        this.token = token;
      }
    },

    login(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
