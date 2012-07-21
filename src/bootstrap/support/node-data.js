define(['dojo/query', "dojo/_base/lang", "dojo/dom-attr", "dojo/_base/array", 'dojo/NodeList-data'],
function(query, lang, attr, array) {
	return {
		get: function(node, key, def){
			key = key || undefined;
			def = def || undefined;
			if(key != undefined){
				var data = query(node).data(key);
				if(def != undefined && (data && data[0] == undefined)){ 
					data = this.set(node, key, def); 
				}
				return (lang.isArray(data) && data.length > 0) ? data[0] : data;
			} else {
				return query(node).data()[0];
			}
		},
		set: function(node, key, value){
			var data = query(node).data(key, value);
			return value;
		},
		load: function(node){
			//set data attributes
			var elm = query(node)[0];
			if(elm){
				var _this = this;
				var attrs = elm.attributes;
				array.forEach(attrs, function(attr){
					if(attr.name.indexOf("data-") >= 0){
						_this.set(node, attr.name.substr(5), attr.value);
					}
				});
			}
		}
	};
});
