"use strict";

var closestPair1dnd = require("./lib/closest_pair_1dnd.js");
var closestPairndnd = require("./lib/closest_pair_ndnd.js");

var TMP_BUFFER = new Float64Array(4);
var TMP_ARRAY = [TMP_BUFFER, TMP_BUFFER];

function closestPair(a_cell, a_positions, b_cell, b_positions, result) {
  if(a_cell.length > b_cell.length) {
    var tc = a_cell;
    a_cell = b_cell;
    b_cell = tc;
    var tp = a_positions;
    a_positions = b_positions;
    b_positions = tp;
  }
  var dimension = b_positions[0].length;
  if(!result) {
    if(TMP_BUFFER.length < dimension) {
      TMP_BUFFER = new Float64Array(b_s)
      TMP_ARRAY[0] = TMP_ARRAY[1] = TMP_BUFFER;
    }
    result = TMP_ARRAY;
  }
  switch(a_cell.length) {
    case 0:
      for(var i=0; i<dimension; ++i) {
        result[0][i] = result[1][i] = Number.NaN;
      }
      return Number.NaN;
    case 1:
      return closestPair1dnd(a_positions[a_cell[0]], b_cell, b_positions, result);
    default:
      return closestPairndnd(a_cell, a_positions, b_cell, b_positions, result);
  }
}
module.exports = closestPair;