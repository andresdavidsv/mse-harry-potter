import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'

// BootstrapVue
import './plugins/bootstrapVue'

// Vue Font-Awesome
import './plugins/fontAwesome'

// CSS global
import './assets/css/main.scss'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  methods: {
    init () {
      console.log(
        'Hello 🌝, this application was developed by Andres David Solarte, please visited his github 😎 https://github.com/andresdavidsv'
      )
    }
  },
  created () {
    this.init()
  },
  render: (h) => h(App)
}).$mount('#app')
