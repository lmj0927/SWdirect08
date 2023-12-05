const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/join', (req, res)=>{
    res.send({ test: "join하자"});
  });

app.post('/api/login_process', (request, response)=>{

  var username = request.body.username;
  var password = request.body.pwd;
  response.send("yse"); 
});

app.post('/api/write-introduction-process', (req, res)=>{
    const object = req.body;
    res.send(object);
});


app.post('/api/board/write', (req, res)=>{
    const object = req.body;
    res.send(object);
});

app.get('/api/selected_notice', (req, res)=>{

    const object ={
    email: "roh5651@ajou.ac.kr",
    title : "소프트웨어공학 팀원 구합니다.", 
    role : "개발", 
    skills: "Javascript",
    membernum: 2,
    intro: "아주대학교 소프트웨어공학 프로젝트 팀원 모집합니다. 한 학기 동안 열심히 해봅시다.",
    period: "3개월",
    projtype: "교내 대회",
    writedate: "23/12/05",
    clicknum: 123

    }

    res.json(object);

  });

  app.get('/api/selected_resume', (req, res)=>{

    const object ={

    major : "software", 
    role : "engineer", 
    skill1: "java",
    skill2: "c언어",
    skill3: "javascript",
    level1 : 1,
    level2: 2,
    level3: 3,
    intro: "저는 아주대학교 4학년 2학기를 다니고 있습니다."

    }

    res.json(object);

  });

const port=3002; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});