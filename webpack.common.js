const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/js/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss)$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [require('autoprefixer')]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Dashboard | Story App',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/views/index.html')
        }),
        new HtmlWebpackPlugin({
            title: 'Add Story | Story App',
            filename: 'stories/add.html',
            template: path.resolve(__dirname, 'src/views/stories/add.html')
        }),
        new HtmlWebpackPlugin({
            title: 'About | Story App',
            filename: 'about.html',
            template: path.resolve(__dirname, 'src/views/about.html')
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    to: path.resolve(__dirname, 'dist/')
                }
            ]
        }),

        new CleanWebpackPlugin()
    ]
};