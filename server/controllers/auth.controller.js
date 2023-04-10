const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const RefreshToken = db.refreshToken;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { enableLog } = require("../middleware/auth");

signin = async (req, res) => {
    const { username, password } = req.body
    User.findOne({
        where: {
            username
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                // expiresIn: 86400 // 24 hours
                expiresIn: config.jwtExpiration
            });

            let refreshToken = await RefreshToken.createToken(user);


            res.status(200).send({
                message: "signin_ok",
                accessToken: token,
                refreshToken: refreshToken
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

infoUser = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "err_usr_ex" });
            }
            if (!enableLog) {
                return res.status(403).send({ message: "err_usr_en" })
            }
            res.status(200).send({
                // id: user.id,
                username: user.username,
                email: user.email,
                message: "inf_ok"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

signup = (req, res) => {
    // Save User to Database
    const { name, username, email, password } = req.body
    User.create({
        name,
        username,
        email,
        password: bcrypt.hashSync(password, 8)
    })
        .then(user => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const authController = {
    signin,
    refreshToken,
    infoUser,
    signup
}

module.exports = authController