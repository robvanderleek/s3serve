import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080'
            }
        }
    }
});
