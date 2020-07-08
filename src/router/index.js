import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/pages/signin'
import Login from '@/pages/login'
import Home from '@/pages/home'
import ArticleDetail from '@/pages/articleDetail'
import TimeAxis from '@/pages/timeAxis'
import MessageBoard from '@/pages/messageBoard'
import About_Me from '@/pages/about_me'
import Writing_Work from '@/pages/writing_work'
import Writing_Life from '@/pages/writing_life'
import Component from '@/pages/component'
import CreateArt from '@/pages/createArt'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/articleDetail',
    	name: "articleDetail",
    	component: ArticleDetail
    },
    {
    	path: "/timeAxis",
    	name: "timeAxis",
    	component: TimeAxis
    },
    {
      path: "/messageBoard",
      name: "messageBoard",
      component: MessageBoard
    },
    {
      path: "/about_me",
      name: "about_me",
      component: About_Me
    },
    {
      path: "/writing_work",
      name: "writing_work",
      component: Writing_Work
    },
    {
      path: "/writing_life",
      name: "writing_life",
      component: Writing_Life
    },
    {
      path: "/component",
      name: "component",
      component: Component
    },
    {
      path: "/create",
      name: "create",
      component: CreateArt
    }
  ]
})
