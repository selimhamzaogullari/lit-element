import {LitElement, css, html} from 'lit';
import {useEmployeeStore} from '../store/employee-store';
import {t} from '../i18n';
import {globalTheme} from '../styles/global-style';

export class EmployeeEdit extends LitElement {
  static properties = {
    employee: {type: Object},
    error: {type: Boolean},
  };
  constructor() {
    super();
    this.error = false;
  }
  connectedCallback() {
    super.connectedCallback();
    const employeeId = location.pathname.split('/').pop();
    const employee = useEmployeeStore.getState().getEmployee(employeeId);
    if (employee) this.employee = employee;
    else this.error = true;
  }
  render() {
    return this.error
      ? html`<div class="mt-40 font-bold text-center text-3xl red-color">
          ${t('employeeNotFound')}
        </div>`
      : html`<div class="mt-20 mb-16">
            <span class="main-color text-3xl font-semibold"
              >${t('editEmployee')}</span
            >
          </div>
          <employee-form .employee=${this.employee}></employee-form>`;
  }
  static styles = globalTheme;
}
customElements.define('employee-edit', EmployeeEdit);
