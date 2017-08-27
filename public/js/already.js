window.onload = function () {
    let middle = $('.middle');

    let playList;

    function render() {
        playList = JSON.parse(localStorage.playList);
        $('.you a').html('共' + playList.length + '首');
        middle.empty();
        playList.forEach(function (v, i) {
            let el = `
            <li data-id = "${v.id}">
                <div class="shadow"></div>
                <div class="num">
                    <a href="/index.php/Music/play?id=${v.id}">
                        <img src="${v.songs_pic}" alt="">
                    </a>
                </div>
                <div class="song">
                    <span class="name">${v.name}</span>
                    <span class="time">${v.duration}</span>
                </div>
                <div class="add">
                    <div class="del"></div>
                    <div class="tops"></div>
                </div>
            </li>`;
            $(el).appendTo(middle);
        });
    }

    if (localStorage.playList) {
        render();
    }

    $('.middle').on('click', '.del', function () {
        let id = $(this).closest('li').attr('data-id');
        playList = playList.filter(function (v, i) {
            return v.id != id;
        });
        localStorage.playList = JSON.stringify(playList);
        render();
    });

    $('.middle').on('click', '.tops', function () {
        let id = $(this).closest('li').attr('data-id');
        let index;
        playList.forEach(function (v, i) {
            if (v.id == id) {
                index = i;
            }
        });
        playList.unshift(playList.splice(index, 1)[0]);
        localStorage.playList = JSON.stringify(playList);
        render();
    });

};


