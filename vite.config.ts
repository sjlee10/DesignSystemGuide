import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? "/DesignSystemGuide/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // 외부 접속 허용 (0.0.0.0)
    port: 5174, // 포트 5174 고정
  },
}))
