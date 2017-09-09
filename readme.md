# beist

## 简要介绍
* 'Beist' 是一款基于Java语言的Web项目，提供一种新的记忆单词方法。
* 项目开源地址：[GitHub](https://github.com/ylzhang96/beist)

## 目录结构
* readme.md：即本文档（项目介绍、安装说明等）
* beist-boot：后端代码
* beist-ui：前端代码
* beist-spider：爬虫代码及文件
* database：数据库文件
* document：其他文档（实习报告、演示PPT等）

## 安装说明

### 语言与集成开发环境
* Java : IntelliJ IDEA 2017.1
* Javascript & html & css : WebStorm 2017.2.2
* Python : Pycharm 2017.1.2
* SQL : SQL Server 2016
以下安装说明均只针对如上开发环境。

### beist-ui
* 安装NPM(Node Package Management)：一款包管理工具，随Node.js一起安装，安装包可在document文件夹下找到
* 进入beist-ui文件夹，启动cmd，输入npm start
* 打开浏览器，输入网址localhost:3000即可看到网页界面

### beist-boot
* 安装Maven：一款项目管理工具，安装包可在document文件夹下找到，需配置环境变量，并打开Maven\apache-maven-3.5.0\conf\settings.xml文件修改LocalWarehouse地址
* 打开Idea IDE 设置Maven安装目录和Settings文件位置
* 进入SQL Server，附加数据库
* 打开beist-boot项目
* 修改src\main\resources下的application.properties文件中spring.datasource.username和spring.datasource.password的值
* 修改src\main\java\com\beist\util下的PathConstants.java文件中的地址
* 点击Run 'BeistBootApplication'即可运行后端代码

### beist-spider
* 使用Pycharm打开程序

### 使用技术包括但不仅限于
#### Maven
#### Git
#### Node.js/npm
#### [React](https://github.com/facebookincubator/create-react-app)
* React-router-dom
* proxy
* [React-Bootstrap](https://react-bootstrap.github.io/)

#### Restful
#### Spring Security / [JWT](https://github.com/jwtk/jjwt) / Token

#### [Fetch/Ajax](https://github.github.io/fetch/)
#### [SpringBoot](http://projects.spring.io/spring-boot/)
* [Spring Data Rest](https://spring.io/guides/tutorials/react-and-spring-data-rest/)
* Spring Data JPA / Hibernate


## Brief Introduction
* 'Beist' is a Java Web & Android Application for providing a new method of memorizing English words.
* Address for [GitHub](https://github.com/ylzhang96/beist)

## Profile
* readme.md：introduction, installation and so on
* beist-boot：backend coding in java
* beist-ui：ui coding in react
* beist-spider：web crawler in python and article
* database：about database
* document：other document

## Installation

### Languages and IDEs
* Java : IntelliJ IDEA 2017.1
* Javascript & html & css : WebStorm 2017.2.2
* Python : Pycharm 2017.1.2
* SQL : SQL Server 2016