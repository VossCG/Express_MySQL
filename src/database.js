require('dotenv').config();
const { Sequelize } = require('sequelize');

// 從環境變數中讀取資料庫連接資訊
const sequelize = new Sequelize
  (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );

module.exports = sequelize;