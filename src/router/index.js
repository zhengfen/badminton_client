import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/views/HomePage'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/club/:slug', 
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
  },
  {
    path:'/page/:slug', 
    name:'PageShow',
    component: () => import('@/views/PageShow')
  },
  // admin 
  {
    path:'/admin/users', 
    name:'AdminUsers', 
    component: () => import('@/views/AdminUsers')
  },
  {
    path:'/admin/contacts', 
    name:'AdminContacts',
    component: () => import('@/views/AdminContacts')
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
    path:'/admin/committee', 
    name:'AdminCommittee', 
    component: () => import('@/views/AdminCommittee')
  },
  /* competitions */
  {
    path:'/admin/levels', 
    name:'AdminLevels', 
    component: () => import('@/views/AdminLevels')
  }, 
  /* cms */
  {
    path:'/admin/pages', 
    name:'AdminPages',
    component: () => import('@/views/AdminPages')
  }, 
  {
    path:'/admin/albums', 
    name:'AdminAlbums',
    component: () => import('@/views/AdminAlbums')
  }
]

export const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router