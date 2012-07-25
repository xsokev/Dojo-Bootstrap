define([
    "doh",
    "./functions",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "dojo/_base/window",
    "../support/node-data",
    "../Scrollspy"
], function (doh, fnc, on, domConstruct, domAttr, win, nodeData) {
    "use strict";
    var nav1 = '<div id="nav1" class="nav"><li class="active"><a href="#fat">@fat</a></li><li><a href="#mdo">@mdo</a></li><li><a href="#one">one</a></li></div>';
    var cnt1 = '<div data-target="#nav1" data-offset="0"><p id="fat">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p id="mdo">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p id="one">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>';

    //TODO: Make windows based unit test work
    doh.register("bootstrap.tests.Scrollspy", [
        {
            name:"Window Based",
            setUp:function () {
                this.n = domConstruct.place(nav1, win.body());
                this.c = domConstruct.place(cnt1, win.body());
                //dojo.query('body').scrollspy();
            },
            runTest:function () {
                doh.is(1, dojo.query('.active', this.n).length);
                //window.scrollTo(560);
                //on.emit(win.body(), "scroll", { bubbles: false, cancelable: false });
                //doh.is("#mdo", domAttr.get(dojo.query('.active > a', this.n)[0], "href"));
            },
            tearDown:function () {
                //window.scrollTo(0);
                domConstruct.destroy(this.n);
                domConstruct.destroy(this.c);
            }
        },
        {
            name:"Container Based",
            setUp:function () {
                this.n = domConstruct.place(nav1, win.body());
                this.c = domConstruct.place(cnt1, win.body());
                domAttr.set(this.c, {
                    "style":"width: 200px; height: 150px; overflow: auto;",
                    "data-spy":"scroll"
                });
                dojo.query('[data-spy="scroll"]').scrollspy();
                this.c.scrollTop = 530;
                on.emit(this.c, "scroll", { bubbles:false, cancelable:false });
            },
            runTest:function () {
                doh.is(1, dojo.query('.active', this.n).length);
                doh.is("#mdo", domAttr.get(dojo.query('.active > a', this.n)[0], "href"));
            },
            tearDown:function () {
                domConstruct.destroy(this.n);
                domConstruct.destroy(this.c);
            }
        }
    ]);
});
