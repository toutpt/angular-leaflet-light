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

	/* angular module angular-leaflet */
	exports.default = angular.module('angular-leaflet', [])

	/**
	 * This component provide a default leaflet map initialized with id='map'
	 * if no id has been provided.
	 * @usage
	    <leaflet on-map-initialized="$ctrl.onMapInitialized(map)"></leaflet>
	*/
	.component('leaflet', {
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

	/**
	 * LeafletServiceProvider
	 * @constructor
	 */
	function LeafletServiceProvider() {
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
	    this.$get.$inject = ['$compile'];
	}

	exports.default = LeafletServiceProvider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class LeafletService which provide API 
	 * to let leaflet work well with AngularJS
	 * You can pass settings throw the provider
	 */

	var LeafletService = function () {
	    /**
	     * LeafletService constructor
	     * @constructor
	     * @param  {Object} $compile angular $compile
	     */

	    function LeafletService($complie) {
	        _classCallCheck(this, LeafletService);

	        this.settings = {};
	        this.data = {};
	    }

	    /**
	     * handle events
	     * @description integrate Leaflet map.on function with angular
	     * most of the work consist to call scope.$apply only if needed
	     * @param {String} event the name of the event to listen like 'click'
	     * You will find all supported event on the http://leafletjs.com/reference.html#
	     * @param {function} callback the function to call when this event happens
	     * @param {Object} leafletObject the object that has '.on' function
	     * @param {Ojbect} scope the scope of your current controller/directive/component
	    */


	    _createClass(LeafletService, [{
	        key: 'on',
	        value: function on(event, callback, lobj, scope) {
	            lobj.on(event, function (e) {
	                callback(e);
	                if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
	                    scope.$apply();
	                }
	            });
	            scope.$on('$destroy', function () {
	                lobj.off(event, callback);
	            });
	        }

	        /**
	         * @description integrate Leaflet map.on function with angular
	         * most of the work consist to call scope.$apply only if needed.
	         * @example
	         var settings = {
	            center: {
	                lat: 47.21117290969667,
	                lng: -1.5569686889648438,
	                zoom: 12
	            },
	            tiles: {
	                url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
	                options: {
	                    attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	                    maxZoom: 19
	                }
	            },
	            layers: {
	                baselayers: {
	                    layerid: {}
	                },
	                overlays: {
	                    overlayid: {}
	                }
	            }
	         };
	         * @param {Object} map the leaflet map object update
	         * @param {Object} settings
	        */

	    }, {
	        key: 'updateMapFromSettings',
	        value: function updateMapFromSettings(map, settings) {
	            var s = settings || this.settings;
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
	        }
	    }]);

	    return LeafletService;
	}();

	LeafletService.$inject = ['$compile'];
	exports.default = LeafletService;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class LeafletCtrl
	 * This is the controller of the leaflet directive
	 */

	var LeafletCtrl = function () {
	    /**
	     * LeafletCtrl constructor
	     * @constructor
	     * @param {Object} $element angular $element
	     * @param {Object} leafletService local service
	     */

	    function LeafletCtrl($element, leafletService) {
	        _classCallCheck(this, LeafletCtrl);

	        this.$element = $element;
	        this.leafletService = leafletService;
	    }

	    _createClass(LeafletCtrl, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.mapid = this.$element.attr('id') || 'map';
	            this.$element.removeAttr('id');
	            var div = this.$element.find('div');
	            div.attr('id', this.mapid);
	            div.attr('id', this.mapid);
	            div.attr('style', this.$element.attr('style'));
	            div.attr('class', this.$element.attr('class'));
	        }
	    }, {
	        key: '$postLink',
	        value: function $postLink() {
	            if (!L.Icon.Default.imagePath && leafletService.settings.imagePath) {
	                L.Icon.Default.imagePath = leafletService.settings.imagePath;
	            }
	            var map = L.map(this.mapid);
	            this.leafletService.data[this.mapid] = map;
	            this.leafletService.updateMapFromSettings(map);
	            this.onMapInitialized({ map: map });
	        }
	    }]);

	    return LeafletCtrl;
	}();

	LeafletCtrl.$inject = ['$element', 'leafletService'];
	exports.default = LeafletCtrl;

/***/ }
/******/ ])
});
;