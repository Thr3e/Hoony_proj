import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/ljh_userinfo.less';
import img from '../images/pages/example_0.jpg';

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
    </div>  
        `
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
                            <span class="sty">删除</span>
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
                            <span class="sty">删除</span>
                        </p>
                    </div>  
                </div>
            `
        })
        $(".sell_main").html(sellStr);
    }break;

    }
}
