-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mydatabase
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL DEFAULT 'Home',
  `receiver` varchar(45) NOT NULL DEFAULT 'Lin Chengliang',
  `tel` varchar(45) NOT NULL DEFAULT '10000000000',
  `totalprice` int NOT NULL DEFAULT '0',
  `order_date` date NOT NULL DEFAULT '2024-05-01',
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`orderid`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (18,'美国','林承亮','17317452617',10000,'2024-05-25','lin0430'),(30,'ss','林承亮','17317452617',6000,'2024-05-29','lin0430'),(31,'s','林承亮','17317452617',0,'2024-05-29','lin0430'),(32,'s','林承亮','17317452617',0,'2024-05-29','lin0430'),(33,'ss','林承亮','17317452617',7000,'2024-05-29','lin0430'),(34,'ss','ss','17317452617',10000,'2024-05-29','lin0430'),(35,'ss','林承亮','1928200183',9030,'2024-05-29','lin0430'),(36,'ss','林承亮','1928200183',10000,'2024-05-29','lin0430'),(37,'ss','林承亮','17317452617',66024,'2024-05-30','lin0430'),(38,'中国','林承亮','17317452617',95150,'2024-06-01','lin0430'),(39,'s','林承亮','17317452617',0,'2024-06-02','lin0430'),(40,'s','林承亮','17317452617',0,'2024-06-02','lin0430'),(41,'1','1','17317452617',0,'2024-06-02','lin0430'),(42,'1','1','17317452617',0,'2024-06-02','lin0430'),(43,'a','林承亮','17317452617',3035,'2024-06-02','lin0430'),(44,'z','林承亮','17317452617',3000,'2024-06-02','lin0430'),(45,'ss','林承亮','1928200183',3000,'2024-06-02','lin0430'),(46,'z','林承亮','17317452617',24110,'2024-06-02','lin0430'),(47,'ss','林承亮','17317452617',7010,'2024-06-04','lin0430'),(48,'ss','林承亮','18501672703',3045,'2024-06-04','dylixiaoyun'),(49,'ss','林承亮','18501672703',0,'2024-06-04','dylixiaoyun'),(50,'ss','林承亮','1928200183',19030,'2024-06-08','lin0430'),(51,'ss','林承亮','18501672703',6055,'2024-06-08','dylixiaoyun'),(52,'ss','林承亮','18501672703',0,'2024-06-08','dylixiaoyun'),(53,'ss','shishi','ssisis',11000,'2024-06-08','lin0430'),(54,'ss','林承亮','17317452617',1035,'2024-06-08','lin0430'),(55,'ss','林承亮','17317452617',1035,'2024-06-08','lin0430'),(56,'上海市杨浦区江浦路1057弄5号802室','林承亮','18501672703',1035,'2024-06-24','lin0430'),(57,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',3045,'2024-06-24','lin0430'),(58,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',3045,'2024-06-24','lin0430'),(59,'ss','林承亮','17317452617',3045,'2024-06-25','lin0430'),(60,'ss','林承亮','17317452617',36020,'2024-06-25','new1'),(61,'ss','hahah','17317452617',5000,'2024-06-26','lin0430'),(62,'ss','林承亮','1928200183',22110,'2024-06-28','lin0430'),(63,'ss','林承亮','1928200183',8040,'2024-06-28','lin0430'),(64,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',38500,'2024-06-28','lin0430'),(65,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',6000,'2024-06-28','lin0430'),(66,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',6000,'2024-06-28','lin0430'),(67,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',6000,'2024-06-28','lin0430'),(68,'上海市杨浦区江浦路1057弄5号802室','lcl','17317452617',44065,'2024-06-28','lin0404'),(69,'上海市杨浦区江浦路1057弄5号802室','林承亮','17317452617',1035,'2024-06-28','lin0404');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-28 20:09:05
