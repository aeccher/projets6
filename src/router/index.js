import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ConsignesView from '../views/ConsignesView.vue'
import Enigme1View from '../views/Enigme1View.vue'
import Enigme2View from '../views/Enigme2View.vue'
import Enigme3View from '../views/Enigme3View.vue'
import Enigme4View from '../views/Enigme4View.vue'
import Enigme5View from '../views/Enigme5View.vue'
import Enigme6View from '../views/Enigme6View.vue'
import Enigme7View from '../views/Enigme7View.vue'
import Enigme8View from '../views/Enigme8View.vue'
import Enigme9View from '../views/Enigme9View.vue'
import Enigme10View from '../views/Enigme10View.vue'
import FinView from '../views/FinView.vue'
import ConnexionView from '../views/ConnexionView.vue'
import AccueilEnigmesView from '../views/AccueilEnigmesView.vue'
import MentionsLegalesView from '../views/MentionsLegalesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Accueil', component: AccueilView },
    { path: '/consignes', name: 'Consignes', component: ConsignesView },
    { path: '/enigme1', name: 'Enigme1', component: Enigme1View },
    { path: '/enigme2', name: 'Enigme2', component: Enigme2View },
    { path: '/enigme3', name: 'Enigme3', component: Enigme3View },
    { path: '/enigme4', name: 'Enigme4', component: Enigme4View },
    { path: '/enigme5', name: 'Enigme5', component: Enigme5View },
    { path: '/enigme6', name: 'Enigme6', component: Enigme6View },
    { path: '/enigme7', name: 'Enigme7', component: Enigme7View },
    { path: '/enigme8', name: 'Enigme8', component: Enigme8View },
    { path: '/enigme9', name: 'Enigme9', component: Enigme9View },
    { path: '/enigme10', name: 'Enigme10', component: Enigme10View },
    { path: '/fin', name: 'Fin', component: FinView },
    { path: '/connexion', name: 'Connexion', component: ConnexionView },
    { path: '/enigmes', name: 'AccueilEnigmes', component: AccueilEnigmesView },
    { path: '/mentions-legales', name: 'MentionsLegales', component: MentionsLegalesView },
    { path: '/404', alias: '/:catchAll(.*)', name: 'NotFound', component: NotFoundView },
  ]
})

/*// Avant chaque changement de route, enregistre la route actuelle dans le localStorage
router.beforeEach((to, from, next) => {
  // Si la route actuelle est différente de la dernière visitée, enregistrez la nouvelle route
  if (to.path !== localStorage.getItem('lastVisitedPage')) {
    localStorage.setItem('lastVisitedPage', to.path)
  }
  next()
})*/
export default router

