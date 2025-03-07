// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@storyblok/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],
  css: ['@/assets/css/main.css'],
  storyblok: {
    accessToken: `${process.env.STORYBLOK_ACCESS_TOKEN}`,
    bridge: true,
    apiOptions: {
      region: `${process.env.STORYBLOK_REGION}`,
    }
  },
  i18n: {
    locales: [
      { code: 'hi', name: 'hindi', file: 'hi.json' },
      { code: 'en', name: 'english', file: 'en.json' }
    ],
    langDir: 'locales/',
    defaultLocale: 'hi',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'hi',
    },
  },
  tailwindcss: {
    cssPath: './assets/css/main.css',
    configPath: 'tailwind.config.js',
    viewer: true,
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Ferrari F1',
      short_name: 'Ferrari',
      theme_color: '#ffffff',
      start_url: "/${locale}/manifest.webmanifest",
      display: "standalone",
      icons: [
        {
          "src": "/pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/pwa-maskable-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/pwa-maskable-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    },    
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            }
          }
        }
      ]
    }
  }
  
})