var module = angular.module('angular-leaflet.service.leaflet', []);

var factory = module.provider('leafletService', provider);

function LeafletService($compile) {
    'ngInject';
    this.settings = {};
    this.data = {};
    this.on = function(event, callback, map, scope) {
        map.on(event, function (e) {
            callback(e);
            if (!scope.$$phase) {
                scope.$apply();
            }
        });
        scope.$on('$destroy', function () {
            map.off(event, callback);
        });
    };
    this.updateMapFromSettings = function (map) {
        var s = this.settings;
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
    };

}
function provider() {
    var defaultSettings = {
        tiles: {
            url: "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
            options: {
                attribution: "&copy; Openstreetmap France | &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
                maxZoom: 19
            }
        },
        center: {
            lat: 47.21117290969667,
            lng: -1.5569686889648438,
            zoom: 12
        }
    };
    this.settings = {};
    this.$get = function factory($compile) {
        'ngInject';
        var service = new LeafletService($compile);
        service.settings = defaultSettings;
        for (var pp in this.settings) {
            service.settings[pp] = this.settings[pp];
        }
        return service;
    };
}

export {
    module
};
