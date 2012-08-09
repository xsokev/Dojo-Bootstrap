require({
    packages: [
        { name: 'dojo', location: '../dojo' },
        { name: 'bootstrap', location: '../bootstrap' }
    ]
},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "bootstrap/Tooltip"
], function (doh, on, domConstruct, domClass, domAttr, Tooltip) {
    "use strict";
    var q = dojo.query;
    var tooltipHtml = '<a class="btn" rel="tooltip" title="Tooltip Title">Tooltip</a>';

    doh.register("bootstrap.tooltips", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).tooltip);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).tooltip()[0]);
        },
        "should remove title attribute": {
            setUp:function () { this.t = domConstruct.place(tooltipHtml, document.body); },
            runTest:function () {
                q(this.t).tooltip();
                doh.f(domAttr.get(this.t, 'title'));
            },
            tearDown:function () { domConstruct.destroy(this.t); }
        },
        "should add data attribute for referencing original title": {
            setUp:function () { this.t = domConstruct.place(tooltipHtml, document.body); },
            runTest:function () {
                var title = domAttr.get(this.t, 'title');
                q(this.t).tooltip();
                doh.is(title, domAttr.get(this.t, 'data-original-title'));
            },
            tearDown:function () { domConstruct.destroy(this.t); }
        },
        "should detect if title string is html or text: foo":function () {
            doh.f(Tooltip.prototype.isHTML('foo'));
        },
        "should detect if title string is html or text: <foo>":function () {
            doh.t(Tooltip.prototype.isHTML('<foo>'));
        },
        "should detect if title string is html or text: <div>foo</div>":function () {
            doh.t(Tooltip.prototype.isHTML('<div>foo</div>'));
        },
        "should detect if title string is html or text: aaa<div>foo</div>aaa":function () {
            doh.t(Tooltip.prototype.isHTML('aaa<div>foo</div>aaa'));
        },
        "should detect if title string is html or text: document.createElement('div')":function () {
            doh.t(Tooltip.prototype.isHTML(document.createElement('div')));
        },
        "should detect if title string is html or text: domConstruct.create('div')":function () {
            doh.t(Tooltip.prototype.isHTML(domConstruct.create('div')));
        }
    });
});
