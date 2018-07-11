import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../plugin/css/THRTipTag.css';
import '../less/ljh_login.less';


require ("../plugin/js/THRTiptag.js");
const loader = require('./hcx_loadhtml');
$(function(){
    loader.loadCommon();
    let isLogin  = true;

    // 注册

    $(".go_register").on("click",() => {
        isLogin = false;
        $(".go_login").removeClass("hidden");
        $(".go_register").addClass("hidden");
        $(".login_title").text("注册");
        $(".repay").text("已经是我们的会员？");
        $(".account").text("注册账号");
        $(".password").text("登录密码");
        $(".confirm").removeClass("hidden");
        $(".forget").addClass("hidden");
        $(".login_register_btn").text("提交");
        document.title = "户里·家-注册";
       
    });
    //登录
    $(".go_login").on("click",() => {
        isLogin = true;
        $(".go_login").addClass("hidden");
        $(".go_register").removeClass("hidden");
        $(".login_title").text("登录");
        $(".repay").text("还不是我们的会员？");
        $(".account").text("账号");
        $(".password").text("密码");
        $(".confirm").addClass("hidden");
        $(".forget").removeClass("hidden");
        $(".login_register_btn").text("登录");
        document.title = "户里·家-登录";
    });

    //验证正则
    $(".username-ipt").on("blur",(e) =>{
        if(!/^[a-zA-Z0-9-_]{4,16}$/.test(e.currentTarget.value)){
            e.currentTarget.previousElementSibling.className="error";
        } else{
            e.currentTarget.previousElementSibling.className="error hidden"
        }
    });
    $(".password-ipt").on("blur",(e) =>{
        if(!/^[a-zA-Z0-9-_]{6,16}$/.test(e.currentTarget.value)){
            e.currentTarget.previousElementSibling.className="error";
        }else{
            e.currentTarget.previousElementSibling.className="error hidden"
        }
    });
    $(".repassword-ipt").on("blur",(e) =>{
        if (!isLogin){
            if($(e.currentTarget).val() !== $(".password-ipt").val()){
                console.log($(e.currentTarget).val() )
                console.log($(".password-ipt").val() )
                e.currentTarget.previousElementSibling.className="error";
            }else{
                e.currentTarget.previousElementSibling.className="error hidden"
            }
        }
    });

    $(".login_register_btn").on("click",() =>{
        $("input").blur();
        let isWrong = false;
        $.each($(".error"),function(idx,val){
            if(!$(val).hasClass("hidden")){
                isWrong = true;
            } 
        })
        
        if(isWrong){
            new window.THRTipTag({
                type:'alert',
                title:'提示',
                alertType:'correct',
                message:"请输入合法的账号或密码",
                iconURL:'../plugin/imgs/correct.svg'
            })
            return;
        }

        if(isLogin){
            //登录
            if(isData($(".username-ipt").val())){
                let user = isData($(".username-ipt").val());
                if(user.password === $(".password-ipt").val()){
                    alert("登录成功");
                    sessionStorage.curUser = JSON.stringify(user);
                    $('.title-logo').click();
                }else{
                    alert("输入的账号或密码不正确");
                }
            }else {
                alert("去注册");
            }

        }else{
            //注册
            if(isData($(".username-ipt").val())){
                alert("用户已经存在！");
            }else{
                alert("注册成功");
                let dataArr = null;
                if(localStorage.userLogInfo){
                    dataArr = JSON.parse(localStorage.userLogInfo);
                }else{
                    dataArr = []; 
                }
                dataArr.push({
                    username:$(".username-ipt").val(),
                    password:$(".password-ipt").val()
                });
                let jsonObj = JSON.stringify(dataArr);
                localStorage.userLogInfo = jsonObj;
                $('.title-logo').click();
            }
        }
    })
 
});

function isData(username){
    var user = null;
    if(localStorage.userLogInfo){
        var users = JSON.parse(localStorage.userLogInfo);
        for(var i = 0,len = users.length; i < len; i++){
            if(users[i].username == username){
                user = users[i];
                break;
            }
        }
    }
    return user;
}


