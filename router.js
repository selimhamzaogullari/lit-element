import {Router} from '@vaadin/router';

const outlet = document.querySelector('#outlet');
const router = new Router(outlet);
router.setRoutes([
  {path: '/', redirect: '/employees'},
  {path: '/employees', component: 'list-page'},
  {path: '/employees/new', component: 'add-page'},
  {path: '/employees/edit/:id', component: 'edit-page'},
]);
