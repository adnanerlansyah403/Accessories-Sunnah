import { fetchMe, magiclink, recover, refresh, signin, signout, signup } from '~/api/v1/auth';

// const userData = JSON.parse(localStorage.getItem('user'))
export default {
  namespaced: true,
  state () {
      return {
        user: process.server ? null : JSON.parse(localStorage.getItem('user')),
        access_token: null,
        refresh_token: null,
        isLoggedIn: false,
        
        currentPage: 1, // Halaman saat ini untuk ayat
        perPage: 10,

        status: false,
        message: '',
      };
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    SET_RESPONSE(state, { message, status }) {
      state.message = message;
      state.status = status;
    },
    SET_USER(state, { user, access_token, refresh_token }) {
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isLoggedIn = true;
    },
    RESET_TOKEN(state) {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      localStorage.clear();
    },
  },
  actions: {
    async login({ commit }, body) {
        try {
            const response = await signin(body);
            if(response?.status == 200) {
              const { status, statusText } = response
              const user = response.data?.user
              const access_token = response.data?.access_token
              const refresh_token = response.data?.refresh_token
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('access_token', access_token)
              localStorage.setItem('refresh_token', refresh_token)
              commit('SET_RESPONSE', { statusText, status });
              commit('SET_USER', { user, access_token, refresh_token })
            }
        } catch (error) {   
            console.error(error);
            throw error?.response?.data;
        }
    },
    async register({ commit }, body) {
      try {
          const response = await signup(body);
          if(response?.status == 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
          }
      } catch (error) {   
          console.error(error);
      }
    },
    async logout({ commit }) {
      try {
          const response = await signout();
          if(response?.status == 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
            commit('RESET_TOKEN');
          }
      } catch (error) {  
          commit('RESET_TOKEN');
          console.error(error);
      }
    },
    async forgotPassword({ commit }, body) {
      try {
          const response = await magiclink(body);
          if(response?.status == 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
          }
      } catch (error) {  
          console.error(error);
          throw error.response.data;
      }
    },
    async resetPassword({ commit }, { body, token }) {
      try {
          const response = await recover(body, token);
          if(response?.status == 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
          }
      } catch (error) {  
          console.error(error);
          throw error?.response?.data;
      }
    },
    async me({ commit }) {
      try {
        const response = await fetchMe();
        if(response.status === 200) {
          const { status, statusText } = response
          const user = response.data?.user
          const access_token = response.data?.access_token
          const refresh_token = response.data?.refresh_token
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          commit('SET_RESPONSE', { statusText, status });
          commit('SET_USER', { user, access_token, refresh_token });
        }
      } catch (error) {
        const { status, statusText } = error?.response
        commit('SET_RESPONSE', { statusText, status });
        // throw error?.response;
      }
    },
    async refreshToken({ commit }, body) {
      try {
        const response = await refresh(body);
        if(response.status === 200) {
          const { status, statusText } = response
          const user = JSON.parse(localStorage.getItem('user'));
          const access_token = localStorage.getItem('access_token');
          const refresh_token = localStorage.getItem('refresh_token');
          commit('SET_RESPONSE', { statusText, status });
          commit('SET_USER', { user, access_token, refresh_token });
        }
      } catch (error) {
        console.error(error);
        // throw error.response
      }
    },
    async isLoggedIn() {
      try {
        const response = await fetchMe();
        if(response.status === 200) {
          return true
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}