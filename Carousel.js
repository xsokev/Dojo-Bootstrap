/* ==========================================================
 * Carousel.js v2.0.0
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
    "./CarouselItem",
    "./Support",
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/_TemplatedMixin",
    "dijit/_Container",
    "dojo/query",
    "dojo/on",
    "dojo/mouse",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/NodeList-traverse"
], function (CarouselItem, support, _BootstrapWidget, declare, lang, array, _TemplatedMixin, _Container, query, on, mouse, domConstruct, domClass, domAttr) {
    "use strict";

    // module:
    //      Carousel

    var _active = function(){
            return array.filter(this.getChildren(), function(child){
                return child.active;
            })[0];
        },
        _slide = function (type, next, mute) {
            var active = _active.call(this),
                direction = type === 'next' ? 'left' : 'right',
                fallback = type === 'next' ? 'first' : 'last',
                children = this.getChildren(),
                isCycling = this._intervalTimer,
                indicators,
                eventObj;
            next = next || active._getSibling(type);

            this._sliding = true;
            if (isCycling) { this.pause(); }

            if(!(next instanceof CarouselItem)){
                next = fallback === "last" ? children[children.length-1] : children[0];
            }

            if (next && next.active) { return; }

            if(this.indicators){
                indicators = query("li", this.indicatorsNode);
                if (indicators.length) {
                    query(".active", this.indicatorsNode).removeClass('active');
                    on.once(this, "slid", lang.hitch(this, function(){
                        var active = _active.call(this),
                            nextIndicator = indicators[active ? active.getIndexInParent() : 0];
                        if (nextIndicator) { domClass.add(nextIndicator, "active"); }
                    }));
                }
            }

            eventObj = { relatedTarget: next, previousTarget: active, direction: direction };
            if (!mute && support.trans && domClass.contains(this.domNode, 'slide')) {
                this.emit('slide', eventObj);
                domClass.add(next.domNode, type);
                this._offsetWidth = next.domNode.offsetWidth;

                if(active){ domClass.add(active.domNode, direction); }
                domClass.add(next.domNode, direction);
                on.once(this.domNode, support.trans.end, lang.hitch(this, function(){
                    domClass.remove(next.domNode, [type, direction].join(' '));
                    next.set('active', true);
                    if(active){
                        domClass.remove(active.domNode, direction);
                        active.set("active", false);
                    }
                    this._sliding = false;
                    setTimeout(lang.hitch(this, function(){
                        this.emit('slid', eventObj);
                    }), 0);
                }));
            } else {
                this.emit('slide', eventObj);
                if(active){ active.set("active", false); }
                next.set("active", true);
                this._sliding = false;
                this.emit('slid', eventObj);
            }

            if(isCycling) { this.cycle(); }
            return this;
        };



    // summary:
    //      Attach event handlers to a button or group of buttons
    return declare("Carousel", [_BootstrapWidget, _TemplatedMixin, _Container], {
        templateString:
            '<div class="${baseClass} hide">' +
            '    <ol class="carousel-indicators" data-dojo-attach-point="indicatorsNode"></ol>' +
            '    <div class="carousel-inner" data-dojo-attach-point="containerNode"></div>' +
            '    <a class="left carousel-control" data-slide="prev" data-dojo-attach-point="prevNode">&lsaquo;</a>' +
            '    <a class="right carousel-control" data-slide="next" data-dojo-attach-point="nextNode">&rsaquo;</a>' +
            '</div>',

        baseClass: "carousel",

        // indicators: Boolean
        //          whether indicators are visible
        indicators: true,

        // navigatable: Boolean
        //          whether navigation controls are visible
        navigatable: true,

        // interval: Number
        //          elapsed time between slides in milliseconds
        interval: 3000,

        // currentSlide: Number
        //          the start slide of current
        currentSlide: 0,

        // pauseOnHover: Boolean
        //          event that causes the animation to stop
        pauseOnHover: true,

        postCreate:function () {
            if (this.pauseOnHover) {
                this.own(on(this.domNode, mouse.enter, lang.hitch(this, 'pause')));
                this.own(on(this.domNode, mouse.leave, lang.hitch(this, 'cycle')));
            }
            if (this.navigatable) {
                this.own(on(this.prevNode, "click", lang.hitch(this, 'prev')));
                this.own(on(this.nextNode, "click", lang.hitch(this, 'next')));
            } else {
                domClass.add(this.prevNode, "hide");
                domClass.add(this.nextNode, "hide");
            }

            if (this.indicators) {
                query("[data-dojo-type*='CarouselItem']", this.domNode).forEach(function(item, index){
                    var indicator = domConstruct.toDom("<li></li>");
                    domAttr.set(indicator, "data-slide-to", index);
                    if(domClass.contains(item, "active")){
                        domClass.add(indicator, "active");
                    }
                    domConstruct.place(indicator, this.indicatorsNode);
                }, this);
                this.own(on(this.indicatorsNode, "click", lang.hitch(this, function(e){
                    this.pause().to(domAttr.get(e.target, "data-slide-to"));
                    this.cycle();
                })));
            } else {
                domClass.add(this.indicatorsNode, "hide");
            }

            this._paused = false;
            this._intervalTimer = null;
            this._sliding = false;
        },

        startup: function(){
            this.to(this.currentSlide, true);
            domClass.remove(this.domNode, "hide");
            this.cycle();
            this.started = true;
        },

        cycle: function (e) {
            e = e || false;
            if (e !== true) { this._paused = false; }
            if (this.interval && !this._paused) {
                this._intervalTimer = setInterval(lang.hitch(this, 'next'), this.interval);
            }
            return this;
        },

        to: function (pos, mute) {
            mute = mute || false;
            var activePos = -1,
                children = this.getChildren(),
                active = _active.call(this);
            if(active){ activePos = active.getIndexInParent(); }
            if (pos > (children.length - 1) || pos < 0) { return; }
            if (this._sliding) {
                return on.once(this, 'slid', lang.hitch(this, function(){
                    this.to(pos, mute);
                }));
            }
            if (activePos === pos) {
                return this.pause().cycle();
            }
            return _slide.call(this, (pos > activePos ? 'next' : 'prev'), children[pos], mute);
        },

        pause: function (e) {
            e = e || false;
            if (e !== true) { this._paused = true; }
            if (query('.next, .prev', this.domNode).length && support.trans.end) {
                on.emit(this.domNode, support.trans.end, {cancelable:true, bubbles:true});
                this.cycle(true);
            }
            clearInterval(this._intervalTimer);
            this._intervalTimer = null;
            return this;
        },

        next: function () {
            if (this._sliding) { return; }
            return _slide.call(this, 'next');
        },

        prev: function () {
            if (this._sliding) { return; }
            return _slide.call(this, 'prev');
        }
    });
});