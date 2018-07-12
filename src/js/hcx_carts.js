import '../less/hcx_normalize.less';
import '../less/hcx_common.less';
import '../less/ljh_carts.less';
import {THRTipTag} from '../plugin/js/THRTiptag';

const Tool   = require('./hcx_tools');
const loader = require('./hcx_loadhtml');
$(function(){
    loader.loadCommon();

    let tool = new Tool();
    let curData = tool.getCurCartData();
    if(curData) setHtml(curData);
    if(!sessionStorage.curUser) {
        new THRTipTag({
            title:'温馨提示',
            alertType:'message',
            message:"登陆后可以保存你的购物车记录哦~！",
            autoClose:2000
        })
    }
    
    setTimeout(() => {
        $('input').blur((e) => {
            let $this  = $(e.currentTarget),
                $price = $($this).parent().siblings('.unit'),
                $total = $($this).parent().siblings('.total'),
                newSubTotal = 0;
            newSubTotal = parseFloat($($this).val()) * parseFloat($price.text().slice(1));
            $total.text(`￥${newSubTotal.toFixed(2)}`);
            setTotalPrice();
        })
        $('.symbol').click((e) => {
            let $this = $(e.currentTarget),
                $input = $this.siblings('input');
            if($this.hasClass('plus-btn')){
                $input.val(parseInt($input.val()) + 1);
            }else{
                $input.val(parseInt($input.val()) - 1);
            }
            $input.blur();
        });
        $('.choice_a').click((e) => {
            let $this = $(e.currentTarget);
            if($this.hasClass('checked')){
                $('.choice_b').attr('class', 'choice_b uncheck');
                $('.choice_a').attr('class', 'choice_a uncheck');
            }else{
                $('.choice_b').attr('class', 'choice_b checked');
                $('.choice_a').attr('class', 'choice_a checked');
            }
            setTotalPrice();
        })
        $('.choice_b').click((e) => {
            let $this = $(e.currentTarget);
            if($this.hasClass('checked')){
                let isHalf = false
                $this.attr('class', 'choice_b uncheck');
                $.each($('.choice_b'), (idx, val) => {
                    if ($(val).hasClass('checked')) {
                        $('.choice_a').attr('class', 'choice_a halfcheck');
                        isHalf = true;
                    }
                })
                if (!isHalf){
                    $('.choice_a').attr('class', 'choice_a uncheck');
                }
            }else{
                let isHalf = false
                $this.attr('class', 'choice_b checked');
                $.each($('.choice_b'), (idx, val) => {
                    if ($(val).hasClass('uncheck')) {
                        $('.choice_a').attr('class', 'choice_a halfcheck');
                        isHalf = true;
                    }
                })
                if (!isHalf){
                    $('.choice_a').attr('class', 'choice_a checked');
                }
            }
            setTotalPrice();
        })

    }, 100);

    
});

function setHtml(data){
    let carthtml = '';
    if (data.length !== 0){
        $.each(data, (idx, val) => {
            carthtml += `
            <div class="carts_content">
                <div class="choice_b uncheck"></div>
                <div class="carts_commodity shopping">
                    <div class="carts_com_left">
                        <img src="${val.image}" alt="">
                        <p class="home-name">${val.title}</p>
                    </div>
                    <div class="carts_com_right">
                        <p class="product">产品尺寸</p>
                        <p class="product">产品材质</p>
                        <p class="product">产品颜色</p>
                    </div>

                </div> 
                <p class="unit shopping">￥${parseInt((val.price).slice(1)).toFixed(2)}</p>
                <div class="number shopping">
                    <span class="symbol minus-btn">-</span>
                    <input type="number" class="good-count" value="${val.count || 1}">
                    <span class="symbol plus-btn">+</span>
                </div>
                <p class="money shopping total">￥${(parseInt((val.price).slice(1)) * (val.count || 1)).toFixed(2)}</p> 
                <p class="del shopping">删除</p>   
            </div>`
        })
    }else{
        carthtml = `<div><p class="no-good">购物车空空如也~</p></div>`
    }

    $('.carts-list').html(carthtml);
}

function setTotalPrice(){
    let total = 0;
    $.each($('.total'), (idx, val) => {
        if ($(val).siblings('.choice_b').hasClass('checked')){
            total += parseFloat($(val).text().slice(1));
        }
    })
    $('.total_number').text(`￥${total.toFixed(2)}`);
}