require({},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "bootstrap/Carousel"
], function (doh, on, domConstruct, domClass, domAttr) {
    "use strict";
    var q = dojo.query;

    var html = '<div class="carousel"/>';

    doh.register("bootstrap.carousel", {
        "should be defined on NodeList object":function () {
            doh.t(dojo.query(document.body).carousel);
        },
        "should return element":function () {
            doh.is(document.body, dojo.query(document.body).carousel({interval: false})[0]);
        },
        "should not fire sliden when slide is prevented":{
            setUp:function () { this.n = domConstruct.place(html, document.body); },
            runTest:function () {  },
            tearDown:function () { domConstruct.destroy(this.n); }
        }
    });
});
