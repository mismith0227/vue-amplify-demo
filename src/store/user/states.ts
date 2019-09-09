import User from './types'

export interface UserState {
  user: User | null
  tempUser: { userName: string; password: string } | null
  error: boolean
  execute: string | null
}
