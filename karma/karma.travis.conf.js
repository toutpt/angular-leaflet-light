var conf = require('./conf');

module.exports = function(config){
    conf.browsers = ['PhantomJS'];
    conf.reporters.push('coverage');
    conf.preprocessors['../src/*.js'].push('coverage');
    config.singleRun = true;
    conf.coverageReporter.type = 'lcov';
    config.set(conf);
};
