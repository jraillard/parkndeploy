import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:
    {
      '/api': {
        target: 'https://localhost:7085/',
        secure: false, // Do not verify SSL certificates
        rewrite: (path) => path.replace(/^\/api/, ''), // remove /api from request path to match the backend
      },
    }
  },
  resolve: {    
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },  
  plugins: [react()],
})
