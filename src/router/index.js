import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/views/ClubIndex'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/ClubIndex'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: () => import('@/views/ClubIndex'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/club/:id', 
    name: 'ClubShow', 
    component: () => import('@/views/ClubShow')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage'),
    hidden: true
  },
  {
    path:'/admin/teams', 
    name:'AdminTeams',
    component: () => import('@/views/AdminTeams')
  }
]

export const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router