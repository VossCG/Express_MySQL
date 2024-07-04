const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

router.post('/', async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await Product.create({ name, price });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await Product.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;