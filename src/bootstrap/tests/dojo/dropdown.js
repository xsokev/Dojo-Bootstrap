define([
    "doh",
    "./functions",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/_base/window",
    "../Dropdown"
], function (doh, fnc, on, domConstruct, domClass, win) {
    "use strict";
    var d1 = '<div class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"></a>' +
        '<ul class="dropdown-menu"><li><a href="#">Action</a></li></ul></div>';
    var d2 = '<div class="btn-group"><button class="btn" /><button class="btn dropdown-toggle" data-target="#menu" data-toggle="dropdown">&nbsp;</button>' +
        '<ul class="dropdown-menu" id="menu"><li><a href="#">Action</a></li></ul></div>';

    doh.register("bootstrap.tests.Dropdown", [
        {
            name:"Anchor No Target",
            setUp:function () {
                this.d = domConstruct.place(d1, win.body());
            },
            runTest:function () {
                on.emit(dojo.query(".dropdown-toggle", this.d)[0], "click", { bubbles:true, cancelable:true });
                doh.t(domClass.contains(this.d, 'open'));
                on.emit(dojo.query(".dropdown-toggle", this.d)[0], "click", { bubbles:true, cancelable:true });
                doh.f(domClass.contains(this.d, 'open'));
            },
            tearDown:function () {
                domConstruct.destroy(this.d);
            }
        },
        {
            name:"Button with Target",
            setUp:function () {
                this.d = domConstruct.place(d2, win.body());
            },
            runTest:function () {
                on.emit(dojo.query(".dropdown-toggle", this.d)[0], "click", { bubbles:true, cancelable:true });
                doh.t(domClass.contains(this.d, 'open'));
                on.emit(dojo.query(".dropdown-toggle", this.d)[0], "click", { bubbles:true, cancelable:true });
                doh.f(domClass.contains(this.d, 'open'));
            },
            tearDown:function () {
                domConstruct.destroy(this.d);
            }
        }
    ]);
});
