import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassTableView from '../views/ClassTableView.vue'
import RoomTableView from '../views/RoomTableView.vue'
import TeacherWorkshopView from '../views/TeacherWorkshopView.vue'
import AdminWorkshopView from '../views/AdminWorkshopView.vue'

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
    path: '/workshop/teacher/:matricule',
    name: 'teacherworkshopview',
    component: TeacherWorkshopView
  },
  {
    path: '/workshop/admin/',
    name: 'adminworkshopview',
    component: AdminWorkshopView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
