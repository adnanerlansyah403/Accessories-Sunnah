import { listFile, upload } from '~/api/v1/storage';

export default {
  namespaced: true,
  state () {
      return {
        images: [],
        image_product: '',
        
        currentPage: 1, // Halaman saat ini untuk ayat
        perPage: 10,

        status: false,
        message: '',
      };
  },
  getters: {

  },
  mutations: {
    SET_RESPONSE(state, { message, status }) {
      state.message = message;
      state.status = status;
    },
    SET_IMAGES(state, images) {
      state.images = images;
    },
    SET_IMAGE(state, image) {
      state.image_product = image;
    }
  },
  actions: {
    async uploadFile({commit}, { file, body }) {
      try {
        const response = await upload(file, body);
        if(response.status === 200) {
          const image = response.data;
          const { status, statusText } = response;
          commit('SET_RESPONSE', { statusText, status });
          commit('SET_IMAGE', image.Key);
        }
      } catch (error) {
        console.error(error);
        throw error?.response?.data;
      }
    },
    async images({ commit }, path) {
      try {
        const response = await listFile(path);
        console.log(response);
        if(response.status === 200) {
          const images = response?.data
          const { status, statusText } = response;
          commit('SET_RESPONSE', { statusText, status });
          commit('SET_IMAGES', images);
        }
      } catch (error) {
        console.error(error);
        throw error?.response?.data;
      }
    }
  }
}