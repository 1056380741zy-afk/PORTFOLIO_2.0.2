import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const browserUserAgent = navigator.userAgent;
const isSafariBrowser =
  /Safari/i.test(browserUserAgent) &&
  !/(Chrome|Chromium|CriOS|Edg|OPR|FxiOS)/i.test(browserUserAgent);

document.documentElement.classList.toggle('browser-safari', isSafariBrowser);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <App />
);
