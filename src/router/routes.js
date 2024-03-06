import { createRouter, createWebHistory } from 'vue-router';
import DashBoardComponent from '../views/Dashboard.vue';
import DetailsListView from '../views/Details.vue';
import DetailsLink from '../views/Shared.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashBoardComponent
  },
  {
    path: '/details',
    name: 'DetailsList',
    component: DetailsListView
  },
  {
    path: '/saved/:id',
    name: 'Links',
    component: DetailsLink,
    props: true
  },
 


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;