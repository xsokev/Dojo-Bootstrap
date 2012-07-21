define(['dojo/has', 'dojo/_base/sniff'],
function(has) {
    var support_transition = (function(){
        var thisBody = document.body || document.documentElement,
			thisStyle = thisBody.style,
			support = thisStyle.transition !== undefined
		        || thisStyle.WebkitTransition !== undefined
		        || thisStyle.MozTransition !== undefined
		        || thisStyle.MsTransition !== undefined
		        || thisStyle.OTransition !== undefined;

		return support && {
            end: (function() {
				var transitionEnd = "TransitionEnd";
				if (has('webkit')) {
					transitionEnd = "webkitTransitionEnd";
				} else if (has('mozilla')) {
					transitionEnd = "transitionend";
				} else if (has('opera')) {
					transitionEnd = "oTransitionEnd";
				}
				return transitionEnd;
            }())
        }
	})();
	return support_transition;
});
