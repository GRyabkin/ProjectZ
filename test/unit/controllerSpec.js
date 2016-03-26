/**
 * Created by Zestug on 3/26/16.
 */

'use strict';

/* jasmine specs for controllers go here */
describe('ProjectZ controllers', function() {

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('ProjectZ'));
    beforeEach(module('projectZServices'));

    describe('mainCtrl', function() {
        var scope, ctrl, $httpBackend;

        var dataDefaultPGQ = { name: "PGQ",
            questions:[ {id: "q1"}, {id: "q2"} ]
        };

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/pgq').
                respond(dataDefaultPGQ);

            scope = $rootScope.$new();
            ctrl = $controller('mainCtrl', {$scope: scope});
        }));

        it('should load default questionary', function () {

            expect(scope.questionary).toEqualData({});
            $httpBackend.flush();

            expect(scope.questionary).toEqualData(dataDefaultPGQ);
        });
    });
});