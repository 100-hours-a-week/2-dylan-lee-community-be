const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// 페이지네이션된 포스트 목록 조회 라우트
router.get('/', postController.getPaginatedPosts);

// ID로 단일 포스트 조회 라우트
router.get('/:id', postController.getPostById);

module.exports = router;
