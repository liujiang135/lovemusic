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

    function loading(data) {
        tbodyEl.empty();
        $.each(data, function (i, v) {
            $(`
             <tr class="dels" data-id = '${v.id}'>
                <th scope="row" style="text-align: center">${v.id}</th>
                <td><input type="" class="name" value="${v.name}"></td>
                <td><input type="" class="num" value="${v.num}"></td>
                <td><input type="" class="pic" value="${v.pic}"></td>
                <td><input type="" class="cid" value="${v.cid}"></td>
                <td><a href="javascript:void(0)" class="del">删除</a></td>
             </tr>`).appendTo(tbodyEl);
        })
    }
    //加载数据
    $.ajax({
        url: '/index.php/singerList_admin/select_singers',
        success: function (data) {
            data = JSON.parse(data);
            loading(data);
        }
    });

    btnEl.on('click',function () {
        var formdata=$('#form').serializeArray();
        $.ajax({
            url:'/index.php/singerList_admin/add_singers?'+$('#form').serialize(),
            success:function (data) {
                var el=`
                   <tr style="text-align: center" data-id="${data}">
                   <th scope="row" style="text-align: center">${data}</th>
                    <td><input type="text" class="name" value="${formdata[0].value}"></td>
                    <td><input type="text" class="num" value="${formdata[1].value}"></td>
                    <td><input type="text" class="pic" value="${formdata[2].value}"></td>
                    <td><input type="text" class="cid" value="${formdata[3].value}"></td>
                    <td><a href="javascript:void(0)" class="del">删除</a></td>
                </tr> 
                  `;
                $(el).prependTo(tbodyEl);
                $('input[name=name]').val('');
                $('input[name=num]').val('');
                $('input[name=pic]').val('');
                $('input[name=cid]').val('');
            }
        });
        return false;
    });


    //更新  修改
    tbodyEl.on('change', '.name,.num,.pic,.cid', function () {
        let key = $(this).attr('class');
        let values = $(this).val();
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/singerList_admin/updata',
            data: {key: key, value: values, id: id},
        })
    });

    tbodyEl.on('click', '.del', function () {
        let self = $(this);
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/singerList_admin/delete_singers',
            data: {id: id},
            success: function (data) {
                self.closest('tr').remove();
            }
        })
    });

};


