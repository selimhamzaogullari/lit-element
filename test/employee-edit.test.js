import {fixture, html, assert} from '@open-wc/testing';
import '../src/pages/employee-edit.js';
import {useAppStore} from '../src/store/app-store.js';

suite('employee-edit', () => {
  // let getEmployeeStub;
  // const originalLocation = window.location;

  // setup(() => {
  //   // location.pathname'i override et
  //   delete window.location;
  //   window.location = {pathname: '/employees/edit/1'};

  //   // Store methodunu stubla
  //   getEmployeeStub = sinon.stub(useEmployeeStore.getState(), 'getEmployee');
  // });

  // teardown(() => {
  //   // Restore
  //   window.location = originalLocation;
  //   getEmployeeStub.restore();
  // });

  // test('renders form if employee found', async () => {
  //   getEmployeeStub.returns({
  //     id: '1',
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: 'john@example.com',
  //   });

  //   const el = await fixture(html`<employee-edit></employee-edit>`);
  //   const form = el.shadowRoot.querySelector('employee-form');
  //   assert.ok(form);
  // });

  test('renders error if employee not found', async () => {
    useAppStore.getState().setLang('tr');
    const el = await fixture(html`<employee-edit></employee-edit>`);
    const errorDiv = el.shadowRoot.querySelector('.red-color');
    assert.ok(errorDiv);
    assert.include(errorDiv.textContent.toLowerCase(), 'bulunamadı!');
  });
});
