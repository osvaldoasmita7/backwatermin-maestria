const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('postal_codes', {
    id_cat: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    cp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    colonia: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ciudad: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'postal_codes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cat" },
        ]
      },
    ]
  });
};
