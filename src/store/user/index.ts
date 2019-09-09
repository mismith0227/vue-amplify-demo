import { Module } from 'vuex'
import { RootState } from '../rootState'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { UserState } from './states'

export const state: UserState = {
  user: null,
  tempUser: null,
  error: false,
  execute: null,
}

const namespaced: boolean = true

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
