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

export default LeafletService;