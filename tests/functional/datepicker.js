define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'intern/dojo/node!leadfoot/keys'
], function (registerSuite, assert, require, keys) {
    registerSuite({
        name: 'datepicker',

        setup: function () {
            return this.remote
                .get(require.toUrl('tests/test_Datepicker.html'))
                .setFindTimeout(5000);
        },
        'sets text box value': function () {
            return this.remote
                .findById('mydate')
                    .click()
                    .end()
                .findByCssSelector('.datepicker .day')
                    .click()
                    .end()
                .findById('mydate')
                    .getProperty('value')
                    .then(function (value) {
                        assert.strictEqual(value, '08-26-2012');
                    })
                ;
        },
        'updated date on keyup': function () {
            return this.remote
                .findById('mydate')
                    .type([keys.BACKSPACE, '1'])
                    .end()
                .executeAsync(function (done) {
                    var query = require('dojo/query');
                    var date = query('#mydate').data('datepicker')[0].date;

                    done(date.toDateString());
                })
                .then(function (dateString) {
                    assert.strictEqual(dateString, 'Fri Aug 26 2011');
                });
        },
        'fires changeDate when user types in date': function () {
            return this.remote
                .executeAsync(function (done) {
                    var query = require('dojo/query');
                    query('#mydate').datepicker()
                        .on('changeDate', function () {
                            window.datepickerFired = true;
                        });

                    done();
                })
                .findById('mydate')
                    .type([keys.BACKSPACE, '1'])
                    .end()
                .executeAsync(function (done) {
                    done(window.datepickerFired);
                })
                .then(function (value) {
                    assert.strictEqual(value, true);
                });
        }
    });
});