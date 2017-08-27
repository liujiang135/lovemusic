<?php

class My{
    function index(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from main '); //数据库
        $data = $stmt->fetchAll();
        include 'APP/view/main.html';
    }
    function fans(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from fans ');
        $data = $stmt->fetchAll();
        include 'APP/view/fans.html';
    }
}
