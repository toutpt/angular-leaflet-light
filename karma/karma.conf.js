var conf = require('./conf');

module.exports = function(config){
    conf.browsers = ['Chrome'];
    config.set(conf);
};
