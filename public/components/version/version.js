'use strict';

angular.module('ProjectZ.version', [
  'ProjectZ.version.interpolate-filter',
  'ProjectZ.version.version-directive'
])

.value('version', '0.1');
