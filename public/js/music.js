/**
 * Created by Administrator on 2017/6/20.
 */

window.addEventListener('load', function () {

    var num; //已点歌曲数量

    //singer_info
    let jias = $('.add .jia');

    $('.add').on('click','.jia',function(){
        $(this).toggleClass('active');
        num = $('.add .jia.active').length;
        $('.you a').html('已点 '+num+' 首');
        console.log(num);
    });

});





