const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// 사용자 목록 조회 라우트
// TODO: 사용자 목록 쿼리 추가 및 응답
router.get('/', userController.getUsers);

// 회원가입 라우트
router.post('/signup', userController.addUser);

module.exports = router;
