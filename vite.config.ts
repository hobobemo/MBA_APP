/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Military Band-Aid',
        short_name: 'MBA',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1C3D67',
        icons: [
          {
            src: 'assets/icons/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/icons/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  build: {
    rollupOptions: {
      external: ['@codetrix-studio/capacitor-google-auth'],
    },
  },
})
