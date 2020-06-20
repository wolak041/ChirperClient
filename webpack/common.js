const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WebpackBar = require('webpackbar');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = env => {
  console.log(
    `\n🚀🚀🚀 RUNNING CHIRPER CLIENT IN ${
      env.production ? 'PRODUCTION' : 'DEVELOPMENT'
    } MODE 🚀🚀🚀\n`,
  );

  return {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].chunk.js',
      publicPath: '/',
      path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(env.API_URL),
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        favicon: path.resolve(__dirname, '../public/favicon.ico'),
      }),
      new WebpackPwaManifest({
        name: 'Chirper',
        short_name: 'Chirper',
        description: 'Social platform',
        background_color: '#092429',
        theme_color: '#000000',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          {
            src: path.resolve(__dirname, '../src/assets/images/chirpy.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            ios: true,
          },
        ],
        inject: true,
        ios: true,
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
      new WebpackBar(),
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
          exclude: [/node_modules/],
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
                outputPath: 'images/',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true,
              },
            },
          ],
          exclude: [/node_modules/],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
              },
            },
          ],
          exclude: [/node_modules/],
        },
      ],
    },
    performance: {
      hints: false,
    },
  };
};
