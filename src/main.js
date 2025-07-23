// src/main.js
import './pages/employee-list.js';
import './pages/add-employee.js';
import {initRouter} from './router.js';

window.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
