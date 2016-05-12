(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("L"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "L"], factory);
	else if(typeof exports === 'object')
		exports["angular-leaflet-light"] = factory(require("angular"), require("L"));
	else
		root["angular-leaflet-light"] = factory(root["angular"], root["L"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _leaflet_service = __webpack_require__(2);

	var _leaflet_component = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_angular2.default.module('angular-leaflet', [_leaflet_service.module.name, _leaflet_component.module.name]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var _module = angular.module('angular-leaflet.service.leaflet', []);

	var factory = _module.provider('leafletService', provider);

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
	    this.$get = function factory($compile) {
	        'ngInject';

	        var service = new LeafletService($compile);
	        service.settings = defaultSettings;
	        for (var pp in this.settings) {
	            service.settings[pp] = this.settings[pp];
	        }
	        return service;
	    };
	}

	exports.module = _module;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.component = exports.module = undefined;

	__webpack_require__(4);

	var _leaflet_controller = __webpack_require__(5);

	var _leaflet_controller2 = _interopRequireDefault(_leaflet_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _module = angular.module('angular-leaflet.component.leaflet', []);

	var component = _module.component('leaflet', {
	    template: '<div></div>',
	    controller: _leaflet_controller2.default,
	    bindings: {
	        onMapInitialized: '&'
	    }
	});

	exports.module = _module;
	exports.component = component;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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
	        L.Icon.Default.imagePath = leafletService.settings.imagePath;
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