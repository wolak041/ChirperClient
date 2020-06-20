const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'eval',
    devServer: {
      host: '0.0.0.0',
      contentBase: path.join(__dirname, '/public'),
      watchContentBase: true,
      open: true,
      useLocalIp: true,
      compress: true,
      stats: 'minimal',
      hot: true,
      historyApiFallback: true,
    },
    plugins: [new webpack.NamedModulesPlugin()],
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
};
