// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

// Import
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading
  }
})
