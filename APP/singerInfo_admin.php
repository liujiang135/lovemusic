<?php

class singerInfo_admin
{
    function index()
    {
        $title = '歌曲列表';
        include 'APP/view/singerInfo_admin.html';
    }

//    加载数据
    function select()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`src` AS `src`,`s`.`duration` AS `duration`,`s`.`aid` AS `aid`,`v`.`name` AS `songs_name`,`v`.`pic` AS `songs_pic` from (`songs` `s` join `singer_list` `v`) where (`s`.`aid` = `v`.`id`) order by id desc');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function add()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into songs (name,src,duration,aid) values (?,?,?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['src']);
        $stmt->bindValue(3, $_REQUEST['duration']);
        $stmt->bindValue(4, $_REQUEST['aid']);
        $stmt->execute();
        echo $db->pdo->lastInsertId();
    }

    function search()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query("select * from singer_list where name like '%{$_REQUEST['keyword']}%'");
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function delete()
    {
        sleep(1);
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('delete from songs where id = ?');
        $stmt->bindValue(1, $_REQUEST['id']);
        $stmt->execute();
        if ($stmt->rowCount()) {
            echo '删除成功';
        } else {
            echo '删除失败';
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
        $stmt = $db->pdo->prepare("update singer_info set {$key} = ? where id = ?");
        $stmt->bindValue(1, $value);
        $stmt->bindValue(2, $id);
        $stmt->execute();
        echo $stmt->rowCount();
    }

}

