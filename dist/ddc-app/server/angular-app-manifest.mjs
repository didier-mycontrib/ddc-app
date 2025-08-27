
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '.',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-4KBXMVGR.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 23611, hash: 'aceec95fd4cd4176bbfd5ba76d668c0e1db0a3fc693aaaf72848a34468978b1a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17185, hash: '1b2e99b20b90355c54f8064f7465c93d14bd54d27715aee8078a7044a5af3680', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
