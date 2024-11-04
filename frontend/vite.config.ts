import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import env from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/little-happiness/',
  plugins: [react(), env({ prefix: 'VITE', mountedPath: 'process.env' })],
  build: {
    outDir: 'dist', // ビルド出力先を dist に指定
  },
});
