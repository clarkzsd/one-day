const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  loaders: [{
    test: /\.js$/,
    loaders: ['react-hot-loader/webpack', 'babel'],
    include: path.join(__dirname, 'src')
  }]
});
