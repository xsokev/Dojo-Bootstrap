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
        // summary:
        //      Bootstrap base widget module for handling lists.
        // description:
        //      Bootstrap base widget module for handling lists. Should not be used alone. This is an
        //      abstract widget that should be implemented by another widget. Be sure to call the
        //      _initListEvents during widget initialization.
        //
        //      ## Events ##
        //      If this implementing widget is Evented, the module will emit events for various actions.
        //
        //		Call `widget.on("list-enter", func)` to monitor when the enter key is pressed on a list.
        //
        //		Call `widget.on("list-escape", func)` to monitor when the escape key is pressed on a list.
        //
        //		Call `widget.on("list-keyup", func)` to monitor when a key other than enter, escape, tab,
        //      shift, alt, ctrl or any arrow key is pressed on a list.
        //
        //		Call `widget.on("list-select", func)` to monitor when a list item is selected. Returns
        //      event.selected.
        //

        // hoverClass: String
        //      class to use when items receive hover
        hoverClass: "hover",

        // activeClass: String
        //      class to use when making items active
        activeClass: "active",

        _initListEvents: function(){
            // summary:
            //      initialize events for navigating through the list items
            // description:
            //      Initializes events for keypress, keyup, keydown (if supported),
            //      click and mouseover. To support focusing on list items, each
            //      anchor is given a tabindex attribute if one doesn't exist.
            // tags:
            //      protected extension
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

        _select: function (/*HTMLElement*/ li) {
            // summary:
            //      Selects element passed in as parameter.
            // description:
            //      Removes selection of current list item and selects the list item passed in.
            //      Emits list-select event and passes selected list item with event.selected.
            // tags:
            //      protected
            // li:
            //      the list item to make active and emit to watchers.
            if(!li){ return; }
            query('.'+this.activeClass, this.domNode).removeClass(this.activeClass);
            query('.'+this.hoverClass, this.domNode).removeClass(this.hoverClass);
            domClass.add(li, this.activeClass);
            this.emit && this.emit('list-select', lang.mixin({ selected: li }));
        },

        _next: function (/*Boolean?*/ suppressFocus) {
            // summary:
            //      Moves the selection to the next item in the list.
            // tags:
            //      protected
            // suppressFocus:
            //      used to suppress focusing on list item when making the list item active.
            _traverse.call(this, "next", "_first", suppressFocus);
        },

        _prev: function (/*Boolean?*/ suppressFocus) {
            // summary:
            //      Moves the selection to the prev item in the list.
            // tags:
            //      protected
            // suppressFocus:
            //      used to suppress focusing on list item when making the list item active.
            _traverse.call(this, "prev", "_last", suppressFocus);
        },

        _first: function(/*Boolean?*/ suppressFocus) {
            // summary:
            //      Moves the selection to the first item in the list.
            // tags:
            //      protected
            // suppressFocus:
            //      used to suppress focusing on list item when making the list item active.
            var active = this._getActive();
            if(active){ domClass.remove(active, this.activeClass); }
            var prev = query('li', this.domNode).first();
            if(prev[0] && _isSelectableListItem(prev[0])){
                prev = prev.next();
            }
            prev.addClass(this.activeClass);
            !suppressFocus && prev.query("a")[0] && prev.query("a")[0].focus();
        },

        _last: function(/*Boolean?*/ suppressFocus) {
            // summary:
            //      Moves the selection to the last item in the list.
            // tags:
            //      protected
            // suppressFocus:
            //      used to suppress focusing on list item when making the list item active.
            var active = this._getActive();
            if(active){ domClass.remove(active, this.activeClass); }
            var next = query('li', this.domNode).last();
            if(next[0] && _isSelectableListItem(next[0])){
                next = next.prev();
            }
            next.addClass(this.activeClass);
            !suppressFocus && next.query("a")[0] && next.query("a")[0].focus();
        },

        _move: function (/*Object*/ e, /*Boolean?*/ suppressFocus) {
            // summary:
            //      Changes the selected item based on pressed key.
            // tags:
            //      protected
            // suppressFocus:
            //      used to suppress focusing on list item when making the list item active.
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

        _keyup: function (/*Object*/ e) {
            // summary:
            //      Handles keyup event.
            // description:
            //      Suppresses all keys that involve moving the selection. Emits list-enter event
            //      on object selection using the Tab and Enter keys. Emits list-escape on
            //      selection of Escape key. Emits list-keyup event for all other keys.
            // tags:
            //      protected
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

        _keydown: function (/*Object*/ e) {
            // summary:
            //      Calls _move on keydown.
            // tags:
            //      protected
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

        _keypress: function (/*Object*/ e) {
            // summary:
            //      calls _move on keypress.
            // tags:
            //      protected
            if (this.suppressKeyPressRepeat) { return; }
            this._move(e);
        },

        _getActive: function() {
            // summary:
            //      Get the current active list item.
            // description:
            //      Looks through the list of items and finds the item with class equal to
            //      .active and .hover. If a .active is found, the first one is returned.
            //      Otherwise, if .hover is found, the first one is returned. If neither
            //      is found, null is returned.
            // tags:
            //      protected
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
            return active;  //return Object
        }
    });
});