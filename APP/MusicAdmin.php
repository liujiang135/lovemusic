<?php

class MusicAdmin
{
    function index()
    {
        $title = '歌手管理';
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from singer order by id desc');
        $data = $stmt->fetchAll();
        include 'APP/view/music_admin.html';
    }

    function select()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select `sl`.`id` AS `id`,`sl`.`name` AS `name`,`sl`.`num` AS `num`,`sl`.`pic` AS `pic`,`sl`.`cid` AS `cid`,`sg`.`name` AS `cate_name` from (`singer_list` `sl` join `singer` `sg`) where (`sl`.`cid` = `sg`.`id`) order by id desc');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function add()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into singer_list (name,pic,cid,num) values(?,?,?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['pic']);
        $stmt->bindValue(3, $_REQUEST['cid']);
        $stmt->bindValue(4, $_REQUEST['num']);
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
        $stmt = $db->pdo->prepare('delete from singer_list where id = ?');
        $stmt->bindValue(1,$id);
        $stmt->execute();
        if($stmt->rowCount()){
            echo '歌手删除成功';
        }else{
            echo '歌手删除失败';
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

