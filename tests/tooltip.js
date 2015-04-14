define([
    'intern!object',
    'intern/chai!assert',
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "bootstrap/Tooltip"
], function (registerSuite, assert, on, domConstruct, domClass, domAttr, Tooltip) {
    "use strict";
    var q = dojo.query;
    var tooltipHtml = '<a class="btn" rel="tooltip" title="Tooltip Title">Tooltip</a>';
    var node;

    registerSuite({
        name: "tooltips",
        beforeEach: function () {
            node = domConstruct.place(tooltipHtml, document.body);
        },
        "should be defined on NodeList object":function () {
            assert.ok(q(node).tooltip);
        },
        "should return element":function () {
            assert.equal(node, q(node).tooltip()[0]);
        },
        "should remove title attribute": function () {
            q(node).tooltip();
            assert.notOk(domAttr.get(node, 'title'));
        },
        "should add data attribute for referencing original title": function () {
            var title = domAttr.get(node, 'title');
            q(node).tooltip();
            assert.equal(title, domAttr.get(node, 'data-original-title'));
        },
        "should append tooltip to body when container is defined as such": function () {
            q(node).tooltip({
                container: 'body'
            });
            q(node).tooltip('show');
            assert.equal(q('body>.tooltip').length, 1);
        },
        afterEach: function () {
            if (node) {
                domConstruct.destroy(node);
            }
        }
    });
});
