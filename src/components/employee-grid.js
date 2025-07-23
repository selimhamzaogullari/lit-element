import {LitElement, html, css} from 'lit';
import {t} from '../i18n.js';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};

export class EmployeeGrid extends LitElement {
  static properties = {
    employeeData: {type: Array},
  };

  render() {
    return html`<div class="grid">
      ${this.employeeData.map(
        (employee) => html`<div class="box grid">
          <div class="d-flex flex-column">
            <span class="key">${t('firstName')}</span>
            <span class="value mt-8">${employee.first_name}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('lastName')}</span>
            <span class="value mt-8">${employee.last_name}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('dateEmployement')}</span>
            <span class="value mt-8">${employee.date_of_employment}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('dateBirth')}</span>
            <span class="value mt-8">${employee.date_of_birth}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('phone')}</span>
            <span class="value mt-8">${employee.phone}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('email')}</span>
            <span class="value mt-8">${employee.email}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('department')}</span>
            <span class="value mt-8">${employee.department}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="key">${t('position')}</span>
            <span class="value mt-8">${employee.position}</span>
          </div>
        </div>`
      )}
    </div>`;
  }
  static styles = [
    sharedStyles,
    css`
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-16);
        padding: 20px;
      }
      .grid .box {
        background-color: var(--color-white);
        border-radius: var(--rounded-md);
        padding: 16px;
      }
      .grid .box span.key {
        color: var(--color-text-secondary);
      }
      .grid .box span.value {
        color: var(--color-text);
      }
      @media (max-width: 900px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];
}

customElements.define('employee-grid', EmployeeGrid);
