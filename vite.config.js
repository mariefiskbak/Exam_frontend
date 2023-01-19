import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "build") { // npm run build
    return {
      plugins: [react()],
      base: `./`,
      build: {
        rollupOptions: {
          output: {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`
          }
        }
      }
    }
  } else { // npm run dev
    return {
      plugins: [react()],
      base: "/exam_frontend/"
    }
  }
})

