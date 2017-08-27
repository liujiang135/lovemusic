/**
 * Created by Administrator on 2017/6/19.
 */


window.addEventListener('load',function(){

    $(function(){
        // 点击做游戏   换一批

        $('.middle').on('click','li',function(){
            $(this).addClass('active');
            $('.mask').addClass('active');
            $('.wen p').html(this.innerHTML);
            if($('.middle li.active').length === 9){
            //当‘换一批’点击事件在length下时，每次length=3时，
            // 下边的on事件就多注册一次，所以会出现点击次数越多，注册越多的现象。
                $('.top>.you').addClass('active');
                if($('.true').hasClass('active')){
                    urls = '/index.php/Game/true';
                }else{
                    urls = '/index.php/Game/risk';
                }
            }
        });

        //换一批 按钮
        var index=1;
        $('.top').on('click','.you.active',function(){
            index += 1;
            console.log(index);
            $.ajax({
                url:urls,
                data:{page:index},
                success(data){
                    data = JSON.parse(data);
                    $('.middle').empty();
                    $.each(data,function(index,value){
                        $(`<li><p>${value.content}</p></li>`).appendTo('.middle');
                    });
                }
            });
            $('.middle li p').css({display:'none'});
            $('.top>.you').removeClass('active');
            $('.middle li').removeClass('active');
        });

        //大冒险  真心话  切换
        $('.footer div').on('click',function(){
            $('.footer div').removeClass('active');
            $(this).addClass('active');
            if($('.true').hasClass('active')){
                urls = '/index.php/Game/trues';
                $('.top span').html('真心话');
                index = 1;
                console.log('urls');
            }else{
                urls = '/index.php/Game/risks';
                index = 1;
                $('.top span').html('大冒险');
                console.log('urls');

            }
            console.log(urls);
            $.ajax({
                url: urls,
                success(data){
                    data = JSON.parse(data);
                    $('.middle').empty();
                    $.each(data, function (index, value) {
                        $(`<li><p>${value.content}</p></li>`).appendTo('.middle');
                    });
                    console.log(data);
                }
            });
        });
        $('.close img').on('click',function(){
            $('.mask').removeClass('active');
        });
        $('.mask').on('click',function(){
            $(this).removeClass('active');
        });
        $('.require').on('click',false);
    });
},false);


