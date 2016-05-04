var module = angular.module('angular-leaflet.service.leaflet', []);

var factory = module.provider('leafletService', provider);


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
    this.$get = function service($compile) {
        'ngInject';
        var service = {};
        service.settings = defaultSettings;
        for (var pp in this.settings) {
            service.settings[pp] = this.settings[pp];
        }
        //set default
        service.data = {};
        service.center = function (data, mapSettings) {
            if (data.lat && data.long) {
                mapSettings.center.lat = data.lat;
                mapSettings.center.lng = data.long;
            }
        };
        service.addCenterMarker = function (container) {
            if (!container.markers) {
                container.markers = {};
            }
            container.markers.center = angular.copy(container.center);
            container.markers.center.focus = true;
            container.markers.center.draggable = true;
        };
        service.deleteCenterMarker = function (container) {
            if (!container.markers) {
                container.markers = {};
            }
            delete container.markers.center;
        };
        service.getMarkerFromPoint = function (point) {
            var data = point;
            if (typeof point === 'string') {
                data = JSON.parse(point);
            }
            return L.marker([data.coordinates[1], data.coordinates[0]]);
        };
        service.getPanelHTML = function (proxy, scope) {
            let message = '<div><swif-panel ng-model="proxy"></swif-panel></div>';
            let nscope = angular.extend(scope, {
                proxy: proxy
            });
            return $compile(message)(nscope)[0];
        };
        return service;
    };
}

export {
    module
};
