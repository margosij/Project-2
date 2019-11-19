module.exports = function(sequelize, DataTypes) {
  var EVVRecord = sequelize.define("EVVRecord", {
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      len: [1]
    }
  });

  EVVRecord.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    EVVRecord.belongsTo(models.Employee, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return EVVRecord;
};
