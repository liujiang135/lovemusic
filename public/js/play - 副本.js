$(function () {
    var name = $('input:hidden').val();
    var result = [];
    $.ajax({
        url: `../../public/lyrics/${name}.json`,
        dataType: 'json',
        success: function (data) {
            var lrc = data.lrc.lyric;
            let c = lrc.split('\n');
            // var result = [];
            c.forEach(function (v, i) {
                var o = {
                    time: v.slice(v.indexOf('[') + 1, v.lastIndexOf(']')),
                    lyric: v.slice(v.lastIndexOf(']') + 1)
                };
                result.push(o);
                $(`<li>${o.lyric}</li>`).appendTo('.lyrics');
            });
            console.table(result);
        }
    });
    var database = result;
    var audio = $('#audio').get(0);
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
        $('.lyrics li').forEach(function (v, i) {
            $('.lyrics li')[i].innerHTML = obj['lyrics'][index]['lyric'];
        });
    }

    let i = x = 0;

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
        database[index].lyrics.forEach(function (v, i, obj) {
            if (v.time == current) {
                x = i = index;
            }
        });
        if (x < 2) {
            i = 0;
        } else {
            i = x - 2;
        }
        for(let j=i;j<database[index].lyrics.length;j++){
            if(j == x){
                string+=`
                    <li class="hot">${database[index].lyrics[j].lyric}</li>
                `
            }else{
                string+=`
                    <li>${database[index].lyrics[j].lyric}</li>
                `
            }
        }
        $('.lyrics').innerHTML = string;
    };


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





