const express = require('express') // 설치된 express를 사용
const app = express() // express를 활용하여 app 생성
const port = 5000
const bodyParser = require('body-parser') // 설치된 body-parser를 사용
const config = require('./config/key') // Sercet 정보 확인을 위해 사용
const { User } = require('./models/User') // 생성한 User 모델을 사용
const mongoose = require('mongoose')

app.use(bodyParser.json()); // application/json 형태를 body-parser에서 사용하도록 설정
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded 형태를 body-parser에서 사용하도록 설정

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  // 회원가입 시 필요한 정보들을 Client에서 가져오면 데이터베이스에 넣어주기 위함
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }) // 에러 발생 시, 실패 로그 json으로 전달
    return res.status(200).json({ // 성공 시, 성공 로그 json으로 전달
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})