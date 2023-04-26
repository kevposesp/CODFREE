const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const { TokenExpiredError } = jwt

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(200).send({
            //   message: "No token provided!"
            message: "err_auth_no_token"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            // return res.status(401).send({
            //     // message: "Unauthorized!"
            //     message: "err_auth_unauth"
            // });
            return catchError(err, res)
        }
        req.statusUser = true
        req.userId = decoded.id;
        next();
    });
};

verifyAuth = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        req.statusUser = false
    } else {
        req.statusUser = true
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return catchError(err, res)
            }
            req.userId = decoded.id;
        });
    }
    next()
}

const authJwt = {
    verifyToken,
    verifyAuth
};
module.exports = authJwt;