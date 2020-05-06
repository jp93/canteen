import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import './common/stylus/index.styl'
import bridge from '@/bridge/h5'
import apis from './apis'
import Navigation from 'vue-navigation'
import VConsole from 'vconsole/dist/vconsole.min.js'
import Router from 'vue-router'


const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.config.productionTip = false

Vue.prototype.$request = bridge.Request
Vue.prototype.$apis = apis
//var vConsole = new VConsole();

Vue.use(Navigation, {router})


window._vue = new Vue({
  render: h => h(App),
  router
}).$mount('#app')
