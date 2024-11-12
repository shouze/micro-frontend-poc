import { Plugin } from 'vite';
import { readFileSync } from 'fs';
import path from "path";

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

function createWebComponentPreviewPlugin(pluginOption: Options): Plugin {
    return {
      name: 'create-webcomponent-preview-html',
      generateBundle(options, bundle) {
        const mainEntry = Object.entries(bundle).find(([name]) => 
          name.startsWith(pluginOption.webComponentName) && name.endsWith('.js')
        );
        
        if (!mainEntry) return;
  
        const [fileName] = mainEntry;
  
        const filePath = path.join(__dirname, "preview.html.tpl");

        const template = readFileSync(filePath, 'utf-8');
        
        const html = template
            .replace('{{scriptPath}}', `/${fileName}`)
            .replace('{{webComponent}}', pluginOption.webComponent);
            ;
  
        this.emitFile({
          type: 'asset',
          fileName: 'index.html',
          source: html
        });
      }
    };
  }

export default createWebComponentPreviewPlugin;