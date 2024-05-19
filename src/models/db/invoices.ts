module.exports = (sequelize: any) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define(
    "invoices",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "status",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      postalcode: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      exterior: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      interior: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      delegation: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cologne: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      id_company: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "companies",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "invoices",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_invoices_users",
          using: "BTREE",
          fields: [{ name: "created_by" }],
        },
        {
          name: "fk_invoices_status",
          using: "BTREE",
          fields: [{ name: "id_status" }],
        },
        {
          name: "fk_invoices_companies",
          using: "BTREE",
          fields: [{ name: "id_company" }],
        },
      ],
    }
  );
};
