import { createRouter, createWebHistory } from 'vue-router';
import DashBoardComponent from '../views/Dashboard.vue';
import DetailsView from '../views/Details.vue';
import SharedLink from '../views/Shared.vue';


const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashBoardComponent
  },
  {
    path: '/details',
    name: 'Details',
    component: DetailsView
  },
  {
    path: '/saved/:id',
    name: 'Links',
    component: SharedLink,
    props: route => ({ // Pasar los parámetros de la URL como props
      bottlesSaved: parseInt(route.query.bottlesSaved),
      plasticsSaved: parseFloat(route.query.plasticsSaved),
      carbonSaved: parseFloat(route.query.carbonSaved)
    })
  },
 


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;