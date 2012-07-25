define([
    "doh",
    "./functions",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/_base/window",
    "dojo/mouse",
    "../Popover"
], function (doh, fnc, on, domConstruct, domClass, win, mouse) {
    "use strict";
    var popoverHtml = '<a href="#" class="btn" rel="popover" title="A Title" data-content="And here is some amazing content.">Popover</a>';

    doh.register("bootstrap.tests.Popover", [
        {
            name:"Show Popover",
            setUp:function () {
                this.p = domConstruct.place(popoverHtml, win.body());
                dojo.query("a[rel=popover]").popover();
            },
            runTest:function () {
                //on.emit(this.p, mouse.enter, { bubbles: false, cancelable: false });
                //doh.is(1, dojo.query(".popover").length);
                //on.emit(this.p, mouse.leave, { bubbles: false, cancelable: false });
                //doh.is(0, dojo.query(".popover").length);
            },
            tearDown:function () {
                domConstruct.destroy(this.p);
            }
        }
    ]);
});
