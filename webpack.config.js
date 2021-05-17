const path = require("path");

const config = require("./config.json");

module.exports = {
    mode: config.production ? "production" : "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-react"
                    ]
                }
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            ".jsx", ".js"
        ],
        modules: [
            __dirname,
            "node_modules"
        ]
    }
}