import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Pokemon",
        short_name: "Pokemon",
        start_url: "/",
        display: "standalone",
        description: "Pokemon App created with Abbas Zabier",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
