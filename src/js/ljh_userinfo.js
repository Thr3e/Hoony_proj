import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/ljh_userinfo.less';
import img from '../images/pages/example_0.jpg';
import {THRTipTag} from '../plugin/js/THRTiptag'

const loader = require('./hcx_loadhtml')
$(function(){
    loader.loadCommon();
    $.ajax({
        url:"../data/good-list.json",
        type:"GET",
        dataType:"json",
        success:(response) => {
            loadingHtml("good_system",response);
            loadingHtml("good_order",response);
            loadingHtml("good_sell",response);
        }
    })

    $('.page-title').click((e) => {
        let $this = $(e.currentTarget),
            idx   = $this.index();
            if (idx === 1){
                $(".delete").on("click",function(e){
                    new THRTipTag({
                        type:'confirm',
                        title:'删除订单',
                        alertType:'doubt',
                        message:"你是否要删除该订单？删除后不再显示该订单",
                        confTitle:'确定删除',
                        confCallBack:function(){
                            e.currentTarget.parentElement.parentElement.parentElement.remove() 
                        }
                    })
                })
            }else if(idx === 4){
                $('.system_right').click((e) => {
                    let $this = $(e.currentTarget);
                    $this.children('.sign_box').toggleClass('check');
                })
            }  
        $this.siblings().children('a').removeClass('per');
        $this.children('a').addClass('per');
        $($('.page-tag')[idx]).addClass('show');
        $($('.page-tag')[idx]).siblings().removeClass('show');
    })

    $('.downward').click((e) => {
        let $this = $(e.currentTarget);
        $this.siblings('.drop_number_box').addClass('show');
    })
    $('.drop_number').click((e) => {
        let $this = $(e.currentTarget);
        $this.parent().siblings('.numbers').text($this.text());
        $this.parent().removeClass('show');
    })
    $('.drop_number_box').mouseleave((e) => {
        let $this = $(e.currentTarget);
        $this.removeClass('show');
    }); 
    $('#unlog').click((e) => {
        new THRTipTag({
            type:'confirm',
            title:'退出登录',
            alertType:'doubt',
            message:"你真的确定要退出吗",
            confTitle:'确定',
            confCallBack:function(){
                sessionStorage.removeItem('curUser');
                $('.title-logo a').click();
            }
        })
    })
});

let loadingHtml = (keyword,response) =>{
    switch(keyword){
       case "good_system" :{
        let datas = response["systemInfo"];
        let htmlStr = '';
        datas.forEach((data) => {
            htmlStr +=`
            <div class="system_box">
                <div class="system_left">
                    <p class="system_text">${data.text}
                    </p>
                    <p class="system_time">${data.time}</p>
                </div>
                <div class="system_right">
                    <div class="sign_box">
                    </div>
                    <p class="sign">${data.sign}</p>
                </div>
            </div>`
        });
        $(".box").html(htmlStr);
    }break;
    case "good_order" :{
        let orderData = response["orderInfo"];
        let orderStr = '';
        orderData.forEach((data) => {
            orderStr +=`
            <div class="order_content">
                    <div class="order_commodity order_style">
                        <div class="order_img">
                            <img src=${img} alt="">
                        </div>
                        <p class="order_home_name">订单号</p>
                    </div>
                    <p class="order_unit order_style">${data.price}</p>
                    <p class="otder_time order_style">${data.Otime}</p>
                    <p class="deliver_time order_style">${data.deliver}</p> 
                    <p class="state order_style">${data.state}</p> 
                    <div class="handle order_style">
                        <p class="handle_sty handle_line">
                            <span class="sty">查看</span>
                            <span>|</span>
                            <span class="sty">取消</span>
                        </p>
                        <p class="handle_sty">
                            <span class="sty">售后</span>
                            <span>|</span>
                            <span class="sty delete">删除</span>
                        </p>
                    </div>  
                </div>
            `
        })
        $(".order_main").html(orderStr);
    }break;
    case "good_sell":{
        let sellData = response["sellInfo"];
        let sellStr = '';
        sellData.forEach((data) => {
            sellStr +=`
            <div class="sell_content">
                    <div class="sell_commodity sell_style">
                        <div class="sell_img">
                            <img src=${img} alt="">
                        </div>
                        <p class="sell_home_name">订单号</p>
                    </div>
                    <p class="sell_unit sell_style">${data.money}</p>
                    <p class="sell_time sell_style">${data.submit_time}</p>
                    <p class="deliver_time sell_style">${data.issued}</p> 
                    <p class="sell_time sell_style">${data.storage}</p>
                    <p class="deliver_time sell_style">${data.status}</p> 
                    <p class="state sell_style">${data.whether}</p> 
                    <div class="handle sell_style">
                        <p class="handle_sty handle_line">
                            <span class="sty">降价申请</span>
                        </p>
                        <p class="handle_sty">
                            <span class="sty">售后</span>
                            <span>|</span>
                            <span class="sty delete">删除</span>
                        </p>
                    </div>  
                </div>
            `
        })
        $(".sell_main").html(sellStr);
    }break;

    }
}
