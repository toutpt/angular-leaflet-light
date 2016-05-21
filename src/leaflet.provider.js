import LeafletService from './leaflet.service';

function provider() {
    var defaultSettings = {
        tiles: {
            url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            options: {
                attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
    this.$get.$inject = ['$compile'];
}

export default provider;
