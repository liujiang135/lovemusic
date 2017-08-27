window.onload = function () {
    let tbodyEl = $('tbody');
    let btnEl = $('button.btn-default');
    let nameEl, numEl, picEl, cidEl;

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

    if(location.history){
        historyList = JSON.parse(localStorage.history)
    }else{
        var historyList =[];
    }

    if (!location.hash) {
        location.href = location.pathname + '#list';
    }
    $(window).on('hashchange', function () {
        $('.tab-pane, .nav-tabs li').removeClass('active');
        $(location.hash).addClass('active');
        $(location.hash + '_tab').parent().addClass('active');
        if (location.hash == '#list') {
            location.harf = location.pathname + '#list';
            $.ajax({
                url: '/index.php/singerInfo_admin/select',
                success: function (data) {
                    data = JSON.parse(data);
                    loading(data);
                }
            });
        }else if(location.hash == '#add'){
            if(localStorage.history){
                renderHistory();
            }
        }
    });
    function renderHistory(){
         var data = JSON.parse(localStorage.history);
        shuchu('.well.history',data);
    }
    $(window).trigger('hashchange');

    //加载数据
    function loading(data) {
        tbodyEl.empty();
        $.each(data, function (i, v) {
            $(`
             <tr class="dels" data-id = '${v.id}'>
                <th scope="row" style="text-align: center">${v.id}</th>
                <td><input type="" class="name" value="${v.name}"></td>
                <td><audio class="src"  src="${v.src}" controls></td>
                <td><input type="" class="duration" value="${v.duration}"></td>
                <td><input type="" class="songs_name" value="${v.songs_name}"></td>
                <td><a href="javascript:void(0)" class="del">删除</a></td>
             </tr>`).appendTo(tbodyEl);
        })
    }

    $.ajax({
        url: '/index.php/singerInfo_admin/select',
        success: function (data) {
            data = JSON.parse(data);
            loading(data);
        }
    });


    // 提交按钮 添加按钮
    btnEl.on('click', function () {
        var formdata = $('#form').serializeArray();
        $.ajax({
            url: '/index.php/singerInfo_admin/add?' + $('#form').serialize(),
            success: function (data) {
                var id = $('input[type = hidden]').val();
                var name = $('.singers').val();
                var r= historyList.filter(function(v,i){
                    return v.id == id;
                });
                if(!r.length){
                    historyList.push({id:id,name:name});
                }
                localStorage.history = JSON.stringify(historyList);
                location.href = location.pathname + '#list';
            }
        });
        return false;
    });

    let timerId;  //歌手输入框   模糊检索输入
    $(".singers").on('input', function () {
        if (!$(this).val()) {
            return;
        }
        let that = this;
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            $.ajax({
                url: '/index.php/singerInfo_admin/search',
                data: {keyword: $(that).val()},
                success: function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    shuchu('.well.result',data);
                }
            })
        }, 500);
    });
    function shuchu(selector,data) {
        $(selector).empty();
        data.forEach(function (v, i) {
            $(`
            <span class="label label-info" data-id="${v.id}" style="margin:3px">${v.name}</span>
            `).appendTo(selector);
        })
    }



    // 点击标签添加到歌手输入框内
    $('.well.result,.well.history').on('click', 'span', function () {
        let ids = $(this).attr('data-id');
        $('input[type = hidden]').val(ids);
        console.log(ids);
        $('#exampleInputPassword1').val($(this).html());

    });

    /*
     btnEl.on('click', function () {
     var formdata = $('#form').serializeArray();
     $.ajax({
     url: '/index.php/singerInfo_admin/add?' + $('#form').serialize(),
     success: function (data) {
     var el = `
     <tr style="text-align: center" data-id="${data}">
     <th scope="row" style="text-align: center">${data}</th>
     <td><input type="text" class="name" value="${formdata[0].value}"></td>
     <td><input type="text" class="num" value="${formdata[1].value}"></td>
     <td><input type="text" class="time" value="${formdata[2].value}"></td>
     <td><input type="text" class="cid" value="${formdata[3].value}"></td>
     <td><a href="javascript:void(0)" class="del">删除</a></td>
     </tr>
     `;
     $(el).prependTo(tbodyEl);
     $('input[name=name]').val('');
     $('input[name=num]').val('');
     $('input[name=time]').val('');
     $('input[name=cid]').val('');
     }
     });
     return false;
     });
     */

    //更新  修改
    tbodyEl.on('change', '.name,.num,.time,.cid', function () {
        let key = $(this).attr('class');
        let values = $(this).val();
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/singerInfo_admin/updata',
            data: {key: key, value: values, id: id},
        })
    });

    tbodyEl.on('click', '.del', function () {
        let self = $(this);
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/singerInfo_admin/delete',
            data: {id: id},
            success: function (data) {
                self.closest('tr').remove();
            }
        })
    });

};


