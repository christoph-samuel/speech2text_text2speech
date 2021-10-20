import Vue from 'vue'
import App from '@/App.vue'
import options from '@/config'
import '@/main.css'

Vue.config.productionTip = false

new Vue({
  ...options(Vue),
  render: h => h(App),
}).$mount('#app')
