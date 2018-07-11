$(function() {
    let baseUrl = 'http://localhost:8080/',
        urls = [
            'static/pages/sofas.html',
            'static/pages/tables.html',
            'static/pages/beds.html',
            'static/pages/storage.html',
            'static/pages/more.html',
            'static/pages/ljh_carts.html',
            'static/pages/ljh_login.html',
            'static/pages/ljh_userinfo.html',
            'index.html'
        ];
    urls = urls.map(url => {
        return baseUrl + url;
    })
    //点击事件
    $('.list-title').click ((event)=>{
        let index = $(event.currentTarget).parent().index();
        location.href = urls[index];
    })
    $('.carts').click((event) => {
        location.href = urls[5];
    })
    $('.login-btn').click((event) => {
        let idx = 0;
        if ($(event.currentTarget).attr('data-status') === 'login'){
            idx = 6;
        } else {
            idx = 7;
        }
        location.href = urls[idx];
    })
    $('.title-logo').click((event) => {
        this.location.href = urls[8];
    })
})