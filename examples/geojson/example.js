(function () {
	'use strict';
	angular.module('example', ['angular-leaflet'])
	/*
	To provide default configuration to leaflet just use 
	leafletServiceProvider.settings
	 */
	.controller('ExampleCtrl', function ExampleCtrl($scope, $http, leafletService) {
		var $ctrl = this;
		$ctrl.geojson = '';
		$ctrl.onMapInitialized = function(map) {
			$ctrl.leaflet = map;
			$http.get('data.geo.json').then(function (d) {
				$ctrl.geojson = JSON.stringify(d.data, null, 2);
				$ctrl.displayGeoJson();
			});
		};
		$ctrl.displayGeoJson = function () {
			var data;
			if ($ctrl.geojson) {
				data = JSON.parse($ctrl.geojson);
			}
			if ($ctrl.geojsonlayer && $ctrl.leaflet) {
				if ($ctrl.leaflet.hasLayer($ctrl.geojsonlayer)) {
					$ctrl.leaflet.removeLayer($ctrl.geojsonlayer);
				}
				delete $ctrl.geojsonlayer;
			}
			if (data && $ctrl.leaflet) {
				$ctrl.geojsonlayer = L.geoJson(data).addTo($ctrl.leaflet);
				$ctrl.leaflet.fitBounds($ctrl.geojsonlayer.getBounds());
			}
		};
	});
})();
