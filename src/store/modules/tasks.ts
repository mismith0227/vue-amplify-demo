import * as TasksApi from '@/apis/Tasks/'
import Task from '@/types/Task'
import { createNamespacedHelpers } from 'vuex'
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper'

export interface State {
  tasks: Task[]
}

export interface Getters {
  entities: Task[]
}

export interface Mutations {
  addTask: {}
  updateTask: {}
  removeTask: {}
  getTasks: {}
}

export interface Actions {
  addTaskAction: {}
  updateTaskAction: {}
  removeTaskAction: {}
  getTasksAction: {}
}

export const state: State = {
  tasks: [],
}

export const getters: DefineGetters<Getters, State> = {
  entities: state => state.tasks,
}

export const mutations: DefineMutations<Mutations, State> = {
  addTask(state, newTask: Task) {
    state.tasks.push(newTask)
  },
  updateTask(state, editTask: Task) {
    // TODO
  },
  removeTask(state, removeId: string) {
    state.tasks = state.tasks.filter(item => {
      return item.id !== removeId
    })
  },
  getTasks(state, tasks) {
    // return {...state, tasks}
    state.tasks = tasks
  },
}

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  async addTaskAction({ commit }, payload) {
    const result: any = await TasksApi.createTask(
      payload.title,
      payload.description
    )
    commit('addTask', result.data.createTodo)
  },
  async updateTaskAction({ commit }, payload) {
    const result: any = await TasksApi.updateTask(
      payload.id,
      payload.title,
      payload.description
    )
    commit('updateTask', result.data.updateTodo)
  },
  async removeTaskAction({ commit }, id: string) {
    const result: any = await TasksApi.removeTask(id)
    commit('removeTask', result.data.deleteTodo.id)
  },
  async getTasksAction({ commit }) {
    const result: any = await TasksApi.getList()
    commit('getTasks', result.data.listTodos.items)
  },
}

export const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('tasks')

export const tasks = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
