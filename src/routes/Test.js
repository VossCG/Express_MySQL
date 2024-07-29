const express = require('express');
const router = express.Router();
const Test = require('../model/Test');

router.post('/', async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            res.status(200).json(test);
        } else {
            res.status(404).json({ message: '找不到该测试记录' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Test.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTest = await Test.findByPk(req.params.id);
            res.status(200).json(updatedTest);
        } else {
            res.status(404).json({ message: '找不到该测试记录' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Test.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: '找不到该测试记录' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
