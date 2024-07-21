const connection = require('../config/database');
const User = require("./user.models")(connection.sequelize, connection.Sequelize);
const Film = require("./film.models")(connection.sequelize, connection.Sequelize);
const Purchase = require("./purchase.models")(connection.sequelize, connection.Sequelize);

// Relationships Many to Many
// User.belongsToMany(Film, {
//   through: "user_film",
//   as: "films",
//   foreignKey: "film_id",
// });

// Film.belongsToMany(User, {
//   through: "user_film",
//   as: "users",
//   foreignKey: "user_id",
// });

User.hasMany(Purchase, { as: "purchases" });

Purchase.belongsTo(User, { foreignKey: "userId", as: "user" });

Film.hasMany(Purchase, { as: "purchases" });

Purchase.belongsTo(Film, { foreignKey: "filmId", as: "film" });

module.exports = {
  User,
  Film,
  Purchase,
  sequelize: connection.sequelize,
}
