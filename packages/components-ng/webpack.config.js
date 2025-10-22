module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'raw-loader'
        ]
      }
    ]
  }
};