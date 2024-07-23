require("dotenv").config()
const cors = require("cors")
const express = require('express')
const sequelize = require('./src/config/database');
const userRouter = require('./src/routes/user')
const itemRouter = require("./src/routes/item")
const productRouter = require('./src/routes/product')
const app = express()

app.use(express.json())
app.use(cors())

// 驗證資料庫連接
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // 同步模型到資料庫
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database & tables synchronized!');
        // 啟動應用程式
    })
    .catch(err => {
        console.error('Unable to connect to the database or synchronize tables:', err);
        process.exit(1); // 確保在連接或同步失敗時終止應用程式
    });

app.use('/user', userRouter)
app.use("/item", itemRouter)
app.use('/product', productRouter)

app.listen(process.env.PORT)
console.log(`server listening on port:${process.env.PORT}`);