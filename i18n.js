const messages = {
  en: {add: 'Add New', firstName: 'First Name'},
  tr: {add: 'Yeni Ekle', firstName: 'Ad'},
};

export function t(key) {
  const lang = document.documentElement.lang || 'en';
  return messages[lang][key] || key;
}
