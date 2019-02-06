const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

// module.exports = {
//   mode: 'development',
//   entry: {
//     app: './src/index.js',
//   },
//   devtool: 'inline-source-map',
//    devServer: {
//      contentBase: './dist'
//    },
//   plugins: [
//     new CleanWebpackPlugin(['dist']),
//     new UglifyJsPlugin({sourceMap: true}),
//     new HtmlWebpackPlugin({
//       title: 'Development'
//     })
//   ],
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };