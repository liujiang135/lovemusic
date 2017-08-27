<?php

class singerList_admin
{
    function index()
    {
        include 'APP/view/singerList_admin.html';
    }

    function select_singers()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from singer_list order by id desc');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function add_singers()
    {
        include 'Core/Db.php';
        $db=new Db();
        $stmt=$db->pdo->prepare('insert into singer_list (name,num,pic,cid) values (?,?,?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['num']);
        $stmt->bindValue(3, $_REQUEST['pic']);
        $stmt->bindValue(4, $_REQUEST['cid']);
        $stmt->execute();
        echo $db->pdo->lastInsertId();
    }

    function delete_singers()
    {
        sleep(1);
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $stmt = $db->pdo->prepare('delete from singer_list where id = ?');
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
        $stmt = $db->pdo->prepare("update singer_list set {$key} = ? where id = ?");
        $stmt->bindValue(1, $value);
        $stmt->bindValue(2, $id);
        $stmt->execute();
        echo $stmt->rowCount();
    }

}

