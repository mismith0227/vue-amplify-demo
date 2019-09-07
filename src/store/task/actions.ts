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

    try {
      if (response.data) {
        commit(types.ADD_TASK_SUCCESS, response.data.createTodo)
      } else {
        commit(types.ADD_TASK_FAILED, response.data.errors)
      }
    } catch (e) {
      commit(types.ADD_TASK_ERROR)
    }
  },
  async updateTaskAction({ commit }, payload) {
    const response: any = await TasksApi.updateTask(
      payload.id,
      payload.title,
      payload.description
    )
    try {
      if (response.data) {
        commit(types.UPDATE_TASK_SUCCESS, response.data.updateTodo)
      } else {
        commit(types.UPDATE_TASK_FAILED, response.data.errors)
      }
    } catch (error) {
      commit(types.UPDATE_TASK_ERROR)
    }
  },
  async removeTaskAction({ commit }, id: string) {
    const response: any = await TasksApi.removeTask(id)
    try {
      commit(types.REMOVE_TASK_SUCCESS, response.data.deleteTodo.id)
    } catch (error) {
      commit(types.REMOVE_TASK_ERROR, response.data.errors)
    }
  },
  async getTasksAction({ commit }) {
    const response: any = await TasksApi.getList()
    try {
      if (response.data) {
        commit(types.LIST_TASK_SUCCESS, response.data.listTodos.items)
      }
    } catch (error) {
      commit(types.LIST_TASK_ERROR)
    }
  },
}
