$(function () {
    var name = $('input:hidden').val();
    var audio = $('#audio').get(0);
    let lyric1=document.querySelectorAll('.lyrics li');//歌词
    var index = 0;
    var database;
    $.ajax({
        url: `../../public/lyrics/${name}.json`,
        dataType: 'json',
        success: function (data) {
            var lrc = data.lrc.lyric;
            let c = lrc.split('\n');
            var result = [];
            c.forEach(function (v, i) {
                var o = {
                    time: v.slice(v.indexOf('[') + 1, v.lastIndexOf('.')),
                    lyric: v.slice(v.lastIndexOf(']') + 1)
                };
                result.push(o);
                $(`<li>${o.lyric}</li>`).appendTo('.lyrics');
            });
            database = result;
            console.table(database);
        }
    });

    //时间更新函数   歌词
    audio.ontimeupdate = function () {
        let current = format(audio.currentTime);
        let timeall = format(audio.duration);
        let string = '';
        jindu1();
        if (audio.ended) {
            $('#play1').css({display: 'block'});
            $('#stop1').css({display: 'none'});
        }
        $('.lyrics').empty();
        database.forEach(function (v, index, obj) {
            if (v.time == current) {
                x = i = index;
            }
        });
        if (x < 2) {
            i = 0;
        } else {
            i = x - 2;
        }
        for(let j=i;j<database.length;j++){
            if(j == x){
                string+=`
                    <li class="hot">${database[j].lyric}</li>
                `
            }else{
                string+=`
                    <li>${database[j].lyric}</li>
                `
            }
        }
        $(string).appendTo('.lyrics');
    };

    $('.btn.play').on('click', 'img', function () {
        if (audio.paused) {
            audio.play();
            init(database[index]);
            $('#play1').css({display: 'none'});
            $('#stop1').css({display: 'block'});
        } else {
            audio.pause();
            $('#stop1').css({display: 'none'});
            $('#play1').css({display: 'block'});
        }
    });

    if (audio.played) {
        audio.pause();
        $('#stop1').css({display: 'none'});
        $('#play1').css({display: 'block'});
    } else {
        audio.play();
        $('#play1').css({display: 'none'});
        $('#stop1').css({display: 'block'});
    }

    //点击进度条播放
    function play(obj) {
        let timeall = audio.duration;
        let timenow;
        let cx = obj.pageX;
        let px = $('.long').offset().left;
        let lefts = cx - px;
        if (lefts > $('.long').width()) {
            lefts = $('.long').width();
        } else if (lefts < 0) {
            lefts = 0;
        }
        let bili = lefts / $('.long').width();  // 所占比例
        let widths = bili * 100 + '%';
        $('.long1').css({width: `${widths}`});
        $('.voice .voice1 .long .circle').css({left: `${widths}`});
        audio.currentTime = timeall * bili;
    }

    $('.voice1')[0].addEventListener('touchstart', function (e) {
        let obj = e.touches[0];
        play(obj);
    })
    $('.voice1')[0].addEventListener('touchmove', function (e) {
        let obj = e.touches[0];
        play(obj);
    })
    $('.voice1')[0].addEventListener('touchend', function (e) {
        e.preventDefault();
    });

    //进度条
    function jindu1() {
        let timenow = audio.currentTime;
        let timeall = audio.duration;
        let bili = timenow / timeall;
        let widths = bili * 100 + '%';
        $('.long1').css({width: `${widths}`});
        $('.voice .voice1 .long .circle').css({left: `${widths}`});
    }


    function init(obj) {
        // audio.src = obj.src;
        lyric1.forEach(function (v, i) {
            lyric1[i].innerHTML = obj[i]['lyric'];
        });
    }

    let i = x = 0;



    //格式化时间
    function format(time){
        let min=Math.floor(time/60)<10 ? '0'+Math.floor(time/60) : Math.floor(time/60);
        let s=Math.floor(time%60)<10 ? '0'+Math.floor(time%60) : Math.floor(time%60);
        return `${min}:${s}`;
    }


    //音量
    $('.voice2')[0].addEventListener('touchstart', function (e) {
            var touch = e.touches[0];
            let ox = touch.clientX;
            let oy = touch.clientY;
        }
    );
    $('.voice2')[0].addEventListener('touchmove', function (e) {
        var touch = e.touches[0];
        let cx = touch.pageX;
        let px = $('.longs').offset().left;
        let lefts = cx - px; //音量条长度
        if (lefts > $('.longs').width()) {
            lefts = $('.longs').width();
        } else if (lefts < 0) {
            lefts = 0;
        }
        let scale = lefts / $('.longs').width();  // 所占比例
        let widths = scale * 100 + '%';
        $('.longs1').css({width: `${widths}`});
        $('.voice .voice2 .longs .circles').css({left: `${widths}`});
        audio.volume = scale;
    });
    $('.voice2')[0].addEventListener('touchend', function (e) {
        e.preventDefault();
    });

});





