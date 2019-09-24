import router from '@/router'
import AmplifyStore from '@/store'
import { Auth } from 'aws-amplify'

export function signIn(name, password) {
  return Auth.signIn(name, password)
    .then(data => {
      return data
    })
    .catch(err => {
      // tslint:disable-next-line
      console.error(err)
    })
}

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
