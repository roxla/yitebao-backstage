export default {
  namespaced: true,
  state: {
    userName: "",
    userInfo: {},
  },
  getters: {

  },
  mutations: {
    getUserName(state, name) {
      state.userName = name;
    },
    getUserInfo(state, info) {
      state.userInfo = info;
    }
  },
  actions: {

  }
}