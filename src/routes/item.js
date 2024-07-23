const express = require('express');
const router = express.Router();
const Item = require('../model/Item');

router.post('/', async (req, res) => {
    try {
        const product = await Item.create(req.body)
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