const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/js/gyo.js'/*, './src/css/index.scss'*/],

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'gyobutton.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                include: [
                  path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            // {
            //     test: /\.scss$/,
            //     use:[
            //         "style-loader",
            //         "css-loader",
            //         "sass-loader"
            //     ],
            //     exclude: /node_modules/
            // }
        ]
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
};