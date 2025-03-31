import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import license from "rollup-plugin-license"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    license({
      thirdParty: {
        includePrivate: true, // Default is false.
        includeSelf: true, // Default is false.
        multipleVersions: true, // Default is false.
        output: path.join(__dirname, 'dist', 'licenses.txt'),
      }
    })
  ],
  server: {
    watch: {
      usePolling: true
    }
  },
})
