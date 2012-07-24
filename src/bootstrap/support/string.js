define([],
function(){
	return {
		toCamel: function(str){
			return str.replace(/(\-[a-z])/g, function($1){ return $1.toUpperCase().replace('-',''); });
		},
		toDash: function(str){
			return str.replace(/([A-Z])/g, function($1){ return "-"+$1.toLowerCase(); });
		},
		toUnderscore: function(str){
			return str.replace(/([A-Z])/g, function($1){ return "_"+$1.toLowerCase(); });
		}
	}
});