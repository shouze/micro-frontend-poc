import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import webcomponentPlugin from './src/plugins/webComponentPlugin';
import injectShadowRootPlugin from './src/plugins/injectShadowRoot';
import createWebComponentPreviewPlugin from './src/plugins/createWebComponentPreviewPlugin';

const PORTS = {
  dev: 4173,
  preview: 4173
} as const;
const webComponentName = 'TaskWebComponent';
const getWebComponentTemplate = (mode: string) => {
  const port = mode === 'preview' ? PORTS.preview : PORTS.dev;
  return `<task-web-component 
    route-basename="/" 
    api-baseurl="http://localhost:${port}/api" 
    loading-delay="600"
  ></task-web-component>`;
};
const script = `/src/${webComponentName}.tsx`;

const getWebComponentConfig = (command: string): Partial<UserConfig> => {
  const mode = command === 'build' ? 'preview' : 'dev';
  const webComponent = getWebComponentTemplate(mode);
  return {
    plugins: [
      webcomponentPlugin({ script, webComponent }),
      injectShadowRootPlugin(),
      createWebComponentPreviewPlugin({ webComponentName, webComponent })
    ],
    build: {
      lib: {
        entry: script,
        formats: ['es']
      },
      minify: 'esbuild',
      sourcemap: true,
      manifest: 'manifest.wc.json',
      rollupOptions: {
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash].[ext]',
          inlineDynamicImports: false,
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'mui-vendor': ['@mui/material'],
            markdown: ['react-markdown', 'rehype-highlight', 'remark-gfm']
          }
        }
      }
    }
  };
};

const getReactConfig = (): Partial<UserConfig> => ({
  plugins: [react(), injectShadowRootPlugin()]
});

export default defineConfig(({ mode, command, server }) => ({
  plugins:
    mode === 'web-component'
      ? getWebComponentConfig(command, server).plugins
      : getReactConfig().plugins,
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }
  },
  build: mode === 'web-component' ? getWebComponentConfig(command, server).build : undefined,
  server: {
    open: false
  }
}));
