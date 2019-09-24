import { GetterTree } from 'vuex'
import { RootState } from '../rootState'
import { TaskState } from './states'

export const getters: GetterTree<TaskState, RootState> = {
  tasks: state => state.tasks,
}
