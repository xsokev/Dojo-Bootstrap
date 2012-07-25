define([
    "doh",
    "./functions",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/_base/window",
    "../Collapse"
], function (doh, fnc, on, domConstruct, domClass, win) {
    "use strict";
    var tooltipHtml = '<a class="btn" rel="tooltip" title="Tooltip Title">Tooltip</a>';

    doh.register("bootstrap.tests.Collapse", [
        {
            name:"should be defined on NodeList object",
            runTest:function () {
                doh.t(dojo.query(document.body).collapse);
            }
        },
        {
            name:"should return element",
            runTest:function () {
                doh.is(document.body, dojo.query(document.body).collapse()[0]);
            }
        },
        {
            name:"should show a collapsed element",
            setUp: function () {
                this.el = domConstruct.place('<div class="collapse"></div>', win.body());
                dojo.query(this.el).collapse('show');
            },
            runTest:function () {
                doh.t(domClass.contains(this.el, 'in'));
                doh.t(/height/.test(String(this.el.style.cssText)));
            },
            tearDown: function () {
                domConstruct.destroy(this.el);
            }
        }
    ]);
});
