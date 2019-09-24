import { GetterTree } from 'vuex'
import { RootState } from '../rootState'
import { UserState } from './states'

export const getters: GetterTree<UserState, RootState> = {
  user: state => state.user,
  error: state => state.error,
  execute: state => state.execute,
}
