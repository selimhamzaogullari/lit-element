import {LitElement, css, html} from 'lit';

export class EmployeeEdit extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    console.log(location);
  }
  render() {
    return html`<div>Employee Add</div>`;
  }
}
customElements.define('employee-edit', EmployeeEdit);
