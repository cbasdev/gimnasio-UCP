import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenAuth: localStorage.getItem('tokenAuth') || '',
    loading: true,
  },
  getters: {
    tokenAuth: (state) => state.tokenAuth,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_TOKEN(state, newToken) {
      state.tokenAuth = newToken
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
            localStorage.setItem('tokenAuth', response.data.token)
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
    async ADD_USER({ commit, dispatch }, userData) {
      commit('LOADING')
      axios
        .post('http://localhost:3000/api/user', userData)
        .then((response) => {
          dispatch('GET_USERS').then(() => {
            resolve(true)
          })
        })
        .catch((error) => reject(error))
    },
    async CLOSE_SESSION({ commit }) {
      commit('DELETE_CREDENTIALS')
    },
  },
  modules: {},
})
