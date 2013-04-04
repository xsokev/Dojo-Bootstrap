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
    "./Support",
    "./_BootstrapWidget",
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
    "dijit/registry",
    "dojo/NodeList-traverse",
    "dojo/NodeList-manipulate"
], function (support, _BootstrapWidget, declare, query, on, mouse, lang, win, domClass, domAttr, domStyle, domGeom, domConstruct, registry) {
    "use strict";

    // module:
    //      ToolTip

    var _tip = function () {
            return this._tipNode = (this._tipNode) ? this._tipNode : domConstruct.toDom(this.template);
        },
        _applyPlacement = function(node, placement, parentOffset){
            var width, height, offset, actualWidth, actualHeight, replace;

            offset = support.place(node, this.domNode, placement);
            offset.top = offset.top + parentOffset.y;
            offset.left = offset.left + parentOffset.x;
            width = node.offsetWidth;
            height = node.offsetHeight;

            domStyle.set(node, { top: offset.top+"px", left: offset.left+"px" });
            domClass.add(node, [placement, 'in'].join(" "));

            actualWidth = node.offsetWidth;
            actualHeight = node.offsetHeight;

            if(placement === "top" && actualHeight !== height){
                offset.top = offset.top + height - actualHeight;
                replace = true;
            } else if(placement === "left" && actualWidth !== width){
                offset.left = offset.left + width - actualWidth;
                replace = true;
            }
            if(placement === "bottom" || placement === "top"){
                if(offset.left < 0){
                    offset.left = 0;
                    domStyle.set(node, { top: offset.top+"px", left: offset.left+"px" });
                }
            }
            if(replace){
                domStyle.set(node, { top: offset.top+"px", left: offset.left+"px" });
            }
        },
        _enter = function () {
            if (this._timeout) { clearTimeout(this._timeout); }
            if (!this.delayShow) { return this.show(); }
            else {
                this._hoverState = 'in';
                this._timeout = setTimeout(function () {
                    if (this._hoverState === 'in') {
                        this.show();
                    }
                }, this.delayShow);
                return this;
            }
        },
        _leave = function () {
            if (this._timeout) { clearTimeout(this._timeout); }
            if (!this.delayHide) { return this.hide(); }
            else {
                this._hoverState = 'out';
                this._timeout = setTimeout(function () {
                    if (this._hoverState === 'out') {
                        this.hide();
                    }
                }, this.delayHide);
                return this;
            }
        },
        _getModal = function(){
            var modal;
            var _inModal = query(this.domNode).parents('.modal').length > 0;
            if(_inModal){
                modal = registry.byNode(query(this.domNode).parents('.modal')[0]);
            }
            return modal;
        };

    // summary:
    //      Bootstrap template for creating a widget that uses a template
    return declare("ToolTip", [_BootstrapWidget], {
        // template: String
        //          template used to construct the tooltip
        template: '<div class="tooltip"><div class="tooltip-arrow arrow"></div><div class="tooltip-inner"></div></div>',

        // enabled: Boolean
        //          whether the tooltip is enabled and can be displayed
        enabled: true,

        // animation: Boolean
        //          animate the tooltip
        animation: true,

        // placement: String|Function
        //          where the tooltip should be displayed. Values are top, bottom, left, right
        placement: "top",

        // trigger: String
        //          what event causes the tooltip to be displayed
        trigger: "hover",

        // delayShow: Integer
        //          the time in milliseconds that should pass before showing the tooltip after it has been triggered
        delayShow: 0,

        // delayHide: Integer
        //          the time in milliseconds that should pass before hiding the tooltip
        delayHide: 0,

        // type: String
        //          what type of tooltip style widget to display
        type: "tooltip",

        // title: String|Function
        //          content for the widget
        title: "",
        _setTitleAttr: function(val){
            this._set("title", (typeof val === 'function' ? val.call(this) : val));
        },

        postCreate:function () {
            if (this.trigger === 'click') {
                this._modal = _getModal.call(this);
                if(this._modal){
                    this._eventHideOnModal = this._modal.on('hide', lang.hitch(this, function(){
                        this.hide(false);
                    }));
                }
                if (this.selector) {
                    this.own(on(this.domNode, on.selector(this.selector, 'click'), lang.hitch(this, 'toggle')));
                } else {
                    this.own(on(this.domNode, 'click', lang.hitch(this, 'toggle')));
                }
            } else if (this.trigger !== 'manual') {
                var eventIn = this.trigger === 'hover' ? mouse.enter : 'focusin',
                    eventOut = this.trigger === 'hover' ? mouse.leave : 'focusout';
                if (this.selector) {
                    eventIn = on.selector(this.selector, eventIn);
                    eventOut = on.selector(this.selector, eventOut);
                }
                this.own(on(this.domNode, eventIn, lang.hitch(this, _enter)));
                this.own(on(this.domNode, eventOut, lang.hitch(this, _leave)));
            }

            var domNode;
            if (this.selector) {
                domNode = query(this.selector)[0];
            } else {
                domNode = this.domNode;
            }
            if (this.content === "" && domAttr.get(domNode, 'title')) {
                this.set("content", domAttr.get(domNode, 'title'));
                domAttr.remove(domNode, 'title');
            }
        },

        show:function () {
            if (this.content !== "" && this.enabled) {
                this.emit("show", {});
                var tip = _tip.call(this),
                    placement;
                this._resetContent();
                //fix: passing data-animation as boolean false should work the same as passing a string ('false')
                if (!support.falsey(this.animation)) {
                    domClass.add(tip, 'fade');
                }
                placement = typeof this.placement === 'function' ?
                    this.placement.call(this, tip, this.domNode) :
                    this.placement;

                var offset = {x:0, y:0};
                if(this._modal){
                    //domConstruct.place(tip, this.domNode, "after");
                    domConstruct.place(tip, this._modal.domNode);
                    offset.x = this.domNode.offsetParent.offsetLeft;
                    offset.y = this.domNode.offsetParent.offsetTop;
                } else {
                    //domConstruct.place(tip, win.body());
                    domConstruct.place(tip, this.domNode, "after");
                }
                _applyPlacement.call(this, tip, placement, offset);
                this.emit("shown", {});
            }
        },

        hide:function (animate) {
            animate = animate || true;
            var tip = _tip.call(this);
            domClass.remove(tip, 'in');
            var _destroyTip = lang.hitch(this, function () {
                domConstruct.destroy(tip);
                this._tipNode = null;
            });
            var _removeWithAnimation = lang.hitch(this, function() {
                this._hideEvent = on.once(tip, support.trans.end, lang.hitch(this, function () {
                    _destroyTip();
                    this._hideEvent.remove();
                }));
            });

            if (support.trans && domClass.contains(tip, 'fade') && animate) {
                _removeWithAnimation();
            } else {
                _destroyTip();
            }
            return this;
        },

        toggleEnabled:function () {
            this.set("enabled", !this.enabled);
        },

        toggle:function () {
            this[domClass.contains(_tip.call(this), 'in') ? 'hide' : 'show']();
        },

        destroy: function() {
            this.hide();
            if(this._eventHideOnModal){ this._eventHideOnModal.remove(); }
            this.inherited(arguments);
        },

        _resetContent: function(){
            var tip = _tip.call(this);
            query('.tooltip-inner', tip).html(this.title);
            domClass.remove(tip, 'fade in top bottom left right');
        }

});
});