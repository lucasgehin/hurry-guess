import Vue from 'vue'
import Router from 'vue-router'
import Summary from '@/components/Summary'
import Play from '@/components/Play'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Summary',
      component: Summary
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
