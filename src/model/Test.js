const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Test = sequelize.define('test', {
    bar: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Test;