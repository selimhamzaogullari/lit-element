import {LitElement, css, html} from 'lit';
import {globalTheme} from '../styles/global-style.js';
import {t} from '../i18n';
import '../components/employee-form.js';

export class EmployeeAdd extends LitElement {
  render() {
    return html`<div class="mt-20 mb-16">
        <span class="main-color text-3xl font-semibold"
          >${t('addEmployee')}</span
        >
      </div>
      <employee-form></employee-form> `;
  }
  static styles = globalTheme;
}
customElements.define('employee-add', EmployeeAdd);
