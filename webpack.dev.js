const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = Merge(CommonConfig, {
    "devtool" : "#eval",
    "entry" : {
        "bootstrap" : bootstrapEntryPoints.dev
    },
    "module"  : {
        "rules" : [
            {
                "test" : /\.(css|scss)$/,
                //"exclude" : /node_modules/,
                "use" : ExtractTextPlugin.extract({
                    "fallback" : "style-loader",
                    "use" : ["css-loader", "sass-loader", "less-loader"],
                    //"publicPath" : path.join(__dirname, "dist")
                })
            },
            {
                "test" : /.(png|jpe?g|gif)$/i,
                "use": {
                    "loader" : 'file-loader',
                    "options" : {
                        "name" : "[hash:12].[ext]",
                        "outputPath" : "images/",
                        "publicPath" : "../../../dist/"
                    }
                }
            }
        ]
    },
    "plugins"  : [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('dev')}}),
        new ExtractTextPlugin({
            "filename" : path.join("css", "[name].css"),
            "disable" : false,
            "allChunks" : true
        }),
        new HtmlWebpackPlugin({
            "template" : path.join(__dirname, "index.ejs"),
            "filename" : path.join(__dirname, "index.html"),
            "inject" : false,
            "chunks": ["main", "vendor", "bootstrap"],
            "heads": ["vendor", "bootstrap"],
            "bodys" : ["main"],
            "styles" : [path.join("dist", "css", "main.css")],
            "hash" : true,
            "minify" : {
                collapseWhitespace : true,
                removeComments : true
            }
        }),
    ]
});
