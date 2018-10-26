import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter, Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
