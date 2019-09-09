import Task from './types'

export interface TaskState {
  taskModel?: Task
  tasks: Task[]
  messageError?: any[]
  error: boolean
}
