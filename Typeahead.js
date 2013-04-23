/* ==========================================================
 * TypeAhead.js v2.0.0
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
    "./List",
    "./_ListInputBase",
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/dom-geometry",
    "dojo/NodeList-manipulate"
], function (support, ListWidget, _ListInputBase, _BootstrapWidget, declare, query, on, lang, array, domAttr, domClass, domStyle, domConstruct, domGeom) {

    // module:
    //      Typeahead

    var _menuTemplate = '<ul class="typeahead dropdown-menu"></ul>',
        _menuItemTemplate = '<li><a href="#"></a></li>',
        _defaultFunctions = {
            updater: function (item) {
                return item;
            },
            highlighter: function (item) {
                var query = this._query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                return item.toString().replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                    return '<strong>' + match + '</strong>';
                });
            },
            matcher: function (item) {
                return (item.toString().toLowerCase().indexOf(this._query.toLowerCase()))+1;
            },
            sorter: function (items) {
                var beginsWith = [],
                    caseSensitive = [],
                    caseInsensitive = [],
                    item;

                while (item = items.shift()) {
                    if (!item.toString().toLowerCase().indexOf(this._query.toString().toLowerCase())) { beginsWith.push(item); }
                    else if (item.toString().indexOf(this._query) >= 0) { caseSensitive.push(item); }
                    else { caseInsensitive.push(item); }
                }
                return beginsWith.concat(caseSensitive, caseInsensitive);
            }
        },
        _blur = function () {
            var _this = this;
            setTimeout(function () { _this.hide(); }, 150);
        },
        _select = function(e){
            var li = e.selected;
            this.domNode.value = this.updater(domAttr.get(li, 'data-value'));
            this.emit('change', { });
            return this.hide();
        },
        _keyup = function(e){ this.lookup(e); };
    // summary:
    //      Attach event to dismiss this alert if an immediate child-node has class="close"
    return declare("TypeAhead", [_BootstrapWidget, _ListInputBase], {
        preventDefault: true,

        // source: Array
        //          data provided to the TypeAhead for display in the list
        source: [],
        _setSourceAttr: function(val){
            this._set("source", val);
        },

        // items: Number
        //          number of items to display in the type ahead list
        items: 8,

        // minLength: Number
        //          number of characters allowed before displaying the list
        minLength: 1,

        // matcher: function
        //
        matcher: _defaultFunctions.matcher,

        // sorter: function
        //
        sorter: _defaultFunctions.sorter,

        // highlighter: function
        //
        highlighter: _defaultFunctions.highlighter,

        // updater: function
        //
        updater: _defaultFunctions.updater,

        hoverClass: "active",

        postCreate:function () {
            // summary:
            //
            // tags:
            //		private
            this.listNode = domConstruct.toDom(_menuTemplate);
            this.hide();
            domConstruct.place(this.listNode, document.body);
            if(this.listNode){
                this.list = new ListWidget({ hoverClass: this.hoverClass }, this.listNode);
                this.own(on(this.list, 'list-select', lang.hitch(this, _select)));
            }
            this.own(on(this, 'list-escape', lang.hitch(this, "hide")));
            this.own(on(this, 'list-keyup', lang.hitch(this, _keyup)));
            this.own(on(this.domNode, 'blur', lang.hitch(this, _blur)));
            this.inherited(arguments);
        },

        show: function () {
            var pos = domGeom.position(this.domNode, true);
            domStyle.set(this.listNode, {
                top: (pos.y + this.domNode.offsetHeight)+'px',
                left: pos.x+'px',
                display: 'block'
            });
            this.shown = true;
            return this;
        },

        hide: function () {
            domStyle.set(this.listNode, 'display', 'none');
            this.shown = false;
            return this;
        },

        lookup: function () {
            var items;
            this._query = this.domNode.value;
            if (!this._query || this._query.length < this.minLength) {
                return this.shown ? this.hide() : this;
            }
            items = (typeof this.source === 'function') ? this.source(this._query, lang.hitch(this, 'process')) : this.source;
            return items ? this.process(items) : this;
        },

        process: function (items) {
            items = array.filter(items, function (item) {
                return this.matcher(item);
            }, this);
            items = this.sorter(items);
            if (!items.length) {
                return this.shown ? this.hide() : this;
            }
            this.render(items.slice(0, this.items)).show();
        },

        render: function (items) {
            items = array.map(items, function (item, i) {
                var li = domConstruct.toDom(_menuItemTemplate);
                domAttr.set(li, 'data-value', item);
                query('a', li).html(this.highlighter(item));
                if (i === 0) { domClass.add(li, 'active'); }
                return li.outerHTML;
            }, this);
            query(this.listNode).html(items.join(''));
            return this;
        }
    });
});