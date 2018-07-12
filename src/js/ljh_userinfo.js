import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/ljh_userinfo.less';

const loader = require('./hcx_loadhtml')
$(function(){
    loader.loadCommon();
    $.ajax({
        url:"../data/good-list.json",
        type:"GET",
        dataType:"json",
        success:(response) => {
            loadingHtml(response);
        }
    })

});

let loadingHtml = (response) =>{
    let datas = response["systemInfo"];
    let htmlStr = '';
    datas.forEach((data,index) => {
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
}