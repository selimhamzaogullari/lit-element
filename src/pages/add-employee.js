import {LitElement, css, html} from 'lit';

export class AddEmployee extends LitElement {
  render() {
    return html`<div>Add New Employee</div>`;
  }
}
customElements.define('add-employee', AddEmployee);
