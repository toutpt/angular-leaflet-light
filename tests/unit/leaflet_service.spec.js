'use strict';
/*global ngDescribe:false */
/*global it:false */
/*global expect:false */


ngDescribe({
    modules: 'angular-leaflet.service.leaflet',
    inject: ['leafletService'],
    mocks: {
    },
    tests: function (deps) {
        it('should have default settings', function() {
            var settings = deps.leafletService.settings;
            expect(settings.center.zoom).toBe(12);
        });

    }

});