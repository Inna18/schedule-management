const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require("terser-webpack-plugin");

let isProduction = process.env.NODE_ENV === "prod";

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_PORT || 8081
  },

  configureWebpack: (config) => {
    config.mode = isProduction ? "production" : "development";
    config.devtool = isProduction ? undefined :  "source-map";
    config.optimization = {
      minimize: isProduction,
      minimizer: isProduction ? [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: {drop_console: true, drop_debugger: true},
            output: {comments: false, beautify: false}
          }
        })
      ] : [],
      splitChunks:{
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      }
    };
  }
})
