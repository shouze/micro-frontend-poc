import type { Plugin, ViteDevServer, IndexHtmlTransformResult } from 'vite';
interface Options {
  script: string;           // eg: "/src/TaskWebComponent.tsx"
  webComponent: string;     // eg: <task-web-component ... />
  webComponentName: string; // eg: "TaskWebComponent"
}

interface ManifestEntry {
  file: string;
  src?: string;
  isEntry?: boolean;
  imports?: string[];
}

function generateDevManifest(webComponentName: string): Record<string, ManifestEntry> {
  return {
    [`src/${webComponentName}.tsx`]: {
      file: `src/${webComponentName}.tsx`,
      isEntry: true
    }
  };
}

const webComponentPlugin = (options: Options): Plugin => {
  return {
    name: 'serve-web-component',

    /**
     * 
     * @see https://vite.dev/guide/api-plugin#configureserver
     */
    configureServer(server: ViteDevServer) {
      server.middlewares.use(`/${server.config.build.manifest}`, (req, res, next) => {
        if (!req.originalUrl?.includes(server.config.build.manifest)) {
          return next();
        }
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Content-Type-Options': 'nosniff',
          'Access-Control-Allow-Origin': '*'
        });

        const manifest = generateDevManifest(options.webComponentName);
        res.end(JSON.stringify(manifest, null, 2));
      });
    },

    /** 
     * @see https://vite.dev/guide/api-plugin#transformindexhtml
     */
    transformIndexHtml(html: string): IndexHtmlTransformResult {
      const newHtml = html.replace(
        '<script type="module" src="/src/main.tsx"></script>',
        '',
      ).replace(
        '<div id="root"></div>',
        options.webComponent,
      );

      return {
        html: newHtml,
        tags: [
          {
            tag: 'script',
            injectTo: 'body',
            attrs: {
              type: 'module',
              src: options.script
            }
          }
        ]
      };
    },
  };
}

export default webComponentPlugin;