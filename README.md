Angular Leaflet Light
=====================

This project aims at providing a leaflet integration for angularjs.

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
