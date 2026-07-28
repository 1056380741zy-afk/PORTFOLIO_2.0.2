import path from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const referencedPublicAssets = [
  'SVG/tabsmall.svg',
  'bg/home-archive-document-grid-user-final-desktop.jpg',
  'bg/home-archive-document-grid-user-final-mobile.jpg',
  'decorations/topographic-contours.webp',
  'decorations/pin.png',
  'fonts/29lt-makina-regular.otf',
  'images/BINANCE infographic.webp',
  'images/Banner 2425.jpg',
  'images/Consulate General of China in Dubai.jpg',
  'images/Huawei.jpeg',
  'images/Landing Page_1420x4000.pdf',
  'images/Project 1-Cooperative strategy between The SANDBOX & Yalla.webp',
  'images/Project 2-Stategic Analysis and Recommendations for BINANCE.webp',
  "images/Project 3-Institutional and Cultural Drivers of Women's Participation in the UAE WEB3.webp",
  'images/SANDBOX infographic.webp',
  'images/WEB3 infographic.webp',
  'images/aib-mena-Header-Logo.png',
  'images/freecompress-EDM.pdf',
  'images/freecompress-demo.mp4',
  'images/icons8-facebook-240.png',
  'images/icons8-linkedin-240.png',
  'images/icons8-tiktok-240.png',
  'images/icons8-whatsapp-240.png',
  'images/icons8-wordpress-240.png',
  'images/postcard-desert-background.png',
  'images/wechat-meshsuha-qr.jpeg',
  'projects/card04-route-desktop.webp',
  'projects/card04-route-mobile.webp',
  'projects/generated/card01-khaki.webp',
  'projects/generated/card02-clay.webp',
  'projects/generated/card03-olive.webp',
  'projects/generated/project-preview-card01-field-archive.png',
  'projects/generated/project-preview-card02-field-archive.png',
  'projects/generated/project-preview-card03-field-archive.png',
  'textures/archive-paper-v1-desktop.webp',
  'textures/archive-paper-v1-mobile.webp',
  'textures/natural-paper.png',
  'toolsandsoftware/AdobeDreamweaver.png',
  'toolsandsoftware/AdobeIllustrator.png',
  'toolsandsoftware/Canva.png',
  'toolsandsoftware/Elementor.png',
  'toolsandsoftware/Figma.png',
  'toolsandsoftware/Linkedin.png',
  'toolsandsoftware/Meta.png',
  'toolsandsoftware/Microsoft.png',
  'toolsandsoftware/Stripo.png',
  'toolsandsoftware/TikTok.png',
  'toolsandsoftware/WordPress.png',
  'toolsandsoftware/codex.png',
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
