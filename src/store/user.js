import * as regApi from '@/api/registration.js';
import * as authApi from '@/api/auth.js';
import getters from './cart/getters';

export default {
  namespaced: true,
  state: {
    user: null,
    errors: { email: '', login: '', password: '', password_confirmation: '' },
  },
  getters: {
    isLogin: (state) => state.user !== null,
    allAlerts: (state) => state.errors,
    allUser: (state) => state.user,
    isAlertsEmail: (state) => (state.errors?.email !== '' ? true : false),
    isAlertsLogin: (state) => (state.errors?.login !== '' ? true : false),
    isAlertsPassword: (state) => (state.errors?.password !== '' ? true : false),
    isAlertsPasswordConfirm: (state) =>
      state.errors?.password_confirmation !== '' ? true : false,
    isAlerts: (getters) =>
      getters.isAlertsEmail ||
      getters.isAlertsLogin ||
      getters.isAlertsPassword ||
      getters.isAlertsPasswordConfirm === true,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    cleanErrors(state) {
      state.errors = {
        email: '',
        login: '',
        password: '',
        password_confirmation: '',
      };
    },
    addAlertsEmail(state, { email }) {
      state.errors.email = email;
    },
    addAlertsLogin(state, { login }) {
      state.errors.login = login;
    },
    addAlertsPassword(state, { password }) {
      state.errors.password = password;
    },
    addAlertsPasswordConfirm(state, { password_confirmation }) {
      state.errors.password_confirmation = password_confirmation;
    },
  },
  actions: {
    async registration(
      { state, commit, getters },
      { email, login, password, password_confirmation, register }
    ) {
      let { res, data } = await regApi.registration({
        email: email,
        login: login,
        password: password,
        password_confirmation: password_confirmation,
        register: register,
      });

      if (res === true) {
        commit('cleanErrors');
      }
      if (email !== '' || (register === true && email == '')) {
        let { email } = data;
        email = email?.[0] ?? '';
        commit('addAlertsEmail', {
          email,
        });
      }
      if (login !== '' || (register === true && login == '')) {
        let { login } = data;
        login = login?.[0] ?? '';
        commit('addAlertsLogin', {
          login,
        });
      }
      if (password !== '' || (register === true && password == '')) {
        let { password } = data;
        password = password?.[0] ?? '';
        commit('addAlertsPassword', {
          password,
        });
      }
      if (
        password_confirmation !== '' ||
        (register === true && password_confirmation == '')
      ) {
        let { password_confirmation } = data;
        password_confirmation = password_confirmation?.[0] ?? '';
        commit('addAlertsPasswordConfirm', {
          password_confirmation,
        });
      }
      return data;
    },
    async auth({ state, commit }, { login, password, isAuth }) {
      let { res, data } = await authApi.auth({ login, password, isAuth });

      if (res === true && data === true) {
        commit('cleanErrors');
      }
      if (login !== '' || (isAuth === true && login == '')) {
        let { login } = data;
        login = login?.[0] ?? '';
        commit('addAlertsLogin', {
          login,
        });
      }
      if (password !== '' || (isAuth === true && password == '')) {
        let { password } = data;
        password = password?.[0] ?? '';
        commit('addAlertsPassword', {
          password,
        });
      }
      return data;
    },
    cleanErrors({ commit }) {
      commit('cleanErrors');
    },
  },
};
