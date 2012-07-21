define([
	"doh", 
	"./functions", 
	"dojo/on", 
	"dojo/dom-construct", 
	"dojo/dom-class", 
	"dojo/_base/window",
	"../support/node-data",
	"../Button"
], function(doh, fnc, on, domConstruct, domClass, win, nodeData){
    "use strict";
	var b1 = '<button id="b1" data-loading-text="loading..." data-complete-text="finished!" class="btn">State</button>';
	var b2 = '<button id="b2" class="btn" data-toggle="button">Single Toggle</button>';
	var bg1 = '<div class="btn-group" data-toggle="buttons-checkbox"><button class="btn">Bold</button><button class="btn">Normal</button></div>';
	var bg2 = '<div class="btn-group" data-toggle="buttons-radio"><button class="btn">Left</button><button class="btn">Right</button></div>';
	
    doh.register("bootstrap.tests.Button", [
		{
	        name: "Button Toggle",
			setUp: function(){
				this.b = domConstruct.place(b2, win.body());
			},
	        runTest: function(){
				on.emit(this.b, "click", { bubbles: true, cancelable: true });
	            doh.t(domClass.contains(this.b, 'active'));
				dojo.query(this.b).button('toggle');
	            doh.f(domClass.contains(this.b, 'active'));
	        },
			tearDown: function(){
				domConstruct.destroy(this.b);
			}
		},
		{
	        name: "Button States",
			setUp: function(){
				this.b = domConstruct.place(b1, win.body());
			},
	        runTest: function(){
				dojo.query(this.b).button('loading');
	            doh.is(this.b.innerHTML, 'loading...');
				dojo.query(this.b).button('complete');
	            doh.is(this.b.innerHTML, 'finished!');
				dojo.query(this.b).button('reset');
	            doh.is(this.b.innerHTML, 'State');
	        },
			tearDown: function(){
				domConstruct.destroy(this.b);
	        }
		},
		{
	        name: "Checkbox Group",
			setUp: function(){
				this.bg = domConstruct.place(bg1, win.body());
			},
	        runTest: function(){
				dojo.query('button:nth-child(1)', this.bg).button('toggle');
	            doh.is(dojo.query('button.active', this.bg).length, 1);
				dojo.query('button:nth-child(2)', this.bg).button('toggle');
	            doh.is(dojo.query('button.active', this.bg).length, 2);
	        },
			tearDown: function(){
				domConstruct.destroy(this.bg);
	        }
		},
		{
	        name: "Radio Group",
			setUp: function(){
				this.bg = domConstruct.place(bg2, win.body());
			},
	        runTest: function(){
				dojo.query('button:nth-child(1)', this.bg).button('toggle');
	            doh.is(dojo.query('button.active', this.bg).length, 1);
				dojo.query('button:nth-child(2)', this.bg).button('toggle');
	            doh.is(dojo.query('button.active', this.bg).length, 1);
	        },
			tearDown: function(){
				domConstruct.destroy(this.bg);
	        }
		}
	]);
});
