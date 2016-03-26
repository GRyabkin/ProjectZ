/**
 * Created by Zestug on 3/26/16.
 */

'use strict';

describe('service', function() {

    // load modules
    beforeEach(module('ProjectZ'));

    // Test service availability
    it('check the existence of Questionary factory', inject(function(Questionary) {
        expect(Questionary).toBeDefined();
    }));
});