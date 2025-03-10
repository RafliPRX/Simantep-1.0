import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    historyApiFallback: true, // Redirect all requests to index.html for SPA routing
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000 * 1024,
    outDir: 'dist', // set chunk size limit to 1 MB
  },
})
