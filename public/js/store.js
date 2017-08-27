window.addEventListener('load', function () {
    var o, r;
    let choicelist = localStorage.choicelist;
    choicelist = [];

    //切换
    $('.choice2').on('click', function () {
        if ($('.choice1').hasClass('active')) {
            $('.choice1').removeClass('active');
        }
        $('.choice2').css({color: '#fff'}).addClass('active');
        $('.choice1').css({color: '#FF318D'});
        $('.foodlist').css({display: 'block'});
        $('.drinklist').css({display: 'none'});
    });
    $('.choice1').on('click', function () {
        if ($('.choice2').hasClass('active')) {
            $('.choice2').removeClass('active');
        }
        $('.choice1').css({color: '#fff'}).addClass('active');
        $('.choice2').css({color: '#FF318D'});
        $('.drinklist').css({display: 'block'});
        $('.foodlist').css({display: 'none'});
    });

    $('.drinklist .add,.foodlist .add').on('click', function () {
        $('.choiced .box').css({background: 'none', height: '0.7rem'});
        o = JSON.parse($(this).closest('.lists').attr('data'));
        r = choicelist.filter(function (v, i) {
            return v.id == o.id
        });
        if (!r.length) {
            o.num = 1;  //把这个的Num改成1
            choicelist.push(o);
            $(this).prev().html(o.num);
        } else {
            r[0].num += 1; //
            $(this).prev().html(r[0].num);
        }
        render();
    });

    $('.drinklist .minus,.foodlist .minus').on('click', function () {
        $('.choiced .box').css({background: 'none', height: '0.7rem'});
        o = JSON.parse($(this).closest('.lists').attr('data'));
        r = choicelist.filter(function (v, i) {
            return v.id == o.id
        });
        if(r.length>0){
            r[0].num-=1;
            if(r[0].num==0){
                choicelist = choicelist.filter(function (v, i) {
                    return v.id != o.id
                });
            }
            $(this).next().html(r[0].num);
            render();
        }
    });

    function render() {
        $('.box').empty();
        choicelist.forEach(function (v, i) {
            $('.box').append(`<nobr class="shop ss${i}">${$('.name').eq(i).html()}<p>${v.num}</p>瓶</nobr>`);
        });
        $('.water').html(getWaterNum());
        $('.foot').html(getFoodNum());
        $('.s2').html(getTotal());
    }

    function getWaterNum() {
        var t = 0;
        choicelist.forEach(function (v, i) {
            if (v.cid == 0) {
                t += v.num;
            }
        });
        return t;
    }

    function getFoodNum() {
        var t = 0;
        choicelist.forEach(function (v, i) {
            if (v.cid == 2) {
                t += v.num;
            }
        });
        return t;
    }

    function getTotal() {
        var total = 0;
        choicelist.forEach(function (v, i) {
            total += v.num * v.price;
        });
        return total.toFixed(2);
    }

    //选好了
    $('.done ').on('click',function(){
        localStorage.choicelist = JSON.stringify(choicelist);
    })


    /*   核心
     let arr = [];
     arr = [
     {num: 1, price: 3.43},
     {num: 2.1, price: 5.62},
     {num: 3, price: 2.11}
     ];
     console.table(arr);

     function sum() {
     let total = 0;
     arr.forEach(function (v, i) {
     total += v.num * v.price;
     });
     $('.s2').html(total.toFixed(2));
     }
     sum();*/

}, false);

// 自己的方法
/*
 //store
 let length = $('.lists').length;
 let sum = 0;
 let sum1 = 0;
 let nums = 0;
 let nums1 = 0;
 sum = sum.toFixed(2);
 $('.s2').html(sum);
 $('.water').html(nums);
 $('.foot').html(nums);

 for (let i = 0; i < length; i++) {
 let minus = $('.minus').eq(i);
 let add = $('.add').eq(i);
 let num = 0;
 //加
 add.on('click', function () {
 $('.choiced .box').css({background: 'none', height: '0.7rem'});
 $('.num').eq(i).html(++num);
 sum = sum - sum1;
 nums = nums - nums1;
 for (let i = 0; i < length; i++) {
 nums = parseInt($('.num').eq(i).html()) + nums;
 sum = parseInt($('.num').eq(i).html()) * $('.price').eq(i).html() + sum;
 }
 sum1 = sum;
 sum = sum.toFixed(2);
 $('.s2').html(sum);
 nums1 = nums;
 if ($('.choice1').hasClass('active')) {
 let shuinum = nums - $('.foot').html();
 $('.water').html(shuinum);
 } else if ($('.choice2').hasClass('active')) {
 let footnum = nums - $('.water').html();
 $('.foot').html(footnum);
 }
 if ($('.box nobr').hasClass(`ss${i}`)) {
 $(`.ss${i} p`).html(num);
 } else {
 $('.box').append(`<nobr class="shop ss${i}">${$('.name').eq(i).html()}<p>${num}</p>瓶</nobr>`);
 }
 });
 //减
 minus.on('click', function () {
 if (num > 0) {
 $('.num').eq(i).html(--num);
 sum = sum - $('.price').eq(i).html();
 sum = sum.toFixed(2);
 sum1 = 0;
 $('.s2').html(sum);
 if ($('.choice1').hasClass('active')) {
 let num11 = parseInt($('.water').html());
 --num11;
 $('.water').html(num11);
 } else if ($('.choice2').hasClass('active')) {
 let num22 = parseInt($('.foot').html());
 --num22;
 $('.foot').html(num22);
 }
 --nums;
 nums1 = 0;
 }
 console.log($('.s2').html())
 if ($('.s2').html() == 0) {
 console.log(123);
 $('.choiced .box').css({height: '0.2rem'});
 }

 if ($('.box nobr').hasClass(`ss${i}`)) {
 $(`.ss${i} p`).html(num);
 if (num == 0) {
 $(`.ss${i}`).remove();
 }
 }
 });
 }
 */

