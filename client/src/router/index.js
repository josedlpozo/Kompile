import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserSummary from '@/components/UserSummary'
import ProjectSummary from '@/components/ProjectSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
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
