Angular Leaflet Light
=====================

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Codacy Badge][codacy-image] ][codacy-url]
[![semantic-release][semantic-image] ][semantic-url]
[![Commitizen friendly][commitizen-image] ][commitizen-url]

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
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[quality-badge]: http://npm.packagequality.com/shield/angular-leaflet-light.svg
[quality-url]: http://packagequality.com/#?package=angular-leaflet-light

[circle-icon]: https://circleci.com/gh/toutpt/angular-leaflet-light.svg?style=svg
[circle-url]: https://circleci.com/gh/toutpt/angular-leaflet-light

A simple directive for displaying a Leaflet map in AngularJS, providing a callback with the map object.


Examples
--------

[Example 1: Default](http://toutpt.github.io/angular-leaflet-light/examples/default)
[Source](https://github.com/toutpt/angular-leaflet-light/tree/gh-pages/examples/default)

[Example 2: sync center&zoom](http://toutpt.github.io/angular-leaflet-light/examples/center-zoom)
[Source](https://github.com/toutpt/angular-leaflet-light/tree/gh-pages/examples/center-zoom)

[Example 3: geojson](http://toutpt.github.io/angular-leaflet-light/examples/geojson)
[Source](https://github.com/toutpt/angular-leaflet-light/tree/gh-pages/examples/geojson)


Installation
--------------

Install using npm:
```
npm install --save angular-leaflet-light
```

Add `angular-leaflet` as a dependency for your app:
```js
angular.module('MyApp', ['angular-leaflet']);
```

Use it as so:
```html
<leaflet></leaflet>
```

Extending:

A simple service adds some common utils to handle things like compiling popup with your data from the scope + default settings for all leaflet maps. Callback is used at initialization so it doesn't need a watcher.

```html
<leaflet id="mymap" on-map-initialized="customizeMyMap(map)"></leaflet>
```

You can also access the map using the service, note map id "mymap":
```js
leafletService.data.mymap;
```


Comparing to alternatives
-------------------------

The first integration of leaflet in angular has been done by David Rubert
aka tombatossals:

https://github.com/tombatossals/angular-leaflet-directive

Later own that project got forked by some actives and is now maintained by angular-ui team:

https://github.com/angular-ui/ui-leaflet

So why should I do it again? Because both provide something that is not leaflet.

Theses projects provides advanced integration into angular but:

* geojson (why the hell should I have only one geojson)
* slow on mobile (may be because there are lots of watchers on quite big objects)
* hard to customize (try to create a directive that wrap it...)

License
-------
MIT
