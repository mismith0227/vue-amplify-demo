import router from '@/router'
import AmplifyStore from '@/store'
import { Auth } from 'aws-amplify'

export function signOut() {
  Auth.signOut()
    .then(data => {
      return router.push('/login')
    })
    .catch(err => {
      // tslint:disable-next-line
      console.error(err)
    })
}
