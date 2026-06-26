// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://osint-witch.com',
  output: 'static',

  markdown: {
    // Syntax highlight nativo (Shiki) nos blocos de codigo dos write-ups.
    // O tema combina com a paleta synthwave do site.
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
