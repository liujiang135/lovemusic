<?php

//连接数据库
class Db{
    public $pdo;
    public function __construct()
    {

//        $this->pdo = new PDO('mysql:host=localhost;dbname=ktv;port=3306;charset=utf8','root','');
//        $this->pdo = new PDO('mysql:host=sqld.duapp.com;dbname=nPxMUFvxengNmeSedXUA;port=4050;charset=utf8','Access Key','Secret Key');
        $this->pdo = new PDO('mysql:host=sqld.duapp.com;dbname=nPxMUFvxengNmeSedXUA;port=4050;charset=utf8','629698f6e888449b99dee4e941832137','a58a4ca94d8646f89f216c14a72674e6');
    }
}
