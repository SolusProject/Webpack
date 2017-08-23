const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = Merge(CommonConfig, {
    "devtool" : "#eval",
    "devServer" : {
        "contentBase" : path.resolve(__dirname),
        "compress" : true,
        "stats" : "minimal",
        "open" : true,
        "port" : 9000
    },
    "plugins"  : [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('dev')}})
    ]
});
