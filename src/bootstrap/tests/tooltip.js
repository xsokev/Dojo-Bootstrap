define([
	"doh", 
	"./functions", 
	"dojo/on", 
	"dojo/dom-construct", 
	"dojo/dom-class", 
	"dojo/_base/window",
	"dojo/mouse",
	"../Tooltip"
], function(doh, fnc, on, domConstruct, domClass, win, mouse){
    "use strict";
	var tooltipHtml = '<a class="btn" rel="tooltip" title="Tooltip Title">Tooltip</a>';
	
    doh.register("bootstrap.tests.Tooltip", [
		{
	        name: "Show Tooltip",
			setUp: function(){
				this.t = domConstruct.place(tooltipHtml, win.body());
			    dojo.query("a[rel=tooltip]").tooltip();
			},
	        runTest: function(){
				//on.emit(this.t, mouse.enter, { bubbles: false, cancelable: false });
				//dojo.query(this.t).tooltip('show');
	            //doh.is(1, dojo.query(".tooltip").length);
	        },
			tearDown: function(){
				domConstruct.destroy(this.t);
			}
		}
	]);
});
