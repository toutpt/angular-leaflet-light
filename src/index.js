import provider from './leaflet.provider';
import controller from './leaflet.controller';

/* angular module angular-leaflet */
export default angular.module('angular-leaflet', [])

/**
 * This component provide a default leaflet map initialized with id='map'
 * if no id has been provided.
 * @usage
    <leaflet on-map-initialized="$ctrl.onMapInitialized(map)"></leaflet>
*/
.component('leaflet', {
    template: '<div></div>',
    controller: controller,
    bindings: {
        onMapInitialized: '&'
    }
})

.provider('leafletService', provider);
