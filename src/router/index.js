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
    path: '/team/:id', 
    name: 'TeamShow', 
    component: () => import('@/views/TeamShow')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage'),
    hidden: true
  },
  // admin 
  {
    path:'/admin/users', 
    name:'AdminUsers', 
    component: () => import('@/views/AdminUsers')
  },
  {
    path:'/admin/clubs', 
    name:'AdminClubs',
    component: () => import('@/views/AdminClubs')
  },
  {
    path:'/admin/teams', 
    name:'AdminTeams',
    component: () => import('@/views/AdminTeams')
  }, 
  {
    path:'/admin/positions', 
    name:'AdminPositions',
    component: () => import('@/views/AdminPositions')
  }, 
  {
    path:'/admin/levels', 
    name:'AdminLevels', 
    component: () => import('@/views/AdminLevels')
  }
]

export const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router