import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths for GitHub Pages, Vercel, Netlify
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
})
