/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "9822eb221092c7597b47a05022067322"
  }, {
    "url": "pwa-512x512.png",
    "revision": "9ff6ed394d7b203a500267779bd9adac"
  }, {
    "url": "pwa-192x192.png",
    "revision": "18148cc48c02666530de31906978afe5"
  }, {
    "url": "index.html",
    "revision": "3a8a557fcb2b6120a662957f4cb5c370"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "b1b2c6da786db54fe75c9c1c5bc16a8c"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/purify.es-Dzkdzyfv.js",
    "revision": null
  }, {
    "url": "assets/index.es-DZVaPCBg.js",
    "revision": null
  }, {
    "url": "assets/index-D_WmnaM4.js",
    "revision": null
  }, {
    "url": "assets/index-DMULbWtb.css",
    "revision": null
  }, {
    "url": "assets/html2canvas-sx8UfqY4.js",
    "revision": null
  }, {
    "url": "assets/aistudio/smpn16_logo_clean.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Picsart_26-11-19_21-12-26-113_5b2a76ca.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "b1b2c6da786db54fe75c9c1c5bc16a8c"
  }, {
    "url": "pwa-192x192.png",
    "revision": "18148cc48c02666530de31906978afe5"
  }, {
    "url": "pwa-512x512.png",
    "revision": "9ff6ed394d7b203a500267779bd9adac"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "9822eb221092c7597b47a05022067322"
  }, {
    "url": "assets/aistudio/smpn16_logo_clean.png",
    "revision": "43e2c350e45e75cf00ea9740feca7f24"
  }, {
    "url": "manifest.webmanifest",
    "revision": "09630880920fc0950215453061b8c033"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
