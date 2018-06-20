const webpack = require('webpack')
const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: [
      'react-hot-loader/patch',
      './app/index.js',
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'static/js/[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.(less|css)$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ]
              }),
              pxtoviewport({
                viewportWidth: 1242,
                viewportHeight: 2208,
              })
            ]
          }
        },
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'hd': '3.312px', // 6=>2px,6P=>2x124.2/75
              'brand-primary': '#282C2D',
            },
          }
        }
      ]
    }, {
      test: /\.(png|jpg|gif|ico)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'static/image/[hash:8].[ext]',
        }
      }]
    }, {
      test: /\.(svg)$/i,
      include: [
        require.resolve('antd-mobile').replace(/warn\.js$/, '')
      ],
      use: [{
        loader: 'svg-sprite-loader'
      }]
    }]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __RUNENV__: JSON.stringify('')
    })
  ],
  resolve: {
    modules: ['node_modules', resolve(__dirname, '../node_modules')],
    extensions: ['.web.js', '.js', '.json', '.css']
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3000,
    inline: true,
    hot: true,
    historyApiFallback: true,
  }
}
