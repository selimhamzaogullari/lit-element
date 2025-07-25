import {LitElement, css, html} from 'lit';
import {globalTheme} from '../styles/global-style.js';
import {t} from '../i18n';
import '../components/employee-form.js';

export class EmployeeAdd extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    console.log(location);
  }
  render() {
    return html`<div class="mt-20 mb-16">
        <span class="main-color text-3xl font-semibold"
          >${t('addEmployee')}</span
        >
      </div>
      <div class="form-content">
        <employee-form></employee-form>
      </div> `;
  }
  static styles = [
    globalTheme,
    css`
      .form-content {
        padding: var(--spacing-40);
        border-radius: var(--rounded-md);
        background-color: var(--color-white);
      }
    `,
  ];
}
customElements.define('employee-add', EmployeeAdd);
