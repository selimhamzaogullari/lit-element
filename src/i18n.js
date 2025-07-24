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
    department: 'Phone',
    position: 'Phone',
    phone: 'Phone',
    department: 'Department',
    position: 'Position',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    areYouSure: 'Are you sure?',
    deleteEmployeeMessage:
      'Selected employee record of {{name}} will be deleted',
    proceed: 'Proceed',
    cancel: 'Cancel',
    searchEmployees: 'Search employee...',
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
    proceed: 'Devam et',
    cancel: 'İptal',
    searchEmployees: 'Çalışan ara...',
  },
};

export const t = (key, vars = {}) => {
  const lang = useAppStore.getState().lang;
  const template = messages[lang]?.[key] || key;

  // Değişkenleri {{name}} → vars.name şeklinde değiştir
  return template.replace(/{{(.*?)}}/g, (_, k) => vars[k.trim()] ?? '');
};
