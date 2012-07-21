/* ==========================================================
 * Modal.js v0.0.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
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
	"dojo/_base/declare", 
	"dojo/query", 
	"dojo/_base/lang", 
	'dojo/_base/window',
	'dojo/on',
	'dojo/dom-class',
	'dojo/dom-construct',
	"dojo/dom-attr",
	"dojo/dom-style",
	'./support/transition',
	'./support/node-data',
	"dojo/NodeList-dom", 
	'dojo/NodeList-traverse',
	"dojo/domReady!" 
], function (declare, query, lang, win, on, domClass, domConstruct, domAttr, domStyle, trans, nodeData) {
	var toggleSelector = '[data-toggle="modal"]';
	var dismissSelector = '[data-dismiss="modal"]';
	var Modal = declare([],{
		defaultOptions: {
			backdrop: true,
			keyboard: true,
			show: true
		},
		constructor: function(element, options){
			this.options = lang.mixin(lang.clone(this.defaultOptions), (options || {}));
			this.domNode = element;
			on(this.domNode, on.selector(dismissSelector, 'click'), lang.hitch(this, this.hide))
		},
		toggle: function(){
			return this[!this.isShown ? 'show' : 'hide']();
		},
		show: function(){
	        var _this = this;
			on.emit(this.domNode, 'show', {bubbles: false, cancelable: false});
			if(this.isShown){ return; }
	        domClass.add(win.body(), 'modal-open');
	        this.isShown = true;

	        _escape.call(this);
			_backdrop.call(this, function(){
				var transition = trans && domClass.contains(_this.domNode, 'fade');
				if(!query(_this.domNode).parent().length){
					domConstruct.place(_this.domNode, win.body());
				}
				domStyle.set(_this.domNode, 'display', 'block');
				if(transition){ _this.domNode.offsetWidth; }
				domClass.add(_this.domNode, 'in');
				transition ? on.once(_this.domNode, trans.end, function(){
					on.emit(_this.domNode, 'shown', {bubbles: false, cancelable: false});
				}) : on.emit(_this.domNode, 'shown', {bubbles: false, cancelable: false});
			})
		},
		hide: function(e){
	        var _this = this;
			on.emit(this.domNode, 'hide', {bubbles: false, cancelable: false});
	        e && e.preventDefault();
	        if(!this.isShown){ return; }

	        this.isShown = false;
	        domClass.remove(win.body(), 'modal-open');
	        escape.call(this);
			domClass.remove(this.domNode, 'in');
			
			if(trans && domClass.contains(this.domNode, 'fade')){
				_hideWithTransition.call(this);
			} else {
				_hideModal.call(this);
			}
		}
	});
	
	var _getTargetSelector = function(node){
		var selector = domAttr.get(node, 'data-target');
		if(!selector){
			selector = domAttr.get(node, "href");
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
		}
		return (!selector) ? "" : selector;
	};
	
	function _hideWithTransition() {
	    var _this = this;
	    var timeout = setTimeout(function(){
			if(this.hideEvent){
	        	this.hideEvent.remove();
			}
	        _hideModal.call(_this);
	    }, 500);
	    this.hideEvent = on.once(this.domNode, trans.end, function(){
			clearTimeout(timeout);
			_hideModal.call(_this);
		});
	}

	function _hideModal(_this) {
		domStyle.set(this.domNode, 'display', 'none'); 
		on.emit(this.domNode, 'hidden', {bubbles: false, cancelable: false});
		_backdrop.call(this);
	}

	function _backdrop(callback) {
	    var _this = this;
		var animate = domClass.contains(this.domNode, 'fade') ? 'fade' : '';

	    if(this.isShown && this.options.backdrop) {
	        var doAnimate = trans && animate;
	        this.backdropNode = domConstruct.place('<div class="modal-backdrop ' + animate + '" />', win.body());
			if(this.options.backdrop != 'static'){
				on(this.backdropNode, 'click', lang.hitch(this, 'hide'));
			}
			if(doAnimate){ this.backdropNode.offsetWidth; }
			domClass.add(this.backdropNode, 'in');
			if(doAnimate){
				on.once(this.backdropNode, trans.end, callback);
			} else {
				callback();
			}
	    } else if(!this.isShown && this.backdropNode){
	        domClass.remove(this.backdropNode, 'in');
	        (trans && domClass.contains(this.domNode, 'fade')) ?
				on.once(this.backdropNode, trans.end, lang.hitch(this, _removeBackdrop)) :
				_removeBackdrop.call(this);
		} else if(callback){
			callback();
		}
	}

	function _removeBackdrop() {
		domConstruct.destroy(this.backdropNode);
		this.backdropNode = null;
	}

	function _escape(){
		var _this = this;
		if(this.isShown && this.options.keyboard) {
			this.keyupEvent = on(win.body(), 'keyup', function(e){
				e.which == 27 && _this.hide();
			});
		} else if(!this.isShown) {
			if(this.keyupEvent){
				this.keyupEvent.remove();
			}
		}
	}
  
	lang.extend(query.NodeList, {
		modal: function(option){
			return this.forEach(function(node){
				var options = lang.mixin({}, lang.mixin(nodeData.get(node), lang.isObject(option) && option));
				var data = nodeData.get(node, 'modal');
				if(!data){ nodeData.set(node, 'modal', (data = new Modal(node, options))) }
				if(lang.isString(option)){ data[option].call(data); } 
				else if(data && data.options.show){ data.show(); }
			});
		}
	});
    on(win.body(), on.selector(toggleSelector, 'click'), function(e){
		var target = query(_getTargetSelector(e.target));
		if(target[0] != undefined){
			var option = nodeData.get(target, 'modal') ? 'toggle' : lang.mixin({}, lang.mixin(nodeData.get(target), nodeData.get(e.target)));
			target.modal(option);
		}
	    if(e){ e.preventDefault(); }
	});

	return Modal;
});