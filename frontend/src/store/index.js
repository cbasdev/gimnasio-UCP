import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenAuth: '',
    session: false,
  },
  getters: {
    tokenAuth: (state) => state.tokenAuth,
    session: (state) => state.session,
  },
  mutations: {
    SET_TOKEN(state, newToken) {
      state.tokenAuth = newToken
      state.session = true
    },
  },
  actions: {
    async LOGIN_USER(_, data) {
      console.log(data)
      axios
        .post('http://localhost:3000/api/auth/login', data)
        .then((response) => {
          SET_TOKEN(response.data.token)
        })
        .catch((error) => {
          console.log('error al autenticar', error)
        })
    },
  },
  modules: {},
})
