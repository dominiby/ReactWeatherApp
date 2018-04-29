
module.exports = {
  context: __dirname,
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "app.bundle.js"
  },
  devServer: {
      port: 9000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
            { loader: 'babel-loader' }
        ],
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
            { loader: 'babel-loader' }
        ],
      }
    ]
  },
};