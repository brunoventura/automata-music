const webpack = require('webpack');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: './src/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['latest']
            }
        }]
    }
};
