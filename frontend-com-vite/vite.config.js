import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src/"),
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@services": `${path.resolve(__dirname, "./src/services/")}`,
    },
  },
});
