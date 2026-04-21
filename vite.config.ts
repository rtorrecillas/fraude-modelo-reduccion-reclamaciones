import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'framer-motion'],
          charts: ['echarts', 'echarts-for-react'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
