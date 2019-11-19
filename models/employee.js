module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    employeeUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    employeePassword: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    employeeStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    employeeDOB: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    },
    employeeHireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    }
  });

  Employee.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Employee.hasMany(models.TestRecord, {
      onDelete: "cascade"
    });
  };

  return Employee;
};
