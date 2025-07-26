import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/employee-pagination.js';

suite('employee-pagination', () => {
  test('renders visible page numbers', async () => {
    const el = await fixture(
      html`<employee-pagination
        .totalPages=${10}
        .currentPage=${3}
      ></employee-pagination>`
    );
    const pageButtons = el.shadowRoot.querySelectorAll('.page-numbers button');
    assert.equal(pageButtons.length, 5); // 5 page should be visible
    assert.equal(pageButtons[2].textContent.trim(), '3'); // Check current page
    assert.isTrue(pageButtons[2].classList.contains('active')); // 3 is active
  });

  test('dispatches page-changed event on number click', async () => {
    const el = await fixture(
      html`<employee-pagination
        .totalPages=${10}
        .currentPage=${3}
      ></employee-pagination>`
    );
    const pageButtons = el.shadowRoot.querySelectorAll('.page-numbers button');
    setTimeout(() => pageButtons[4].click());
    const event = await oneEvent(el, 'page-changed');
    assert.equal(event.detail, 5);
  });

  test('disables left arrows on first page', async () => {
    const el = await fixture(
      html`<employee-pagination
        .totalPages=${10}
        .currentPage=${1}
      ></employee-pagination>`
    );
    const buttons = el.shadowRoot.querySelectorAll('button');
    assert.isTrue(buttons[0].disabled); // << should be disabled
    assert.isTrue(buttons[1].disabled); // < should be disabled
  });

  test('disables right arrows on last page', async () => {
    const el = await fixture(
      html`<employee-pagination
        .totalPages=${10}
        .currentPage=${10}
      ></employee-pagination>`
    );
    const buttons = el.shadowRoot.querySelectorAll('button');
    assert.isTrue(buttons[buttons.length - 1].disabled);
    assert.isTrue(buttons[buttons.length - 2].disabled);
  });
});
