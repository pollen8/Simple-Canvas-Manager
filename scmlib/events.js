/**
Provides some keyboard events for Scm

@module Events
**/

/**
* Create a ScmEvent <br />
* There is no need to construct a ScmEvent. You can simply use the Scm.Core field called : events.
* 
* @namespace Scm
* @class Event
* @static
* @constructor
*/

Scm.Event = Scm.Event || {};

Scm.Event = {
	ref: {
		"37": {type: "left_arrow", callback: null},
		"38": {type: "up_arrow", callback: null},
		"39": {type: "right_arrow", callback: null},
		"40": {type: "down_arrow", callback: null}
	},
	scmNode: null,
	keys:[]
};

Scm.Event.init = function(scmNode) {

	// letters
	for (var i = 65; i <= 90; i++)
		Scm.Event.ref[String(i)] = {type: String.fromCharCode(i + 32), callback: null};
				
	document.onkeydown = function(e) {

		var keys = Scm.Event.keys;

		e = window.event || e;
		if (keys.indexOf(e.keyCode) < 0)
			keys.push(e.keyCode);

		/*for (var i = 0; i != keys.length; i++)
			if (typeof(Scm.Event.ref[keys[i]]) != "undefined" && Scm.Event.ref[keys[i]].callback)
				(Scm.Event.ref[keys[i]].callback)();*/
	}

	document.onkeyup = function(e) {

		var keys = Scm.Event.keys;

		e = window.event || e;
		Scm.Event.keys.splice(keys.indexOf(e.keyCode), 1);

		/*console.log(keys.length);
		for (var i = 0; i != keys.length; i++)
			if (typeof(Scm.Event.ref[keys[i]]) != "undefined" && Scm.Event.ref[keys[i]].callback)
			{
				console.log("done !");
				(Scm.Event.ref[keys[i]].callback)();
			}*/
	}

	Scm.Event.scmNode = scmNode;
}

Scm.Event.keysHandler = function() {

	var keys = Scm.Event.keys;

	for (var i = 0; i != keys.length; i++)
			if (typeof(Scm.Event.ref[keys[i]]) != "undefined" && Scm.Event.ref[keys[i]].callback)
				(Scm.Event.ref[keys[i]].callback)();
}

//TODO : rajouter un lien dans la doc vers la liste des key

/**
* Bind an event.
*
* @method on
* @chainable
* @param type {String} Event type (such as "click" "left_arrow" ...)
* @param callback {Function} This function is called after the event.
*/

Scm.Event.on = function(type, callback) {
	
	var found = false;
		
	// SCM Event
	for (var entry in this.ref) {
		if (Scm.Event.ref[entry].type == type)
		{
			Scm.Event.ref[entry].callback = callback;
			found = true;
		}
	}

	if (!found) // Javascript Event
	{
		// Because SCM has an intern double buffer system
		// We need to redefine the click event as a mouseup event.
		// The click event will occur after the mousedown and mouseup events.
		// When the SCM buffers change, it's possible that mousedown and mouseup are happening on different DOM elements.
		// and the click event has an unexpected behavior.

		type = ((type == "click") ? ("mouseup") : (type));
		
		document.getElementById(Scm.Event.scmNode).addEventListener(type, function(e){
			
			var ret = {x: 0, y: 0};
			
			if (typeof(e.offsetX) != "undefined" &&
				typeof(e.offsetY) != "undefined")
			{
				ret.x = e.offsetX + 1;
				ret.y = e.offsetY + 1;
			}
			else if (typeof(e.layerX) != "undefined" &&
					 typeof(e.layerY) != "undefined") // firefox
			{
				ret.x = e.layerX;
				ret.y = e.layerY;
			}
			else
				ret = e.detail;

			callback(ret);
			
		}, true);
	}
	return Scm.Event;
}

/**
* Creates a custom event with the given name.<br />
* The custom event has all the same properties and methods of native events.
*
* @method fire
* @param name {String} Event name.
*/

Scm.Event.fire = function(name, obj) {
	
    var newEvent = document.createEvent('CustomEvent');

    newEvent.initCustomEvent(name, true, true, obj);
    document.getElementById(Scm.Event.scmNode).dispatchEvent(newEvent);
}

Scm.Event.init("scmContent");