import {LitElement, css, html} from 'lit';
import {useEmployeeStore} from '../store/employee-store.js';
import {globalTheme} from '../styles/global-style.js';
import '../components/employee-table.js';
import '../components/employee-grid.js';
import '../components/employee-pagination.js';
import '../components/modal-content.js';
import '../components/employee-search.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {gridIcon, tableIcon} from '../utils/icons.js';
import {t} from '../i18n.js';
import {BaseElement} from '../utils/base-element.js';

export class EmployeeList extends BaseElement {
  static properties = {
    employees: {type: Array},
    pageSize: {type: Number},
    totalPages: {type: Number},
    currentPage: {type: Number},
    viewType: {type: String}, // 'table' or 'grid'
    selectedEmployee: {type: Object},
    searchTerm: {type: Object},
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
    this.searchTerm = '';
  }

  get searchedEmployeed() {
    return this.employees.filter((employee) =>
      (employee.first_name + ' ' + employee.last_name)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  get filteredEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.searchedEmployeed.slice(start, start + this.pageSize);
  }

  searchEmployee(event) {
    this.searchTerm = event.detail;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.searchedEmployeed.length / this.pageSize);
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
  }

  deleteEmployee(event) {
    if (this.selectedEmployee?.id) {
      useEmployeeStore.getState().deleteEmployee(this.selectedEmployee.id);
      this.renderRoot.querySelector('modal-content').hide(); // Hide modal after deletion
    }
  }

  goEditPage(event) {
    const id = event.detail;
    history.pushState(null, '', `/employees/edit/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscribeEmployee?.(); // Unsubscribe from store updates
  }

  render() {
    return html`<div
        class="employee-list-content d-flex item-center justify-between mt-20 mb-16"
      >
        <span class="main-color text-3xl font-semibold"
          >${t('employeeList')}</span
        >
        <div class="search-list-content d-flex item-center gap-x-4">
          <employee-search
            @search-employee="${this.searchEmployee}"
          ></employee-search>
          <div>
            <button
              class="show-table-view-icon main-color"
              @click="${() => (this.viewType = 'table')}"
            >
              ${unsafeSVG(tableIcon)}
            </button>
            <button
              class="show-grid-view-icon main-color"
              @click="${() => (this.viewType = 'grid')}"
            >
              ${unsafeSVG(gridIcon)}
            </button>
          </div>
        </div>
      </div>
      <!-- Table View -->
      ${this.viewType === 'table'
        ? html`<employee-table
            .employeeData=${this.filteredEmployees}
            @delete-employee="${this.showModal}"
            @edit-employee="${this.goEditPage}"
          ></employee-table>`
        : html`<employee-grid
            .employeeData=${this.filteredEmployees}
            @delete-employee="${this.showModal}"
            @edit-employee="${this.goEditPage}"
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

  static styles = [
    globalTheme,
    css`
      @media (max-width: 600px) {
        .employee-list-content {
          flex-direction: column;
        }
        .search-list-content {
          width: 100%;
          justify-content: space-between;
          margin-top: var(--spacing-16);
        }
      }
    `,
  ];
}
customElements.define('employee-list', EmployeeList);
