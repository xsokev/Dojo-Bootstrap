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
    "dojo/dom-attr",
    "bootstrap/Support",
    "bootstrap/Popover"
], function (doh, on, domConstruct, domClass, domAttr, support) {
    "use strict";
    var q = dojo.query;

    var popoverHtml = '<a href="#" class="btn" rel="popover" title="A Title" data-content="And here is some amazing content.">Popover</a>';
    var popoverHtml2 = '<a href="#">Popover</a>';

    doh.register("bootstrap.popovers", {
        "should be defined on NodeList object":{
            setUp:function () { this.n = domConstruct.place(popoverHtml, document.body); },
            runTest:function () { doh.t(q(this.n).popover); },
            tearDown:function () { document.body.removeChild(this.n); }
        },
        "should return element":{
            setUp:function () { this.n = domConstruct.place(popoverHtml, document.body); },
            runTest:function () { doh.is(this.n, q(this.n).popover()[0]); },
            tearDown:function () { document.body.removeChild(this.n); }
        },
        "should render popover element":{
            setUp:function () {
                this.n = domConstruct.place(popoverHtml, document.body);
                domAttr.set(this.n, 'data-animation', 'false');
            },
            runTest:function () {
                q(this.n).popover('show');
                doh.is(1, q('.popover').length);
                q(this.n).popover('hide');
                doh.is(0, q('.popover').length);
            },
            tearDown:function () { document.body.removeChild(this.n); }
        },
        "should store popover instance in popover data object":{
            setUp:function () { this.n = domConstruct.place(popoverHtml, document.body); },
            runTest:function () {
                q(this.n).popover();
                doh.t(support.getData(this.n, 'popover'));
            },
            tearDown:function () { document.body.removeChild(this.n); }
        },
        "should get title and content from options":{
            setUp:function () {
                this.n = domConstruct.place(popoverHtml2, document.body);
                this.p = q(this.n).popover({
                    title: '@fat',
                    animation: false,
                    content: function () {
                        return 'loves writing tests （╯°□°）╯︵ ┻━┻';
                    }
                });
            },
            runTest:function () {
                q(this.n).popover('show');
                doh.is(1, q('.popover').length);
                doh.is('@fat', q('.popover .popover-title').text());
                doh.is('loves writing tests （╯°□°）╯︵ ┻━┻', q('.popover .popover-content').text());
                q(this.n).popover('hide');
                doh.is(0, q('.popover').length);
            },
            tearDown:function () { domConstruct.destroy(this.n); }
        },
        "should get title and content from attributes":{
            setUp:function () {
                this.n = domConstruct.place(popoverHtml2, document.body);
                domAttr.set(this.n, {
                    'data-animation': 'false',
                    'data-content': 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻',
                    'title': '@mdo'
                });
            },
            runTest:function () {
                q(this.n).popover('show');
                doh.is(1, q('.popover').length);
                doh.is('@mdo', q('.popover .popover-title').text());
                doh.is('loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', q('.popover .popover-content').text());
                q(this.n).popover('hide');
                doh.is(0, q('.popover').length);
            },
            tearDown:function () { domConstruct.destroy(this.n); }
        }
    });
});
