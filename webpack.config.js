let webpack = require('webpack');
let path = require('path');
let fileSystem = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let WriteFilePlugin = require('write-file-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'browser-do-popup.js'),
    options: path.join(__dirname, 'src', 'js', 'options-browser-action.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js')
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: [
          { loader: 'babel' }
        ] 
      },
      { 
        test: /\.css$/, 
        use: [
          { loader: 'style-loader!css-loader' }
        ]
      }
    ]
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({ 
      'process.env': JSON.stringify('development') 
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'browser-do-popup.html'),
      filename: 'browser-do-popup.html',
      chunks: ['browser-do-popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options-browser-action.html'),
      filename: 'options-browser-action.html',
      chunks: ['options-browser-action']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'manifest.json',
        to: './'
      }
    ]),
  ]
};
