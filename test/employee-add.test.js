import {fixture, html, assert} from '@open-wc/testing';
import '../src/pages/employee-add.js'; // employee-add bileşeni
import '../src/components/employee-form.js'; // employee-form içeri aktarımı
import {useAppStore} from '../src/store/app-store.js';

suite('employee-add', () => {
  test('renders title and form component', async () => {
    useAppStore.getState().setLang('en');

    const el = await fixture(html`<employee-add></employee-add>`);
    await el.updateComplete;

    const title = el.shadowRoot.querySelector('span.text-3xl');
    assert.include(title.textContent, 'Add Employee');

    // employee-form isExist
    const form = el.shadowRoot.querySelector('employee-form');
    assert.ok(form);
  });
});
