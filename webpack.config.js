const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client', 'dist')
    },
    devtool: 'eval-source-map',
    watch: true,
    module: {
        rules:[{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            }
        }]
    }
}