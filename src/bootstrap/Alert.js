/* ==========================================================
 * Alert.js v0.0.1
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
	'./support/transition',
	'./support/node-data',
	"dojo/NodeList-dom", 
	'dojo/NodeList-traverse',
	"dojo/domReady!" 
], function (declare, query, lang, win, on, domClass, domConstruct, domAttr, trans, nodeData) {
	var dismissSelector = '[data-dismiss="alert"]';
	var Alert = declare([],{
		defaultOptions:{},
		constructor: function(element, options){
			this.options = lang.mixin(this.defaultOptions, (options || {}));
			this.domNode = element;
	        on(this.domNode, on.selector(dismissSelector, 'click'), close);
		}
	});
	
	function close(e){
		var _this = this;
		var selector = domAttr.get(_this, 'data-target');
		if(!selector){
			selector = domAttr.get(_this, "href");
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
		}
		var targetNode;
		if(selector && selector!='#' && selector!=''){ 
			targetNode = query(selector);
		} else {
			targetNode = domClass.contains(query(_this)[0], 'alert') ? query(_this) : query(_this).parent();
		}

		e && e.stopPropagation();
	
		on.emit(targetNode[0], 'close', {bubbles:true, cancelable:true});
		domClass.remove(targetNode[0], 'in');	
		if(domClass.contains(targetNode[0], 'fade')){
			on(targetNode[0], trans.end, _remove);
		} else {
			_remove();
		}
		function _remove(){
			on.emit(targetNode[0], 'closed', {bubbles:true, cancelable:true});
			domConstruct.destroy(targetNode[0]);
		}
	    e && e.preventDefault();
		return false;
	}
	
	lang.extend(query.NodeList, {
		alert: function(option){
	        var options = (lang.isObject(option)) ? option : {};
			return this.forEach(function(node){
				var alertNode = query(node);
				var data = nodeData.get(alertNode[0], 'alert');
				if(!data){ nodeData.set(alertNode[0], 'alert', (data = new Alert(alertNode[0], options))) }
				if(lang.isString(option) && option == "close"){ 
					close.call(alertNode[0]);
				}
			});
		}
	});
    on(win.body(), on.selector(dismissSelector, 'click'), close);

	return Alert;
});