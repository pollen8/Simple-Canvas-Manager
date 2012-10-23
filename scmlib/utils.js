
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

Scm.Utils.DrawableParser = function(expression) {

	this.expression = expression;

	// regex declaration
	this.regex = "^WHERE ";
	this.regex += "(";
		this.regex += "(";
			this.regex += "(type|x|y|alpha|color) ";
			this.regex += "(==|<|<=|>|>=|!=) {VALUE}";
		this.regex += ")";
		this.regex += "( && | \\|\\| |)";
	this.regex += ")";
	this.regex += "{1,}$";

	this.tokens = [];
	this.isParsable = false;
	this.values = {
		"type" : "circle|pixel|rect|text|img",
		"x" : "[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?",
		"y" : "[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?",
		"alpha": "(0.([0-9]*))|0|1",
		"color": "'#(?:[0-9a-fA-F]{3}){1,2}'"
	}

	this.isParsable = this.validate();
	this.getTokens();
}

Scm.Utils.DrawableParser.prototype.validate = function() {
	
	var param = this.expression.split(" ")[1], result = "";
	
	if (typeof(this.values[param]) != "undefined")
	{
		this.regex = this.regex.replace("{VALUE}", "("+this.values[param]+")");
		result = this.expression.match(this.regex);

		if (!result)
		{
			console.error("Scm : You have an error in your expression syntax. Check the documentation.");
			return false;
		}
		return true;
	}
	else
		console.error("Scm : Undefined reference to parameter '" + param + "' in expression : '" + expression + "'");
	return false;
}

Scm.Utils.DrawableParser.prototype.getTokens = function() {

	if (this.isParsable)
	{
		var result = this.expression.match(this.regex);

		if (result.length >= 4 && this.tokens.length == 0)
		{
			var res = result[0].split(" ");
			res.splice(0, 1);
			this.tokens = res;
		}
	}

	return this.tokens;
}