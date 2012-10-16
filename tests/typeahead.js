require({},[
    "doh",
    "dojo/on",
    "dojo/_base/sniff",
    "dojo/dom-construct",
    "dojo/dom-class",
    "bootstrap/Support",
    "bootstrap/Typeahead"
], function (doh, on, sniff, domConstruct, domClass, support) {
    "use strict";
    var q = dojo.query;

    var html = '';
    var input = '<input />';

    doh.register("bootstrap.typeahead", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).typeahead);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).typeahead()[0]);
        },
        /*
        "should listen to an input": {
            setUp:function () {
                this.c = domConstruct.place(input, document.body);
                q(this.c).typeahead();
                this.t = support.getData(this.c, 'typeahead');
            },
            runTest:function () {
                console.log(this.c);
                console.log(this.t);
                doh.t(this.t.blur);
                doh.t(this.t.keypress);
                doh.t(this.t.keyup);
                if (sniff('webkit') || sniff('ie')) {
                    doh.t(this.t.keydown);
                } else {
                    doh.t(this.t.keydown);
                }
            },
            tearDown:function () { domConstruct.destroy(this.c); }
        },
        */
        "should create a menu": {
            setUp:function () { this.c = domConstruct.place(input, document.body); q(this.c).typeahead(); },
            runTest:function () { doh.t(support.getData(this.c, 'typeahead').menuNode); },
            tearDown:function () { domConstruct.destroy(this.c); }
        },
        /*
        "should listen to the menu": {
            setUp:function () { this.c = domConstruct.place(input, document.body); q(this.c).typeahead(); },
            runTest:function () {
                var menu = support.getData(this.c, 'typeahead').menuNode;
                doh.t(support.getData(menu, 'events').mouseover);
                doh.t(support.getData(menu, 'events').click);
            },
            tearDown:function () {
                domConstruct.destroy(support.getData(this.c, 'typeahead').menuNode);
                domConstruct.destroy(this.c);
            }
        },
        */
        "should show menu when query entered": {
            setUp:function () {
                this.c = domConstruct.place(input, document.body);
                q(this.c).typeahead({
                    source: ['aa', 'ab', 'ac']
                });
                this.t = support.getData(this.c, 'typeahead');
                this.c.value = 'a';
                this.t.lookup();
            },
            runTest:function () {
                var menu = this.t.menuNode;
                doh.is(1, q(':visible', menu).length);   //':visible'
                doh.is(3, q('li', menu).length);
                doh.is(1, q('.active', menu).length);
            },
            tearDown:function () {
                domConstruct.destroy(this.t.menuNode);
                domConstruct.destroy(this.c);
            }
        },
        "should not explode when regex chars are entered": {
            setUp:function () {
                this.c = domConstruct.place(input, document.body);
                q(this.c).typeahead({
                    source: ['aa', 'ab', 'ac', 'mdo*', 'fat+']
                });
                this.t = support.getData(this.c, 'typeahead');
                this.c.value = '+';
                this.t.lookup();
            },
            runTest:function () {
                var menu = this.t.menuNode;
                doh.is(1, q(':visible', menu).length);   //':visible'
                doh.is(1, q('li', menu).length);
                doh.is(1, q('.active', menu).length);
            },
            tearDown:function () {
                domConstruct.destroy(this.t.menuNode);
                domConstruct.destroy(this.c);
            }
        },
        "should hide menu when query entered": {
            setUp:function () {
                this.c = domConstruct.place(input, document.body);
                q(this.c).typeahead({
                    source: ['aa', 'ab', 'ac']
                });
                this.t = support.getData(this.c, 'typeahead');
                this.c.value = 'a';
                this.t.lookup();
            },
            runTest:function () {
                var menu = this.t.menuNode;
                doh.is(1, q(':visible', menu).length);   //':visible'
                doh.is(1, q('li', menu).length);
                doh.is(1, q('.active', menu).length);
                on.emit(this.c, 'blur', { bubbles:true, cancelable:true });
                var d = new doh.Deferred();
                setTimeout(d.getTestCallback(function (e) {
                    doh.is(0, q(':visible', menu).length);   //':visible'
                }));
                return d;
            },
            tearDown:function () {
                domConstruct.destroy(this.t.menuNode);
                domConstruct.destroy(this.c);
            }
        },
        "should set input value to selected item": {
            setUp:function () {
                this.c = domConstruct.place(input, document.body);
                q(this.c).typeahead({
                    source: ['aa', 'ab', 'ac']
                });
                this.t = support.getData(this.c, 'typeahead');
                this.c.value = 'a';
                this.t.lookup();
            },
            runTest:function () {
                var changed = false;
                on(this.c, 'change', function () { changed = true; });
                var menu = this.t.menuNode;

                on.emit(q('li', menu)[2], 'click', { bubbles:true, cancelable:true });

                doh.is('ac', this.c.value);
                doh.is(0, q(':visible', menu).length);   //':visible'
                doh.t(changed);
            },
            tearDown:function () {
                domConstruct.destroy(this.t.menuNode);
                domConstruct.destroy(this.c);
            }
        },
        "should set next item when down arrow is pressed": {
            setUp:function () {
                this.c = domConstruct.place(input, document.body);
                q(this.c).typeahead({
                    source: ['aa', 'ab', 'ac']
                });
                this.t = support.getData(this.c, 'typeahead');
                this.c.value = 'a';
                this.t.lookup();
            },
            runTest:function () {
                var menu = this.t.menuNode;
                doh.is(1, q(':visible', menu).length);   //':visible'
                doh.is(3, q('li', menu).length);
                doh.is(1, q('.active', menu).length);
                doh.t(domClass.contains(q('li', menu)[0], 'active'));

                on.emit(this.c, 'keydown', { bubbles:true, cancelable:true, keyCode: 40 });
                doh.t(domClass.contains(q('li', menu)[1], 'active'));

                on.emit(this.c, 'keydown', { bubbles:true, cancelable:true, keyCode: 38 });
                doh.t(domClass.contains(q('li', menu)[0], 'active'));
            },
            tearDown:function () {
                domConstruct.destroy(this.t.menuNode);
                domConstruct.destroy(this.c);
            }
        }
    });
});
