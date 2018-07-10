import '../less/ljh_login.less';

$(function(){
    let isLogin  = true;
    // 注册
    $(".go_register").on("click",() => {
        isLogin = false;
        $(".go_login").removeClass("hidden");
        $(".go_register").addClass("hidden");
        $(".login_title").text("注册");
        $(".login_text").text("已经是我们的会员？");
        $(".account").text("注册账号");
        $(".password").text("登录密码");
        $(".confirm").removeClass("hidden");
        $(".login_register_btn").text("注册");
    });
    //登录
    $(".go_login").on("click",() => {
        isLogin = true;
        $(".go_login").addClass("hidden");
        $(".go_register").removeClass("hidden");
        $(".login_title").text("登录");
        $(".login_text").text("还不是我们的会员？");
        $(".account").text("账号");
        $(".password").text("密码");
        $(".confirm").addClass("hidden");
        $(".login_register_btn").text("登录");
    });


    
})