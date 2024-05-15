"use strict";
module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');
    return sequelize.define('invoices', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        time: {
            type: DataTypes.TIME,
            allowNull: true
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        id_status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'status',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'invoices',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "fk_invoices_users",
                using: "BTREE",
                fields: [
                    { name: "created_by" },
                ]
            },
            {
                name: "fk_invoices_status",
                using: "BTREE",
                fields: [
                    { name: "id_status" },
                ]
            },
        ]
    });
};
