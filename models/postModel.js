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

// 포스트 데이터를 저장하는 함수
const savePosts = async (posts) => {
    try {
        await fs.writeFile(
            postsDataPath,
            JSON.stringify(posts, null, 2),
            'utf-8'
        );
    } catch (error) {
        console.error('JSON 파일 쓰기 오류:', error);
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

// 포스트 생성 함수
const createPost = async (post, userId) => {
    try {
        const posts = await getPosts();
        const newPost = {
            post_id: posts.length + 1,
            user_id: userId,
            ...post,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        posts.push(newPost);
        await savePosts(posts);
        return newPost.post_id;
    } catch (error) {
        console.error('포스트 생성 오류:', error);
        throw error;
    }
};

// 페이지네이션된 포스트 목록 조회 함수
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
    createPost,
    getPaginatedPosts,
};
