import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/modal-content.js';

suite('modal-content', () => {
  test('is initially hidden', async () => {
    const el = await fixture(html`<modal-content></modal-content>`);
    const modal = el.shadowRoot.querySelector('#modalContent');
    assert.isTrue(modal.classList.contains('d-none'));
  });

  test('show() method displays the modal', async () => {
    const el = await fixture(html`<modal-content></modal-content>`);
    el.show();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector('#modalContent');
    assert.isTrue(modal.classList.contains('d-flex'));
  });

  test('hide() method hides the modal and emits cancel-modal event', async () => {
    const el = await fixture(html`<modal-content></modal-content>`);
    el.show(); // open first
    await el.updateComplete;

    const listener = oneEvent(el, 'cancel-modal');
    el.hide();
    await listener;

    assert.isFalse(el.isOpen);
  });

  test('clicking close button hides modal and emits cancel-modal', async () => {
    const el = await fixture(html`<modal-content></modal-content>`);
    el.show();
    await el.updateComplete;

    const listener = oneEvent(el, 'cancel-modal');
    const closeBtn = el.shadowRoot.querySelector('.close-button');
    closeBtn.click();
    await listener;

    assert.isFalse(el.isOpen);

    const modalContainer = el.shadowRoot.querySelector('#modalContent');
    assert.isTrue(modalContainer.classList.contains('d-none'));
  });

  test('clicking proceed button emits proceed-modal event', async () => {
    const el = await fixture(html`<modal-content></modal-content>`);
    el.show();
    await el.updateComplete;

    const listener = oneEvent(el, 'proceed-modal');
    const proceedBtn = el.shadowRoot.querySelector('.proceed-button');
    proceedBtn.click();
    const event = await listener;

    assert.ok(event);
  });

  test('slot content is rendered', async () => {
    const el = await fixture(html`
      <modal-content><p id="test-slot">Test content</p></modal-content>
    `);
    el.show();
    await el.updateComplete;

    const slotContent = el.querySelector('#test-slot');
    assert.ok(slotContent);
    assert.equal(slotContent.textContent, 'Test content');
  });
});
