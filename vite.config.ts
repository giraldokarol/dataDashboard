import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve : {
    alias: {
      '@' : path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions : {
      scss: {
        additionalData: `@use "@/styles/config.scss" as *; @use "@/styles/mixin.scss" as *;`
      }
    }
  }
})
