window.onload = function () {
    let tbodyEl = $('tbody');
    let btnEl = $('button.btn-default');
    let nameEl, priceEl, picEl, numEl, cidEl;

    if (!location.hash) {
        location.href = location.pathname + '#list';
    }
    $(window).on('hashchange', function () {
        $('.tab-pane, .nav-tabs li').removeClass('active');
        $(location.hash).addClass('active');
        $(location.hash + '_tab').parent().addClass('active');

        if (location.hash == '#list') {
            location.harf = location.pathname + '#list';
            // console.log(123);
            $.ajax({
                url: '/index.php/MusicAdmin/select',
                success: function (data) {
                    data = JSON.parse(data);
                    loading(data);
                }
            });
        }
    });
    $(window).trigger('hashchange');

    $(document).ajaxStart(function () {
        $('.tip').css({height: '2px', background: 'red'}).animate({width: '50%'});
    });

    $(document).ajaxSuccess(function () {
        $('.tip').css({background: 'yellow'}).animate({width: '80%'});
    });

    $(document).ajaxComplete(function () {
        $('.tip').css({background: '#00C853'}).stop().animate({width: '100%'}).queue(function () {
            $('.tip').css({width: '5%', height: '0'}).dequeue();
        })
    });

    function loading(data) {
        tbodyEl.empty();
        $.each(data, function (i, v) {
            $(`
             <tr class="dels" data-id = '${v.id}'>
                <th scope="row" style="text-align: center">${v.id}</th>
                <td><input type="" class="name" value="${v.cate_name}"></td>
                <td><input type="" class="cid" value="${v.name}"></td>
                <td><input type="" class="num" value="${v.num}"></td>
                <td><input type="" class="pic" value="${v.pic}"></td>
                <td><a href="javascript:void(0)" class="del">删除</a></td>
             </tr>`).appendTo(tbodyEl);
        })
    }

    //添加
    btnEl.on('click', function () {
        let formData = $('#form').serializeArray();
        $.ajax({
            url: '/index.php/MusicAdmin/add?' + $('#form').serialize(),
            success: function (data) {
                location.href = location.pathname + '#list';
            }
        });
        return false;
    });
    //更新  修改
    tbodyEl.on('change', '.name,.pic,.cid', function () {
        let key = $(this).attr('class');
        let values = $(this).val();
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/MusicAdmin/updata',
            data: {key: key, value: values, id: id},
        })
    });

    tbodyEl.on('click', '.del', function () {
        let self = $(this);
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/MusicAdmin/delete',
            // dataType: 'json',
            data: {id: id},
            success: function (data) {
                self.closest('tr').remove();
            }
        })
    });

};


