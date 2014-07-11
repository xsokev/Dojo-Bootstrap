define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'collapse',

        'collapse expanded node': function () {
            return this.remote
                .get(require.toUrl('tests/test_Collapse.html'))
                .setFindTimeout(5000)
                .findByLinkText('Item #1')
                    .click()
                    .end()
                .findByCssSelector('#one:not(.in):not(.collapsing)')
                .getSize()
                .then(function (size) {
                    assert.strictEqual(size.height, 0, 'collapse expanded node');
                });
        },

        'expand collapsed node': function () {
            return this.remote
                .get(require.toUrl('tests/test_Collapse.html'))
                .setFindTimeout(5000)
                .findByLinkText('Item #2')
                    .click()
                    .end()
                .findByCssSelector('#two.in')
                .getVisibleText()
                .then(function (text) {
                    assert.ok(text, 'expand collapsed node');
                });
        }
    });
});
