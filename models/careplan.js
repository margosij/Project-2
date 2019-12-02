module.exports = function(sequelize, DataTypes) {
  var CarePlan = sequelize.define("CarePlan", {
    taskObject: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  CarePlan.associate = function(models) {
    // We're saying that a CarePlan should belong to an Client
    // A CarePlan can't be created without an Author due to the foreign key constraint
    CarePlan.belongsTo(models.Client, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return CarePlan;
};
