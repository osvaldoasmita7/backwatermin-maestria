module.exports = (sequelize: any) => {
  const {DataTypes} = require('sequelize');
  return sequelize.define('orders', {
    idOrder: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'idProduct'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idOrder" },
        ]
      },
      {
        name: "fk_products_orders",
        using: "BTREE",
        fields: [
          { name: "idProduct" },
        ]
      },
    ]
  });
};
