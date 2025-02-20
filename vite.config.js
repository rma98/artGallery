import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Detecta se está rodando no GitHub Pages ou em outro ambiente
const isGitHubPages = process.env.NODE_ENV === 'production' && process.env.VERCEL === undefined;

export default defineConfig({
  base: isGitHubPages ? '/artGallery/' : '/',
  plugins: [vue()],
});
