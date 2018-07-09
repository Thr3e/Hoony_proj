const webpack            = require('webpack');
const html               = require('./wbp.html.config');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const OptimizeCssAssets  = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const purifyCSS          = require('purifycss-webpack')



exports.config = [
    ...html.config,
    new cleanWebpackPlugin([
        "./dist"
    ]),
    new webpack.BannerPlugin('Team_Six~'),
    new ExtractTextPlugin('static/css/[name]-[hash:5].min.css'),
    // CSS压缩
    new OptimizeCssAssets({
        assetNameRegExp: /\.css$/g, 
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: { removeAll: false },
            safe: false,
            autoprefixer: false
        },
        canPrint: true
    }),
    new CopyWebpackPlugin([
        {
            from:'./src/data',
            to: './static/data'
        }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        $:"jquery"
    })
]