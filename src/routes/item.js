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
            attributes: ['id', 'name', 'amount'],
            order: [['amount', 'DESC']]
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/total-amount', async (req, res) => {
    try {
        const result = await Item.sum('amount');
        res.status(200).json({ totalAmount: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/paginated', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Item.findAndCountAll({
            attributes: ['id', 'name', 'amount'],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            currentPage: page,
            totalPages: totalPages,
            items: rows,
        });
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