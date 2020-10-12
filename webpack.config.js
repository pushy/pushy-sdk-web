module.exports = {
    // Main script
    entry: './src/lib/pushy.js',
    // Output params
    output: {
        path: 'build',
        library: 'Pushy',
        publicPath: 'build/',
        filename: 'pushy-sdk.js'
    },
    module: {
        // ESLint - code linter
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|plugins/,
                loader: 'eslint'
            }
        ],
        loaders: [
            // Babel - transpiler
            {
                test: /\.js$/,
                exclude: /node_modules|plugins/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['syntax-async-functions', 'transform-regenerator'],
                    compact: true
                }
            },
            // Bundle page assets (images/fonts/svgs)
            {
                test: /\.(png|gif|jpg|jpeg|woff|woff2|eot|ttf|svg|cur)/,
                loader: 'url-loader?limit=10000&name=./assets/[hash].[ext]'
            },
            // Bundle CSS stylesheets
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    // Configuration for webpack-dev-server
    devServer: {
        port: 8000,
        inline: true,
        host: '0.0.0.0',
        historyApiFallback: true
    }
};