module.exports = function(sequelize, DataTypes) {
  var CarePlan = sequelize.define("CarePlan", {
    taskObject: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  CarePlan.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    CarePlan.belongsTo(models.Client, {
      foreignKey: {
        //needs to be changed later to false once we get the login set up
        allowNull: true
      }
    });
  };

  return CarePlan;
};
