module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['raw-loader'],
      },
    ],
  },
  output: {
    // 配置chunk输出路径
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].js',
    // 修复动态导入的路径问题，确保mermaid正确加载
    publicPath: '/angular-webcomponents/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 将mermaid打包成独立chunk
        mermaid: {
          test: /[\\/]node_modules[\\/]mermaid[\\/]/,
          name: 'mermaid',
          chunks: 'all',
          priority: 10,
          // 确保不会自动添加额外的路径前缀
          enforce: true,
        },
      },
    },
    runtimeChunk: 'single',
    // 确保chunk加载路径不依赖于document.currentScript
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },
  mode: 'production',
  // 配置动态导入的解析行为
  resolve: {
    alias: {
      // 确保mermaid模块路径被正确解析
      mermaid: require.resolve('mermaid'),
    },
  },
};
