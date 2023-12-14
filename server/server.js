/*db 연결 */
const express = require('express');
const db = require("./config/db");
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 3002); // 포트 설정
app.set("host", process.env.HOST || "0.0.0.0"); // 아이피 설정

/* 회원가입 */
app.post('/api/join_process', function(req, res) {    

  var email = req.body.email;
  var password = req.body.password;    
  var password2 = req.body.password2;
  var name = req.body.name;
  var bdate = req.body.bdate;
  var university = req.body.university;

  if (email && password && password2 && name && bdate && university) {

      db.query('SELECT * FROM user WHERE email = ?', [email], function(error, results, fields) { 
        // DB에 같은 이름의 회원아이디가 있는지 확인
          if (error) throw error;
          if (results.length <= 0 && password == password2) {     
            // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
              
              db.query('INSERT INTO user (name, email, password, bdate, university) VALUES (?,?,?,?,?)',
              [name, email, password, bdate, university],
              function (error, data) {
                  if (error) throw error2;
                  //res.json({code : 202});
              });

              db.query('INSERT INTO resume (email, major, role) VALUES (?, ?, ?)', 
              [email, "", ""], 
              function (error, data) { 
                  if (error) 
                  {console.error(error); return res.json({code: 404, reason: "이력서 DB 입력 에러"});} 
                  console.log('레코드가 성공적으로 삽입되었습니다.'); 
                  res.json({code:202});});

          } else if (password != password2) { // 비밀번호가 올바르게 입력되지 않은 경우
              res.json({code : 404, reason: "비밀번호가 올바르게 입력되지 않았습니다."});
          }
          else {   // DB에 같은 이름의 회원아이디가 있는 경우
              res.json({code : 404, reason: "아이디가 중복됩니다."});
          }            
      });
    
  } else {        // 입력되지 않은 정보가 있는 경우
      res.json({code : 404, reason: "정보를 다 입력하지 않았습니다."});
  }

});


/*로그인 */
app.post('/api/login_process', (req, response)=>{

    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {// id와 pw가 입력되었는지 확인

        db.query('SELECT * FROM user WHERE email = ? AND password = ?', 
        [email, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                response.json({code : 202}); 
            } else {//로그인 실패          
                response.json({code : 404, reason : "invalid id or pw"});     
            }            
        });
    } else //아이디랑 비번 입력안해서 로그인 실패 
        { 
            response.json({code : 404, reason : "아이디 혹은 비밀번호를 입력하지 않았습니다."});    
        }

  }); 


/*이력서 등록 및 수정*/
app.post('/api/write-resume-process', (req, res) => {

	const email = req.body.email;
  const major = req.body.major;
  const role = req.body.role;
  const skill1 = req.body.skill1;
  const skill2 = req.body.skill2;
  const skill3 = req.body.skill3;
  const level1 = req.body.level1;
  const level2 = req.body.level2;
  const level3 = req.body.level3;
  const intro = req.body.intro;

  //res.json(req.body);

if (!email || !major || !role || !skill1 || !skill2 || !skill3 || !level1 || !level2 || !level3 || !intro) {
  // Send an alert message and redirect back to the write resume page
  res.json({code : 404, reason: "모든 정보를 다 입력하세요"});
	
}

  // my 테이블에서 자기소개서 정보 불러오기
  db.query('SELECT * FROM resume WHERE email= ?', [email], function (error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      // 이미 자기소개서 정보가 있는 경우, 업데이트
   db.query('UPDATE resume SET major = ?, role = ?, skill1= ?, skill2= ? , skill3=?, level1= ?, level2= ?, level3= ?, intro= ? WHERE email = ?', 
[major,role,skill1,skill2,skill3, level1,level2,level3,intro, email], function (error, data) {
  
  if (error) throw error;
  //res.json({code:202});

      });

    db.query('UPDATE user SET hasresume = ? WHERE email = ?', 
        [1, email], function (error, data) {
        if (error) throw error;
        res.json({code:202});
    });

    } 

  });

});



  /*특정 이력서 불러오기 */
  app.get('/api/selected_resume', (req, res)=>{

    const email = req.query.email;
  
    db.query('SELECT * FROM resume WHERE email = ?', [email], function (error, results, fields) {
      
      if (error) {
        console.error(error);
        res.json({ code: 404, message: 'Internal Server Error' });
        return;
      }
      res.json(results);
  
    });
  
  });


  /*전체 이력서 불러오기 */
  app.get('/api/allresume', (req, res)=>{
  
    db.query('SELECT * FROM resume , user WHERE user.email = resume.email AND user.hasresume = ?', 
    [1], function (error, results, fields) {
      
      if (error) {
        console.error(error);
        res.json({ code: 404, message: 'Internal Server Error' });
        return;
      }

      if(results.length == 0) {res.json({code: 404, reason: "등록된 이력서가 하나도 없습니다."});}
      else res.json(results);
      
    });
  
  });


