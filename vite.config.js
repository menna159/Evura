import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 👈 VERY important for IIS/SmarterASP
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5047', // your backend in dev
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
