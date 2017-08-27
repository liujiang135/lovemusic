<?php

class GameAdmin
{
    function index()
    {
        $title = '游戏管理';
        include 'APP/view/gameadmin.html';
    }

    function select()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from advanture order by id desc');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function add()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into advanture (content,cid) values (?,?)');
        $stmt->bindValue(1, $_REQUEST['content']);
        $stmt->bindValue(2, $_REQUEST['cid']);
        $stmt->execute();
        echo $db->pdo->lastInsertId();
    }

    function delete()
    {
//        sleep(1);
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $stmt = $db->pdo->prepare('delete from advanture where id = ?');
        $stmt->bindValue(1, $id);
        $stmt->execute();
        if ($stmt->rowCount()) {
            echo 123;
        } else {
            echo 'asd';
        }
        echo $stmt->rowCount();   //受影响的行数
//        header('Location:/index.php/Gameadmin/select_game');
    }

    function updata()
    {
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $key = $_REQUEST['key'];
        $value = $_REQUEST['value'];
        $stmt = $db->pdo->prepare("update advanture set {$key} = ? where id = ?");
        $stmt->bindValue(1, $value);
        $stmt->bindValue(2, $id);
        $stmt->execute();
        echo $stmt->rowCount();
    }

}

