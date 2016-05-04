module.exports = function(config){
    config.set({
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

            /* DOESN T work because we need to build the app so use built.js instead
            'src/app.js',
            'src/d3gauge/*.js',
            'src/framework/*.js',
            'src/openbase/*.js',
            'src/achats/*.js',
            'src/fluid/*.js',
            'src/openstc/*.js',
            'src/openresa/*.js',
            'src/parcauto/*.js',
            'src/patrimoine/*.js',*/
            {pattern: '../dist/bundle.js', watched: true, included: true, nocache: true},
            {pattern: 'unit/*.js', watched: true, included: true, nocache: true}
        ],
        exclude : [
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        reporters: ['dots', 'coverage'],
        logLevel: 'LOG_DEBUG'
    });
};
