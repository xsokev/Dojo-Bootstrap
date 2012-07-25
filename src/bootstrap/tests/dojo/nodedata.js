define([
    "doh",
    "./functions",
    "../../support/node-data",
    "dojo/dom-construct",
    "dojo/_base/window",
    "dojo/NodeList-data"
], function (doh, fnc, nodeData, domConstruct, win) {
    "use strict";
    var name = "John Doe";
    var language = "Polish";

    doh.register("bootstrap.tests.NodeData", [
        {
            name:"Get Node Data",
            setUp:function () {
                this.domNode = domConstruct.place('<div />', win.body());
                dojo.query(this.domNode).data('user', name);
            },
            runTest:function () {
                doh.is(name, nodeData.get(this.domNode, 'user'));
            },
            tearDown:function () {
                dojo.query(this.domNode).removeData('user');
                domConstruct.destroy(this.domNode);
            }
        },
        {
            name:"Set Node Data",
            setUp:function () {
                this.domNode = domConstruct.place('<div />', win.body());
                nodeData.set(this.domNode, 'user', name);
            },
            runTest:function () {
                doh.is(name, dojo.query(this.domNode).data('user')[0]);
            },
            tearDown:function () {
                dojo.query(this.domNode).removeData('user');
                domConstruct.destroy(this.domNode);
            }
        },
        {
            name:"Auto Load Data Attributes",
            setUp:function () {
                this.domNode = domConstruct.place('<div data-user="' + name + '" data-language="' + language + '" />', win.body());
                nodeData.load(this.domNode);
            },
            runTest:function () {
                doh.is(name, dojo.query(this.domNode).data('user')[0]);
                doh.is(language, dojo.query(this.domNode).data('language')[0]);
            },
            tearDown:function () {
                dojo.query(this.domNode).removeData('user');
                domConstruct.destroy(this.domNode);
            }
        }
    ]);
});
