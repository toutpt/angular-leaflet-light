

function leafletCtrl($element, leafletService) {
    var $ctrl = this;
    this.$onInit = function () {
        $ctrl.mapid = $element.attr('id') || 'map';
        $element.removeAttr('id');
        var div = $element.find('div');
        div.attr('id', $ctrl.mapid);
        div.attr('id', $ctrl.mapid);
        div.attr('style', $element.attr('style'));
        div.attr('class', $element.attr('class'));
    };
    this.$postLink = function () {
        L.Icon.Default.imagePath = leafletService.settings.imagePath;
        leafletService.data[$ctrl.mapid] = L.map($ctrl.mapid);
        self.updateFromSettings();
        $ctrl.onMapInitialized({map: leafletService.data[$ctrl.mapid]});
    };
    self.updateFromSettings = function() {
        var s = leafletService.settings;
        var m = leafletService.data[$ctrl.mapid];
        if (s.center) {
            m.setView([s.center.lat, s.center.lng], s.center.zoom);
        }
        if (s.tiles) {
            L.tileLayer(s.tiles.url, s.tiles.options).addTo(m);
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
            L.control.layers(baselayers, overlays).addTo(m);
        }
    };
}

export default leafletCtrl;