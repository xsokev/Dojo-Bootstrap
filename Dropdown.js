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
    "./_BootstrapWidget",
    "./List",
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
], function (_BootstrapWidget, ListWidget, declare, win, lang, array, query, on, domAttr, domClass, registry) {
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

    return declare("Dropdown", [_BootstrapWidget], {
        // summary:
        //      Adds dropdown support to elements.
        // description:
        //      Handles the visibility of the dropdown. Provides events for dropdown list
        //      item selection.
        //
        //      ## Events ##
        //		Call `widget.on("select", func)` to monitor when a dropdown list item is
        //      selected. Returns event.selectedItem.
        //
        // example:
        // |    <input value="21-12-2012" class="date" type="text"
        // |           data-dojo-type="Datepicker" data-dojo-props="format:'dd-M-yyyy'">
        // example:
        // |    <div class="input-append" id="mydate">
        // |        <input value="21-12-2012" class="date" type="text" />
        // |        <span class="add-on"><i class="icon-th"></i></span>
        // |    </div>
        // |    new Datepicker({
        // |        format:'dd-M-yyyy',
        // |        selector: '.add-on',
        // |        trigger: 'click'
        // |    }, dojo.byId("#mydate"));
        // example:
        // |    <button class="btn" id="dateBtn">...</button>
        // |    new Datepicker({
        // |        trigger: 'click'
        // |    }, dojo.byId("#dateBtn"));

        // preventDefault: Boolean
        //          prevent default actions when list items are clicked
        preventDefault: false,

        postCreate:function () {
            // summary:
            //      initializes events needed to display dropdown element. Also initializes list handler.
            // tags:
            //		private extension
            this.toggleNode = query(".dropdown-toggle", this.domNode)[0];
            if(this.toggleNode){
                this.own(on(this.toggleNode, "click, touchstart", lang.hitch(this, "toggle")));
            }
            this.listNode = query(".dropdown-menu", this.domNode)[0];
            if(this.listNode){
                this.list = new ListWidget({}, this.listNode);
                this.own(on(this.list, 'list-select', lang.hitch(this, _select)));
                this.own(on(this.list, 'list-escape', lang.hitch(this, "close")));
            }
            this.own(on(this.domNode, on.selector("form", "click, touchstart"), function (e) { e.stopPropagation(); }));
            this._bodyClickEvent = on(document, 'click', _clearDropdowns);
            this.shown = false;
        },

        toggle: function(e){
            // summary:
            //      toggles the display of the dropdown
            if(this.isDisabled()) { return false; }
            this.isOpen() ? this.close() : this.open();
            if(e){
                e.preventDefault();
                e.stopPropagation();
            }
            return this;
        },

        open: function(){
            // summary:
            //      shows the dropdown. Hides any other displayed dropdowns on the page.
            if(this.isDisabled()) { return false; }
            _clearDropdowns();
            this.isOpen() || domClass.add(this.domNode, 'open');
            this.list._first();
            this.shown = true;
        },

        close: function(){
            // summary:
            //      hides the dropdown.
            if(this.isDisabled()) { return false; }
            this.isOpen() && domClass.remove(this.domNode, 'open');
            this.shown = false;
        },

        isDisabled: function(){
            // summary:
            //      returns whether the dropdown is currently disabled.
            return domClass.contains(this.domNode, "disabled") || domAttr.get(this.domNode, "disabled");    //Boolean
        },

        isOpen: function(){
            // summary:
            //      returns whether the dropdown is currently visible.
            return this.shown;
        }
    });
});