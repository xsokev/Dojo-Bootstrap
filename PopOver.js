/* ==========================================================
 * PopOver.js v2.0.0
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

//TODO:  - When PopOver inside Modal and the Modal is open, closed then opened again, the PopOver no longer triggers
define([
    "./Support",
    "./ToolTip",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/mouse",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/dom-construct",
    "dojo/NodeList-manipulate"
], function (support, ToolTip, declare, query, on, mouse, lang, win, domClass, domAttr, domStyle, domGeom, domConstruct) {
    "use strict";

    // module:
    //      PopOver

    var _tip = function () {
        return this._tipNode = (this._tipNode) ? this._tipNode : domConstruct.toDom(this.template);
    };

    // summary:
    //      Bootstrap template for creating a widget that uses a template
    return declare("PopOver", [ToolTip], {
        // template: String
        //          template used to construct the popover
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>',

        // placement: String|Function
        //          where the tooltip should be displayed. Values are top, bottom, left, right
        placement: "right",

        // trigger: String
        //          what event causes the tooltip to be displayed
        trigger: "click",

        // type: String
        //          what type of tooltip style widget to display
        type: "popover",

        // content: String|Function
        //          content for the widget
        content: "",
        _setContentAttr: function(val){
            this._set("content", (typeof val === 'function' ? val.call(this) : val));
        },

        _resetContent: function(){
            // summary:
            //
            // tags:
            //      protected extension

            var tip = _tip.call(this);
            query('.popover-title', tip).html(this.title);
            query('.popover-content', tip).html(this.content);
            domClass.remove(tip, 'fade in top bottom left right');
        }
    });
});