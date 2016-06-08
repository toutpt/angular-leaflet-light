'use strict';
/*global ngDescribe:false */
/*global it:false */
/*global expect:false */
/*global spyOn:false */


ngDescribe({
    modules: 'angular-leaflet',
    inject: ['leafletService'],
    tests (deps) {
        it('should have default settings', function() {
            var settings = deps.leafletService.settings;
            expect(settings.center.zoom).toBe(12);
            expect(settings.tiles.url).toBe('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png');
            expect(settings.tiles.options.attribution).toBe('&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
            expect(settings.tiles.options.maxZoom).toBe(19);
        });
        it('should handle leaflet events', function() {
            var service = deps.leafletService;
            var iscallbackCalled = false;
            var isApplyed = false;
            var callback = function (e) {
                iscallbackCalled = true;
            };
            var eventRegistry = {};
            var map = {
                on: function (event, callback) {
                    eventRegistry[event] = callback;
                },
                off: function (event, callback) {
                    delete eventRegistry[event];
                }
            };
            var scope = {'$on': function (event, callback) {
                eventRegistry[event] = callback;
            }, '$root': {}, '$apply': function () {
                isApplyed = true;
            }};


            expect(iscallbackCalled).toBe(false);
            expect(isApplyed).toBe(false);
            expect(eventRegistry.on).toBe();
            expect(eventRegistry.off).toBe();

            service.on('click', callback, map, scope);

            expect(iscallbackCalled).toBe(false);
            expect(isApplyed).toBe(false);
            expect(eventRegistry.click).not.toBe(callback);
            var data = {};
            eventRegistry.click(data);
            expect(iscallbackCalled).toBe(true);
            expect(isApplyed).toBe(true);


            iscallbackCalled = false;
            isApplyed = false;
            scope.$root = {'$$phase': '$apply'}; //mark that already in digest
            eventRegistry.click(data);
            expect(iscallbackCalled).toBe(true);
            expect(isApplyed).toBe(false);

            iscallbackCalled = false;
            isApplyed = false;
            scope.$root = {'$$phase': '$digest'}; //mark that already in digest
            eventRegistry.click(data);
            expect(iscallbackCalled).toBe(true);
            expect(isApplyed).toBe(false);

        });
        it('should fixHiddenLeaflet call L.utils stuff', function () {
            var map = {};
            spyOn(L.Util, 'requestAnimFrame');
            deps.leafletService.fixHiddenLeaflet(map);
            expect(L.Util.requestAnimFrame).toHaveBeenCalled();
        });

    }

});