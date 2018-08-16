import Vue from 'vue'
import Router from 'vue-router'
import Summary from '@/components/Summary'
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
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
