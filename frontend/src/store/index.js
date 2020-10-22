import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenAuth: localStorage.getItem('tokenAuth') || '',
    users: [],
    inventory: [],
    loading: true,
  },
  getters: {
    tokenAuth: (state) => state.tokenAuth,
    inventory: (state) => state.inventory,
    loading: (state) => state.loading,
    users: (state) => state.users,
  },
  mutations: {
    SET_TOKEN(state, newToken) {
      state.tokenAuth = newToken
      state.loading = true
    },
    SET_INVENTORY(state, inventoryData) {
      state.inventory = inventoryData
      state.loading = true
    },
    SET_USERS(state, listUsers) {
      state.users = listUsers
      state.loading = true
    },
    DELETE_CREDENTIALS(state) {
      state.tokenAuth = ''
      localStorage.removeItem('tokenAuth')
      state.loading = true
    },
    LOADING(state) {
      state.loading = false
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
      commit('LOADING')
      axios
        .get('http://localhost:3000/api/resources')
        .then((response) => {
          commit('SET_INVENTORY', response.data.resources)
        })
        .catch((error) => {
          console.log('error al obtener inventario', error)
        })
    },
    async GET_USERS({ commit }) {
      commit('LOADING')
      axios
        .get('http://localhost:3000/api/users')
        .then((response) => {
          commit('SET_USERS', response.data.users)
        })
        .catch((error) => {
          console.log('error al obtener inventario', error)
        })
    },
    async ADD_USER({ commit }, userData) {
      commit('LOADING')
      axios
        .post('http://localhost:3000/api/user', userData)
        .then((response) => {
          return true
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
