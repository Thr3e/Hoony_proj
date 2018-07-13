import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/hcx_pages.less'

import {THRTipTag} from '../plugin/js/THRTiptag'

const loader = require('./hcx_loadhtml');
const GoodData = require('../data/good-info');
const Tool = require('./hcx_tools');
$(function(){
    loader.loadCommon();

    loadListHtml();
    let tool = new Tool();
    setTimeout(() => {
        require('./router')
        tool.addCart();
    }, 100)
    
});

function loadListHtml(){
    let htmlStr = '',
        pageid  = location.href.slice(location.href.lastIndexOf('/') + 1, location.href.lastIndexOf('.'))
        console.log(pageid);
    
    $.each(GoodData[pageid], (idx, val) => {
        htmlStr += `
        <div class="good-info" data-idx="${idx}">
            <a href="#" class="go_detail"><img src=${val.img}></a>
            <div class="good-title">
                <p class="good-name">${val.title}</p>
                <p class="good-price">${val.price}</p>
                <div class="add-cart">加入购物车</div>
            </div>
        </div>`
    })
    $('.good-wrap').html(htmlStr);

}