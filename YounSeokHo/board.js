var express = require('express');
var router = express.Router();
const authCheck = require('./lib_login/authCheck.js');
const template = require('./lib_login/template.js');
const db = require('./db.js');

// 모든 공고글 보기
router.get('/view-all', (req, res) => {
  db.query('SELECT * FROM writing ORDER BY created_at ASC', function (error, results, fields) {
    if (error) throw error;

    const html = template.HTML('모든 공고글 보기',
      `<hr>
      <h2>모든 공고글</h2>
      <ul>
        ${results.map(post => `<li><a href="/board/${post.wid}">${post.title}</a> - 작성일자: ${post.created_at}</li>`).join('')}
      </ul>
      <a href="/main">메뉴 돌아가기</a>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
  });
});

module.exports = router;