const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = Merge(CommonConfig, {
    "devtool" : "#source-map",
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
         })
    ]
});
