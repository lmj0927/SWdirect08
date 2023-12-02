const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)
var authRouter = require('./lib_login/auth');
var authCheck = require('./lib_login/authCheck.js');
var template = require('./lib_login/template.js');
var db = require('./db.js');
const app = express()
const port = 8080


const boardRouter = require('./board.js'); // board.js를 불러옴
app.use('board', boardRouter); // /board 경로에 대한 라우터로 boardRouter를 사용
// const writeRouter = require('./write'); // write.js를 불러옴

// app.use('/write', writeRouter); // /write 경로에 대한 라우터로 writeRouter를 사용

// app.use('./write', writeRouter); // /write 경로에 대한 라우터로 writeRouter를 사용




app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
      res.redirect('/auth/login');
      return false;
  }

  // 자기소개서 작성 버튼 추가
  const html = template.HTML('Welcome',
  `<hr>
  <h2>메인 페이지에 오신 것을 환영합니다</h2>
  <p>로그인에 성공하셨습니다.</p>
  <a href="/write-introduction">자기소개서 작성</a>
  <br>
  <a href="/view-introduction">내 자기소개서 보기</a> | <a href="/edit-introduction">자기소개서 수정</a>
  <br>
  <a href="/write-notice">공고글 작성</a>
  <a href="/view-mynotices">내 작성글 보기</a>
  <a href="/view-allnotice">모든 공고글 보기</a>
  <a href="/view-messages">내가 받은 메시지 확인</a>

  `, // 버튼 링크 추가
  authCheck.statusUI(req, res)
);
res.send(html);
});


app.get('/write-introduction', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var userId = req.session.mail;
  console.log("userid",userId)

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 빈 값을 기본값으로 설정
    // 자기소개서 작성 페이지 렌더링
    var html = template.HTML('Write Introduction',
      `<hr>
        <h2>자기소개서 작성</h2>
        <form action="/write-introduction-process" method="post">
          <p><input type="text" name="name"  placeholder="이름"></p>
          <p><input type="text" name="callnum"  placeholder="전화번호"></p>
          <p><input type="submit" value="작성 완료"></p>
        </form>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
 
  });
});

  
app.post('/write-introduction-process', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var userId = req.session.mail;
  var pwd = req.session.pwd;
  console.log("입력받은 name:", req.body.name);
  console.log("입력받은 callnum:", req.body.callnum);
  console.log("userid",userId);
  console.log("pwd",pwd)
  var name = req.body.name;
  var callnum = req.body.callnum;
  if (!name || !callnum) {
    // Send an alert message and redirect back to the write introduction page
    res.send(
      `<script>
        alert("이름과 전화번호를 모두 입력하세요.");
        window.location.href = '/write-introduction';
      </script>`
    );
    return false;
  }
  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 새로 추가, 있는 경우 업데이트
    if (results.length > 0) {
      // 이미 자기소개서 정보가 있는 경우, 업데이트
      db.query('UPDATE my SET name = ?, callnum = ? WHERE id = ?', [name, callnum, userId], function (error, data) {
        if (error) throw error;
        res.redirect('/main');  // 업데이트 후 메인 페이지로 리다이렉션
      });
    } 
  });
});
app.get('/view-introduction', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
        res.redirect('/auth/login');

    return false;
  }

  var userId = req.session.mail;

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 빈 값을 기본값으로 설정
    var introduction = results.length > 0 ? results[0] : { name: '', callnum: '' };

    // 자기소개서 보기 페이지 렌더링
    var html = template.HTML('View Introduction',
      `<hr>
        <h2>내 자기소개서 보기</h2>
        <p><strong>이름:</strong> ${introduction.name}</p>
        <p><strong>전화번호:</strong> ${introduction.callnum}</p>
        <a href="/main">메뉴돌아가기</a>`, // 자기소개서 수정 버튼 추가
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
});

app.get('/edit-introduction', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var userId = req.session.mail;

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 빈 값을 기본값으로 설정
    var introduction = results.length > 0 ? results[0] : { name: '', callnum: '' };

    // 자기소개서 수정 페이지 렌더링
    var html = template.HTML('Edit Introduction',
      `<hr>
        <h2>자기소개서 수정</h2>
        <form action="/edit-introduction-process" method="post">
          <p><input type="text" name="name" value="${introduction.name}" placeholder="이름"></p>
          <p><input type="text" name="callnum" value="${introduction.callnum}" placeholder="전화번호"></p>
          <p><input type="submit" value="수정 완료"></p>
        </form>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
  
});

app.post('/edit-introduction-process', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var userId = req.session.mail;
  var pwd = req.session.pwd;

  console.log("userid",userId);
  console.log("pwd",pwd)
  var name = req.body.name;
  var callnum = req.body.callnum;

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 새로 추가, 있는 경우 업데이트
    if (results.length > 0) {
      // 이미 자기소개서 정보가 있는 경우, 업데이트
      db.query('UPDATE my SET name = ?, callnum = ? WHERE id = ?', [name, callnum, userId], function (error, data) {
        if (error) throw error;
        res.redirect('/main');  // 업데이트 후 메인 페이지로 리다이렉션
      });
    } else {
      // 자기소개서 정보가 없는 경우, 새로 추가
      db.query('INSERT INTO my (id, callnum, name) VALUES (?, ?, ?)', [userId, name, callnum], function (error, data) {
        if (error) throw error;
        res.redirect('/main');  // 추가 후 메인 페이지로 리다이렉션
      });
    }
  });
});







