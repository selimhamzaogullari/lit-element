import {css, html} from 'lit';
import {BaseElement} from '../utils/base-element';
import {globalTheme} from '../styles/global-style';
import {t} from '../i18n.js';
import {debounce} from '../utils/helper.js';

class EmployeeSearch extends BaseElement {
  constructor() {
    super();
    this.emitSearch = debounce(this.emitSearch.bind(this), 300);
  }

  emitSearch(value) {
    this.dispatchEvent(new CustomEvent('search-employee', {detail: value}));
  }

  handleSearch(e) {
    const value = e.target.value;
    this.emitSearch(value);
  }

  render() {
    return html`
      <input
        class="mr-12"
        type="text"
        placeholder="${t('searchEmployees')}"
        @input="${this.handleSearch}"
      />
    `;
  }

  static styles = [
    globalTheme,
    css`
      input {
        padding: 8px;
        border: 2px solid var(--color-main);
        border-radius: var(--rounded-md);
        width: 15rem;
        color: var(--color-main);
      }
      input::placeholder {
        color: var(--color-main);
        opacity: 0.7;
      }
      input:focus {
        outline: none;
      }
    `,
  ];
}

customElements.define('employee-search', EmployeeSearch);
