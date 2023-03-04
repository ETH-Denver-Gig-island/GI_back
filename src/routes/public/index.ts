const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.signUp);

router.get('/signin', (req, res) => {
    // ...
});

router.get('/user', (req, res) => {
    // ...
});

export default router;