<?php

include 'Core/debug.php';
include 'Core/core.php';
include 'Core/function.php';
Core::run();


// 1.大小写问题
// 2.把所有的页面完善
// 3.所有用到的视图替换  spl中的替换到  php 中

/*
//以下为今天练习的
try {
    $pdo = new PDO('mysql:host=localhost;dbname=test;port=3306;charset=utf8','root','');
//          $pdo = new PDO('mysql:host = localhost;dbname = test;port=3306,charset = utf8', 'root', '');
} catch (PDOException $e) {
    dump($e->getMessage());
}

//增删改查

//查
$stmt = $pdo->query('select * from trues');
$data = $stmt->fetchAll();
print_r($data);


//增     //问号用prepare
$stmt = $pdo->prepare('insert into trues (id,name,age) values(?,?,?)');   //   (id,name,age) 必须是 trues 表里有的
$stmt->bindValue(1, 18);
$stmt->bindValue(2, 'asddsa');
$stmt->bindValue(3, 'hgfdsdgh');
$stmt->execute();
$id = $pdo->lastInsertId();
print_r($id);

//删   一条
$stmt = $pdo->prepare('delete from trues where id = ?');
$stmt->bindValue(1, 1);
$stmt->execute();
////删多条
$stmt = $pdo->query('delete from trues where id in (9,8,7,6,5) ');
$stmt->execute();   //执行准备好的Query


//改
$stmt = $pdo->prepare('update trues set name = ?, age = ? where id = ?');
$stmt->bindValue(1, 'asddsaasd'); //问号的值
$stmt->bindValue(2, 'asddsa');
$stmt->bindValue(3, '4');
$stmt->execute();
*/



//Core::run();
//echo 5;

//    $pdo = new PDO('mysql:host = 192.168.3.166;dbname = test;port=3306,charset = utf8', 'root', 'root');
