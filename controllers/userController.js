const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { ERROR_MESSAGES } = require('../constants');

// 사용자 목록 조회
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('사용자 목록 조회 오류:', err);
        res.status(500).json({
            message: ERROR_MESSAGES.FETCH_USERS,
            error: err,
        });
    }
};

// 사용자 추가
const addUser = async (req, res) => {
    const { email, nickname, password, profileImagePath } = req.body;

    // 입력 데이터 검증
    if (!email || !nickname || !password) {
        res.status(400).json({ message: '필수 입력 항목이 누락되었습니다.' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email,
            nickname,
            password: hashedPassword,
            profileImagePath: profileImagePath || null,
        };

        await userModel.addUser(user);
        res.status(201).json({ message: '사용자 등록 성공' });
    } catch (err) {
        console.error('사용자 등록 오류:', err);
        res.status(500).json({
            message: ERROR_MESSAGES.REGISTER_USER,
            error: err.message,
        });
    }
};

module.exports = {
    getUsers,
    addUser,
};
