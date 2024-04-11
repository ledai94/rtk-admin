import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";

export default defineConfig({
  plugins: [react(), mockDevServerPlugin()],

  server: {
    // The proxy prefix needs to be configured in proxy so that mock-dev-server will intercept and mock
    // For more configurations, please refer to https://github.com/pengzhanbo/vite-plugin-mock-dev-server/blob/main/example/vite.config.ts
    proxy: {
      "^/api": {
        target: "",
      },
    },
  },
});
