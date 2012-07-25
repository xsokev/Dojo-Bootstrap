define([
    "doh",
    "./functions",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/_base/window",
    "../Tab"
], function (doh, fnc, on, domConstruct, domClass, win) {
    "use strict";
    var tabHtml = '<ul id="myTab" class="nav nav-tabs"><li class="active"><a href="#home" data-toggle="tab">Home</a></li><li><a href="#event" data-toggle="tab">Event</a></li></ul>';
    var contentHtml = '<div class="tab-content"><div class="tab-pane active" id="home"></div><div class="tab-pane" id="event"></div>';

    doh.register("bootstrap.tests.Tab", [
        {
            name:"Select Tabs",
            setUp:function () {
                this.t = domConstruct.place(tabHtml, win.body());
                this.c = domConstruct.place(contentHtml, win.body());
            },
            runTest:function () {
                dojo.query('a[href="#home"]', this.t).tab('show');
                doh.is(1, dojo.query('.active', this.c).length);	//only one selected tab
                doh.is('home', dojo.query('.active', this.c)[0].id);
                dojo.query('a[href="#event"]', this.t).tab('show');
                doh.is(1, dojo.query('.active', this.c).length);
                doh.is('event', dojo.query('.active', this.c)[0].id);
            },
            tearDown:function () {
                domConstruct.destroy(this.t);
                domConstruct.destroy(this.c);
            }
        }
    ]);
});
