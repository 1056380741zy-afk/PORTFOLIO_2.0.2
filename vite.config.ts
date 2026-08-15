import path from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const referencedPublicAssets = [
  'shared/ui/file-tab.svg',
  'shared/fonts/29lt-makina-regular.otf',
  'shared/textures/archive-paper-desktop.webp',
  'shared/textures/archive-paper-mobile.webp',
  'shared/textures/natural-paper.png',
  'home/board/background/archive-grid-desktop.jpg',
  'home/board/background/archive-grid-mobile.jpg',
  'home/board/decorations/pin.png',
  'home/board/postcard/desert-ascii-telemetry.png',
  'home/board/postcard/wechat-qr.jpeg',
  'home/board/tools/adobe-dreamweaver.png',
  'home/board/tools/adobe-illustrator.png',
  'home/board/tools/canva.png',
  'home/board/tools/codex.png',
  'home/board/tools/elementor.png',
  'home/board/tools/figma.png',
  'home/board/tools/linkedin.png',
  'home/board/tools/meta.png',
  'home/board/tools/microsoft.png',
  'home/board/tools/stripo.png',
  'home/board/tools/tiktok.png',
  'home/board/tools/wordpress.png',
  'home/downloads/Suha-portfolio-CV.pdf',
  'projects/index/decorations/topographic-contours.webp',
  'projects/index/cards/international-exhibition.png',
  'projects/index/cards/event-operations.png',
  'projects/index/cards/web3-research.png',
  'projects/exhibition/campaign-video.mp4',
  'projects/exhibition/edm-campaign.pdf',
  'projects/exhibition/edm-preview.jpg',
  'projects/exhibition/localization-landing-page.pdf',
  'projects/exhibition/localization-preview.jpg',
  'projects/activation/aib-mena-header-logo.png',
  'projects/activation/china-consulate-dubai.jpg',
  'projects/activation/huawei-gdc.jpeg',
  'projects/activation/watertech-banner.jpg',
  'projects/web3/binance-banner.webp',
  'projects/web3/binance-infographic.webp',
  'projects/web3/sandbox-yalla-banner.webp',
  'projects/web3/sandbox-infographic.webp',
  'projects/web3/uae-women-banner.webp',
  'projects/web3/uae-women-infographic.webp',
] as const;

const copyReferencedPublicAssets = () => ({
  name: 'copy-referenced-public-assets',
  writeBundle(options: { dir?: string }) {
    const outputDirectory = path.resolve(options.dir ?? 'dist');

    referencedPublicAssets.forEach((assetPath) => {
      const sourcePath = path.resolve('public', assetPath);
      if (!existsSync(sourcePath)) return;

      const outputPath = path.resolve(outputDirectory, assetPath);
      mkdirSync(path.dirname(outputPath), { recursive: true });
      copyFileSync(sourcePath, outputPath);
    });
  },
});

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
          },
        },
      },
      preview: {
        port: 4173,
        host: '0.0.0.0',
      },
      plugins: [react(), copyReferencedPublicAssets()],
      build: {
        copyPublicDir: false,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (!id.includes('node_modules')) return undefined;
              if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion';
              if (/react-simple-maps|d3-geo|topojson/.test(id)) return 'maps';
              if (/recharts|victory-vendor|node_modules\/d3-/.test(id)) return 'charts';
              if (/react-router|node_modules\/react\/|node_modules\/react-dom\/|node_modules\/scheduler\//.test(id)) return 'react-vendor';
              if (id.includes('lucide-react')) return 'icons';
              return undefined;
            },
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});
