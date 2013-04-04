/* ==========================================================
 * Dropdown.js v2.0.0
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
    "./_ListWidget",
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dojo/_base/window",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dijit/registry",
    "dojo/NodeList-traverse"
], function (support, _ListWidget, _BootstrapWidget, declare, win, lang, array, query, on, domAttr, domClass, registry) {
    "use strict";

    // module:
    //      Dropdown

    var _clearDropdowns = function() {
            array.forEach(_getDropdowns(), function(dropdown){
                dropdown.close();
            });
        },
        _getDropdowns = function(){
            var allWidgets = registry.findWidgets(document.body);
            return array.filter(allWidgets, function(widget){
                return widget instanceof _Dropdown;
            });
        },
        _select = function(e){
            var li = e.selected;
            this.close();
            this.emit("select", { selectedItem: li });
        };

    // summary:
    //      Bootstrap template for creating a widget that uses a template
    var _Dropdown = declare("Dropdown", [_BootstrapWidget, _ListWidget], {
        preventDefault: false,

        postCreate:function () {
            this.toggleNode = query(".dropdown-toggle", this.domNode)[0];
            if(this.toggleNode){
                this.own(on(this.toggleNode, "click, touchstart", lang.hitch(this, "toggle")));
            }
            this.list = query(".dropdown-menu", this.domNode)[0];
            this.initializeList();
            this.own(on(this.domNode, on.selector("form", "click, touchstart"), function (e) { e.stopPropagation(); }));
            this._bodyClickEvent = on(document, 'click', _clearDropdowns);
            this.own(on(this, 'list-select', lang.hitch(this, _select)));
            this.own(on(this, 'list-escape', lang.hitch(this, "close")));
            this.shown = false;
        },

        toggle: function(e){
            if(this.isDisabled()) { return false; }
            this.isOpen() ? this.close() : this.open();
            if(e){
                e.preventDefault();
                e.stopPropagation();
            }
            return this;
        },

        open: function(){
            if(this.isDisabled()) { return false; }
            _clearDropdowns();
            this.isOpen() || domClass.add(this.domNode, 'open');
            this.domNode.focus();
            this.shown = true;
        },

        close: function(){
            if(this.isDisabled()) { return false; }
            this.isOpen() && domClass.remove(this.domNode, 'open');
            this.shown = false;
        },

        isDisabled: function(){
            return domClass.contains(this.domNode, "disabled") || domAttr.get(this.domNode, "disabled");
        },

        isOpen: function(){
            return this.shown;
        }
    });
    return _Dropdown;
});