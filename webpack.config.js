const path = require('path');
const SRC = path.resolve(__dirname, 'node_modules');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = "development";
let target = "web";
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), 
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),    
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
} 
if(process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
    mode: mode,
    target: target,
    
    entry: "./src/index.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[hash][ext][query]",
    },

    module: {
        rules: [

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, 
                        options: { publicPath: ""},
                    },
                    "css-loader", 
                    "postcss-loader", 
                    "sass-loader",
                ],
            },
            {
                test: /\.mp3$/i,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: './assets/audio/',
                },
            },
            {
                test: /\.ts[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ]
    },

    plugins: plugins,

    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },

    devtool: "source-map",

    devServer: {
        contentBase: "./dist",
        hot: true,
        historyApiFallback: true,
        public: 'http://localhost:8080',
        open: true,
    },
}