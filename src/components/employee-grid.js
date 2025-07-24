import {LitElement, html, css} from 'lit';
import {t} from '../i18n.js';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {editIcon, deleteIcon} from '../utils/icons.js';

export class EmployeeGrid extends LitElement {
  static properties = {
    employeeData: {type: Array},
  };

  render() {
    return html`<div class="grid">
      ${this.employeeData.map(
        (employee) =>
          html`<div class="box grid">
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
            <div class="d-flex gap-x-4 mt-16">
              <button
                class="edit-button"
                @click="${() =>
                  this.dispatchEvent(
                    new CustomEvent('edit-employee', {detail: employee})
                  )}"
              >
                ${unsafeSVG(editIcon)}
                <span>${t('edit')}</span>
              </button>
              <button
                class="delete-button ml-4"
                @click="${() =>
                  this.dispatchEvent(
                    new CustomEvent('delete-employee', {detail: employee})
                  )}"
              >
                ${unsafeSVG(deleteIcon)}
                <span>${t('delete')}</span>
              </button>
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
      .grid .box .edit-button,
      .grid .box .delete-button {
        border: none;
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        border-radius: var(--rounded-lg);
        color: var(--color-white);
        font-size: var(--text-bas);
        padding: var(--spacing-8) var(--spacing-12);
        cursor: pointer;
      }
      .grid .box .edit-button svg,
      .grid .box .delete-button svg {
        width: 1.125rem;
      }
      .grid .box .edit-button {
        background: var(--color-secondary);
      }
      .grid .box .delete-button {
        background: var(--color-main);
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
