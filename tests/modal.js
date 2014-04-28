require({},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "bootstrap/Modal"
], function (doh, on, domConstruct) {
    "use strict";
    var q = dojo.query;

    var modalHtml = '<div id="myModal" class="modal hide"></div>';
    var modalToggle = '<a data-toggle="modal" href="#myModal" class="btn"></a>';

    doh.register("bootstrap.modals", {
        "should be defined on NodeList object":{
            setUp:function () {
                this.n = domConstruct.place(modalHtml, document.body);
            },
            runTest:function () {
                doh.t(q(this.n).modal);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should return element":{
            setUp:function () {
                this.n = domConstruct.place(modalHtml, document.body);
            },
            runTest:function () {
                doh.is(this.n, q(this.n).modal()[0]);
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should insert into dom when show method is called": {
            setUp:function () {
                this.n = domConstruct.place(modalHtml, document.body);
            },
            runTest:function () {
                var d = new doh.Deferred();
                q(this.n).on('shown.bs.modal', d.getTestCallback(function () {
                    doh.t(q('#myModal').length);
                }));
                q(this.n).modal('show');
                return d;
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should fire show event": {
            setUp:function () {
                this.n = domConstruct.place(modalHtml, document.body);
            },
            runTest:function () {
                var d = new doh.Deferred();
                q(this.n).on('show.bs.modal', d.getTestCallback(function () {
                    doh.t(true);
                }));
                q(this.n).modal('show');
                return d;
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "should not fire shown when default prevented": {
            setUp:function () {
                this.n = domConstruct.place(modalHtml, document.body);
            },
            runTest:function () {
                var d = new doh.Deferred();
                q(this.n).on('show.bs.modal', d.getTestCallback(function (e) {
                    e.preventDefault();
                    doh.t(true);
                }));
                q(this.n).on('shown.bs.modal', function (e) {
                    doh.t(false);
                });
                q(this.n).modal('show');
                return d;
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
            }
        },
        "show modal using a toggle": {
            setUp:function () {
                this.modal = domConstruct.place(modalHtml, document.body);
                this.toggle = domConstruct.place(modalToggle, document.body);
            },
            runTest:function () {
                on.emit(this.toggle, "click", { bubbles:true, cancelable:true });
                doh.is("block", this.modal.style.display);
                //console.log(this.modal.style);
                on.emit(this.toggle, "click", { bubbles:true, cancelable:true });
                doh.is("none", this.modal.style.display);
            },
            tearDown:function () {
                domConstruct.destroy(this.modal);
                domConstruct.destroy(this.toggle);
            }
        }
    });
});
