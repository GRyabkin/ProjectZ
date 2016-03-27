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

        var dataSubmittedPGQ = [{ name: "PGQ", fillDate: 162244141, questions:[ {id: "q1"}, {id: "q2"} ]},
                                { name: "PGQ", fillDate: 134573457, questions:[ {id: "q1"}, {id: "q2"} ]}];

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('/api/pgqAll').respond(dataSubmittedPGQ);
            $httpBackend.whenGET('/api/pgq').respond(dataDefaultPGQ);
            $httpBackend.whenGET('templates/questionaries_list.html').respond(200, '');

            scope = $rootScope.$new();
            ctrl = $controller('mainCtrl', {$scope: scope});
        }));

        it('should load default questionary', function () {

            $httpBackend.expectGET('/api/pgq').respond(dataDefaultPGQ);
            expect(scope.questionary).toEqualData({});
            $httpBackend.flush();
            expect(scope.questionary).toEqualData(dataDefaultPGQ);
        });

        it('should load list of submitted questionaries', function () {

            $httpBackend.expectGET('/api/pgqAll').respond(dataSubmittedPGQ);
            expect(scope.questionariesList).toEqualData([]);
            $httpBackend.flush();
            expect(scope.questionariesList).toEqualData(dataSubmittedPGQ);
        });
    });
});