
window.onload = function(){
    let middle = $('.middle');
    let el = $('.you a');
    let top = el.offset().top;
    let left = el.offset().left;
    let playList;

    if (localStorage.playList) {
        playList = JSON.parse(localStorage.playList);
    } else {
        playList = [];
    }

    playList.forEach(function (v, i) {
        $('.c' + v.id).find('.jia').addClass('rotate');
    });

    function fly(el) {
        $('<div>').appendTo('body').css({
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'red',
            position: 'fixed',
            top: $(el).offset().top,
            left: $(el).offset().left,
            zIndex: 1000
        }).animate({
            top: top,
            left: left
        }).queue(function () {
            $(this).remove().dequeue();
        });
    }

    middle.on('click', '.jia', function () {
        console.log($(this));
        let o = JSON.parse($(this).closest('li').attr('data'));
        if (!$(this).hasClass('rotate')) {
            fly(this);
            playList.push(o);
        } else {
            playList.filter(function (v, i) {
                return v.id != o.id;
            })
        }
        localStorage.playList = JSON.stringify(playList);
        $(this).toggleClass('rotate');
    });

$('.ranking').on('click','li',function(){
    $('.ranking li').removeClass('active');
    $(this).addClass('active');
});

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });



};

