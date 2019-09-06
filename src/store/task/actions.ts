import * as TasksApi from '@/apis/Tasks/'
import { RootState } from '@/store/rootState'
import { ActionTree } from 'vuex'
import { TaskState } from './states'
import * as types from './types'

export const actions: ActionTree<TaskState, RootState> = {
  async addTaskAction({ commit }, payload) {
    const response: any = await TasksApi.createTask(
      payload.title,
      payload.description
    )
    commit('addTask', response.data.createTodo)

    try {
      if (response && response.data.status === 'success') {
        commit(types.ADD_TASK_SUCCESS)
      } else {
        commit(types.ADD_TASK_FAILED, response.data.errors)
      }
    } catch (e) {
      commit(types.ADD_TASK_ERROR)
    }
  },
  async getTasksAction({ commit }) {
    const response: any = await TasksApi.getList()
    try {
      if (response && response.data) {
        commit(types.LIST_TASK_SUCCESS, response.data.listTodos.items)
      }
    } catch (error) {
      commit(types.LIST_TASK_ERROR)
    }
  },
}
