require({},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "bootstrap/Support",
    "bootstrap/Scrollspy"
], function (doh, on, domConstruct, domAttr, support) {
    "use strict";
    var q = dojo.query;

    var nav1 = '<div id="nav1" class="nav"><li class="active"><a href="#fat">@fat</a></li><li><a href="#mdo">@mdo</a></li><li><a href="#one">one</a></li></div>';
    var cnt1 = '<div data-target="#nav1" data-offset="0"><p id="fat">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p id="mdo">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p id="one">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>';

    doh.register("bootstrap.scrollspy", {
        "should be defined on NodeList object":function () {
            //doh.t(q(document.body).scrollspy);
        },
        "should return element":function () {
            //doh.is(document.body, q(document.body).scrollspy()[0]);
        },
        "should select menu item when container scrolls": {
            setUp:function () {
                this.n = domConstruct.place(nav1, document.body);
                this.c = domConstruct.place(cnt1, document.body);
                domAttr.set(this.c, {
                    "style":"width: 200px; height: 150px; overflow: auto;",
                    "data-spy":"scroll"
                });
                dojo.query('[data-spy="scroll"]').scrollspy();
                this.c.scrollTop =  support.getData(this.c).scrollspy.offsets[1] + 10;
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
    });
});
