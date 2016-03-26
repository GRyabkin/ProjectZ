'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('ProjectZ', function() {

    var EC = protractor.ExpectedConditions;

    describe('Fill Personal Growth Questionary', function() {

        const modalQuestionaryCSS = 'div.modal-dialog';
        const openQuestionaryID   = 'open_questionary';

        beforeEach(function() {
            browser.get('/index.html');

            element(by.id(openQuestionaryID)).click();
            browser.wait(EC.presenceOf(element(by.css(modalQuestionaryCSS))), 2000);
        });

        it('Personal growth questionary validation and submit', function() {

            expect(element(by.css('div.modal-dialog')).isPresent()).toBe(true);
            expect(element(by.css('h3.modal-title')).getText()).toBe('Personal Growth Questionary');

            var questionsList = element.all(by.repeater('question in questionary.questions'));
            expect(questionsList.count()).toBe(9);

            var inputs     = element.all(by.model('question.answer'));
            var firstInput = inputs.first();
            var firstHint  = element(by.id("inputAnswer_q1"));
            firstInput.click();
            inputs.get(1).click();

            expect(firstHint.isDisplayed()).toBeTruthy();

            firstInput.sendKeys('Test');
            expect(firstHint.isDisplayed()).toBeFalsy();

            var saveChanges = element(by.id('save'));

            expect(element(by.id('close')).isPresent()).toBe(true);
            expect(saveChanges.isPresent()).toBe(true);

            element.all(by.model('question.answer')).each(function(element, index) {

                if (index > 0)
                    element.sendKeys('Test');
            });

            saveChanges.click();
            browser.wait(EC.presenceOf(element(by.id(openQuestionaryID))), 2000);
            expect(element(by.css(modalQuestionaryCSS)).isPresent()).toBe(false);
        });

        it('PGQ \'Save Changes\' and \'Close\' buttons should close modal', function() {

            expect(element(by.css(modalQuestionaryCSS)).isPresent()).toBe(true);

            element(by.id('close')).click();
            browser.wait(EC.presenceOf(element(by.id(openQuestionaryID))), 2000);
            expect(element(by.id(openQuestionaryID)).isPresent()).toBe(true);
        });
    });
});
