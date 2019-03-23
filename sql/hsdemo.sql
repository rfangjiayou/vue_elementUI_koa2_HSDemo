/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.1.19-MariaDB : Database - hsdemo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hsdemo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `hsdemo`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `username` varchar(127) NOT NULL,
  `password` varchar(127) NOT NULL,
  `permission` int(11) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`username`,`password`,`permission`) values ('root','admin',1);

/*Table structure for table `cr_policy` */

DROP TABLE IF EXISTS `cr_policy`;

CREATE TABLE `cr_policy` (
  `name` varchar(128) DEFAULT NULL,
  `actionDirection` int(4) DEFAULT NULL,
  `match` text,
  `action` int(4) DEFAULT NULL,
  `replement` varchar(1024) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `cr_policy` */

insert  into `cr_policy`(`name`,`actionDirection`,`match`,`action`,`replement`,`description`,`id`) values ('test',1,'{\r\n	\"rdgrpDirection\" : \"1\",\r\n	\"object\" : \"2\",\r\n	\"object_name\" : \"1\",\r\n	\"operator\" : \"3\",\r\n	\"reg_text\" : \"http://$\"\r\n}',2,'1','test',2),('testwwqe',1,'[{\"rdgrpDirection\":1,\"object\":1,\"object_name\":2,\"operator\":2,\"reg_text\":\"et\"}]',3,'tt','test',13),('test4',2,'[{\"rdgrpDirection\":1,\"object\":2,\"object_name\":3,\"operator\":1,\"reg_text\":\"dsf\"},{\"rdgrpDirection\":1,\"object\":3,\"object_name\":1,\"operator\":3,\"reg_text\":\"dsf\"}]',2,'gfh','rewr',14),('test',1,'[{\"rdgrpDirection\":2,\"object\":2,\"object_name\":3,\"operator\":1,\"reg_text\":\"rt\"}]',2,'ert','tre',15);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
