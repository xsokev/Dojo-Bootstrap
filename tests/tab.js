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
    "../Tab"
], function (doh, on, domConstruct) {
    "use strict";
    var q = dojo.query;

    var tabHtml = '<ul id="myTab" class="nav nav-tabs"><li class="active"><a href="#home" data-toggle="tab">Home</a></li><li><a href="#event" data-toggle="tab">Event</a></li></ul>';
    var contentHtml = '<div class="tab-content"><div class="tab-pane active" id="home"></div><div class="tab-pane" id="event"></div>';

    doh.register("bootstrap.tabs", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).tab);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).tab()[0]);
        },
        "should activate element by tab id": {
            setUp:function () {
                this.t = domConstruct.place(tabHtml, document.body);
                this.c = domConstruct.place(contentHtml, document.body);
            },
            runTest:function () {
                q('a[href="#home"]', this.t).tab('show');
                doh.is(1, q('.active', this.c).length);	//only one selected tab
                doh.is('home', q('.active', this.c)[0].id);
                q('a[href="#event"]', this.t).tab('show');
                doh.is(1, q('.active', this.c).length);
                doh.is('event', q('.active', this.c)[0].id);
            },
            tearDown:function () {
                domConstruct.destroy(this.t);
                domConstruct.destroy(this.c);
            }
        },
        "should not fire closed when close is prevented": {
            setUp:function () { this.t = domConstruct.place(tabHtml, document.body); },
            runTest:function () {
                var d = new doh.Deferred();
                q(this.t).on('show', d.getTestCallback(function (e) {
                    e.preventDefault();
                    doh.t(true);
                }));
                q(this.t).on('shown', function (e) {
                    //doh.f(true);
                });
                q(this.t).tab('show');
                return d;
            },
            tearDown:function () { domConstruct.destroy(this.t); }
        }
    });
});
