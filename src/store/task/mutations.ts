import Task from '@/models/task'
import { MutationTree } from 'vuex'
import { TaskState } from './states'
import * as types from './types'

export const mutations: MutationTree<TaskState> = {
  [types.ADD_TASK_REQUEST](state) {
    state.error = false
    state.messageError = []
  },
  [types.ADD_TASK_SUCCESS](state) {
    state.error = false
    state.messageError = []
  },
  [types.ADD_TASK_FAILED](state, messageError: any[]) {
    state.error = false
    state.messageError = messageError
  },
  [types.ADD_TASK_ERROR](state) {
    state.error = true
    state.messageError = undefined
  },
  [types.UPDATE_TASK_SUCCESS](state) {
    state.error = false
    state.messageError = []
  },
  [types.UPDATE_TASK_FAILED](state, messageError: any[]) {
    state.error = false
    state.messageError = messageError
  },
  [types.UPDATE_TASK_ERROR](state) {
    state.error = true
    state.messageError = undefined
  },
  [types.REMOVE_TASK_SUCCESS](state) {
    state.error = false
  },
  [types.REMOVE_TASK_ERROR](state) {
    state.error = true
  },
  [types.LIST_TASK_SUCCESS](state, payload: Task[]) {
    state.tasks = payload
    state.error = false
    state.messageError = []
  },
  [types.LIST_TASK_ERROR](state) {
    state.error = true
    state.messageError = undefined
  },
  [types.TASK_SUCCESS](state, payload: Task) {
    state.error = false
    state.taskModel = payload
  },
  [types.TASK_ERROR](state) {
    state.error = true
  },
}
