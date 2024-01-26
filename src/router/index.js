import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ConsignesView from '../views/ConsignesView.vue'
import Enigme1View from '../views/Enigme1View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Accueil', component: AccueilView },
    { path: '/consignes', name: 'Consignes', component: ConsignesView },
    { path: '/enigme1', name: 'Enigme1', component: Enigme1View },
  ]
})

export default router
