const path = require('path');
require('dotenv').config({ path: './.env' });
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  devtool: 'eval-source-map',
  watch: true,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: 'file-loader',
    },
    // {
    //   browser: {
    //     fs: false,
    //   },
    // },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      }],
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  plugins:[
    new webpack.DefinePlugin({
        process: {env: {}}
    })
  ],
};
