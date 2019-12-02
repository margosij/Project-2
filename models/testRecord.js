module.exports = function(sequelize, DataTypes) {
  var TestRecord = sequelize.define("TestRecord", {
    testScore: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    testPass: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    testDate: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    }
  });

  TestRecord.associate = function(models) {
    // We're saying that a TestRecord should belong to an User and TestList
    // A TestRecord can't be created without an User or TestList due to the foreign key constraint
    TestRecord.belongsTo(models.User, {
      foreignKey: "UserId"
    });
    TestRecord.belongsTo(models.TestList, {
      foreignKey: "TestListId"
    });
  };

  return TestRecord;
};
