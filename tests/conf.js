module.exports = {
    basePath : '',
    preprocessors: {
        'dist/bundle.js': 'coverage'
    },
    files : [
        // libraries
        {pattern: '../node_modules/angular/angular.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/leaflet/dist/leaflet.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/angular-mocks/angular-mocks.js', watched: false, included: true, served: true},
        {pattern: '../node_modules/ng-describe/dist/ng-describe.js', watched: false, included: true, served: true},

        {pattern: '../dist/angular-leaflet.js', watched: true, included: true, nocache: true},
        {pattern: 'unit/*.js', watched: true, included: true, nocache: true}
    ],
    exclude : [
    ],
    autoWatch : true,
    frameworks: ['jasmine'],
    reporters: ['dots', 'coverage'],
    logLevel: 'LOG_DEBUG'
}