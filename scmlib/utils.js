
var Scm = Scm || {}; // Namespace
Scm.Utils = Scm.Utils || {}; // Sub Namespace

Scm.Utils.constructInheritance = function(a, b) {
	
	// Make the A object inherit form the B object
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

Scm.Utils.extend = function(obj, o) {
	//super.call(this, x, y, 10, "#FF00FF")
	//console.log(o);
	//o.call(obj, o.x, o.y, 10, "#FF00FF");

	Scm.Utils.constructInheritance(obj, Scm.Circle);
	//Scm.Utils.constructInheritance(obj, o);
	//Scm.Utils.constructInheritance(fallingBall, Scm.Circle);
}
