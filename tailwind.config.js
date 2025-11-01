export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#000',
          dark: '#121212',
          darker: '#0f0f0f',
          gray: '#282828',
          green: '#1DB954',
        },
      },
      fontFamily: {
        spotify: ['Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
