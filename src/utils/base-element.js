import {LitElement} from 'lit';
import {useAppStore} from '../store/app-store';

export class BaseElement extends LitElement {
  static properties = {
    lang: {type: String},
  };

  constructor() {
    super();
    this.lang = useAppStore.getState().lang;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribeLang = useAppStore.subscribe((state) => {
      this.lang = state.lang;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeLang?.();
  }
}
