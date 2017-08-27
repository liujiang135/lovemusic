<?php

class Core
{
    static function run()
    {
        if (!isset($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO'] == '/' || $_SERVER['PATH_INFO'] == '') { //判断为空或 '/'
            $class_name = 'Home';
            $fn = 'index';
        } else {
            $path_info = explode('/', substr($_SERVER['PATH_INFO'], 1));
            $class_name = $path_info[0];
            $fn = isset($path_info[1]) && $path_info[1] ? $path_info[1] : 'index';
        }
        if (file_exists("APP/{$class_name}.php")) {  // 判断有没这个文件
            include "APP/{$class_name}.php";
            if (class_exists($class_name)) {  //  class_exists 检查类是否已定义
                $page = new $class_name();
                if (method_exists($class_name, $fn)) {   // 检查类的方法是否存在
                    $page->$fn();
                } else {
                    echo '检查类的方法是否存在';
                    include 'APP/view/405.html';
                }
            } else {
                echo ' 检查类是否已定义';
                include 'APP/view/405.html';
            }
        } else {
            echo ' 判断有没这个文件';
            include 'APP/view/405.html';
        }
    }
}

/*        include "APP/{$class_name}.php";
        $page = new $class_name();

        $fn = $path_info[1];
        $page->$fn();*/

/*public static function run(){
    include 'APP/page.php';
    $pages = new Pages();
    if(!isset($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO']=='/' ){
        //如果只是  http://localhost/
        $fn = 'index';
    }else{
        $fn = substr($_SERVER['PATH_INFO'],1);
    }

    if(method_exists('pages',$fn)){  //method_exists — 检查类的方法是否存在
        $pages->$fn();
    }else{
        include 'APP/view/405.html';
    }
}*/
