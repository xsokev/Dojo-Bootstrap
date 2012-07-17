/* ==========================================================
 * Dropdown.js v0.0.1
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
	"dojo/dom-attr",
	'./support/node-data',
	"dojo/NodeList-dom", 
	'dojo/NodeList-traverse',
	"dojo/domReady!" 
], function (declare, query, lang, win, on, domClass, domAttr, nodeData) {
	var toggleSelector = '[data-toggle="dropdown"]';
	var Dropdown = declare([],{
		constructor: function(element, options){
			lang.mixin(this, options);
			this.domNode = query(element).closest(toggleSelector)[0];
			if(!this.domNode){
				this.domNode = query(element)[0];
			}
			//FIXME: onclick created progammatically is not showing because it is being hidden immediately after showing
			/*
			on(this.domNode, 'click', lang.hitch(this, this.toggle));
			on(win.body(), 'click', lang.hitch(this, function(){
				query(this.domNode).parent().removeClass('open');
			}));
			*/
		},
		toggle: function(){
			if(domClass.contains(this.domNode, "disabled") || domClass.contains(this.domNode, ":disabled")){ return false; }
			var selector = domAttr.get(this.domNode, 'data-target');
			if(!selector){
				selector = domAttr.get(this.domNode, "href");
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
			}
			var targetNode = query(this.domNode).parent()[0];
			if(selector && selector!='#' && selector!=''){ 
				targetNode = query(selector).parent()[0];
			}
			var isActive = domClass.contains(targetNode, 'open');
			clearMenus();
			if(!isActive){ domClass.toggle(targetNode, 'open'); }

			return false;
		}
	});
	var clearMenus = function(){
		query(toggleSelector).parent().removeClass('open');
	};
	lang.extend(query.NodeList, {
		dropdown: function(option){
			return this.forEach(function(node){
		        var options = (lang.isObject(option)) ? option : {};
			    var data = nodeData.get(node, 'dropdown', new Dropdown(node, options));
				if(lang.isString(option)){ 
					data[option].call(data);
				}
			});
		}
	});
    on(win.body(), 'click', clearMenus);
    on(win.body(), on.selector(toggleSelector, 'click'), function(e){
	    var node = e.target;
	    var data = nodeData.get(node, 'dropdown', new Dropdown(node, {}));
		data.toggle();
		e.preventDefault();
		e.stopPropagation();

		return false;
	});
	on(win.body(), on.selector('.dropdown form', 'click'), function (e) { e.stopPropagation() })

	return Dropdown;
});