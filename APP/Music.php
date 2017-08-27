<?php

class Music
{
    //歌手 首页
    function index()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select  *  from  singer ');//数据库
        $data = $stmt->fetchAll();
        include 'APP/view/singer.html';
    }

    // 歌手
    function singers()
    {
        $id = $_REQUEST['id'];
        include 'Core/Db.php';
        $db = new Db();
//        $stmt = $db->pdo->query('select * from artist_view where cid=' . $id);
        $stmt = $db->pdo->query('select `sl`.`id` AS `id`,`sl`.`name` AS `name`,`sl`.`num` AS `num`,`sl`.`pic` AS `pic`,`sl`.`cid` AS `cid`,`sg`.`name` AS `cate_name` from (`singer_list` `sl` join `singer` `sg`) where (`sl`.`cid` = `sg`.`id`)  AND sl.cid=' . $id);
        $data = $stmt->fetchAll();
        include 'APP/view/singer-list.html';
    }

    // 歌手的歌曲
    function singer_info()
    {
        $aid = ceil($_REQUEST['aid']); //返回时 back 到指定id
        include 'Core/Db.php';
        $db = new Db();
//        $stmt = $db->pdo->query('select * from artist_view where id=' . $aid);
        $stmt = $db->pdo->query('select `sl`.`id` AS `id`,`sl`.`name` AS `name`,`sl`.`num` AS `num`,`sl`.`pic` AS `pic`,`sl`.`cid` AS `cid`,`sg`.`name` AS `cate_name` from (`singer_list` `sl` join `singer` `sg`) where (`sl`.`cid` = `sg`.`id`)  AND sl.id=' . $aid);
        $sing = $stmt->fetch();

//        $stmt = $db->pdo->query('select * from songs_view where aid=' . $aid);
        $stmt = $db->pdo->query('select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`src` AS `src`,`s`.`duration` AS `duration`,`s`.`aid` AS `aid`,`v`.`name` AS `songs_name`,`v`.`pic` AS `songs_pic` from (`songs` `s` join `singer_list` `v`) where (`s`.`aid` = `v`.`id`) AND s.aid=' . $aid);
        $data = $stmt->fetchAll();
        include 'APP/view/singer-info.html';
    }

    // 已点歌曲
    function singing()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from already ');
        $data = $stmt->fetchAll();
        include 'APP/view/already.html';
    }

    // 已点歌曲加载列表
    function select_already()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from already order by id DESC ');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    // 已点歌曲 删除功能
    function delete_already()
    {
        sleep(1);
        include 'Core/Db.php';
        $db = new Db();
        $id = $_REQUEST['id'];
        $stmt = $db->pdo->prepare('delete from already where id = ?');
        $stmt->bindValue(1, $id);
        $stmt->execute();
        if ($stmt->rowCount()) {
            echo 123;
        } else {
            echo 'asd';
        }
        echo $stmt->rowCount();   //受影响的行数
    }

    // 添加到  已点歌曲
    function add_already()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into already (name,pic,time) values(?,?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['pic']);
        $stmt->bindValue(3, $_REQUEST['time']);
        $id = $db->pdo->lastInsertId();
        $stmt->execute();
        echo 123;
    }

    function add_music()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from popular ');
        $data = $stmt->fetchAll();
        include 'APP/view/popular.html';
    }

    //排行榜
    function rank()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`src` AS `src`,`s`.`duration` AS `duration`,`s`.`aid` AS `aid`,`v`.`name` AS `songs_name`,`v`.`pic` AS `songs_pic` from (`songs` `s` join `singer_list` `v`) where (`s`.`aid` = `v`.`id`) order by id DESC  limit 5');
        $data = $stmt->fetchAll();
        include 'APP/view/ranking.html';
    }

    // 排行榜 加载列表
    function select_rank()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from rank order by id DESC ');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    // 添加到  已点歌曲
    function add_rank()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('insert into already (name,pic,time) values(?,?,?)');
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['pic']);
        $stmt->bindValue(3, $_REQUEST['time']);
        $id = $db->pdo->lastInsertId();
        $stmt->execute();
        echo 123;
    }

    //常唱
    function popular()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`src` AS `src`,`s`.`duration` AS `duration`,`s`.`aid` AS `aid`,`v`.`name` AS `songs_name`,`v`.`pic` AS `songs_pic` from (`songs` `s` join `singer_list` `v`) where (`s`.`aid` = `v`.`id`) ');
        $data = $stmt->fetchAll();
        include 'APP/view/popular.html';
    }

    // 常唱 加载列表
    function select_popular()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from popular order by id DESC ');
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    //推荐歌单
    function recommend()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from recommend ');
        $data = $stmt->fetchAll();
        include 'APP/view/recommend.html';
    }

    function recommends()
    {
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select * from popular ');
        $data = $stmt->fetchAll();
        include 'APP/view/recommends.html';
    }

    //播放页面
    function play()
    {
        $id = $_REQUEST['id'];
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->query('select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`src` AS `src`,`s`.`duration` AS `duration`,`s`.`aid` AS `aid`,`v`.`name` AS `songs_name`,`v`.`pic` AS `songs_pic` from (`songs` `s` join `singer_list` `v`) where (`s`.`aid` = `v`.`id`) AND s.id=' . $id);
        $data = $stmt->fetch();
        include 'APP/view/play.html';
    }

    //房间链接
    function room()
    {
        include 'APP/view/room.html';
    }

    //PK
    function PK()
    {
        include 'APP/view/PK.html';
    }

    //K歌
    function Kmusic()
    {
        include 'APP/view/kge.html';
    }

    function header()
    {
        include 'APP/view/Admin_Header.html';
    }

}