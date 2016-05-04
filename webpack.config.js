var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: path.join(__dirname, 'src'), loader: 'babel-loader'}
        ]
    },
    externals: {
        'angular': 'angular',
        'leaflet': 'L'
    }
};