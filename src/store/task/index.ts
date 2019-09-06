import { Module } from 'vuex'
import { RootState } from '../rootState'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { TaskState } from './states'

export const state: TaskState = {
  taskModel: undefined,
  tasks: [],
  error: false,
  messageError: [],
}

const namespaced: boolean = true

export const task: Module<TaskState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
