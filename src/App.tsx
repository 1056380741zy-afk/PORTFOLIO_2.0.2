import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
  <div className="flex-1 flex items-center justify-center bg-[#faf4eb] min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-[#8e6bbf]/20 border-t-[#8e6bbf] rounded-full animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const shouldShowGlobalFooter = location.pathname !== '/' && location.pathname !== '/journey' && location.pathname !== '/projects';

  // 页面切换时滚动到顶部
  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname]);

  return (
    <div className="h-dvh bg-[#faf4eb] pl-[clamp(1rem,4vw,3rem)] pr-[calc(clamp(2.5rem,8vw,6rem)-5px)] py-[clamp(1rem,3vw,2.5rem)] flex items-stretch font-sans overflow-hidden">
      <div className="relative flex-1 flex flex-col min-h-0 rounded-[28px]">
        <div
          className="relative flex-1 bg-[#f9f4e8] rounded-[28px] flex flex-col min-h-0"
          style={{
            boxShadow:
              '0 18px 36px rgba(90, 70, 45, 0.18), inset 0 0 0 1px rgba(241, 228, 212, 0.82), inset 0 1px 0 rgba(255,255,255,0.42)',
          }}
        >
          <header className="relative z-50 shrink-0">
            <Navbar />
          </header>
          
          <main className="flex-1 min-h-0 relative overflow-hidden rounded-[28px]">
            <div
              id="main-scroll-container"
              className="h-full overflow-x-hidden overflow-y-auto relative custom-scrollbar scroll-smooth rounded-[28px]"
            >
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                  >
                    <Routes location={location}>
                      <Route path="/" element={<Home />} />
                      <Route path="/journey" element={<Journey />} />
                      <Route path="/projects" element={<Project />} />
                      <Route path="/about" element={<Navigate to="/" replace />} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            </div>
          </main>

          {shouldShowGlobalFooter && (
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
