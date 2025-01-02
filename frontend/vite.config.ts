import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:
    {
      // redirect request on /api to target specified
      '/api': {        
        target: 'https://localhost:7085/', // whether you're running your local api with kestrel or behind IIS Express, the port mind change
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
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  }
})
