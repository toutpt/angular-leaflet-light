(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angular-leaflet-light"] = factory();
	else
		root["angular-leaflet-light"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _leaflet = __webpack_require__(1);

	var _leaflet2 = _interopRequireDefault(_leaflet);

	var _leaflet3 = __webpack_require__(3);

	var _leaflet4 = _interopRequireDefault(_leaflet3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = angular.module('angular-leaflet', []).component('leaflet', {
	    template: '<div></div>',
	    controller: _leaflet4.default,
	    bindings: {
	        onMapInitialized: '&'
	    }
	}).provider('leafletService', _leaflet2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _leaflet = __webpack_require__(2);

	var _leaflet2 = _interopRequireDefault(_leaflet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	        var service = new _leaflet2.default($compile);
	        service.settings = defaultSettings;
	        for (var pp in this.settings) {
	            service.settings[pp] = this.settings[pp];
	        }
	        return service;
	    };
	}

	exports.default = provider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function LeafletService($compile) {
	    'ngInject';

	    this.settings = {};
	    this.data = {};
	    this.on = function (event, callback, map, scope) {
	        map.on(event, function (e) {
	            callback(e);
	            if (!scope.$$phase) {
	                scope.$apply();
	            }
	        });
	        scope.$on('$destroy', function () {
	            map.off(event, callback);
	        });
	    };
	    this.updateMapFromSettings = function (map) {
	        var s = this.settings;
	        if (s.center) {
	            map.setView([s.center.lat, s.center.lng], s.center.zoom);
	        }
	        if (s.tiles) {
	            L.tileLayer(s.tiles.url, s.tiles.options).addTo(map);
	        }
	        if (s.layers) {
	            var baselayers = {};
	            var overlays = {};
	            if (s.layers.baselayers) {
	                for (var layerid in s.layers.baselayers) {
	                    var layer = s.layers.baselayers[layerid];
	                    baselayers[layer.name] = L.tileLayer(layer.url, layer.options);
	                }
	            }
	            if (s.layers.overlays) {
	                for (var _layerid in s.layers.overlays) {
	                    var _layer = s.layers.overlays[_layerid];
	                    overlays[_layer.name] = L.tileLayer(_layer.url, _layer.options);
	                }
	            }
	            L.control.layers(baselayers, overlays).addTo(map);
	        }
	    };
	}

	exports.default = LeafletService;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


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
	        leafletService.data[$ctrl.mapid] = L.map($ctrl.mapid);
	        leafletService.updateMapFromSettings(leafletService.data[$ctrl.mapid]);
	        $ctrl.onMapInitialized({ map: leafletService.data[$ctrl.mapid] });
	    };
	}

	exports.default = leafletCtrl;

/***/ }
/******/ ])
});
;