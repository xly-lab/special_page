import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import store from './store'
import VueLazyload from 'vue-lazyload'

import errorImg from './assets/imgs/img_err.jpg'
import loadingImg from './assets/imgs/ing.gif'

Vue.use(VueLazyload)
Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImg,
  loading: loadingImg,
  attempt: 1
})

const VM = new Vue({
  render: h => h(App),
  router,store,
}).$mount('#app')

export default VM