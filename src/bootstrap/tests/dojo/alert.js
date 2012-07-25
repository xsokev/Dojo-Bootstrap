define([
    "doh",
    "./functions",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/_base/window",
    "../support/node-data",
    "../Alert"
], function (doh, fnc, on, domConstruct, win, nodeData) {
    "use strict";
    var alert1 = '<div class="alert1 alert"><button class="close" data-dismiss="alert">&times;</button>Best check yourself.</div>';
    var alert2 = '<div class="alert2 alert"><button class="close" data-dismiss="alert">&times;</button>Best check yourself.</div>';

    doh.register("bootstrap.tests.Alert", [
        {
            name:"Manual Close",
            setUp:function () {
                this.domNode = domConstruct.place(alert1, win.body());
            },
            runTest:function () {
                on.emit(dojo.query('button', this.domNode)[0], "click", { bubbles:true, cancelable:true });
                var element = dojo.query(".alert1")[0];
                doh.is(fnc.alwaysFalse(), fnc.isTrue(element));
            }
        },
        {
            name:"Programmatic Close",
            setUp:function () {
                this.domNode = domConstruct.place(alert2, win.body());
            },
            runTest:function () {
                dojo.query(this.domNode).alert('close');
                var element = dojo.query(".alert2")[0];
                doh.is(fnc.alwaysFalse(), fnc.isTrue(element));
            }
        }
    ]);
});
