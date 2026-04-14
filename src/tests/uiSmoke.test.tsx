import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Navbar } from '../components/common/Navbar';
import { Home } from '../pages/Home';

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
