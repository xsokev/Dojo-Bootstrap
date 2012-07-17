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
		constructor: function(element, options){
			this.domNode = element;
			lang.mixin(this, options);
		},
		close: function(){
			on.emit(this.domNode, 'close', {bubbles:true, cancelable:true});
			domClass.remove(this.domNode, 'in');
			if(domClass.contains(this.domNode, 'fade')){
				on(this.domNode, trans.end, lang.hitch(this, '_remove'));
			} else {
				this._remove();
			}
		},
		_remove: function(){
			on.emit(this.domNode, 'closed', {bubbles:true, cancelable:true});
			domConstruct.destroy(this.domNode);
		}
	});
	
	lang.extend(query.NodeList, {
		alert: function(option){
			return this.forEach(function(node){
				var parent = query(node).parent();
				if(parent.query(dismissSelector).length == 0){
					domAttr.set(node, "data-dismiss", "alert")
				}
				var data = nodeData.get(parent, 'alert', new Alert(parent[0]));
				if(lang.isString(option)){ 
					data[option].call(data);
				}
			});
		}
	});
    on(win.body(), on.selector(dismissSelector, 'click'), function(e){
	    var alertNode = query(e.target).closest('.alert');
		var alertObj = nodeData.get(alertNode, 'alert', new Alert(alertNode[0], {}));
		if(alertObj){ alertObj.close(); }
	    if(e){ e.preventDefault(); }
	});

	return Alert;
});