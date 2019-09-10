const path = require('path');
module.exports = {
    entry: {
        app: './Task12/src/js/index.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './Task12/dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }]
    },
};