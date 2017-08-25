const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge(CommonConfig, {
    "devtool" : "#source-map",
    "module"  : {
        "rules" : [
            {
                "test" : /\.(css|scss)$/,
                "exclude" : /node_modules/,
                "use" : ExtractTextPlugin.extract({
                    "fallback" : "style-loader",
                    "use" : ["css-loader", "sass-loader"],
                    "publicPath" : path.join(__dirname, "dist")
                })
            }
        ]
    },

    "plugins" : [
        new CleanWebpackPlugin([CommonConfig.output.path]),
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new webpack.optimize.UglifyJsPlugin({
             "source-map" : true,
             "beautify": false,
             "mangle": {
               "screw_ie8": true,
               "keep_fnames": true
             },
             "compress": {
                 "screw_ie8": true
             },
             "comments": false
         }),
         new ExtractTextPlugin({
             "filename" : path.join("css", "bundle.css"),
             "disable" : false,
             "allChunks" : true
         }),
    ]
});
