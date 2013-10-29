/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0			1			 2			  3			4			 5			  6			7			 8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

	return this._nextSpatialID++;

},

register: function(entity) {
	 var pos = entity.getPos();
	 var spatialID = entity.getSpatialID();
	 
	 // TODO: YOUR STUFF HERE!
	this._entities[spatialID] = entity;
},

unregister: function(entity) {
	 var spatialID = entity.getSpatialID();

	 // TODO: YOUR STUFF HERE!
	for (var c = 0; c < this._entities.length; c++) {
		var ent = this._entities[c];
		if (ent instanceof Entity) {
			if (ent.getSpatialID() == entity.getSpatialID()) {
				this._entities.splice(c, 1);
				break;
			}
		}
	}

},

findEntityInRange: function(posX, posY, radius) {
	var currID;
	var nearestX = 0;
	var nearestY = 0;

	
	for (var c = 0; c < this._entities.length; c++) {
		var ent = this._entities[c];
		var pos = ent.getPos();

		var dist = Math.sqrt(Math.pow(pos.posX - posX, 2) + Math.pow(pos.posY - posY, 2));
		
		if (dist <= radius) {
			console.log('found entity:', ent);
			return ent;
		}
	}

	console.log('found nothing');

	return null;
},

render: function(ctx) {
	 var oldStyle = ctx.strokeStyle;
	 ctx.strokeStyle = "red";

	 for (var ID in this._entities) {
		  var e = this._entities[ID];
		 if (e instanceof Entity) {
			 var pos = e.getPos();
			 util.strokeCircle(ctx, pos.posX, pos.posY, e.getRadius());
		 }
	 }
	 ctx.strokeStyle = oldStyle;
}

}
