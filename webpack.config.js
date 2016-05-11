var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/angular-leaflet.js",
        libraryTarget: 'umd',
        library: ['angular-leaflet-light']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
               test: path.join(__dirname, 'src'),
               loader: 'babel-loader',
               query: {
                   presets: ['es2015']
               }
            }
        ]
    },
    externals: {
        'angular': 'angular',
        'leaflet': 'L'
    },
    devServer: {
        contentBase: __dirname,
        //hot: true,
        inline: true,
        progress: true,
        color: true

    },
};