// livestream.js
// Routes to livestream pages

// GET /livestream
exports.watch = function (req, res, next) {
    res.render('livestream', {
      program: null,  // program name
      recentphototime: Math.ceil(Math.random() * 10) // time since last photo
    });
};