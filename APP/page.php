<?php

class Pages{
//首页
    function index(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt =$db->pdo->query('select * from notice order by id DESC limit 1');
        $shuju = $stmt->fetch();
        include 'view/index.html';
    }
//新闻详情页
    function news(){
        include 'view/news.html';
    }
//登录
    function login(){
        include 'view/login.html';
    }

    }