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
  },
};

export function t(key) {
  const lang = document.documentElement.lang || 'en';
  return messages[lang][key] || key;
}
