import {LitElement, css, html} from 'lit';
import {t} from '../i18n.js';
import {globalTheme} from '../styles/global-style.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {plusIcon} from '../utils/icons.js';
import {employeesIcon} from '../utils/icons.js';

export class Navbar extends LitElement {
  goPage(page = 'home') {
    history.pushState(null, '', page === 'home' ? '/' : '/employees/new');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`<div class="header d-flex items-center justify-between">
      <img class="logo" src="./src/assets/images/ing.png" title="ing-logo" />
      <div class="d-flex items-center justify-center gap-x-16">
        <button
          class="main-color d-flex items-center gap-x-4"
          @click="${() => this.goPage()}"
        >
          ${unsafeSVG(employeesIcon)}
          <span class="main-color font-semibold">${t('employees')}</span>
        </button>

        <button
          class="main-color d-flex items-center"
          @click="${() => this.goPage('form')}"
        >
          ${unsafeSVG(plusIcon)}
          <span class="main-color font-semibold">${t('addNew')}</span>
        </button>

        <img class="flag" src="./src/assets/images/tr.png" title="flag-icon" />
      </div>
    </div>`;
  }

  static styles = [
    globalTheme,
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
}
customElements.define('navbar-content', Navbar);
