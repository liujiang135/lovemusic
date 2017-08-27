<?php

class Game{
    function index(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from advanture order by id desc limit 9');//数据库   限制9个
        $data = $stmt->fetchAll();
        include 'APP/view/game.html';
    }
    function advanture(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from advanture order by id desc limit 9');//数据库   限制9个
        $data = $stmt->fetchAll();
        include 'APP/view/adventure.html';
    }
    //  真心话  下一批
    function true(){
        $page = $_REQUEST['page'];
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from advanture order by id desc limit 9 offset '.($page - 1) * 9);//数据库     偏移，跳过9个
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }
    //  大冒险  下一批
    function risk(){
        $page = $_REQUEST['page'];
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from risk order by id desc limit 9 offset '.($page - 1) * 9);//数据库     偏移，跳过9个
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function trues(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from advanture order by id desc limit 9');//数据库   限制3个
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }
    function risks(){
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from risk order by id desc limit 9');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }
}


