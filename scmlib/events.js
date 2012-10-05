/**
Provides some keyboard events for Scm

@module Events
**/

var Scm = Scm || {}; // Namespace

/**
* Create a ScmEvent <br />
* There is no need to construct a ScmEvent. You can simply use the Scm.Core field called : events.
* 
* @namespace Scm
* @class Event
* @constructor
*/

//TODO : rajouter un lien dans la doc vers le champs events.

Scm.Event = function(constructMethod) {

	if (!constructMethod || constructMethod != "__coreConstruct__")
		console.warning("SCM : There is no need to construct a ScmEvent. You can simply use the ScmCore field called : events.")
	this.ref = {
		"37": {type: "LEFT_ARROW", callback: null},
		"38": {type: "UP_ARROW", callback: null},
		"39": {type: "RIGHT_ARROW", callback: null},
		"40": {type: "DOWN_ARROW", callback: null},
	}
	
	var that = this;
	document.onkeydown = function(e) {
	 	var e = window.event || e;
		
		if (typeof(that.ref[e.keyCode]) != "undefined" && that.ref[e.keyCode].callback)
			(that.ref[e.keyCode].callback)();
	}
}

//TODO : rajouter un lien dans la doc vers la liste des key

/**
* Bind keyboard event.
*
* @method on
* @chainable
* @param type {String} Event type (such as "LEFT_ARROW", "UP_ARROW", "RIGHT_ARROW", "DOWN_ARROW" ...)
* @param callback {Function} This function is called after the event.
*/

Scm.Event.prototype.on = function(type, callback) {
	
	var found = false;
		
	for (var entry in this.ref) {
		if (this.ref[entry].type == type)
		{
			this.ref[entry].callback = callback;
			found = true;
		}
	}
	
	if (!found)
		console.error("SCM : event " + type + " doesn't exist !");
	
	return this;
}
