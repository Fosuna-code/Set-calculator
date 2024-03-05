const path = require('path');

module.exports = {
  entry: './src/index.js',
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
        template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3006
  }
}