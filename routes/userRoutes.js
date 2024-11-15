const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// 사용자 목록 조회 라우트
router.get('/', userController.getUsers);

// 회원가입 라우트
router.post('/signup', userController.addUser);

// 로그인 라우트
router.post('/login', userController.loginUser);

// 로그아웃 라우트
router.delete('/logout', userController.logoutUser);

module.exports = router;
