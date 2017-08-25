const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge(CommonConfig, {
    "devtool" : "#eval",
    "module"  : {
        "rules" : [
            {
                "test" : /\.(css|scss)$/,
                "exclude" : /node_modules|dist/,
                "use" : ExtractTextPlugin.extract({
                    "fallback" : "style-loader",
                    "use" : ["css-loader", "sass-loader"],
                    "publicPath" : path.join(__dirname, "dist")
                })
            }
        ]
    },
    "plugins"  : [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('dev')}}),
        new ExtractTextPlugin({
            "filename" : path.join("css", "bundle.css"),
            "disable" : false,
            "allChunks" : true
        }),
    ]
});
