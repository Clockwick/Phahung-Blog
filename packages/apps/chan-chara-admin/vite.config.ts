import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), eslintPlugin({ cache: false }), reactRefresh()],
  server: { host: true },
});
