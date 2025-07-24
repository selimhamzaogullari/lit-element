// src/main.js
import './pages/employee-list.js';
import './pages/employee-add.js';
import './pages/employee-edit.js';
import {initRouter} from './router.js';

window.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
