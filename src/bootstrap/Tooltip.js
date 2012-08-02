/* ==========================================================
 * Tooltip.js v0.0.1
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
    "bootstrap/Support",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/_base/lang",
    'dojo/_base/window',
    'dojo/on',
    'dojo/mouse',
    'dojo/dom-class',
    "dojo/dom-attr",
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/dom-construct',
    'dojo/html',
    "dojo/NodeList-dom",
    'dojo/NodeList-traverse',
    "dojo/domReady!"
], function (support, declare, query, lang, win, on, mouse, domClass, domAttr, domStyle, domGeom, domConstruct, html) {
    "use strict";

    var toggleSelector = '[data-toggle="tooltip"]';
    var Tooltip = declare("Tooltip", null, {
        defaultOptions:{
            animation:true,
            placement:'top',
            selector:false,
            template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger:'hover',
            title:'',
            delay:0
        },
        constructor:function (element, options) {
            this.init('tooltip', element, options);
        },
        init:function (type, element, options) {
            this.domNode = element;

            var eventIn, eventOut;
            this.type = type;
            this.options = this.getOptions(options);
            this.enabled = true;

            if (this.options.trigger !== 'manual') {
                eventIn = this.options.trigger === 'hover' ? mouse.enter : 'focusin';
                eventOut = this.options.trigger === 'hover' ? mouse.leave : 'focusout';
                if (this.options.selector) {
                    eventIn = on.selector(this.options.selector, eventIn);
                    eventOut = on.selector(this.options.selector, eventOut);
                }
                on(this.domNode, eventIn, lang.hitch(this, 'enter'));
                on(this.domNode, eventOut, lang.hitch(this, 'leave'));
            }

            this.options.selector ?
                (this._options = lang.mixin({}, lang.mixin(lang.clone(this.options), { trigger:'manual', selector:'' }))) :
                this.fixTitle();
        },
        getOptions:function (options) {
            options = lang.mixin({},
                lang.mixin(lang.clone(this.defaultOptions),
                    lang.mixin(options, support.getData(this.domNode))));
            if (options.delay && typeof options.delay === 'number') {
                options.delay = {
                    show:options.delay,
                    hide:options.delay
                };
            }
            return options;
        },
        enter:function (e) {
            var self = support.getData(e.target, this.type);
            if (!self) {
                query(e.target)[this.type](this._options);
                self = support.getData(e.target, this.type);
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (self) {
                if (!self.options.delay || !self.options.delay.show) {
                    return self.show();
                }
                self.hoverState = 'in';
                this.timeout = setTimeout(function () {
                    if (self.hoverState === 'in') {
                        self.show();
                    }
                }, self.options.delay.show);
            }
            return this;
        },
        leave:function (e) {
            var self = support.getData(e.target, this.type);
            if (!self) {
                query(e.target)[this.type](this._options);
                self = support.getData(e.target, this.type);
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (self) {
                if (!self.options.delay || !self.options.delay.hide) {
                    return self.hide();
                }
                self.hoverState = 'out';
                this.timeout = setTimeout(function () {
                    if (self.hoverState === 'out') {
                        self.hide();
                    }
                }, self.options.delay.hide);
            }
            return this;
        },
        show:function () {
            var tip, inside, pos, actualWidth, actualHeight, placement, tp;
            if (this.hasContent() && this.enabled) {
                tip = this.tip();
                this.setContent();
                //fix: passing data-animation as boolean false should work the same as passing a string ('false')
                if (this.options.animation && (this.options.animation !== 'false' && this.options.animation !== false)) {
                    domClass.add(tip, 'fade');
                }
                placement = typeof this.options.placement === 'function' ?
                    this.options.placement.call(this, tip, this.domNode) :
                    this.options.placement;

                inside = /in/.test(placement);

                domConstruct.place(tip, (inside ? this.domNode : win.body()), 'last');
                domStyle.set(tip, {top:0, left:0, display:'block'});

                pos = this.getPosition(inside);
                var tipPos = domGeom.position(tip);
                actualWidth = tipPos.w;
                actualHeight = tipPos.h;

                switch (inside ? placement.split(' ')[1] : placement) {
                    case 'bottom':
                        tp = {top:(pos.top + pos.height) + "px", left:(pos.left + pos.width / 2 - actualWidth / 2) + "px"};
                        break;
                    case 'top':
                        tp = {top:(pos.top - actualHeight) + "px", left:(pos.left + pos.width / 2 - actualWidth / 2) + "px"};
                        break;
                    case 'left':
                        tp = {top:(pos.top + pos.height / 2 - actualHeight / 2) + "px", left:(pos.left - actualWidth) + "px"};
                        break;
                    case 'right':
                        tp = {top:(pos.top + pos.height / 2 - actualHeight / 2) + "px", left:(pos.left + pos.width) + "px"};
                        break;
                }
                domStyle.set(tip, tp);
                domClass.add(tip, (new Array(placement, 'in')).join(" "));
            }
        },
        hide:function () {
            var _this = this;
            var tip = this.tip();
            domClass.remove(tip, 'in');
            function _removeWithAnimation() {
                var timeout = setTimeout(function () {
                    _this.hideEvent.remove();
                }, 500);

                _this.hideEvent = on.once(tip, support.trans.end, function () {
                    clearTimeout(timeout);
                    _destroyTip();
                });
            }
            function _destroyTip() {
                domConstruct.destroy(tip);
                _this.tipNode = null;
            }

            support.trans && domClass.contains(tip, 'fade') ? _removeWithAnimation() : _destroyTip();
        },
        isHTML:function (text) {
            // html string detection logic adapted from jQuery
            return typeof text !== 'string' || ( text.charAt(0) === "<" && text.charAt(text.length - 1) === ">" && text.length >= 3 ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text);
        },
        setContent:function () {
            var tip = this.tip();
            var title = this.getTitle();
            if(query('.tooltip-inner', tip)[0]){ html.set(query('.tooltip-inner', tip)[0], title); }
            domClass.remove(tip, 'fade in top bottom left right');
        },
        hasContent:function () {
            return this.getTitle();
        },
        fixTitle:function () {
            if (domAttr.get(this.domNode, 'title') || typeof(domAttr.get(this.domNode, 'data-original-title')) !== 'string') {
                domAttr.set(this.domNode, 'data-original-title', domAttr.get(this.domNode, 'title') || '');
                domAttr.remove(this.domNode, 'title');
            }
        },
        getTitle:function () {
            return domAttr.get(this.domNode, 'data-original-title') || (typeof this.options.title === 'function' ? this.options.title.call(this.domNode) : this.options.title);
        },
        getPosition:function (inside) {
            var pos = domGeom.position(this.domNode, true);
            return lang.mixin({},
                lang.mixin(inside ? {top:0, left:0} : {top:pos.y, left:pos.x}, {
                    width:pos.w, height:pos.h }));
        },
        tip:function () {
            return this.tipNode = (this.tipNode) ? this.tipNode : domConstruct.toDom(this.options.template);
        },
        validate:function () {
            if (!this.domNode.parentNode) {
                domStyle.set(this.domNode, "display", "none");
                this.domNode = null;
                this.options = null;
            }
        },
        enable:function () {
            this.enabled = true;
        },
        disable:function () {
            this.enabled = false;
        },
        toggleEnabled:function () {
            this.enabled = !this.enabled;
        },
        toggle:function () {
            this[domClass.contains(this.tip(), 'in') ? 'hide' : 'show']();
        }
    });

    lang.extend(query.NodeList, {
        tooltip:function (option) {
            var options = (lang.isObject(option)) ? option : {};
            return this.forEach(function (node) {
                var data = support.getData(node, 'tooltip');
                if (!data) {
                    support.setData(node, 'tooltip', (data = new Tooltip(node, options)));
                }
                if (lang.isString(option)) {
                    data[option].call(data);
                }
            });
        }
    });

    query(toggleSelector).tooltip();

    return Tooltip;
});