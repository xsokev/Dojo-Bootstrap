/* ==========================================================
 * Support.js v1.1.0
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
    "dojo/query",
    "dojo/json",
    "dojo/has",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/_base/fx",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/NodeList-data"
],
function (query, json, has, lang, array, fx, domAttr, domStyle, domGeom) {
    "use strict";

    lang.extend(query.NodeList, {
        show:function () {
            return this.forEach(function (node) {
                node.style.display = 'block';
            });
        },
        hide:function () {
            return this.forEach(function (node) {
                node.style.display = 'none';
            });
        }
    });

    var _transition = (function () {
        var transitionEnd = (function () {
            var el = document.createElement('bootstrap');
            var transEndEventNames = {
                'WebkitTransition':'webkitTransitionEnd',
                'MozTransition':'transitionend',
                'OTransition':'oTransitionEnd',
                'transition':'transitionend'
            };
            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return transEndEventNames[name];
                }
            }
        })();
        return transitionEnd && {
            end:transitionEnd
        };
    })();

    var _loadData = function(node){
        //load data attributes
        var elm = query(node)[0];
        if(elm){
            var _this = this;
            var attrs = elm.attributes;
            array.forEach(attrs, function(attr){
                if(attr.name.indexOf("data-") >= 0){
                    _this.setData(node, attr.name.substr(5), _attrValue(attr.value));
                }
            });
        }
    };

    var _attrValue = function(val){
        if (!val) { return; }
        if (val.indexOf('{') === 0 && val.indexOf('}') === val.length-1) {
            return json.parse(val);
        } else if (val.indexOf('[') === 0 && val.indexOf(']') === val.length-1) {
            return json.parse(val);
        } else {
            return val;
        }
    };

    var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
    };

    function isEventSupported( element, eventName ) {
        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
            // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
            if ( !element.setAttribute ) {
                element = document.createElement('div');
            }
            if ( element.setAttribute && element.removeAttribute ) {
                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] === 'function';

                // If property was created, "remove it" (by setting value to `undefined`)
                if ( typeof element[eventName] !== 'undefined') {
                    element[eventName] = undefined;
                }
                element.removeAttribute(eventName);
            }
        }

        element = null;
        return isSupported;
    }

    return {
        eventObject: {
            bubbles: true,
            cancelable: true
        },
        trans: _transition,
        getData: function(node, key, def){
            key = key || undefined;
            def = def || undefined;
            if(key !== undefined && lang.isString(key)){
                var data = query(node).data(key);
                if (data && data[0] === undefined) {
                    if(query(node)[0]){ data = domAttr.get(query(node)[0], 'data-'+key); }
                    if (data !== undefined){ data = _attrValue(data); }
                    if (data === undefined && def !== undefined){
                        data = this.setData(node, key, def);
                    }
                }
                return (lang.isArray(data) && data.length > 0) ? data[0] : data;
            } else {
                _loadData.call(this, node);
                return query(node).data()[0];
            }
        },
        setData: function(node, key, value){
            var data = query(node).data(key, value);
            return value;
        },
        removeData: function(node, key){
            return query(node).removeData(key);
        },
        toCamel: function(str){
            return str.replace(/(\-[a-z])/g, function($1){ return $1.toUpperCase().replace('-',''); });
        },
        toDash: function(str){
            return str.replace(/([A-Z])/g, function($1){ return "-"+$1.toLowerCase(); });
        },
        toUnderscore: function(str){
            return str.replace(/([A-Z])/g, function($1){ return "_"+$1.toLowerCase(); });
        },
        falsey: function(val){
            return val === undefined || val === null || val === 0 || val === '0' || val === 'false' || val === false;
        },
        hrefValue: function(element){
            var href = domAttr.get(element, 'href');
            if(href !== null){
                href = href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
            }
            return href || '';
        },
        eventSupported: isEventSupported,
        fadeOut: function(node, callback){
            fx.fadeOut({node: node, onEnd: callback}).play();
        },
        place: function(node, refNode, placement){
            placement = placement || "top";

            domStyle.set(node, {top:0, left:0, display:'block'});
            var refPos = domGeom.position(refNode),
                actualWidth = node.offsetWidth,
                actualHeight = node.offsetHeight,
                nodeGeom;
            refPos.x = refNode.offsetLeft;
            refPos.y = refNode.offsetTop;

            switch (placement) {
                case 'bottom':
                    nodeGeom = {top: refPos.y + refPos.h, left: refPos.x + refPos.w / 2 - actualWidth / 2};
                    break;
                case 'top':
                    nodeGeom = {top:refPos.y - actualHeight, left:refPos.x + refPos.w / 2 - actualWidth / 2};
                    break;
                case 'left':
                    nodeGeom = {top:refPos.y + refPos.h / 2 - actualHeight / 2, left:refPos.x - actualWidth};
                    break;
                case 'right':
                    nodeGeom = {top:refPos.y + refPos.h / 2 - actualHeight / 2, left:refPos.x + refPos.w};
                    break;
            }
            return nodeGeom;
        },
        isElement: function(element){
            if (element.nodeName && element.nodeType === 1){
                return true;
            } else {
                return false;
            }
        }
    };
});