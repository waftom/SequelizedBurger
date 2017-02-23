module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                Customer.hasMany(models.Burger, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return Customer;
};
