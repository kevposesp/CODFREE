const { verifyToken } = require("../middleware/authJwt");
const { checkArticleOwner } = require("../middleware/article");
const { checkOwner } = require("../controllers/article.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // User
    app.post(
        "/article/checkOwner",
        [
            verifyToken,
            checkArticleOwner
        ],
        checkOwner
    )
    // /User

};