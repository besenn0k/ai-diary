import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'en', 'de', 'uk'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed'
});
