import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AIChat } from './components/common/AIChat';
import { LanguageProvider } from './contexts/LanguageContext';

// 路由懒加载
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Journey = lazy(() => import('./pages/Journey').then(m => ({ default: m.Journey })));
const Project = lazy(() => import('./pages/Project').then(m => ({ default: m.Project })));

// 加载中占位组件
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center bg-[#f7f6f3] min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-[#8e6bbf]/20 border-t-[#8e6bbf] rounded-full animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();

  // 页面切换时滚动到顶部
  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname]);

  return (
    <div className="h-dvh bg-[#ece9e0] pl-[clamp(1rem,4vw,3rem)] pr-[clamp(2.5rem,8vw,6rem)] py-[clamp(1rem,3vw,2.5rem)] flex items-stretch font-sans overflow-hidden">
      <div className="relative flex-1 flex flex-col min-h-0">
        <div className="relative flex-1 bg-[#f7f6f3] rounded-[32px] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.05)] min-h-0">
          <header className="relative z-50 shrink-0">
            <Navbar />
          </header>
          
          <main className="flex-1 min-h-0 relative overflow-hidden rounded-b-[32px]">
            <div
              id="main-scroll-container"
              className="h-full overflow-x-hidden overflow-y-auto relative custom-scrollbar scroll-smooth"
            >
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/journey" element={<Journey />} />
                  <Route path="/projects" element={<Project />} />
                  <Route path="/about" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>
          </main>

          {location.pathname !== '/journey' && (
            <footer className="relative z-40 shrink-0">
              <Footer />
            </footer>
          )}
        </div>
      </div>
      <AIChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
};

export default App;
