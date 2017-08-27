<?php

class singer_admin
{
    function index()
    {
        $title = '分类管理';
        include 'APP/view/singer_admin.html';
    }

    function select()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from singer order by id desc');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function add()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into singer (name,pic) values(?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['pic']);
        $stmt->execute();
        $id = $db->pdo->lastInsertId();
        echo json_encode($id);
    }

    function delete()
    {
        sleep(1);
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $stmt = $db->pdo->prepare('delete from singer where id = ?');
        $stmt->bindValue(1,$id);
        $stmt->execute();
        if($stmt->rowCount()){
            echo 123;
        }else{
            echo 'asd';
        }
        echo $stmt->rowCount();   //受影响的行数
    }

    function updata()
    {
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $key = $_REQUEST['key'];
        $value = $_REQUEST['value'];
        $stmt = $db->pdo->prepare("update singer set {$key} = ? where id = ?");
        $stmt->bindValue(1, $value);
        $stmt->bindValue(2, $id);
        $stmt->execute();
        echo $stmt->rowCount();
    }

}

