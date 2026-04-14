import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Navbar } from '../components/common/Navbar';
import { Home } from '../pages/Home';
import { LanguageProficiency } from '../components/about/sections/AboutCards';

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message);
};

const render = (node: React.ReactNode, path = '/') =>
  renderToString(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>
    </LanguageProvider>
  );

const navbarHtml = render(<Navbar />);
assert(navbarHtml.includes('HOME / / ABOUT INFO'), 'Navbar should render HOME label');
assert(navbarHtml.includes('side-nav-container'), 'Navbar should include desktop side-nav container');

const homeHtml = render(<Home />);
assert(homeHtml.includes('Stamp cluster'), 'Home should include the stamp cluster container');
assert(homeHtml.includes('Download') || homeHtml.includes('CV.pdf'), 'Home should include CV download affordance');

const languageHtml = render(<LanguageProficiency />);
assert(languageHtml.includes('Language Proficiency'), 'LanguageProficiency should render heading');
assert(languageHtml.includes('Chinese') && languageHtml.includes('Native'), 'LanguageProficiency should include Chinese Native');
assert(languageHtml.includes('English') && languageHtml.includes('Professional Proficiency'), 'LanguageProficiency should include English Professional Proficiency');
assert(languageHtml.includes('Arabic') && languageHtml.includes('Professional Proficiency'), 'LanguageProficiency should include Arabic Professional Proficiency');

const prevNavigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
Object.defineProperty(globalThis, 'navigator', { value: { language: 'ar-SA' }, configurable: true });
const arabicLocaleHtml = render(<LanguageProficiency />);
assert(arabicLocaleHtml.includes('dir="rtl"'), 'Arabic row should render RTL when locale is ar-SA');
assert(arabicLocaleHtml.includes('lang="ar"'), 'Arabic row should set lang="ar" for pronunciation');
if (prevNavigatorDescriptor) {
  Object.defineProperty(globalThis, 'navigator', prevNavigatorDescriptor);
} else {
  delete (globalThis as any).navigator;
}
