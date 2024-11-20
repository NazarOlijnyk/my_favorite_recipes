import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import rewriteAll from 'vite-plugin-rewrite-all';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), rewriteAll()],
  base: mode === 'production' ? '/my_favorite_recipes/' : '/',
}))
