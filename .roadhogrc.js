const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),
  path.resolve(__dirname, './src/assets'),
];



export default {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
      ],
      "svgSpriteLoaderDirs": svgSpriteDirs
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
      ],
      "svgSpriteLoaderDirs": svgSpriteDirs
    }
  },
  "proxy": {
    "/api": {
      "target": "http://127.0.0.1:3000/",
      "changeOrigin": true,
    }
  },
  "svgSpriteLoaderDirs": svgSpriteDirs
};
