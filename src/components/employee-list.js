import {LitElement, css, html} from 'lit';
import {t} from '../../i18n.js';
import {useEmployeeStore} from '../../store.js';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};

export class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    pageSize: {type: Number},
    totalPages: {type: Number},
    currentPage: {type: Number},
    visiblePages: {type: Number},
  };

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees;
    this.pageSize = 10; // Number of employees per page
    this.totalPages = Math.ceil(this.employees.length / this.pageSize);
    this.currentPage = 1; // Current page number
    this.visiblePages = [1, 2, 3, 4, 5]; // Pages to display in pagination
  }

  get filteredEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  getPaginationPages(currentPage) {
    const visibleTotalPage = 5;
    this.visiblePages = []; // Reset visible pages

    // Baş ve son sınırlar
    const half = Math.floor(visibleTotalPage / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(this.totalPages, currentPage + half);

    // totalPage < vizibleTotalPage
    if (this.totalPages <= visibleTotalPage) {
      start = 1;
      end = this.totalPages;
    } else if (end - start < visibleTotalPage - 1) {
      if (start === 1) {
        end = start + visibleTotalPage - 1;
      } else if (end === this.totalPages) {
        start = end - visibleTotalPage + 1;
      }
    }

    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  changePage(newPage) {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(this.employees.length / this.pageSize)
    ) {
      this.currentPage = newPage;
      this.getPaginationPages(this.currentPage);
    }
  }

  renderTableUI() {
    return html`<table class="mt-16">
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
          ${this.filteredEmployees.map(
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
      </table>`
  }

  renderPaginationUI() {
    return html`<div class="w-full d-flex items-center justify-center mt-16">
        <div class="pagination d-flex items-center justify-center gap-x-4">
          <button
            @click="${() => this.changePage(1)}"
            ?disabled="${this.currentPage === 1}"
          >
            <img src="./src/assets/icons/arrow-left-double-icon.svg" alt="Previous Double" />
          </button>
          <button
            @click="${() => this.changePage(this.currentPage - 1)}"
            ?disabled="${this.currentPage === 1}"
          >
            <img src="./src/assets/icons/arrow-left-icon.svg" alt="Previous" />
          </button>
          <div class="page-numbers">
            ${this.visiblePages.map(
              (page) => html`<button
                class="${this.currentPage === page ? 'active' : ''}"
                @click="${() => this.changePage(page)}"
              >
                ${page}
              </button>`
            )}
          </div>
          <button
            @click="${() => this.changePage(this.currentPage + 1)}"
            ?disabled="${this.currentPage ===
            Math.ceil(this.employees.length / this.pageSize)}"
          >
            <img src="./src/assets/icons/arrow-right-icon.svg" alt="Next" />
          </button>
          <button
            @click="${() => this.changePage(this.totalPages)}"
            ?disabled="${this.currentPage ===
            Math.ceil(this.employees.length / this.pageSize)}"
          >
            <img src="./src/assets/icons/arrow-right-double-icon.svg" alt="Next Double" />
          </button>
        </div>
      </div>`   
  }

  render() {
    return html`<div class="d-flex item-center justify-between mt-16">
        <span class="main-color text-3xl font-semibold">Employee List</span>
        <div>
          <img src="./src/assets/icons/table-icon.svg" title="table-icon" />
          <img src="./src/assets/icons/grid-icon.svg" title="grid-icon" />
        </div>
      </div>
      <!-- Table View -->
      ${this.renderTableUI()}
      <!-- Pagination -->
      ${this.renderPaginationUI()}`;
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
        text-overflow: ellipsis;
        overflow: hidden;
      }

      table th {
        color: var(--color-main);
      }

      @media screen and (max-width: 1200px) {
        // table
        table {
          background-color: transparent;
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
          font-weight: var(--font-bold);
        }

        table td:last-child {
          border-bottom: 0;
        }
      }
      .pagination img {
        margin-top: 0.125rem;
      }
      .page-numbers button {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        font-size: var(--text-base);
        color: var(--color-text);
      }
      .page-numbers button.active {
        background-color: var(--color-main);
        color: var(--color-white);
      }
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `,
  ];
}
customElements.define('employee-list', EmployeeList);
