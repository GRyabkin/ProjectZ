/**
 * Created by Zestug on 3/24/16.
 */
'use strict';

/* Services */

angular.module('projectZServices', ['ngResource'])

.factory('Questionary', ['$resource',
    function($resource) {
        return $resource('/api/pgq/:pgq_id', {id: '@id'}, {
              save: { method:'POST', isArray: true },
             query: { method: "GET", isArray: false },
            getAll: { method: "GET", url:'/api/pgqAll', isArray: true }
        });
}]);