import {Router} from '@vaadin/router';

export function initRouter() {
  const outlet = document.getElementById('outlet');
  const router = new Router(outlet);

  router.setRoutes([
    {path: '/', component: 'employee-list'},
    {path: '/employees/new', component: 'add-employee'},
  ]);
}
