/* ==========================================================
 * Affix.js v2.0.0
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
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style"
], function (_BootstrapWidget, declare, query, on, lang, win, domGeom, domClass, domStyle) {
    "use strict";

    // module:
    //      Affix

    var _unpin,
        _checkPosition = function(force) {
            force = force || false;
            if (domStyle.get(this.domNode, 'display') === 'none') { return; }

            var pos = domGeom.position(this.domNode, false),
                scrollHeight = win.doc.height,
                scrollTop = win.global.scrollY,
                offset = this.offset,
                reset = 'affix affix-top affix-bottom',
                affix,
                offsetTop,
                offsetBottom;

            if (typeof offset === 'number') {
                offsetBottom = offsetTop = offset;
            } else {
                if (typeof offset.top === 'function') {
                    offsetTop = offset.top();
                }
                if (typeof offset.bottom === 'function') {
                    offsetBottom = offset.bottom();
                }
            }

            affix = _unpin !== null && (scrollTop + _unpin <= pos.y) ?
                false : offsetBottom !== null && (pos.y + pos.h >= scrollHeight - offsetBottom) ?
                    'bottom' : offsetTop !== null && scrollTop <= offsetTop ?
                        'top' : false;

            if (!force && this._affixed === affix) { return; }

            this._affixed = affix;
            _unpin = affix === 'bottom' ? pos.y - scrollTop : null;

            domClass.remove(this.domNode, reset);
            domClass.add(this.domNode, 'affix' + (affix ? '-' + affix : ''));
        };

    return declare("Affix", [_BootstrapWidget], {
        // summary:
        //		Used to add affix behavior to any element.
        // description:
        //		Then use offsets to define when to toggle the pinning of an element on and off.
        // example:
        // |	<div data-dojo-type="Affix" data-dojo-props="offset: 100">...</div>
        //
        // example:
        // |	new Affix({offset: {top:60, bottom:200}});

        // offset: Number|Object|Function
        //          Pixels to offset from screen when calculating position of scroll.
        //          If a single number is provided, the offset will be applied in both top and left directions.
        //          To listen for a single direction, or multiple unique offsets, just provide an object offset: { x: 10 }.
        //          Use a function when you need to dynamically provide an offset (useful for some responsive designs).
        offset: 10,

        postCreate:function () {
            this._affixed = false;
            this.own(on(win.global, 'click, scroll', lang.hitch(this, (function () { setTimeout(lang.hitch(this, _checkPosition), 1); }))));
            _checkPosition.call(this, true);
        }
    });
});