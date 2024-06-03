import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tsConfigPaths()
    ],
    define: {
      'process.env': JSON.stringify(process.env)
    },
    server: {
      proxy: {
        '/graphql': {
          target: env.VITE_APP_API,
          changeOrigin: true,
          rewrite: (path) => path.replace('/', ''),
        },
      },
      port:  Number(env.VITE_PORT) || 3000,
    },
  }
})