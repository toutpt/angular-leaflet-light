/**
 * Class LeafletCtrl
 * This is the controller of the leaflet directive
 */
class LeafletCtrl {
    /**
     * LeafletCtrl constructor
     * @constructor
     * @param {Object} $element angular $element
     * @param {Object} leafletService local service
     */
    constructor($element, leafletService) {
        this.$element = $element;
        this.leafletService = leafletService;
    }
    $onInit() {
        this.mapid = this.$element.attr('id') || 'map';
        this.$element.removeAttr('id');
        var div = this.$element.find('div');
        div.attr('id', this.mapid);
        div.attr('id', this.mapid);
        div.attr('style', this.$element.attr('style'));
        div.attr('class', this.$element.attr('class'));
    }
    $postLink() {
        if (!L.Icon.Default.imagePath && leafletService.settings.imagePath) {
            L.Icon.Default.imagePath = leafletService.settings.imagePath;
        }
        var map = L.map(this.mapid);
        this.leafletService.data[this.mapid] = map;
        this.leafletService.updateMapFromSettings(map);
        this.onMapInitialized({map: map});
    }
}

LeafletCtrl.$inject = ['$element', 'leafletService'];
export default LeafletCtrl;