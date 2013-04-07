require({},[
    "doh",
    "bootstrap/Support",
    "dojo/dom-construct",
    "dojo/dom-attr"
], function (doh, support, domConstruct, domAttr) {
    "use strict";
    var q = dojo.query;

    var name = "John Horembala";
    var language = "Polish";
    //todo: add tests for string functions
    doh.register("bootstrap.support", {
        "should get node data": {
            setUp:function () { this.n = domConstruct.place('<div />', document.body); },
            runTest:function () {
                doh.f(support.getData(this.n, 'user'));
                q(this.n).data('user', name);
                doh.is(name, support.getData(this.n, 'user'));
                q(this.n).removeData('user');
                doh.f(support.getData(this.n, 'user'));
            },
            tearDown:function () { domConstruct.destroy(this.n); }
        },
        "should set node data": {
            setUp:function () { this.n = domConstruct.place('<div />', document.body); },
            runTest:function () {
                support.setData(this.n, 'user', name);
                doh.is(name, dojo.query(this.n).data('user')[0]);
                q(this.n).removeData('user');
                doh.f(support.getData(this.n, 'user'));
            },
            tearDown:function () { domConstruct.destroy(this.n); }
        },
        "should get single data attribute value": {
            setUp:function () {
                this.n = domConstruct.place('<div data-user="' + name + '" />', document.body);
            },
            runTest:function () {
                doh.is(name, support.getData(this.n, 'user'));
            },
            tearDown:function () {
                dojo.query(this.n).removeData('user');
                domConstruct.destroy(this.n);
            }
        },
        "should auto load all data attributes": {
            setUp:function () {
                this.n = domConstruct.place('<div data-user="' + name + '" data-language="' + language + '" />', document.body);
            },
            runTest:function () {
                var data = support.getData(this.n);
                console.log(data);
                doh.is(name, data.user);
                doh.is(language, data.language);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should auto load data attributes added using dom-attr": {
            setUp:function () {
                this.n = domConstruct.place('<div />', document.body);
                domAttr.set(this.n, {
                    'data-user': name,
                    'data-language': language
                });
            },
            runTest:function () {
                var data = support.getData(this.n);
                doh.is(name, data.user);
                doh.is(language, data.language);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        }
    });
});
