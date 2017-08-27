<?php

class login
{
    function index()
    {
        if (isset($_COOKIE['login'])) {   //自动登录
            header('Location:/index.php/StoreAdmin/index');
        } else {
            include 'APP/view/login.html';
        }
    }

    function check()
    {
        $user = $_REQUEST['user'];
        $password = $_REQUEST['password'];
        include 'Core/Db.php';
        $db = new Db();
        $stmt = $db->pdo->prepare('select * from login where user = ?');
        $stmt->bindValue(1, $user);
        $stmt->execute();
        $data = $stmt->fetch();
//        if($data && ($data['password'] == md5($password))){
        if ($data && ($data['password'] == $password)) {
            setcookie('login', 'true', time() + 60 * 60 * 24 * 7, '/');
            echo 'OK';
        } else {
            echo 'error';
        }
    }

    function logout()
    {
        unset($_COOKIE['login']);
        setcookie('login',null,'-1','/');
        header('Location:/index.php/Login/index');
    }
}

