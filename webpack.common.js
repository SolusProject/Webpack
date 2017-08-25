const path = require('path');
const webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


var x = {
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
                "test": /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                "use" : 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                "test": /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                "use": 'file-loader'
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

        }),
        new HtmlWebpackPlugin({
            "template" : path.join(__dirname, "index.ejs"),
            "filename" : path.join(__dirname, "index.html"),
            "inject" : false,
            "chunks": ["vendor", "main"],
            "heads": ["vendor"],
            "bodys" : ["main"],
            "styles" : [path.join("dist", "css", "bundle.css")],
            "hash" : true,
            "minify" : {
                collapseWhitespace : true,
                removeComments : true
            }
            // excludeChunks
        }),
        // devserver html file
        new HtmlWebpackPlugin({
            "template" : path.join(__dirname, "index.ejs"),
            "filename" : path.join(__dirname, "dist", "index.html"),
            "chunks": ["vendor", "main"],
            "heads": ["vendor"],
            "bodys" : ["main"],
            "styles" : [path.join("dist", "css", "bundle.css")],
            "hash" : true,
            "minify" : {
                collapseWhitespace : true,
                removeComments : true
            }
            // excludeChunks
        })
    ]
};

console.log(HtmlWebpackPlugin.files);

module.exports = x;
