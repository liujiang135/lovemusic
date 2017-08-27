<?php

class Store{
    function index(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from store where cid = 0');//数据库
        $data = $stmt->fetchAll();
        $stmt = $db->pdo->query('select * from store where cid = 2');//数据库
        $data1 = $stmt->fetchAll();
        include 'APP/view/store.html';
    }
    function bill(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from submit ');//数据库
        $data = $stmt->fetchAll();
        include 'APP/view/submit.html';
    }
    function success(){
        include 'APP/view/success.html';
    }
}
