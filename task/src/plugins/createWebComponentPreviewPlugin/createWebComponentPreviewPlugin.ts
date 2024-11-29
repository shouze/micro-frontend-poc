import { Plugin, ViteDevServer } from 'vite';
import { readFileSync } from 'fs';
import path from 'path';

type Options = {
  /**
   * Name of the web component entry name. Eg: CalendarWebComponent
   */
  webComponentName: string;

  /**
   * Web component to inject Eg: <calendar-web-component attribute1="val1" attribute2="val2"></calendar-web-component>
   */
  webComponent: string;
};

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

function createWebComponentPreviewPlugin(pluginOption: Options): Plugin {
  return {
    name: 'create-webcomponent-preview-html',

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

        const manifest = generateDevManifest(pluginOption.webComponentName);
        res.end(JSON.stringify(manifest, null, 2));
      });
    },

    generateBundle(options, bundle) {
      const mainEntry = Object.entries(bundle).find(
        ([name]) => name.startsWith(pluginOption.webComponentName) && name.endsWith('.js')
      );

      if (!mainEntry) return;

      const [fileName] = mainEntry;
      const filePath = path.join(__dirname, 'preview.html.tpl');
      const template = readFileSync(filePath, 'utf-8');

      const html = template
        .replace('{{scriptPath}}', `/${fileName}`)
        .replace('{{webComponent}}', pluginOption.webComponent);

      this.emitFile({
        type: 'asset',
        fileName: 'index.html',
        source: html
      });
    }
  };
}

export default createWebComponentPreviewPlugin;