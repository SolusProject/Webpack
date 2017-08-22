const path = require('path');
const webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    "devtool" : "#eval",
    // tells where to look for the entry files
    "context" : path.resolve(__dirname, "src"),
    // entry point for the file that starts everything
    "entry" : {
        "main" : "./main.js",
        "vendor" : ["vue", "bootstrap-loader", "lodash"]
    },
    // path to the file which will be loaded in browser
    "output" : {
        "path" : path.resolve(__dirname, "dist"),
        "filename" : "[name].bundle.js",
    },
    "module" : {
        "rules" : [
            {
                "test" : /\.(js|html)$/,
                "exclude" : /node_modules/,
                "loader" : "babel-loader"
            },
            {
                "test": /\.vue$/,
                "exclude" : /node_modules/,
                "loader": 'vue-loader',
                "options" : {
                    vue : {
                        loaders : {
                            js : 'babel?presets["env"]'
                        }
                    }
                }
            },
            {
                "test": /\.(woff2?|svg)$/,
                "loader" : 'url-loader?limit=10000'
            },
            {
                "test": /\.(ttf|eot)$/,
                "loader": 'file-loader'
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
        new CommonsChunkPlugin({"name" : "vendor"}),
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
             "Vue" : "vue"

        })
    ]
};