app.get('/write-notice', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }
  var writeremail = req.session.mail;
  const html = template.HTML('Write Notice',
    `
    <!DOCTYPE html>
    <html>
    <head>
        <title>글 작성</title>
        <link rel='stylesheet' href='/stylesheets/style.css'/>
    </head>
    <body>
        <h1>글 작성</h1>
        <form action="/board/write" method="post">
            <table border="1">
                <tr>
                    <td>작성자</td>
                    <td><input type="text" name="name" id="name" value="${writeremail}" readonly/></td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td><input type="text" name="title" id="title" required/></td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td><textarea name="content" id="content" cols="30" rows="10" required></textarea></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button type="submit">글쓰기</button>
                    </td>
                </tr>
            </table>
        </form>
    </body>
    </html>
    `,
    authCheck.statusUI(req, res)
  );
  res.send(html);
});

app.post('/board/write', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }
  var writeemail = req.session.mail;

  const title = req.body.title;
  const content = req.body.content;
  // writing 테이블에 데이터 추가, wid는 자동으로 증가
  db.query('INSERT INTO writing (writeremail, title, content) VALUES (?, ?, ?)', [writeemail, title, content], function (error, data) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
      return res.status(500).send('글 작성 중 에러가 발생했습니다.');
    }

    // 글 작성 후 메인 페이지로 리다이렉션
    res.redirect('/main');
  });
});

app.get('/view-mynotices', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var writeemail = req.session.mail;

  // writing 테이블에서 사용자가 작성한 글 목록을 가져옴
  db.query('SELECT * FROM writing WHERE writeremail = ?', [writeemail], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
      return res.status(500).send('내 작성글을 불러오는 중 에러가 발생했습니다.');
    }
    const formattedPosts = results.map(post => ({
      ...post,
      created_at: post.created_at.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
    }));
    // 가져온 글 목록을 표 형태로 나타내고 각각의 제목을 클릭하면 해당 글로 이동하는 HTML 생성
    const html = template.HTML('내 작성글 목록',
      `<hr>
      <h2>내 작성글 목록</h2>
      <table border="1">
        <tr>
          <th>제목</th>
          <th>작성일자</th>
        </tr>
        ${formattedPosts.map(result =>  `
          <tr>
            <td><a href="/view-mynotices/${result.wid}">${result.title}</a></td>
            <td>${result.created_at}</td>
          </tr>
          
        `).join('')}
      </table> <a href="/main">메뉴로 돌아가기</a>`,      authCheck.statusUI(req, res)
    );

    res.send(html);
  });
});



app.get('/view-mynotices/:wid', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var writeemail = req.session.mail;
  const wid = req.params.wid;

  // writing 테이블에서 해당 글의 내용을 가져옴
  db.query('SELECT * FROM writing WHERE writeremail = ? AND wid = ?', [writeemail, wid], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
      return res.status(500).send('글을 불러오는 중 에러가 발생했습니다.');
    }

    // 가져온 글의 내용을 HTML 형식으로 표시
    const formattedDate = results[0].created_at.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    const html = template.HTML('글 보기',
    `<hr>
    <div style="border: 1px solid #ccc; padding: 10px;">
      <p style="font-weight: bold;">제목: ${results[0].title}</p>
      <p style="font-weight: bold;">작성자: ${results[0].writeremail}</p>
      <p style="white-space: pre-line;">${results[0].content}</p>
      <p style="font-size: 12px;">작성일자: ${formattedDate}</p>
    </div>
    <a href="/view-mynotices">내 공고글 보기로 돌아가기</a>`,
    authCheck.statusUI(req, res)
  );

    res.send(html);
  });
});



app.get('/view-allnotice', (req, res) => {
  db.query('SELECT * FROM writing ORDER BY created_at ASC', function (error, results, fields) {
    if (error) throw error;

    const formattedPosts = results.map(post => ({
      ...post,
      created_at: post.created_at.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
    }));
    const html = template.HTML('모든 공고글 보기',
      `<hr>
      <h2>모든 공고글</h2>
      <ul>
        ${formattedPosts.map(post => `<li><a href="/view-allnotice/${post.wid}">${post.title}</a> - 작성일자: ${post.created_at}</li>`).join('')}
      </ul>
      <a href="/main">메뉴로 돌아가기</a>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
});

app.get('/view-allnotice/:wid', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var writeemail = req.session.mail;
  const wid = req.params.wid;

  // writing 테이블에서 해당 글의 내용을 가져옴
  db.query('SELECT * FROM writing WHERE writeremail = ? AND wid = ?', [writeemail, wid], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
      return res.status(500).send('글을 불러오는 중 에러가 발생했습니다.');
    }
    // const formattedDate = results[0]; 
    console.log(results);
    const formattedDate = results[0].created_at.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    // 가져온 글의 내용을 HTML 형식으로 표시
    const html = template.HTML('글 보기',
    `<hr>
    <div style="border: 1px solid #ccc; padding: 10px;">
      <p style="font-weight: bold;">제목: ${results[0].title}</p>
      <p style="font-weight: bold;">작성자: ${results[0].writeremail}</p>
      <p style="white-space: pre-line;">${results[0].content}</p>
      <p style="font-size: 12px;">작성일자: ${formattedDate}</p>
      <button onclick="sendRequest('${results[0].writeremail}')">요청 보내기</button>
      </div>
    <a href="/view-allnotice">모든 공고글 보기로 돌아가기</a>`,
    authCheck.statusUI(req, res)
  );

    res.send(html);
  });
});

app.post('/send-message', authCheck, (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return;
  }

  const { recipient, message } = req.body;
  const sender = req.session.email;

  if (!recipient || !message) {
    res.status(400).send('수신자와 메시지를 모두 입력하세요.');
    return;
  }

  db.run(
    'INSERT INTO messages (sender_email, recipient_email, message) VALUES (?, ?, ?)',
    [sender, recipient, message],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('메시지 전송 중 오류가 발생했습니다.');
      } else {
        res.redirect('/main');
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})