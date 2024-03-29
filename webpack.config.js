const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
            loader:'html-loader'
        }
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
],
  devServer: {
    static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9000,
  }
}