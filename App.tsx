import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Competencies } from './components/Competencies';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#faece3]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Competencies />
        <Journey />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;