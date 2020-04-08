//const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  Service.associate = function(models) {
    Service.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Service;
};
