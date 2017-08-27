window.onload = function () {
    let tbodyEl = $('tbody');
    let btnEl = $('button.btn-default');
    let contentEl, cidEl;

    if(!location.hash){
        location.href=location.pathname+'#list';
    }
    $(window).on('hashchange',function () {
        $('.tab-pane, .nav-tabs li').removeClass('active');
        $(location.hash).addClass('active');
        $(location.hash + '_tab').parent().addClass('active');
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
                <td><input type="" class="content" value="${v.content}"></td>
                <!--<td><input type="" class="cid" value="${v.cid}"></td>-->
                <td>${v.cid}</td>
                <td><a href="javascript:void(0)" class="del">删除</a></td>
             </tr>`).appendTo(tbodyEl);
        })
    }
    //加载数据
    $.ajax({
        url: '/index.php/GameAdmin/select',
        success: function (data) {
            data = JSON.parse(data);
            loading(data);
        }
    });

    function add(data) {
        // data = JSON.parse(data);
        console.log(data);
        $(`<tr class="dels" data-id = ${data}>
            <th scope="row" style="text-align: center">${data}</th>
            <td><input type="" class="content" value="${contentEl}"></td>
            <td><input type="" class="cid" value="${cidEl}"></td>
            <td><a href="javascript:void(0)" class="del">删除</a></td>
         </tr>`).prependTo(tbodyEl);
        $('input[name=content]').val('');
    }
    //添加
    btnEl.on('click',function () {
        var formdata=$('#form').serializeArray();
        console.table(formdata)
        $.ajax({
            url:'/index.php/GameAdmin/add?'+$('#form').serialize(),
            success:function (data) {
                var el=`
                   <tr style="text-align: center" data-id="${data}">
                   <th scope="row" style="text-align: center">${data}</th>
                    <td><input type="text" class="content" value="${formdata[0].value}"></td>
                    <td><input type="text" class="cid" value="${formdata[1].value}"></td>
                    <td><a href="javascript:void(0)" class="del">删除</a></td>
                </tr> 
                  `;
                $(el).prependTo(tbodyEl);
                $('input[name=content]').val('');
                $('input[name=cid]').val('');
                location.href = location.pathname + '#list';
            }
        });
        return false;
    });

/*    btnEl.on('click', function () {
        contentEl = $('input[name=content]').val();
        cidEl = $('input[name=cid]').val();
        if (contentEl) {
            $.ajax({
                url: '/index.php/GameAdmin/add',
                data: {content: contentEl, cid: cidEl},
                success: function (data) {
                    add(data);
                }
            })
        }
    });*/


    //更新  修改
    tbodyEl.on('change', '.content', function () {
        let key = $(this).attr('class');
        let values = $(this).val();
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url:'/index.php/GameAdmin/updata',
            data:{key:key,value:values,id:id},
        })
    });

    tbodyEl.on('click', '.del', function () {
        let self = $(this);
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/GameAdmin/delete',
            data: {id: id},
            success: function (data) {
                self.closest('tr').remove();
            }
        })
    });

};


