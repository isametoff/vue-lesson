import * as regApi from '@/api/registration.js';
import * as authApi from '@/api/auth.js';

export default {
  namespaced: true,
  state: {
    user: [],
    errors: {
      email: '',
      login: '',
      password: '',
      password_confirmation: '',
      error: '',
    },
    token: '',
    // token: localStorage.getItem('access_token') || '',
  },
  getters: {
    valueToken: (state) =>
      state?.token ? state.token : localStorage.getItem('access_token'),
    isToken: (state) => state.token !== '',
    isLogin: (state) => (state.user?.login !== undefined ? true : false),
    allAlerts: (state) => state.errors,
    userItems: (state) => state.user,
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
    setToken(state, { token }) {
      state.token = token;
    },
    cleanErrors(state) {
      state.errors = {
        email: '',
        login: '',
        password: '',
        password_confirmation: '',
        error: '',
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
    addAlertsError(state, { error }) {
      state.errors.error = error;
    },
  },
  actions: {
    async autoLogin({ commit, getters, state }) {
      let { res, data } = await authApi.check({ token: getters.valueToken });
      if (res === true) {
        commit('setToken', { token: getters.valueToken });
      }
      if (res === true) {
        commit('setUser', data);
      }
    },

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
      let { error } = data;
      commit('addAlertsEmail', {
        error,
      });
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

    async auth({ getters, state, commit }, { login, password, isAuth }) {
      if (!getters.isLogin) {
        let { res, data } = await authApi.auth({ login, password, isAuth });

        let { access_token } = data;

        if (access_token && res === true) {
          localStorage.setItem('access_token', access_token);
          commit('setToken', { token: access_token });
        }
        let { error } = data;
        commit('addAlertsError', {
          error,
        });
        if (res === true) {
          commit('cleanErrors');
          let { res, data } = await authApi.check({ token: access_token });
          if (res === true) {
            commit('setUser', data);
          }
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
      }
    },

    async logOut({ getters, commit, dispatch }) {
      let { res, data } = await authApi.logOut({ token: getters.valueToken });

      if (res === true && data.logout === true) {
        commit('setUser', []);
        commit('setToken', { token: '' });
        localStorage.setItem('access_token', '');
        dispatch(
          'alerts/add',
          {
            text: data.message,
            fixed: false,
          },
          { root: true }
        );
      }
    },

    cleanErrors({ commit }) {
      commit('cleanErrors');
    },
    cleanData({ commit, state, getters }) {
      commit('setUser', []);
      commit('setToken', '');
      console.log(
        '🚀 ~ file: user.js ~ line 197 ~ getters.isLogin',
        getters.isLogin,
        state.user,
        // this.$router.push({ name: 'catalog' })
      );
    },
  },
};
