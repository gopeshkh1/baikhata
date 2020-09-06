-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: office-app
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Current Database: `office-app`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `office-app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `office-app`;

--
-- Table structure for table `amt_paid`
--

DROP TABLE IF EXISTS `amt_paid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amt_paid` (
  `sales_id` varchar(45) DEFAULT NULL,
  `id` varchar(45) NOT NULL,
  `amount_paid` int DEFAULT NULL,
  `payment_mode` varchar(45) DEFAULT NULL,
  `details` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `asales_id` (`sales_id`),
  CONSTRAINT `asales_id` FOREIGN KEY (`sales_id`) REFERENCES `sales_entry` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amt_paid`
--

LOCK TABLES `amt_paid` WRITE;
/*!40000 ALTER TABLE `amt_paid` DISABLE KEYS */;
/*!40000 ALTER TABLE `amt_paid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses_entry`
--

DROP TABLE IF EXISTS `expenses_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses_entry` (
  `sales_id` varchar(45) NOT NULL,
  `id` varchar(45) NOT NULL,
  `expense_type` varchar(45) DEFAULT NULL,
  `expense_amt` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `esales_id` (`sales_id`),
  CONSTRAINT `esales_id` FOREIGN KEY (`sales_id`) REFERENCES `sales_entry` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses_entry`
--

LOCK TABLES `expenses_entry` WRITE;
/*!40000 ALTER TABLE `expenses_entry` DISABLE KEYS */;
INSERT INTO `expenses_entry` VALUES ('1595267427759','1595267401801','dalali',100);
/*!40000 ALTER TABLE `expenses_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_entry`
--

DROP TABLE IF EXISTS `products_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_entry` (
  `sales_id` varchar(45) NOT NULL,
  `id` varchar(45) NOT NULL,
  `product_type` varchar(45) DEFAULT NULL,
  `product_name` varchar(45) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `quintals` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `marka` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `psales_id` (`sales_id`),
  CONSTRAINT `psales_id` FOREIGN KEY (`sales_id`) REFERENCES `sales_entry` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_entry`
--

LOCK TABLES `products_entry` WRITE;
/*!40000 ALTER TABLE `products_entry` DISABLE KEYS */;
INSERT INTO `products_entry` VALUES ('1595267427759','1595267342930','khanda','rajnigandha',100,10.3,10,30);
/*!40000 ALTER TABLE `products_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_entry`
--

DROP TABLE IF EXISTS `sales_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_entry` (
  `id` varchar(45) NOT NULL,
  `sales_type` varchar(45) DEFAULT NULL,
  `bill_no` varchar(45) DEFAULT NULL,
  `date_of_purchase` date DEFAULT NULL,
  `dalal_name` varchar(45) DEFAULT NULL,
  `dealer_name` varchar(45) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `remarks` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_entry`
--

LOCK TABLES `sales_entry` WRITE;
/*!40000 ALTER TABLE `sales_entry` DISABLE KEYS */;
INSERT INTO `sales_entry` VALUES ('1595267427759','sell','1234','2020-07-20','jeff','joe',2060,'discount of 5%');
/*!40000 ALTER TABLE `sales_entry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-07  0:24:24
