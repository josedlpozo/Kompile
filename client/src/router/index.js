import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserSummary from '@/components/UserSummary'
import ProjectSummary from '@/components/ProjectSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/project/:project',
      name: 'ProjectSummary',
      component: ProjectSummary
    },
    {
      path: '/user/:user',
      name: 'UserSummary',
      component: UserSummary
    }
  ]
})
