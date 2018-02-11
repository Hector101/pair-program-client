const webpack = require('webpack');
const UglifyJsWebpackPlugin  = require('uglifyjs-webpack-plugin');
const base = require('./webpack.config.base');


module.exports = {
  ...base,
  ...base.plugins.push(
    new UglifyJsWebpackPlugin({
      cache: true,
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID)
      },
    })
  )
};
