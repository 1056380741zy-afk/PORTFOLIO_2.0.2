# Public assets

Runtime assets are grouped by page and section:

- `shared/`: fonts, textures, and common UI masks.
- `home/board/`: home board backgrounds, postcard media, decorations, and tool icons.
- `home/downloads/`: downloadable portfolio files.
- `projects/index/`: project overview card art and decorations.
- `projects/exhibition/`: exhibition campaign PDFs, previews, and video.
- `projects/activation/`: event activation imagery.
- `projects/web3/`: Web3 case banners and infographics.
- `_unused/`: archived source files, superseded variants, and assets with no runtime reference.

The production build copies only the paths listed in `vite.config.ts`, so `_unused/` is retained locally without increasing the deployed bundle.
