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

// 同步資料庫
sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/user', userRouter)
app.use("/item", itemRouter)
app.use('/product', productRouter)

app.listen(process.env.PORT)
console.log(`server listening on port:${process.env.PORT}`);