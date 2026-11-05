import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site works from any folder on any static host
export default defineConfig({
  plugins: [react()],
  base: './',
})
