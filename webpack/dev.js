const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'eval',
    devServer: {
      contentBase: path.join(__dirname, '/public'),
      watchContentBase: true,
      compress: true,
      stats: 'minimal',
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:3000/'
      }
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
