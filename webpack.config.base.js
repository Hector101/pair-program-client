const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const publicFolder = `${__dirname}/client/assets`;

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'client/src/app.js'),
  ],
  output: {
    path: publicFolder,
    filename: './js/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            postcss: {
              useConfigFile: false,
              plugins: [require('postcss-cssnext')()],
            }
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: publicFolder,
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg|otf)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: './css/main.css',
      disable: false,
      allChunks: true,
    })
  ]

}