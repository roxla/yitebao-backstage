import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import counter from './modules/counter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userInfo,
    counter
  }
})