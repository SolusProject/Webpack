const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
                "use" : ["style-loader", "css-loader", "sass-loader", "less-loader"]
            },
            {
                "test" : /.(png|jpe?g|gif)$/i,
                "use": {
                    "loader" : 'file-loader',
                    "options" : {
                        "name" : "[hash:12].[ext]",
                        "outputPath" : "images/",
                        //"publicPath" : "../../../dist/"
                    }
                }
            },
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
        new webpack.NamedModulesPlugin(),
        // devserver html file
        new HtmlWebpackPlugin({
            "template" : path.join(__dirname, "index.ejs"),
            "filename" : path.join(__dirname, "dist", "index.html"),
            "chunks": ["main", "vendor", "bootstrap"],
            "heads": ["vendor", "bootstrap"],
            "bodys" : ["main"],
            "inject" : false,
            //"styles" : [path.join("css", "bundle.css")],
            "hash" : true,
            "minify" : {
                collapseWhitespace : true,
                removeComments : true
            }
            // excludeChunks
        })
    ]
});
