const fs = require('fs').promises;
const path = require('path');

// id 추가를 위한 임시 uuid 모듈
const { v4: uuidv4 } = require('uuid');

const usersDataPath = path.join(__dirname, '../data/users.json');

// 사용자 데이터를 읽어오는 함수
const getUsers = async () => {
    try {
        const data = await fs.readFile(usersDataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('JSON 파일 읽기 오류:', error);
        throw error;
    }
};

// 사용자 데이터를 추가하는 함수
const addUser = async (user) => {
    // TODO: 사용자 데이터 검증 로직
    try {
        const users = await getUsers();
        const timestamp = new Date().toISOString();
        const newUser = {
            id: uuidv4(),
            ...user,
            createdAt: timestamp,
            updatedAt: timestamp,
        };
        users.push(newUser);
        await fs.writeFile(usersDataPath, JSON.stringify(users, null, 2));
        return newUser;
    } catch (error) {
        console.error('JSON 파일 쓰기 오류:', error);
        throw error;
    }
};

// 이메일로 사용자 데이터를 가져오는 함수
const getUserByEmail = async (email) => {
    try {
        const users = await getUsers();
        return users.find((user) => user.email === email);
    } catch (error) {
        console.error('사용자 데이터 조회 오류:', error);
        throw error;
    }
};

module.exports = {
    getUsers,
    addUser,
    getUserByEmail,
};
