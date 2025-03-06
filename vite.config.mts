import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from 'vite-plugin-pwa';
import vuetify from "vite-plugin-vuetify";
import VueI18nPlugin  from "@intlify/unplugin-vue-i18n/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    VueI18nPlugin ({
      // locale messages resource pre-compile option
      // https://vue-i18n.intlify.dev/guide/advanced/optimization.html
      include: path.resolve(__dirname, "./src/vuejs/locales/**"),

    }),
    VitePWA({
       registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: [ 'favicon.ico', 'logo.svg'],
      manifest: {
        name: 'Laps',
        short_name: 'Laps',
        description: 'Local Adminstration Password Solution',
        theme_color: '#ffffff',
        "icons": [
          {  "src": "windows11/SmallTile.scale-100.png", type:"image/png", "sizes": "71x71"},
          {  "src": "windows11/SmallTile.scale-125.png", type:"image/png", "sizes": "89x89"},
          {  "src": "windows11/SmallTile.scale-150.png", type:"image/png", "sizes": "107x107"},
          {  "src": "windows11/SmallTile.scale-200.png", type:"image/png", "sizes": "142x142"},
          {  "src": "windows11/SmallTile.scale-400.png", type:"image/png", "sizes": "284x284"},
          {  "src": "windows11/Square150x150Logo.scale-100.png", type:"image/png", "sizes": "150x150"},
          {  "src": "windows11/Square150x150Logo.scale-125.png", type:"image/png", "sizes": "188x188"},
          {  "src": "windows11/Square150x150Logo.scale-150.png", type:"image/png", "sizes": "225x225"},
          {  "src": "windows11/Square150x150Logo.scale-200.png", type:"image/png", "sizes": "300x300"},
          {  "src": "windows11/Square150x150Logo.scale-400.png", type:"image/png", "sizes": "600x600"},
          {  "src": "windows11/Wide310x150Logo.scale-100.png", type:"image/png", "sizes": "310x150"},
          {  "src": "windows11/Wide310x150Logo.scale-125.png", type:"image/png", "sizes": "388x188"},
          {  "src": "windows11/Wide310x150Logo.scale-150.png", type:"image/png", "sizes": "465x225"},
          {  "src": "windows11/Wide310x150Logo.scale-200.png", type:"image/png", "sizes": "620x300"},
          {  "src": "windows11/Wide310x150Logo.scale-400.png", type:"image/png", "sizes": "1240x600"},
          {  "src": "windows11/LargeTile.scale-100.png", type:"image/png", "sizes": "310x310"},
          {  "src": "windows11/LargeTile.scale-125.png", type:"image/png", "sizes": "388x388"},
          {  "src": "windows11/LargeTile.scale-150.png", type:"image/png", "sizes": "465x465"},
          {  "src": "windows11/LargeTile.scale-200.png", type:"image/png", "sizes": "620x620"},
          {  "src": "windows11/LargeTile.scale-400.png", type:"image/png", "sizes": "1240x1240"},
          {  "src": "windows11/Square44x44Logo.scale-100.png", type:"image/png", "sizes": "44x44"},
          {  "src": "windows11/Square44x44Logo.scale-125.png", type:"image/png", "sizes": "55x55"},
          {  "src": "windows11/Square44x44Logo.scale-150.png", type:"image/png", "sizes": "66x66"},
          {  "src": "windows11/Square44x44Logo.scale-200.png", type:"image/png", "sizes": "88x88"},
          {  "src": "windows11/Square44x44Logo.scale-400.png", type:"image/png", "sizes": "176x176"},
          {  "src": "windows11/StoreLogo.scale-100.png", type:"image/png", "sizes": "50x50"},
          {  "src": "windows11/StoreLogo.scale-125.png", type:"image/png", "sizes": "63x63"},
          {  "src": "windows11/StoreLogo.scale-150.png", type:"image/png", "sizes": "75x75"},
          {  "src": "windows11/StoreLogo.scale-200.png", type:"image/png", "sizes": "100x100"},
          {  "src": "windows11/StoreLogo.scale-400.png", type:"image/png", "sizes": "200x200"},
          {  "src": "windows11/SplashScreen.scale-100.png", type:"image/png", "sizes": "620x300"},
          {  "src": "windows11/SplashScreen.scale-125.png", type:"image/png", "sizes": "775x375"},
          {  "src": "windows11/SplashScreen.scale-150.png", type:"image/png", "sizes": "930x450" },
          {  "src": "windows11/SplashScreen.scale-200.png", type:"image/png", "sizes": "1240x600" },
          {  "src": "windows11/SplashScreen.scale-400.png", type:"image/png", "sizes": "2480x1200" },
          {  "src": "windows11/Square44x44Logo.targetsize-16.png", type:"image/png", "sizes": "16x16" },
          {  "src": "windows11/Square44x44Logo.targetsize-20.png", type:"image/png", "sizes": "20x20" },
          {  "src": "windows11/Square44x44Logo.targetsize-24.png", type:"image/png", "sizes": "24x24" },
          {  "src": "windows11/Square44x44Logo.targetsize-30.png", type:"image/png", "sizes": "30x30" },
          {  "src": "windows11/Square44x44Logo.targetsize-32.png", type:"image/png", "sizes": "32x32" },
          {  "src": "windows11/Square44x44Logo.targetsize-36.png", type:"image/png", "sizes": "36x36" },
          {  "src": "windows11/Square44x44Logo.targetsize-40.png", type:"image/png", "sizes": "40x40" },
          {  "src": "windows11/Square44x44Logo.targetsize-44.png", type:"image/png", "sizes": "44x44" },
          {  "src": "windows11/Square44x44Logo.targetsize-48.png", type:"image/png", "sizes": "48x48" },
          {  "src": "windows11/Square44x44Logo.targetsize-60.png", type:"image/png", "sizes": "60x60" },
          {  "src": "windows11/Square44x44Logo.targetsize-64.png", type:"image/png", "sizes": "64x64" },
          {  "src": "windows11/Square44x44Logo.targetsize-72.png", type:"image/png", "sizes": "72x72" },
          {  "src": "windows11/Square44x44Logo.targetsize-80.png", type:"image/png", "sizes": "80x80" },
          {  "src": "windows11/Square44x44Logo.targetsize-96.png", type:"image/png", "sizes": "96x96" },
          {  "src": "windows11/Square44x44Logo.targetsize-256.png", type:"image/png", "sizes": "256x256" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-16.png", type:"image/png", "sizes": "16x16" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-20.png", type:"image/png", "sizes": "20x20" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-24.png", type:"image/png", "sizes": "24x24" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-30.png", type:"image/png", "sizes": "30x30" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-32.png", type:"image/png", "sizes": "32x32" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-36.png", type:"image/png", "sizes": "36x36" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-40.png", type:"image/png", "sizes": "40x40" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-44.png", type:"image/png", "sizes": "44x44" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-48.png", type:"image/png", "sizes": "48x48" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-60.png", type:"image/png", "sizes": "60x60" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-64.png", type:"image/png", "sizes": "64x64" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-72.png", type:"image/png", "sizes": "72x72" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-80.png", type:"image/png", "sizes": "80x80" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-96.png", type:"image/png", "sizes": "96x96" },
          {  "src": "windows11/Square44x44Logo.altform-unplated_targetsize-256.png", type:"image/png", "sizes": "256x256" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png", type:"image/png", "sizes": "16x16" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png", type:"image/png", "sizes": "20x20" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png", type:"image/png", "sizes": "24x24" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png", type:"image/png", "sizes": "30x30" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png", type:"image/png", "sizes": "32x32" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png", type:"image/png", "sizes": "36x36" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png", type:"image/png", "sizes": "40x40" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png", type:"image/png", "sizes": "44x44" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png", type:"image/png", "sizes": "48x48" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png", type:"image/png", "sizes": "60x60" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png", type:"image/png", "sizes": "64x64" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png", type:"image/png", "sizes": "72x72" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png", type:"image/png", "sizes": "80x80" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png", type:"image/png", "sizes": "96x96" },
          {  "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png", type:"image/png", "sizes": "256x256" },
          {  "src": "android/android-launchericon-512-512.png", type:"image/png", "sizes": "512x512" },
          {  "src": "android/android-launchericon-192-192.png", type:"image/png", "sizes": "192x192" },
          {  "src": "android/android-launchericon-144-144.png", type:"image/png", "sizes": "144x144" },
          {  "src": "android/android-launchericon-96-96.png", type:"image/png", "sizes": "96x96" },
          {  "src": "android/android-launchericon-72-72.png", type:"image/png", "sizes": "72x72" },
          {  "src": "android/android-launchericon-48-48.png", type:"image/png", "sizes": "48x48" },
          {  "src": "ios/16.png", type:"image/png", "sizes": "16x16" },
          {  "src": "ios/20.png", type:"image/png", "sizes": "20x20" },
          {  "src": "ios/29.png", type:"image/png", "sizes": "29x29" },
          {  "src": "ios/32.png", type:"image/png", "sizes": "32x32" },
          {  "src": "ios/40.png", type:"image/png",  "sizes": "40x40" },
          {  "src": "ios/50.png", type:"image/png", "sizes": "50x50" },
          {  "src": "ios/57.png", type:"image/png", "sizes": "57x57" },
          {  "src": "ios/58.png", type:"image/png",  "sizes": "58x58" },
          {  "src": "ios/60.png", type:"image/png", "sizes": "60x60" },
          {  "src": "ios/64.png", type:"image/png",  "sizes": "64x64" },
          {  "src": "ios/72.png", type:"image/png", "sizes": "72x72" },
          {  "src": "ios/76.png", type:"image/png",  "sizes": "76x76" },
          {  "src": "ios/80.png", type:"image/png", "sizes": "80x80" },
          {  "src": "ios/87.png", type:"image/png", "sizes": "87x87" },
          {  "src": "ios/100.png", type:"image/png", "sizes": "100x100" },
          {  "src": "ios/114.png", type:"image/png", "sizes": "114x114" },
          {  "src": "ios/120.png", type:"image/png", "sizes": "120x120" },
          {  "src": "ios/128.png", type:"image/png", "sizes": "128x128" },
     //     {  "src": "ios/144.png", type:"image/png", "sizes": "144x144" },
          {  "src": "ios/152.png", type:"image/png", "sizes": "152x152" },
          {  "src": "ios/167.png", type:"image/png", "sizes": "167x167" },
          {  "src": "ios/180.png", type:"image/png", "sizes": "180x180" },
          {  "src": "ios/192.png", type:"image/png", "sizes": "192x192" },
          {  "src": "ios/256.png", type:"image/png", "sizes": "256x256" },
          {  "src": "ios/512.png", type:"image/png", "sizes": "512x512" },
          {  "src": "ios/1024.png", type:"image/png", "sizes": "1024x1024" }
        ]

      }
    }),
    splitVendorChunkPlugin(),
  ],
  build: {
    outDir: "target/dist",
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      //external: ['vue'],
      output: {
      }
    }
  },

  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/vuejs", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    host: true,
    cors: {
      origin: "+",
    },
    proxy: {
      "/api": {
        target: "https://laps.localhost",
        //target: "http://localhost:8002",
        changeOrigin: true,
        ws: true,
        xfwd: true,
        secure: false,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        configure: (proxy, _options) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
           
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(`###  URL: ${req.url}`);
            console.log(`###  ################################################## ###`);
              console.log(`# App   Request: ${req.method} ${req.url}`);
              console.log(`# Proxy Request: ${proxyReq.method} ${proxyReq.protocol}/${proxyReq.host}${proxyReq.path}`);
              console.log(`#  Header:`,  JSON.stringify(proxyReq.getHeaders()) );
              console.log(`==> Response Status :`,   _res.statusCode , " : ", _res.statusMessage);
              console.log(`==> Response Headers:`,   JSON.stringify( _res.getHeaders())  );
              //console.log(`==> Response body :`,   JSON.stringify( _res.write(console.log) ) );
            // console.log(' ');
            // console.log(`curl -k -H "Authorization: ${proxyReq.getHeader('authorization')}"  ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
            console.log(`###  ################################################## ###`);
          });
        },
      },
      "/cgi-bin": {
        target: "https://laps.localhost",
        //target: "http://localhost:8002",
        changeOrigin: true,
        ws: true,
        xfwd: true,
        secure: false,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        configure: (proxy, _options) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
           
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(`###  URL: ${req.url}`);
            console.log(`###  ################################################## ###`);
            if  (req.url == "/cgi-bin/password.ps1") {
              console.log(` --> send log to: ${req.url}`);
            } else {
              console.log(`# App   Request: ${req.method} ${req.url}`);
              console.log(`# Proxy Request: ${proxyReq.method} ${proxyReq.protocol}/${proxyReq.host}${proxyReq.path}`);
              console.log(`#  Header:`,  JSON.stringify(proxyReq.getHeaders()) );
              console.log(`==> Response Status :`,   _res.statusCode , " : ", _res.statusMessage);
              console.log(`==> Response Headers:`,   JSON.stringify( _res.getHeaders())  );
              //console.log(`==> Response body :`,   JSON.stringify( _res.write(console.log) ) );
            }
            // console.log(' ');
            // console.log(`curl -k -H "Authorization: ${proxyReq.getHeader('authorization')}"  ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
            console.log(`###  ################################################## ###`);
          });
        },
      },
    },
  },
  publicDir: "public",
});
