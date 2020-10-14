import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login/login.vue'
import Main from '../components/main/main.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:Login},
        {path:'/main',component:Main}
    ]
})