require({},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "bootstrap/Dropdown"
], function (doh, on, domConstruct, domClass, domAttr) {
    "use strict";
    var q = dojo.query;

    var d1 = '<div class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"></a>' +
        '<ul class="dropdown-menu"><li><a href="#">Action</a></li></ul></div>';
    var d2 = '<div class="btn-group"><button class="btn" /><button class="btn dropdown-toggle" data-target="#menu" data-toggle="dropdown">&nbsp;</button>' +
        '<ul class="dropdown-menu" id="menu"><li><a href="#">Action</a></li></ul></div>';

    doh.register("bootstrap.dropdowns", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).dropdown);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).dropdown()[0]);
        },
        "should not open dropdown if target has disabled attribute":{
            setUp:function () {
                this.n = domConstruct.place(d1, document.body);
                domAttr.set(q('.dropdown-toggle', this.n)[0], 'disabled', 'disabled');
            },
            runTest:function () {
                on.emit(q(".dropdown-toggle", this.n)[0], "click", { bubbles:true, cancelable:true });
                doh.f(domClass.contains(this.n, 'open'));
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should not open dropdown if target has disabled class":{
            setUp:function () {
                this.n = domConstruct.place(d2, document.body);
                domClass.add(q('.dropdown-toggle', this.n)[0], 'disabled');
            },
            runTest:function () {
                on.emit(q(".dropdown-toggle", this.n)[0], "click", { bubbles:true, cancelable:true });
                doh.f(domClass.contains(this.n, 'open'));
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should remove open class if body clicked":{
            setUp:function () {
                this.n = domConstruct.place(d2, document.body);
                on.emit(q(".dropdown-toggle", this.n)[0], "click", { bubbles:true, cancelable:true });
            },
            runTest:function () {
                doh.t(domClass.contains(this.n, 'open'));
                on.emit(q(document.body)[0], "click", { bubbles:true, cancelable:true });
                doh.f(domClass.contains(this.n, 'open'));
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        }
    });
});
