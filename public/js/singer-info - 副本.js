/**
 * Created by Administrator on 2017/6/21.
 *
 */

window.onload = function () {
    let tbodyEl = $('tbody');
    let btnEl = $('button.btn-default');

    // 箭头函数  filter(v => v.id != 0.id)

    //加载数据
    function loading(data) {
        tbodyEl.empty();
        $.each(data, function (i, v) {
            $(`
             <tr class="dels" data-id = '${v.id}'>
                <th scope="row" style="text-align: center">${v.id}</th>
                    <td>${v.name}</td>
                    <td>${v.pic}</td>
                    <td>
                    <a href="javascript:void(0)">修改</a>
                    |
                    <a href="javascript:void(0)" class="del">删除</a>
                </td>
             </tr>`).appendTo(tbodyEl);
        })
    }


    $.ajax({
        url: '/index.php/admin_ajax/select_music',
        success: function (data) {
            data = JSON.parse(data);
            loading(data);
        }
    });

    // 添加
    // ajax 的值要用JS先从html中获取，再传给php，php处理数据库中，
    // 然后从php发回来再在JS处理显示在页面上
    btnEl.on('click', function () {
        let nameEl = $('input[name=name]').val();
        let picEl = $('input[name=pic]').val();
        if (nameEl && picEl) {
            $.ajax({
                url: '/index.php/admin_ajax/add_music',
                data: {name: nameEl, pic: picEl},
                success: function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    $(`<tr class="dels" data-id = '${data}'>
                        <th scope="row" style="text-align: center">${data}</th>
                            <td>${nameEl}</td>
                            <td>${picEl}</td>
                            <td>
                            <a href="javascript:void(0)">修改</a>
                            |
                            <a href="javascript:void(0)" class="del">删除</a>
                        </td>
                     </tr>`).prependTo(tbodyEl);
                    $('input[name=name]').val('');
                    $('input[name=pic]').val('');
                }
            })
        }
    });

    //删除
    $('tbody').on('click', '.del', function () {
        let self = $(this);
        let id = $(this).closest('tr').attr('data-id');
        $.ajax({
            url: '/index.php/admin_ajax/delete_music',
            data: {id: id},
            success: function (data) {
                self.closest('tr').remove();
            }
        })
    })
    
};


