const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50 // 최대 길이
    },
    email: {
        type: String,
        trim: true, // 공백 제거
        unique: 1 // 유니크 속성
    },
    password: {
        type: String,
        minlength: 5 // 최소 길이
    },
    lastname: {
        type: String,
        maxlength: 50 // 최대 길이
    },
    role: { // 사용자의 계정권한, 관리자/사용자 등
        type: Number,
        default: 0
    },
    image: String, // Object 사용하지 않을 수도 있음
    token: { // 토큰을 이용해서 유효성
        type: String
    },
    tokenExp: { // 토근을 이용해서 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema) // 이름, 스키마명을 넣어 모델로 감싸줌
module.exports = { User } // 다른 곳에서도 사용할 수 있도록 exports를 해줌