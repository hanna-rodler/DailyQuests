import { createRouter, createWebHashHistory } from 'vue-router'
import WeeklyView from './views/WeeklyView.vue'
import MonthlyView from './views/MonthlyView.vue'
import WelcomeView from './views/WelcomeView.vue'

const routes = [
  { path: '/', component: WelcomeView },
  { path: '/weekly', component: WeeklyView },
  { path: '/monthly', component: MonthlyView }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
