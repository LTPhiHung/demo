import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
 

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    globals: true, // Tùy chọn: cho phép sử dụng các hàm global như describe, it, expect
    environment: 'jsdom', // Sử dụng môi trường jsdom để giả lập DOM
    setupFiles: './src/setupTests.ts', // Đường dẫn tới file setup (sẽ tạo ở bước tiếp theo)
    css: true, // Tùy chọn: Xử lý CSS (nếu component của bạn import CSS)
  },
})