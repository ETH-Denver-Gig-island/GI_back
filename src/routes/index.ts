import publicRouter from "./public";
import authRouter from "./auth";

const express = require('express');
const router = express.Router();

router.get('/public', publicRouter);

router.get('/auth', authRouter);

export default router;