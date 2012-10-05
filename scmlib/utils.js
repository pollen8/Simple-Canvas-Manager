
var Scm = Scm || {}; // Namespace
Scm.Utils = Scm.Utils || {}; // Sub Namespace

Scm.Utils.constructInheritance = function(a, b) {
	
	// Make the a object inherit form the b object
	var Super = function (){};
	Super.prototype = b.prototype;
	a.prototype = new Super();
}

Scm.Utils.getValidObject = function(object, def){
	
	// Transform a missing object key to his default key
	// If the object not exist, the function return the default object
	// TODO : check key type (bool, string, integer ...)

	var ret = def;
	
	if (typeof(object) != "undefined")
		for (key in def)
			ret[key] = ((!object.hasOwnProperty(key)) ? (def[key]) : (object[key]));
	
	return ret;
}
