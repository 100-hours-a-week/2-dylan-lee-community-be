const fs = require('fs').promises;
const path = require('path');

// id 추가를 위한 임시 uuid 모듈
// const { v4: uuidv4 } = require('uuid');

const postsDataPath = path.join(__dirname, '../data/posts.json');

// 포스트 데이터를 읽어오는 함수
const getPosts = async () => {
    try {
        const data = await fs.readFile(postsDataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('JSON 파일 읽기 오류:', error);
        throw error;
    }
};

// ID로 단일 포스트 조회 함수
const getPostById = async (id) => {
    try {
        const posts = await getPosts();
        const postData = posts.find((post) => post.post_id === Number(id));
        if (!postData) {
            return null;
        }
        return postData;
    } catch (error) {
        console.error('포스트 데이터 조회 오류:', error);
        throw error;
    }
};

const getPaginatedPosts = async (page, limit) => {
    try {
        const posts = await getPosts();
        // 가장 최근 포스트가 맨 위에 오도록 정렬
        posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // 페이지네이션
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return posts.slice(startIndex, endIndex);
    } catch (error) {
        console.error('포스트 데이터 조회 오류:', error);
        throw error;
    }
};

module.exports = {
    getPostById,
    getPaginatedPosts,
};
