module.exports = {
    basePath : '',
    preprocessors: {
      '../dist/angular-leaflet.js': ['coverage']
    },
    files : [
        // libraries
        {pattern: '../node_modules/angular/angular.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/leaflet/dist/leaflet.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/angular-mocks/angular-mocks.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/ng-describe/dist/ng-describe.js', watched: false, included: true, served: true},

        '../dist/angular-leaflet.js',
        {pattern: '../src/*.spec.js', watched: true, included: true, nocache: true}
    ],
    exclude : [],
    autoWatch : true,
    frameworks: ['jasmine'],
    reporters: ['dots', 'coverage'],
    coverageReporter: {
        dir: '../coverage/'
    },
    logLevel: 'LOG_DEBUG'
};
