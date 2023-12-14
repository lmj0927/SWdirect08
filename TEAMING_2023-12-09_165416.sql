-- MySQL dump 10.13  Distrib 8.2.0, for macos13.5 (arm64)
--
-- Host: 127.0.0.1    Database: TEAMING
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `email` varchar(30) NOT NULL,
  `wid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `projtype` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `membernum` int NOT NULL,
  `skills` varchar(30) DEFAULT NULL,
  `writedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `period` int DEFAULT NULL,
  `intro` text,
  `clicknum` int DEFAULT NULL,
  PRIMARY KEY (`wid`),
  KEY `email` (`email`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES ('email1',8,'소공','공모전','디자이너',4,NULL,'2023-12-09 06:53:25',NULL,NULL,NULL),('email1',9,'소공1','공모전','디자이너',4,NULL,'2023-12-09 06:54:15',NULL,NULL,NULL),('email1',10,'소공2','교내 대회','디자이너',4,NULL,'2023-12-09 06:54:32',NULL,NULL,NULL),('email1',11,'asdg','교내 대회','마케팅',4,'sfdgv','2023-12-09 07:35:44',4,'efadzvcx',0),('email1',12,'데이터 베이스','스터디','문서 작성',6,'자바를 잘해야 함','2023-12-09 07:42:27',6,'안녕하세요~₩',0);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `senderemail` varchar(30) NOT NULL,
  `getteremail` varchar(30) NOT NULL,
  `wid` int DEFAULT NULL,
  `answer` int DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`rid`),
  KEY `senderemail` (`senderemail`),
  KEY `getteremail` (`getteremail`),
  KEY `wid` (`wid`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`senderemail`) REFERENCES `user` (`email`),
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`getteremail`) REFERENCES `user` (`email`),
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`wid`) REFERENCES `notice` (`wid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;

--
-- Table structure for table `resume`
--

DROP TABLE IF EXISTS `resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume` (
  `email` varchar(30) NOT NULL,
  `major` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `skill1` varchar(30) DEFAULT NULL,
  `skill2` varchar(30) DEFAULT NULL,
  `skill3` varchar(30) DEFAULT NULL,
  `level1` int DEFAULT NULL,
  `level2` int DEFAULT NULL,
  `level3` int DEFAULT NULL,
  `intro` text,
  PRIMARY KEY (`email`),
  CONSTRAINT `resume_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume`
--

/*!40000 ALTER TABLE `resume` DISABLE KEYS */;
INSERT INTO `resume` VALUES ('018ss','소프트웨어학과','기획자','c언어','java','sql',1,2,3,'안녕하세요 저는 아주대 소웨과를 다니고 있습ㄴ디ㅏ.'),('903ss','소프트웨어학과','개발자','c언어','java','sql',1,2,3,'안녕하세요 저는 노태헌 이라고 합니다.'),('nanana1','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('nanana126','미디어학과','디자이너','c언어','java','sql',1,2,3,'안녕하세요 저는 이민준입니다.'),('nanana129','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('new1','또업데이트','dasfd','sdaf','dsaf','sadg',3,2,1,'안녕종석'),('new10','소웨','디자인','ㅇㅁㄴㄹ','ㅅㅁㅎㄱㅈ','ㄴㅇㅁㄹㅋㅊㅍㅌ',2,2,3,'ㅁㅇㄴㄹㅍㅋㅊㅌ'),('new11','svf','마케팅','vfd','evfd','vfd',3,2,3,'tbewvdsfzxc'),('new2','수정학과','마케팅','1324','1253','5342ㅛ',3,3,2,'늉ㅎㅍ'),('new3','뉴 업데이트 ㅋ','마케팅','ㅂㅇㄴㄹ','ㅂㅈㄷㅎㄹㅁㅇㄴ','ㅂㄱㄷㅎㅁㄹㅇㄴ',2,2,2,'ㅂㅁㅇㄴㄹ'),('new4','zvxc','디자인','','','',0,0,0,''),('new5','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `resume` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `bdate` date DEFAULT NULL,
  `university` varchar(15) DEFAULT NULL,
  `hasresume` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('최유현','018ss','chuh8332','2000-08-23','아주',1),('12','111','111','2000-12-12','11',1),('최','123','123','2000-01-11','ㅇㅇ',1),('최유진','903ss','1234','2000-07-12','아주',0),('최유림','dd','123','2000-01-23','아주',0),('윤석호','email1','1234','2000-09-09','아주',1),('이민준','id1234','1234','2000-01-02','아주',0),('최','nanana1','1234','2000-01-01','아주',1),('노태헌','nanana126','12345','2000-01-01','아주',1),('최유림','nanana127','chuh8332','2000-07-13','아주',0),('hu','nanana128','1234','2000-08-23','아주',0),('hu','nanana129','1234','2000-08-23','아주',1),('전환휘','new1','1234','2000-02-02','아주',1),('chl','new10','1234','2000-01-01','dkwn',1),('1234','new11','1234','2000-01-01','dasf',1),('윤종석','new2','1234','2000-02-02','아주',0),('양양','new3','1234','2000-02-02','아주',1),('fads','new4','1234','2000-01-01','asdfa',1),('123adsf','new5','1234','2000-02-02','afsdzcx',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Dumping routines for database 'TEAMING'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-09 16:54:26
