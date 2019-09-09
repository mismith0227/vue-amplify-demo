import store from '@/store'
import { actions as userAction } from '@/store/user/actions'
import { Auth } from 'aws-amplify'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyEventBus, AmplifyPlugin, components } from 'aws-amplify-vue'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/Home/index.vue'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

// function getUser() {
//   return Auth.currentAuthenticatedUser()
//     .then(data => {
//       console.log(data)
//       if (data && data.signInUserSession) {
//         auth.mutations.setUser(auth.state, data)
//         return data
//       }
//     })
//     .catch(e => {
//       AmplifyStore.commit('setUser', null)
//       return null
//     })
// }

// getUser().then((user, error) => {
//   if (user) {
//     router.push({ path: '/' })
//   }
// })

// AmplifyEventBus.$on('authState', async state => {
//   if (state === 'signedOut') {
//     user = null
//     AmplifyStore.commit('setUser', null)
//     router.push({ path: '/auth' })
//   } else if (state === 'signedIn') {
//     user = await getUser()
//     router.push({ path: '/' })
//   }
// })

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: components.Authenticator,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    Auth.currentAuthenticatedUser()
      .then(data => {
        store.commit('user/SET_USER_SUCCESS', data)

        next('/')
      })
      .catch(err => {
        // tslint:disable-next-line
        console.log(err)
        next({ path: '/login' })
      })
  }
  return next()
})

export default router
