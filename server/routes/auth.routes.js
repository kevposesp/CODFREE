const { signin, infoUser } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authJwt");
const { checkAccess } = require("../middleware/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/auth/signin",
        signin
    );

    app.post(
        "/auth/info",
        [
            verifyToken
        ],
        infoUser
    );

    app.post(
        "/auth/checkAccess",
        [
            verifyToken,
            checkAccess
        ]
    );
};