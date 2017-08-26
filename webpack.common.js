const path = require('path');
const webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


var x = {
    "devtool" : "#eval",
    "context" : path.resolve(__dirname, "src"),
    "entry" : {
        "main" : "./main.js",
        "vendor" : ["vue", "lodash"],
    },
    "output" : {
        "path" : path.resolve(__dirname, "dist"),
        "filename" : "[name].bundle.js",
    },
    "module" : {
        "rules" : [
            {
                "test" : /\.(js|html)$/,
                "exclude" : /node_modules/,
                "use" : "babel-loader"
            },
            {
                "test": /\.vue$/,
                "exclude" : /node_modules/,
                "use": {
                    "loader" : 'vue-loader',
                    "options" : {
                        "vue" : {
                            "loaders" : {
                                "js" : 'babel?presets["env"]'
                            }
                        }
                    }
                }
            },
            {
                "test": /\.svg$/,
                "use": 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
            },
            {
                "test": /\.woff$/,
                "use": 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                "test": /\.woff2$/,
                "use": 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
            },
            {
                "test": /\.[ot]tf$/,
                "use": 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                "test": /\.eot$/,
                "use": 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
            },
            {
                "test" : /.(png|jpe?g|gif)$/i,
                "use": [
                    //'file-loader?name=[hash:12].[ext]&outputPath=Images/&publicPath=Images/',
                    'file-loader?name=[hash:12].[ext]&outputPath=images/&publicPath=../',
                    'image-webpack-loader'
                ]
            }
        ],
    },
    "resolve" : {
        "modules" : [
            path.resolve("/.src"),
            path.resolve("./node_modules")
        ],
        "alias" : {
            "vue$" : "vue/dist/vue.esm.js",
        }
    },
    "plugins" : [
        new CommonsChunkPlugin({"name" : "vendor", "chunks": ["vendor"]}),
        new CommonsChunkPlugin({"name" : "bootstrap", "chunks": ["bootstrap"]}),
        new LodashModuleReplacementPlugin({
            'shorthands': true,
            'collections': true,
            'paths': true
        }),
        new webpack.ProvidePlugin({
             $: "jquery",
             jQuery: "jquery",
             "window.jQuery": "jquery",
             _ : "lodash",
             //"Vue" : "vue"

        })
    ]
};


module.exports = x;
