import 'leaflet';
import leafletCtrl from './leaflet_controller';


var module = angular.module('angular-leaflet.component.leaflet', []);

var component = module.component('leaflet', {
    template: '<div></div>',
    controller: leafletCtrl,
    bindings: {
        onMapInitialized: '&'
    }
});



export {
    module,
    component
};
