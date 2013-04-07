require({},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "bootstrap/Button"
], function (doh, on, domConstruct, domClass) {
    "use strict";
    var q = dojo.query;

    var b1 = '<button id="b1" data-loading-text="loading..." data-complete-text="finished!" class="btn">State</button>';
    var b2 = '<button id="b2" class="btn" data-toggle="button">Single Toggle</button>';
    var bg1 = '<div class="btn-group" data-toggle="buttons-checkbox"><button class="btn">Bold</button><button class="btn">Normal</button></div>';
    var bg2 = '<div class="btn-group" data-toggle="buttons-radio"><button class="btn">Left</button><button class="btn">Right</button></div>';

    doh.register("bootstrap.buttons", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).button);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).button()[0]);
        },
        "should toggle button": {
            setUp:function () {
                this.b = domConstruct.place(b2, document.body);
            },
            runTest:function () {
                on.emit(this.b, "click", { bubbles:true, cancelable:true });
                doh.t(domClass.contains(this.b, 'active'));
                dojo.query(this.b).button('toggle');
                doh.f(domClass.contains(this.b, 'active'));
            },
            tearDown:function () {
                domConstruct.destroy(this.b);
            }
        },
        "should toggle button when children are clicked": {
            setUp:function () {
                this.n = domConstruct.place(b2, document.body);
                this.i = domConstruct.place('<i></i>', this.n);
            },
            runTest:function () {
                doh.f(domClass.contains(this.n, 'active'));
                on.emit(this.i, "click", { bubbles:true, cancelable:true });
                //TODO: children click not working in unit tests but works in DOM
                //doh.t(domClass.contains(this.n, 'active'));
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should display different text for various states":{
            setUp:function () {
                this.n = domConstruct.place(b1, document.body);
            },
            runTest:function () {
                q(this.n).button('loading');
                doh.is('loading...', this.n.innerHTML);
                q(this.n).button('complete');
                doh.is('finished!', this.n.innerHTML);
                q(this.n).button('reset');
                doh.is('State', this.n.innerHTML);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "checkbox group": {
            setUp:function () {
                this.n = domConstruct.place(bg1, document.body);
            },
            runTest:function () {
                dojo.query('button:nth-child(1)', this.n).button('toggle');
                doh.is(1, dojo.query('button.active', this.n).length);
                dojo.query('button:nth-child(2)', this.n).button('toggle');
                doh.is(2, dojo.query('button.active', this.n).length);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "radio groups":{
            setUp:function () {
                this.n = domConstruct.place(bg2, document.body);
            },
            runTest:function () {
                dojo.query('button:nth-child(1)', this.n).button('toggle');
                doh.is(dojo.query('button.active', this.n).length, 1);
                dojo.query('button:nth-child(2)', this.n).button('toggle');
                doh.is(dojo.query('button.active', this.n).length, 1);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        }
    });
});
