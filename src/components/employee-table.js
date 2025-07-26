import {LitElement, html, css} from 'lit';
import {t} from '../i18n.js';
import {globalTheme} from '../styles/global-style.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {editIcon, deleteIcon} from '../utils/icons.js';

export class EmployeeTable extends LitElement {
  static properties = {
    employeeData: {type: Array},
  };

  render() {
    return html` <div class="table">
      <table>
        <thead>
          <tr>
            <th scope="col">${t('firstName')}</th>
            <th scope="col">${t('lastName')}</th>
            <th scope="col">${t('dateEmployement')}</th>
            <th scope="col">${t('dateBirth')}</th>
            <th scope="col">${t('phone')}</th>
            <th scope="col">${t('email')}</th>
            <th scope="col">${t('department')}</th>
            <th scope="col">${t('position')}</th>
            <th scope="col">${t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${this.employeeData.map(
            (employee) =>
              html`<tr>
                <td data-label="First Name" title="${employee.first_name}">
                  ${employee.first_name}
                </td>
                <td data-label="Last Name" title="${employee.last_name}">
                  ${employee.last_name}
                </td>
                <td
                  data-label="Date of Employement"
                  title="${employee.date_of_employment}"
                >
                  ${employee.date_of_employment}
                </td>
                <td
                  data-label="Date of Birth"
                  title="${employee.date_of_birth}"
                >
                  ${employee.date_of_birth}
                </td>
                <td data-label="Phone" title="${employee.phone}">
                  ${employee.phone}
                </td>
                <td data-label="Email" title="${employee.email}">
                  ${employee.email}
                </td>
                <td data-label="Department" title="${employee.department}">
                  ${employee.department}
                </td>
                <td data-label="Position" title="${employee.position}">
                  ${employee.position}
                </td>
                <td data-label="Actions">
                  <button
                    class="main-color"
                    @click="${() =>
                      this.dispatchEvent(
                        new CustomEvent('edit-employee', {detail: employee.id})
                      )}"
                  >
                    ${unsafeSVG(editIcon)}
                  </button>
                  <button
                    class="ml-4 main-color"
                    @click="${() =>
                      this.dispatchEvent(
                        new CustomEvent('delete-employee', {detail: employee})
                      )}"
                  >
                    ${unsafeSVG(deleteIcon)}
                  </button>
                </td>
              </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }
  static styles = [
    globalTheme,
    css`
      .table {
        overflow-x: auto;
      }
      table {
        margin: 0;
        padding: 0;
        min-width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        background-color: var(--color-white);
        font-size: var(--text-base);
        border-radius: var(--rounded-md);
      }

      table tr {
        border-bottom: 2px solid var(--color-border);
      }
      table th,
      table td {
        padding: 1.5rem;
        text-align: center;
        white-space: nowrap;
      }
      table th {
        color: var(--color-main);
      }
      table td svg {
        width: 1rem;
      }
    `,
  ];
}

customElements.define('employee-table', EmployeeTable);
