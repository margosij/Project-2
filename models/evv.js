module.exports = function(sequelize, DataTypes) {
  var EVVRecord = sequelize.define("EVVRecord", {
    longitude: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    latitude: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: false,
      len: [1]
    }
  });

  EVVRecord.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    EVVRecord.belongsTo(models.Employee, {
      foreignKey: {
        //needs to be changed later to false once we get the login set up
        allowNull: true
      }
    });
  };
  return EVVRecord;
};
