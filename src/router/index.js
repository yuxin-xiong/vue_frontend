import Vue from 'vue'
import VueRouter from 'vue-router'


// 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)
// import HomeTitle from '@/components/home/HomeTitle.vue'
import HomeIndex from '@/components/home/HomeIndex.vue'
import VideoContent from '@/components/home/VideoContent.vue'
import ImageContent from '@/components/home/ImageContent.vue'

// 路由规则的数组
const routes = [
  // 定义首页的路由规则
  { path: '/', redirect:'/home' },
  { 
    path: '/home', component: HomeIndex,
    children:[
      {path:'',component:HomeIndex},
      {path:'proimage',component:ImageContent},
      {path:'provideo',component:VideoContent},
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
