const { verifyAuth, verifyToken } = require("../middleware/authJwt");
const { readComments, createComment } = require("../controllers/comment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Comments
    app.post(
        "/comment/readComments",
        [
            verifyAuth
        ],
        readComments
    )
    app.post(
        "/comment/create",
        [
            verifyToken
        ],
        createComment
    )
    // /Comments

};