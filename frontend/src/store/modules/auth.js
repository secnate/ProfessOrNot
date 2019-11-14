import axios from "axios";

const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {}
};
const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  getUser: state =>  state.user
};
const actions = {
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/auth/register',
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
        },
        method: 'POST'})
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = 'Token ' + token
          const payload = [token, user]
          commit('auth_success', payload)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: '/auth/login', 
          data: {
              email: user.email,
              password: user.password
          },
          method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
            const payload = [token, user]
            commit('auth_success', payload)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        axios({url: '/auth/logout', 
          method: 'POST' })
          .then(resp => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    fetch_user({commit}){
      return new Promise((resolve, reject) => {
        axios({url: '/auth/user', 
          method: 'GET' })
          .then(resp => {
            const payload = resp.data
            commit('fetch_user', payload)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
}
const mutations = {
    auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, payload){
        state.status = 'success'
        state.token = payload[0]
        state.user = payload[1]
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
        state.user = ''
      },
      fetch_user(state, payload){
        state.token = localStorage.getItem("token")
        state.status = 'success'
        state.user = payload
      }
}

export default {
  state,
  getters,
  mutations,
  actions
};