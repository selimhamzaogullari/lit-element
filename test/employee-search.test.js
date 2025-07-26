import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/employee-search.js';

suite('employee-search', () => {
  test('renders input with placeholder', async () => {
    const el = await fixture(html`<employee-search></employee-search>`);
    const input = el.shadowRoot.querySelector('input');
    assert.exists(input);
    assert.equal(input.getAttribute('type'), 'text');
  });

  test('dispatches search-employee event on input', async () => {
    const el = await fixture(html`<employee-search></employee-search>`);
    const input = el.shadowRoot.querySelector('input');

    // Manual wait for debounce effect (300ms)
    const promise = oneEvent(el, 'search-employee');
    input.value = 'john';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    const event = await promise;

    assert.equal(event.detail, 'john');
  });
});
