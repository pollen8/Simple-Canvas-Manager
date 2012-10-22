
var Scm = Scm || {}; // Namespace
Scm.Utils = Scm.Utils || {}; // Sub Namespace

// Make the A object inherit form the B object

Scm.Utils.constructInheritance = function(a, b) {
	
	var Super = function (){};
	Super.prototype = b.prototype;
	a.prototype = new Super();
}

// Transform a missing object key to his default key
// If the object not exist, the function return the default object
// TODO : check key type (bool, string, integer ...)

Scm.Utils.getValidObject = function(object, def) {

	var ret = def;
	
	if (typeof(object) != "undefined")
		for (key in def)
			ret[key] = ((!object.hasOwnProperty(key)) ? (def[key]) : (object[key]));
	
	return ret;
}

Scm.Utils.createDomElement = function(type, parent, id, width, height, style, displayed) {

	var elem = document.createElement(type),
		dValue;

	displayed = displayed || true;
	dValue = ((displayed) ? ("block") : ("none"));
	elem.setAttribute("id", id);
	elem.setAttribute("width", width);
	elem.setAttribute("height", height);
	elem.setAttribute("style", style + " display: " + dValue + ";");

	document.getElementById(parent).appendChild(elem);
}