import {LitElement, css, html} from 'lit';
import {useEmployeeStore} from '../store.js';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};
import '../components/employee-table.js';
import '../components/employee-grid.js';
import '../components/employee-pagination.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {gridIcon, tableIcon} from '../utils/icons.js';

export class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    pageSize: {type: Number},
    totalPages: {type: Number},
    currentPage: {type: Number},
    viewType: {type: String}, // 'table' or 'grid'
  };

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees;
    this.pageSize = 10; // Number of employees per page
    this.currentPage = 1; // Current page number
    this.totalPages = Math.ceil(this.employees.length / this.pageSize); // Total number of pages
    this.viewType = 'grid'; // Default view type
  }

  get filteredEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  changePage(event) {
    this.currentPage = event.detail;
  }

  render() {
    return html`<div class="d-flex item-center justify-between mt-16">
        <span class="main-color text-3xl font-semibold">Employee List</span>
        <div>
          <button
            class="main-color"
            @click="${() => (this.viewType = 'table')}"
          >
            ${unsafeSVG(tableIcon)}
          </button>
          <button class="main-color" @click="${() => (this.viewType = 'grid')}">
            ${unsafeSVG(gridIcon)}
          </button>
        </div>
      </div>
      <!-- Table View -->
      ${this.viewType === 'table'
        ? html`<employee-table
            .employeeData=${this.filteredEmployees}
          ></employee-table>`
        : html`<employee-grid
            .employeeData=${this.filteredEmployees}
          ></employee-grid>`}
      <!-- Pagination -->
      <employee-pagination
        .totalPages=${this.totalPages}
        .currentPage=${this.currentPage}
        @page-changed=${this.changePage}
      ></employee-pagination>`;
  }

  static styles = [
    sharedStyles,
    css`
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    `,
  ];
}
customElements.define('employee-list', EmployeeList);
