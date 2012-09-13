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
    "../Collapse"
], function (doh, on, domConstruct, domClass) {
    "use strict";

    doh.register("bootstrap.collapse", {
        "should be defined on NodeList object":function () {
            doh.t(dojo.query(document.body).collapse);
        },
        "should return element":function () {
            doh.is(document.body, dojo.query(document.body).collapse()[0]);
        },
        "should show a collapsed element":{
            setUp: function () {
                this.n = domConstruct.place('<div class="collapse"></div>', document.body);
                dojo.query(this.n).collapse('show');
            },
            runTest:function () {
                doh.t(domClass.contains(this.n, 'in'));
                doh.t(/height/.test(String(this.n.style.cssText)));
            },
            tearDown: function () {
                domConstruct.destroy(this.n);
            }
        }
    });
});
