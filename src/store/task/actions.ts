import * as TasksApi from '@/apis/Tasks/'
import { RootState } from '@/store/rootState'
import { ActionTree } from 'vuex'
import * as actionTypes from './actionTypes'
import { TaskState } from './states'

export const actions: ActionTree<TaskState, RootState> = {
  async addTaskAction({ commit }, payload) {
    const response: any = await TasksApi.createTask(
      payload.title,
      payload.description
    )

    try {
      if (response.data) {
        commit(actionTypes.ADD_TASK_SUCCESS, response.data.createTodo)
      } else {
        commit(actionTypes.ADD_TASK_FAILED, response.data.errors)
      }
    } catch (e) {
      commit(actionTypes.ADD_TASK_ERROR)
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
        commit(actionTypes.UPDATE_TASK_SUCCESS, response.data.updateTodo)
      } else {
        commit(actionTypes.UPDATE_TASK_FAILED, response.data.errors)
      }
    } catch (error) {
      commit(actionTypes.UPDATE_TASK_ERROR)
    }
  },
  async removeTaskAction({ commit }, id: string) {
    const response: any = await TasksApi.removeTask(id)
    try {
      commit(actionTypes.REMOVE_TASK_SUCCESS, response.data.deleteTodo.id)
    } catch (error) {
      commit(actionTypes.REMOVE_TASK_ERROR, response.data.errors)
    }
  },
  async getTasksAction({ commit }) {
    const response: any = await TasksApi.getList()
    try {
      if (response.data) {
        commit(actionTypes.LIST_TASK_SUCCESS, response.data.listTodos.items)
      }
    } catch (error) {
      commit(actionTypes.LIST_TASK_ERROR)
    }
  },
}
