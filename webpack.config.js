const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const extractSass = new ExtractTextPlugin({
  filename: '[name].bundle.css'
});

module.exports = {
  entry: {
    App: './public/javascript/entry.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'dist')
  },
  module: {
    rules: [
      // javascripts
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // styles
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer()];
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [extractSass]
};
