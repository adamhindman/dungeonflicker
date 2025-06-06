import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    copyPublicDir: true
  },
  publicDir: 'public',
  server: {
    cors: true
  }
})