//const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    }
  });

  // Before user saves to database, hash password
  User.beforeCreate(user => {
    // const salt = await bcrypt.genSalt(10);

    // const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = "";
  });

  return User;
};
