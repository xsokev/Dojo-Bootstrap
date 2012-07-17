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
	"dojo/dom-attr",
	'./support/node-data',
	"dojo/NodeList-dom", 
	'dojo/NodeList-traverse',
	"dojo/domReady!" 
], function (declare, query, lang, win, on, domClass, domAttr, nodeData) {
	var toggleSelector = '[data-toggle^=button]';
	var toggleRadioSelector = '[data-toggle="buttons-radio"]';
	var Button = declare([],{
	    loadingText: 'loading...',
		constructor: function(element, options){
			this.domNode = element;
			lang.mixin(this, options);
		},
		setState: function(state){
		    var d = 'disabled';
			var resetdata = nodeData.get(this.domNode, 'resetText', lang.trim((this.domNode.tag=="INPUT") ? this.domNode.val : this.domNode.innerHTML));
		    state = state + 'Text';
			var data = nodeData.get(this.domNode, state);
			this.domNode[(this.domNode.tag=="INPUT") ? "val" : "innerHTML"] = data || this[state];

			setTimeout(lang.hitch(this, function(){
				if(state == 'loadingText'){
					domClass.add(this.domNode, d);
					domAttr.set(this.domNode, d, d);
				} else {
					domClass.remove(this.domNode, d);
					domAttr.remove(this.domNode, d);
				}
			}), 0);
		},
		toggle: function(){
			var $parent = query(this.domNode).parents(toggleRadioSelector);
			if($parent.length){
				query('.active', $parent[0]).removeClass('active');
			}
			domClass.toggle(this.domNode, 'active');
		}
	});
	
	lang.extend(query.NodeList, {
		button: function(option){
			return this.forEach(function(node){
		        var options = (lang.isObject(option)) ? option : {};
				var data = nodeData.get(node, 'button', new Button(node, options));
				if(lang.isString(option) && option=='toggle'){ data.toggle(); }
				else if(option){ data.setState(option); }
			});
		}
	});
	    
    on(win.body(), on.selector(toggleSelector, '.btn:click'), function(e){
		var $btn = query(e.target);
		$btn.button('toggle');
	});

	return Button;
});