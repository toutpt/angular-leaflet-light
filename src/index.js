import angular from 'angular';
import {module as service} from './leaflet_service.js';
import {module as component} from './leaflet_component.js';

angular.module('angular-leaflet', [
    service.name,
    component.name
]);

