export interface RemoteManifest {
    [key: string]: {
      file: string;
      name: string;
      src?: string;
      isEntry?: boolean;
      imports?: string[];
    }
  }
  
  export interface RemoteAppConfig {
    name: string;
    routes: string[];
    manifestUrl: string;
    webComponentTag: string;
    attributes?: Record<string, string>;
  }