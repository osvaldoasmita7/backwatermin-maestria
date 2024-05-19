module.exports = (sequelize: any) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define(
    "users_companies",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_company: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "companies",
          key: "id",
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "users_companies",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_companies_users_user",
          using: "BTREE",
          fields: [{ name: "id_user" }],
        },
        {
          name: "fk_companies_users_companies",
          using: "BTREE",
          fields: [{ name: "id_company" }],
        },
      ],
    }
  );
};
