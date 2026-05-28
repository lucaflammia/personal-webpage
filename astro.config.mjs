// @ts-check
import { defineConfig, sessionDrivers } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://lucaflammia.com',

  vite: {
    plugins: [tailwindcss()],
  },

  session: {
    driver: sessionDrivers.memory(),
  },

  integrations: [react(), sitemap()],
  adapter: cloudflare(),
});