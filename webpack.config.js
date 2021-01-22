const path = require('path')
module.exports = {
  entry: `./src/index.tsx`,
  externals: {
    react: 'react',
    '@builder.io/sdk': '@builder.io/sdk'
  },
  output: {
    filename: 'builderio-templated-preview-url.system.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1268,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
