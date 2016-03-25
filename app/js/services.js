/**
 * Created by Zestug on 3/24/16.
 */
'use strict';

/* Services */

angular.module('projectzServices', ['ngResource'])

.factory('QuestionsBase', ['$resource',
    function($resource) {
        return $resource('data/:id', {id: '@id'}, {
            query: {method: 'get', params:{id:'questions.json'}, isArray: true}
        });
    }]);
