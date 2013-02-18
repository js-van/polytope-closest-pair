"use strict";

var closestPoint = require("polytope-closest-point");

function closestPair1dnd(a_pos, b_cell, b_positions, result) {
  var dimension = a_pos.length;
  var ra = result[0];
  for(var i=0; i<dimension; ++i) {
    ra[i] = a_pos[i];
  }
  return closestPointt(b_cell, b_positions, a_pos, result[1]);
}

module.exports.closestPair1dnd = closestPair1dnd;