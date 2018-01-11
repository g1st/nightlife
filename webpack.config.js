const path = require('path');

module.exports = {
  entry: './public/javascript/entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/javascript')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
