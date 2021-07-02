import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  UserID: '',
  Email: '',
  Password: '',
  Username: '',
  Sex: '',
  Age: '',
  Image: '',
  roles: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.Username = name
  },
  SET_AVATAR: (state, avatar) => {
    state.Image = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SER_ID: (state, id) => {
    state.UserID = id
  },
  SET_EMAIL: (state, email) => {
    state.Email = email
  },
  SET_AGE: (state, age) => {
    state.Age = age
  },
  SET_PASSWORD: (state, password) => {
    state.Password = password
  },
  SET_SEX: (state, sex) => {
    state.Sex = sex
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const userid = data.userId
        const email = data.email
        const username = data.nickname
        const sex = data.sex
        const age = data.age
        const userimage = data.avatar

        // roles must be a non-empty array
        const unroles = ['admin']
        const userinfo = {
          roles: unroles,
          nickname: username,
          unemail: email,
          id: userid,
          usersex: sex,
          userage: age,
          useravatar: userimage
        }
        commit('SET_ROLES', unroles)
        commit('SET_NAME', username)
        commit('SET_AVATAR', userimage)
        commit('SET_EMAIL', email)
        commit('SER_ID', userid)
        commit('SET_SEX', sex)
        commit('SET_AGE', age)
        resolve(userinfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
