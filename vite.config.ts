import reactPlugin from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Forzamos el tipo a una función que recibe opcionalmente un objeto y retorna un Plugin.
const typedReactPlugin = reactPlugin as unknown as (options?: object) => Plugin;

export default defineConfig({
  plugins: [typedReactPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
