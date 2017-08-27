window.onload = function () {
    $('button[type=submit]').on('click', function () {
        let formData = $('#form').serializeArray();
        console.log(formData);
        let postData = {};
        formData.forEach(function (v, i) {
            postData[v.name] = v.value;
        });
        console.log(postData);
        $.ajax({
            url: '/index.php/Login/check',
            method: 'post',
            data: postData,
            success: function (data) {
                if(data == 'error'){
                    alert('登陆失败，请检查账号密码');
                }else if(data == 'OK'){
                    location.href = '/index.php/StoreAdmin/index';
                }
            }
        });
        return false;
    })
};

