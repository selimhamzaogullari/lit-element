import {LitElement, html, css} from 'lit';
import {t} from '../i18n.js';

export class EmployeeTable extends LitElement {
  static properties = {
    employeeData: {type: Array},
  };

  render() {
    console.log(this.employeeData);
    return html` <div class="table">
      <table class="mt-16">
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
            (employee) => html`<tr>
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
              <td data-label="Date of Birth" title="${employee.date_of_birth}">
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
              <td data-label="Actions">Actions</td>
            </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }
  static styles = [
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
    `,
  ];
}

customElements.define('employee-table', EmployeeTable);
