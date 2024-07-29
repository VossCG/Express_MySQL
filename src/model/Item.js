const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Item;