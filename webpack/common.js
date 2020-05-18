const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = (env) => {
  console.log(
    `\n🚀🚀🚀 RUNNING CHIRPER CLIENT IN ${
      env.production ? 'PRODUCTION' : 'DEVELOPMENT'
    } MODE 🚀🚀🚀\n`,
  );

  return {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'main.js',
      publicPath: '/',
      path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        favicon: path.resolve(__dirname, '../public/favicon.ico'),
      }),
      new WebpackBar()
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          exclude: [/node_modules/],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: !env.production,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !env.production,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'sass-loader',
          ],
          exclude: [/\.module\.s(a|c)ss$/, /node_modules/],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    performance: {
      hints: false,
    },
  };
};
