// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

require([
	'dojo/dom-geometry',
	'bootstrap/Alert',
	'bootstrap/Button',
	'bootstrap/Collapse',
	'bootstrap/Dropdown',
	'bootstrap/Modal',
	'bootstrap/Popover',
	'bootstrap/Scrollspy',
	'bootstrap/Tab',
	'bootstrap/Tooltip',
    'bootstrap/Typeahead',
    'bootstrap/Carousel',
    'dojo/domReady!'
], function(geom){
    "use strict";

    var q = dojo.query;
	q("section [href^=#], .navbar [href^=#]").on("click", function(e){ e.preventDefault(); return false; });

    window.prettyPrint && window.prettyPrint();	// make code pretty

	var win = window,
		nav = q('.subnav'),
		navTop = q('.subnav').length && geom.position(q('.subnav')[0]).y - 40,
		isFixed = 0;
		
	// hack sad times - holdover until rewrite for 2.1
	/*
	nav.on('click', function () {
			if(!isFixed){ 
				setTimeout(function(){ 
					document.body.scrollTop = document.body.scrollTop - 47;
					on.emit(document.body, "scroll", { bubbles: true, cancelable: false });
				}, 10); 
			}
		});
	*/

    q('#myCarousel').carousel();		// carousel demo
	
	processScroll();
	q(win).on('scroll', processScroll);
	
	function processScroll(){
		var i, scrollTop = document.body.scrollTop;
		if (scrollTop >= navTop && !isFixed) {
			isFixed = 1;
			nav.addClass('subnav-fixed');
		} else if (scrollTop <= navTop && isFixed) {
			isFixed = 0;
			nav.removeClass('subnav-fixed');
		}
	}

    q('.tooltip-demo.well').tooltip({
		selector: "a[rel=tooltip]"
    });

	q('.tooltip-test').tooltip();
	q('.popover-test').popover();
	
	q("a[rel=popover]").popover();
    
	q("#fat-btn").on("click", function(e){
		q(e.target).button('loading');
		setTimeout(function(){
			q(e.target).button('reset');
		}, 3000);
	});

});
