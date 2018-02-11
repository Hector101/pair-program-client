const webpack = require('webpack');
const base = require('./webpack.config.base');
const Dotenv = require('dotenv-webpack');

const dotenv = new Dotenv({
  path: './.env',
  safe: false
});


module.exports = {
  ...base,
  ...base.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/
  }),
  ...base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    dotenv
  ),
  devServer: {
    contentBase: './client/assets',
    port: 8080,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
};
