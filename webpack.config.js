var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'betlib.js',
    library: 'betlib',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
	test: /\.js$/,
	use: {
	  loader: 'babel-loader',
	  options: {
	    presets: ['babel-preset-es2015'],
	  },
	},
      }
    ]
  }
};
