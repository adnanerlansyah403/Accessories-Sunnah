import { createProduct, deleteProduct, getDetailProduct, getProducts, updateProduct } from '~/api/v1/products';

export default {
  namespaced: true,
  state () {
      return {
        products: [],
        product: null,
        
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
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
  },
  actions: {
      async fetchProducts({ commit }) {
        try {
            const response = await getProducts();
            if(response.status === 200) {
              const products = response?.data
              const { status, statusText } = response;
              commit('SET_RESPONSE', { statusText, status });
              commit('SET_PRODUCTS', products)
            }
        } catch (error) {
            console.error(error);
        }
      },
      async fetchDetailProduct({ commit }, id) {
        try {
            const response = await getDetailProduct(id);
            if(response.status === 200) {
              const product = response?.data
              const { status, statusText } = response;
              commit('SET_RESPONSE', { statusText, status });
              commit('SET_PRODUCT', product[0])
            }
        } catch (error) {
            console.error(error);
        }
      },
      async storeProduct({ commit }, body) {
        try {
          const response = await createProduct(body);
          console.log(response);
          if(response.status === 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
          }
        } catch (error) {
          console.error(error);
        }
      },
      async editProduct({ commit }, { id, body }) {
        try {
          const response = await updateProduct(id, body);
          if(response.status === 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
          }
        } catch (error) {
          console.error(error);
        }
      },
      async removeProduct({ commit }, id) {
        try {
          const response = await deleteProduct(id);
          console.log(response);
          if(response.status === 200) {
            const { status, statusText } = response
            commit('SET_RESPONSE', { statusText, status });
          }
        } catch (error) {
          console.error(error);
        }
      }
  }
}