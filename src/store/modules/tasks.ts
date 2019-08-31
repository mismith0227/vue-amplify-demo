import * as TasksApi from '@/apis/Tasks/'
import Task from '@/types/Task'
import { API } from 'aws-amplify'
import Vuex, { createNamespacedHelpers } from 'vuex'
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper'

export interface State {
  tasks: Task[]
}

export interface Getters {
  tasks: Task[]
}

export interface Mutations {
  getTasks: {}
}

export interface Actions {
  getTasksAction: {}
}

export const state: State = {
  tasks: [],
}

export const getters: DefineGetters<Getters, State> = {
  tasks: state => state.tasks,
}

export const mutations: DefineMutations<Mutations, State> = {
  getTasks(state, tasks) {
    state.tasks = tasks
  },
}

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
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
