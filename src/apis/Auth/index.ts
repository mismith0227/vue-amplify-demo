import { Auth } from 'aws-amplify'
import router from '@/router'
import AmplifyStore from '../../store'

export function signOut() {
  Auth.signOut()
    .then(data => {
      AmplifyStore.commit('setUser', null)
      return router.push('/auth')
    })
    .catch(err => {
      console.error(err)
    })
}
