define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'datepicker',

        'sets text box value': function () {
            return this.remote
                .get(require.toUrl('tests/test_Datepicker.html'))
                .setFindTimeout(5000)
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
        }
    });
});