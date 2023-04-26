const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.article = require("../models/article.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);

// RefreshToken
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// Article
db.user.hasMany(db.article, {
    foreignKey: 'userId'
})
db.article.belongsTo(db.user);

// Comment
db.article.hasMany(db.comment, {
    foreignKey: 'articleId', targetKey: 'id'
})
db.comment.belongsTo(db.article, {
    foreignKey: 'articleId', targetKey: 'id'
})

db.user.hasMany(db.comment, {
    foreignKey: 'userId', targetKey: 'id'
})

db.comment.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
})


module.exports = db;