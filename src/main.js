// src/main.js
import './pages/employee-list.js';
import './pages/employee-add.js';
import './pages/employee-edit.js';
import {initRouter} from './router.js';
import {useAppStore} from './store/app-store.js';

const supported = ['tr', 'en'];
const storedLang = useAppStore.getState().lang;

if (!storedLang || !supported.includes(storedLang)) {
  const browserLang = navigator.language.slice(0, 2);
  const initialLang = supported.includes(browserLang) ? browserLang : 'en';

  useAppStore.getState().setLang(initialLang);
}

window.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
