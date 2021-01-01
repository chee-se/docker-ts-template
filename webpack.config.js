const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: 'dist',
    hot: true,
    liveReload: true,
    lazy: false,
    filename: 'index.ts',
    host: '0.0.0.0',
    port: 8080
  },
  //   devServer: {
  //     contentBase: 'dist',
  //     publicPath: '/',
  //     watchContentBase: true,
  //     port: 8080,
  //     hot: true,
  //     inline: true,
  //     lazy: false,
  //     open: true
  //   },
  plugins: [
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader, options: {} }, 'css-loader']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
};
