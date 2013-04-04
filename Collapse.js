/* ==========================================================
 * Collapse.js v2.0.0
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
    "./CollapseItem",
    "./Support",
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dijit/_Container",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/NodeList-traverse"
], function (CollapseItem, support, _BootstrapWidget, declare, _Container, query, on, lang, array, domClass) {
    "use strict";

    // module:
    //      Collapse

    var _dimension = function(node){
            return domClass.contains(node, 'width') ? 'width' : 'height';
        },
        _beforeShow = function(targetNode){
            if(!this.allowAllOpen && targetNode){
                this.getChildren().forEach(function(collapse){
                    if(collapse._transitioning){ return; }
                    if(collapse.domNode.id !== targetNode.id){
                        collapse.hide(true);
                    }
                });
            }
        },
        _removeCollapseItemEvent = function(targetCi, list){
            var _list = array.filter(list, function(ci){
                return targetCi.id !== ci.id;
            });
            return _list;
        };



    // summary:
    //
    return declare("Collapse", [_BootstrapWidget, _Container], {
        baseClass: "accordion",

        // allowAllOpen: Boolean
        //          determines if all panes can be open at the same time
        allowAllOpen: false,

        postCreate:function () {
            if(!domClass.contains(this.domNode, this.baseClass)){
                domClass.add(this.domNode, this.baseClass);
            }
            this._events = [];
        },

        startup: function(){
            if(this.getChildren().length){
                array.forEach(this.getChildren(), function(ci){
                    var evt = this.own(ci.on("show, shown, hide, hidden", lang.hitch(this, function(e){
                        if(e.type === "show"){ _beforeShow.call(this, e.target); }
                        this.emit(e.type, e);
                    })));
                    this._events.push({"id":ci.id, "event": evt});
                }, this);
                var first = this.getChildren()[0];
                first.show();
            }
            this.emit("started");
        },

        // summary:
        //      toggles a collapse pane. Accepts the widget index or the widget
        toggle: function(){
            var widgetRef = arguments.length && arguments[0];
            if(widgetRef === null){ return; }
            if(typeof widgetRef === "number"){
                widgetRef = this.getChildren()[widgetRef];
            }
            if (widgetRef.isInstanceOf && widgetRef.isInstanceOf(CollapseItem)) {
                if(widgetRef.isCollapsed()){
                    this.show(widgetRef);
                } else {
                    this.hide(widgetRef);
                }
            }
        },

        // summary:
        //      shows a collapse pane. Accepts the widget index or the widget
        show: function(){
            var widgetRef = arguments.length && arguments[0];
            if(widgetRef === null){ return; }
            if(typeof widgetRef === "number"){
                widgetRef = this.getChildren()[widgetRef];
            }
            if (widgetRef.isInstanceOf && widgetRef.isInstanceOf(CollapseItem)) {
                widgetRef.show();
            }
        },

        // summary:
        //      hides a collapse pane. Accepts the widget index or the widget
        hide: function(){
            var widgetRef = arguments.length && arguments[0];
            if(widgetRef === null){ return; }
            if(typeof widgetRef === "number"){
                widgetRef = this.getChildren()[widgetRef];
            }
            if (widgetRef.isInstanceOf && widgetRef.isInstanceOf(CollapseItem)) {
                widgetRef.hide();
            }
        },

        collapseAll: function(){
            this.getChildren().forEach(function(collapse){
                if(collapse._transitioning){ return; }
                collapse.hide(true);
            });
        },

        expandAll: function(){
            if(!this.allowAllOpen){ return; }
            this.getChildren().forEach(function(collapse){
                if(collapse._transitioning){ return; }
                collapse.show(true);
            });
        },

        add: function(collapseItem){
            if (collapseItem.isInstanceOf && collapseItem.isInstanceOf(CollapseItem)) {
                this.addChild(collapseItem);
                var evt = this.own(collapseItem.on("show, shown, hide, hidden", lang.hitch(this, function(e){
                    if(e.type === "show"){ _beforeShow.call(this, e.target); }
                    this.emit(e.type, e);
                })));
                this._events.push({"id":collapseItem.id, "event": evt});
            }
        },

        remove: function(collaspeItem){
            if(collaspeItem === null){ return; }
            if(typeof collaspeItem === "number"){
                collaspeItem = this.getChildren()[collaspeItem];
            }
            if (collaspeItem.isInstanceOf && collaspeItem.isInstanceOf(CollapseItem)) {
                this.removeChild(collaspeItem);
                collaspeItem.destroy();
                this._events = _removeCollapseItemEvent(collaspeItem, this._events);
            }
        }
    });
});