import {fixture, assert, html, oneEvent} from '@open-wc/testing';
import '../src/pages/employee-list.js';
import {useEmployeeStore} from '../src/store/employee-store.js';
import {useAppStore} from '../src/store/app-store.js';

const mockEmployees = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    date_of_employment: '2020-01-01',
    date_of_birth: '1990-01-01',
    phone: '123456',
    email: 'john@example.com',
    department: 'HR',
    position: 'Manager',
  },
];

suite('employee-list', () => {
  setup(() => {
    const store = useEmployeeStore.getState();
    store.employees = mockEmployees;
  });

  test('renders employee list with title and buttons', async () => {
    useAppStore.getState().setLang('en');

    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;

    const title = el.shadowRoot.querySelector('span.text-3xl');
    assert.include(title.textContent, 'Employee List');

    const buttons = el.shadowRoot.querySelectorAll('button');
    assert.isAtLeast(buttons.length, 2);
  });

  test('switches to grid view when grid button clicked', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;

    const gridBtn = el.shadowRoot.querySelector('button.show-grid-view-icon');
    gridBtn.click();
    await el.updateComplete;

    const gridEl = el.shadowRoot.querySelector('employee-grid');
    assert.ok(gridEl, 'Grid component should render');
  });

  test('filters employees on search', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;

    el.searchEmployee({detail: 'john'});
    await el.updateComplete;

    const table = el.shadowRoot.querySelector('employee-table');
    assert.equal(table.employeeData.length, 1);
  });

  test('opens modal on delete-employee event', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;

    const employee = useEmployeeStore.getState().employees[0];
    el.showModal({detail: employee});
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('modal-content');
    assert.equal(modal.isOpen, true);
    assert.include(modal.textContent, 'John');
  });
});
