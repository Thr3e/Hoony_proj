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
            autoClose:1000
        })
    }
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
                    <input type="number" class="good-count" value="${val.count || 1}" min="1">
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
        
    setTimeout(() => {
        setBtnFunc();
    }, 100);
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

function setBtnFunc() {
    let tool = new Tool();
    $('.del').click((e) => {
        
        let tool = new Tool();
        let $this = $(e.currentTarget),
            idx   = $this.parent().index(),
            cartData = tool.getCurCartData();
        new THRTipTag({
            type:'confirm',
            title:'删除确认',
            alertType:'doubt',
            message:"你真的确定要删除这件商品吗",
            cancelTitle:'手滑了',
            confTitle:'确定',
            confCallBack:function(){
                cartData.splice(idx,1);
                tool.setCurCartData(cartData);
                setHtml(cartData);
            }
        })
    })
    $('.del-all').click((e) => {
        new THRTipTag({
            type:'confirm',
            title:'删除确认',
            alertType:'doubt',
            message:"你真的确定要删除这些商品吗",
            cancelTitle:'手滑了',
            confTitle:'确定',
            confCallBack:function(){
                let tmpData = tool.getCurCartData();
                $.each($('.choice_b.checked'), (idx, val) => {
                    let curIdx = $(val).parent().index();
                    tmpData[curIdx] = '';
                })
                $.each(tmpData, (idx, val) => {
                    if (!val) tmpData.splice(idx, 1);
                })
        
                tool.setCurCartData(tmpData);
                setHtml(tmpData);
            }
        })
    })
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
            $input.val(parseInt($input.val()) - 1 > 0 ? parseInt($input.val()) - 1 : 1);
        }
        $input.blur();
    });
    $('.choice_a').click((e) => {
        let $this = $(e.currentTarget);
        if($this.hasClass('checked')){
            $('.choice_b').attr('class', 'choice_b uncheck');
            $('.choice_a').attr('class', 'choice_a uncheck');
            $('.nums').text('0')
        }else{
            $('.choice_b').attr('class', 'choice_b checked');
            $('.choice_a').attr('class', 'choice_a checked');
            $('.nums').text($('.choice_b.checked').length)
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
            
            $('.nums').text(parseInt($('.nums').text()) - 1)
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
            
            $('.nums').text(parseInt($('.nums').text()) + 1)
        }
        setTotalPrice();
    })
}