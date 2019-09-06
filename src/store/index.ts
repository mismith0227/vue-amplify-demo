import { auth } from '@/store/modules/auth'
import { task } from '@/store/task'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './rootState'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    auth,
    task,
  },
}

export default new Vuex.Store<RootState>(store)
