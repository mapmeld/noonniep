// livestream.js
// Routes to livestream pages

var Program = require('../models/program');

// GET /livestream
exports.watch = function (req, res, next) {
  Program.getLatest(function(err, program){
    res.render('livestream', {
      program: program[0].programs._data.data
    });
  });
};