window.addEventListener('load', function () {

    var choicelist = JSON.parse(localStorage.choicelist);

    let nums = 0;
    let sum = 0;
    render();
    function render() {
        $('.content').empty();
        choicelist.forEach(function (value, index) {
            $(`<li class="lists" data='${JSON.stringify(choicelist)}' >
            <div class="pic">
                <img src="${value.pic}" alt="">
            </div>
            <ul class="text">
                <li class="name">${value.name}</li>
                <li class="ml">350ml</li>
                <li class="num-rmb">
                    <div class="numleft">
                        <span class="minus"></span>
                        <span class="num">${value.num}</span>
                        <span class="add"></span>
                    </div>
                    <div class="price">${(value.price * value.num).toFixed(2)}</div>
                    <div class="pic"></div>
                </li>
            </ul>
        </li>`).appendTo('.content');
            $('.nummer p span').html(getfullnum()); //  共26件
            $('.prices').html(getTotal());  //总价
            localStorage.choicelist = JSON.stringify(choicelist);
        });
    }

    $('.content').on('click', '.add', function () {
        var o = JSON.parse($(this).closest('.lists').attr('data'));
        var r = choicelist.filter(function (v, i) {
            return v.id == o[i].id
        });
        if (!r.length) {
            o.num = 1;  //把这个的Num改成1
            choicelist.push(o);
            $(this).prev().html(o.num);
        } else {
            let currentnum = $(this).closest('.lists').index();
            r[currentnum].num += 1;  //找出这个的位置
            // $(this).closest('.lists').find('.price').html(r[currentnum].price * r[currentnum].num);
            $(this).prev().html(r[$(this).closest('.lists').index()].num);
        }
        $('.prices').html(getTotal());
        render();
    });

    $('.content').on('click', '.minus', function () {
        var o = JSON.parse($(this).closest('.lists').attr('data'));
        var r = choicelist.filter(function (v, i) {
            return v.id == o[i].id
        });
        if (r.length) {
            let n = $(this).closest('.lists').index();
            r[n].num -= 1;//找出这个的位置
            let self = this;
            $(this).prev().html(r[n].num);
            $('.prices').html(getTotal());
            if (r[n].num == 0) {
                $('.nummer p span').html(0);
                choicelist = choicelist.filter(function(v,i){
                    return v.id != o[$(self).closest('.lists').index()].id;
                })
            }
        }
        render();
    });

    function getTotal() {
        var total = 0;
        choicelist.forEach(function (v, i) {
            total += v.num * v.price;
        });
        return total.toFixed(2);
    }

    function getfullnum() {
        let sum = 0;
        choicelist.forEach(function (v, i) {
            sum += v.num;
        });
        return sum;
    }

}, false);


