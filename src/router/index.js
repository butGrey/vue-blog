import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import AticleDetail from '@/pages/article_detail'
import Timeaxis from '@/pages/time_axis'
import Message_Board from '@/pages/message_board'
import About_Me from '@/pages/about_me'
import Writing_Work from '@/pages/writing_work'
import Writing_Life from '@/pages/writing_life'
import Component from '@/pages/component'
import Signin from '@/pages/signin'
import Login from '@/pages/login'
import Home from '@/pages/home'
import AticleDetails from '@/pages/article_details'
import Message_Boards from '@/pages/message_boards'
import Timeaxises from '@/pages/time_axises'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
    	path: '/article_detail',
    	name: "artdetails",
    	component: AticleDetails
    },
    {
    	path: "/time_axis",
    	name: "time_axis",
    	component: Timeaxis
    },
    {
      path: "/message_board",
      name: "message_board",
      component: Message_Board
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
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: "/time_axises",
      name: "time_axises",
      component: Timeaxises
    },
    {
      path: "/message_boards",
      name: "message_boards",
      component: Message_Boards
    }
  ]
})
