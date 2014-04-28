require({},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "bootstrap/Tab"
], function (doh, on, domConstruct) {
    "use strict";
    var q = dojo.query;
    var contentHtml = '<ul><li id="home"></li><li id="profile"></li></ul>';
    var tabsHTML = '<ul class="tabs">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>';
    var pillsHTML = '<ul class="pills">' +
        '<li><a href="#home">Home</a></li>' +
        '<li><a href="#profile">Profile</a></li>' +
        '</ul>';
    doh.register("bootstrap.tabs", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).tab);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).tab()[0]);
        },
        "should activate element by tab id": {
            setUp:function () {
                this.t = domConstruct.place(tabsHTML, document.body);
                this.c = domConstruct.place(contentHtml, document.body);
            },
            runTest:function () {
                q('a[href="#home"]', this.t).tab('show');
                doh.is(1, q('.active', this.c).length);	//only one selected tab
                doh.is('home', q('.active', this.c)[0].id);
                q('a[href="#profile"]', this.t).tab('show');
                doh.is(1, q('.active', this.c).length);
                doh.is('profile', q('.active', this.c)[0].id);
            },
            tearDown:function () {
                domConstruct.destroy(this.t);
                domConstruct.destroy(this.c);
            }
        },
        "should activate element by tab id (pills)": {
            setUp:function () {
                this.t = domConstruct.place(pillsHTML, document.body);
                this.c = domConstruct.place(contentHtml, document.body);
            },
            runTest:function () {
                q('a[href="#home"]', this.t).tab('show');
                doh.is(1, q('.active', this.c).length); //only one selected tab
                doh.is('home', q('.active', this.c)[0].id);
                q('a[href="#profile"]', this.t).tab('show');
                doh.is(1, q('.active', this.c).length);
                doh.is('profile', q('.active', this.c)[0].id);
            },
            tearDown:function () {
                domConstruct.destroy(this.t);
                domConstruct.destroy(this.c);
            }
        },
        "should not fire closed when close is prevented": {
            setUp:function () { this.t = domConstruct.place(tabsHTML, document.body); },
            runTest:function () {
                var d = new doh.Deferred();
                q(this.t).on('show.bs.tab', d.getTestCallback(function (e) {
                    e.preventDefault();
                    doh.t(true);
                }));
                q(this.t).on('shown.bs.tab', function (e) {
                    doh.t(false);
                });
                q(this.t).tab('show');
                return d;
            },
            tearDown:function () { domConstruct.destroy(this.t); }
        }
        // TODO: add test for related target
        // see: https://github.com/twbs/bootstrap/blob/master/js/tests/unit/tab.js
        /*,
        "show and shown events should reference correct relatedTarget": {
            setUp: function () {
                var dropHTML = '<ul class="drop">' +
                    '<li class="dropdown"><a data-toggle="dropdown" href="#">1</a>' +
                    '<ul class="dropdown-menu">' +
                    '<li><a href="#1-1" data-toggle="tab">1-1</a></li>' +
                    '<li><a href="#1-2" data-toggle="tab">1-2</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>';
                this.t = domConstruct.place(dropHTML, document.body);
            },
            runTest: function() {
                var d = new doh.Deferred();
                q(this.t).on('show.bs.tab', function(event) {
                    doh.is(event.relatedTarget.hash, '#1-1');
                });
                q('ul>li:first-child a').tab('show');
                return d;
            },
            tearDown:function () { domConstruct.destroy(this.t); }
        }*/
    });
});
