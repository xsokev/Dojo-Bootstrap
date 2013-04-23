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
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/dom-class",
    "dijit/_Container",
    "dojo/NodeList-traverse"
], function (CollapseItem, support, _BootstrapWidget, declare, lang, array, query, on, domClass, _Container) {
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



    return declare("Collapse", [_BootstrapWidget, _Container], {
        // summary:
        //      Provides collapsible support for a widget.
        // description:
        //      This widget provides a Twitter Bootstrap accordion support for collapsing and expanding. It
        //      manages the number of groups that are open simultaneously and collapses other groups
        //      appropriately when only group is allowed open at once. It also supports adding and removing
        //      groups.
        //
        //      ## Events ##
        //		Call `widget.on("started", func)` to monitor when the widget has finished its startup.
        //
        //		Call `widget.on("show", func)` to monitor when a CollapseItem is about to show.
        //
        //		Call `widget.on("shown", func)` to monitor when a CollapseItem has been shown.
        //
        //		Call `widget.on("hide", func)` to monitor when a CollapseItem is about to hide.
        //
        //		Call `widget.on("hidden", func)` to monitor when a CollapseItem has been hidden.
        //

        baseClass: "accordion",

        // allowAllOpen: Boolean
        //          determines if all groups can be open at the same time. Default is false.
        allowAllOpen: false,

        postCreate:function () {
            // summary:
            //      adds baseClass and initializes events cache.
            // tags:
            //		private extension
            if(!domClass.contains(this.domNode, this.baseClass)){
                domClass.add(this.domNode, this.baseClass);
            }
            this._events = [];
        },

        startup: function(){
            // summary:
            //      registers delegated handler for each child group events. Displays first group.
            // tags:
            //		private extension
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

        toggle: function(/*CollapseItem|Number*/ widgetRef){
            // summary:
            //      toggles a collapse group. Accepts the widget index or CollapseItem
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

        show: function(/*CollapseItem|Number*/ widgetRef){
            // summary:
            //      expands a group. Accepts the widget index or CollapseItem
            if(typeof widgetRef === "number"){
                widgetRef = this.getChildren()[widgetRef];
            }
            if (widgetRef.isInstanceOf && widgetRef.isInstanceOf(CollapseItem)) {
                widgetRef.show();
            }
        },

        hide: function(/*CollapseItem|Number*/ widgetRef){
            // summary:
            //      collapses a group. Accepts the widget index or CollapseItem
            if(widgetRef === null){ return; }
            if(typeof widgetRef === "number"){
                widgetRef = this.getChildren()[widgetRef];
            }
            if (widgetRef.isInstanceOf && widgetRef.isInstanceOf(CollapseItem)) {
                widgetRef.hide();
            }
        },

        collapseAll: function(){
            // summary:
            //      collapses all collapse groups.
            this.getChildren().forEach(function(collapse){
                if(collapse._transitioning){ return; }
                collapse.hide(true);
            });
        },

        expandAll: function(){
            // summary:
            //      expands all collapse groups.
            if(!this.allowAllOpen){ return; }
            this.getChildren().forEach(function(collapse){
                if(collapse._transitioning){ return; }
                collapse.show(true);
            });
        },

        add: function(/*CollapseItem*/ collapseItem){
            // summary:
            //      add a CollapseItem to the Collapse widget
            if (collapseItem.isInstanceOf && collapseItem.isInstanceOf(CollapseItem)) {
                this.addChild(collapseItem);
                var evt = this.own(collapseItem.on("show, shown, hide, hidden", lang.hitch(this, function(e){
                    if(e.type === "show"){ _beforeShow.call(this, e.target); }
                    this.emit(e.type, e);
                })));
                this._events.push({"id":collapseItem.id, "event": evt});
            }
        },

        remove: function(/*CollapseItem*/ collaspeItem){
            // summary:
            //      remove a CollapseItem from the Collapse widget
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