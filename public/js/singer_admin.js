window.onload = function () {
    let tbodyEl = $('tbody');
    let btnEl = $('button.btn-default');
    let nameEl, priceEl, picEl, numEl, cidEl;

    if(!location.hash){
        location.href=location.pathname+'#list';
    }
    $(window).on('hashchange',function () {
        $('.tab-pane, .nav-tabs li').removeClass('active');
        $(location.hash).addClass('active');
        $(location.hash + '_tab').parent().addClass('active');
        $('#fenlei').addClass('active');
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
                <td><input type="" class="name" value="${v.name}"></td>
                <td><input type="" class="pic" value="${v.pic}"></td>
                <td><a href="javascript:void(0)" class="del">删除</a>
                <a href="/index.php/MusicAdmin/index?id=${v.id}#add">添加歌手</a></td>
             </tr>`).appendTo(tbodyEl);
        })
    }

    //加载数据
    $.ajax({
        url: '/index.php/singer_admin/select',
        success: function (data) {
            data = JSON.parse(data);
            loading(data);
        }
    });

    function add(data) {
        data = JSON.parse(data);
        $(`<tr class="dels" data-id = ${data}>
            <th scope="row" style="text-align: center">${data}</th>
            <td><input type="" class="name" value="${nameEl}"></td>
            <td><input type="" class="pic" value="${picEl}"></td>
            <td><a href="javascript:void(0)" class="del">删除</a></td>
         </tr>`).prependTo(tbodyEl);
        $('input[name=name]').val('');
        $('input[name=pic]').val('');
        location.href = location.pathname + '#list';
    }

    //添加
    btnEl.on('click', function () {
        nameEl = $('input[name=name]').val();
        picEl = $('input[name=pic]').val();
        console.log(nameEl);
        if (nameEl && picEl) {
            $.ajax({
                url: '/index.php/singer_admin/add',
                data: {name: nameEl, pic: picEl},
                success: function (data) {
                    console.log(data);
                    add(data);
                }
            })
        }
    });

    //更新  修改
    tbodyEl.on('change', '.name,.pic,.cid', function () {
        // let value = $('form').serializeArray();
        let key = $(this).attr('class');
        let values = $(this).val();
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/singer_admin/updata',
            data: {key: key, value: values, id: id},
        })
    });

    tbodyEl.on('click', '.del', function () {
        let self = $(this);
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/singer_admin/delete',
            data: {id: id},
            success: function (data) {
                self.closest('tr').remove();
            }
        })
    });

};


