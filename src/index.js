import provider from './leaflet.provider';
import controller from './leaflet.controller';

export default angular.module('angular-leaflet', [
]).component('leaflet', {
    template: '<div></div>',
    controller: controller,
    bindings: {
        onMapInitialized: '&'
    }
}).provider('leafletService', provider);
