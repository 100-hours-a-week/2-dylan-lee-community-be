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
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
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

        const newUser = await userModel.addUser(user);

        req.session.user = {
            id: newUser.id,
            email: newUser.email,
            nickname: newUser.nickname,
        };

        res.status(201).json({ message: '사용자 등록 성공' });
    } catch (err) {
        console.error('사용자 등록 오류:', err);
        res.status(500).json({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

// 사용자 로그인
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: '필수 입력 항목 누락' });
        return;
    }

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            res.status(401).json({
                meesage: ERROR_MESSAGES.INVALID_CREDENTIALS,
            });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({
                message: ERROR_MESSAGES.INVALID_CREDENTIALS,
            });
            return;
        }

        // 세션 사용자 설정
        req.session.user = {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
        };

        res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
        console.error('로그인 오류:', err);
        res.status(500).json({
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

module.exports = {
    getUsers,
    addUser,
    loginUser,
};
