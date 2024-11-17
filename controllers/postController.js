const postModel = require('../models/postModel');
const { ERROR_MESSAGES } = require('../constants');

// id로 단일 포스트 조회
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.getPostById(id);
        if (!post) {
            res.status(404).json({
                message: '포스트를 찾을 수 없습니다.',
            });
            return;
        }
        res.status(200).json(post);
    } catch (err) {
        console.error('포스트 조회 오류:', err);
        res.status(500).json({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

// 페이지네이션된 포스트 목록 조회
const getPaginatedPosts = async (req, res) => {
    let { page, limit } = req.query;

    page = Number(page);
    limit = Number(limit);

    // 유효성 검사
    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0) {
        res.status(400).json({
            message: '유효하지 않은 쿼리 파라미터입니다.',
        });
        return;
    }

    try {
        const posts = await postModel.getPaginatedPosts(page, limit);
        res.status(200).json(posts);
    } catch (err) {
        console.error('포스트 목록 조회 오류:', err);
        res.status(500).json({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

module.exports = {
    getPostById,
    getPaginatedPosts,
};
