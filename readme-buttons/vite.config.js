import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This tells Vite: "If you see a request starting with /api, 
      // send it to the backend server at port 3000"
      '/api': 'http://localhost:3000',
    },
  },
})