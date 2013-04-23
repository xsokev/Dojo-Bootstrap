/* ==========================================================
 * ToolTip.js v2.0.0
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
    "./PopupBase",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/dom-class",
    "dojo/dom-attr"
], function (PopupWidget, declare, query, domClass, domAttr) {
    "use strict";

    // module:
    //      Tooltip

    return declare("Tooltip", [PopupWidget], {
        // summary:
        //      Bootstrap template for creating a widget that uses a template

        // template: String
        //          template used to construct the tooltip
        template: '<div class="tooltip"><div class="tooltip-arrow arrow"></div><div class="tooltip-inner"></div></div>',

        // placement: String|Function
        //          where the tooltip should be displayed. Values are top, bottom, left, right
        placement: "top",

        // trigger: String
        //          what event causes the tooltip to be displayed
        trigger: "hover",

        // type: String
        //          what type of tooltip style widget to display
        type: "tooltip",

        // title: String|Function
        //          content for the widget
        title: "",
        _setTitleAttr: function(val){
            this._set("title", (typeof val === 'function' ? val.call(this) : val));
        },

        _resetContent: function(){
            // summary:
            //
            // tags:
            //		protected
            var domNode;
            if (this.selector) { domNode = query(this.selector)[0]; }
            else { domNode = this.domNode; }

            if (this.title === "" && domAttr.get(domNode, 'title')) {
                this.set("title", domAttr.get(domNode, 'title'));
                domAttr.remove(domNode, 'title');
            }
            if(this.title === ""){ return; }
            var popup = this._popup();
            query('.tooltip-inner', popup)[0].innerHTML = this.title;
            domClass.remove(popup, 'fade in top bottom left right');
        }
    });
});
