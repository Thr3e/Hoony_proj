import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../plugin/css/THRTipTag.css';
import '../less/ljh_login.less';
import {THRTipTag} from '../plugin/js/THRTiptag'

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
        $(".login_register_btn").html("提&nbsp;&nbsp;&nbsp;&nbsp;交");
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
        $(".login_register_btn").html("登&nbsp;&nbsp;&nbsp;&nbsp;录");
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
            new THRTipTag({
                type:'alert',
                title:'糟糕',
                alertType:'doubt',
                message:"请输入合法的账号或密码",
                confTitle:'知道了',
                confCallBack:function(){
                    $('input').val('');
                }
            })
            return;
        }

        if(isLogin){
            //登录
            if(isData($(".username-ipt").val())){
                let user = isData($(".username-ipt").val());
                if(user.password === $(".password-ipt").val()){
                    new THRTipTag({
                        title:'登陆成功',
                        alertType:'correct',
                        message:`${user.username}欢迎回来`,
                        autoClose:1000
                    })
                    sessionStorage.curUser = JSON.stringify(user);
                    setTimeout(() => {
                        $('.title-logo a').click();
                    }, 1200);
                }else{
                    new THRTipTag({
                        type:'alert',
                        title:'提示',
                        alertType:'error',
                        message:`输入的账号或密码不正确`,
                        confCallBack:function(){
                            $('input').val('');
                        }
                    })     
                }
            }else {
                new THRTipTag({
                    type:'confirm',
                    title:'注册提示',
                    alertType:'error',
                    message:`你还没有账号`,
                    confTitle:'去注册',
                    confCallBack:function(){
                        $('input').val('');
                        $(".go_register").click();
                    }
                })
            }

        }else{
            //注册
            if(isData($(".username-ipt").val())){
                new THRTipTag({
                    type:'alert',
                    title:'提示',
                    alertType:'error',
                    message:`用户已经存在！`,
                    confCallBack:function(){
                        $('input').val('');
                    }
                })
            }else{
                let dataArr = null,
                    user    = {};
                if(localStorage.userLogInfo){
                    dataArr = JSON.parse(localStorage.userLogInfo);
                }else{
                    dataArr = []; 
                }
                user = {
                    username:$(".username-ipt").val(),
                    password:$(".password-ipt").val()
                };

                dataArr.push(user);
                let jsonObj = JSON.stringify(dataArr);
                localStorage.userLogInfo = jsonObj;
                
                new THRTipTag({
                    title:'注册成功',
                    alertType:'correct',
                    message:`${user.username}欢迎加入`,
                    autoClose:1000
                })
                sessionStorage.curUser = JSON.stringify(user);
                setTimeout(() => {
                    $('.title-logo a').click();
                }, 1200);
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


