const messages = {
  en: {employees: 'Employees', addNew: 'Add new'},
  tr: {employees: 'Çalışanlar', addNew: 'Yeni ekle'},
};

export function t(key) {
  const lang = document.documentElement.lang || 'en';
  return messages[lang][key] || key;
}
