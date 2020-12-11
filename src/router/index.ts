import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/TourSelect',
    name: 'TournamentSelection',
    component: () => import('../views/TournamentSelection.vue'),
    props: true,
  },
  {
    path: '/Tour/:TourID',
    name: 'Game',
    component: () => import('../views/Game.vue'),
    props: true,
  },
  {
    path: '/Edit',
    name: 'Edit',
    component: () => import('../views/admin/admin.vue'),
  },
  {
    path: '/Edit/Song',
    name: 'Song Edit',
    component: () => import('../views/admin/song.vue'),
  },
  {
    path: '/Edit/Collect',
    name: 'Collect Edit',
    component: () => import('../views/admin/collect.vue'),
  },
  {
    path: '/Edit/Tournament',
    name: 'Tour Edit',
    component: () => import('../views/admin/tour.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
