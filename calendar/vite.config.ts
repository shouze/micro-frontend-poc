import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import webcomponentPlugin from './src/plugins/webComponentPlugin';
import injectShadowRootPlugin from './src/plugins/injectShadowRoot';
import createWebComponentPreviewPlugin from './src/plugins/createWebComponentPreviewPlugin';

const webComponentName = 'CalendarWebComponent';
const WEB_COMPONENT_CONFIG = {
  script: `/src/${webComponentName}.tsx`,
  webComponent: '<calendar-web-component route-basename="/" loading-delay="600"></calendar-web-component>'
};

const getWebComponentConfig = (): Partial<UserConfig> => ({
  plugins: [
    webcomponentPlugin(WEB_COMPONENT_CONFIG),
    injectShadowRootPlugin(),
    createWebComponentPreviewPlugin({webComponentName, webComponent: WEB_COMPONENT_CONFIG.webComponent}),
  ],
  build: {
    lib: {
      entry: WEB_COMPONENT_CONFIG.script,
      formats: ['es'],
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