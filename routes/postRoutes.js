const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// 페이지네이션된 포스트 목록 조회 라우트
router.get('/', postController.getPaginatedPosts);

// 포스트 생성 라우트
router.post('/', postController.createPost);

// ID로 단일 포스트 조회 라우트
router.get('/:id', postController.getPostById);

// ID로 포스트 수정 라우트
router.put('/:id', postController.updatePostById);

// ID로 포스트 삭제 라우트
router.delete('/:id', postController.deletePostById);

module.exports = router;
