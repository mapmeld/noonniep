// program.js
// Routes to create and fork programs

var Program = require('../models/program');

// POST /program
exports.create = function(req, res, next){
  Program.create({ name: req.body.sketchname, code: req.body.mysketch }, function(err, np){
    if(err){
      return next(err);
    }
    else{
      res.redirect('/program/' + np.id);
    }
  });
};

// GET /program/:id
exports.show = function (req, res, next) {
    Program.get(req.params.id, function (err, program) {
        if (err) return next(err);
        res.render('program', {
            program: program,
            author: "anonymous"
        });
    });
};