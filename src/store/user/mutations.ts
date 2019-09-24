import { MutationTree } from 'vuex'
import * as actionTypes from './actionTypes'
import { UserState } from './states'
import User from './types'

export const mutations: MutationTree<UserState> = {
  [actionTypes.LOGIN_SUCCESS](state, payload: User) {
    state.error = false
    state.user = payload
  },
  [actionTypes.LOGIN_ERROR](state) {
    state.error = true
    state.user = null
  },
  [actionTypes.GET_USER_SUCCESS](state, payload: User) {
    state.error = false
    state.user = payload
  },
  [actionTypes.GET_USER_ERROR](state) {
    state.error = true
    state.user = null
  },
  [actionTypes.SET_USER_SUCCESS](state, payload: User) {
    state.error = false
    state.user = payload
  },
  [actionTypes.SET_USER_ERROR](state) {
    state.error = true
    state.user = null
  },
  [actionTypes.LOGOUT_SUCCESS](state) {
    state.error = false
    state.user = null
  },
  [actionTypes.LOGOUT_ERROR](state) {
    state.error = true
  },
  [actionTypes.REGISTER_SUCCESS](state, payload: User) {
    state.error = false
    state.user = payload
  },
  [actionTypes.REGISTER_ERROR](state) {
    state.error = true
    state.user = null
  },
}
