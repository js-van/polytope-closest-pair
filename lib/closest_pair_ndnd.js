"use strict";

var numeric = require("numeric");
var EPSILON = 1e-6;

//General purpose algorithm, uses quadratic programming, very slow
//FIXME: Should replace with GJK eventually
function closestPairndnd(a_cell, a_positions, b_cell, b_positions, result) {
  var N = a_cell.length + b_cell.length;
  var B_OFFS = a_cell.length;
  var DIMENSION = b_positions[b_cell[0]].length;
  var D = numeric.rep([N, N], 0.0);
  var dvec = numeric.rep([N], 0.0);
  for(var i=0; i<a_cell.length; ++i) {
    var pi = a_positions[a_cell[i]];
    for(var j=0; j<a_cell.length; ++j) {
      var pj = a_positions[a_cell[j]];
      D[i][j] = D[j][i] = numeric.dot(pi, pj);
    }
    for(var j=0; j<b_cell.length; ++j) {
      var pj = b_positions[b_cell[j]];
      D[i][j+B_OFFS] = D[j+B_OFFS][i] = -numeric.dot(pi, pj);
    }
  }
  for(var i=0; i<b_cell.length; ++i) {
    var pi = b_positions[b_cell[i]];
    for(var j=0; j<b_cell.length; ++j) {
      var pj = b_positions[b_cell[j]];
      D[i+B_OFFS][j+B_OFFS] = D[j+B_OFFS][i+B_OFFS] = numeric.dot(pi, pj);
    }
  }
  var A = numeric.rep([N, N+4], 0.0);
  var b = numeric.rep([N+4], 0.0);
  b[0] = 1.0-EPSILON;
  b[1] = -(1.0+EPSILON);
  b[2] = 1.0-EPSILON;
  b[3] = -(1.0+EPSILON);
  for(var i=0; i<N; ++i) {
    if(i < B_OFFS) {
      A[i][0]   = 1;
      A[i][1]   = -1
    } else {
      A[i][2]   = 1;
      A[i][3]   = -1
    }
    A[i][i+4] = 1;
  }
  for(var attempts=0; attempts<15; ++attempts) {
    var fortran_poop = numeric.solveQP(D, dvec, A, b);
    if(fortran_poop.message.length > 0) {
      //Quadratic form may be singular, perturb and resolve
      for(var i=0; i<c.length; ++i) {
        D[i][i] += 1e-8;
      }
      continue;
    } else if(isNaN(fortran_poop.value[0])) {
      break;
    } else {
      //Success!
      var solution = fortran_poop.solution;
      var ra = result[0];
      for(var i=0; i<DIMENSION; ++i) {
        ra[i] = 0.0;
        for(var j=0; j<a_cell.length; ++j) {
          ra[i] += solution[j] * a_positions[a_cell[j]][i];
        }
      }
      var rb = result[1];
      for(var i=0; i<DIMENSION; ++i) {
        rb[i] = 0.0;
        for(var j=0; j<b_cell.length; ++j) {
          rb[i] += solution[j+B_OFFS] * b_positions[b_cell[j]][i];
        }
      }
      return 2.0 * fortran_poop.value[0] + numeric.dot(x,x);
    }
  }
  for(var i=0; i<x.length; ++i) {
    result[0][i] = result[1][i] = Number.NaN;
  }
  return Number.NaN;
}

module.exports = closestPairndnd;