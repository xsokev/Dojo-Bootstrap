define([
	"doh", 
	"./functions", 
	"dojo/on", 
	"dojo/dom-construct", 
	"dojo/dom-class", 
	"dojo/_base/window",
	"../Modal"
], function(doh, fnc, on, domConstruct, domClass, win){
    "use strict";
	var modalHtml = '<div id="myModal" class="modal hide"></div>';
	var modalToggle = '<a data-toggle="modal" href="#myModal" class="btn"></a>';
	
    doh.register("bootstrap.tests.Modal", [
		{
	        name: "Show Modal",
			setUp: function(){
				this.modal = domConstruct.place(modalHtml, win.body());
				this.toggle = domConstruct.place(modalToggle, win.body());
			},
	        runTest: function(){
				on.emit(this.toggle, "click", { bubbles: true, cancelable: true });
	            doh.is("block", this.modal.style.display);
				on.emit(this.toggle, "click", { bubbles: true, cancelable: true });
	            doh.is("none", this.modal.style.display);
	        },
			tearDown: function(){
				domConstruct.destroy(this.modal);
				domConstruct.destroy(this.toggle);
			}
		}
	]);
});
