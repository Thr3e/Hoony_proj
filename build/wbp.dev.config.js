const webpack = require('webpack');
const path    = require('path');
const Entry   = require('./wbp.entry.config')
const Plugins = require('./wbp.plugins.config.js');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    context : path.resolve(__dirname, '../'),
    entry : Entry.config,
    output : {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'static/js/[name]-[hash:5].js',
        publicPath: "http://localhost:8080/"
    },
    module:{
        rules:[
            {
            test: /\.js$/,
            exclude:/node_modules/,
            use: "babel-loader"
        },
        {
            test: /\.(css|less)$/,
            exclude: /node_modules/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        // 压缩CSS
                        minimize: true
                    }
                }, "postcss-loader", "less-loader"]
            })
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            use: {
                loader:'url-loader',
                options:{
                    name:'[name].[ext]',
                    outputPath:'static/images/'
                }
            }
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },
    plugins:Plugins.config,
    devServer:{
        contentBase:path.resolve(__dirname,'./dist'), 
        host:'localhost',
        port:8080,
        open:true,
        historyApiFallback: {
            rewrites:[
                {from: /./, to: './404.html'}
            ]
        }, 
        inline: true,
        hot: true
    },
    resolve:{
        alias:{
            'Router':path.resolve(__dirname, '../src/js/router.js'),
            'FileName':path.resolve(__dirname, './filename.config.js')
        }
    }
}