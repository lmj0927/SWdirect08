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
  <a href="/write-resume
">자기소개서 작성</a>
  <br>
  <a href="/view-resume">내 자기소개서 보기</a> | <a href="/edit-resume">자기소개서 수정</a>
  <br>
  <a href="/write-notice">공고글 작성</a>
  <a href="/view-mynotices">내 작성글 보기</a>
  <a href="/view-allnotice">모든 공고글 보기</a>
  <a href="/view-messages">내가 받은 메시지 확인</a>
  <a href="/sent-requests">내가 보낸 메시지 확인</a>

  `, // 버튼 링크  추가
  authCheck.statusUI(req, res)
);
res.send(html);
});


app.get('/write-resume', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var userId = req.session.mail;
  console.log("userid",userId)

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE  id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 빈 값을 기본값으로 설정
    // 자기소개서 작성 페이지 렌더링
    var html = template.HTML('Write resume',
      `<hr>
        <h2>자기소개서 작성</h2>
        <form action="/write-resume
      " method="post">
          <p><input type="text" name="name"  placeholder="이름"></p>
          <p><input type="text" name="callnum"  placeholder="전화번호"></p>
          <p><input type="submit" value="작성 완료"></p>
        </form>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
 
  });
});

  
app.post('/write-resume', (req, res) => {
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
    // Send an alert message and redirect back to the write resume page
    res.send(
      `<script>
        alert("이름과 전화번호를 모두 입력하세요.");
        window.location.href = '/write-resume
      ';
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
app.get('/view-resume', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
        res.redirect('/auth/login');

    return false;
  }

  var userId = req.session.mail;

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 빈 값을 기본값으로 설정
    var resume = results.length > 0 ? results[0] : { name: '', callnum: '' };

    // 자기소개서 보기 페이지 렌더링
    var html = template.HTML('View resume',
      `<hr>
        <h2>내 자기소개서 보기</h2>
        <p><strong>이름:</strong> ${resume.name}</p>
        <p><strong>전화번호:</strong> ${resume.callnum}</p>
        <a href="/main">메뉴돌아가기</a>`, // 자기소개서 수정 버튼 추가
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
});

app.get('/edit-resume', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  var userId = req.session.mail;

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM my WHERE id = ?', [userId], function (error, results, fields) {
    if (error) throw error;

    // 자기소개서 정보가 없는 경우 빈 값을 기본값으로 설정
    var resume = results.length > 0 ? results[0] : { name: '', callnum: '' };

    // 자기소개서 수정 페이지 렌더링
    var html = template.HTML('Edit resume',
      `<hr>
        <h2>자기소개서 수정</h2>
        <form action="/edit-resume
      " method="post">
          <p><input type="text" name="name" value="${resume.name}" placeholder="이름"></p>
          <p><input type="text" name="callnum" value="${resume.callnum}" placeholder="전화번호"></p>
          <p><input type="submit" value="수정 완료"></p>
        </form>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
  
});

app.post('/edit-resume', (req, res) => {
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
        <form action="/write-notice" method="post">
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

app.post('/write-notice', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }
  var writeemail = req.session.mail;

  const title = req.body.title;
  const content = req.body.content;
  
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
3


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
        ${formattedPosts.map(post => `<li><a href="/view-allnotice/${post.wid}">${post.title}</a>번호- ${post.wid} - 작성일자: ${post.created_at} </li>`).join('')}
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
  db.query('SELECT * FROM writing WHERE   wid = ?', [ wid], function (error, results, fields) {
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
      <a href="/send-message?writeremail=${results[0].writeremail}&content=요청 메시지 내용">메시지 전송하기</a>
      </div>
    <a href="/view-allnotice">모든 공고글 보기로 돌아가기</a>`,
    authCheck.statusUI(req, res)
  );

    res.send(html);
  });
});



app.get('/send-message', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  const senderemail = req.session.mail; // 현재 로그인한 사용자의 이메일
  const getteremail = req.query.writeremail; // URL 쿼리 매개변수로 전달된 받는 사람의 이메일

  const html = template.HTML('Send Message',
    `
    <!DOCTYPE html>
    <html>
    <head>
        <title>메시지 전송</title>
        <link rel='stylesheet' href='/stylesheets/style.css'/>
    </head>
    <body>
        <h1>메시지 전송</h1>
        <form action="/send-message" method="post">
            <input type="hidden" name="senderemail" value="${senderemail}">
            <input type="hidden" name="receiveremail" value="${getteremail}">
            <p>받는 사람: ${getteremail}</p>
            <textarea name="content" cols="30" rows="10" required></textarea>
            <br>
            <button type="submit">메시지 전송</button>
        </form>
    </body>
    </html>
    `,
    authCheck.statusUI(req, res)
  );

  res.send(html);
});

// 메시지 전송 처리 라우터 설정
app.post('/send-message', (req, res) => {
  const { senderemail, receiveremail, content } = req.body;

  // 여기서 데이터베이스에 메시지를 저장
  db.query('INSERT INTO request (senderemail, getteremail, content) VALUES (?, ?, ?)', [senderemail, receiveremail, content], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 처리 로직 추가
      return res.status(500).json({ success: false, message: '메시지 저장 중 오류가 발생했습니다.' });
    }

    // 클라이언트에 응답을 보냅니다.
    res.json({ success: true, message: '메시지가 성공적으로 전송되었습니다.', redirectTo: '/main' });
  });
});

app.get('/view-messages', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  const getteremail = req.session.mail;

  // getteremail이 현재 사용자의 이메일과 같은 항목들을 가져옴
  db.query('SELECT * FROM request WHERE getteremail = ?', [getteremail], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
      return res.status(500).send('받은 메시지를 불러오는 중 에러가 발생했습니다.');
    }

    // 가져온 메시지 목록을 표 형태로 나타내고, 각각의 항목을 클릭하면 해당 내용을 확인할 수 있는 HTML 생성
    const html = template.HTML('받은 메시지 목록',
      `<hr>
      <h2>받은 메시지 목록</h2>
      <ul>
        ${results.map(message => `<li><a href="/view-message/${message.requestid}">${message.senderemail}에서 온 메시지</a></li>`).join('')}
      </ul>
      <a href="/main">메뉴로 돌아가기</a>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
});

app.get('/view-message/:request_id', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  const request_id = req.params.request_id;

  // request_id에 해당하는 메시지 내용을 가져옴
  db.query('SELECT * FROM request WHERE requestid = ?', [request_id], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
      return res.status(500).send('메시지를 불러오는 중 에러가 발생했습니다.');
    }

    if (results.length === 0) {
      // 해당하는 메시지가 없을 경우 예외 처리
      return res.status(404).send('해당하는 메시지를 찾을 수 없습니다.');
    }

    // 가져온 메시지 내용을 HTML 형식으로 표시
    const html = template.HTML('메시지 내용 확인',
    `<hr>
    <h2>메시지 내용 확인</h2>
    <div>
      <p><strong>보낸 사람:</strong> ${results[0].senderemail}</p>
      <p><strong>내용:</strong> ${results[0].content}</p>
      ${results[0].answer === null ?
        `<a href="/respond-to-request/${request_id}/accept">수락</a>
         <a href="/respond-to-request/${request_id}/reject">거절</a>` :
        `<p>이미 응답하였습니다.</p>`
      }
    </div>
    <a href="/view-messages">받은 메시지 목록으로 돌아가기</a>`,
    authCheck.statusUI(req, res)
  );
//         <button onclick="respondToRequest(${request_id}, true)">수락</button>
{/* <button onclick="respondToRequest(${request_id}, false)">거절</button> */}
    res.send(html);
  });
});

