import Home from '@/components/pages/Home/index.vue'
import Signin from '@/components/pages/Signin/index.vue'
import store from '@/store'
import { actions as userAction } from '@/store/user/actions'
import { Auth } from 'aws-amplify'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyEventBus, AmplifyPlugin, components } from 'aws-amplify-vue'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

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
      component: Signin,
      meta: { requiresAuth: false },
    },
  ],
})

// storeからsinein out の状態をとってくる
// AmplifyEventBus.$on('authState', async (state: string) => {
//   if (state === 'signedOut') {
//     store.commit('user/SET_USER_SUCCESS', null)
//     router.push({ path: '/auth' })
//   } else if (state === 'signedIn') {
//     router.push({ path: '/' })
//   }
// })

router.beforeEach(async (to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      store.commit('user/SET_USER_SUCCESS', user)
      if (to.path === '/confirmCode' || to.path === '/login') {
        return next('/')
      }
      return next()
    } catch (err) {
      if (err === 'not authenticated') {
        if (to.path !== '/confirmCode' && to.path !== '/signin-mfa') {
          return next('/login')
        } else {
          // if (auth.state.tempUser || auth.state.user) {
          //   return next()
          // }
          return next('/login')
        }
      }
      return next('/')
    }
  }
  return next()
})

export default router
