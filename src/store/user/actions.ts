import * as AuthApi from '@/apis/Auth/'
import router from '@/router'
import { ActionTree } from 'vuex'
import { RootState } from '../rootState'
import * as actionTypes from './actionTypes'
import { UserState } from './states'

export const actions: ActionTree<UserState, RootState> = {
  async signinAction({ commit }, payload) {
    const response: any = await AuthApi.signIn(
      payload.userName,
      payload.password
    )
    commit(actionTypes.LOGIN_SUCCESS, response)
    router.push('/')
  },
  async signoutAction({ commit }) {
    AuthApi.signOut()
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
