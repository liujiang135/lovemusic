<?php

function check_login()
{
    if (!isset($_COOKIE['login'])) {
        header('Location:/index.php/Login/index');     // 回到登录
    }
}


