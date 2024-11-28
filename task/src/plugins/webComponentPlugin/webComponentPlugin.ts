import path from 'path';
import fs from 'fs';
import type { ViteDevServer } from 'vite';
import { Plugin } from 'vite';

const webcomponentMiddleWare = (server: ViteDevServer, options: Options) => {
  server.middlewares.use((req, res, next) => {
    if (req.url === '/index.html') {
      const filePath = path.join(__dirname, 'wc.html.tpl');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          next(err);
        } else {
          const htmlContent = data
            .toString()
            .replace('{{script}}', options.script)
            .replace('{{webComponent}}', options.webComponent);
          res.setHeader('Content-Type', 'text/html');
          res.end(htmlContent);
        }
      });
    } else {
      next();
    }
  });
};

type Options = {
  /**
   * Name of the web component script file to load. Eg: /src/TaskWebComponent.tsx
   */
  script: string;

  /**
   * Web component to inject Eg: <task-web-component attribute1="val1" attribute2="val2"></task-web-component>
   */
  webComponent: string;
};

const webcomponentPlugin = (_options: Options): Plugin => {
  return {
    name: 'serve-web-component',
    configureServer(server: ViteDevServer) {
      return () => {
        return webcomponentMiddleWare(server, _options);
      };
    }
  };
};

export default webcomponentPlugin;
