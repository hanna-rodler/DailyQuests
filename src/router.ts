import { createRouter, createWebHashHistory } from 'vue-router'
import WeeklyView from './views/WeeklyView.vue'
import MonthlyView from './views/MonthlyView.vue'
import DoneView from './views/DoneView.vue'

const routes = [
  { path: '/', props: { viewRoute: 'weekly' }, component: WeeklyView },
  { path: '/weekly', props: { viewRoute: 'weekly' }, component: WeeklyView },
  { path: '/monthly', props: { viewRoute: 'monthly' }, component: MonthlyView },
  { path: '/done', props: { viewRoute: 'done' }, component: DoneView }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
