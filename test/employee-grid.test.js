import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/employee-grid.js';

suite('employee-grid', () => {
  const mockEmployee = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    date_of_employment: '2021-01-01',
    date_of_birth: '1990-01-01',
    phone: '+1234567890',
    email: 'john@example.com',
    department: 'Tech',
    position: 'Senior',
  };

  test('renders employee information correctly', async () => {
    const el = await fixture(
      html`<employee-grid .employeeData=${[mockEmployee]}></employee-grid>`
    );
    // Is it visible on the screen
    const textContent = el.shadowRoot.textContent;
    assert.include(textContent, 'John');
    assert.include(textContent, 'Doe');
    assert.include(textContent, 'Tech');
    assert.include(textContent, 'Senior');
  });

  test('fires "edit-employee" event when edit button is clicked', async () => {
    const el = await fixture(
      html`<employee-grid .employeeData=${[mockEmployee]}></employee-grid>`
    );

    const editButton = el.shadowRoot.querySelector('.edit-button');
    setTimeout(() => editButton.click());
    const event = await oneEvent(el, 'edit-employee');
    assert.equal(event.detail, mockEmployee.id);
  });

  test('fires "delete-employee" event when delete button is clicked', async () => {
    const el = await fixture(
      html`<employee-grid .employeeData=${[mockEmployee]}></employee-grid>`
    );

    const deleteButton = el.shadowRoot.querySelector('.delete-button');
    setTimeout(() => deleteButton.click());
    const event = await oneEvent(el, 'delete-employee');
    assert.deepEqual(event.detail, mockEmployee);
  });
});
