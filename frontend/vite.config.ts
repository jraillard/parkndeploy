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
