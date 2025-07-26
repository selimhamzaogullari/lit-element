import {fixture, assert, html, oneEvent} from '@open-wc/testing';
import '../src/components/navbar-content.js';
import {useAppStore} from '../src/store/app-store.js';

suite('Navbar Component', () => {
  test('renders navbar with buttons', async () => {
    useAppStore.getState().setLang('en');

    const el = await fixture(html`<navbar-content></navbar-content>`);
    const shadow = el.shadowRoot;

    const employeeBtn = shadow.querySelector('button span');
    const addNewBtn = shadow.querySelectorAll('button span')[1];
    const flagImg = shadow.querySelector('img.flag');

    assert.include(employeeBtn.textContent, 'Employees');
    assert.include(addNewBtn.textContent, 'Add');
    assert.ok(flagImg);
  });

  test('navigates to /employees/new when addNew button is clicked', async () => {
    const el = await fixture(html`<navbar-content></navbar-content>`);
    const shadow = el.shadowRoot;

    const popstatePromise = oneEvent(window, 'popstate');
    const addNewBtn = shadow.querySelectorAll('button')[1];
    addNewBtn.click();

    await popstatePromise;
    assert.strictEqual(location.pathname, '/employees/new');
  });
});
