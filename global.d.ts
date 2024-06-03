
interface ImportMetaEnv {
    readonly VITE_APP_API: string;
    readonly BASE_URL: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
    // Add other properties of ImportMeta if needed
  }
  
  declare global {
    namespace NodeJS {
      interface Global {
        import: ImportMeta;
      }
    }
  }