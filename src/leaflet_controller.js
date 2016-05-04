

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
        leafletService.updateMapFromSettings(leafletService.data[$ctrl.mapid]);
        $ctrl.onMapInitialized({map: leafletService.data[$ctrl.mapid]});
    };
}

export default leafletCtrl;