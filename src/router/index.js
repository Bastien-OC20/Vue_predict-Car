import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeViews.vue';
import Predict from '../views/PredictViews.vue';
import Donnees from '../views/DonneesViews.vue';
import Login from '../components/LoginForm.vue';
import Signup from '../components/SignupForm.vue';
import ProtectedData from '../views/ProtectedData.vue'; // Assurez-vous que ce composant existe
import store from '../store'; 

const routes = [
  { path: '/', component: Home },
  { path: '/predict', component: Predict,
    meta: { requiresAuth: true }
  },
  { path: '/donnees', component: Donnees,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {
    path: '/protected',
    component: ProtectedData,
    meta: { requiresAuth: true }
  },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware de navigation pour les routes protégées
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;