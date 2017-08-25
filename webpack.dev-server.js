const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = Merge(CommonConfig, {
    "devtool" : "#eval",
    "module"  : {
        "rules" : [
            {
                "test" : /\.(css|scss)$/,
                "exclude" : /node_modules/,
                "use" : ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    "devServer" : {
        "contentBase" : path.resolve(__dirname, "dist"),
        "compress" : true,
        "stats" : "minimal",
        "open" : true,
        "hot" : true,
        "port" : 9000
    },
    "plugins"  : [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('dev')}}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});
