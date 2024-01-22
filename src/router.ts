import { createRouter, createWebHashHistory } from 'vue-router'
import WeeklyView from './views/WeeklyView.vue'
import MonthlyView from './views/MonthlyView.vue'
import DoneView from './views/DoneView.vue'

const routes = [
  { path: '/', component: WeeklyView },
  { path: '/weekly', component: WeeklyView },
  { path: '/monthly', component: MonthlyView },
  { path: '/done', component: DoneView }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
