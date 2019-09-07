import Task from '@/models/task'

export interface TaskState {
  taskModel?: Task
  tasks: Task[]
  messageError?: any[]
  error: boolean
}
