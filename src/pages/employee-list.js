import {LitElement, css, html} from 'lit';
import {useEmployeeStore} from '../store.js';
import {globalTheme} from '../styles/global-style.js';
import '../components/employee-table.js';
import '../components/employee-grid.js';
import '../components/employee-pagination.js';
import '../components/modal-content.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {gridIcon, tableIcon} from '../utils/icons.js';
import {t} from '../i18n.js';

export class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    pageSize: {type: Number},
    totalPages: {type: Number},
    currentPage: {type: Number},
    viewType: {type: String}, // 'table' or 'grid'
    selectedEmployee: {type: Object},
  };

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees;
    this.pageSize = 10; // Number of employees per page
    this.currentPage = 1; // Current page number
    this.viewType = 'table'; // Default view type
    this.totalPages = Math.ceil(this.employees.length / this.pageSize); // Total number of pages
    // Subscribe to store updates
    this.subscribeEmployee = useEmployeeStore.subscribe((state) => {
      this.employees = state.employees; // Update employees from store
      this.totalPages = Math.ceil(this.employees.length / this.pageSize); // Recalculate total pages
    });
    this.selectedEmployee = null; // Currently selected employee for actions
  }

  get filteredEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  changePage(event) {
    this.currentPage = event.detail;
  }

  showModal(event) {
    this.selectedEmployee = event.detail; // Get the employee to delete
    this.renderRoot.querySelector('modal-content').show(); // Show confirmation modal
  }

  hideModal() {
    this.selectedEmployee = null; // Clear selected employee
    this.renderRoot.querySelector('modal-content').hide(); // Hide confirmation modal
  }

  deleteEmployee(event) {
    if (this.selectedEmployee?.id) {
      useEmployeeStore.getState().deleteEmployee(this.selectedEmployee.id);
      this.renderRoot.querySelector('modal-content').hide(); // Hide modal after deletion
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscribeEmployee?.(); // Unsubscribe from store updates
  }

  render() {
    return html`<div class="d-flex item-center justify-between mt-20 mb-16">
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
            @delete-employee="${this.showModal}"
          ></employee-table>`
        : html`<employee-grid
            .employeeData=${this.filteredEmployees}
          ></employee-grid>`}
      <!-- Pagination -->
      <employee-pagination
        .totalPages=${this.totalPages}
        .currentPage=${this.currentPage}
        @page-changed=${this.changePage}
      ></employee-pagination>
      <modal-content
        @proceed-modal="${this.deleteEmployee}"
        @cancel-modal="${this.hideModal}"
      >
        ${t('deleteEmployeeMessage', {
          name:
            this.selectedEmployee?.first_name +
            ' ' +
            this.selectedEmployee?.last_name,
        })}
      </modal-content>`;
  }

  static styles = globalTheme;
}
customElements.define('employee-list', EmployeeList);
