# 🧩 Employee Management App

A modern, component-driven web application built with [Lit](https://lit.dev/) that enables users to manage employees through a clean, responsive UI. Features include listing, adding, editing, deleting, filtering, and paginating employee records.

---

## 🚀 Features

- ✅ Component-based architecture using Lit
- 🌍 Multilingual support (English & Turkish)
- 👨‍💼 View toggle: switch between Grid and Table views
- 🔍 Real-time search with debounce optimization
- 📝 Add/Edit employee details with validation
- ❌ Deletion confirmation modal
- 📄 Pagination for improved usability
- 🔧 Centralized state management via Zustand

---

## 📁 Folder Structure

```
src/
├── assets/                # Static assets (images, icons)
├── components/            # Web components (e.g., EmployeeForm, Navbar)
├── pages/                 # Page-level components (Add, Edit, List)
├── store/                 # Zustand-based state management
├── styles/                # Global styles and themes
├── utils/                 # Shared helpers, icons, base classes
├── i18n.js                # Internationalization support
└── index.html             # App entry point
```

---

## 🛠️ Getting Started

### Installation

```bash
git clone https://github.com/selimhamzaogullari/lit-element.git
cd employee-app-lit
npm install
```

### Development Server

```bash
npm run serve
```

This will launch the app locally at: [http://localhost:8000](http://localhost:8000)

---

## 🧪 Running Tests

This project uses `@web/test-runner` and `@open-wc/testing`.

```bash
npm test
```

---

## 🧠 State Management

Zustand is used for reactive, centralized state:

- `useEmployeeStore`: manages the list of employees and related mutations
- `useAppStore`: handles app-wide settings like current language

State is persisted across sessions using `persist()` middleware.

---

## ✨ Internationalization

Translations are handled via a simple utility (`i18n.js`) which resolves keys dynamically based on current language.

```js
t('addEmployee'); // Returns localized string based on selected language
```

Languages supported:

- English (`en`)
- Turkish (`tr`)
