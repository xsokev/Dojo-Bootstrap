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
    "dojo/keys",
    "dojo/NodeList-traverse"
], function (support, declare, lang, array, query, on, keys) {
    "use strict";

    // module:
    //      _ListWidget
    var _keyup = function (e) {
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
                    if (!this.shown) { return; }
                    var active = this.list._getActive();
                    this.list.select(active);
                    break;
                case keys.ESCAPE:
                    if (!this.shown) { return; }
                    this.emit("list-escape", e);
                    break;

                default:
                    this.emit("list-keyup", e);
            }
        };

    return declare("_ListInputBase", null, {
        // summary:
        //      Bootstrap base widget module for handling list actions in input controls
        // description:
        //		This module is useful for input controls that will display a navigable list.
        //      This module acts as a proxy for the key events needed to navigate through the
        //      list. The module should be implemented and used directly.
        //
        //      ## Events ##
        //		Call `widget.on("list-escape", func)` to monitor when the escape key is pressed on a list.
        //
        //		Call `widget.on("list-keyup", func)` to monitor when a key other than enter, escape, tab,
        //      shift, alt, ctrl or any arrow key is pressed on a list.
        //

        postCreate: function(){
            // summary:
            //		Handles keyup, keypress and keydown events.
            // tags:
            //		private extension
            if(this.domNode.tagName === "INPUT"){
                this.own(on(this.domNode, 'keyup', lang.hitch(this, _keyup)));
                this.own(on(this.domNode, 'keypress, keydown', lang.hitch(this, function(e){
                    var code = e.charCode || e.keyCode;
                    if(this.shown && array.indexOf([
                        keys.DOWN_ARROW,
                        keys.DOWN_DPAD,
                        keys.UP_ARROW,
                        keys.UP_DPAD,
                        keys.TAB,
                        keys.ENTER,
                        keys.ESCAPE
                    ], code) >= 0){
                        this.list && this.list._move(e, true);
                    }
                })));
            }
        }
    });
});