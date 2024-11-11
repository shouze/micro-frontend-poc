import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    lib: mode === 'web-component' ? {
      entry: 'src/TaskWebComponent.tsx',
      formats: ['es'],
      fileName: 'task-web-component',
    } : undefined,
  },
}));