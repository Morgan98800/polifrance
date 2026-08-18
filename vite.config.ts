import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Assure le fonctionnement parfait sur GitHub Pages quel que soit le nom du dépôt
})
