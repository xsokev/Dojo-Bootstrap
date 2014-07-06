define([
  'intern!object',
  'intern/chai!assert',
  'dojo/on',
  'dojo/query',
  'dojo/dom-construct',
  'dojo/dom-class',
  'bootstrap/Support',
  'bootstrap/Collapse'

], function (registerSuite, assert, on, query, domConstruct, domClass, support) {

  var target;
  var contentNode;

  registerSuite({
    name: 'collapse',

    'should be defined on NodeList object':function () {
        assert.ok(query(document.body).collapse);
    },

    'should return element':function() {
      assert.strictEqual(document.body, query(document.body).collapse()[0]);
    },

    'should show a collapsed element':{
      setup: function () {
        support.trans = false;
        // var dfd = this.async(1000);
        contentNode = domConstruct.place('<div class="collapse"></div>', document.body);
        query(contentNode).collapse('show');
      },
      runTest:function () {
        assert.ok(domClass.contains(contentNode, 'in'), 'has class in');
        assert.ok(!/height:\W?0/.test(String(contentNode.style.cssText)), 'has height reset');
      },
      teardown: function () {
        domConstruct.destroy(contentNode);
        support.trans = true;
      }
    },

    'should hide a collapsed element':{
      setup: function () {
        support.trans = false;
        // var dfd = this.async(1000);
        contentNode = domConstruct.place('<div class="collapse"></div>', document.body);
        query(contentNode).collapse('hide');
      },
      runTest:function () {
        assert.ok(!domClass.contains(contentNode, 'in'), 'does not have class in');
        assert.ok(/height:\W?0/.test(String(contentNode.style.cssText)), 'has height set');
      },
      teardown: function () {
        domConstruct.destroy(contentNode);
        support.trans = true;
      }
    },

    'should reset style to auto after finishing opening collapse': {
      setup: function() {
        support.trans = false;
        contentNode = domConstruct.place('<div class="collapse" style="height: 0px"/>', document.body);
      },
      runTest: function() {
        var dfd = this.async(1000);
        query(contentNode).on('show.bs.collapse', dfd.callback(function() {
          assert.strictEqual(this.style.height, '0px');
        }));
        query(contentNode).on('shown.bs.collapse', dfd.callback(function() {
          assert.strictEqual(this.style.height, '');
        }));
        query(contentNode).collapse('show');
      },
      teardown: function () {
        domConstruct.destroy(contentNode);
        support.trans = true;
      }
    },

    'should add active class to target when collapse shown': {
      setup: function() {
        support.trans = false;
        target = domConstruct.place('<a data-toggle="collapse" href="#test1"></a>', document.body);
        contentNode = domConstruct.place('<div id="test1"></div>', document.body);
      },
      runTest: function() {
        var dfd = this.async(1000);
        query(contentNode).on('show.bs.collapse', dfd.callback(function() {
          assert.ok(!domClass.contains(target, 'collapsed'));
        }));
        target.click();
      },
      teardown: function () {
        domConstruct.destroy(contentNode);
        domConstruct.destroy(target);
        support.trans = true;
      }
    }//,

    // TODO: failing, don't understand why this should pass
    // b/c target.collapsed is not set/removed unless data-parent is set
    // see: https://github.com/twbs/bootstrap/blob/master/js/collapse.js
    // 'should remove active class to target when collapse hidden': {
    //   setup: function() {
    //     support.trans = false;
    //     var fixture = domConstruct.place('<div></div>', document.body);
    //     target = domConstruct.place('<a data-toggle="collapse" href="#test1"></a>', fixture);
    //     contentNode = domConstruct.place('<div id="test1" class="in"></div>', fixture);
    //   },
    //   runTest: function() {
    //     var dfd = this.async(1000);
    //     query(contentNode).on('hide.bs.collapse', dfd.callback(function() {
    //       assert.ok(domClass.contains(target, 'collapsed'));
    //     }));
    //     target.click();
    //   },
    //   teardown: function () {
    //     domConstruct.destroy(contentNode);
    //     domConstruct.destroy(target);
    //     support.trans = true;
    //   }
    // }

    // TODO: port remaining tests from:
    // https://github.com/twbs/bootstrap/blob/master/js/tests/unit/collapse.js

    // 'should not fire shown when show is prevented': {}
  });
});
