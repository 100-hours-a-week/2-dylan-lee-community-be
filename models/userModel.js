const fs = require('fs').promises;
const path = require('path');

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
    try {
        const users = await getUsers();
        users.push(user);
        await fs.writeFile(usersDataPath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('JSON 파일 쓰기 오류:', error);
        throw error;
    }
};

module.exports = {
    getUsers,
    addUser,
};
