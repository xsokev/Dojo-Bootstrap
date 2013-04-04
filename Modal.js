/* ==========================================================
 * Modal.js v2.0.0
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
    "dijit/_TemplatedMixin",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/request",
    "dojo/NodeList-traverse",
    "dojo/NodeList-manipulate"
], function (support, _BootstrapWidget, declare, _TemplatedMixin, query, on, lang, win, domConstruct, domClass, domAttr, domStyle, request) {
    "use strict";

    // module:
    //      Modal

    var _hideWithTransition = function() {
            var timeout = setTimeout(lang.hitch(this, function () {
                if (this._hideEvent) { this._hideEvent.remove(); }
                _hideModal.call(this);
            }), 500);
            this._hideEvent = support.trans ? on.once(this.domNode, support.trans.end, lang.hitch(this, function () {
                clearTimeout(timeout);
                _hideModal.call(this);
            })) : null;
        },
        _hideModal = function() {
            domStyle.set(this.domNode, 'display', 'none');
            this.emit('hidden', {});
            _backdrop.call(this);
        },
        _backdrop = function(callback) {
            var animate = domClass.contains(this.domNode, 'fade') ? 'fade' : '';
            if (this.isShown && this.backdrop) {
                var doAnimate = support.trans && animate;
                this.backdropNode = domConstruct.place('<div class="modal-backdrop ' + animate + '" />', win.body());
                on.once(this.backdropNode, 'click', this.backdrop === 'static' ?
                    lang.hitch(this.domNode, 'focus') :
                    lang.hitch(this, 'hide'));
                if (doAnimate) {
                    this._offsetWidth = this.backdropNode.offsetWidth;
                }
                domClass.add(this.backdropNode, 'in');
                if (doAnimate) {
                    on.once(this.backdropNode, support.trans.end, callback);
                } else {
                    callback();
                }
            } else if (!this.isShown && this.backdropNode) {
                domClass.remove(this.backdropNode, 'in');
                if (support.trans && domClass.contains(this.domNode, 'fade')) {
                    on.once(this.backdropNode, support.trans.end, lang.hitch(this, _removeBackdrop));
                } else {
                    _removeBackdrop.call(this);
                }
            } else if (callback) {
                callback();
            }
        },
        _removeBackdrop = function() {
            domConstruct.destroy(this.backdropNode);
            this.backdropNode = null;
        },
        _escape = function() {
            if (this.isShown && this.keyboard) {
                this._keyupEvent = this.own(on(win.body(), 'keyup', lang.hitch(this, function (e) {
                    if (e.which === 27) { this.hide(); }
                })));
            } else if (!this.isShown) {
                if (this._keyupEvent && this._keyupEvent[0]) {
                    this._keyupEvent[0].remove();
                }
            }
        },
        _enforceFocus = function() {
            var _this = this;
            this._focusInEvent = this.own(on(document, on.selector('.modal', 'focusin'), function (e) {
                if (_this.domNode !== this && !query(this, _this.domNode).length) {
                    _this.domNode.focus();
                }
            }));
        };

    // summary:
    //      Attach event to dismiss this alert if an immediate child-node has class="close"
    return declare("Modal", [_BootstrapWidget, _TemplatedMixin], {
        templateString:
            '<div class="${baseClass}">' +
            '    <div class="modal-header">' +
            '        <button type="button" class="close" data-dojo-attach-point="closeNode" aria-hidden="true">&times;</button>' +
            '        <span data-dojo-attach-point="headerNode">${header}</span>' +
            '    </div>' +
            '    <div class="modal-body" data-dojo-attach-point="containerNode"></div>' +
            '    <div class="modal-footer" data-dojo-attach-point="footerNode">${footer}</div>' +
            '</div>',

        baseClass: "modal hide",

        // backdrop: Boolean|String
        //          display backdrop when displaying modal. Value can be true, false or 'static'
        backdrop: true,

        // showOnStart: Boolean
        //          display modal after creation
        showOnStart: false,

        // content: String
        //          the text or html displayed in the dialog body
        content: "",
        _setContentAttr: function(val){
            this._set("content", val);
            if(support.isElement(this.content)){
                domConstruct.place(this.content, this.containerNode, "only");
            } else {
                query(this.containerNode).html(this.content);
            }
        },

        // remote: Boolean|String
        //          the url for the remote content
        remote: "",
        _setRemoteAttr: function(val){
            this._set("remote", val);
            if (this.remote && this.remote !== "") {
                this.emit('before-remote-load', {});
                request(this.remote).then(lang.hitch(this, function(htmlText){
                    this.set("content", htmlText);
                    this.emit('remote-loaded', {});
                }));
            }
        },

        // keyboard: Boolean
        //          allow keyboard to be used to close modal
        keyboard: true,

        // modalClass: String
        //          extra class(es) that's added to the modal after creation
        modalClass: "",

        // header: Boolean|String
        //          the text or html displayed in the dialog header. If false, the header will be hidden
        header: "",
        _setHeaderAttr: function(val){
            this._set("header", val);
            if(this.header || this.header === ""){
                domClass.remove(this.headerNode, "hide");
                if(support.isElement(this.header)){
                    domConstruct.place(this.header, this.headerNode, "only");
                } else {
                    query(this.headerNode).html(this.header);
                }
            } else {
                query(this.headerNode).addClass("hide");
            }
        },

        // footer: Boolean|String
        //          the text or html displayed in the dialog footer. If false, the footer will be hidden
        footer: "",
        _setFooterAttr: function(val){
            this._set("footer", val);
            if(this.footer || this.footer === ""){
                domClass.remove(this.footerNode, "hide");
                if(support.isElement(this.footer)){
                    domConstruct.place(this.footer, this.footerNode, "only");
                } else {
                    query(this.footerNode).html(this.footer);
                }
            } else {
                query(this.footerNode).addClass("hide");
            }
        },


        postCreate:function () {
            this.isShown = false;
            this.own(on(this.closeNode, 'click', lang.hitch(this, this.hide)));
            if(this.modalClass !== ""){
                domClass.add(this.domNode, this.modalClass);
            }
        },

        startup: function(){
            this.started = true;
            this.set("remote", this.remote);
            if(this.showOnStart){
                this.show();
            }
        },

        toggle: function(){
            // summary:
            //      hide or show the modal
            return this[!this.isShown ? 'show' : 'hide']();
        },

        show:function () {
            // summary:
            //      show the modal
            this.emit('show', {});
            if (this.isShown) { return; }

            this.isShown = true;
            _escape.call(this);
            _backdrop.call(this, lang.hitch(this, function () {
                var transition = support.trans && domClass.contains(this.domNode, 'fade');
                if (!query(this.domNode).parent().length) {
                    domConstruct.place(this.domNode, win.body());
                }
                domStyle.set(this.domNode, 'display', 'block');
                if (transition) {
                    this._offsetWidth = this.domNode.offsetWidth;
                }
                domClass.add(this.domNode, 'in');
                domAttr.set(this.domNode, 'aria-hidden', false);
                _enforceFocus.call(this);

                if (transition) {
                    on.once(this.domNode, support.trans.end, lang.hitch(this, function () {
                        this.domNode.focus();
                        this.emit('shown', {});
                    }));
                } else {
                    this.domNode.focus();
                    this.emit('shown', {});
                }
            }));
        },

        hide:function (e) {
            // summary:
            //      hide the modal
            this.emit('hide', {});
            if (e) { e.preventDefault(); }
            if (!this.isShown && e.defaultPrevented) { return; }

            this.isShown = false;
            _escape.call(this);

            if (this._focusInEvent && this._focusInEvent[0]) { this._focusInEvent[0].remove(); }

            domClass.remove(this.domNode, 'in');
            domAttr.set(this.domNode, 'aria-hidden', true);

            if (support.trans && domClass.contains(this.domNode, 'fade')) {
                _hideWithTransition.call(this);
            } else {
                _hideModal.call(this);
            }
        }
    });
});