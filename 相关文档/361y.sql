SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `361y`;
CREATE DATABASE `361y` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `361y`;

#
# 创建表：二手物品类型
#

DROP TABLE IF EXISTS `usedtype`;
CREATE TABLE `usedtype` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='二手物品类型';

#
# 创建表：二手物品
#
DROP TABLE IF EXISTS `used`;
CREATE TABLE `used` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(3) NOT NULL COMMENT '二手物品类型' DEFAULT 1,
  `name` varchar(40) DEFAULT NULL COMMENT '物品名称',
  `content` text DEFAULT NULL COMMENT '物品介绍',
  `addtime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='二手物品';

#
# 创建表：用户表
#
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `pic` varchar(100) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# 创建表：岗位表
#
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL COMMENT '公司id',
  `jobs_name` varchar(100) NOT NULL COMMENT '工作名称',
  `education_cn` varchar(100) DEFAULT NULL COMMENT '学历',
  `experience_cn` varchar(100) DEFAULT NULL COMMENT '经验',
  `district_cn` varchar(100) DEFAULT NULL COMMENT '地区',
  `companyname` varchar(100) DEFAULT NULL COMMENT '公司名称',
  `wage_cn` varchar(40) DEFAULT NULL COMMENT '薪水',
  `refreshtime` datetime DEFAULT NULL COMMENT '刷新时间',
  `click` int(11) DEFAULT NULL COMMENT '点击量',
  `amount` int(11) DEFAULT NULL COMMENT '招收人数',
  `nature_cn` varchar(100) DEFAULT NULL COMMENT '全职/兼职',
  `sex_cn` varchar(100) DEFAULT NULL COMMENT '性别',
  `tag` varchar(100) DEFAULT NULL COMMENT '标签',
  `contents` text DEFAULT NULL COMMENT '工作内容',
  `telephone` varchar(100) DEFAULT NULL COMMENT '电话',
  `contact` varchar(100) DEFAULT NULL COMMENT '称呼',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# 创建表：影院表
#

DROP TABLE IF EXISTS `cinema`;
CREATE TABLE `cinema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(20) DEFAULT NULL COMMENT '地区',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `title` varchar(40) DEFAULT NULL COMMENT '名称',
  `phonenumber` varchar(20) DEFAULT NULL COMMENT '电话',
  `lat` varchar(10) DEFAULT NULL COMMENT '坐标',
  `lng` varchar(10) DEFAULT NULL COMMENT '坐标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='二手物品类型';

#
# 创建表：图片
#

DROP TABLE IF EXISTS `imgs`;
CREATE TABLE `imgs` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '图片名称',
  `url` varchar(255) DEFAULT NULL COMMENT '图片链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片';


#
#  创建事务：添加二手物品
#
DROP PROCEDURE IF EXISTS `usedadd`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usedadd`(n varchar(40),c text,t int(3))
BEGIN  
   insert into `used`(name,content,type,addtime) values(n,c,t,now());
   select max(id) as id from used;
END;

#
#  创建事务：添加二手物品类型
#
DROP PROCEDURE IF EXISTS `usedtypeadd`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usedtypeadd`(n varchar(40))
BEGIN  
   insert into `usedtype`(name) values(n);
   select max(id) as id from usedtype;
END;

#
#  创建事务：添加岗位
#
DROP PROCEDURE IF EXISTS `jobadd`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `jobadd`(cid int(11),jname varchar(100),education varchar(100),experience varchar(100),district varchar(100)
       ,cname varchar(100),wage varchar(100),rtime datetime,click int(11),amount int(11),nature varchar(100),sex varchar(100),tag varchar(100),cont text,
       tel varchar(100),contact varchar(100))
BEGIN  
   insert into `job`(company_id,jobs_name,education_cn,experience_cn,district_cn,companyname,wage_cn,refreshtime,click,amount,nature_cn,sex_cn,tag,contents,telephone,contact) 
          values(cid,jname,education,experience,district,cname,wage,rtime,click,amount,nature,sex,tag,cont,tel,contact);
   select max(id) as id from job;
END;


#
# 添加数据：用户
#
INSERT INTO `user`(username,password,pic) VALUES ('jy02534655','aa7b0b97f35f44dee0ddcd4aa82f9f1b','http://www.361y.cn:8080/Files/img.jpg');
INSERT INTO `user`(username,password,pic) VALUES ('test','7aecd53f5efa128907e20412f4a06552','http://www.361y.cn:8080/Files/img.jpg');

#
# 添加数据：二手物品类型
#
INSERT INTO `usedType`(name) VALUES ('手机');
INSERT INTO `usedType`(name) VALUES ('笔记本');
INSERT INTO `usedType`(name) VALUES ('平板电脑');
INSERT INTO `usedType`(name) VALUES ('电脑/配件');
INSERT INTO `usedType`(name) VALUES ('数码产品');
INSERT INTO `usedType`(name) VALUES ('单反相机');
INSERT INTO `usedType`(name) VALUES ('摩托车');
INSERT INTO `usedType`(name) VALUES ('电动/自行车');



#
# 创建表：配置库类型
#

DROP TABLE IF EXISTS `scmtype`;
CREATE TABLE `scmtype` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '配置库名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='配置库类型';


#
# 添加数据：二手物品类型
#
INSERT INTO `scmtype`(name) VALUES ('CC');
INSERT INTO `scmtype`(name) VALUES ('SVN');
INSERT INTO `scmtype`(name) VALUES ('GIT');
INSERT INTO `scmtype`(name) VALUES ('MKS');


#
#  创建事务：配置库类型
#
DROP PROCEDURE IF EXISTS `scmtypeadd`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `scmtypeadd`(IN n varchar(40))
BEGIN  
   insert into `scmtype`(name) values(n);
   select max(id) as id from scmtype;
END;

#
# 创建事务：添加二手物品测试数据
#
DROP PROCEDURE IF EXISTS `addTestUsed`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addTestUsed`()
BEGIN  
    DECLARE i,j int DEFAULT 1;   
    DECLARE typeName varchar(255);
    START TRANSACTION;      
    WHILE j<8 DO
          select name into typeName from usedtype where id = j;
          WHILE i<61 DO   
             INSERT INTO `used`(type,name,addtime,content) VALUES (j,CONCAT(typeName,i),now(),CONCAT('我是物品介绍，我是',typeName,i));
              set i=i+1;   
          END WHILE;                       
          set j=j+1;          
          SET i=1;
    END WHILE;  
    COMMIT;
END;

#
#  执行事务：添加图片
#

call addTestUsed();

#
# 创建事务：添加二手物品测试数据
#
DROP PROCEDURE IF EXISTS `addImg`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addImg`()
BEGIN  
    DECLARE i int DEFAULT 1;   
    START TRANSACTION;      
    WHILE i<69 DO
          IF i < 10 THEN
             INSERT INTO `imgs`(name,url) VALUES (CONCAT('图片',i),CONCAT('http://www.361y.cn:8080/imgs/img0',i,'.jpg'));
          ELSE
             INSERT INTO `imgs`(name,url) VALUES (CONCAT('图片',i),CONCAT('http://www.361y.cn:8080/imgs/img',i,'.jpg'));
          END IF;
          set i=i+1;   
    END WHILE;  
    COMMIT;
END;

#
#  执行事务：添加二手物品测试数据
#

call addImg();