/* 사용자 이력서 있는지 확인 */
app.get('/api/hasresume', (req, res)=>{

  const email = req.query.email;

  db.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
    
    if (error) { 
      console.error(error);
      res.json({ code: 404, reason: 'Internal Server Error' });
      return;
    }
    
    res.json(results[0].hasresume);

  });

});

/*공고글 작성 */
app.post('/api/write-notify-process', (req, res) => {


  var writeremail = req.body.email;
  const title = req.body.title;
  const projtype = req.body.projtype;
  const role = req.body.role;
  const membernum = req.body.membernum;  
  const skills = req.body.skills; 
  const period = req.body.period;  
  const intro = req.body.intro;  
  const clicknum = 0;

  
  db.query('INSERT INTO notice (email, title, projtype, role, membernum, skills, period, intro, clicknum) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?)',
   [writeremail, title, projtype, role, membernum, skills, period, intro,clicknum], function (error, data) {   
     if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
				return res.json({code: 404, reason: "공고 DB 에러"});    }
    // 글 작성 후 메인 페이지로 리다이렉션
		res.json({code: 202});  });

});


/*이력서 키워드 검색 */
app.get('/api/resume_result', (req, res) => {

  const searchTerm = req.query.keyword;
  if(searchTerm == "") res.json({code : 404, reason : "검색단어가 없습니다. 검색어를 입력해주세요."}); 

  else {
    const query = `SELECT *
                FROM resume 
                WHERE major LIKE '%${searchTerm}%' 
                or role LIKE '%${searchTerm}%' 
                or skill1 LIKE '%${searchTerm}%' 
                or skill2 LIKE '%${searchTerm}%'
                or skill3 LIKE '%${searchTerm}%'
                or level1 LIKE '%${searchTerm}%'
                or level2 LIKE '%${searchTerm}%'
                or level3 LIKE '%${searchTerm}%' 
                or intro LIKE '%${searchTerm}%'`;
         db.query(query, (error, results) => {
      //if (error) throw error;
      if(results.length == 0) res.json({code : 404, reason: "검색 결과가 없습니다."}); 
      //console.log(results);
      else res.json(results);
      
    });
  }

});

  /*전체 모집공고 불러오기 */
  app.get('/api/allnotice', (req, res)=>{
  
    db.query('SELECT * FROM notice', 
    [1], function (error, results, fields) {
      
      if (error) {
        console.error(error);
        res.json({ code: 404, message: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  
  });

  

/*특정 사용자의 모든 모집 공고 불러오기 */
app.get('/api/allmynotices', (req, res) => {

  var email = req.query.email;

  db.query('SELECT * FROM notice WHERE email = ?', [email], function (error, results, fields) {
    if (error) throw error;

    if(results.length == 0) {res.json({code: 404, reason: "이 사용자의 모집공고가 하나도 없습니다."});}
      else res.json(results);
  });

});
 

/*특정 wid의 모집 공고 보기 */
  app.get('/api/selected_notice', (req, res) => {

    const wid = req.query.wid;
  
    db.query('SELECT * FROM notice WHERE  wid = ?', [wid], function (error, results, fields){

      if (error) {
        console.error(error);selected_notice
          return res.json({code: 404, reason: "공고 보기 에러"}); }

          const dateObject = new Date(results[0].writedate);

          const formattedDate = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            //second: 'numeric',
            hour12: false
          }).format(dateObject);
        
          results[0].writedate = formattedDate;

          db.query('UPDATE notice SET clicknum = clicknum + ? WHERE wid = ?', 
          [1, wid], function (error, data) {
          if (error) throw error;
          });
          
          console.log(results[0]);
          res.json(results[0]);
  
    });
  });


  /*특정 wid의 모집 공고 수정 */
  app.post('/api/modify_notice', (req, res) => {

    const wid = req.body.wid;
    const title = req.body.title;
    const projtype = req.body.projtype;
    const role = req.body.role;
    const membernum = req.body.membernum; 
    const skills = req.body.skills;  
    const period = req.body.period;  
    const intro = req.body.intro;  

    
    db.query('UPDATE notice SET title = ?, projtype = ?, role= ?, membernum= ? , skills=?, period= ?, intro= ? WHERE wid = ?',
     [title, projtype, role, membernum, skills, period, intro, wid], function (error, data) {   
       if (error) {
        console.error(error);
        // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
          return res.json({code: 404, reason: "공고 업데이트 에러"});    }
      res.json({code: 202});  });
   
  });



  /* 모집 공고 키워드 검색 및 정렬 */
  app.get('/api/notice_result', (req, res) => {

    const searchTerm = req.query.keyword;
    const projtype = req.query.projtype;
    const sort = req.query.sort;
    const email = req.query.email;

    var query;

      if(projtype == null){ //카테고리 없음
        if(sort == 0){ //분류 안하고 정렬 안함
         query = `SELECT *
                      FROM notice 
                      WHERE title LIKE '%${searchTerm}%'  
                      or role LIKE '%${searchTerm}%'
                      or membernum LIKE '%${searchTerm}%'
                      or skills LIKE '%${searchTerm}%'
                      or writedate LIKE '%${searchTerm}%'
                      or period LIKE '%${searchTerm}%' 
                      or intro LIKE '%${searchTerm}%'`;
        }
        else if(sort == 1){ //분류 안하고 조회순 정렬
          query = `SELECT *
                        FROM notice 
                        WHERE email LIKE '%${searchTerm}%'  
                        or title LIKE '%${searchTerm}%'  
                        or role LIKE '%${searchTerm}%'
                        or membernum LIKE '%${searchTerm}%'
                        or skills LIKE '%${searchTerm}%'
                        or writedate LIKE '%${searchTerm}%'
                        or period LIKE '%${searchTerm}%' 
                        or intro LIKE '%${searchTerm}%'
                        order by clicknum desc`;
        }
        else if(sort ==2){ //분류 안하고 최신순 정렬
          query = `SELECT *
                      FROM notice 
                      WHERE email LIKE '%${searchTerm}%'  
                      or title LIKE '%${searchTerm}%'  
                      or role LIKE '%${searchTerm}%'
                      or membernum LIKE '%${searchTerm}%'
                      or skills LIKE '%${searchTerm}%'
                      or writedate LIKE '%${searchTerm}%'
                      or period LIKE '%${searchTerm}%' 
                      or intro LIKE '%${searchTerm}%'
                      order by writedate desc`;
        }
      }/*카테고리가 교내 수업 경우*/
      else if(projtype == "교내 수업"){
        console.log([projtype, email]);
        if(sort == 0){
          query = `SELECT notice.email, wid, title, projtype, role, membernum, skills, writedate, period, intro, clicknum
          FROM user NATURAL JOIN notice
          WHERE university = (SELECT university FROM user WHERE user.email = "${email}")
          AND projtype = "${projtype}"
          AND( wid LIKE '%${searchTerm}%' 
          or title LIKE '%${searchTerm}%'  
          or role LIKE '%${searchTerm}%'
          or membernum LIKE '%${searchTerm}%'
          or skills LIKE '%${searchTerm}%'
          or writedate LIKE '%${searchTerm}%'
          or period LIKE '%${searchTerm}%' 
          or intro LIKE '%${searchTerm}%')`;
       }
       else if(sort == 1){
        query = `SELECT notice.email, wid, title, projtype, role, membernum, skills, writedate, period, intro, clicknum
        FROM user NATURAL JOIN notice
        WHERE university = (SELECT university FROM user WHERE user.email = "${email}")
        AND projtype = "${projtype}"
        AND( wid LIKE '%${searchTerm}%' 
        or title LIKE '%${searchTerm}%'  
        or role LIKE '%${searchTerm}%'
        or membernum LIKE '%${searchTerm}%'
        or skills LIKE '%${searchTerm}%'
        or writedate LIKE '%${searchTerm}%'
        or period LIKE '%${searchTerm}%' 
        or intro LIKE '%${searchTerm}%')
        order by clicknum desc`;
     }  else if(sort == 2){
      query = `SELECT notice.email, wid, title, projtype, role, membernum, skills, writedate, period, intro, clicknum
      FROM user NATURAL JOIN notice
      WHERE university = (SELECT university FROM user WHERE user.email = "${email}")
      AND projtype = "${projtype}"
      AND( wid LIKE '%${searchTerm}%' 
      or title LIKE '%${searchTerm}%'  
      or role LIKE '%${searchTerm}%'
      or membernum LIKE '%${searchTerm}%'
      or skills LIKE '%${searchTerm}%'
      or writedate LIKE '%${searchTerm}%'
      or period LIKE '%${searchTerm}%' 
      or intro LIKE '%${searchTerm}%')
      order by writedate desc`;
   }
    }/*카테고리가 교내 대회인 경우*/
    else if(projtype == "교내 수업"){
      console.log([projtype, email]);
      if(sort == 0){
        query = `SELECT notice.email, wid, title, projtype, role, membernum, skills, writedate, period, intro, clicknum
        FROM user NATURAL JOIN notice
        WHERE university = (SELECT university FROM user WHERE user.email = "${email}")
        AND projtype = "${projtype}"
        AND( wid LIKE '%${searchTerm}%' 
        or title LIKE '%${searchTerm}%'  
        or role LIKE '%${searchTerm}%'
        or membernum LIKE '%${searchTerm}%'
        or skills LIKE '%${searchTerm}%'
        or writedate LIKE '%${searchTerm}%'
        or period LIKE '%${searchTerm}%' 
        or intro LIKE '%${searchTerm}%')`;
     }
     else if(sort == 1){
      query = `SELECT notice.email, wid, title, projtype, role, membernum, skills, writedate, period, intro, clicknum
      FROM user NATURAL JOIN notice
      WHERE university = (SELECT university FROM user WHERE user.email = "${email}")
      AND projtype = "${projtype}"
      AND( wid LIKE '%${searchTerm}%' 
      or title LIKE '%${searchTerm}%'  
      or role LIKE '%${searchTerm}%'
      or membernum LIKE '%${searchTerm}%'
      or skills LIKE '%${searchTerm}%'
      or writedate LIKE '%${searchTerm}%'
      or period LIKE '%${searchTerm}%' 
      or intro LIKE '%${searchTerm}%')
      order by clicknum desc`;
   }  else if(sort == 2){
    query = `SELECT notice.email, wid, title, projtype, role, membernum, skills, writedate, period, intro, clicknum
    FROM user NATURAL JOIN notice
    WHERE university = (SELECT university FROM user WHERE user.email = "${email}")
    AND projtype = "${projtype}"
    AND( wid LIKE '%${searchTerm}%' 
    or title LIKE '%${searchTerm}%'  
    or role LIKE '%${searchTerm}%'
    or membernum LIKE '%${searchTerm}%'
    or skills LIKE '%${searchTerm}%'
    or writedate LIKE '%${searchTerm}%'
    or period LIKE '%${searchTerm}%' 
    or intro LIKE '%${searchTerm}%')
    order by writedate desc`;
 }
    }
      else{ /*카테고리가 나머지인 경우*/
        if(sort == 0){
           query = `SELECT *
                      FROM notice 
                      WHERE (email LIKE '%${searchTerm}%' 
                      or wid LIKE '%${searchTerm}%' 
                      or title LIKE '%${searchTerm}%'  
                      or role LIKE '%${searchTerm}%'
                      or membernum LIKE '%${searchTerm}%'
                      or skills LIKE '%${searchTerm}%'
                      or writedate LIKE '%${searchTerm}%'
                      or period LIKE '%${searchTerm}%' 
                      or intro LIKE '%${searchTerm}%')
                      and projtype LIKE '%${projtype}%'`;
        }
        else if(sort == 1){
           query = `SELECT *
                    FROM notice 
                    WHERE (email LIKE '%${searchTerm}%' 
                    or wid LIKE '%${searchTerm}%' 
                    or title LIKE '%${searchTerm}%'  
                    or role LIKE '%${searchTerm}%'
                    or membernum LIKE '%${searchTerm}%'
                    or skills LIKE '%${searchTerm}%'
                    or writedate LIKE '%${searchTerm}%'
                    or period LIKE '%${searchTerm}%' 
                    or intro LIKE '%${searchTerm}%')
                    and projtype LIKE '%${projtype}%'
                    order by clicknum desc`;
        }
        else if(sort == 2){
          query = `SELECT *
                    FROM notice 
                    WHERE (email LIKE '%${searchTerm}%' 
                    or wid LIKE '%${searchTerm}%' 
                    or title LIKE '%${searchTerm}%'  
                    or role LIKE '%${searchTerm}%'
                    or membernum LIKE '%${searchTerm}%'
                    or skills LIKE '%${searchTerm}%'
                    or writedate LIKE '%${searchTerm}%'
                    or period LIKE '%${searchTerm}%' 
                    or intro LIKE '%${searchTerm}%')
                    and projtype LIKE '%${projtype}%'
                    order by writedate desc`;
      
        }
      }

      db.query(query, (error, results) => {
        //if (error) throw error;
        if(results.length == 0) res.json({code : 404, reason : "검색결과가 없습니다."});
        else res.json(results);

      });

    });


  /*제안 메시지 보내기 */
  app.post('/api/join_request', (req, res) => {

    const senderemail = req.body.senderemail;
    var getteremail = req.body.getteremail;
    const wid = req.body.wid;
    const comment = req.body.comment;
    console.log([senderemail, getteremail, wid, comment]);
    //var newgetteremail;

    if(wid == null){
        db.query('INSERT INTO request (senderemail, getteremail, wid, comment) VALUES (?, ?, ?,?)',
        [senderemail, getteremail,wid, comment], function (error, results, fields) {  
          if (error) {
          console.error(error);
          // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
            return res.json({code: 404, reason: "request보내기 에러"});    }
        // 글 작성 후 메인 페이지로 리다이렉션
        return res.json({code: 202, reason: "request 보내기 성공"});  });
    }else{

      
      db.query('SELECT * FROM notice WHERE  wid = ?', [wid], function (error, results, fields){
        if (error) {
          console.error(error);selected_notice
            return res.json({code: 404, reason: "wid랑 맞는 공고 없음"}); }
            console.log(results[0].email)
            getteremail = results[0].email;

            db.query('INSERT INTO request (senderemail, getteremail, wid, comment) VALUES (?, ?, ?,?)',
            [senderemail, getteremail, wid, comment], function (error, results, fields) {  
              if (error) {
              console.error(error);
        
                return res.json({code: 404, reason: "모집공고에게 request보내기 에러"});    }
         
            return res.json({code: 202, reason: "request 보내기 성공"});  });

      });

     

    }

  });

  
/*특정 사용자에게 온 제안 메시지 모두 불러오기 */
app.get('/api/join_requests_all', (req, res) => {

  const getteremail = req.query.getteremail;
  // getteremail이 현재 사용자의 이메일과 같은 항목들을 가져옴

  db.query('SELECT * FROM request WHERE getteremail = ?',
  [getteremail], function (error, results, fields) {
    if (error) {
      console.error(error);
      // 에러 메시지를 클라이언트에게 전송하거나 처리할 수 있는 로직 추가
        return res.json({code: 404, reason: "request보기 에러"});    }

    if(results.length == 0) {res.json({code: 404, reason: "받은 제안이 하나도 없습니다."});}
      else res.json(results);
  });

});


const port=3002; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})


