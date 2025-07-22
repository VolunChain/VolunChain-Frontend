export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName?: string;
}

export const languages: Language[] = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    flag: '🇺🇸' 
  },
  { 
    code: 'es', 
    name: 'Español', 
    nativeName: 'Español',
    flag: '🇪🇸' 
  }
];

export const defaultLanguage = languages[0];

export const getLanguageByCode = (code: string): Language => {
  return languages.find(lang => lang.code === code) || defaultLanguage;
};

export const getSupportedLanguageCodes = (): string[] => {
  return languages.map(lang => lang.code);
}; 