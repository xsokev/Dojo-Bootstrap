define(['dojo/has', 'dojo/_base/sniff'],
function(has) {
	var support_transition = (function(){
		var transitionEnd = (function(){
			var el = document.createElement('bootstrap');
			var transEndEventNames = {
				'WebkitTransition' : 'webkitTransitionEnd',
				'MozTransition'    : 'transitionend',
				'OTransition'      : 'oTransitionEnd',
				'msTransition'     : 'MSTransitionEnd',
				'transition'       : 'transitionend'
			};
	        for(var name in transEndEventNames){
				if(el.style[name] !== undefined){
					return transEndEventNames[name];
				}
			}
		})();
		return transitionEnd && {
			end: transitionEnd
		}
	})();
	return support_transition;
});
