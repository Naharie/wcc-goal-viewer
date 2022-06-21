const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const development = {
    mode: "development",

    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },

    devtool: "inline-source-map",

    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        }),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.json"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};

const production = {
    mode: "production",

    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: "./public/robots.txt", to: "robots.txt" },

                { from: "./public/manifest.json", to: "manifest.json" },
                { from: "./public/favicon.ico", to: "favicon.ico" },
                { from: "./public/logo512.png", to: "logo512.png" },
                { from: "./public/logo192.png", to: "logo192.png" },

                { from: "./public/data.json", to: "data.json" },
                { from: "./public/data.schema.json", to: "data.schema.json" },
            ]
        }),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.json"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};

module.exports = [ development, production ];