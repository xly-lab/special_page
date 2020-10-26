import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login/login.vue'
import Main from '../components/Main/main.vue'
import Personal from '../components/Personal/personal.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {path:'/',redirect:'/main'},
        {path:'/login',component:Login},
        {path:'/main',component:Main},
        {path:'/personal',component:Personal}
    ]
})