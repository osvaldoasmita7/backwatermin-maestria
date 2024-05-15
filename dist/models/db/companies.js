"use strict";
module.exports = (sequelize) => {
    const { DataTypes } = require("sequelize");
    return sequelize.define("companies", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "companies",
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "id" }],
            },
        ],
    });
};
