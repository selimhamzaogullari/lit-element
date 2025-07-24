import {css} from 'lit';
import {resetStyles} from './reset-style.js';
import {superClassesStyle} from './superclasses-style.js';

export const globalTheme = [
  resetStyles,
  superClassesStyle,
  css`
    html {
      background-color: var(--color-bg);
      font-size: 16px;
      font-family: 'Inter', sans-serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      color: var(--color-text);
    }

    .container {
      padding: 15px 30px;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      font: inherit;
    }
    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
];
