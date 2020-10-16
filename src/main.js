import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import {
    Button, Table ,Carousel,CarouselItem,Avatar,Input,
    Poptip,Affix,Menu,MenuItem,Submenu,Icon,MenuGroup
  } from 'view-design';
import 'view-design/dist/styles/iview.css';
import store from './store'

Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('Avatar', Avatar);
Vue.component('Input', Input);
Vue.component('Poptip', Poptip);
Vue.component('Affix', Affix);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Submenu', Submenu);
Vue.component('Icon', Icon);
Vue.component('MenuGroup', MenuGroup);
Vue.config.productionTip = false

const VM = new Vue({
  render: h => h(App),
  router,store,
}).$mount('#app')

export default VM