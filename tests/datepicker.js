define([
    'intern!object',
    'intern/chai!assert',

    'dojo/dom-construct',
    'dojo/query',

    'bootstrap/Datepicker'
], function (
    registerSuite,
    assert,

    domConstruct,
    query,

    Datepicker
    ) {

    var contentNode;
    var widget;

    registerSuite({
        name: 'datepicker',

        setup: function () {
            contentNode = domConstruct.create('input', {
                type: 'text',
                value: '09/12/2014'
            }, document.body);
            widget = new Datepicker(contentNode, {});
        },
        'defines a date object': function () {
            var value = widget.date;
            assert.strictEqual(value.toDateString(), 'Fri Sep 12 2014');
        }
    });
});