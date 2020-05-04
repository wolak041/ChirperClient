const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'eval',
    devServer: {
      contentBase: './public',
      watchContentBase: true,
      compress: true,
      stats: 'minimal',
      hot: true
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '../node_modules'),
          use: ['react-hot-loader/webpack'],
        },
      ],
    },
  });
}
