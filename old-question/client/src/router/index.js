import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import question from '@/components/questions.vue'
import PostForm from '@/components/PostForm.vue'
import Show from '@/components/show.vue'
import login from '@/components/login.vue'
import reg from '@/components/reg.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name: "login",
      component: login
    },
    {
      path:'/reg',
      name: 'reg',
      component: reg
    },
    {
      path:'/',
      redirect: '/question'
    },
    {
      path:'/question',
      name: 'question',
      component: question
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/post_form',
      name: PostForm,
      component: PostForm
    },
    {
      path: '/show/:id',
      name: 'Show',
      component: Show
    }
  ]
})
