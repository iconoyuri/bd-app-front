import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassTableView from '../views/ClassTableView.vue'
import RoomTableView from '../views/RoomTableView.vue'
import WorkshopView from '../views/WorkshopView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/table/class/:code',
    name: 'classtableview',
    component: ClassTableView
  },
  {
    path: '/table/room/:code',
    name: 'roomtableview',
    component: RoomTableView
  },
  {
    path: '/table/teacher/:matricule',
    name: 'workshopview',
    component: WorkshopView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
