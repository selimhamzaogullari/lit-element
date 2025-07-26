import {useAppStore} from './store/app-store';

const messages = {
  en: {
    employees: 'Employees',
    addNew: 'Add new',
    firstName: 'First Name',
    lastName: 'Last Name',
    dateEmployement: 'Date of Employement',
    dateBirth: 'Date of Birth',
    phone: 'Phone',
    email: 'Email',
    department: 'Department',
    position: 'Pozition',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    areYouSure: 'Are you sure?',
    deleteEmployeeMessage:
      'Selected employee record of {{name}} will be deleted',
    editEmployeeMessage: 'Selected employee record of {{name}} will be edited',
    addEmployeeMessage: 'You are adding a new employee',
    proceed: 'Proceed',
    cancel: 'Cancel',
    searchEmployees: 'Search employee...',
    employeeList: 'Employee List',
    addEmployee: 'Add Employee',
    save: 'Save',
    requireField: '{{field}} is required!',
    invalidFormat: 'Invalid {{field}} format!',
    dateRangeError: '{{field}} date must be between {{min}} and {{max}}',
    editEmployee: 'Edit Employee',
    employeeNotFound: 'Employee not found!',
    editedEmployeeInfo: 'You are editing {{name}}',
  },
  tr: {
    employees: 'Çalışanlar',
    addNew: 'Yeni ekle',
    firstName: 'Ad',
    lastName: 'Soyad',
    dateEmployement: 'İşe Alım Tarihi',
    dateBirth: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    actions: 'Eylemler',
    edit: 'Düzenle',
    delete: 'Sil',
    areYouSure: 'Emin misiniz?',
    deleteEmployeeMessage: 'Seçilen {{name}} çalışan kaydı silinecektir',
    editEmployeeMessage: 'Seçilen {{name}} çalışan kaydı güncellenecektir',
    addEmployeeMessage: 'Yeni bir çalışan ekliyorsunuz',
    proceed: 'Devam et',
    cancel: 'İptal',
    searchEmployees: 'Çalışan ara...',
    employeeList: 'Çalışan Listesi',
    addEmployee: 'Çalışan Ekle',
    save: 'Kaydet',
    requireField: '{{field}} alanı gerekli!',
    invalidFormat: '{{field}} geçerisiz formatta!',
    dateRangeError:
      '{{field}} tarihi {{min}} ile {{max}} tairhleri arasında olmalı',
    editEmployee: 'Çalışanı Düzenle',
    employeeNotFound: 'Çalışan bulunamadı!',
    editedEmployeeInfo: '{{name}} çalışanını düzenliyorsunuz',
  },
};

export const t = (key, vars = {}) => {
  const lang = useAppStore.getState().lang;
  const template = messages[lang]?.[key] || key;

  // Değişkenleri {{name}} → vars.name şeklinde değiştir
  return template.replace(/{{(.*?)}}/g, (_, k) => vars[k.trim()] ?? '');
};
