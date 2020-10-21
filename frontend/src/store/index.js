import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenAuth: localStorage.getItem('tokenAuth') || '',
    inventory: [],
  },
  getters: {
    tokenAuth: (state) => state.tokenAuth,
    inventory: (state) => state.inventory,
  },
  mutations: {
    SET_TOKEN(state, newToken) {
      state.tokenAuth = newToken
    },
    SET_INVENTORY(state, inventoryData) {
      state.inventory = inventoryData
    },
    DELETE_CREDENTIALS(state) {
      state.tokenAuth = ''
      localStorage.removeItem('tokenAuth')
    },
  },
  actions: {
    LOGIN({ commit }, formData) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/api/auth/login', formData)
          .then((response) => {
            localStorage.setItem('tokenAuth', response.data.token)

            commit('SET_TOKEN', response.data.token)
            resolve(true)
          })
          .catch((error) => reject(error))
      })
    },
    async REGISTER({ commit }, formData) {
      console.log('data to send --> ', formData)
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/api/admin', formData)
          .then((response) => {
            commit('SET_TOKEN', response.data.token)
            localStorage.setItem(tokenAuth, response.data.token)
            resolve(true)
          })
          .catch((error) => reject(error))
      })
    },

    async GET_INVENTORY({ commit }) {
      axios
        .get('http://localhost:3000/api/resources')
        .then((response) => {
          commit('SET_INVENTORY', response.data.resources)
        })
        .catch((error) => {
          console.log('error al obtener inventario', error)
        })
    },
    async CLOSE_SESSION({ commit }) {
      commit('DELETE_CREDENTIALS')
    },
  },
  modules: {},
})
