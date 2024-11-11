import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import webcomponentPlugin from './src/plugins/webComponentPlugin';
import injectShadowRootPlugin from './src/plugins/injectShadowRoot';

const WEB_COMPONENT_CONFIG = {
  script: '/src/TaskWebComponent.tsx',
  webComponent: '<task-web-component route-basename="/" api-baseurl="http://localhost:5173/api"></task-web-component>'
};

const getWebComponentConfig = (): Partial<UserConfig> => ({
  plugins: [
    webcomponentPlugin(WEB_COMPONENT_CONFIG),
    injectShadowRootPlugin(),
  ],
  build: {
    lib: {
      entry: 'src/TaskWebComponent.tsx',
      formats: ['es'],
      fileName: 'task-web-component'
    },
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'markdown': ['react-markdown', 'rehype-highlight', 'remark-gfm']
        }
      }
    }
  }
});

const getReactConfig = (): Partial<UserConfig> => ({
  plugins: [
    react(),
    injectShadowRootPlugin(),
  ]
});

export default defineConfig(({ mode }) => ({
  plugins: mode === 'web-component' 
    ? getWebComponentConfig().plugins 
    : getReactConfig().plugins,
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }
  },
  build: mode === 'web-component' 
    ? getWebComponentConfig().build 
    : undefined,
  server: {
    open: true,
  }
}));