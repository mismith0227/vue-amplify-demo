import { MutationTree } from 'vuex'
import * as actionTypes from './actionTypes'
import { TaskState } from './states'
import Task from './types'

export const mutations: MutationTree<TaskState> = {
  [actionTypes.ADD_TASK_REQUEST](state) {
    state.error = false
    state.messageError = []
  },
  [actionTypes.ADD_TASK_SUCCESS](state, payload: Task) {
    state.tasks.push(payload)
    state.error = false
    state.messageError = []
  },
  [actionTypes.ADD_TASK_FAILED](state, messageError: any[]) {
    state.error = false
    state.messageError = messageError
  },
  [actionTypes.ADD_TASK_ERROR](state) {
    state.error = true
    state.messageError = undefined
  },
  [actionTypes.UPDATE_TASK_SUCCESS](state, payload: Task) {
    state.tasks.map(item => {
      if (item.id === payload.id) {
        item.name = payload.name
        item.description = payload.description
      }
    })
    state.error = false
    state.messageError = []
  },
  [actionTypes.UPDATE_TASK_FAILED](state, messageError: any[]) {
    state.error = false
    state.messageError = messageError
  },
  [actionTypes.UPDATE_TASK_ERROR](state) {
    state.error = true
    state.messageError = undefined
  },
  [actionTypes.REMOVE_TASK_SUCCESS](state, payload: string) {
    state.tasks = state.tasks.filter(item => {
      return item.id !== payload
    })

    state.error = false
  },
  [actionTypes.REMOVE_TASK_ERROR](state) {
    state.error = true
  },
  [actionTypes.LIST_TASK_SUCCESS](state, payload: Task[]) {
    state.tasks = payload
    state.error = false
    state.messageError = []
  },
  [actionTypes.LIST_TASK_ERROR](state) {
    state.error = true
    state.messageError = undefined
  },
  [actionTypes.TASK_SUCCESS](state, payload: Task) {
    state.error = false
    state.taskModel = payload
  },
  [actionTypes.TASK_ERROR](state) {
    state.error = true
  },
}
