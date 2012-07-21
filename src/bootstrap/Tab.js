/* ==========================================================
 * Tab.js v0.0.1
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
	'./support/transition',
	'./support/node-data',
	"dojo/NodeList-dom", 
	'dojo/NodeList-traverse',
	"dojo/domReady!" 
], function (declare, query, lang, win, on, domClass, domAttr, trans, nodeData) {
	var toggleSelector = '[data-toggle="tab"], [data-toggle="pill"]';
	var Tab = declare([],{
		constructor: function(element){
			this.domNode = element;
		},
		show: function(){
			var _this = this;
			var ul = query(this.domNode).closest('ul:not(.dropdown-menu)');
			if(domClass.contains(query(this.domNode).parent('li')[0], 'active')){ return; }
			var previous = query('.active a', ul[0]).last()[0];

			on.emit(this.domNode, 'show', {bubbles:false, cancelable:false, relatedTarget: previous});

			this.activate(query(this.domNode).parent('li')[0], ul[0]);

			var selector = domAttr.get(this.domNode, 'data-target');
			if(!selector){
				selector = domAttr.get(this.domNode, "href");
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
			}
			var target;
			if(selector && selector!='#' && selector!=''){ 
				target = query(selector);
				if(target[0] && target.parent()[0]){
					this.activate(target[0], target.parent()[0], function(){
						on.emit(_this.domNode, 'shown', {bubbles:false, cancelable:false, relatedTarget: previous});
					});
				}
			}
		},
		activate: function(element, container, callback){
			var active = query('> .active', container)[0];
			var transition = callback && trans && domClass.contains(active, 'fade');

			function next(){
				domClass.remove(active, 'active');
				query('> .dropdown-menu > .active', active).removeClass('active');
				domClass.add(element, 'active');

				if(transition){
					element.offsetWidth;
					domClass.add(element, 'in');
				} else {
					domClass.remove(element, 'fade');
				}

				if(query(element).parent('.dropdown-menu')[0]){
					query(element).closest('li.dropdown').addClass('active');
				}
				callback && callback();
			}

			transition ? on.once(active, trans.end, next) : next();
			domClass.remove(active, 'in');
		}
	});
	
	lang.extend(query.NodeList, {
		tab: function(option){
			return this.forEach(function(node){
				var data = nodeData.get(node, 'tab');
				if(!data){ nodeData.set(node, 'tab', (data = new Tab(node))) }
				if(lang.isString(option)){ 
					data[option].call(data);
				}
			});
		}
	});
    on(win.body(), on.selector(toggleSelector, 'click'), function(e){
	    if(e){ e.preventDefault(); }
		query(e.target).tab("show");
	});

	return Tab;
});