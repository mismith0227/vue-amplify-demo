import * as auth from '@/store/modules/auth.ts'
import { Auth } from 'aws-amplify'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/Home/index.vue'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyEventBus, AmplifyPlugin, components } from 'aws-amplify-vue'
import AmplifyStore from './store'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

function getUser() {
  return Auth.currentAuthenticatedUser()
    .then(data => {
      if (data && data.signInUserSession) {
        auth.mutations.setUser(auth.state, data)
        return data
      }
    })
    .catch(e => {
      AmplifyStore.commit('setUser', null)
      return null
    })
}

getUser().then((user, error) => {
  if (user) {
    router.push({ path: '/' })
  }
})

AmplifyEventBus.$on('authState', async state => {
  if (state === 'signedOut') {
    user = null
    AmplifyStore.commit('setUser', null)
    router.push({ path: '/auth' })
  } else if (state === 'signedIn') {
    user = await getUser()
    router.push({ path: '/' })
  }
})

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
      path: '/auth',
      name: 'auth',
      component: components.Authenticator,
    },
  ],
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    const user = await Auth.currentAuthenticatedUser()
    await auth.mutations.setUser(auth.state, user)

    if (!user) {
      return next({
        path: '/auth',
        query: {
          redirect: to.fullPath,
        },
      })
    }
    return next()
  }
  return next()
})

export default router
