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
        const result = await Item.findAll({
            attributes: ['id', 'name', 'amount']
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Item.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedItem = await Item.findOne({ where: { id } });
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: '找不到該項目' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/delete-all', async (req, res) => {
    try {
        await Item.destroy({
            where: {},
            truncate: true
        })
        res.status(200).json({ message: "所有項目已成功刪除" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Item.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(200).json({ message: "刪除成功" })
        } else {
            res.status(404).json({ message: '找不到該項目' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;