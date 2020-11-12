import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/TourSelect',
    name: 'TournamentSelection',
    component: () => import('../views/TournamentSelection.vue')
  },
  {
    path: '/Tour/:TourID',
    name: 'Tournament',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/Edit',
    name: 'Edit',
    component: () => import('../views/admin/admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
