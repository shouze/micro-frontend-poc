import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'web-component' && dts(),
  ].filter(Boolean),
  build: {
    lib: mode === 'web-component' ? {
      entry: 'src/TaskWebComponent.tsx',
      formats: ['es'],
      fileName: 'task-web-component',
    } : undefined,
  },
}));