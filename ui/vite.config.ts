import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import builtins from 'rollup-plugin-node-builtins';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: { bigint: true },
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        builtins(),
        rollupNodePolyFill(),
      ],
    },
  },
});
