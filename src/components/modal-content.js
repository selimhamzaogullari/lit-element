import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/superclasses.css' with {type: 'css'};
import {t} from '../i18n.js';

export class ModalContent extends LitElement {
  static properties = {
    isOpen: {type: Boolean},
  };

  constructor() {
    super();
    this.isOpen = true; // Modal is initially closed
  }

  show() {
    this.isOpen = true; // Open the modal
  }

  hide() {
    this.isOpen = false; // Close the modal
  }

  render() {
    return html`<div
      id="modalContent"
      class="modal ${this.isOpen ? 'd-flex' : 'd-none'}"
    >
      <div class="modal-content">
        <div class="d-flex items-center justify-between mb-20">
          <span class="main-color text-xl">${t('areYouSure')}</span>
          <button class="close-button" @click="${this.hide}">
            <span class="close">&times;</span>
          </button>
        </div>
        <div>
          <slot></slot>
        </div>
        <div class="mt-32">
          <button
            class="proceed-button"
            @click="${() =>
              this.dispatchEvent(new CustomEvent('proceed-modal'))}"
          >
            ${t('proceed')}
          </button>
          <button
            class="cancel-button"
            @click="${() =>
              this.dispatchEvent(new CustomEvent('cancel-modal'))}"
          >
            ${t('cancel')}
          </button>
        </div>
      </div>
    </div>`;
  }
  static styles = [
    sharedStyles,
    css`
      .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
      }

      /* Modal Content */
      .modal-content {
        background-color: var(--color-white);
        margin: auto;
        padding: 20px;
        width: fit-content;
        max-width: 70%;
      }
      .d-none {
        display: none;
      }

      /* The Close Button */
      .close-button {
        color: var(--color-main);
        font-size: var(--text-xl);
        font-weight: var(--font-semibold);
        background-color: transparent;
        border: none;
        cursor: pointer;
      }

      /* Buttons */
      .proceed-button,
      .cancel-button {
        font-size: var(--text-base);
        border-radius: var(--rounded-md);
        width: 100%;
        padding: var(--spacing-12) var(--spacing-16);
        cursor: pointer;
      }
      .proceed-button {
        border: none;
        background-color: var(--color-main);
        color: var(--color-white);
      }
      .cancel-button {
        background-color: transparent;
        color: var(--color-secondary);
        border: 2px solid var(--color-secondary);
        margin-top: var(--spacing-8);
      }
    `,
  ];
}

customElements.define('modal-content', ModalContent);
