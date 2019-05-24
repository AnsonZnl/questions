import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GetForm from '@/components/GetForm.vue'
import PostForm from '@/components/PostForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/get_form',
      name: 'GetForm',
      component: GetForm
    },
    {
      path: '/post_form',
      name: PostForm,
      component: PostForm
    }
  ]
})
