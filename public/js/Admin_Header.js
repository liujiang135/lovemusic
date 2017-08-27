window.addEventListener('load', function () {
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

    $('.navbar-nav li').on('click',function(){
        $(this).closest('ul').find('li').removeClass('active');
        $(this).addClass('active');
    });
    $('.dropdown-toggle').on('click',function(){
        $('.dropdown-menu').css({display:'block'});
        return false;
    });
    $(document).on('click', function () {
        $('.dropdown-menu').css({display:'none'});
    });

    $('.bs-docs-sidenav .nav li');
    // console.log($('.bs-docs-sidenav .nav li'));

});


