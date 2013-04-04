/* ==========================================================
 * Button.js v2.0.0
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
    "dojo/on",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/NodeList-traverse"
], function (support, _BootstrapWidget, declare, on, lang, domClass, domAttr) {
    "use strict";

    // module:
    //      Button

    return declare("Button", [_BootstrapWidget], {
        // summary:
        //      Control button states.
        // example:
        // |	<button class="btn" data-dojo-type="Button">Load</button>
        //
        // example:
        // |	new Button({toggleable:true}, dojo.byId("button"));
        //

        // _valueProp: [protected readonly] String
        _valueProp: "innerHTML",

        // resetText: String
        //          text to display when button state is reset
        text: "",
        _setTextAttr: function(val){
            this._set("text", val);
            this.domNode[this._valueProp] = val;
        },

        // loadingText: String
        //          text to display when button state is loading
        loadingText: "loading...",

        // resetText: String
        //          text to display when button state is reset
        resetText: "",

        // toggleable: Boolean
        //          whether an individual button can be toggled
        toggleable: false,

        // active: Boolean
        //          sets a button's active state
        active: false,
        _setActiveAttr: function(val){
            this._set("active", val);
            if (this.toggleable) {
                domClass[val === true ? "add" : "remove"](this.domNode, 'active');
            }
        },

        // disabled: Boolean
        //          sets a button's disabled state
        disabled: false,
        _setDisabledAttr: function(val){
            this._set("disabled", val);
            domClass[val === true ? "add" : "remove"](this.domNode, 'disabled');
        },

        postCreate:function () {
            this.own(on(this.domNode, "click", lang.hitch(this, function(){
                this.toggle();
            })));
            this._valueProp = (this.domNode.tag === "INPUT") ? "value" : "innerHTML";
        },

        loading: function(/*String?*/ txt){
            // summary:
            //      places the button in a loading state with text specified by the loadingText property
            txt = txt || this.loadingText;
            if(this.resetText === ""){
                this.set("resetText", this.domNode[this._valueProp]);
            }
            this.set("text", txt);
            domClass.add(this.domNode, "disabled");
            domAttr.set(this.domNode, "disabled", "disabled");
        },

        reset: function(){
            // summary:
            //      resets the button's state, replacing the button's value with resetText
            this.set("text", this.resetText);
            domClass.remove(this.domNode, "disabled");
            domAttr.remove(this.domNode, "disabled");
        },

        toggle: function(){
            // summary:
            //      toggles a button's active or inactive state
            if (this.toggleable) { this.set("active", !this.active); }
        },

        isActive: function(){
            // summary:
            //      whether the button is active
            return this.active;
        }
    });
});