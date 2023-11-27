// const express = require('express');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const bodyParser = require('body-parser');
// const authCheck = require('./lib_login/authCheck.js');
// const db = require('./db.js');

// const app = express(); // express 애플리케이션 객체 생성
// const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: false }));

// // 세션 설정
// app.use(session({
//     secret: '~~~',
//     resave: false,
//     saveUninitialized: true,
//     store: new FileStore(),
// }));
// router.get('/', function (req, res) {
//     if (!authCheck.isOwner(req, res)) {
//         res.send('세션이 유효하지 않습니다.');
//     } else {
//         res.send('세션이 유효합니다.');
//     }
// });
// // router.get('/', function (req, res) {
// //     if (!authCheck.isOwner(req, res)) {
// //         res.redirect('/auth/login');
// //         return false;
// //     }

// //     const html = template.HTML('Write Introduction',
// //         `<h2>자기소개서 작성</h2>
// //         <form action="/write/process" method="post">
// //             <p><textarea name="content" placeholder="자기소개서 내용을 입력하세요" rows="10" cols="50"></textarea></p>
// //             <p><input class="btn" type="submit" value="작성 완료"></p>
// //         </form>`,
// //         authCheck.statusUI(req, res)
// //     );
// //     res.send(html);
// // });
// router.get('/', (req, res) => {
//     // if (!authCheck.isOwner(req, res)) {
//     //   // 로그인되지 않은 경우 로그인 페이지로 리디렉션
//     //   return res.redirect('/auth/login');
//     // }
    
//     // 여기에 자기소개서 작성 페이지를 렌더링하는 로직 추가
//     res.send('This is the write page.');
//   });
// // router.get('/', (req, res) => {
// //   if (!authCheck.isOwner(req, res)) {
// //     res.redirect('/auth/login');
// //     return false;
// //   }

// //   // 자기소개서 작성 페이지 템플릿
// //   const html = template.HTML('Write Introduction',
// //     `<h2>자기소개서 작성</h2>
// //      <form action="/write/process" method="post">
// //        <p><input type="text" name="title" placeholder="제목"></p>
// //        <p><textarea name="content" placeholder="내용"></textarea></p>
// //        <p><input type="submit" value="작성"></p>
// //      </form>`,
// //     authCheck.statusUI(req, res)
// //   );

// //   res.send(html);
// // });

// router.post('/write/process', (req, res) => {
//   if (!authCheck.isOwner(req, res)) {
//     res.redirect('/auth/login');
//     return false;
//   }

//   const user_id = req.session.nickname;
//   const title = req.body.title;
//   const content = req.body.content;

//   // 자기소개서 정보를 DB에 저장
//   db.query('INSERT INTO my (user_id, title, content) VALUES (?, ?, ?)',
//     [user_id, title, content],
//     (error, results, fields) => {
//       if (error) throw error;
//       res.redirect('/main'); // 자기소개서 작성 완료 후 메인 페이지로 이동
//     }
//   );
// });

// module.exports = router;