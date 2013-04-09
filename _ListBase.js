/* ==========================================================
 * _ListBase.js v2.0.0
 * ==========================================================
 * Copyright 2012 xsokev
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

define([
    "./Support",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/keys",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/NodeList-traverse"
], function (support, declare, lang, array, query, on, keys, domClass, domAttr) {
    "use strict";

    // module:
    //      _ListBase
    var _click = function (e) {
            var li = query(e.target).closest('li');
            this._select(li[0]);
            if(this.preventDefault){
                e.stopPropagation();
                e.preventDefault();
            }
        },
        _mouseenter = function (e) {
            var li = query(e.target).closest('li');
            query('.'+this.hoverClass, this.domNode).removeClass(this.hoverClass);
            li.addClass(this.hoverClass);
        },
        _isSelectableListItem = function(li){
            return domClass.contains(li, "nav-header") || domClass.contains(li, "divider");
        },
        _traverse = function(dir, fallback, suppressFocus){
            var active = this._getActive();
            if(!active){ return this[fallback](); }
            domClass.remove(active, this.activeClass);
            var target = query(active)[dir]();
            if(target[0] && _isSelectableListItem(target[0])){ target = target[dir](); }
            if (!target.length) {
                target = query('li', this.domNode)[dir === "prev" ? "last" : "first"]();
                if(target[0] && _isSelectableListItem(target[0])){ target = target[dir](); }
            }
            target.addClass(this.activeClass);
            !suppressFocus && target.query("a")[0] && target.query("a")[0].focus();
        };

    return declare("_ListBase", null, {
        /* summary:
              Bootstrap base widget module for handling lists. Should not be used alone. This is an
              abstract widget that should be implemented by another widget. Be sure to call the
              _initListEvents during widget initialization.
              If this implementing widget is Evented, the module will emit events for various actions.
        */

        // list-enter: [callback]
        //      Event fires when enter is pressed while list has focus
        // list-escape: [callback]
        //      Event fires when escape is pressed while list has focus
        // list-keyup: [callback]
        //      Event fires when a keyup event is triggered on a list item
        // list-select: [callback]
        //      Event fires when a list item is selected

        // hoverClass: String
        //      class to use when items receive hover
        hoverClass: "hover",

        // activeClass: String
        //      class to use when making items active
        activeClass: "active",

        _initListEvents: function(){
            // summary:
            //      initialize events for navigating through the list items
            query("li", this.domNode).filter(function(li){
                return !_isSelectableListItem(li);
            }).map(function(li){
                return query("a", li)[0];
            }).forEach(function(a){
                if(domAttr.get(a, "tabindex")){ return; }
                domAttr.set(a, "tabindex", -1);
            });
            this.own(on(this.domNode, 'keypress', lang.hitch(this, "_keypress")));
            this.own(on(this.domNode, 'keyup', lang.hitch(this, "_keyup")));
            if(support.eventSupported(this.domNode, "keydown")) {
                this.own(on(this.domNode, 'keydown', lang.hitch(this, "_keydown")));
            }
            this.own(on(this.domNode, 'click', lang.hitch(this, _click)));
            this.own(on(this.domNode, on.selector('li', 'mouseover'), lang.hitch(this, _mouseenter)));
        },

        _select: function (li) {
            if(!li){ return; }
            // summary:
            //      internal function for selecting a list item
            query('.'+this.activeClass, this.domNode).removeClass(this.activeClass);
            query('.'+this.hoverClass, this.domNode).removeClass(this.hoverClass);
            domClass.add(li, this.activeClass);
            this.emit && this.emit('list-select', lang.mixin({ selected: li }));
        },

        _next: function (suppressFocus) {
            _traverse.call(this, "next", "_first", suppressFocus);
        },

        _prev: function (suppressFocus) {
            _traverse.call(this, "prev", "_last", suppressFocus);
        },

        _first: function(suppressFocus) {
            var active = this._getActive();
            if(active){ domClass.remove(active, this.activeClass); }
            var prev = query('li', this.domNode).first();
            if(prev[0] && _isSelectableListItem(prev[0])){
                prev = prev.next();
            }
            prev.addClass(this.activeClass);
            !suppressFocus && prev.query("a")[0] && prev.query("a")[0].focus();
        },

        _last: function(suppressFocus) {
            var active = this._getActive();
            if(active){ domClass.remove(active, this.activeClass); }
            var next = query('li', this.domNode).last();
            if(next[0] && _isSelectableListItem(next[0])){
                next = next.prev();
            }
            next.addClass(this.activeClass);
            !suppressFocus && next.query("a")[0] && next.query("a")[0].focus();
        },

        _move: function (e, suppressFocus) {
            var code = e.charCode || e.keyCode;
            switch(code) {
                case keys.TAB:
                case keys.ENTER:
                case keys.ESCAPE:
                    e.preventDefault();
                    break;
                case keys.UP_ARROW:
                case keys.UP_DPAD:
                    e.preventDefault();
                    this._prev(suppressFocus);
                    break;
                case keys.DOWN_ARROW:
                case keys.DOWN_DPAD:
                    e.preventDefault();
                    this._next(suppressFocus);
                    break;
                case keys.PAGE_UP:
                    e.preventDefault();
                    this._first(suppressFocus);
                    break;
                case keys.PAGE_DOWN:
                    e.preventDefault();
                    this._last(suppressFocus);
                    break;
            }
            e.stopPropagation();
        },

        _keyup: function (e) {
            var code = e.charCode || e.keyCode;
            switch(code) {
                case keys.PAGE_UP:
                case keys.PAGE_DOWN:
                case keys.DOWN_ARROW:
                case keys.DOWN_DPAD:
                case keys.UP_ARROW:
                case keys.UP_DPAD:
                case keys.SHIFT:
                case keys.CTRL:
                case keys.ALT:
                    break;
                case keys.TAB:
                case keys.ENTER:
                    this.emit && this.emit("list-enter", e);
                    var active = this._getActive();
                    this._select(active);
                    if(this.preventDefault){
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    break;
                case keys.ESCAPE:
                    this.emit && this.emit("list-escape");
                    break;

                default:
                    this.emit && this.emit("list-keyup", e);
            }
        },

        _keydown: function (e) {
            var code = e.charCode || e.keyCode;
            this.suppressKeyPressRepeat = array.indexOf([
                keys.DOWN_ARROW,
                keys.DOWN_DPAD,
                keys.UP_ARROW,
                keys.UP_DPAD,
                keys.TAB,
                keys.ENTER,
                keys.ESCAPE
            ], code) >= 0;
            this._move(e);
        },

        _keypress: function (e) {
            if (this.suppressKeyPressRepeat) { return; }
            this._move(e);
        },

        _getActive: function(){
            var items = query("li.active, li.hover", this.domNode);
            var active;
            var actives = array.filter(items, function(item){
                return domClass.contains(item, "active");
            });
            if(actives.length > 0){
                active = actives[0];
            } else if(items.length > 0){
                active = items[0];
            }
            return active;
        }
});
});