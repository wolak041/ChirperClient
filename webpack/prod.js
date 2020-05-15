const path = require('path');
const merge = require('webpack-merge');
const common = require('./common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin({ analyzerMode: 'static' })],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: path.resolve(__dirname, '../.build_cache/terser'),
          exclude: [path.resolve(__dirname, '../node_modules')],
          parallel: true,
          terserOptions: {
            ecma: 6,
            compress: true,
            output: {
              comments: false,
              beautify: false,
            },
          },
        }),
      ],
    },
  });
};
