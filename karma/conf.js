var path = require('path');

module.exports = {
    basePath : '',
    files : [
        // libraries
        {pattern: '../node_modules/angular/angular.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/leaflet/dist/leaflet.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/angular-mocks/angular-mocks.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/ng-describe/dist/ng-describe.js', watched: false, included: true, served: true},

        '../src/index.js',
        'leaflet.controller.js',
        'leaflet.provider.js',
        'leaflet.service.js',
        {pattern: '../src/*.spec.js', watched: true, included: true},
    ],
    exclude : [],
    autoWatch : true,
    frameworks: ['jasmine'],
    reporters: ['dots'],
    coverageReporter: {
        dir: '../coverage/'
    },
    webpack: {
        resolve: {
            extensions: ["", ".js"]
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    },
    preprocessors: {
        '../src/*.js': ['webpack']
    },
    logLevel: 'LOG_DEBUG'
};