// 요청에 대한 응답 처리
app.get('/respond-to-request/:request_id/:action', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  const request_id = req.params.request_id;
  const action = req.params.action;

  // request_id에 해당하는 요청 정보를 가져옴
  db.query('SELECT * FROM request WHERE requestid = ?', [request_id], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 처리 로직 추가
      return res.status(500).json({ success: false, message: '요청 정보를 불러오는 중 오류가 발생했습니다.' });
    }

    if (results.length === 0) {
      // 해당하는 요청이 없을 경우 예외 처리
      return res.status(404).json({ success: false, message: '해당하는 요청을 찾을 수 없습니다.' });
    }

    if (results[0].answer !== null) {
      // 이미 응답한 경우
      return res.status(400).json({ success: false, message: '이미 응답하였습니다.' });
    }

    // action에 따라 수락 또는 거절 처리
    const answerValue = action === 'accept' ? 1 : 2;

    // request_id에 해당하는 요청에 대한 응답을 업데이트
    db.query('UPDATE request SET answer = ? WHERE requestid = ?', [answerValue, request_id], function (error, updateResults, fields) {
      if (error) {
        console.error(error);
        // 에러 처리 로직 추가
        return res.status(500).json({ success: false, message: '응답 처리 중 오류가 발생했습니다.' });
      }

      // 응답이 성공적으로 처리되면 받은 메시지 목록으로 리다이렉트
      res.redirect('/view-messages');
    });
  });
});



app.get('/sent-requests', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  const senderemail = req.session.mail;

  // senderemail에 해당하는 요청 목록을 가져옴
  db.query('SELECT * FROM request WHERE senderemail = ?', [senderemail], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 처리 로직 추가
      return res.status(500).send('요청 목록을 불러오는 중 에러가 발생했습니다.');
    }

    // 가져온 요청 목록을 HTML 형식으로 표시
    const html = template.HTML('보낸 요청 확인',
      `<hr>
      <h2>보낸 요청 목록</h2>
      <ul>
        ${results.map(request => `
          <li>
            <p><strong>받는 사람:</strong> ${request.getteremail}</p>
            <p><strong>내용:</strong> ${request.content}</p>
            ${request.answer === null ? '응답 대기 중' : request.answer === 1 ? '수락됨' : '거절됨'}
          </li>
        `).join('')}
      </ul>
      <a href="/">메인 메뉴로 돌아가기</a>`,
      authCheck.statusUI(req, res)
    );

    res.send(html);
  });
});


app.get('/get-sent-request-status/:request_id', (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.redirect('/auth/login');
    return false;
  }

  const request_id = req.params.request_id;

  // request_id에 해당하는 요청의 응답 상태를 가져옴
  db.query('SELECT answer FROM request WHERE requestid = ?', [request_id], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 처리 로직 추가
      return res.status(500).json({ success: false, message: '응답 상태를 불러오는 중 오류가 발생했습니다.' });
    }

    if (results.length === 0) {
      // 해당하는 요청이 없을 경우 예외 처리
      return res.status(404).json({ success: false, message: '해당하는 요청을 찾을 수 없습니다.' });
    }

    // 응답 상태를 클라이언트에 전송
    res.json({ success: true, answer: results[0].answer });
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})