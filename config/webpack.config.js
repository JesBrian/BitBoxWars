const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        game: ['core-js/modules/es.array.iterator', '@iro/wechat-adapter', path.resolve(__dirname, '../src/game.js')],
    },

    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js'
    },

    resolve: {
        alias: {
            // '@': path.resolve('.')
        }
    },

    devtool: isProd ? false : 'source-map',

    stats: 'errors-only',

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(vert|frag)$/,
                use: ['raw-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new webpack.ProvidePlugin({
            PIXI: 'pixi.js',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/project.config.json', to: 'project.config.json'},
                {from: 'src/game.json', to: 'game.json'},
                {from: 'src/static', to: 'static'},
                {from: 'src/modules', to: 'modules'}
            ]
        })
    ],

    mode: isProd ? 'production' : 'development'
};
