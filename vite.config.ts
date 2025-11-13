import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
    react(),
    federation({
      name: 'app_shared',
      filename: 'remoteEntry.js',
      exposes: {
        './pages': './src/expose/pages',
        './loaders': './src/expose/loaders',
        // './QuestListPage': './src/pages/List/QuestListPage.tsx',
        // './QuestReQuestListPage': './src/pages/List/QuestReQuestListPage.tsx',
        // './WelcomeQuestListPage': './src/pages/List/WelcomeQuestListPage.tsx',
        // './RedeemListPage': './src/pages/List/RedeemListPage.tsx',
        // './DetailQuestReQuestPage': './src/pages/Detail/DetailQuestReQuestPage.tsx',
        // './DetailWelcomeQuestPage': './src/pages/Detail/DetailWelcomeQuestPage.tsx',
        // './DetailQuestPage': './src/pages/Detail/DetailQuestPage.tsx',
        // './RedeemDetailPage': './src/pages/Detail/RedeemDetailPage.tsx',
        // './CreateWelcomeQuestPage': './src/pages/Create/CreateWelcomeQuestPage.tsx',
        // './CreateQuestPage': './src/pages/Create/CreateQuestPage.tsx',
        // './CreateRedeemPage': './src/pages/Create/CreateRedeemPage.tsx',
        // './i18n': './src/i18n.ts',
        // './LanguageSelector': './src/components/LanguageSelector.tsx',
        // './questLoader': './src/loaders/questLoader.ts'
      },
      shared: ['react', 'react-dom', 'antd', '@emotion/styled', 'react-router-dom', '@emotion/react', 'i18next', 'react-i18next'],
    }),
  ],
  server: {
    port: 3001, // 👈 remote chạy ở cổng 5001
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
     rollupOptions: {
        cache: false,
      },
  },
  preview: {
    port: 3006,
    strictPort: true,
    cors: true,
  },
});
