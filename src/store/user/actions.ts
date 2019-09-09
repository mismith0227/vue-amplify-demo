import * as AuthApi from '@/apis/Auth/'
import { ActionTree } from 'vuex'
import { RootState } from '../rootState'
import * as actionTypes from './actionTypes'
import { UserState } from './states'

export const actions: ActionTree<UserState, RootState> = {
  async signinAction({ commit }, payload) {
    commit(actionTypes.LOGIN_SUCCESS, payload)
  },
  async signoutAction({ commit }) {
    const response: any = await AuthApi.signOut
    console.log(response)
    commit(actionTypes.LOGOUT_SUCCESS)
    try {
      commit(actionTypes.LOGOUT_SUCCESS)
    } catch (error) {
      commit(actionTypes.LOGOUT_ERROR)
    }
  },
  async setUerAction({ commit }, payload) {
    commit(actionTypes.SET_USER_SUCCESS, payload)
  },
}
