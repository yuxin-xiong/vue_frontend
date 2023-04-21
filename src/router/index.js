import Vue from 'vue'
import VueRouter from 'vue-router'


// 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)
import Home from '@/components/Home.vue'
import MyImage from '@/components/MyImage.vue'
import MyVideo from '@/components/MyVideo.vue'
// 路由规则的数组
const routes = [
  // 定义首页的路由规则
  { path: '/', redirect:'/home' },
  { 
    path: '/home', component: Home,
    children:[
      {path:'',component:MyImage},
      {path:'proimage',component:MyImage},
      {path:'provideo',component:MyVideo}
    ] 
  }

  // 定义我的路由规则
  // { path: '/user', component: User }
]

// 创建路由实例对象
const router = new VueRouter({
  routes
})

export default router
