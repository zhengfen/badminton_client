import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/views/ClubList'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/club/:id', 
    name: 'ClubShow', 
    component: () => import('@/views/ClubShow')
  }
]

export const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router