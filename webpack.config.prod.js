const webpack = require('webpack')
const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  entry: {
    index: ['./app/index.js'],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
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
        MiniCssExtractPlugin.loader, // 代替style-loader
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
          name: 'static/image/[name].[hash:8].[ext]',
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
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ],
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
    // 提示警告
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[contenthash:12].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __RUNENV__: JSON.stringify('')
    }),
    new BundleAnalyzerPlugin() // 打包分析
  ],
  resolve: {
    modules: ['node_modules', resolve(__dirname, '../node_modules')],
    extensions: ['.web.js', '.js', '.json', '.css']
  },
  devtool: 'source-map',
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
