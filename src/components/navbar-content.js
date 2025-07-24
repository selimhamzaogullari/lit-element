import {LitElement, css, html} from 'lit';
import {t} from '../i18n.js';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {plusIcon} from '../utils/icons.js';
import {employeesIcon} from '../utils/icons.js';

export class Navbar extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .header {
        background-color: var(--color-white);
        height: 50px;
        padding: 0 10px;
      }
      img.logo {
        width: 30px;
      }
      img.flag {
        width: 24px;
      }
    `,
  ];

  render() {
    return html`<div class="header d-flex items-center justify-between">
      <img class="logo" src="./src/assets/images/ing.png" title="ing-logo" />
      <div class="d-flex items-center justify-center gap-x-16">
        <div class="d-flex items-center">
          <div class="main-color">${unsafeSVG(employeesIcon)}</div>
          <span class="main-color ml-4 font-semibold">${t('employees')}</span>
        </div>
        <div class="d-flex items-center">
          <div class="main-color">${unsafeSVG(plusIcon)}</div>
          <span class="main-color font-semibold">${t('addNew')}</span>
        </div>
        <img class="flag" src="./src/assets/images/tr.png" title="flag-icon" />
      </div>
    </div>`;
  }
}
customElements.define('navbar-content', Navbar);
