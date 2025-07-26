import {fixture, expect, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/employee-form.js';

suite('employee-form', () => {
  test('should render all fields', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const inputs = el.shadowRoot.querySelectorAll('input');
    const selects = el.shadowRoot.querySelectorAll('select');

    expect(inputs.length).to.equal(6); // 4 text/date + 2 date = 6 input
    expect(selects.length).to.equal(2); // department + position
  });

  test('should show validation errors after clicking save', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const saveButton = el.shadowRoot.querySelector('.save-button');
    saveButton.click();
    await el.updateComplete;

    const errors = el.shadowRoot.querySelectorAll('small.error');
    expect(errors.length).to.be.equal(4);
  });

  test('should validate email format', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const emailInput = el.shadowRoot.querySelector('input[data-type="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input', {bubbles: true})); // triger input event
    await el.updateComplete;

    expect(el.errors.email).to.not.equal('');
  });

  test('should validate phone format', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const phoneInput = el.shadowRoot.querySelector('input[data-type="phone"]');
    phoneInput.value = '1234';
    phoneInput.dispatchEvent(new Event('input', {bubbles: true})); // triger input event
    await el.updateComplete;

    expect(el.errors.phone).to.not.equal('');
  });

  test('should disable save button when errors exist', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.errors.first_name = 'Required';
    el.errors = {...el.errors}; // force reactive update
    await el.updateComplete;

    const saveButton = el.shadowRoot.querySelector('.save-button');
    expect(saveButton.disabled).to.be.true;
  });

  test('should enable save button when no errors exist', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.errors = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date_of_employment: '',
      date_of_birth: '',
    };
    el.form = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '+905551112233',
      date_of_birth: '2020-01-01',
      date_of_employment: '2022-01-01',
      department: 'Analytics',
      position: 'Junior',
    };
    await el.updateComplete;

    const saveButton = el.shadowRoot.querySelector('.save-button');
    expect(saveButton.disabled).to.be.false;
  });
});
