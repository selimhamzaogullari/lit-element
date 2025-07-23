import {LitElement, css, html} from 'lit';
import {t} from '../../i18n.js';
import { useEmployeeStore } from '../../store.js';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};

export class EmployeeList extends LitElement {

  static properties = {
    employees: {type: Array}
  }

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees
    console.log(this.employees)
  }

  render() {
    return html`<div class="d-flex item-center justify-between mt-16">
        <span class="main-color text-3xl font-semibold">Employee List</span>
        <div>
          <img src="./src/assets/icons/table-icon.svg" title="table-icon" />
          <img src="./src/assets/icons/grid-icon.svg" title="grid-icon" />
        </div>
      </div>
      <table class="mt-16">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Date of Employement</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Department</th>
            <th scope="col">Position</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          
           ${this.employees.slice(0, 10).map((employee) => html`<tr>
            <td data-label="First Name" title="${employee.first_name}">${employee.first_name}</td>
            <td data-label="Last Name" title="${employee.last_name}">${employee.last_name}</td>
            <td data-label="Date of Employement" title="${employee.date_of_employment}">${employee.date_of_employment}</td>
            <td data-label="Date of Birth" title="${employee.date_of_birth}">${employee.date_of_birth}</td>
            <td data-label="Phone" title="${employee.phone}">${employee.phone}</td>
            <td data-label="Email" title="${employee.email}">${employee.email}</td>
            <td data-label="Department" title="${employee.department}">${employee.department}</td>
            <td data-label="Position" title="${employee.position}">${employee.position}</td>
            <td data-label="Actions">Actions</td>
          </tr>`
      )}
          
        </tbody>
      </table>`;
  }


    static styles = [
    sharedStyles,
    css`
      table {
        margin: 0;
        padding: 0;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        background-color: var(--color-white);
        font-size: var(--text-base)
      }

      table tr {
        border-bottom: 2px solid var(--color-border);
      }

      table th,
      table td {
        padding: 1.5rem;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      table th {
        color: var(--color-main)
      }

      @media screen and (max-width: 1200px) {

        table {
          background-color: transparent
        }


        table thead {
          border: none;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }

        table tr {
          background-color: var(--color-white);
          border-bottom: 2px solid var(--color-border);
          display: block;
          margin-bottom: 2em;
        }

        table td {
          border-bottom: 2px solid var(--color-border);
          display: block;
          padding: 0.75rem;
          text-align: right;
        }

        table td::before {
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
        }

        table td:last-child {
          border-bottom: 0;
        }
      }
    `,
  ];

}
customElements.define('employee-list', EmployeeList);
