const express = require('express');
const router = express.Router();

// 토큰 검증이 필요한 라우터
router.get('/', (req, res) => {
    // ...
});

// 토큰 검증이 필요한 dao 용 라우터
router.get('/dao', (req, res) => {
    // ...
});

// 토큰 검증이 필요한 user 용 라우터
router.get('/user', (req, res) => {
    // ...
});

export default router;