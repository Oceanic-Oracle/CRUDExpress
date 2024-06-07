import express from 'express';
import methods from './database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const answer = await methods.getUsers();
        console.log(answer);
        res.status(200).json(answer);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/user', async (req, res) => {
    try {
        const { login } = req.body;
        const answer = await methods.getUser(login);
        res.status(200).json(answer);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/user', async (req, res) => {
    try {
        const { login, password } = req.body;
        const answer = await methods.createUser(login, password);
        res.status(200).json(answer);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/user', async (req, res) => {
    try {
        const { login, password } = req.body;
        const answer = await methods.updateUser(login, password);
        res.status(200).json(answer);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/user', async(req, res) => {
    try {
        const { login, password } = req.body;
        const answer = await methods.deleteUser(login, password);
        res.status(200).json(answer);
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;