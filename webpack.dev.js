const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

module.exports = Merge(CommonConfig, {
    "devtool" : "#eval",
    "entry" : {
        "bootstrap" : bootstrapEntryPoints.dev
    },
    "module"  : {
        "rules" : [
            {
                "test" : /\.(css|scss)$/,
                "exclude" : /node_modules/,
                "use" : ExtractTextPlugin.extract({
                    "fallback" : "style-loader",
                    "use" : ["css-loader", "sass-loader"],
                    //"publicPath" : path.join(__dirname, "dist")
                })
            }
        ]
    },
    "plugins"  : [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('dev')}}),
        new ExtractTextPlugin({
            "filename" : path.join("bundle.css"),
            "disable" : false,
            "allChunks" : true
        }),
    ]
});
