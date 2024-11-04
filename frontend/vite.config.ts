import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/little-happiness/',
  plugins: [react()],
  build: {
    outDir: 'dist'  // ビルド出力先を dist に指定
  }
});
