

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
        if (!L.Icon.Default.imagePath && leafletService.settings.imagePath) {
            L.Icon.Default.imagePath = leafletService.settings.imagePath;
        }
        var map = L.map($ctrl.mapid);
        leafletService.data[$ctrl.mapid] = map;
        leafletService.updateMapFromSettings(map);
        $ctrl.onMapInitialized({map: map});
    };
}

leafletCtrl.$inject = ['$element', 'leafletService'];
export default leafletCtrl;