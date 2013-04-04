/* ==========================================================
 * ButtonGroup.js v2.0.0
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
    "./Button",
    "dojo/_base/declare",
    "dijit/_Container",
    "dijit/registry",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/NodeList-traverse"
], function (support, _BootstrapWidget, Button, declare, _Container, registry, query, on, lang, array, domClass) {
    "use strict";

    // module:
    //      Button

    return declare("ButtonGroup", [_BootstrapWidget, _Container], {
        // summary:
        //      Attach event handlers to a button or group of buttons

        // mode: String
        //          mode for group of buttons: radio, checkbox
        mode: "checkbox",

        postCreate:function () {
            this._buttons = [];
            this.own(on(this.domNode, "click", lang.hitch(this, function(e){
                var btn = e.target;
                if (!domClass.contains(btn, 'btn')){
                    btn = query(btn).closest('.btn');
                }
                this.toggle(btn);
            })));
        },

        startup: function(){
            query(".btn", this.domNode).forEach(function(btn){
                var foundButton = this.hasChildren && array.filter(this.getChildren(), function(b){ return b.id === btn.id; })[0];
                if(foundButton){ this.add(foundButton); } else { this.add(btn); }
            }, this);
        },

        toggle: function(/*HTMLElement*/ btn){
            // summary:
            //      toggles a passed button of a button group
            if (btn && this.mode === "radio") {
                this.deactivate();
                var widget = registry.byNode(btn);
                widget && widget.toggle();
            }
        },

        deactivate: function(){
            // summary:
            //      deactivates all buttons of a button group
            array.forEach(this.getChildren(), function(btn){
                btn.set("active", false);
            });
        },

        add: function(/*Object*/ button){
            // summary:
            //      adds a HTMLElement button or Button widget to the button group
            // button: HTMLElement Button
            //      the button widget or element that is to be added to the group
            // returns:
            //      instance of the ButtonGroup
            if (button.isInstanceOf && button.isInstanceOf(Button)) {
                button.set("toggleable", true);
                if(array.filter(this.getChildren(), function(b){ return b.id === button.id; }).length === 0){
                    this.addChild(button);
                }
            } else if(support.isElement(button)) {
                this.addChild(new Button({toggleable:true}, button));
            } else {
                throw "Invalid button! Cannot add to button group.";
            }
            return this;
        },

        remove: function(/*Object*/ button){
            // summary:
            //      adds a HTMLElement button or Button widget to the button group
            // button: HTMLElement Number
            //      the button widget or index of the widget that is to be deleted from the group
            if(button === null){ return; }
            if(typeof button === "number"){
                button = this.getChildren()[button];
            }
            if (button.isInstanceOf && button.isInstanceOf(Button)) {
                this.removeChild(button);
                button.destroy();
            }
        }

    });
});