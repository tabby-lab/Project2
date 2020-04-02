module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
      // The email cannot be null, and must be a proper email before creation
      budget: {type: DataTypes.STRING},
      city:{type: DataTypes.STRING},
      arrival:{type: DataTypes.STRING},
      departure:{type: DataTypes.STRING}
    
    });

    return Inventory
}