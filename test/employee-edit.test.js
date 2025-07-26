import {fixture, html, assert} from '@open-wc/testing';
import sinon from 'sinon';
import '../src/pages/employee-edit.js';
import '../src/components/employee-form.js';
import {useEmployeeStore} from '../src/store/employee-store.js';

suite('employee-edit', () => {
  let getEmployeeStub;
  const originalLocation = window.location;

  setup(() => {
    // location.pathname'i override et
    delete window.location;
    window.location = {pathname: '/employees/edit/1'};

    // Store methodunu stubla
    getEmployeeStub = sinon.stub(useEmployeeStore.getState(), 'getEmployee');
  });

  teardown(() => {
    // Restore
    window.location = originalLocation;
    getEmployeeStub.restore();
  });

  test('renders form if employee found', async () => {
    getEmployeeStub.returns({
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
    });

    const el = await fixture(html`<employee-edit></employee-edit>`);
    const form = el.shadowRoot.querySelector('employee-form');
    assert.ok(form);
  });

  test('renders error if employee not found', async () => {
    getEmployeeStub.returns(undefined);

    const el = await fixture(html`<employee-edit></employee-edit>`);
    const errorDiv = el.shadowRoot.querySelector('.red-color');
    assert.ok(errorDiv);
    assert.include(errorDiv.textContent.toLowerCase(), 'not found');
  });
});
