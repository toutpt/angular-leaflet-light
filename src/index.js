import provider from './leaflet.provider';
import controller from './leaflet.controller';

/* angular module angular-leaflet */
export default angular.module('angular-leaflet', [])

/**
 * This component provide a default leaflet map initialized with id='map'
 * if no id has been provided.
 * 
 * If you want to initialize you map in an hidden place (for example a tab)
 * you can use leaflet-show option and put the display condition so the component
 * will fix the leaflet map object. leaflet-show is not required.
 * @usage
    <leaflet leaflet-show="displayMap" on-map-initialized="$ctrl.onMapInitialized(map)"></leaflet>
*/
.component('leaflet', {
    template: '<div></div>',
    controller: controller,
    bindings: {
        onMapInitialized: '&',
        leafletShow: '<'
    }
})

.provider('leafletService', provider);
