import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub project Pages: https://<user>.github.io/<repo>/
  base: process.env.PAGES_BASE || '/',
})
