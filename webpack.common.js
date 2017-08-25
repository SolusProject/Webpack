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
        //"bootstrap-loader"
        "vendor" : ["vue", "lodash"],
        //"bootstrap" : ["bootstrap-loader"]
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
                "use" : 'url-loader?limit=10000&mimetype=application/font-woff&name=Fonts/[hash:12].[ext]'
            },
            {
                "test" : /.(png|jpe?g|gif)$/i,
                "use": [
                    //'file-loader?name=[hash:12].[ext]&outputPath=Images/&publicPath=Images/',
                    'file-loader?name=Images/[hash:12].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                "test" : /.(eot|svg|ttf)$/,
                "use": 'file-loader?name=Fonts/[hash:12].[ext]'
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
             "Vue" : "vue"

        }),
        new HtmlWebpackPlugin({
            "template" : path.join(__dirname, "index.ejs"),
            "filename" : path.join(__dirname, "index.html"),
            "inject" : false,
            "chunks": ["main", "vendor", "bootstrap"],
            "heads": ["vendor", "bootstrap"],
            "bodys" : ["main"],
            "styles" : [path.join("dist", "bundle.css")],
            "hash" : true,
            // "minify" : {
            //     collapseWhitespace : true,
            //     removeComments : true
            // }
            // excludeChunks
        }),
        // devserver html file
        new HtmlWebpackPlugin({
            "template" : path.join(__dirname, "index.ejs"),
            "filename" : path.join(__dirname, "dist", "index.html"),
            "chunks": ["main", "vendor", "bootstrap"],
            "heads": ["vendor", "bootstrap"],
            "bodys" : ["main"],
            "styles" : [path.join("dist", "bundle.css")],
            "hash" : true,
            // "minify" : {
            //     collapseWhitespace : true,
            //     removeComments : true
            // }
            // excludeChunks
        })
    ]
};

//console.log(htmlWebpackPlugin.files);

module.exports = x;
