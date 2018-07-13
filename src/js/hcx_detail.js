import '../less/hcx_normalize.less'
import '../less/hcx_common.less';
import '../less/hcx_detail.less'

const loader = require('./hcx_loadhtml');
const good_list = require('../data/good-info');
const Tool  = require('./hcx_tools')
$(function(){
    loader.loadCommon();

    var tool = new Tool(),
        curId   = location.search.split('=')[2],
        curType = location.search.split('=')[1].split('&')[0],
        htmlStr = '',
        goodInfo = good_list[curType][curId];
    if (goodInfo){
        htmlStr =  `
        <div class="img-wrap fl">
            <div class="main-img">
                <i class="cover" style="display: none"></i>
                <img src="${goodInfo.img}" alt="">
            </div>
            <div class="zoom-img" style="display: none">
                <img src="${goodInfo.img}" alt="">
            </div>
            <div class="img-flow">
                <img src="${goodInfo.img}" alt="" class="choose">
                <img src="${good_list[curType][4].img}" alt="">
                <img src="${good_list[curType][3].img}" alt="">
                <img src="${good_list[curType][2].img}" alt="">
                <img src="${good_list[curType][1].img}" alt="">
            </div>
        </div>
        <div class="detail-wrap fr">
            <h3 class="title">超级无敌炫酷，爆炸实惠，老板看了要哭瞎的${goodInfo.title}</h3>
            <p class="price">狂欢惊爆价:<span>${goodInfo.price}</span></p>
            <p class="info">产品介绍：99成新，才从老板家偷出来的高级货！！快来买吧！</p>
            <p class="count">购买数量:<input type="number" value="1" min="1" class="count-ipt"></p>
            <div class="btn-wrap">
                <div class="add-cart" >立即购买</div>
                <div class="add-cart" >加入购物车</div>
            </div>
        </div>`;
        $('.detail').html(htmlStr);
        $('.img-flow img').click(imgClick);
        $('.main-img').mousemove(zoomImg);
        $('.main-img').mouseleave(function(){
            $('.zoom-img, .cover').css('display', 'none');
        });
        tool.addCart({
            image : goodInfo.img,
            title : goodInfo.title,
            price : goodInfo.price,
            count : 1,
            el:$('.count-ipt')
        });
    }
});

function imgClick(){
    var src = $(this).attr('src');
    $('.main-img img, .zoom-img img').attr('src', src);
    $(this).addClass('choose');
    $(this).siblings('.choose').removeClass('choose');
}

function zoomImg(e){
    $('.zoom-img, .cover').css('display', 'block');
    var left = e.clientX - $(this).offset().left - $('.cover').width() / 2,
        top = e.clientY + window.scrollY - $(this).offset().top - $('.cover').height() / 2;
    if (top < 0 ) top = 0;
    else if (top > $(this).height() - $('.cover').height())
    top = $(this).height() - $('.cover').height();

    if (left < 0 ) left = 0;
    else if (left > $(this).width() - $('.cover').width())
    left = $(this).width() - $('.cover').width();

    var ratio = $('.zoom-img img').width() / $('.main-img img').width();

    $('.cover').css({'left' : left , "top" : top});
    $('.zoom-img img').css({'left' : -left * ratio, 'top' : -top * ratio});
}
