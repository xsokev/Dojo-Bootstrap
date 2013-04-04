/* ==========================================================
 * Tab.js v2.0.0
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
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/NodeList-traverse"
], function (support, _BootstrapWidget, declare, query, on, lang, domClass, domAttr) {
    "use strict";

    // module:
    //      Tab

    var _tabSelector = '[data-toggle=tab], [data-toggle=pill], a[href]',
        _activate = function (element, container, callback) {
            var active = query('> .active', container)[0];
            var transOut = support.trans && domClass.contains(active, 'fade') && domClass.contains(active, 'in');
            var transIn = support.trans && domClass.contains(element, 'fade');
            var next = lang.hitch(this, function() {
                    domClass.remove(active, 'active');
                    query('> .dropdown-menu > .active', active).removeClass('active');
                    domClass.add(element, 'active');

                    if (transIn) {
                        this._elementOffset = element.offsetWidth;
                        domClass.add(element, 'in');
                    }

                    if (query(element).parent('.dropdown-menu')[0]) {
                        query(element).closest('li.dropdown').addClass('active');
                    }
                    if (callback) { callback(); }
                });

            if (transOut) {
                on.once(active, support.trans.end, next);
            } else { next(); }
            domClass.remove(active, 'in');
        };


    // summary:
    //      Activates a tab element and content container. Tab should have either a data-target or an href targeting a container node in the DOM.
    return declare("Tab", [_BootstrapWidget], {
        postCreate:function () {
            var _this = this;
            this.own(on(this.domNode, on.selector(_tabSelector, "click"), function(e){
                if(e){ e.preventDefault(); }
                _this.show(this);
            }));
        },

        show: function(elm) {
            if(typeof elm === "number"){
                elm = query("li > a", this.domNode)[elm];
            }
            var li = query(elm).parent('li')[0];
            if(li && domClass.contains(li, 'active')) { return; }
            var previous = query('.active a', this.domNode).last()[0];

            this.emit('show', lang.mixin(support.eventObject, {relatedTarget:previous, target: elm}));

            if (li && !domClass.contains(li, 'active')) {
                _activate.call(this, li, this.domNode);
            }

            var selector = domAttr.get(elm, 'data-target');
            if (!selector) {
                selector = support.hrefValue(elm);
            }
            var target;
            if (selector && selector !== '#' && selector !== '') {
                target = query(selector);
                if (target[0] && target.parent()[0]) {
                    _activate.call(this, target[0], target.parent()[0], lang.hitch(this, function () {
                        this.emit('shown', lang.mixin(support.eventObject, {relatedTarget:previous, target: elm}));
                    }));
                }
            }
        }
    });
});