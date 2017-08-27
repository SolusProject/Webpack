const path = require('path');
const webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const limit = 100000;

module.exports = {
    "devtool" : "#eval",
    "context" : path.resolve(__dirname, "src"),
    "entry" : {
        "main" : "./main.js",
        "vendor" : ["vue", "lodash", "font-awesome"],
        //"font-awesome" : "./font-awesome/css/font-awesome.css"
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
                "use": {
                    "loader" : "url-loader",
                    "options" : {
                        "limit" : limit,
                        "mimetype" : "image/svg+xml",
                        "name" : "fonts/[name].[ext]"
                    }
                }
            },
            {
                "test": /\.woff$/,
                "use": {
                    "loader" : "url-loader",
                    "options" : {
                        "limit" : limit,
                        "mimetype" : "application/font-woff",
                        "name" : "fonts/[name].[ext]"
                    }
                }
            },
            {
                "test": /\.woff2$/,
                "use": {
                    "loader" : "url-loader",
                    "options" : {
                        "limit" : limit,
                        "mimetype" : "application/font-woff2",
                        "name" : "fonts/[name].[ext]"
                    }
                }
            },
            {
                "test": /\.[ot]tf$/,
                "use": {
                    "loader" : "url-loader",
                    "options" : {
                        "limit" : limit,
                        "mimetype" : "application/octet-stream",
                        "name" : "fonts/[name].[ext]"
                    }
                }
            },
            {
                "test": /\.ttf$/,
                "use": {
                    "loader" : "url-loader",
                    "options" : {
                        "limit" : limit,
                        "mimetype" : "application/octet-stream",
                        "name" : "fonts/[name].[ext]"
                    }
                }
            },
            {
                "test": /\.eot$/,
                "use": {
                    "loader" : "url-loader",
                    "options" : {
                        "limit" : limit,
                        "mimetype" : "application/vnd.ms-fontobject",
                        "name" : "fonts/[name].[ext]"
                    }
                }
            },
            {
                "test" : /.(png|jpe?g|gif)$/i,
                "use" : {
                    "loader" : 'image-webpack-loader',
                    "query" : {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                           interlaced: false,
                        },
                        optipng: {
                           optimizationLevel: 4,
                        },
                        pngquant: {
                           quality: '75-90',
                           speed: 3,
                        },
                    }
                }
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
            "font-awesome" : "font-awesome/css/font-awesome.css"
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
             _ : "lodash"
        })
    ]
};
