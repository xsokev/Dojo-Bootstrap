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

    // module:
    //      Carousel
    var _active = function () {
            return array.filter(this.getChildren(), function (child) {
                return child.active;
            })[0];
        },
        _slide = function (type, next, mute) {
            var active = _active.call(this),
                direction = type === 'next' ? 'left' : 'right',
                fallback = type === 'next' ? 'first' : 'last',
                children = this.getChildren(),
                isCycling = this._intervalTimer,
                indicators, eventObj;
            next = next || active._getSibling(type);

            this._sliding = true;
            if (isCycling) {
                this.pause();
            }

            if (!(next instanceof CarouselItem)) {
                next = fallback === "last" ? children[children.length - 1] : children[0];
            }

            if (next && next.active) {
                return;
            }

            if (this.indicators) {
                indicators = query("li", this.indicatorsNode);
                if (indicators.length) {
                    query(".active", this.indicatorsNode).removeClass('active');
                    on.once(this, "slid", lang.hitch(this, function () {
                        var active = _active.call(this),
                            nextIndicator = indicators[active ? active.getIndexInParent() : 0];
                        if (nextIndicator) {
                            domClass.add(nextIndicator, "active");
                        }
                    }));
                }
            }

            eventObj = {
                relatedTarget: next,
                previousTarget: active,
                direction: direction
            };
            if (!mute && support.trans && domClass.contains(this.domNode, 'slide')) {
                this.emit('slide', eventObj);
                domClass.add(next.domNode, type);
                this._offsetWidth = next.domNode.offsetWidth;

                if (active) {
                    domClass.add(active.domNode, direction);
                }
                domClass.add(next.domNode, direction);
                on.once(this.domNode, support.trans.end, lang.hitch(this, function () {
                    domClass.remove(next.domNode, [type, direction].join(' '));
                    next.set('active', true);
                    if (active) {
                        domClass.remove(active.domNode, direction);
                        active.set("active", false);
                    }
                    this._sliding = false;
                    setTimeout(lang.hitch(this, function () {
                        this.emit('slid', eventObj);
                    }), 0);
                }));
            } else {
                this.emit('slide', eventObj);
                if (active) {
                    active.set("active", false);
                }
                next.set("active", true);
                this._sliding = false;
                this.emit('slid', eventObj);
            }

            if (isCycling) {
                this.cycle();
            }
            return this;
        };

    return declare("Carousel", [_BootstrapWidget, _TemplatedMixin, _Container], {
        // summary:
        //      Create a transition capable slideshow of any html content.
        // description:
        //      Uses a template to provide HTML required for displaying a Carousel using Twitter Bootstrap.
        //      Uses properties to control the display of Carousel elements.
        //
        //      ## Events ##
        //		Call `widget.on("slide", func)` to monitor when a CarouselItem starts transitioning.
        //
        //		Call `widget.on("slid", func)` to monitor when a CarouselItem has finished transitioning.
        //
        // example:
        // |  <div id="my-carousel" class="slide" data-dojo-type="Carousel" data-dojo-props="...">
        // |      <div data-dojo-type="CarouselItem" data-dojo-props="img:'img1.jpg', title:'One', content:'Uno'"></div>
        // |      <div data-dojo-type="CarouselItem" data-dojo-props="img:'img2.jpg', title:'Two', content:'Dos'"></div>
        // |      <div data-dojo-type="CarouselItem" data-dojo-props="img:'img3.jpg', title:'Three', content:'Tres'"></div>
        // |  </div>
        //
        // example:
        // |	new Carousel({interval: 5000, pauseOnHover: false}, );
        //

        templateString:
            '<div class="carousel hide">' +
            '    <ol class="carousel-indicators" data-dojo-attach-point="indicatorsNode"></ol>' +
            '    <div class="carousel-inner" data-dojo-attach-point="containerNode"></div>' +
            '    <a class="left carousel-control" data-slide="prev" data-dojo-attach-point="prevNode">&lsaquo;</a>' +
            '    <a class="right carousel-control" data-slide="next" data-dojo-attach-point="nextNode">&rsaquo;</a>' +
            '</div>',

        // indicators: Boolean
        //          whether indicators are visible. Default is true.
        indicators: true,

        // navigatable: Boolean
        //          whether navigation controls are visible. Default is true.
        navigatable: true,

        // interval: Number
        //          elapsed time between slides in milliseconds. Default is 3000.
        interval: 3000,

        // currentSlide: Number
        //          the start slide of current. Default is 0.
        currentSlide: 0,

        // pauseOnHover: Boolean
        //          whether hovering over carousel causes it to stop cycling. Default is true.
        pauseOnHover: true,

        postCreate: function () {
            // summary:
            //      registers event handlers and hides necessary controls based on properties. Also creates
            //      indicators for each carousel item.
            // tags:
            //		private extension
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
                query("[data-dojo-type*='CarouselItem']", this.domNode).forEach(function (item, index) {
                    var indicator = domConstruct.toDom("<li></li>");
                    domAttr.set(indicator, "data-slide-to", index);
                    if (domClass.contains(item, "active")) {
                        domClass.add(indicator, "active");
                    }
                    domConstruct.place(indicator, this.indicatorsNode);
                }, this);
                this.own(on(this.indicatorsNode, "click", lang.hitch(this, function (e) {
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

        startup: function () {
            // summary:
            //      sets the current slide and starts the slideshow.
            // tags:
            //		private extension
            this.inherited(arguments);
            this.to(this.currentSlide, true);
            domClass.remove(this.domNode, "hide");
            this.cycle();
        },

        cycle: function (/*Object|Boolean?*/ e) {
            // summary:
            //      starts the carousel slideshow
            e = e || false;
            if (e !== true) {
                this._paused = false;
            }
            if (this.interval && !this._paused) {
                this._intervalTimer = setInterval(lang.hitch(this, 'next'), this.interval);
            }
            return this;
        },

        to: function (/*Number*/ position, /*Boolean?*/ mute) {
            // summary:
            //      activates the slide indicated by the position parameter.
            // returns:
            //      returns a reference to the widget.
            // position:
            //      zero based index of CarouselItem
            // mute:
            //      optional boolean value to silence the event trigger if true
            mute = mute || false;
            var activePos = -1,
                children = this.getChildren(),
                active = _active.call(this);
            if (active) {
                activePos = active.getIndexInParent();
            }
            if (position > (children.length - 1) || position < 0) {
                return;
            }
            if (this._sliding) {
                return on.once(this, 'slid', lang.hitch(this, function () {
                    this.to(position, mute);
                }));
            }
            if (activePos === position) {
                return this.pause().cycle();
            }
            return _slide.call(this, (position > activePos ? 'next' : 'prev'), children[position], mute);   //return Carousel
        },

        pause: function (/*Object|Boolean?*/ e) {
            // summary:
            //      stops the carousel from cycling.
            // returns:
            //      returns a reference to the widget.
            e = e || false;
            if (e !== true) {
                this._paused = true;
            }
            if (query('.next, .prev', this.domNode).length && support.trans.end) {
                on.emit(this.domNode, support.trans.end, {
                    cancelable: true,
                    bubbles: true
                });
                this.cycle(true);
            }
            clearInterval(this._intervalTimer);
            this._intervalTimer = null;
            return this;    //return Carousel
        },

        next: function () {
            // summary:
            //      displays the next slide in the carousel
            // returns:
            //      returns a reference to the widget.
            if (this._sliding) {
                return;
            }
            return _slide.call(this, 'next');
        },

        prev: function () {
            // summary:
            //      displays the prev slide in the carousel
            // returns:
            //      returns a reference to the widget.
            if (this._sliding) {
                return;
            }
            return _slide.call(this, 'prev');
        }
    });
});
