import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'

import Amplify from 'aws-amplify'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

import appSyncConfig from './aws-exports'

Amplify.configure(appSyncConfig)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
