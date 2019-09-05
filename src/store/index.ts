import { auth } from '@/store/modules/auth'
import { tasks } from '@/store/modules/tasks'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    tasks,
  },
  state: {},
  mutations: {},
  actions: {},
})
