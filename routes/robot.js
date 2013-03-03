// robot.js
// Routes to robot info and data

// GET /robotphoto
exports.photo = function (req, res, next) {
    res.send({ });
};

// GET /robotgraph
exports.graph = function (req, res, next) {
    res.redirect( 'http://google.com/graphvis/api' );
};