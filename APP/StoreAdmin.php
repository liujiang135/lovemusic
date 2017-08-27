<?php

class StoreAdmin
{
    function __construct()
    {
        check_login();
    }

    function index()
    {
        $title = '商店管理';
        include 'APP/view/storeadmin.html';
    }

    function select_store()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from store order by id desc');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function add_store()
    {
//        print_r($_FILES);
        $src = $_FILES['pic']['tmp_name'];   //  D:\wamp\wamp64\tmp\phpCBDB.tmp
        $ext = explode('.', $_FILES['pic']['name'])[1]; // png格式
        $file_name = md5(time()) . '.' . $ext;  //  图片.png
//        $dist = 'public/upload/'.$file_name;//直接在www目录下
        $dist = '../public/upload/' . $file_name; // 在KTV下
//        $name = '/public/upload/'.$file_name;//直接在www目录下
        $name = '/../public/upload/' . $file_name;   // 在KTV下
        move_uploaded_file($src, $dist);  //如果出错，是 $dist路径有问题

        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into store (name,price,pic,num,cid) values(?,?,?,?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['price']);
        $stmt->bindValue(3, $name);
        $stmt->bindValue(4, $_REQUEST['num']);
        $stmt->bindValue(5, $_REQUEST['cid']);
        $stmt->execute();
        $id = $db->pdo->lastInsertId();
        echo json_encode($id);
    }

    function delete_file()
    {
        //从数据库中删除一条
        //文件也要删掉
        //php删除
    }

    function delete_store()
    {
        sleep(1);
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $stmt = $db->pdo->prepare('delete from store where id = ?');
        $stmt->bindValue(1, $id);
        $stmt->execute();
        if ($stmt->rowCount()) {
            echo 123;
        } else {
            echo 'asd';
        }
        echo $stmt->rowCount();   //受影响的行数
        header('Location:/index.php/admin_ajax/select_music');
    }

    function updata()
    {
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $key = $_REQUEST['key'];
        $value = $_REQUEST['value'];
        $stmt = $db->pdo->prepare("update store set {$key} = ? where id = ?");
        $stmt->bindValue(1, $value);
        $stmt->bindValue(2, $id);
        $stmt->execute();
        echo $stmt->rowCount();
    }

}

