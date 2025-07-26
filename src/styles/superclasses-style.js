// reset-styles.js
import {css} from 'lit';

export const superClassesStyle = css`
  .main-color {
    color: var(--color-main);
  }
  .red-color {
    color: var(--color-red);
  }
  .d-flex {
    display: flex;
  }
  .d-none {
    display: none;
  }
  .flex-column {
    flex-direction: column;
  }
  .w-full {
    width: 100%;
  }
  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .text-center {
    text-align: center;
  }

  .text-sm {
    font-size: var(--text-sm);
  }
  .text-base {
    font-size: var(--text-base);
  }
  .text-lg {
    font-size: var(--text-lg);
  }
  .text-xl {
    font-size: var(--text-xl);
  }
  .text-2xl {
    font-size: var(--text-2xl);
  }
  .text-3xl {
    font-size: var(--tex-3xl);
  }

  .font-semibold {
    font-weight: var(--font-semibold);
  }

  .font-bold {
    font-weight: var(--font-bold);
  }

  .mb-4 {
    margin-bottom: var(--spacing-4);
  }
  .mb-8 {
    margin-bottom: var(--spacing-8);
  }
  .mb-12 {
    margin-bottom: var(--spacing-12);
  }
  .mb-16 {
    margin-bottom: var(--spacing-16);
  }
  .mb-20 {
    margin-bottom: var(--spacing-20);
  }
  .mb-24 {
    margin-bottom: var(--spacing-24);
  }
  .mb-32 {
    margin-bottom: var(--spacing-32);
  }
  .mb-40 {
    margin-bottom: var(--spacing-40);
  }
  .mb-48 {
    margin-bottom: var(--spacing-48);
  }

  .mt-4 {
    margin-top: var(--spacing-4);
  }
  .mt-8 {
    margin-top: var(--spacing-8);
  }
  .mt-12 {
    margin-top: var(--spacing-12);
  }
  .mt-16 {
    margin-top: var(--spacing-16);
  }
  .mt-20 {
    margin-top: var(--spacing-20);
  }
  .mt-24 {
    margin-top: var(--spacing-24);
  }
  .mt-32 {
    margin-top: var(--spacing-32);
  }
  .mt-40 {
    margin-top: var(--spacing-40);
  }
  .mt-48 {
    margin-top: var(--spacing-48);
  }

  .ml-4 {
    margin-left: var(--spacing-4);
  }
  .ml-8 {
    margin-left: var(--spacing-8);
  }
  .ml-12 {
    margin-left: var(--spacing-12);
  }
  .ml-16 {
    margin-left: var(--spacing-16);
  }
  .ml-20 {
    margin-left: var(--spacing-20);
  }
  .ml-24 {
    margin-left: var(--spacing-24);
  }
  .ml-32 {
    margin-left: var(--spacing-32);
  }
  .ml-40 {
    margin-left: var(--spacing-40);
  }
  .ml-48 {
    margin-left: var(--spacing-48);
  }

  .mr-4 {
    margin-right: var(--spacing-4);
  }
  .mr-8 {
    margin-right: var(--spacing-8);
  }
  .mr-12 {
    margin-right: var(--spacing-12);
  }
  .mr-16 {
    margin-right: var(--spacing-16);
  }
  .mr-20 {
    margin-right: var(--spacing-20);
  }
  .mr-24 {
    margin-right: var(--spacing-24);
  }
  .mr-32 {
    margin-right: var(--spacing-32);
  }
  .mr-40 {
    margin-right: var(--spacing-40);
  }
  .mr-48 {
    margin-right: var(--spacing-48);
  }

  .pt-4 {
    padding-top: var(--spacing-4);
  }
  .pt-8 {
    padding-top: var(--spacing-8);
  }
  .pt-12 {
    padding-top: var(--spacing-12);
  }
  .pt-16 {
    padding-top: var(--spacing-16);
  }
  .pt-20 {
    padding-top: var(--spacing-20);
  }
  .pt-24 {
    padding-top: var(--spacing-24);
  }
  .pt-32 {
    padding-top: var(--spacing-32);
  }
  .pt-40 {
    padding-top: var(--spacing-40);
  }
  .pt-48 {
    padding-top: var(--spacing-48);
  }

  .pb-4 {
    padding-bottom: var(--spacing-4);
  }
  .pb-8 {
    padding-bottom: var(--spacing-8);
  }
  .pb-12 {
    padding-bottom: var(--spacing-12);
  }
  .pb-16 {
    padding-bottom: var(--spacing-16);
  }
  .pb-20 {
    padding-bottom: var(--spacing-20);
  }
  .pb-24 {
    padding-bottom: var(--spacing-24);
  }
  .pb-32 {
    padding-bottom: var(--spacing-32);
  }
  .pb-40 {
    padding-bottom: var(--spacing-40);
  }
  .pb-48 {
    padding-bottom: var(--spacing-48);
  }

  .pl-4 {
    padding-left: var(--spacing-4);
  }
  .pl-8 {
    padding-left: var(--spacing-8);
  }
  .pl-12 {
    padding-left: var(--spacing-12);
  }
  .pl-16 {
    padding-left: var(--spacing-16);
  }
  .pl-20 {
    padding-left: var(--spacing-20);
  }
  .pl-24 {
    padding-left: var(--spacing-24);
  }
  .pl-32 {
    padding-left: var(--spacing-32);
  }
  .pl-40 {
    padding-left: var(--spacing-40);
  }
  .pl-48 {
    padding-left: var(--spacing-48);
  }

  .pr-4 {
    padding-right: var(--spacing-4);
  }
  .pr-8 {
    padding-right: var(--spacing-8);
  }
  .pr-12 {
    padding-right: var(--spacing-12);
  }
  .pr-16 {
    padding-right: var(--spacing-16);
  }
  .pr-20 {
    padding-right: var(--spacing-20);
  }
  .pr-24 {
    padding-right: var(--spacing-24);
  }
  .pr-32 {
    padding-right: var(--spacing-32);
  }
  .pr-40 {
    padding-right: var(--spacing-40);
  }
  .pr-48 {
    padding-right: var(--spacing-48);
  }

  .gap-4 {
    gap: var(--spacing-4);
  }
  .gap-8 {
    gap: var(--spacing-8);
  }
  .gap-12 {
    gap: var(--spacing-12);
  }
  .gap-16 {
    gap: var(--spacing-16);
  }
  .gap-20 {
    gap: var(--spacing-20);
  }
  .gap-24 {
    gap: var(--spacing-24);
  }
  .gap-32 {
    gap: var(--spacing-32);
  }
  .gap-40 {
    gap: var(--spacing-40);
  }
  .gap-48 {
    gap: var(--spacing-48);
  }

  .gap-y-4 {
    row-gap: var(--spacing-4);
  }
  .gap-y-8 {
    row-gap: var(--spacing-8);
  }
  .gap-y-12 {
    row-gap: var(--spacing-12);
  }
  .gap-y-16 {
    row-gap: var(--spacing-16);
  }
  .gap-y-20 {
    row-gap: var(--spacing-20);
  }
  .gap-y-24 {
    row-gap: var(--spacing-24);
  }
  .gap-y-32 {
    row-gap: var(--spacing-32);
  }
  .gap-y-40 {
    row-gap: var(--spacing-40);
  }
  .gap-y-48 {
    row-gap: var(--spacing-48);
  }

  .gap-x-4 {
    column-gap: var(--spacing-4);
  }
  .gap-x-8 {
    column-gap: var(--spacing-8);
  }
  .gap-x-12 {
    column-gap: var(--spacing-12);
  }
  .gap-x-16 {
    column-gap: var(--spacing-16);
  }
  .gap-x-20 {
    column-gap: var(--spacing-20);
  }
  .gap-x-24 {
    column-gap: var(--spacing-24);
  }
  .gap-x-32 {
    column-gap: var(--spacing-32);
  }
  .gap-x-40 {
    column-gap: var(--spacing-40);
  }
  .gap-x-48 {
    column-gap: var(--spacing-48);
  }
`;
