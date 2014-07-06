define([
  'intern!object',
  'intern/chai!assert',
  'dojo/on',
  'dojo/query',
  'dojo/dom-construct',
  'bootstrap/Tab'
], function (registerSuite, assert, on, query, domConstruct) {

  var contentHtml = '<ul><li id="home"></li><li id="profile"></li></ul>';
  var tabsHTML = '<ul class="tabs">' +
    '<li><a href="#home">Home</a></li>' +
    '<li><a href="#profile">Profile</a></li>' +
    '</ul>';
  var pillsHTML = '<ul class="pills">' +
    '<li><a href="#home">Home</a></li>' +
    '<li><a href="#profile">Profile</a></li>' +
    '</ul>';
  var tabsNode;
  var contentNode;

  registerSuite({
    name: 'tabs',

    'should be defined on NodeList object':function () {
        assert.ok(query(document.body).tab);
    },

    'should return element':function () {
        assert.ok(document.body, query(document.body).tab()[0]);
    },

    'should activate element by tab id': {
      setup:function () {
        tabsNode = domConstruct.place(tabsHTML, document.body);
        contentNode = domConstruct.place(contentHtml, document.body);
      },
      runTest:function () {
        query('a[href="#home"]', tabsNode).tab('show');
        assert.strictEqual(1, query('.active', contentNode).length, 'only one selected tab');
        assert.strictEqual('home', query('.active', contentNode)[0].id);
        query('a[href="#profile"]', tabsNode).tab('show');
        assert.strictEqual(1, query('.active', contentNode).length);
        assert.strictEqual('profile', query('.active', contentNode)[0].id);
      },
      teardown:function () {
        domConstruct.destroy(tabsNode);
        domConstruct.destroy(contentNode);
      }
    },
    'should activate element by tab id (pills)': {
      setup:function () {
        tabsNode = domConstruct.place(pillsHTML, document.body);
        contentNode = domConstruct.place(contentHtml, document.body);
      },
      runTest:function () {
        query('a[href="#home"]', tabsNode).tab('show');
        assert.strictEqual(1, query('.active', contentNode).length, 'only one selected pill');
        assert.strictEqual('home', query('.active', contentNode)[0].id);
        query('a[href="#profile"]', tabsNode).tab('show');
        assert.strictEqual(1, query('.active', contentNode).length);
        assert.strictEqual('profile', query('.active', contentNode)[0].id);
      },
      teardown:function () {
        domConstruct.destroy(tabsNode);
        domConstruct.destroy(contentNode);
      }
    },
    'should not fire closed when close is prevented': {
      setup:function () { tabsNode = domConstruct.place(tabsHTML, document.body); },
      runTest:function () {
        var dfd = this.async(1000);
        query(tabsNode).on('show.bs.tab', dfd.callback(function (e) {
          // NOTE: I don't think this test actually works
          // if you comment out the next line, this test still passes
          e.preventDefault();
          assert.ok(true);
        }));
        query(tabsNode).on('shown.bs.tab', dfd.callback(function (/*e*/) {
          assert.ok(false);
        }));
        query(tabsNode).tab('show');
      },
      teardown:function () { domConstruct.destroy(tabsNode); }
    }
  });
});
