'use strict';
/*global ngDescribe:false */
/*global it:false */
/*global expect:false */


ngDescribe({
    modules: 'angular-leaflet',
    inject: ['leafletService'],
    element: '<leaflet></leaflet>',
    tests: function (deps) {
        it('should have map', function() {
            expect(deps.element.text()).toContain('+-Leaflet | © Openstreetmap France | © OpenStreetMap');
        });
        it('should have loaded map with id=map', function() {
            var controller = deps.element.isolateScope().$ctrl;
            expect(controller.container.getAttribute('id')).toBe('map');
        });
        it('should attach map instance to the service', function () {
            var controller = deps.element.isolateScope().$ctrl;
            expect(deps.leafletService.data.map).not.toBeUndefined();
            expect(deps.leafletService.data.map._container).toBe(controller.container);
        });
        it('should have set L.Icon.Default.imagePath', function () {
            expect(L.Icon.Default.imagePath).toContain('node_modules/leaflet/dist/images');
        });
        it('should play well with leafletService.updateMapFromSettings', function () {
            deps.leafletService.settings.center = {lat: 47.143496, lng: -1.652756, zoom: 11};
            deps.leafletService.settings.minZoom = 10;
            deps.leafletService.settings.maxZoom = 15;
            deps.leafletService.settings.maxBounds = [[47.143496,-1.652756],[47.296462,-1.461868]];
            deps.leafletService.settings.tiles = {
                url: "http://{s}.foo.bar/{z}/{x}/{y}.png",
                options: {
                    attribution: "hello world",
                    maxZoom: 19
                }
            };
            deps.leafletService.settings.layers = {
                foo: {
                    name: 'Foo',
                    type: 'xyz',
                    url: 'http://{s}.foo.bar/{z}/{x}/{y}.png',
                    options: {
                        attribution: "hello world",
                        maxZoom: 19
                    }
                }
            };
            var map = deps.leafletService.data.map;
            deps.leafletService.updateMapFromSettings(map);
            expect(map.getZoom()).toBe(11);
            expect(map.options.minZoom).toBe(10);
            expect(map.options.maxZoom).toBe(15);
            
            var center = map.getCenter(); 
            expect(center.lat).toBe(47.143496);
            expect(center.lng).toBe(-1.652756);
            var maxBounds = map.options.maxBounds.toBBoxString();
            expect(maxBounds).toBe('-1.652756,47.143496,-1.461868,47.296462');
        });
    }

});
/*
describe('Unit testing leaflet component', function() {
    var $compile,
        element,
        controller,
        leafletService,
        $scope,
        $rootScope;

    // Load the module, which contains the directive
    beforeEach(angular.mock.module('angular-leaflet'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, _leafletService_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        element = $compile('<leaflet></leaflet>')($scope);
        $scope.$digest();
        controller = element.isolateScope().$ctrl;
        leafletService = _leafletService_;
    }));
    it('Display the map', function() {
        expect(element.text()).toContain('+-Leaflet | © Openstreetmap France | © OpenStreetMap');
    });
    it('should have loaded map with id=map', function() {
        expect(controller.container.getAttribute('id')).toBe('map');
    });
    it('should attach map instance to the service', function () {
        expect(leafletService.data.map).not.toBeUndefined();
        expect(leafletService.data.map._container).toBe(controller.container);
    });
    it('should have set L.Icon.Default.imagePath', function () {
        expect(L.Icon.Default.imagePath).toBe(leafletService.settings.imagePath);
    });
});*/