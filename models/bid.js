module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define("Bid", {
    // title: DataTypes.STRING,
    // description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  Bid.associate = function(models) {
    Bid.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Bid.associate = function(models) {
    Bid.belongsTo(models.Service, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Bid;
};
