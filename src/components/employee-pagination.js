import {LitElement, html, css} from 'lit';
import {globalTheme} from '../styles/global-style.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {
  arrowLeftDoubleIcon,
  arrowLeftIcon,
  arrowRightDoubleIcon,
  arrowRightIcon,
} from '../utils/icons.js';

export class EmployeePagination extends LitElement {
  static properties = {
    totalPages: {type: Number},
    currentPage: {type: Number},
    visiblePages: {type: Number},
  };

  constructor() {
    super();
    this.visiblePages = [1, 2, 3, 4, 5]; // Pages to display in pagination
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
    if (newPage > 0 && newPage <= this.totalPages) {
      this.getPaginationPages(this.currentPage);
      this.dispatchEvent(new CustomEvent('page-changed', {detail: newPage}));
    }
  }

  render() {
    this.getPaginationPages(this.currentPage);
    return html`<div class="w-full d-flex items-center justify-center mt-16">
      <div class="pagination d-flex items-center justify-center gap-x-4">
        <button
          class="main-color"
          @click="${() => this.changePage(1)}"
          ?disabled="${this.currentPage === 1}"
        >
          ${unsafeSVG(arrowLeftDoubleIcon)}
        </button>
        <button
          class="main-color"
          @click="${() => this.changePage(this.currentPage - 1)}"
          ?disabled="${this.currentPage === 1}"
        >
          ${unsafeSVG(arrowLeftIcon)}
        </button>
        <div class="page-numbers">
          ${this.visiblePages.map(
            (page) =>
              html`<button
                class="${this.currentPage === page ? 'active' : ''}"
                @click="${() => this.changePage(page)}"
              >
                ${page}
              </button>`
          )}
        </div>
        <button
          class="main-color"
          @click="${() => this.changePage(this.currentPage + 1)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${unsafeSVG(arrowRightIcon)}
        </button>
        <button
          class="main-color"
          @click="${() => this.changePage(this.totalPages)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${unsafeSVG(arrowRightDoubleIcon)}
        </button>
      </div>
    </div>`;
  }
  static styles = [
    globalTheme,
    css`
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
    `,
  ];
}

customElements.define('employee-pagination', EmployeePagination);
