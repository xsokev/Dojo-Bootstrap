/* ==========================================================
 * _ListWidget.js v2.0.0
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
    "dojo/dom-class",
    "dojo/NodeList-traverse"
], function (support, declare, lang, array, query, on, domClass) {
    "use strict";

    // module:
    //      _ListWidget
    var _next = function () {
            var active = query('.active', this.list);
            active.removeClass('active');
            var next = active.next();
            if(next[0] && domClass.contains(next[0], "divider")){
                next = next.next();
            }

            if (!next.length) {
                next = query('li', this.list).first();
            }
            next.addClass('active');
        },
        _prev = function () {
            var active = query('.active', this.list);
            active.removeClass('active');
            var prev = active.prev();
            if(prev[0] && domClass.contains(prev[0], "divider")){
                prev = prev.prev();
            }

            if (!prev.length) {
                prev = query('li', this.list).last();
            }
            prev.addClass('active');
        },
        _move = function (e) {
            if (!this.shown) { return; }
            var code = e.charCode || e.keyCode;
            switch(code) {
                case 9: // tab
                case 13: // enter
                case 27: // escape
                    e.preventDefault();
                    break;

                case 38: // up arrow
                    e.preventDefault();
                    _prev.call(this);
                    break;

                case 40: // down arrow
                    e.preventDefault();
                    _next.call(this);
                    break;
            }
            e.stopPropagation();
        },
        _keyup = function (e) {
            var code = e.charCode || e.keyCode;
            switch(code) {
                case 40: // down arrow
                case 38: // up arrow
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                    break;
                case 9: // tab
                case 13: // enter
                    this.emit("list-enter", e);
                    _select.call(this, e);
                    break;
                case 27: // escape
                    if (!this.shown) { return; }
                    this.emit("list-escape", e);
                    break;

                default:
                    this.emit("list-keyup", e);
            }
        },
        _keydown = function (e) {
            var code = e.charCode || e.keyCode;
            this.suppressKeyPressRepeat = array.indexOf([40,38,9,13,27], code) >= 0;
            _move.call(this, e);
        },
        _keypress = function (e) {
            if (this.suppressKeyPressRepeat) { return; }
            _move.call(this, e);
        },
        _click = function (e) {
            _select.call(this, e);
        },
        _mouseenter = function (e) {
            var li = query(e.target).closest('li');
            query('.active', this.list).removeClass('active');
            li.addClass('active');
        },
        _select = function (e) {
            console.log(e);
            console.log(this);
            var li = query('.active', this.list)[0];
            this.emit('list-select', lang.mixin(e || {}, { selected: li }));
            if(this.preventDefault){
                e.stopPropagation();
                e.preventDefault();
            }
        };

    // summary:
    //      Bootstrap widget module for handling list actions
    return declare("_ListWidget", null, {
        initializeList: function(){
            if(this.domNode.tagName === "INPUT"){
                this.own(on(this.domNode, 'keypress', lang.hitch(this, _keypress)));
                this.own(on(this.domNode, 'keyup', lang.hitch(this, _keyup)));
                if(support.eventSupported(this.domNode, "keydown")) {
                    this.own(on(this.domNode, 'keydown', lang.hitch(this, _keydown)));
                }
            } else if(domClass.contains(this.domNode, "dropdown")) {
                var _this = this;
                this.own(on(document, 'keypress, keydown', function(e){
                    var code = e.charCode || e.keyCode;
                    if(_this.shown && array.indexOf([40,38,9,13,27], code) >= 0){
                        _move.call(_this, e);
                    }
                }));
                this.own(on(document, 'keyup', lang.hitch(this, _keyup)));
            }

            this.own(on(this.list, 'click', lang.hitch(this, _click)));
            this.own(on(this.list, on.selector('li', 'mouseover'), lang.hitch(this, _mouseenter)));
        }
    });
});