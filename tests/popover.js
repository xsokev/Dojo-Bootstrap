define([
  'intern!object',
  'intern/chai!assert',
  'dojo/on',
  'dojo/query',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-attr',
  'bootstrap/Support',
  'bootstrap/Popover',
  'dojo/NodeList-manipulate'
], function (registerSuite, assert, on, query, domConstruct, domClass, domAttr, support) {

  var target;
  var contentNode;

  registerSuite({
    name: 'collapse',

    'should be defined on NodeList object':function () {
        assert.ok(query(document.body).popover);
    },

    'should return element':function() {
      assert.strictEqual(document.body, query(document.body).popover()[0]);
    },

    'should render popover element': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>', document.body);
      },
      runTest: function() {
        var popover = query(contentNode).popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover removed');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should store popover instance in popover data object': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>', document.body);
      },
      runTest: function() {
        var popover = query(contentNode).popover();
        assert.ok(!!support.getData(popover, 'bs.popover'), 'popover instance exists');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should store popover trigger in popover instance object': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#" title="ResentedHook">@ResentedHook</a>', document.body);
      },
      runTest: function() {
        /*var popover = */query(contentNode).popover('show');
        assert.ok(!!support.getData(query('.popover')[0], 'bs.popover'), 'popover trigger stored in instance data');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should get title and content from options': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#">@fat</a>', document.body);
      },
      runTest: function() {
       var popover = query(contentNode).popover({
          title: function () {
            return '@fat';
          },
          content: function () {
            return 'loves writing tests （╯°□°）╯︵ ┻━┻';
          }
        });
        popover.popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        assert.strictEqual(query('.popover .popover-title').text(), '@fat', 'title correctly inserted');
        assert.strictEqual(query('.popover .popover-content').text(), 'loves writing tests （╯°□°）╯︵ ┻━┻', 'content correctly inserted');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover removed');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should get title and content from attributes': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>', document.body);
      },
      runTest: function() {
       var popover = query(contentNode).popover().popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        assert.strictEqual(query('.popover .popover-title').text(), '@mdo', 'title correctly inserted');
        assert.strictEqual(query('.popover .popover-content').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover removed');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should get title and content from attributes #2': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>', document.body);
      },
      runTest: function() {
        var popover = query(contentNode).popover({
          title: 'ignored title option',
          content: 'ignored content option'
        }).popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        assert.strictEqual(query('.popover .popover-title').text(), '@mdo', 'title correctly inserted');
        assert.strictEqual(query('.popover .popover-content').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover removed');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should not duplicate HTML object': {
     setup: function() {
        support.trans = false;
        target = domConstruct.place('<a href="#">@fat</a>', document.body);
        contentNode = domConstruct.place('<div>', document.body);
      },
      runTest: function() {
        var $div = query(contentNode).html('loves writing tests （╯°□°）╯︵ ┻━┻</div>');
        var popover = query(target).popover({
          content: function() {
            return $div.html();
          }
        });
        popover.popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        assert.strictEqual(query('.popover .popover-content').html(), $div.html(), 'content correctly inserted');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover was removed');
        popover.popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        assert.strictEqual(query('.popover .popover-content').html(), $div.html(), 'content correctly inserted');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover was removed');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should respect custom classes': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<a href="#">@fat</a>', document.body);
      },
      runTest: function() {
        var popover = query(contentNode).popover({
          title: 'Test',
          content: 'Test',
          template: '<div class="popover foobar"><div class="arrow"></div><div class="inner"><h3 class="title"></h3><div class="content"><p></p></div></div></div>'
        });
        popover.popover('show');
        assert.ok(query('.popover').length, 'popover was inserted');
        assert.ok(domClass.contains(query('.popover')[0], 'foobar'), 'custom class is present');
        popover.popover('hide');
        assert.ok(!query('.popover').length, 'popover removed');
      },
      teardown: function() {
        document.body.innerHTML = '';
        support.trans = true;
      }
    },

    'should destroy popover': {
      setup: function() {
        // support.trans = false;
        contentNode = domConstruct.place('<div/>', document.body);
      },
      runTest: function() {
        var popover = query(contentNode).popover({
          trigger: 'hover'
        });
        popover.on('click.foo', function() {});
        // NOTE: tests of .data() need to test first element
        assert.ok(popover.data('bs.popover')[0], 'popover has data');
        // TODO: not sure how to test for existence of event handlers in Dojo
        // ok($._data(popover[0], 'events').mouseover && $._data(popover[0], 'events').mouseout, 'popover has hover event')
        // ok($._data(popover[0], 'events').click[0].namespace == 'foo', 'popover has extra click.foo event')
        popover.popover('show');
        popover.popover('destroy');
        // NOTE: tests of .data() need to test first element
        assert.ok(!domClass.contains(popover[0], 'in'), 'popover is hidden');
        // TODO: shouldn't this be bs.popover?
        assert.ok(!popover.data('popover')[0], 'popover does not have data');
        // ok(!popover.data('popover'), 'popover does not have data')
        // TODO: not sure how to test for existence of event handlers in Dojo
        // ok($._data(popover[0], 'events').click[0].namespace == 'foo', 'popover still has click.foo')
        // ok(!$._data(popover[0], 'events').mouseover && !$._data(popover[0], 'events').mouseout, 'popover does not have any events')
      },
      teardown: function() {
        document.body.innerHTML = '';
        //support.trans = true;
      }
    }

  });
});
