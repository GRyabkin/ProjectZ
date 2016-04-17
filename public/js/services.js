/**
 * Created by Zestug on 3/24/16.
 */
'use strict';

/* Services */

angular.module('projectZServices', ['ngResource'])

.factory('Questionary', ['$resource',
    function($resource) {
        return $resource('/api/pgq/:pgq_id', {pgq_id: '@_id'}, {
            update: { method:'PUT', isArray:false },
              save: { method:'POST', isArray: true },
             query: { method:'GET', url:'/api/pgq', isArray: false },
            getSubmitted: { method: "GET", url:'/api/pgqAll', isArray: true }
        });
}]);