module.exports = function(sequelize, DataTypes) {
  var EVVRecord = sequelize.define("EVVRecord", {
    shiftDate: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    },
    shiftStartTime: {
      type: DataTypes.TIME,
      allowNull: false,
      len: [1]
    },
    shiftEndTime: {
      type: DataTypes.TIME,
      allowNull: false,
      len: [1]
    },
    checkInLongitude: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: true
    },
    checkInLatitude: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: true
    },
    checkInTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    checkOutLongitude: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: true
    },
    checkOutLatitude: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: true
    },
    checkOutTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    shiftRecord: {
      type: DataTypes.TEXT,
      allowNull: true
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
  EVVRecord.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    EVVRecord.belongsTo(models.Client, {
      foreignKey: {
        //needs to be changed later to false once we get the login set up
        allowNull: true
      }
    });
  };
  return EVVRecord;
};
