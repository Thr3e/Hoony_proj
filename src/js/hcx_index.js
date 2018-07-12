//导入模块
const loader = require('./hcx_loadhtml');
import {THRTipTag} from '../plugin/js/THRTiptag';
//引入模块
import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/ljh_index.less'

$(function(){

    loader.loadCommon();

    // new THRTipTag({
    //     type:'alert',
    //     title:'提示',
    //     alertType:'error',
    //     message:"请输入合法的账号或密码",
    // })

    $('.idot').click((event) => {
        $(event.currentTarget).addClass("on").siblings('.on').removeClass('on');
        let idx = $(event.currentTarget).index();
        $($('.flash-img')[idx]).addClass('show').siblings('.show').removeClass('show');
    })

    let idx = 0;
    $($('.idot')[0]).click();
    setInterval(() => {
        idx = $('.on').index();
        if (idx === 3){
            idx = 0;
        }else{
            idx += 1;
        }
        $($('.idot')[idx]).click();
    },3500)

});