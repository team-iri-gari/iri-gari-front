import { defineStore } from 'pinia';


// 토큰이 만료되었는지 확인
function isTokenExpired(token) {
  if (!token)
    return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => {
      if (isTokenExpired(state.token)) {
        this.logout();
        return false;
      }
      return true;
    },

    userData: (state) => {
      if (isTokenExpired(state.token)) {
        this.logout();
        return null;
      }

      const payloadBase64 = state.token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    },
  },

  actions: {
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
