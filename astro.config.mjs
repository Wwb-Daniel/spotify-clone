import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default {
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    ssr: {
      external: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
    },
  },
};
