/* ==========================================================
 * Dropdown.js v0.0.1
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
    'bootstrap/Support',
    "dojo/_base/declare",
    "dojo/query",
    "dojo/_base/lang",
    'dojo/_base/window',
    'dojo/on',
    'dojo/dom-class',
    "dojo/dom-attr",
    "dojo/NodeList-dom",
    'dojo/NodeList-traverse',
    "dojo/domReady!"
], function (support, declare, query, lang, win, on, domClass, domAttr) {
    "use strict";

    var toggleSelector = '[data-toggle="dropdown"]';
    var Dropdown = declare([], {
        defaultOptions:{},
        constructor:function (element, options) {
            this.options = lang.mixin(lang.clone(this.defaultOptions), (options || {}));
            var el = query(element).closest(toggleSelector);
            if (!el[0]) {
                el = query(element);
            }
            if (el) {
                domAttr.set(el[0], "data-toggle", "dropdown");
            }
        }
    });

    function toggle(e) {
        var _this = this;
        if (domClass.contains(_this, "disabled") || domAttr.get(_this, "disabled")) {
            return false;
        }
        var selector = domAttr.get(_this, 'data-target');
        if (!selector) {
            selector = domAttr.get(_this, "href");
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var targetNode = query(_this).parent()[0];
        if (selector && selector !== '#' && selector !== '') {
            targetNode = query(selector).parent()[0];
        }
        if (targetNode) {
            var isActive = domClass.contains(targetNode, 'open');
            clearMenus();
            if (!isActive) {
                domClass.toggle(targetNode, 'open');
            }
        }

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function clearMenus() {
        query(toggleSelector).parent().removeClass('open');
    }

    lang.extend(query.NodeList, {
        dropdown:function (option) {
            var options = (lang.isObject(option)) ? option : {};
            return this.forEach(function (node) {
                var data = support.getData(node, 'dropdown');
                if (!data) {
                    support.setData(node, 'dropdown', (data = new Dropdown(node, options)));
                }
                if (lang.isString(option) && lang.exists(data[option])) {
                    data[option].call(data);
                }
            });
        }
    });
    query('html').on('click', clearMenus);
    on(win.body(), on.selector(toggleSelector, 'click'), toggle);
    on(win.body(), on.selector('.dropdown form', 'click'), function (e) {
        e.stopPropagation();
    });

    return Dropdown;
});