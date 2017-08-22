const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');


module.exports = Merge(CommonConfig, {
    "devtool" : "#eval",
    "plugins"  : [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('dev')}})
    ]
});
