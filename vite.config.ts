import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import license from "rollup-plugin-license"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    },
    watch: {
      usePolling: true
    },
    fs: {
      allow: ['.', 'Unity']
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps:{
    include: ['@radix-ui/react-dialog'],
  },
})
