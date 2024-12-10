const express = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

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

// 포스트 메타 정보 조회 라우트
router.get('/:id/meta', postController.getPostMetaById);

// 포스트 ID로 댓글 목록 조회 라우트
router.get('/:postId/comments', commentController.getPaginatedComments);

// 포스트 ID로 댓글 생성 라우트
router.post('/:postId/comments', commentController.createComment);

// 댓글 수정 라우트
router.put('/:postId/comments/:commentId', commentController.updateComment);

// 댓글 삭제 라우트
router.delete('/:postId/comments/:commentId', commentController.deleteComment);

// 게시글 좋아요 토글
router.post('/:postId/like', postController.toggleLike);

// 게시글 좋아요 조회
router.get('/:postId/like-status', postController.getLikeStatus);

// 게시글 댓글 수 조회
router.get('/:postId/comment-count', postController.getCommentCount);

module.exports = router;
