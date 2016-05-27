/**
 * Class LeafletService which provide API 
 * to let leaflet work well with AngularJS
 * You can pass settings throw the provider
 */
class LeafletService {
    /**
     * LeafletService constructor
     * @constructor
     * @param  {Object} $compile angular $compile
     */
    constructor($complie){
        this.settings = {};
        this.data = {};
    }

    /**
     * handle events
     * @description integrate Leaflet map.on function with angular
     * most of the work consist to call scope.$apply only if needed
     * @param {String} event the name of the event to listen like 'click'
     * You will find all supported event on the http://leafletjs.com/reference.html#
     * @param {function} callback the function to call when this event happens
     * @param {Object} leafletObject the object that has '.on' function
     * @param {Ojbect} scope the scope of your current controller/directive/component
    */
    on(event, callback, lobj, scope) {
        lobj.on(event, function (e) {
            callback(e);
            if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                scope.$apply();
            }
        });
        scope.$on('$destroy', function () {
            lobj.off(event, callback);
        });
    }

    /**
     * @description integrate Leaflet map.on function with angular
     * most of the work consist to call scope.$apply only if needed.
     * @example
     var settings = {
        center: {
            lat: 47.21117290969667,
            lng: -1.5569686889648438,
            zoom: 12
        },
        tiles: {
            url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            options: {
                attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }
        },
        layers: {
            baselayers: {
                layerid: {}
            },
            overlays: {
                overlayid: {}
            }
        }
     };
     * @param {Object} map the leaflet map object update
     * @param {Object} settings
    */
    updateMapFromSettings(map, settings) {
        var s = settings || this.settings;
        if (s.center) {
            map.setView([s.center.lat, s.center.lng], s.center.zoom);
        }
        if (s.tiles) {
            L.tileLayer(s.tiles.url, s.tiles.options).addTo(map);
        }
        if (s.layers) {
            var baselayers = {};
            var overlays = {};
            if (s.layers.baselayers) {
                for (let layerid in s.layers.baselayers) {
                    let layer = s.layers.baselayers[layerid];
                    baselayers[layer.name] = L.tileLayer(layer.url, layer.options);
                }
            }
            if (s.layers.overlays) {
                for (let layerid in s.layers.overlays) {
                    let layer = s.layers.overlays[layerid];
                    overlays[layer.name] = L.tileLayer(layer.url, layer.options);
                }
            }
            L.control.layers(baselayers, overlays).addTo(map);
        }
    }
}
LeafletService.$inject = ['$compile'];
export default LeafletService;