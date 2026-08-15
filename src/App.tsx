import React, { useEffect, Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Rotate3D } from 'lucide-react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AIChat } from './components/common/AIChat';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// 路由懒加载
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Journey = lazy(() => import('./pages/Journey').then(m => ({ default: m.Journey })));
const ProjectPreview = lazy(() => import('./pages/ProjectPreview').then(m => ({ default: m.ProjectPreview })));
const DESIGN_CANVAS_WIDTH = 1744;
const DESIGN_CANVAS_HEIGHT = 840;

const MobileRotateHint: React.FC = () => {
  const { language } = useLanguage();
  const isCn = language === 'cn';

  return (
    <aside className="mobile-rotate-hint" aria-live="polite">
      <div className="mobile-rotate-hint-card">
        <div className="mobile-rotate-symbol" aria-hidden="true">
          <Rotate3D className="mobile-rotate-icon" size={28} strokeWidth={1.7} />
        </div>
        <div>
          <p className="mobile-rotate-hint-title">
            {isCn ? '请横屏查看' : 'Rotate to landscape'}
          </p>
          <p className="mobile-rotate-hint-copy">
            {isCn ? '横屏可完整显示 PC 版作品集画布。' : 'Landscape shows the full desktop canvas.'}
          </p>
        </div>
      </div>
    </aside>
  );
};

// 加载中占位组件
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center bg-[#faf4eb] min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-[#9f8fdb]/20 border-t-[#9f8fdb] rounded-full animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const shouldShowGlobalFooter = !['/', '/journey'].includes(location.pathname) && !location.pathname.startsWith('/projects');
  const [canvasScale, setCanvasScale] = useState(1);

  useEffect(() => {
    const updateCanvasScale = () => {
      // Use the layout viewport so Safari's visual viewport zoom does not
      // trigger a second round of canvas scaling.
      const availableWidth = document.documentElement.clientWidth || window.innerWidth;
      const availableHeight = document.documentElement.clientHeight || window.innerHeight;

      setCanvasScale(Math.min(
        1,
        availableWidth / DESIGN_CANVAS_WIDTH,
        availableHeight / DESIGN_CANVAS_HEIGHT,
      ));
    };

    updateCanvasScale();
    window.addEventListener('resize', updateCanvasScale);

    return () => {
      window.removeEventListener('resize', updateCanvasScale);
    };
  }, []);

  // 页面切换时滚动到顶部
  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname]);

  return (
    <div
      className="portfolio-stage font-sans"
      style={{
        '--portfolio-frame-height': `${DESIGN_CANVAS_HEIGHT * canvasScale}px`,
      } as React.CSSProperties}
    >
      <div
        className="portfolio-stage-frame"
        style={{
          width: DESIGN_CANVAS_WIDTH * canvasScale,
          height: DESIGN_CANVAS_HEIGHT * canvasScale,
        }}
      >
        <div
          className="portfolio-design-canvas pl-12 pr-[91px] py-10 flex items-stretch overflow-hidden"
          style={{
            width: DESIGN_CANVAS_WIDTH,
            height: DESIGN_CANVAS_HEIGHT,
            transform: `scale(${canvasScale})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="relative flex-1 flex flex-col min-h-0 rounded-[28px]">
            <div
              className="portfolio-main-board relative flex-1 flex flex-col min-h-0 rounded-[28px]"
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
                      <div
                        key={location.pathname}
                        className="route-transition h-full"
                      >
                        <Routes location={location}>
                          <Route path="/" element={<Home />} />
                          <Route path="/home-2" element={<Navigate to="/" replace />} />
                          <Route path="/journey" element={<Journey />} />
                          <Route path="/projects/preview" element={<ProjectPreview />} />
                          <Route path="/projects/preview/:detail" element={<ProjectPreview />} />
                          <Route path="/projects" element={<Navigate to="/projects/preview" replace />} />
                          <Route path="/about" element={<Navigate to="/" replace />} />
                        </Routes>
                      </div>
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
      </div>
      <MobileRotateHint />
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
