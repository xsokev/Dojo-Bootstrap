/* ==========================================================
 * Popup.js v2.0.0
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
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/dom-construct",
    "dijit/registry",
    "dijit/place",
    "dijit/Viewport",
    "dojo/NodeList-traverse",
    "dojo/NodeList-manipulate"
], function (support, _BootstrapWidget, declare, query, on, mouse, lang, domClass, domAttr, domStyle, domGeom, domConstruct, registry, place, Viewport) {
    "use strict";

    // module:
    //      Popup

    var _enter = function () {
            if (this._timeout) { clearTimeout(this._timeout); }
            if (!this.delayShow) { return this.show(); }
            else {
                this._hoverState = 'in';
                this._timeout = setTimeout(lang.hitch(this, function () {
                    if (this._hoverState === 'in') {
                        this.show();
                    }
                }, this.delayShow));
                return this;
            }
        },
        _leave = function () {
            if (this._timeout) { clearTimeout(this._timeout); }
            if (!this.delayHide) { return this.hide(); }
            else {
                this._hoverState = 'out';
                this._timeout = setTimeout(lang.hitch(this, function () {
                    if (this._hoverState === 'out') {
                        this.hide();
                    }
                }, this.delayHide));
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
        },
        _place = function(node, refNode, placement){
            domStyle.set(node, {top:0, left:0, display:'block'});
            domClass.add(node, [placement, 'in'].join(" "));

            var placements = [];
            switch(placement){
                case "top":
                    placements.push("above-centered");
                    placements.push("below-centered");
                    break;
                case "bottom":
                    placements.push("below-centered");
                    placements.push("above-centered");
                    break;
                case "left":
                    placements.push("before-centered");
                    placements.push("after-centered");
                    break;
                case "right":
                    placements.push("after-centered");
                    placements.push("before-centered");
                    break;
                default:
                    //TODO: test for placement is array before making assignment
                    placements = placement;
            }
            place.around(node, refNode, placements, true);
        };

    // summary:
    //      Bootstrap template for creating a widget that uses a template
    return declare("Popup", [_BootstrapWidget], {
        // template: String
        //          template used to construct the popup
        template: '<div class="dropdown-menu"></div>',

        // enabled: Boolean
        //          whether the popup is enabled and can be displayed
        enabled: true,

        // animation: Boolean
        //          animate the popup
        animation: true,

        // placement: String|Function
        //          where the popup should be displayed. Values are top, bottom, left, right
        placement: "bottom",

        // trigger: String
        //          what event causes the popup to be displayed
        trigger: "click",
        _setTriggerAttr: function(val){
            this._set("trigger", val);
            this._destroyEvents();
            this._initEvents();
        },

        // delayShow: Integer
        //          the time in milliseconds that should pass before showing the popup after it has been triggered
        delayShow: 0,

        // delayHide: Integer
        //          the time in milliseconds that should pass before hiding the popup
        delayHide: 0,

        // type: String
        //          what type of popup style widget to display
        type: "popup",

        // showOnFocus: Boolean
        //          automatically show the datepicker when the control receives focus
        showOnFocus: true,

        postCreate:function () {
            // summary:
            //
            // tags:
            //		private extension
            this._modal = _getModal.call(this);
            this._initEvents();
        },

        show:function () {
            if (this.enabled && !this._visible()) {
                this.emit("show", {});
                var popup = this._popup.call(this),
                    placement;
                this._resetContent();
                //fix: passing data-animation as boolean false should work the same as passing a string ('false')
                if (!support.falsey(this.animation)) {
                    domClass.add(popup, 'fade');
                }
                placement = typeof this.placement === 'function' ?
                    this.placement.call(this, popup, this.domNode) :
                    this.placement;

                _place.call(this, popup, this.domNode, placement);
                if(this._modal){
                    var _modalZIndex = domStyle.getComputedStyle(this._modal.domNode).zIndex;
                    domStyle.set(popup, "z-index", (_modalZIndex || 0) + 1);
                }
                this.emit("shown", {});
            }
            return this;
        },

        hide:function (animate, force) {
            animate = animate || true;
            force = force || false;
            if(!this._visible()){ if(!force){ return; } }
            var popup = this._popup.call(this);
            domClass.remove(popup, 'in');
            var _destroyTip = lang.hitch(this, function () {
                domConstruct.destroy(popup);
                this._popupNode = null;
            });
            var _removeWithAnimation = lang.hitch(this, function() {
                this._hideEvent = on.once(popup, support.trans.end, lang.hitch(this, function () {
                    _destroyTip();
                    this._hideEvent.remove();
                }));
            });

            if (support.trans && domClass.contains(popup, 'fade') && animate) {
                _removeWithAnimation();
            } else {
                _destroyTip();
            }
            return this;
        },

        toggle:function () {
            this[this._visible() ? 'hide' : 'show']();
        },

        destroy: function() {
            this.hide();
            this._destroyEvents();
            this.inherited(arguments);
        },

        _resetContent: function(){
            // summary:
            //
            // tags:
            //		protected
            throw new Error('must be implemented by subclass!');
        },

        _popup: function () {
            // summary:
            //
            // tags:
            //		protected
            return this._popupNode = (this._popupNode) ? this._popupNode : domConstruct.toDom(this.template);
        },

        _visible: function(){
            // summary:
            //
            // tags:
            //		protected
            return domClass.contains(this._popup.call(this), 'in');
        },

        _initEvents: function(){
            // summary:
            //
            // tags:
            //		protected
            if (this.trigger === 'click') {
                if(this._modal){
                    this._eventHideOnModal = this._modal.on('hide', lang.hitch(this, function(){
                        this.hide(false);
                    }));
                }
                if (this.selector) {
                    this._eventClick = on(this.domNode, on.selector(this.selector, 'click'), lang.hitch(this, 'toggle'));
                } else {
                    this._eventClick = on(this.domNode, 'click', lang.hitch(this, 'toggle'));
                }
                this.own(this._eventClick);
            } else if (this.trigger !== 'manual') {
                var eventIn = this.trigger === 'hover' ? mouse.enter : 'focusin',
                    eventOut = this.trigger === 'hover' ? mouse.leave : 'focusout';
                if (this.selector) {
                    eventIn = on.selector(this.selector, eventIn);
                    eventOut = on.selector(this.selector, eventOut);
                }
                this._eventIn = on(this.domNode, eventIn, lang.hitch(this, _enter));
                this._eventOut = on(this.domNode, eventOut, lang.hitch(this, _leave));

                this.own(this._eventIn);
                this.own(this._eventOut);
            }
            this._eventViewResize = Viewport.on("resize", lang.hitch(this, function(){
                if(this._visible()){
                    var popup = this._popup.call(this),
                        placement = typeof this.placement === 'function' ?
                            this.placement.call(this, popup, this.domNode) :
                            this.placement;
                    _place.call(this, popup, this.domNode, placement);
                }
            }));
        },

        _destroyEvents: function(){
            // summary:
            //
            // tags:
            //		protected
            if(this._eventHideOnModal){ this._eventHideOnModal.remove(); this._eventHideOnModal = null; }
            if(this._eventClick){ this._eventClick.remove(); this._eventClick = null; }
            if(this._eventIn){ this._eventIn.remove(); this._eventIn = null; }
            if(this._eventOut){ this._eventOut.remove(); this._eventOut = null; }
            if(this._eventViewResize){ this._eventViewResize.remove(); this._eventViewResize = null; }
        }
    });
});