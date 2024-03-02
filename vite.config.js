import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
          @import '@fortawesome/fontawesome-free/scss/solid.scss';
          @import '@fortawesome/fontawesome-free/scss/regular.scss';
          @import '@fortawesome/fontawesome-free/scss/brands.scss';
        `,
      },
    },
  },
})
