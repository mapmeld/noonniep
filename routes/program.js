// program.js
// Routes to create and fork programs

var Program = require('../models/program');

// POST /program
exports.create = function(req, res, next){
  Program.create({ name: req.body.sketchname, xml: (req.body.xml || ""), code: req.body.mysketch }, function(err, np){
    if(err){
      return next(err);
    }
    else if(req.body.xml){
      res.json({ id: np.id });
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

// GET /program/xml/:id
exports.xmlout = function (req, res, next) {
    Program.get(req.params.id, function (err, program) {
        if (err) return next(err);
        res.json( { xml: (program.xml || "") } );
    });
};