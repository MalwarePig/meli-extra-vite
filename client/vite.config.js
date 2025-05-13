import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, 
    host: '192.168.1.9', // Dirección IP de tu máquina
   /*  host: true, // Permite conexiones externas  */
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    }
  }
})
