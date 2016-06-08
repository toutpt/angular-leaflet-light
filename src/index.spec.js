'use strict';
/*global ngDescribe:false */
/*global it:false */
/*global expect:false */
/*global spyOn:false */

ngDescribe({
    modules: 'angular-leaflet',
    inject: ['leafletService'],
    element: '<leaflet></leaflet>',
    tests (deps) {
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
                url: 'http://{s}.foo.bar/{z}/{x}/{y}.png',
                options: {
                    attribution: 'hello world',
                    maxZoom: 19
                }
            };
            deps.leafletService.settings.layers = {
                foo: {
                    name: 'Foo',
                    type: 'xyz',
                    url: 'http://{s}.foo.bar/{z}/{x}/{y}.png',
                    options: {
                        attribution: 'hello world',
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
        it('should fix if initialized in hidden stuff', function () {
            spyOn(deps.leafletService, 'fixHiddenLeaflet');
            expect(deps.leafletService.fixHiddenLeaflet).not.toHaveBeenCalled();
            var controller = deps.element.isolateScope().$ctrl;
            controller.$onChanges({leafletShow: {currentValue: false}});
            expect(deps.leafletService.fixHiddenLeaflet).not.toHaveBeenCalled();
            controller.$onChanges({leafletShow: {currentValue: true}});
            expect(deps.leafletService.fixHiddenLeaflet).toHaveBeenCalled();
        });
    }

});
