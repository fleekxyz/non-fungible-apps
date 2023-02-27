import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EslintGlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill';
import EslintModulePolyfills from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyfill from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },

      // Enable esbuild polyfill plugins
      plugins: [
        EslintGlobalsPolyfills({
          buffer: true,
          process: true,
        }),
        EslintModulePolyfills(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyfill(),
      ],
    },
  },
});
