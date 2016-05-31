Angular Leaflet Light
=====================

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Codacy Badge][codacy-image] ][codacy-url]
[![semantic-release][semantic-image] ][semantic-url]

[![Quality][quality-badge] ][quality-url]
[![Coverage Status][coverage-image] ][coverage-url]
[![Circle CI] [circle-icon] ][circle-url]

[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[npm-icon]: https://nodei.co/npm/angular-leaflet-light.png?downloads=true
[npm-url]: https://npmjs.org/package/angular-leaflet-light
[travis-ci-image]: https://travis-ci.org/toutpt/angular-leaflet-light.png?branch=master
[travis-ci-url]: https://travis-ci.org/toutpt/angular-leaflet-light

[coverage-image]: https://coveralls.io/repos/github/toutpt/angular-leaflet-light/badge.svg?branch=master
[coverage-url]: https://toutpt.github.io/angular-leaflet-light/coverage/index.html
[dependencies-image]: https://david-dm.org/toutpt/angular-leaflet-light.png
[dependencies-url]: https://david-dm.org/toutpt/angular-leaflet-light
[devdependencies-image]: https://david-dm.org/toutpt/angular-leaflet-light/dev-status.png
[devdependencies-url]: https://david-dm.org/toutpt/angular-leaflet-light#info=devDependencies

[codacy-image]: https://api.codacy.com/project/badge/Grade/aa28c31e62114c2591e7a7e3161d48ca
[codacy-url]: https://www.codacy.com/public/toutpt/angular-leaflet-light.git
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[quality-badge]: http://npm.packagequality.com/shield/angular-leaflet-light.svg
[quality-url]: http://packagequality.com/#?package=angular-leaflet-light

[circle-icon]: https://circleci.com/gh/toutpt/angular-leaflet-light.svg?style=svg
[circle-url]: https://circleci.com/gh/toutpt/angular-leaflet-light


This project aims at providing a leaflet integration for angularjs.

Please show me examples
-----------------------

[Example 1: Default](http://toutpt.github.io/angular-leaflet-light/examples/default)
[Source](https://github.com/toutpt/angular-leaflet-light/tree/gh-pages/examples/default)

[Example 2: sync center&zoom](http://toutpt.github.io/angular-leaflet-light/examples/center-zoom)
[Source](https://github.com/toutpt/angular-leaflet-light/tree/gh-pages/examples/center-zoom)

[Example 3: geojson](http://toutpt.github.io/angular-leaflet-light/examples/geojson)
[Source](https://github.com/toutpt/angular-leaflet-light/tree/gh-pages/examples/geojson)


How to install
--------------

install using npm

    npm install --save angular-leaflet-light

create example.js file

    angular.module('MyApp', ['angular-leaflet']);

create index.html file

    <html>
		<head>
			<title>angular leaflet default</title>
			<link rel="stylesheet" href="https://npmcdn.com/leaflet@0.7.7/dist/leaflet.css" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<script type="text/javascript" src="https://npmcdn.com/angular@1.5.5/angular.js"></script>
			<script type="text/javascript" src="https://npmcdn.com/leaflet@0.7.7/dist/leaflet.js"></script>
			
			<script type="text/javascript" src="node_modules/angular-leaflet-light/dist/angular-leaflet.js"></script>
			
			<script type="text/javascript" src="example.js"></script>
			<style type="text/css">
			#map {
				height: 500px;
			}
			</style>
		</head>
    <body ng-app="example" ng-strict-di ng-cloak>
        <leaflet></leaflet>
    </body>
    </html>

Why do not use angular-leaflet from tombatossals ?
--------------------------------------------------

The first integration of leaflet in angular has been done by David Rubert
aka tombatossals:

https://github.com/tombatossals/angular-leaflet-directive

Now this project is maintains and updated by the famous angular-ui team:

https://github.com/angular-ui/ui-leaflet

So why should I do it again ?
Because both provide something that is not leaflet.

Theses projects provides advanced integration into angular but ...

* geojson (why the hell should I have only one geojson)
* slow on mobile (may be because there are lots of watchers on quite big objects)
* hard to customize (try to create a directive that wrap it...)


I have use tombatossals's implementation on many project before that time where I find how I would like it to be.

So what is angular leaflet light ?
----------------------------------

A simple directive that display a map and provide a callback with the map object, so you can do what ever you want.

A simple service add some common utils to handle things like compile popup with your data from the scope + default settings for all leaflet maps (using in the init so no watcher on it).


	<leaflet id="mymap" on-map-initialized="customizeMyMap(map)"></leaflet>

You can also access the map using the service:

	leafletService.data.mymap;

