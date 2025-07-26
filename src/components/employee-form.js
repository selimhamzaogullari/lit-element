import {html, css} from 'lit';
import {BaseElement} from '../utils/base-element';
import {globalTheme} from '../styles/global-style';
import {t} from '../i18n';
import {useEmployeeStore} from '../store/employee-store';

class EmployeeForm extends BaseElement {
  static properties = {
    errors: {type: Object},
    employee: {type: Object},
    form: {type: Object},
  };
  constructor() {
    super();
    this.employee = null;
    this.fields = [
      {name: 'firstName', value: 'first_name', type: 'text'},
      {name: 'lastName', value: 'last_name', type: 'text'},
      {name: 'dateEmployement', value: 'date_of_employment', type: 'date'},
      {name: 'dateBirth', value: 'date_of_birth', type: 'date'},
      {name: 'phone', value: 'phone', type: 'text'},
      {name: 'email', value: 'email', type: 'text'},
      {
        name: 'department',
        value: 'department',
        type: 'select',
        options: ['Analytics', 'Tech'],
      },
      {
        name: 'position',
        value: 'position',
        type: 'select',
        options: ['Junior', 'Medior', 'Senior'],
      },
    ];
    this.form = {
      first_name: '',
      last_name: '',
      date_of_employment: '2025-07-07',
      date_of_birth: '2025-07-07',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Junior',
    };
    this.errors = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date_of_employment: '',
      date_of_birth: '',
    };
    this.dateRange = {
      min: '2018-01-01',
      max: new Date().toISOString().split('T')[0],
    };
  }

  // Update Lifecycle
  updated(changedProps) {
    if (changedProps.has('employee') && this.employee) {
      this.form = {...this.employee};
      this.form.date_of_birth = new Date(this.form.date_of_birth)
        .toISOString()
        .split('T')[0];
      this.form.date_of_employment = new Date(this.form.date_of_employment)
        .toISOString()
        .split('T')[0];
    }
  }

  checkFields(dataType, value) {
    this.form[dataType] = value;
    // Check First and last name
    if (dataType === 'first_name' || dataType === 'last_name') {
      // Check require field
      if (value.trim() === '')
        this.errors[dataType] = t('requireField', {field: dataType});
      else this.errors[dataType] = '';
    }
    // Check email and phone
    else if (dataType === 'email' || dataType === 'phone') {
      const regex =
        dataType === 'email'
          ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/
          : /^\+?[1-9][0-9]{7,14}$/;
      // Check required field
      if (value.trim() === '')
        this.errors[dataType] = t('requireField', {field: dataType});
      // Check email and phone formats
      else if (!regex.test(value)) {
        this.errors[dataType] = t('invalidFormat', {field: dataType});
      } else this.errors[dataType] = '';
    }
    // Check dates
    else if (
      dataType === 'date_of_employment' ||
      dataType === 'date_of_birth'
    ) {
      const minDate = new Date(this.dateRange.min);
      const maxDate = new Date(this.dateRange.max);
      const inputDate = new Date(value);
      if (value.trim() === '')
        this.errors[dataType] = t('requireField', {field: dataType});
      else if (inputDate < minDate || inputDate > maxDate) {
        this.errors[dataType] = t('dateRangeError', {
          field: dataType,
          min: new Date(minDate).toLocaleDateString('en-US'),
          max: new Date(minDate).toLocaleDateString('en-US'),
        });
      } else this.errors[dataType] = '';
    }
    // Change object reference
    this.errors = {...this.errors};
  }

  get checkEmptyFields() {
    // Check empty fields (handle && disable attr in button)
    const emptyField = Object.entries(this.errors).find(
      ([key, value]) => value !== ''
    );
    return !emptyField ? false : true;
  }

  handleInput(e) {
    const dataType = e.target.getAttribute('data-type'); // Get field name
    const value = e.target.value; // Get input value
    this.checkFields(dataType, value);
  }

  handleSubmit() {
    for (const [key, value] of Object.entries(this.form)) {
      if (key !== 'department' && key !== 'position') {
        this.checkFields(key, value); // Run first save click and show all errors
      }
    }
    // Convert date format (yyyy-mm-dd -> d-m-yyyy)
    if (!this.checkEmptyFields)
      this.renderRoot.querySelector('modal-content').show();
  }

  goHome() {
    history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  proceed() {
    this.form.date_of_birth = new Date(
      this.form.date_of_birth
    ).toLocaleDateString('en-US');
    this.form.date_of_employment = new Date(
      this.form.date_of_employment
    ).toLocaleDateString('en-US');
    let response;
    if (!this.employee) {
      // New employee
      response = useEmployeeStore.getState().addEmployee(this.form);
    } else {
      // Update Employee
      response = useEmployeeStore.getState().editEmployee(this.form);
      console.log(response);
    }

    setTimeout(() => {
      this.goHome();
    }, 500);
  }

  render() {
    return html`
      <div class="employee-form">
        ${this.employee
          ? html`<span class="employee-info">
              ${t('editedEmployeeInfo', {
                name: this.employee.first_name + ' ' + this.employee.last_name,
              })}</span
            >`
          : null}
        <form @submit=${(e) => e.preventDefault()}>
          <div class="form-content">
            ${this.fields.map(
              (field) =>
                html` <div class="input-content">
                  ${field.type === 'text'
                    ? html` <label .for=${field.value}>${t(field.name)}:</label>
                        <input
                          type="text"
                          id=${field.value}
                          data-type=${field.value}
                          .value=${this.form[field.value]}
                          @input="${this.handleInput}"
                        />
                        ${this.errors[field.value] !== ''
                          ? html`<small class="error"
                              >* ${this.errors[field.value]}</small
                            >`
                          : null}`
                    : field.type === 'date'
                      ? html` <label .for=${field.value}
                            >${t(field.name)}</label
                          >
                          <input
                            type="date"
                            data-type=${field.value}
                            id=${field.value}
                            name=${field.value}
                            min=${this.dateRange.min}
                            .max=${this.dateRange.max}
                            .value=${this.form[field.value]}
                            @change="${this.handleInput}"
                          />
                          ${this.errors[field.value] !== ''
                            ? html`<small class="error"
                                >* ${this.errors[field.value]}</small
                              >`
                            : null}`
                      : html`<label .for=${field.value}>${t(field.name)}</label>
                          <select
                            .name=${field.value}
                            .id=${field.value}
                            .value=${this.form[field.value]}
                            @change="${(e) =>
                              (this.form[field.value] = e.target.value)}"
                          >
                            ${field.options.map(
                              (option) =>
                                html` <option value=${option}>
                                  ${option}
                                </option>`
                            )}
                          </select>`}
                </div>`
            )}
          </div>
          <div
            class="button-content d-flex justify-center items-center w-full gap-x-20 mt-20"
          >
            <button
              class="save-button"
              .disabled="${this.checkEmptyFields}"
              @click="${this.handleSubmit}"
            >
              <span>${t('save')}</span>
            </button>
            <button class="cancel-button" @click="${this.goHome}">
              <span>${t('cancel')}</span>
            </button>
          </div>
        </form>
      </div>
      <modal-content @proceed-modal="${this.proceed}">
        ${this.employee
          ? t('editEmployeeMessage', {
              name: this.employee?.first_name + ' ' + this.employee?.last_name,
            })
          : t('addEmployeeMessage')}
      </modal-content>
    `;
  }
  static styles = [
    globalTheme,
    css`
      .employee-form {
        padding: var(--spacing-48);
        border-radius: var(--rounded-md);
        background-color: var(--color-white);
        position: relative;
      }
      span.employee-info {
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        font-weight: var(--font-semibold);
      }
      .form-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        column-gap: 4%;
        width: 100%;
      }
      .input-content {
        width: 30%;
        height: 6rem;
      }
      input,
      select {
        width: 100%;
        padding: 8px;
        border: 2px solid var(--color-border);
        border-radius: var(--rounded-md);
        color: var(--color-text);
        margin-top: var(--spacing-4);
      }
      small.error {
        height: 20px;
        font-size: var(--text-sm);
        color: var(--color-red);
        margin-top: var(--spacing-4);
      }
      button {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        border-radius: var(--rounded-lg);
        color: var(--color-white);
        padding: var(--spacing-20);
        font-weight: var(--font-semibold);
        width: 300px;
        text-align: center;
      }
      button span {
        margin: auto;
      }
      .save-button {
        background-color: var(--color-main);
      }
      .cancel-button {
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
      }
      @media (max-width: 800px) {
        .input-content {
          width: 48%;
        }
        @media (max-width: 550px) {
          .input-content {
            width: 100%;
          }
          .button-content {
            flex-wrap: wrap;
            row-gap: var(--spacing-16);
          }
        }
      }
    `,
  ];
}

customElements.define('employee-form', EmployeeForm);
